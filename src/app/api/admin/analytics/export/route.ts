import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { fetchEvents, groupByCampaign, type EventRow } from "@/lib/analytics/attribution";

/** Escapa um campo para CSV (aspas, ponto-e-vírgula, quebra de linha). */
function cell(value: unknown): string {
  const text = value == null ? "" : String(value);
  return /[";\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(header: string[], rows: unknown[][]): string {
  // Ponto-e-vírgula: é o separador que o Excel em português abre sem pedir nada
  const lines = [header.join(";"), ...rows.map((r) => r.map(cell).join(";"))];
  // BOM para o Excel reconhecer os acentos
  return "﻿" + lines.join("\r\n") + "\r\n";
}

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const formato = searchParams.get("formato") === "eventos" ? "eventos" : "campanhas";

  const fromParam = searchParams.get("from");
  const toParam   = searchParams.get("to");

  let since: string;
  let until: string;
  if (fromParam && toParam) {
    since = new Date(fromParam + "T00:00:00").toISOString();
    until = new Date(toParam  + "T23:59:59").toISOString();
  } else {
    const days = Math.min(Math.max(1, parseInt(searchParams.get("days") ?? "30")), 365);
    since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    until = new Date().toISOString();
  }

  // Eventos crus precisam de mais linhas que o painel, que só mostra resumo
  const { data, hasAttribution } = await fetchEvents(since, until, formato === "eventos" ? 20000 : 5000);

  let csv: string;
  if (formato === "eventos") {
    csv = toCsv(
      ["data_hora", "sessao", "tipo", "nome", "pagina", "campanha", "origem", "meio", "criativo", "id_clique", "referrer", "estado", "dispositivo"],
      data.map((e: EventRow) => [
        e.created_at, e.session_id, e.event_type, e.event_name, e.page_path,
        e.utm_campaign, e.utm_source, e.utm_medium, e.utm_content, e.click_id,
        e.referrer, e.geo_state, e.device_type,
      ]),
    );
  } else {
    csv = toCsv(
      ["campanha", "origem", "meio", "criativo", "sessoes", "visualizacoes", "cliques", "cliques_whatsapp", "formularios"],
      groupByCampaign(data).map((c) => [
        c.campaign, c.source, c.medium, c.content,
        c.sessions, c.pageViews, c.clicks, c.whatsapp, c.forms,
      ]),
    );
  }

  const hoje = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="revendendomake-${formato}-${hoje}.csv"`,
      // Avisa quem consome se a origem já está sendo coletada
      "X-Atribuicao": hasAttribution ? "ativa" : "indisponivel",
    },
  });
}

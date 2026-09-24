import { adminDb } from "@/lib/supabase/admin-db";

const COLS_BASE =
  "session_id, event_type, event_name, page_path, referrer, created_at, geo_state, click_x, click_y, device_type";
const COLS_UTM = `${COLS_BASE}, utm_source, utm_medium, utm_campaign, utm_content, utm_term, click_id`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventRow = any;

/**
 * Busca os eventos do período já com a origem do tráfego.
 * Se a migração 007 (colunas utm_*) ainda não tiver rodado no banco, o Supabase
 * recusa o select inteiro — nesse caso repete sem elas para o painel não quebrar.
 */
export async function fetchEvents(
  since: string,
  until: string,
  limit = 5000,
): Promise<{ data: EventRow[]; hasAttribution: boolean }> {
  const query = (cols: string) =>
    adminDb()
      .from("page_events")
      .select(cols)
      .gte("created_at", since)
      .lte("created_at", until)
      .order("created_at", { ascending: false })
      .limit(limit);

  const withUtm = await query(COLS_UTM);
  if (!withUtm.error) return { data: (withUtm.data ?? []) as EventRow[], hasAttribution: true };

  const base = await query(COLS_BASE);
  return { data: (base.data ?? []) as EventRow[], hasAttribution: false };
}

export const SEM_CAMPANHA = "(sem campanha)";
export const ANUNCIO_SEM_ETIQUETA = "(anúncio sem etiqueta)";

export interface CampaignRow {
  campaign: string;
  source: string;
  medium: string;
  content: string;
  sessions: number;
  pageViews: number;
  clicks: number;
  whatsapp: number;
  forms: number;
}

/** O visitante clica no anúncio uma vez; a campanha vale para a sessão inteira. */
function campaignKey(e: EventRow): { campaign: string; source: string; medium: string; content: string } | null {
  const campaign = e.utm_campaign ?? (e.click_id ? ANUNCIO_SEM_ETIQUETA : null);
  if (!campaign) return null;
  return {
    campaign,
    source:  e.utm_source  ?? (e.click_id ? "anúncio" : "—"),
    medium:  e.utm_medium  ?? "—",
    content: e.utm_content ?? "—",
  };
}

/**
 * Agrupa os eventos por campanha de origem.
 * Sessões sem nenhuma etiqueta caem em "(sem campanha)" — tráfego que não veio de anúncio.
 */
export function groupByCampaign(events: EventRow[]): CampaignRow[] {
  // Origem da sessão: o primeiro evento etiquetado que aparecer nela
  const sessionAttr = new Map<string, ReturnType<typeof campaignKey>>();
  for (const e of events) {
    if (sessionAttr.get(e.session_id)) continue;
    const key = campaignKey(e);
    if (key) sessionAttr.set(e.session_id, key);
  }

  const rows = new Map<string, CampaignRow>();
  const counted = new Set<string>();

  for (const e of events) {
    const attr = sessionAttr.get(e.session_id) ?? {
      campaign: SEM_CAMPANHA, source: "—", medium: "—", content: "—",
    };
    const id = `${attr.campaign}|${attr.source}|${attr.medium}|${attr.content}`;

    let row = rows.get(id);
    if (!row) {
      row = { ...attr, sessions: 0, pageViews: 0, clicks: 0, whatsapp: 0, forms: 0 };
      rows.set(id, row);
    }

    const sessionMark = `${id}::${e.session_id}`;
    if (!counted.has(sessionMark)) {
      counted.add(sessionMark);
      row.sessions += 1;
    }

    if (e.event_type === "pageview")    row.pageViews += 1;
    if (e.event_type === "form_submit") row.forms += 1;
    if (e.event_type === "click") {
      row.clicks += 1;
      if (/whats/i.test(String(e.event_name ?? ""))) row.whatsapp += 1;
    }
  }

  return Array.from(rows.values()).sort((a, b) => b.sessions - a.sessions);
}

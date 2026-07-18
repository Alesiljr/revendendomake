"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Download, RefreshCw, Search, X, MessageCircle,
  Phone, MapPin, Calendar, Tag, FileText, ChevronRight,
  User, TrendingUp,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/supabase/types";

// ── Configuração de status ────────────────────────────────────────────────────

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; dot: string; bg: string }> = {
  novo:       { label: "Novo",       color: "text-blue-700",    dot: "bg-blue-500",    bg: "bg-blue-50 border-blue-200" },
  contatado:  { label: "Contatado",  color: "text-yellow-700",  dot: "bg-yellow-500",  bg: "bg-yellow-50 border-yellow-200" },
  convertido: { label: "Convertido", color: "text-green-700",   dot: "bg-green-500",   bg: "bg-green-50 border-green-200" },
  descartado: { label: "Descartado", color: "text-neutral-500", dot: "bg-neutral-400", bg: "bg-neutral-50 border-neutral-200" },
};

const STATUS_ORDER: LeadStatus[] = ["novo", "contatado", "convertido", "descartado"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function whatsappUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const num = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${num}`;
}

function downloadCSV(leads: Lead[]) {
  const header = ["Nome", "Telefone", "Cidade", "Estado", "Origem", "Status", "Notas", "Data"];
  const rows = leads.map((l) => [
    l.name, l.phone, l.city ?? "", l.state ?? "",
    l.source ?? "", l.status, (l.notes ?? "").replace(/;/g, ","),
    formatDate(l.created_at),
  ]);
  const csv = [header, ...rows].map((r) => r.join(";")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `crm-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Badge de status ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ── Painel lateral de detalhes ────────────────────────────────────────────────

function LeadDrawer({
  lead,
  onClose,
  onUpdate,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (updated: Lead) => void;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function patchLead(payload: { status?: LeadStatus; notes?: string }) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: lead.id, ...payload }),
    });
  }

  async function handleStatusChange(s: LeadStatus) {
    setStatus(s);
    setSavingStatus(true);
    await patchLead({ status: s });
    setSavingStatus(false);
    onUpdate({ ...lead, status: s, notes });
  }

  function handleNotesChange(val: string) {
    setNotes(val);
    setNotesSaved(false);
    if (notesTimer.current) clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(async () => {
      setSavingNotes(true);
      await patchLead({ notes: val });
      setSavingNotes(false);
      setNotesSaved(true);
      onUpdate({ ...lead, status, notes: val });
    }, 800);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden border-l border-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 shrink-0">
          <h3 className="font-semibold text-neutral-800">Detalhes do Lead</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Avatar + info principal */}
          <div className="px-6 py-5 border-b border-neutral-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {initials(lead.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-neutral-900 text-lg leading-tight">{lead.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={status} />
                  {savingStatus && <span className="text-xs text-neutral-400">Salvando...</span>}
                </div>
              </div>
            </div>

            {/* Ações rápidas */}
            <div className="flex gap-2 mt-4">
              <a
                href={whatsappUrl(lead.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Informações */}
          <div className="px-6 py-4 space-y-3 border-b border-neutral-50">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Informações</p>
            <InfoRow icon={<Phone className="w-3.5 h-3.5" />} label="Telefone" value={lead.phone} />
            {(lead.city || lead.state) && (
              <InfoRow
                icon={<MapPin className="w-3.5 h-3.5" />}
                label="Localização"
                value={[lead.city, lead.state].filter(Boolean).join(", ")}
              />
            )}
            {lead.source && (
              <InfoRow icon={<Tag className="w-3.5 h-3.5" />} label="Origem" value={lead.source} />
            )}
            <InfoRow
              icon={<Calendar className="w-3.5 h-3.5" />}
              label="Cadastro"
              value={formatDateTime(lead.created_at)}
            />
            {lead.updated_at !== lead.created_at && (
              <InfoRow
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                label="Atualizado"
                value={formatDateTime(lead.updated_at)}
              />
            )}
          </div>

          {/* Mudar status */}
          <div className="px-6 py-4 border-b border-neutral-50">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Mover para</p>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_ORDER.map((s) => {
                const c = STATUS_CONFIG[s];
                const active = status === s;
                return (
                  <button
                    key={s}
                    onClick={() => !active && handleStatusChange(s)}
                    disabled={active}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                      active
                        ? `${c.bg} ${c.color} border-current opacity-100 cursor-default`
                        : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Anotações */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Anotações
              </p>
              {savingNotes && <span className="text-xs text-neutral-400">Salvando...</span>}
              {notesSaved && !savingNotes && <span className="text-xs text-green-600">Salvo</span>}
            </div>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Adicione observações sobre este lead..."
              rows={5}
              className="w-full text-sm border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-700 placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-400 resize-none transition-colors"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-neutral-400 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] text-neutral-400">{label}</p>
        <p className="text-sm text-neutral-700 font-medium">{value}</p>
      </div>
    </div>
  );
}

// ── Funil visual ──────────────────────────────────────────────────────────────

function ConversionFunnel({ leads }: { leads: Lead[] }) {
  const total = leads.length;
  if (total === 0) return null;

  const novos      = leads.filter((l) => l.status === "novo").length;
  const contatados = leads.filter((l) => l.status === "contatado").length;
  const convertidos = leads.filter((l) => l.status === "convertido").length;
  const taxa = total > 0 ? Math.round((convertidos / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {[
        { label: "Total",       value: total,       sub: "leads recebidos",    color: "text-neutral-800", border: "border-neutral-200" },
        { label: "Novos",       value: novos,       sub: "aguardando contato", color: "text-blue-700",    border: "border-blue-200" },
        { label: "Contatados",  value: contatados,  sub: "em negociação",      color: "text-yellow-700",  border: "border-yellow-200" },
        { label: "Convertidos", value: convertidos, sub: `${taxa}% de conv.`,  color: "text-green-700",   border: "border-green-200" },
      ].map((s) => (
        <div key={s.label} className={`bg-white rounded-xl border ${s.border} p-4 shadow-sm`}>
          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          <p className="text-xs font-semibold text-neutral-600 mt-0.5">{s.label}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

const FILTER_LABELS = ["Todos", "novo", "contatado", "convertido", "descartado"] as const;
type FilterLabel = (typeof FILTER_LABELS)[number];

export default function CRMPage() {
  const [leads, setLeads]           = useState<Lead[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState<FilterLabel>("Todos");
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  function handleUpdate(updated: Lead) {
    setLeads((prev) => prev.map((l) => l.id === updated.id ? updated : l));
    setSelected(updated);
  }

  const filtered = leads
    .filter((l) => filter === "Todos" || l.status === filter)
    .filter((l) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.city ?? "").toLowerCase().includes(q) ||
        (l.state ?? "").toLowerCase().includes(q)
      );
    });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-pink-500" />
            CRM
          </h2>
          <p className="text-neutral-500 text-sm mt-1">Gerencie seus leads e acompanhe conversões.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 border border-neutral-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => downloadCSV(filtered)}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Funil */}
      <ConversionFunnel leads={leads} />

      {/* Busca + filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-400 bg-white"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {FILTER_LABELS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === s
                  ? "bg-pink-600 text-white"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {s === "Todos" ? "Todos" : STATUS_CONFIG[s as LeadStatus].label}
              {s !== "Todos" && (
                <span className={`ml-1.5 text-xs ${filter === s ? "text-pink-200" : "text-neutral-400"}`}>
                  {leads.filter((l) => l.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-neutral-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            <p className="text-sm">Carregando leads...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-neutral-400">
            <User className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">{leads.length === 0 ? "Nenhum lead recebido ainda." : "Nenhum lead com este filtro."}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-500 text-xs uppercase tracking-wide bg-neutral-50">
                  <th className="px-5 py-3 text-left font-medium">Lead</th>
                  <th className="px-5 py-3 text-left font-medium">Telefone</th>
                  <th className="px-5 py-3 text-left font-medium hidden sm:table-cell">Localização</th>
                  <th className="px-5 py-3 text-left font-medium hidden md:table-cell">Origem</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                  <th className="px-5 py-3 text-left font-medium hidden sm:table-cell">Data</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    className={`border-b border-neutral-50 hover:bg-neutral-50 cursor-pointer transition-colors ${
                      selected?.id === lead.id ? "bg-pink-50/50" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {initials(lead.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900 truncate">{lead.name}</p>
                          {lead.notes && (
                            <p className="text-[11px] text-neutral-400 truncate max-w-[160px]">{lead.notes}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-neutral-600 font-mono text-xs">{lead.phone}</td>
                    <td className="px-5 py-3 text-neutral-500 hidden sm:table-cell">
                      {[lead.city, lead.state].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="px-5 py-3 text-neutral-400 text-xs hidden md:table-cell">{lead.source ?? "—"}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-3 text-neutral-400 text-xs hidden sm:table-cell">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-5 py-3 text-neutral-300">
                      <ChevronRight className="w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Resultado da busca */}
      {!loading && search && (
        <p className="text-xs text-neutral-400 mt-2 ml-1">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} para &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Drawer de detalhes */}
      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

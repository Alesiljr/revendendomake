"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, RefreshCw } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/supabase/types";

const statusColors: Record<string, string> = {
  novo: "bg-blue-100 text-blue-700",
  contatado: "bg-yellow-100 text-yellow-700",
  convertido: "bg-green-100 text-green-700",
  descartado: "bg-neutral-100 text-neutral-500",
};

const statusLabels = ["Todos", "novo", "contatado", "convertido", "descartado"] as const;
type StatusFilter = (typeof statusLabels)[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function downloadCSV(leads: Lead[]) {
  const header = ["Nome", "Telefone", "Cidade", "Estado", "Origem", "Status", "Data"];
  const rows = leads.map((l) => [
    l.name, l.phone, l.city ?? "", l.state ?? "", l.source ?? "", l.status, formatDate(l.created_at),
  ]);
  const csv = [header, ...rows].map((r) => r.join(";")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("Todos");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function updateStatus(id: string, status: LeadStatus) {
    setUpdatingId(id);
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setUpdatingId(null);
  }

  const filtered = activeFilter === "Todos" ? leads : leads.filter((l) => l.status === activeFilter);
  const total = leads.length;
  const novos = leads.filter((l) => l.status === "novo").length;
  const convertidos = leads.filter((l) => l.status === "convertido").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Leads</h2>
          <p className="text-neutral-500 text-sm mt-1">Cadastros recebidos pelo formulário.</p>
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

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: total, color: "text-neutral-900" },
          { label: "Novos", value: novos, color: "text-blue-700" },
          { label: "Convertidos", value: convertidos, color: "text-green-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-4 text-center shadow-sm">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-neutral-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {statusLabels.map((s) => (
          <button
            key={s}
            onClick={() => setActiveFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
              activeFilter === s
                ? "bg-primary-700 text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {loading ? (
          <p className="px-6 py-10 text-center text-neutral-400">Carregando leads...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-500 text-xs uppercase tracking-wide bg-neutral-50">
                  <th className="px-6 py-3 text-left font-medium">Nome</th>
                  <th className="px-6 py-3 text-left font-medium">Telefone</th>
                  <th className="px-6 py-3 text-left font-medium">Cidade/Estado</th>
                  <th className="px-6 py-3 text-left font-medium">Origem</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Data</th>
                  <th className="px-6 py-3 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-neutral-400">
                      {leads.length === 0 ? "Nenhum lead recebido ainda." : "Nenhum lead com este status."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead) => (
                    <tr key={lead.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-neutral-900">{lead.name}</td>
                      <td className="px-6 py-3 text-neutral-600">{lead.phone}</td>
                      <td className="px-6 py-3 text-neutral-600">
                        {[lead.city, lead.state].filter(Boolean).join(", ")}
                      </td>
                      <td className="px-6 py-3 text-neutral-500 text-xs">{lead.source ?? "—"}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-neutral-500">{formatDate(lead.created_at)}</td>
                      <td className="px-6 py-3">
                        <select
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                          className="text-xs border border-neutral-200 rounded-lg px-2 py-1 bg-white text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary-700 disabled:opacity-50"
                        >
                          <option value="novo">novo</option>
                          <option value="contatado">contatado</option>
                          <option value="convertido">convertido</option>
                          <option value="descartado">descartado</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

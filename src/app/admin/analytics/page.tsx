"use client";

import { useEffect, useState } from "react";
import { Users, MousePointerClick, Eye, TrendingUp, RefreshCw } from "lucide-react";

interface TopPage { path: string; count: number }
interface TopButton { name: string; count: number }
interface DayCount { date: string; count: number }
interface RecentEvent { session_id: string; event_type: string; event_name: string | null; page_path: string | null; created_at: string }

interface AnalyticsData {
  period: string;
  uniqueVisitors: number;
  pageViews: number;
  totalClicks: number;
  topPages: TopPage[];
  topButtons: TopButton[];
  byDay: DayCount[];
  recentEvents: RecentEvent[];
}

const PERIODS = [
  { label: "7 dias", value: 7 },
  { label: "30 dias", value: 30 },
  { label: "90 dias", value: 90 },
];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  async function load(d: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?days=${d}`);
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(days); }, [days]);

  const maxDay = data ? Math.max(...data.byDay.map((d) => d.count), 1) : 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
          <p className="text-sm text-neutral-500 mt-1">Acessos e cliques no site</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setDays(p.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  days === p.value
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => load(days)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </button>
        </div>
      </div>

      {loading && !data && (
        <div className="text-center py-16 text-neutral-400">Carregando...</div>
      )}

      {data && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-neutral-500">Visitantes únicos</span>
              </div>
              <p className="text-3xl font-bold text-neutral-900">{data.uniqueVisitors.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-neutral-400 mt-1">últimos {days} dias</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-neutral-500">Pageviews</span>
              </div>
              <p className="text-3xl font-bold text-neutral-900">{data.pageViews.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-neutral-400 mt-1">últimos {days} dias</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <MousePointerClick className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-neutral-500">Cliques em botões</span>
              </div>
              <p className="text-3xl font-bold text-neutral-900">{data.totalClicks.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-neutral-400 mt-1">últimos {days} dias</p>
            </div>
          </div>

          {/* Chart + top buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar chart by day */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-neutral-400" />
                <h2 className="text-sm font-semibold text-neutral-700">Pageviews por dia</h2>
              </div>
              {data.byDay.length === 0 ? (
                <p className="text-sm text-neutral-400 py-8 text-center">Sem dados no período</p>
              ) : (
                <div className="space-y-2">
                  {data.byDay.map((d) => (
                    <div key={d.date} className="flex items-center gap-3">
                      <span className="text-xs text-neutral-400 w-20 shrink-0">
                        {new Date(d.date + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                      </span>
                      <div className="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full bg-primary-600 rounded-full transition-all"
                          style={{ width: `${Math.round((d.count / maxDay) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-neutral-600 w-8 text-right">{d.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top buttons */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MousePointerClick className="w-4 h-4 text-neutral-400" />
                <h2 className="text-sm font-semibold text-neutral-700">Botões mais clicados</h2>
              </div>
              {data.topButtons.length === 0 ? (
                <p className="text-sm text-neutral-400 py-8 text-center">Sem cliques registrados</p>
              ) : (
                <div className="space-y-3">
                  {data.topButtons.map((b, i) => (
                    <div key={b.name} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-neutral-300 w-5 text-center">{i + 1}</span>
                      <span className="flex-1 text-sm text-neutral-700 font-mono truncate">{b.name}</span>
                      <span className="bg-pink-50 text-pink-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {b.count}×
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Top pages + recent events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top pages */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <h2 className="text-sm font-semibold text-neutral-700 mb-4">Páginas mais visitadas</h2>
              {data.topPages.length === 0 ? (
                <p className="text-sm text-neutral-400 py-8 text-center">Sem dados no período</p>
              ) : (
                <div className="divide-y divide-neutral-50">
                  {data.topPages.map((p, i) => (
                    <div key={p.path} className="flex items-center gap-3 py-2">
                      <span className="text-xs font-bold text-neutral-300 w-5 text-center">{i + 1}</span>
                      <span className="flex-1 text-sm text-neutral-700 font-mono truncate">{p.path}</span>
                      <span className="text-sm font-semibold text-neutral-500">{p.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent events */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <h2 className="text-sm font-semibold text-neutral-700 mb-4">Eventos recentes (24h)</h2>
              {data.recentEvents.length === 0 ? (
                <p className="text-sm text-neutral-400 py-8 text-center">Nenhum evento nas últimas 24h</p>
              ) : (
                <div className="divide-y divide-neutral-50 max-h-80 overflow-y-auto">
                  {data.recentEvents.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                        e.event_type === "pageview"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-pink-50 text-pink-600"
                      }`}>
                        {e.event_type === "pageview" ? "view" : "click"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-neutral-600 font-mono truncate">
                          {e.event_name ?? e.page_path ?? "—"}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {new Date(e.created_at).toLocaleString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

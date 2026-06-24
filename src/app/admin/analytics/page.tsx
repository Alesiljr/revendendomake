"use client";

import { useEffect, useState } from "react";
import {
  Users, MousePointerClick, Eye, TrendingUp, RefreshCw,
  MapPin, Flame, BarChart3, ExternalLink, CheckCircle, AlertCircle,
  Smartphone, Monitor, Tablet, Globe,
} from "lucide-react";

interface TopPage { path: string; count: number }
interface TopButton { name: string; count: number }
interface DayCount { date: string; count: number }
interface RecentEvent {
  session_id: string; event_type: string;
  event_name: string | null; page_path: string | null; created_at: string
}
interface StateCount { state: string; stateName: string; count: number; pct: number }
interface HeatmapData { grid: number[][]; rows: number; cols: number; maxCount: number }
interface DeviceCount { device: "mobile" | "tablet" | "desktop"; count: number; pct: number }
interface TrafficSource { source: string; count: number; pct: number }

interface AnalyticsData {
  period: string;
  uniqueVisitors: number;
  pageViews: number;
  totalClicks: number;
  topPages: TopPage[];
  topButtons: TopButton[];
  byDay: DayCount[];
  recentEvents: RecentEvent[];
  stateDistribution: StateCount[];
  clickHeatmap: HeatmapData;
  totalWithGeo: number;
  deviceDistribution: DeviceCount[];
  totalWithDevice: number;
  trafficSources: TrafficSource[];
}

const PERIODS = [
  { label: "Hoje",   days: 1  },
  { label: "7 dias", days: 7  },
  { label: "15 dias", days: 15 },
  { label: "30 dias", days: 30 },
];

function toInputDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function todayStr() { return toInputDate(new Date()); }
function daysAgoStr(n: number) { return toInputDate(new Date(Date.now() - n * 86400000)); }

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// ── Heatmap ──────────────────────────────────────────────────────────────────

function heatColor(count: number, max: number): string {
  if (count === 0) return "rgb(243,244,246)";
  const t = count / max;
  if (t < 0.2) return "rgb(219,234,254)";
  if (t < 0.4) return "rgb(134,239,172)";
  if (t < 0.6) return "rgb(253,224,71)";
  if (t < 0.8) return "rgb(251,146,60)";
  return "rgb(239,68,68)";
}

function HeatmapGrid({ data }: { data: HeatmapData }) {
  const { grid, rows, cols, maxCount } = data;
  const hasData = grid.flat().some((v) => v > 0);

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-neutral-400">
        <Flame className="w-8 h-8 mb-2 opacity-30" />
        <p className="text-sm">Sem dados de clique ainda.</p>
        <p className="text-xs mt-1 text-center">
          Cliques em botões com <code className="bg-neutral-100 px-1 rounded">data-track</code> geram o mapa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3 items-start">
        <div className="flex flex-col justify-between text-xs text-neutral-400 shrink-0 select-none" style={{ height: rows * 14 + (rows - 1) }}>
          <span>Topo</span>
          <span>50%</span>
          <span>Fim</span>
        </div>
        <div
          className="flex-1 grid gap-px bg-neutral-200 rounded overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {grid.map((row, r) =>
            row.map((count, c) => (
              <div
                key={`${r}-${c}`}
                style={{ height: 14, backgroundColor: heatColor(count, maxCount) }}
                title={count > 0 ? `${count} clique${count !== 1 ? "s" : ""}` : undefined}
                className="cursor-default transition-opacity hover:opacity-80"
              />
            ))
          )}
        </div>
      </div>
      <div className="flex justify-between text-xs text-neutral-400 pl-8 select-none">
        <span>Esquerda</span>
        <span>Centro</span>
        <span>Direita</span>
      </div>
      <div className="flex items-center gap-3 pl-8 flex-wrap">
        <span className="text-xs text-neutral-400">Intensidade:</span>
        {[
          { color: "rgb(219,234,254)", label: "baixa" },
          { color: "rgb(253,224,71)", label: "média" },
          { color: "rgb(239,68,68)", label: "alta" },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1 text-xs text-neutral-500">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Device distribution ──────────────────────────────────────────────────────

const DEVICE_META = {
  mobile:  { label: "Mobile",  Icon: Smartphone, color: "text-pink-600",   bg: "bg-pink-50",   bar: "bg-pink-500" },
  tablet:  { label: "Tablet",  Icon: Tablet,     color: "text-amber-600",  bg: "bg-amber-50",  bar: "bg-amber-500" },
  desktop: { label: "Desktop", Icon: Monitor,    color: "text-blue-600",   bg: "bg-blue-50",   bar: "bg-blue-500" },
} as const;

function DeviceChart({ data, total }: { data: DeviceCount[]; total: number }) {
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-neutral-400">
        <Monitor className="w-8 h-8 mb-2 opacity-30" />
        <p className="text-sm">Sem dados de dispositivo ainda.</p>
        <p className="text-xs mt-1 text-center">Os próximos acessos ao site serão identificados automaticamente.</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="space-y-4">
      {/* Cards */}
      <div className="grid grid-cols-3 gap-3">
        {data.map(({ device, count, pct }) => {
          const meta = DEVICE_META[device];
          return (
            <div key={device} className={`rounded-xl p-4 ${meta.bg} flex flex-col items-center gap-1`}>
              <meta.Icon className={`w-5 h-5 ${meta.color}`} />
              <p className={`text-xl font-bold ${meta.color}`}>{pct}%</p>
              <p className="text-xs font-medium text-neutral-600">{meta.label}</p>
              <p className="text-xs text-neutral-400">{count} sessão{count !== 1 ? "ões" : ""}</p>
            </div>
          );
        })}
      </div>
      {/* Bars */}
      <div className="space-y-2">
        {data.map(({ device, count }) => {
          const meta = DEVICE_META[device];
          return (
            <div key={device} className="flex items-center gap-3">
              <meta.Icon className={`w-4 h-4 ${meta.color} shrink-0`} />
              <span className="text-xs text-neutral-600 w-14 shrink-0">{meta.label}</span>
              <div className="flex-1 bg-neutral-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${meta.bar} rounded-full transition-all`}
                  style={{ width: `${Math.round((count / maxCount) * 100)}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-neutral-600 w-8 text-right">{count}</span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-neutral-400">{total} sessão{total !== 1 ? "ões" : ""} identificadas no período.</p>
    </div>
  );
}

// ── Traffic sources ──────────────────────────────────────────────────────────

const SOURCE_COLORS: Record<string, string> = {
  "Direto":               "bg-neutral-400",
  "Google":               "bg-blue-500",
  "Facebook / Instagram": "bg-pink-500",
  "TikTok":               "bg-purple-500",
  "WhatsApp":             "bg-green-500",
  "YouTube":              "bg-red-500",
  "Twitter / X":          "bg-sky-500",
  "Bing":                 "bg-teal-500",
  "Pinterest":            "bg-rose-500",
  "Outros":               "bg-amber-500",
};

function TrafficSourceChart({ data }: { data: TrafficSource[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-neutral-400">
        <Globe className="w-8 h-8 mb-2 opacity-30" />
        <p className="text-sm">Sem dados de tráfego ainda.</p>
      </div>
    );
  }

  const maxCount = data[0]?.count ?? 1;

  return (
    <div className="space-y-2">
      {data.map(({ source, count, pct }) => {
        const barColor = SOURCE_COLORS[source] ?? "bg-neutral-400";
        return (
          <div key={source} className="flex items-center gap-3">
            <span className="text-xs text-neutral-600 w-36 shrink-0 truncate">{source}</span>
            <div className="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full ${barColor} rounded-full transition-all`}
                style={{ width: `${Math.round((count / maxCount) * 100)}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-neutral-600 w-8 text-right">{count}</span>
            <span className="text-xs text-neutral-400 w-8 text-right">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}

// ── State bar chart ──────────────────────────────────────────────────────────

function StateChart({ data, total }: { data: StateCount[]; total: number }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-neutral-400">
        <MapPin className="w-8 h-8 mb-2 opacity-30" />
        <p className="text-sm">Sem dados de geolocalização ainda.</p>
        <p className="text-xs mt-1 text-center">
          Os próximos acessos serão geolocalizados automaticamente por IP após o deploy.
        </p>
      </div>
    );
  }

  const maxCount = data[0]?.count ?? 1;

  return (
    <div className="space-y-2">
      {data.map((s) => (
        <div key={s.state} className="flex items-center gap-3">
          <span className="text-xs font-bold text-neutral-500 w-6 shrink-0 text-right">{s.state}</span>
          <span className="text-xs text-neutral-600 w-28 shrink-0 truncate">{s.stateName}</span>
          <div className="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${Math.round((s.count / maxCount) * 100)}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-neutral-600 w-8 text-right">{s.count}</span>
          <span className="text-xs text-neutral-400 w-8 text-right">{s.pct}%</span>
        </div>
      ))}
      <p className="text-xs text-neutral-400 pt-1">
        {total} sessão{total !== 1 ? "ões" : ""} geolocalizadas no período.
      </p>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [data, setData]       = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDays, setActiveDays] = useState<number | null>(7);
  const [fromDate, setFromDate] = useState(daysAgoStr(7));
  const [toDate, setToDate]     = useState(todayStr());

  async function load(params: { days?: number; from?: string; to?: string }) {
    setLoading(true);
    try {
      const url = params.days != null
        ? `/api/admin/analytics?days=${params.days}`
        : `/api/admin/analytics?from=${params.from}&to=${params.to}`;
      const res = await fetch(url);
      setData(await res.json());
    } finally {
      setLoading(false);
    }
  }

  // initial load
  useEffect(() => { load({ days: 7 }); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function selectPreset(days: number) {
    setActiveDays(days);
    const from = daysAgoStr(days === 1 ? 0 : days);
    const to   = todayStr();
    setFromDate(from);
    setToDate(to);
    load({ days });
  }

  function applyCustomRange() {
    if (!fromDate || !toDate) return;
    setActiveDays(null);
    load({ from: fromDate, to: toDate });
  }

  function handleFromChange(v: string) {
    setFromDate(v);
    setActiveDays(null);
  }

  function handleToChange(v: string) {
    setToDate(v);
    setActiveDays(null);
  }

  const maxDay = data ? Math.max(...data.byDay.map((d) => d.count), 1) : 1;

  function periodLabel() {
    if (activeDays === 1) return "hoje";
    if (activeDays != null) return `últimos ${activeDays} dias`;
    return `${fromDate} → ${toDate}`;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
            <p className="text-sm text-neutral-500 mt-1">Acessos, dispositivos, localização e mapa de calor</p>
          </div>
          <button
            onClick={() => activeDays != null ? load({ days: activeDays }) : load({ from: fromDate, to: toDate })}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </button>
        </div>

        {/* Filtros de período */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Presets */}
          <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg">
            {PERIODS.map((p) => (
              <button
                key={p.days}
                onClick={() => selectPreset(p.days)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeDays === p.days
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Separador */}
          <span className="text-neutral-300 text-sm">|</span>

          {/* Data personalizada */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">De</span>
            <input
              type="date"
              value={fromDate}
              max={toDate}
              onChange={(e) => handleFromChange(e.target.value)}
              className={`text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                activeDays === null ? "border-primary-400 bg-primary-50" : "border-neutral-200 bg-white"
              }`}
            />
            <span className="text-xs text-neutral-500">até</span>
            <input
              type="date"
              value={toDate}
              min={fromDate}
              max={todayStr()}
              onChange={(e) => handleToChange(e.target.value)}
              className={`text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                activeDays === null ? "border-primary-400 bg-primary-50" : "border-neutral-200 bg-white"
              }`}
            />
            {activeDays === null && (
              <button
                onClick={applyCustomRange}
                disabled={loading || !fromDate || !toDate}
                className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors"
              >
                Aplicar
              </button>
            )}
          </div>
        </div>
      </div>

      {loading && !data && (
        <div className="text-center py-16 text-neutral-400">Carregando...</div>
      )}

      {data && (
        <>
          {/* ── KPI cards ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-neutral-500">Visitantes únicos</span>
              </div>
              <p className="text-3xl font-bold text-neutral-900">{data.uniqueVisitors.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-neutral-400 mt-1">{periodLabel()}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-neutral-500">Pageviews</span>
              </div>
              <p className="text-3xl font-bold text-neutral-900">{data.pageViews.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-neutral-400 mt-1">{periodLabel()}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <MousePointerClick className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-neutral-500">Cliques em botões</span>
              </div>
              <p className="text-3xl font-bold text-neutral-900">{data.totalClicks.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-neutral-400 mt-1">{periodLabel()}</p>
            </div>
          </div>

          {/* ── Fontes de tráfego ───────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-semibold text-neutral-700">Fontes de Tráfego</h2>
              <span className="ml-auto text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">dados existentes</span>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              De onde os visitantes chegam — calculado pelo referrer já registrado no banco.
            </p>
            <TrafficSourceChart data={data.trafficSources} />
          </div>

          {/* ── Dispositivos + Geolocalização ────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-pink-500" />
                <h2 className="text-sm font-semibold text-neutral-700">Dispositivos</h2>
                <span className="ml-auto text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">acumula após deploy</span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Mobile, tablet ou desktop — populado automaticamente nos próximos acessos.
              </p>
              <DeviceChart data={data.deviceDistribution} total={data.totalWithDevice} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <h2 className="text-sm font-semibold text-neutral-700">Visitantes por Estado</h2>
                <span className="ml-auto text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">acumula após deploy</span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Geolocalização por IP — para segmentar campanhas regionais.
              </p>
              <StateChart data={data.stateDistribution} total={data.totalWithGeo} />
            </div>
          </div>

          {/* ── Chart + top buttons ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          {/* ── Top pages + recent events ────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <h2 className="text-sm font-semibold text-neutral-700 mb-4">Eventos recentes (24h)</h2>
              {data.recentEvents.length === 0 ? (
                <p className="text-sm text-neutral-400 py-8 text-center">Nenhum evento nas últimas 24h</p>
              ) : (
                <div className="divide-y divide-neutral-50 max-h-80 overflow-y-auto">
                  {data.recentEvents.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                        e.event_type === "pageview" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"
                      }`}>
                        {e.event_type === "pageview" ? "view" : "click"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-neutral-600 font-mono truncate">
                          {e.event_name ?? e.page_path ?? "—"}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {new Date(e.created_at).toLocaleString("pt-BR", {
                            hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Heatmap ──────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-semibold text-neutral-700">Mapa de Calor de Cliques</h2>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Posição relativa dos cliques na página — eixo Y = altura da página (topo → fim), eixo X = largura.
            </p>
            <HeatmapGrid data={data.clickHeatmap} />
          </div>

          {/* ── Integrações externas ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                <h2 className="text-sm font-semibold text-neutral-700">Google Analytics</h2>
                {GA_ID ? (
                  <span className="ml-auto flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Ativo
                  </span>
                ) : (
                  <span className="ml-auto flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <AlertCircle className="w-3 h-3" /> Não configurado
                  </span>
                )}
              </div>
              {GA_ID ? (
                <>
                  <p className="text-xs text-neutral-500 mb-1">Measurement ID</p>
                  <code className="text-xs bg-neutral-100 px-2 py-1 rounded font-mono text-neutral-700">{GA_ID}</code>
                  <a
                    href="https://analytics.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 hover:underline"
                  >
                    Abrir Google Analytics <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              ) : (
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Adicione <code className="bg-neutral-100 px-1 rounded">NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX</code> no{" "}
                  <code className="bg-neutral-100 px-1 rounded">.env.local</code> para ativar.
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-purple-500" />
                <h2 className="text-sm font-semibold text-neutral-700">Microsoft Clarity</h2>
                {CLARITY_ID ? (
                  <span className="ml-auto flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Ativo
                  </span>
                ) : (
                  <span className="ml-auto flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <AlertCircle className="w-3 h-3" /> Não configurado
                  </span>
                )}
              </div>
              {CLARITY_ID ? (
                <a
                  href="https://clarity.microsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-purple-600 hover:underline"
                >
                  Abrir Clarity (heatmaps avançados) <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Adicione <code className="bg-neutral-100 px-1 rounded">NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx</code> no{" "}
                  <code className="bg-neutral-100 px-1 rounded">.env.local</code> para ativar gravações de sessão e heatmaps avançados.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

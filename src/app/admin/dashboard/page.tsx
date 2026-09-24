"use client";

import { useEffect, useState, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  Users, MousePointerClick, Eye, TrendingUp, RefreshCw,
  MapPin, Flame, BarChart3, ExternalLink, CheckCircle, AlertCircle,
  Smartphone, Monitor, Tablet, Globe, Clock, Megaphone, Download,
} from "lucide-react";

const BR_GEO_URL =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

interface TopPage    { path: string; count: number }
interface TopButton  { name: string; count: number }
interface DayCount   { date: string; count: number }
interface RecentEvent {
  session_id: string; event_type: string;
  event_name: string | null; page_path: string | null; created_at: string
}
interface StateCount  { state: string; stateName: string; count: number; pct: number }
interface HeatmapData { grid: number[][]; rows: number; cols: number; maxCount: number }
interface DeviceCount { device: "mobile" | "tablet" | "desktop"; count: number; pct: number }
interface TrafficSource { source: string; count: number; pct: number }
interface ScrollFunnelItem { milestone: number; sessions: number; pct: number }
interface CampaignRow {
  campaign: string; source: string; medium: string; content: string;
  sessions: number; pageViews: number; clicks: number; whatsapp: number; forms: number;
}

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
  avgTimeOnPage: number;
  scrollFunnel: ScrollFunnelItem[];
  campaigns: CampaignRow[];
  hasAttribution: boolean;
}

const PERIODS = [
  { label: "Hoje",    days: 1  },
  { label: "7 dias",  days: 7  },
  { label: "15 dias", days: 15 },
  { label: "30 dias", days: 30 },
];

function toInputDate(d: Date) { return d.toISOString().slice(0, 10); }
function todayStr()            { return toInputDate(new Date()); }
function daysAgoStr(n: number) { return toInputDate(new Date(Date.now() - n * 86400000)); }

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// ── Heat color scale ─────────────────────────────────────────────────────────

function heatRGB(t: number): [number, number, number] {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  if (t < 0.25) { const f = t / 0.25;        return [0,       c(f * 255),       255]; }
  if (t < 0.50) { const f = (t - 0.25) / 0.25; return [0,       255,       c((1 - f) * 255)]; }
  if (t < 0.75) { const f = (t - 0.50) / 0.25; return [c(f * 255), 255,       0]; }
  const f = (t - 0.75) / 0.25;
  return [255, c((1 - f) * 255), 0];
}

function drawHeatmap(canvas: HTMLCanvasElement, points: { x: number; y: number }[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!points.length) return;

  const w = canvas.width;
  const h = canvas.height;

  // Raio adaptativo: maior quando há poucos pontos para garantir visibilidade
  const baseRadius = Math.max(40, w * 0.045);
  const radius = points.length <= 5
    ? baseRadius * 1.8
    : points.length <= 20
    ? baseRadius * 1.3
    : baseRadius;

  // Intensidade por ponto: maior quando há poucos (evita subexposto)
  const intensity = points.length <= 5 ? 0.55 : points.length <= 20 ? 0.38 : 0.28;

  const off = document.createElement("canvas");
  off.width = w; off.height = h;
  const octx = off.getContext("2d")!;

  for (const { x, y } of points) {
    const px = (x / 100) * w;
    const py = (y / 100) * h;
    const grad = octx.createRadialGradient(px, py, 0, px, py, radius);
    grad.addColorStop(0,   `rgba(0,0,0,${intensity})`);
    grad.addColorStop(0.4, `rgba(0,0,0,${intensity * 0.5})`);
    grad.addColorStop(1,   "rgba(0,0,0,0)");
    octx.fillStyle = grad;
    octx.beginPath();
    octx.arc(px, py, radius, 0, Math.PI * 2);
    octx.fill();
  }

  // Amplificador de cor: calibrado para poucos ou muitos pontos
  const amplify = points.length <= 5 ? 8 : points.length <= 20 ? 5 : 2.5;

  const density = octx.getImageData(0, 0, w, h);
  const out     = ctx.createImageData(w, h);
  for (let i = 0; i < density.data.length; i += 4) {
    const d = (density.data[i + 3] ?? 0) / 255;
    if (d > 0.004) {
      const t = Math.min(d * amplify, 1);
      const [r, g, b] = heatRGB(t);
      out.data[i]     = r;
      out.data[i + 1] = g;
      out.data[i + 2] = b;
      out.data[i + 3] = Math.min(Math.round(d * amplify * 220), 220);
    }
  }
  ctx.putImageData(out, 0, 0);
}

// Zonas de leitura: bandas horizontais em cores frias (ciano → azul)
function drawReadingZones(canvas: HTMLCanvasElement, points: { x: number; y: number }[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!points.length) return;

  const w = canvas.width;
  const h = canvas.height;

  // Banda mais larga para poucos pontos
  const bandR = points.length <= 10
    ? Math.max(50, h * 0.025)
    : Math.max(30, h * 0.016);
  const bandIntensity = points.length <= 10 ? 0.22 : 0.14;
  const amplify = points.length <= 10 ? 10 : 3.5;

  const off = document.createElement("canvas");
  off.width = w; off.height = h;
  const octx = off.getContext("2d")!;

  for (const { y } of points) {
    const py = (y / 100) * h;
    const grad = octx.createLinearGradient(0, py - bandR * 2, 0, py + bandR * 2);
    grad.addColorStop(0,   "rgba(0,0,0,0)");
    grad.addColorStop(0.3, `rgba(0,0,0,${bandIntensity * 0.6})`);
    grad.addColorStop(0.5, `rgba(0,0,0,${bandIntensity})`);
    grad.addColorStop(0.7, `rgba(0,0,0,${bandIntensity * 0.6})`);
    grad.addColorStop(1,   "rgba(0,0,0,0)");
    octx.fillStyle = grad;
    octx.fillRect(0, py - bandR * 2, w, bandR * 4);
  }

  const density = octx.getImageData(0, 0, w, h);
  const out     = ctx.createImageData(w, h);
  for (let i = 0; i < density.data.length; i += 4) {
    const d = (density.data[i + 3] ?? 0) / 255;
    if (d > 0.003) {
      const t = Math.min(d * amplify, 1);
      const g = Math.round((1 - t) * 210 + t * 80);
      out.data[i]     = 0;
      out.data[i + 1] = g;
      out.data[i + 2] = 255;
      out.data[i + 3] = Math.min(Math.round(d * amplify * 200), 200);
    }
  }
  ctx.putImageData(out, 0, 0);
}

// ── Scroll Depth Overlay ───────────────────────────────────────────────────────

function scrollDepthRGB(pct: number): [number, number, number] {
  const t = pct / 100;
  if (t < 0.5) return [255, Math.round(t * 2 * 180), 0];
  const f = (t - 0.5) * 2;
  return [Math.round((1 - f) * 255), Math.round(180 + f * 55), 0];
}

function drawScrollLines(canvas: HTMLCanvasElement, funnel: ScrollFunnelItem[], withBands: boolean) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!funnel || funnel.every((f) => f.sessions === 0)) return;

  const w = canvas.width;
  const h = canvas.height;

  // Colored gradient bands (only when full view is active)
  if (withBands) {
    const points: { milestone: number; pct: number }[] = [
      { milestone: 0, pct: 100 },
      ...funnel,
    ];
    for (let i = 0; i < points.length - 1; i++) {
      const from = points[i]!;
      const to   = points[i + 1]!;
      const y1 = Math.round((from.milestone / 100) * h);
      const y2 = Math.round((to.milestone / 100) * h);
      const [r1, g1, b1] = scrollDepthRGB(from.pct);
      const [r2, g2, b2] = scrollDepthRGB(to.pct);
      const grad = ctx.createLinearGradient(0, y1, 0, y2);
      grad.addColorStop(0, `rgba(${r1},${g1},${b1},0.30)`);
      grad.addColorStop(1, `rgba(${r2},${g2},${b2},0.30)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, y1, w, y2 - y1);
    }
  }

  // Dashed milestone lines + labels — always drawn
  ctx.setLineDash([6, 4]);
  ctx.lineWidth = withBands ? 2 : 1.5;

  // Ápice: 100% dos visitantes veem o topo
  {
    const [r, g, b] = scrollDepthRGB(100);
    const y = 6;
    ctx.strokeStyle = `rgba(${r},${g},${b},${withBands ? 0.9 : 0.7})`;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    const label = withBands ? "Topo  ·  100% dos visitantes" : "0%  100%";
    ctx.font = `${withBands ? "bold 13px" : "bold 12px"} -apple-system, system-ui, sans-serif`;
    const tw = ctx.measureText(label).width;
    const px = 10, py = 4, ph = 20, pw = tw + 20;
    ctx.fillStyle = `rgba(${r},${g},${b},${withBands ? 0.90 : 0.80})`;
    ctx.beginPath();
    ctx.moveTo(px + 5, py); ctx.lineTo(px + pw - 5, py);
    ctx.quadraticCurveTo(px + pw, py, px + pw, py + 5);
    ctx.lineTo(px + pw, py + ph - 5);
    ctx.quadraticCurveTo(px + pw, py + ph, px + pw - 5, py + ph);
    ctx.lineTo(px + 5, py + ph);
    ctx.quadraticCurveTo(px, py + ph, px, py + ph - 5);
    ctx.lineTo(px, py + 5);
    ctx.quadraticCurveTo(px, py, px + 5, py);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillText(label, px + 10, py + 14);
  }

  funnel.forEach((pt) => {
    const y = Math.round((pt.milestone / 100) * h);
    const [r, g, b] = scrollDepthRGB(pt.pct);
    const lineAlpha = withBands ? 0.9 : 0.7;
    ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();

    const label = withBands
      ? `${pt.milestone}% da página  ·  ${pt.pct}% chegaram aqui`
      : `${pt.milestone}%  ${pt.pct}%`;
    ctx.font = `${withBands ? "bold 13px" : "bold 12px"} -apple-system, system-ui, sans-serif`;
    const tw = ctx.measureText(label).width;
    const px = 10, py = Math.max(4, y - 24), ph = 20, pw = tw + 20;
    const pillAlpha = withBands ? 0.90 : 0.80;
    ctx.fillStyle = `rgba(${r},${g},${b},${pillAlpha})`;
    ctx.beginPath();
    ctx.moveTo(px + 5, py);
    ctx.lineTo(px + pw - 5, py);
    ctx.quadraticCurveTo(px + pw, py, px + pw, py + 5);
    ctx.lineTo(px + pw, py + ph - 5);
    ctx.quadraticCurveTo(px + pw, py + ph, px + pw - 5, py + ph);
    ctx.lineTo(px + 5, py + ph);
    ctx.quadraticCurveTo(px, py + ph, px, py + ph - 5);
    ctx.lineTo(px, py + 5);
    ctx.quadraticCurveTo(px, py, px + 5, py);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillText(label, px + 10, py + 14);
  });
  // ── Marcador de transição verde → vermelho (pct cruza 50%) ─────────────────
  const allPts = [{ milestone: 0, pct: 100 }, ...funnel];
  for (let i = 0; i < allPts.length - 1; i++) {
    const a = allPts[i]!;
    const b = allPts[i + 1]!;
    if (a.pct >= 50 && b.pct < 50) {
      // Interpolação linear para achar o milestone exato onde pct = 50
      const t = (a.pct - 50) / (a.pct - b.pct);
      const pagePct = Math.round(a.milestone + t * (b.milestone - a.milestone));
      const y = Math.round((pagePct / 100) * h);

      // Linha amarela espessa
      ctx.setLineDash([8, 4]);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(234, 179, 8, 0.95)";
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      ctx.setLineDash([]);

      // Pill com destaque
      const label = withBands
        ? `⚠ ${pagePct}% da página — metade dos visitantes saiu aqui`
        : `⚠ ${pagePct}%`;
      ctx.font = `bold ${withBands ? 13 : 12}px -apple-system, system-ui, sans-serif`;
      const tw2 = ctx.measureText(label).width;
      const px2 = 10, py2 = Math.max(4, y - 24), ph2 = 20, pw2 = tw2 + 20;
      ctx.fillStyle = "rgba(202, 138, 4, 0.95)";
      ctx.beginPath();
      ctx.moveTo(px2 + 5, py2); ctx.lineTo(px2 + pw2 - 5, py2);
      ctx.quadraticCurveTo(px2 + pw2, py2, px2 + pw2, py2 + 5);
      ctx.lineTo(px2 + pw2, py2 + ph2 - 5);
      ctx.quadraticCurveTo(px2 + pw2, py2 + ph2, px2 + pw2 - 5, py2 + ph2);
      ctx.lineTo(px2 + 5, py2 + ph2);
      ctx.quadraticCurveTo(px2, py2 + ph2, px2, py2 + ph2 - 5);
      ctx.lineTo(px2, py2 + 5);
      ctx.quadraticCurveTo(px2, py2, px2 + 5, py2);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillText(label, px2 + 10, py2 + 14);
      break;
    }
  }
  ctx.setLineDash([]);
}

function drawScrollDepth(canvas: HTMLCanvasElement, funnel: ScrollFunnelItem[]) {
  drawScrollLines(canvas, funnel, true);
}

// ── Brazil map color scale (pink, matching site theme) ────────────────────────

function stateColor(t: number): string {
  if (t <= 0)    return "#f3f4f6";
  if (t < 0.15)  return "#fce7f3";
  if (t < 0.35)  return "#f9a8d4";
  if (t < 0.60)  return "#ec4899";
  if (t < 0.80)  return "#be185d";
  return "#831843";
}

// ── Brazil Map (compact — side by side with state list) ──────────────────────

function BrazilMap({ data, total }: { data: StateCount[]; total: number }) {
  const [tooltip, setTooltip] = useState<string | null>(null);

  const countMap: Record<string, number> = {};
  let maxCount = 1;
  data.forEach((s) => {
    countMap[s.state] = s.count;
    if (s.count > maxCount) maxCount = s.count;
  });

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-neutral-400">
        <MapPin className="w-8 h-8 mb-2 opacity-30" />
        <p className="text-sm">Sem dados de geolocalização ainda.</p>
        <p className="text-xs mt-1 text-center">
          Os próximos acessos serão geolocalizados automaticamente por IP.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      {/* Mapa responsivo */}
      <div className="w-full sm:w-2/5 shrink-0">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-52, -15], scale: 700 }}
          width={600}
          height={560}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={BR_GEO_URL}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                const code: string =
                  geo.properties?.sigla ??
                  geo.properties?.UF ??
                  geo.properties?.id ??
                  "";
                const count = countMap[code] ?? 0;
                const t = count / maxCount;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={stateColor(t)}
                    stroke="#ffffff"
                    strokeWidth={1.2}
                    onMouseEnter={() =>
                      setTooltip(
                        count > 0
                          ? `${code} — ${count} visitante${count !== 1 ? "s" : ""}`
                          : `${code} — sem visitas`
                      )
                    }
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      hover:   { fill: "#f59e0b", outline: "none" },
                      pressed: { outline: "none" },
                      default: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {tooltip && (
          <p className="text-[10px] text-center text-neutral-500 mt-1 leading-tight">{tooltip}</p>
        )}
      </div>

      {/* Lista de estados */}
      <div className="flex-1 space-y-1.5 min-w-0">
        {data.slice(0, 8).map((s) => (
          <div key={s.state} className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-500 w-5 shrink-0 text-right">{s.state}</span>
            <div className="flex-1 bg-neutral-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${s.pct}%`, backgroundColor: stateColor(s.count / maxCount) }}
              />
            </div>
            <span className="text-[11px] font-semibold text-neutral-600 w-4 shrink-0 text-right">{s.count}</span>
          </div>
        ))}
        <p className="text-[10px] text-neutral-400 pt-1">
          {total} sessão{total !== 1 ? "ões" : ""} geo.
        </p>
      </div>
    </div>
  );
}

// ── Click Heatmap Live (iframe + canvas) ──────────────────────────────────────

const HEATMAP_PAGES = [
  { label: "Home",              path: "/" },
  { label: "Seja Revendedora",  path: "/seja-revendedora" },
  { label: "Sobre",             path: "/sobre" },
  { label: "Blog",              path: "/blog" },
];

const IFRAME_NATIVE_W = 1440;
const IFRAME_NATIVE_H_DEFAULT = 5000;

type HeatLayer  = "both" | "clicks" | "attention" | "scroll";
type HeatDevice = "all" | "desktop" | "mobile" | "tablet";

function ClickHeatmapLive({
  activeDays,
  fromDate,
  toDate,
  scrollFunnel,
}: {
  activeDays: number | null;
  fromDate: string;
  toDate: string;
  scrollFunnel: ScrollFunnelItem[];
}) {
  const [page, setPage]                       = useState("/");
  const [clickPoints, setClickPoints]         = useState<{ x: number; y: number }[]>([]);
  const [attentionPoints, setAttentionPoints] = useState<{ x: number; y: number }[]>([]);
  const [layer, setLayer]                     = useState<HeatLayer>("both");
  const [device, setDevice]                   = useState<HeatDevice>("all");
  const [loadingPts, setLoadingPts]           = useState(false);
  const [iframeH, setIframeH]                 = useState(IFRAME_NATIVE_H_DEFAULT);
  const [scale, setScale]                     = useState(0.5);
  const innerRef          = useRef<HTMLDivElement>(null);
  const iframeRef         = useRef<HTMLIFrameElement>(null);
  const canvasClickRef    = useRef<HTMLCanvasElement>(null);
  const canvasAttnRef     = useRef<HTMLCanvasElement>(null);
  const canvasScrollRef   = useRef<HTMLCanvasElement>(null);
  const canvasGuideRef    = useRef<HTMLCanvasElement>(null);

  // Responsive scale
  useEffect(() => {
    function calc() {
      if (innerRef.current) setScale(innerRef.current.offsetWidth / IFRAME_NATIVE_W);
    }
    calc();
    const obs = new ResizeObserver(calc);
    if (innerRef.current) obs.observe(innerRef.current);
    return () => obs.disconnect();
  }, []);

  // Detect real page height from same-origin iframe after load
  function handleIframeLoad() {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc) {
        const h = Math.max(
          doc.body.scrollHeight,
          doc.documentElement.scrollHeight,
          1200,
        );
        setIframeH(h + 150);
      }
    } catch {
      // cross-origin fallback — keep default
    }
  }

  // Fetch points when page, period or device filter changes
  useEffect(() => {
    setLoadingPts(true);
    const base = activeDays != null
      ? `page=${encodeURIComponent(page)}&days=${activeDays}`
      : `page=${encodeURIComponent(page)}&from=${fromDate}&to=${toDate}`;

    // Cliques: filtrar por dispositivo (posição exata depende do layout do device)
    const clickDev = device !== "all" ? `&device=${device}` : "";
    // Atenção/leitura: NUNCA filtrar por device — a posição Y de leitura é relativa
    // à página e não muda por device. Filtrar excluiria eventos com device_type null.
    const attnDev = "";

    Promise.all([
      fetch(`/api/admin/analytics/heatmap?${base}&type=click${clickDev}`).then((r) => r.json()),
      fetch(`/api/admin/analytics/heatmap?${base}&type=attention${attnDev}`).then((r) => r.json()),
    ])
      .then(([c, a]) => {
        setClickPoints(c.points ?? []);
        setAttentionPoints(a.points ?? []);
      })
      .catch(() => { setClickPoints([]); setAttentionPoints([]); })
      .finally(() => setLoadingPts(false));
  }, [page, activeDays, fromDate, toDate, device]);

  // Draw click heatmap
  useEffect(() => {
    if (!canvasClickRef.current) return;
    const canvas = canvasClickRef.current;
    canvas.width  = Math.round(IFRAME_NATIVE_W * scale);
    canvas.height = Math.round(iframeH * scale);
    drawHeatmap(canvas, clickPoints);
  }, [clickPoints, scale, iframeH]);

  // Draw reading zones
  useEffect(() => {
    if (!canvasAttnRef.current) return;
    const canvas = canvasAttnRef.current;
    canvas.width  = Math.round(IFRAME_NATIVE_W * scale);
    canvas.height = Math.round(iframeH * scale);
    drawReadingZones(canvas, attentionPoints);
  }, [attentionPoints, scale, iframeH]);

  // Draw scroll depth full overlay (bands + lines)
  useEffect(() => {
    if (!canvasScrollRef.current) return;
    const canvas = canvasScrollRef.current;
    canvas.width  = Math.round(IFRAME_NATIVE_W * scale);
    canvas.height = Math.round(iframeH * scale);
    drawScrollDepth(canvas, scrollFunnel);
  }, [scrollFunnel, scale, iframeH]);

  // Draw scroll guide lines only (always visible on other layers)
  useEffect(() => {
    if (!canvasGuideRef.current) return;
    const canvas = canvasGuideRef.current;
    canvas.width  = Math.round(IFRAME_NATIVE_W * scale);
    canvas.height = Math.round(iframeH * scale);
    drawScrollLines(canvas, scrollFunnel, false);
  }, [scrollFunnel, scale, iframeH]);

  const scaledH    = Math.round(iframeH * scale);
  const totalPts   = clickPoints.length + attentionPoints.length;

  const LAYERS: { key: HeatLayer; label: string }[] = [
    { key: "scroll",    label: "Funil de Scroll" },
    { key: "both",      label: "Cliques + Leitura" },
    { key: "clicks",    label: "Cliques" },
    { key: "attention", label: "Leitura" },
  ];

  return (
    <div className="space-y-3">
      {/* Page selector */}
      <div className="flex gap-2 flex-wrap items-center">
        {HEATMAP_PAGES.map((p) => (
          <button
            key={p.path}
            onClick={() => { setPage(p.path); setIframeH(IFRAME_NATIVE_H_DEFAULT); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              page === p.path
                ? "bg-orange-50 text-orange-700 border-orange-200"
                : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {p.label}
          </button>
        ))}
        <span className="text-xs text-neutral-400 ml-auto">
          {loadingPts ? "Carregando..." : layer === "scroll"
            ? `${scrollFunnel.filter(f => f.sessions > 0).length} marcos de scroll com dados`
            : `${clickPoints.length} clique${clickPoints.length !== 1 ? "s" : ""} · ${attentionPoints.length} leitura${attentionPoints.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Layer toggle */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-neutral-500">Camada:</span>
        {LAYERS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setLayer(opt.key)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
              layer === opt.key
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {opt.key === "scroll"    && <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />}
            {opt.key === "clicks"    && <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />}
            {opt.key === "attention" && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />}
            {opt.key === "both"      && <span className="flex gap-0.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /></span>}
            {opt.label}
          </button>
        ))}
      </div>

      {/* Device filter — mobile/desktop têm alturas de página diferentes,
          misturar dispositivos distorce as posições no iframe desktop */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-neutral-500">Dispositivo:</span>
        {(["desktop", "mobile", "tablet", "all"] as HeatDevice[]).map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
              device === d
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {{ desktop: "Desktop", mobile: "Mobile", tablet: "Tablet", all: "Todos" }[d]}
          </button>
        ))}
        {device !== "desktop" && (
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
            {device === "all"
              ? "Posições mobile podem deslocar no iframe desktop"
              : device === "mobile"
              ? "Página mobile é mais alta — posições aparecem deslocadas"
              : ""}
          </span>
        )}
      </div>

      {/* Heatmap container */}
      <div
        className="border border-neutral-200 rounded-xl overflow-y-auto bg-neutral-50"
        style={{ maxHeight: 580 }}
      >
        <div ref={innerRef} style={{ position: "relative", width: "100%", height: scaledH }}>
          {/* Site iframe */}
          <iframe
            ref={iframeRef}
            src={page}
            scrolling="no"
            onLoad={handleIframeLoad}
            title={`Heatmap — ${page}`}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: IFRAME_NATIVE_W,
              height: iframeH,
              border: "none",
              transformOrigin: "top left",
              transform: `scale(${scale})`,
              pointerEvents: "none",
            }}
          />
          {/* Scroll guide canvas — linhas pontilhadas sempre visíveis */}
          <canvas
            ref={canvasGuideRef}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              opacity: layer === "scroll" ? 0 : 1,
              transition: "opacity 0.25s",
              pointerEvents: "none",
            }}
          />
          {/* Scroll depth canvas — bandas + linhas (camada scroll) */}
          <canvas
            ref={canvasScrollRef}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              opacity: layer === "scroll" ? 1 : 0,
              transition: "opacity 0.25s",
              pointerEvents: "none",
            }}
          />
          {/* Attention canvas — bandas de leitura (azul/ciano) */}
          <canvas
            ref={canvasAttnRef}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              opacity: layer === "clicks" || layer === "scroll" ? 0 : 0.72,
              transition: "opacity 0.25s",
              pointerEvents: "none",
            }}
          />
          {/* Click canvas — pontos de calor (vermelho/quente) */}
          <canvas
            ref={canvasClickRef}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              opacity: layer === "attention" || layer === "scroll" ? 0 : 0.78,
              transition: "opacity 0.25s",
              pointerEvents: "none",
            }}
          />
          {/* Empty state total */}
          {!loadingPts && totalPts === 0 && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "rgba(255,255,255,0.60)", backdropFilter: "blur(2px)" }}
            >
              <Flame className="w-10 h-10 text-neutral-300 mb-2" />
              <p className="text-sm text-neutral-500 font-medium">Sem dados nesta página ainda.</p>
              <p className="text-xs text-neutral-400 mt-1 text-center max-w-xs">
                Abra o site em outra aba, navegue por ele e volte aqui para ver os dados.
              </p>
            </div>
          )}
          {/* Aviso quando há cliques mas sem leitura na camada ativa */}
          {!loadingPts && layer !== "clicks" && attentionPoints.length === 0 && clickPoints.length > 0 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-900/80 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm text-center max-w-xs"
            >
              Zonas de leitura acumulam conforme visitantes navegam. Abra o site e role a página para gerar dados.
            </div>
          )}
        </div>
      </div>

      {/* Legends */}
      <div className="flex flex-wrap gap-6 justify-center text-xs text-neutral-400">
        {layer === "scroll" && (
          <div className="flex items-center gap-2">
            <span>Scroll — poucos</span>
            <div className="flex gap-px rounded overflow-hidden">
              {[0, 20, 40, 60, 80, 100].map((pct) => {
                const [r, g, b] = scrollDepthRGB(pct);
                return <div key={pct} className="w-8 h-3" style={{ backgroundColor: `rgb(${r},${g},${b})` }} />;
              })}
            </div>
            <span>muitos</span>
          </div>
        )}
        {layer !== "attention" && layer !== "scroll" && (
          <div className="flex items-center gap-2">
            <span>Cliques — menos</span>
            <div className="flex gap-px rounded overflow-hidden">
              {[0.05, 0.2, 0.4, 0.6, 0.8, 0.95].map((t) => {
                const [r, g, b] = heatRGB(t);
                return <div key={t} className="w-8 h-3" style={{ backgroundColor: `rgb(${r},${g},${b})` }} />;
              })}
            </div>
            <span>mais</span>
          </div>
        )}
        {layer !== "clicks" && layer !== "scroll" && (
          <div className="flex items-center gap-2">
            <span>Leitura — menos</span>
            <div className="flex gap-px rounded overflow-hidden">
              {[0.05, 0.2, 0.4, 0.6, 0.8, 0.95].map((t) => {
                const g = Math.round((1 - t) * 210 + t * 100);
                return <div key={t} className="w-8 h-3" style={{ backgroundColor: `rgb(0,${g},255)` }} />;
              })}
            </div>
            <span>mais</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Device chart ──────────────────────────────────────────────────────────────

const DEVICE_META = {
  mobile:  { label: "Mobile",  Icon: Smartphone, color: "text-pink-600",  bg: "bg-pink-50",  bar: "bg-pink-500" },
  tablet:  { label: "Tablet",  Icon: Tablet,     color: "text-amber-600", bg: "bg-amber-50", bar: "bg-amber-500" },
  desktop: { label: "Desktop", Icon: Monitor,    color: "text-blue-600",  bg: "bg-blue-50",  bar: "bg-blue-500" },
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
      <div className="grid grid-cols-3 gap-3">
        {data.map(({ device, count, pct }) => {
          const meta = DEVICE_META[device];
          return (
            <div key={device} className={`rounded-xl p-4 ${meta.bg} flex flex-col items-center gap-1`}>
              <meta.Icon className={`w-5 h-5 ${meta.color}`} />
              <p className={`text-xl font-bold ${meta.color}`}>{pct}%</p>
              <p className="text-xs font-medium text-neutral-600">{meta.label}</p>
              <p className="text-xs text-neutral-400">{count} sess.</p>
            </div>
          );
        })}
      </div>
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
      <p className="text-xs text-neutral-400">{total} sessão{total !== 1 ? "ões" : ""} identificadas.</p>
    </div>
  );
}

// ── Traffic sources ───────────────────────────────────────────────────────────

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
      {data.map(({ source, count, pct }) => (
        <div key={source} className="flex items-center gap-3">
          <span className="text-xs text-neutral-600 w-36 shrink-0 truncate">{source}</span>
          <div className="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full ${SOURCE_COLORS[source] ?? "bg-neutral-400"} rounded-full transition-all`}
              style={{ width: `${Math.round((count / maxCount) * 100)}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-neutral-600 w-8 text-right">{count}</span>
          <span className="text-xs text-neutral-400 w-8 text-right">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (seconds < 60)   return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}


// ── Main page ─────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [data, setData]             = useState<AnalyticsData | null>(null);
  const [loading, setLoading]       = useState(true);
  const [activeDays, setActiveDays] = useState<number | null>(7);
  const [fromDate, setFromDate]     = useState(daysAgoStr(7));
  const [toDate, setToDate]         = useState(todayStr());

  async function load(params: { days?: number; from?: string; to?: string }) {
    setLoading(true);
    try {
      const url =
        params.days != null
          ? `/api/admin/analytics?days=${params.days}`
          : `/api/admin/analytics?from=${params.from}&to=${params.to}`;
      const res = await fetch(url);
      setData(await res.json());
    } finally {
      setLoading(false);
    }
  }

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

  function handleFromChange(v: string) { setFromDate(v); setActiveDays(null); }
  function handleToChange(v: string)   { setToDate(v);   setActiveDays(null); }

  // Mesmo período que está na tela, para a planilha bater com o painel
  function periodQuery() {
    return activeDays != null ? `days=${activeDays}` : `from=${fromDate}&to=${toDate}`;
  }

  const maxDay = data ? Math.max(...data.byDay.map((d) => d.count), 1) : 1;

  function periodLabel() {
    if (activeDays === 1)   return "hoje";
    if (activeDays != null) return `últimos ${activeDays} dias`;
    return `${fromDate} → ${toDate}`;
  }

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-sm text-neutral-500 mt-1">Acessos, dispositivos, mapa do Brasil e mapa de calor</p>
          </div>
          <button
            onClick={() =>
              activeDays != null
                ? load({ days: activeDays })
                : load({ from: fromDate, to: toDate })
            }
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </button>
        </div>

        {/* Period filter */}
        <div className="flex flex-wrap items-center gap-2">
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

          <span className="text-neutral-300 text-sm">|</span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">De</span>
            <input
              type="date" value={fromDate} max={toDate}
              onChange={(e) => handleFromChange(e.target.value)}
              className={`text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                activeDays === null ? "border-primary-400 bg-primary-50" : "border-neutral-200 bg-white"
              }`}
            />
            <span className="text-xs text-neutral-500">até</span>
            <input
              type="date" value={toDate} min={fromDate} max={todayStr()}
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
          {/* ── KPI cards ────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Visitantes únicos", value: data.uniqueVisitors.toLocaleString("pt-BR"),    Icon: Users,             bg: "bg-blue-50",   color: "text-blue-600"   },
              { label: "Pageviews",          value: data.pageViews.toLocaleString("pt-BR"),         Icon: Eye,               bg: "bg-purple-50", color: "text-purple-600" },
              { label: "Cliques em botões",  value: data.totalClicks.toLocaleString("pt-BR"),       Icon: MousePointerClick, bg: "bg-pink-50",   color: "text-pink-600"   },
              { label: "Tempo médio/página", value: data.avgTimeOnPage > 0 ? formatTime(data.avgTimeOnPage) : "—", Icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
            ].map(({ label, value, Icon, bg, color }) => (
              <div key={label} className="bg-white rounded-2xl p-4 md:p-6 border border-neutral-100 shadow-sm">
                <div className="flex items-center gap-2 md:gap-3 mb-3">
                  <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-neutral-500 leading-tight">{label}</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-neutral-900">{value}</p>
                <p className="text-xs text-neutral-400 mt-1">{periodLabel()}</p>
              </div>
            ))}
          </div>

          {/* ── Campanhas (origem do anúncio) ─────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Megaphone className="w-4 h-4 text-fuchsia-500" />
              <h2 className="text-sm font-semibold text-neutral-700">Campanhas</h2>
              <div className="ml-auto flex items-center gap-2">
                <a
                  href={`/api/admin/analytics/export?formato=campanhas&${periodQuery()}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-50"
                >
                  <Download className="w-3.5 h-3.5" /> Planilha por campanha
                </a>
                <a
                  href={`/api/admin/analytics/export?formato=eventos&${periodQuery()}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-50"
                >
                  <Download className="w-3.5 h-3.5" /> Planilha detalhada
                </a>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              De qual anúncio o visitante veio — lido da etiqueta do link (utm) e do identificador de clique do anúncio.
            </p>

            {!data.hasAttribution ? (
              <p className="text-sm text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                A coleta de origem ainda não está ligada no banco (falta rodar a migração 007).
              </p>
            ) : data.campaigns.length === 0 ? (
              <p className="text-sm text-neutral-400">Nenhum acesso registrado neste período.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-neutral-400 border-b border-neutral-100">
                      <th className="text-left font-medium py-2 pr-4">Campanha</th>
                      <th className="text-left font-medium py-2 pr-4">Origem</th>
                      <th className="text-right font-medium py-2 px-2">Visitantes</th>
                      <th className="text-right font-medium py-2 px-2">Cliques</th>
                      <th className="text-right font-medium py-2 px-2">WhatsApp</th>
                      <th className="text-right font-medium py-2 pl-2">Formulários</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.campaigns.slice(0, 15).map((c) => (
                      <tr key={`${c.campaign}|${c.source}|${c.medium}|${c.content}`} className="border-b border-neutral-50 last:border-0">
                        <td className="py-2 pr-4 text-neutral-800 max-w-[220px] truncate" title={c.campaign}>{c.campaign}</td>
                        <td className="py-2 pr-4 text-neutral-500">{c.source}</td>
                        <td className="py-2 px-2 text-right font-medium text-neutral-900">{c.sessions}</td>
                        <td className="py-2 px-2 text-right text-neutral-600">{c.clicks}</td>
                        <td className="py-2 px-2 text-right text-green-600 font-medium">{c.whatsapp}</td>
                        <td className="py-2 pl-2 text-right text-neutral-600">{c.forms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ── Fontes de tráfego ─────────────────────────────────────────────── */}
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

          {/* ── Tempo na Página ───────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-semibold text-neutral-700">Tempo na Página</h2>
              <span className="ml-auto text-xs text-neutral-400">tempo ativo médio — ignora aba minimizada</span>
            </div>
            {data.avgTimeOnPage > 0 ? (
              <div className="flex items-center gap-8 flex-wrap mt-2">
                <p className="text-4xl font-bold text-amber-600 shrink-0">{formatTime(data.avgTimeOnPage)}</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { label: "Rápido",    time: "< 30s",  color: "text-red-500",   check: data.avgTimeOnPage < 30 },
                    { label: "Médio",     time: "30s–2m", color: "text-amber-500", check: data.avgTimeOnPage >= 30 && data.avgTimeOnPage < 120 },
                    { label: "Engajado", time: "> 2m",   color: "text-green-500", check: data.avgTimeOnPage >= 120 },
                  ].map((tier) => (
                    <div key={tier.label} className={`rounded-lg px-3 py-2 border-2 text-center ${tier.check ? "border-current" : "border-neutral-100 opacity-40"} ${tier.color}`}>
                      <p className="text-xs font-bold">{tier.label}</p>
                      <p className="text-[10px] font-mono">{tier.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-neutral-400 mt-2">Acumulará nas próximas visitas ao site.</p>
            )}
          </div>

          {/* ── Dispositivos + Mapa do Brasil ─────────────────────────────────── */}
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
                Mapa do Brasil — estados mais escuros têm mais visitantes.
              </p>
              <BrazilMap data={data.stateDistribution} total={data.totalWithGeo} />
            </div>
          </div>

          {/* ── Pageviews por dia + botões ────────────────────────────────────── */}
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

          {/* ── Top pages + eventos recentes ──────────────────────────────────── */}
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
              <h2 className="text-sm font-semibold text-neutral-700 mb-4">Eventos recentes</h2>
              {data.recentEvents.length === 0 ? (
                <p className="text-sm text-neutral-400 py-8 text-center">Nenhum evento recente</p>
              ) : (
                <div className="divide-y divide-neutral-50 max-h-80 overflow-y-auto">
                  {data.recentEvents.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                          e.event_type === "pageview" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"
                        }`}
                      >
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

          {/* ── Mapa de Calor de Cliques ──────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-semibold text-neutral-700">Mapa de Calor de Cliques</h2>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Site real com camadas sobrepostas. Verde/quente = funil de scroll · Vermelho = cliques · Azul/ciano = leitura. Selecione a camada acima.
            </p>
            <ClickHeatmapLive
              activeDays={activeDays}
              fromDate={fromDate}
              toDate={toDate}
              scrollFunnel={data.scrollFunnel}
            />
          </div>

          {/* ── Google Analytics ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm max-w-sm">
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
                <code className="text-xs bg-neutral-100 px-2 py-1 rounded font-mono text-neutral-700">{GA_ID}</code>
                <a
                  href="https://analytics.google.com"
                  target="_blank" rel="noopener noreferrer"
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
        </>
      )}
    </div>
  );
}

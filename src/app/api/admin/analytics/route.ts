import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

const BR_STATE_NAMES: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas",
  BA: "Bahia", CE: "Ceará", DF: "Dist. Federal", ES: "Espírito Santo",
  GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "M. G. do Sul",
  MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná",
  PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "R. G. do Norte",
  RS: "R. G. do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina",
  SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};

const HEAT_ROWS = 20;
const HEAT_COLS = 10;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function db(): any {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const days = Math.min(Math.max(1, parseInt(searchParams.get("days") ?? "7")), 365);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const [allEvents, recentEvents] = await Promise.all([
    db()
      .from("page_events")
      .select("session_id, event_type, event_name, page_path, created_at, geo_state, click_x, click_y, device_type")
      .gte("created_at", since)
      .order("created_at", { ascending: false }),
    db()
      .from("page_events")
      .select("session_id, event_type, event_name, page_path, created_at")
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events: any[] = allEvents.data ?? [];

  // ── Basic metrics ────────────────────────────────────────────────────────────
  const uniqueSessions = new Set(events.map((e) => e.session_id)).size;
  const pageViews = events.filter((e) => e.event_type === "pageview").length;
  const clicks = events.filter((e) => e.event_type === "click");

  // ── Top pages ────────────────────────────────────────────────────────────────
  const pageCounts: Record<string, number> = {};
  events
    .filter((e) => e.event_type === "pageview")
    .forEach((e) => { const p = e.page_path ?? "/"; pageCounts[p] = (pageCounts[p] ?? 0) + 1; });
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1]).slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  // ── Top buttons ──────────────────────────────────────────────────────────────
  const btnCounts: Record<string, number> = {};
  clicks.forEach((e) => { const n = e.event_name ?? "unknown"; btnCounts[n] = (btnCounts[n] ?? 0) + 1; });
  const topButtons = Object.entries(btnCounts)
    .sort((a, b) => b[1] - a[1]).slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  // ── Page views by day ────────────────────────────────────────────────────────
  const dayCounts: Record<string, number> = {};
  events.forEach((e) => {
    if (e.event_type !== "pageview") return;
    const day = e.created_at.slice(0, 10);
    dayCounts[day] = (dayCounts[day] ?? 0) + 1;
  });
  const byDay = Object.entries(dayCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));

  // ── State distribution ───────────────────────────────────────────────────────
  // Uses pageview events (only they carry geo) — counts unique sessions per state
  const sessionState: Record<string, string> = {};
  events
    .filter((e) => e.event_type === "pageview" && e.geo_state)
    .forEach((e) => { if (!sessionState[e.session_id]) sessionState[e.session_id] = e.geo_state; });

  const stateCounts: Record<string, number> = {};
  Object.values(sessionState).forEach((s) => { stateCounts[s] = (stateCounts[s] ?? 0) + 1; });
  const totalWithGeo = Object.values(stateCounts).reduce((a, b) => a + b, 0);
  const stateDistribution = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1]).slice(0, 20)
    .map(([state, count]) => ({
      state,
      stateName: BR_STATE_NAMES[state] ?? state,
      count,
      pct: totalWithGeo > 0 ? Math.round((count / totalWithGeo) * 100) : 0,
    }));

  // ── Traffic sources ──────────────────────────────────────────────────────────
  function categorizeReferrer(ref: string | null): string {
    if (!ref) return "Direto";
    if (/google\./i.test(ref)) return "Google";
    if (/facebook|instagram|fb\.com/i.test(ref)) return "Facebook / Instagram";
    if (/tiktok/i.test(ref)) return "TikTok";
    if (/whatsapp/i.test(ref)) return "WhatsApp";
    if (/youtube/i.test(ref)) return "YouTube";
    if (/twitter|x\.com/i.test(ref)) return "Twitter / X";
    if (/bing\./i.test(ref)) return "Bing";
    if (/pinterest/i.test(ref)) return "Pinterest";
    return "Outros";
  }

  // Count unique sessions per source (first pageview referrer wins for the session)
  const sessionSource: Record<string, string> = {};
  events
    .filter((e) => e.event_type === "pageview")
    .forEach((e) => {
      if (!sessionSource[e.session_id]) {
        sessionSource[e.session_id] = categorizeReferrer(e.referrer ?? null);
      }
    });

  const sourceCounts: Record<string, number> = {};
  Object.values(sessionSource).forEach((s) => { sourceCounts[s] = (sourceCounts[s] ?? 0) + 1; });
  const totalSessions = Object.values(sourceCounts).reduce((a, b) => a + b, 0);
  const trafficSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({
      source,
      count,
      pct: totalSessions > 0 ? Math.round((count / totalSessions) * 100) : 0,
    }));

  // ── Device distribution ──────────────────────────────────────────────────────
  // One entry per session (first pageview wins)
  const sessionDevice: Record<string, string> = {};
  events
    .filter((e) => e.event_type === "pageview" && e.device_type)
    .forEach((e) => { if (!sessionDevice[e.session_id]) sessionDevice[e.session_id] = e.device_type; });

  const deviceRaw: Record<string, number> = { mobile: 0, tablet: 0, desktop: 0 };
  Object.values(sessionDevice).forEach((d) => { deviceRaw[d] = (deviceRaw[d] ?? 0) + 1; });
  const totalWithDevice = Object.values(deviceRaw).reduce((a, b) => a + b, 0);
  const deviceDistribution = (["mobile", "tablet", "desktop"] as const).map((d) => ({
    device: d,
    count: deviceRaw[d] ?? 0,
    pct: totalWithDevice > 0 ? Math.round(((deviceRaw[d] ?? 0) / totalWithDevice) * 100) : 0,
  }));

  // ── Click heatmap ────────────────────────────────────────────────────────────
  const heatGrid: number[][] = Array.from({ length: HEAT_ROWS }, () => new Array(HEAT_COLS).fill(0));
  clicks
    .filter((e) => e.click_x != null && e.click_y != null)
    .forEach((e) => {
      const row = Math.min(HEAT_ROWS - 1, Math.floor((e.click_y as number) / (100 / HEAT_ROWS)));
      const col = Math.min(HEAT_COLS - 1, Math.floor((e.click_x as number) / (100 / HEAT_COLS)));
      const cell = heatGrid[row];
      if (cell) cell[col] = (cell[col] ?? 0) + 1;
    });
  const maxHeat = Math.max(...heatGrid.flat(), 1);

  return NextResponse.json({
    period: `${days}d`,
    uniqueVisitors: uniqueSessions,
    pageViews,
    totalClicks: clicks.length,
    topPages,
    topButtons,
    byDay,
    recentEvents: recentEvents.data ?? [],
    stateDistribution,
    clickHeatmap: { grid: heatGrid, rows: HEAT_ROWS, cols: HEAT_COLS, maxCount: maxHeat },
    totalWithGeo,
    deviceDistribution,
    totalWithDevice,
    trafficSources,
  });
}

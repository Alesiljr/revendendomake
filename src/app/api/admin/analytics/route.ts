import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

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
    db().from("page_events").select("session_id, event_type, event_name, page_path, created_at").gte("created_at", since).order("created_at", { ascending: false }),
    db().from("page_events").select("session_id, event_type, event_name, page_path, created_at").gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()).order("created_at", { ascending: false }).limit(50),
  ]);

  const events = allEvents.data ?? [];

  const uniqueSessions = new Set(events.map((e: { session_id: string }) => e.session_id)).size;
  const pageViews = events.filter((e: { event_type: string }) => e.event_type === "pageview").length;
  const clicks = events.filter((e: { event_type: string }) => e.event_type === "click");

  const pageCounts: Record<string, number> = {};
  events
    .filter((e: { event_type: string }) => e.event_type === "pageview")
    .forEach((e: { page_path: string }) => {
      const p = e.page_path ?? "/";
      pageCounts[p] = (pageCounts[p] ?? 0) + 1;
    });
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  const btnCounts: Record<string, number> = {};
  clicks.forEach((e: { event_name: string }) => {
    const name = e.event_name ?? "unknown";
    btnCounts[name] = (btnCounts[name] ?? 0) + 1;
  });
  const topButtons = Object.entries(btnCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  const dayCounts: Record<string, number> = {};
  events.forEach((e: { created_at: string; event_type: string }) => {
    if (e.event_type !== "pageview") return;
    const day = e.created_at.slice(0, 10);
    dayCounts[day] = (dayCounts[day] ?? 0) + 1;
  });
  const byDay = Object.entries(dayCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));

  return NextResponse.json({
    period: `${days}d`,
    uniqueVisitors: uniqueSessions,
    pageViews,
    totalClicks: clicks.length,
    topPages,
    topButtons,
    byDay,
    recentEvents: recentEvents.data ?? [],
  });
}

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function db(): any {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function extractIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip") ?? null;
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.")
  );
}

async function lookupGeo(request: Request): Promise<{ state: string | null; city: string | null }> {
  try {
    const ip = extractIp(request);
    if (!ip || isPrivateIp(ip)) return { state: null, city: null };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return { state: null, city: null };
      const geo = await res.json();
      if (geo.country_code !== "BR") return { state: null, city: null };
      return { state: geo.region_code ?? null, city: geo.city ?? null };
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    return { state: null, city: null };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, event_type, event_name, page_path, referrer, click_x, click_y, device_type } = body;

    if (!session_id || !event_type) {
      return NextResponse.json({ error: "session_id e event_type obrigatórios." }, { status: 400 });
    }

    const validTypes = ["pageview", "click", "form_submit"];
    if (!validTypes.includes(event_type)) {
      return NextResponse.json({ error: "event_type inválido." }, { status: 400 });
    }

    const supabase = db();

    // Geo lookup only on pageviews — avoids hammering the free API tier on every click
    let geo_state: string | null = null;
    let geo_city: string | null = null;

    if (event_type === "pageview") {
      // Reuse geo if the session already has it
      const { data: existing } = await supabase
        .from("page_events")
        .select("geo_state, geo_city")
        .eq("session_id", String(session_id).slice(0, 64))
        .not("geo_state", "is", null)
        .limit(1)
        .maybeSingle();

      if (existing) {
        geo_state = existing.geo_state;
        geo_city = existing.geo_city;
      } else {
        const geo = await lookupGeo(request);
        geo_state = geo.state;
        geo_city = geo.city;
      }
    }

    await supabase.from("page_events").insert({
      session_id: String(session_id).slice(0, 64),
      event_type,
      event_name: event_name ? String(event_name).slice(0, 100) : null,
      page_path: page_path ? String(page_path).slice(0, 200) : null,
      referrer: referrer ? String(referrer).slice(0, 500) : null,
      geo_state,
      geo_city,
      click_x: click_x != null ? Number(click_x) : null,
      click_y: click_y != null ? Number(click_y) : null,
      device_type: ["mobile", "tablet", "desktop"].includes(device_type) ? device_type : null,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: true }); // analytics should never break the app
  }
}

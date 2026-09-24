import { adminDb } from "@/lib/supabase/admin-db";
import { NextResponse } from "next/server";

// Vercel injeta geo nos headers automaticamente — sem chamada externa, sem limite
function lookupGeo(request: Request): { state: string | null; city: string | null } {
  const country = request.headers.get("x-vercel-ip-country");
  // Só armazenar para Brasil; visitantes de outros países ficam com null
  if (country !== "BR") return { state: null, city: null };

  const region = request.headers.get("x-vercel-ip-country-region");
  const rawCity = request.headers.get("x-vercel-ip-city");
  // Vercel codifica a cidade em URL encoding (ex: "S%C3%A3o+Paulo")
  const city = rawCity ? decodeURIComponent(rawCity.replace(/\+/g, " ")) : null;

  return { state: region ?? null, city };
}

// Origem do tráfego: texto livre vindo do navegador, sempre cortado antes de gravar
function attr(value: unknown, max = 200): string | null {
  return value ? String(value).slice(0, max) : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, event_type, event_name, page_path, referrer, click_x, click_y, device_type } = body;
    const { utm_source, utm_medium, utm_campaign, utm_content, utm_term, click_id } = body;

    if (!session_id || !event_type) {
      return NextResponse.json({ ok: true }); // silencioso — não expor validações
    }

    const validTypes = ["pageview", "click", "form_submit", "attention", "scroll_depth", "time_on_page"];
    if (!validTypes.includes(event_type)) {
      return NextResponse.json({ ok: true });
    }

    const supabase = adminDb();

    let geo_state: string | null = null;
    let geo_city: string | null = null;

    if (event_type === "pageview") {
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
        const geo = lookupGeo(request);
        geo_state = geo.state;
        geo_city = geo.city;
      }
    }

    const base = {
      session_id:  String(session_id).slice(0, 64),
      event_type,
      event_name:  event_name  ? String(event_name).slice(0, 100)  : null,
      page_path:   page_path   ? String(page_path).slice(0, 200)   : null,
      referrer:    referrer    ? String(referrer).slice(0, 500)     : null,
      geo_state,
      geo_city,
      click_x:     click_x  != null ? Number(click_x)  : null,
      click_y:     click_y  != null ? Number(click_y)  : null,
      device_type: ["mobile", "tablet", "desktop"].includes(device_type) ? device_type : null,
    };

    const attribution = {
      utm_source:   attr(utm_source),
      utm_medium:   attr(utm_medium),
      utm_campaign: attr(utm_campaign),
      utm_content:  attr(utm_content),
      utm_term:     attr(utm_term),
      click_id:     attr(click_id, 255),
    };

    let { error } = await supabase.from("page_events").insert({ ...base, ...attribution });

    // PGRST204 = coluna inexistente: a migração 007 ainda não rodou neste banco.
    // Regrava sem a origem para não perder o evento — coletar a mais nunca pode
    // custar a coleta inteira.
    if (error?.code === "PGRST204") {
      ({ error } = await supabase.from("page_events").insert(base));
    }

    if (error && process.env.NODE_ENV !== "production") {
      console.error("[analytics] insert error:", error.code);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    // Analytics nunca deve quebrar o app do visitante
    return NextResponse.json({ ok: true });
  }
}

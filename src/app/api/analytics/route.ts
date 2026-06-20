import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, event_type, event_name, page_path, referrer } = body;

    if (!session_id || !event_type) {
      return NextResponse.json({ error: "session_id e event_type obrigatórios." }, { status: 400 });
    }

    const validTypes = ["pageview", "click", "form_submit"];
    if (!validTypes.includes(event_type)) {
      return NextResponse.json({ error: "event_type inválido." }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase: any = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase.from("page_events").insert({
      session_id: String(session_id).slice(0, 64),
      event_type,
      event_name: event_name ? String(event_name).slice(0, 100) : null,
      page_path: page_path ? String(page_path).slice(0, 200) : null,
      referrer: referrer ? String(referrer).slice(0, 500) : null,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: true }); // silently fail — analytics should never break the app
  }
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("_rm_sid");
  if (!sid) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    sid = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    sessionStorage.setItem("_rm_sid", sid);
  }
  return sid;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/**
 * Origem do visitante (de qual anúncio ele veio).
 * As etiquetas só existem na URL de entrada; ao navegar para outra página elas
 * somem — por isso ficam guardadas na sessão, igual ao session_id.
 */
function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem("_rm_attr");
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, string>;
      if (Object.keys(parsed).length > 0) return parsed;
    }
  } catch {
    // sessionStorage indisponível ou conteúdo inválido — relê da URL
  }

  const params = new URLSearchParams(window.location.search);
  const attr: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) attr[key] = value.slice(0, 200);
  }
  // fbclid (Meta) e gclid (Google) identificam o clique no anúncio mesmo sem UTM
  const clickId = params.get("fbclid") ?? params.get("gclid");
  if (clickId) attr.click_id = clickId.slice(0, 255);

  try {
    sessionStorage.setItem("_rm_attr", JSON.stringify(attr));
  } catch {
    // sem sessionStorage a origem vale só para esta página
  }
  return attr;
}

function detectDevice(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

function send(payload: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const session_id = getSessionId();
  // "attention" dispara a cada 2s; repetir a origem nele só incharia a tabela
  const attribution = payload.event_type === "attention" ? {} : getAttribution();
  const body = JSON.stringify({ session_id, ...attribution, ...payload });
  // keepalive: true garante que o request sobrevive à navegação/saída da página
  try {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Fallback para sendBeacon quando keepalive não é suportado (limite de 64KB)
    navigator.sendBeacon?.("/api/analytics", new Blob([body], { type: "application/json" }));
  }
}

// sendBeacon é mais confiável no unload (não cancela como fetch)
function sendBeaconEvent(payload: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const session_id = getSessionId();
  const body = JSON.stringify({ session_id, ...getAttribution(), ...payload });
  try {
    navigator.sendBeacon?.("/api/analytics", new Blob([body], { type: "application/json" }));
  } catch {
    // fallback silencioso
  }
}

/** Deriva um nome curto e legível para qualquer elemento clicado */
function deriveEventName(el: Element): string {
  const tracked = el.closest("[data-track]");
  if (tracked) return tracked.getAttribute("data-track") ?? "click";

  const interactive = el.closest("button, a, [role='button'], [role='link']");
  if (interactive) {
    const label =
      interactive.getAttribute("aria-label") ??
      interactive.getAttribute("title") ??
      (interactive.textContent ?? "").trim().slice(0, 40);
    const tag = interactive.tagName.toLowerCase();
    return label ? label : tag;
  }

  const withId = el.closest("[id]");
  if (withId) return `#${withId.id}`.slice(0, 40);

  return "page-click";
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  // ── Pageview ao mudar de rota ────────────────────────────────────────────────
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    send({
      event_type: "pageview",
      page_path: pathname,
      referrer: document.referrer,
      device_type: detectDevice(),
    });
  }, [pathname]);

  // ── Rastreamento de TODOS os cliques com coordenadas ────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = e.target as HTMLElement;
      const eventName = deriveEventName(el);
      const pageWidth  = document.documentElement.scrollWidth;
      const pageHeight = document.body.scrollHeight;
      const x = pageWidth  > 0
        ? Math.round(((window.scrollX + e.clientX) / pageWidth)  * 1000) / 10
        : Math.round((e.clientX / window.innerWidth) * 1000) / 10;
      const y = pageHeight > 0
        ? Math.round(((window.scrollY + e.clientY) / pageHeight) * 1000) / 10
        : 0;
      send({
        event_type:  "click",
        event_name:  eventName,
        page_path:   window.location.pathname,
        click_x:     Math.min(100, Math.max(0, x)),
        click_y:     Math.min(100, Math.max(0, y)),
        device_type: detectDevice(),
      });
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ── Atenção / zonas de leitura ───────────────────────────────────────────────
  useEffect(() => {
    let userActive    = false;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    const markActive = () => { userActive = true; };

    function handleScrollStop() {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const pageHeight = document.body.scrollHeight;
        if (pageHeight <= 0) return;
        const centerY = window.scrollY + window.innerHeight / 2;
        const y = Math.min(100, Math.max(0, Math.round((centerY / pageHeight) * 1000) / 10));
        send({ event_type: "attention", page_path: window.location.pathname, click_x: 50, click_y: y, device_type: detectDevice() });
      }, 800);
    }

    window.addEventListener("scroll",    markActive,       { passive: true });
    window.addEventListener("scroll",    handleScrollStop, { passive: true });
    window.addEventListener("mousemove", markActive,       { passive: true });
    window.addEventListener("keydown",   markActive,       { passive: true });
    window.addEventListener("touchmove", markActive,       { passive: true });

    const interval = setInterval(() => {
      if (!userActive) return;
      userActive = false;
      const pageHeight = document.body.scrollHeight;
      if (pageHeight <= 0) return;
      const centerY = window.scrollY + window.innerHeight / 2;
      const y = Math.min(100, Math.max(0, Math.round((centerY / pageHeight) * 1000) / 10));
      send({ event_type: "attention", page_path: window.location.pathname, click_x: 50, click_y: y, device_type: detectDevice() });
    }, 2000);

    return () => {
      clearInterval(interval);
      if (scrollTimer) clearTimeout(scrollTimer);
      window.removeEventListener("scroll",    markActive);
      window.removeEventListener("scroll",    handleScrollStop);
      window.removeEventListener("mousemove", markActive);
      window.removeEventListener("keydown",   markActive);
      window.removeEventListener("touchmove", markActive);
    };
  }, []);

  // ── Scroll depth: marcos 25 / 50 / 75 / 90 / 100% ───────────────────────────
  useEffect(() => {
    const MILESTONES = [25, 50, 75, 90, 100];
    const reached = new Set<number>();

    function handleScroll() {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.round((window.scrollY / scrollable) * 100);
      for (const m of MILESTONES) {
        if (pct >= m && !reached.has(m)) {
          reached.add(m);
          send({
            event_type:  "scroll_depth",
            event_name:  `${m}%`,
            page_path:   window.location.pathname,
            click_y:     m,
            device_type: detectDevice(),
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Reseta ao trocar de página

  // ── Tempo na página (ativo) ──────────────────────────────────────────────────
  useEffect(() => {
    let activeMs   = 0;
    let lastActive = Date.now();
    let isHidden   = document.hidden;

    function onVisibility() {
      if (document.hidden) {
        activeMs += Date.now() - lastActive;
        isHidden = true;
      } else {
        lastActive = Date.now();
        isHidden   = false;
      }
    }

    function flush() {
      if (!isHidden) activeMs += Date.now() - lastActive;
      const seconds = Math.round(activeMs / 1000);
      if (seconds < 3) return; // ignora bounces muito rápidos
      sendBeaconEvent({
        event_type:  "time_on_page",
        event_name:  `${seconds}s`,
        page_path:   pathname,
        click_x:     seconds, // armazena segundos no campo numérico
        device_type: detectDevice(),
      });
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("beforeunload", flush);

    return () => {
      flush(); // envia ao navegar via SPA (pathname muda)
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("beforeunload", flush);
    };
  }, [pathname]); // Reseta o timer a cada mudança de página

  return null;
}

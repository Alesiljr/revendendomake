"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("_rm_sid");
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("_rm_sid", sid);
  }
  return sid;
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
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id, ...payload }),
  }).catch(() => {});
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

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

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-track]");
      if (!target) return;
      const eventName = target.getAttribute("data-track") ?? "unknown";

      const x = window.innerWidth > 0
        ? Math.round((e.clientX / window.innerWidth) * 100 * 10) / 10
        : 0;
      const pageHeight = document.body.scrollHeight;
      const y = pageHeight > 0
        ? Math.round(((window.scrollY + e.clientY) / pageHeight) * 100 * 10) / 10
        : 0;

      send({
        event_type: "click",
        event_name: eventName,
        page_path: window.location.pathname,
        click_x: x,
        click_y: y,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

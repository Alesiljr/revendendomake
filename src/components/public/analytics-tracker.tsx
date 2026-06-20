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

function send(payload: Record<string, string>) {
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

  // Track page views on route change
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    send({
      event_type: "pageview",
      page_path: pathname,
      referrer: document.referrer,
    });
  }, [pathname]);

  // Track button/link clicks with data-track attribute
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-track]");
      if (!target) return;
      const eventName = target.getAttribute("data-track") ?? "unknown";
      send({
        event_type: "click",
        event_name: eventName,
        page_path: window.location.pathname,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

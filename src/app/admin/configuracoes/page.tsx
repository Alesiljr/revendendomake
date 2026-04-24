"use client";

import { useState, useEffect } from "react";
import type { SiteSettings } from "@/lib/supabase/types";

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    whatsapp_number: "",
    instagram_url: "",
    tiktok_url: "",
    youtube_url: "",
    hero_headline: "",
    hero_subheadline: "",
    contact_email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setSettings(data);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsapp_number: settings.whatsapp_number,
          instagram_url: settings.instagram_url || null,
          tiktok_url: settings.tiktok_url || null,
          youtube_url: settings.youtube_url || null,
          contact_email: settings.contact_email || null,
          hero_headline: settings.hero_headline,
          hero_subheadline: settings.hero_subheadline,
        }),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Erro ao salvar configurações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  function set(field: keyof SiteSettings, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">Configurações</h2>
        </div>
        <p className="text-neutral-400">Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">Configurações</h2>
        <p className="text-neutral-500 text-sm mt-1">Configurações gerais do site.</p>
      </div>

      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm">
          <strong>Configurações salvas!</strong> As alterações serão refletidas no site.
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">WhatsApp</h3>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Número do WhatsApp
            </label>
            <input
              type="text"
              value={settings.whatsapp_number ?? ""}
              onChange={(e) => set("whatsapp_number", e.target.value)}
              placeholder="5511999999999"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-neutral-400 mt-1">Formato: 5511999999999 (sem +, espaços ou traços)</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">Redes Sociais</h3>
          <div className="space-y-4">
            {[
              { label: "Instagram URL", field: "instagram_url" as const, placeholder: "https://instagram.com/revendendomake" },
              { label: "TikTok URL", field: "tiktok_url" as const, placeholder: "https://tiktok.com/@revendendomake" },
              { label: "YouTube URL", field: "youtube_url" as const, placeholder: "https://youtube.com/@revendendomake" },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
                <input
                  type="url"
                  value={(settings[field] as string) ?? ""}
                  onChange={(e) => set(field, e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">Textos da Home</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Hero Headline</label>
              <input
                type="text"
                value={settings.hero_headline ?? ""}
                onChange={(e) => set("hero_headline", e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Hero Subheadline</label>
              <input
                type="text"
                value={settings.hero_subheadline ?? ""}
                onChange={(e) => set("hero_subheadline", e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">E-mail de Contato</label>
              <input
                type="email"
                value={settings.contact_email ?? ""}
                onChange={(e) => set("contact_email", e.target.value)}
                placeholder="contato@revendendomake.com.br"
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Salvando..." : "Salvar Configurações"}
        </button>
      </form>
    </div>
  );
}

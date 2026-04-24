"use client";

import { useState } from "react";

export default function ConfiguracoesPage() {
  const [whatsapp, setWhatsapp] = useState("5511999999999");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [heroHeadline, setHeroHeadline] = useState(
    "Ganhe Dinheiro Revendendo Maquiagem"
  );
  const [heroSubheadline, setHeroSubheadline] = useState(
    "Comece seu negócio hoje"
  );
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">Configurações</h2>
        <p className="text-neutral-500 text-sm mt-1">
          Configurações gerais do site — modo demonstração.
        </p>
      </div>

      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm">
          <strong>Salvo!</strong> Em produção, isso atualizaria o Supabase.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        {/* WhatsApp */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">
            WhatsApp
          </h3>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Número do WhatsApp
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="5511999999999"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-neutral-400 mt-1">
              Formato: 5511999999999 (sem +, espaços ou traços)
            </p>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">
            Redes Sociais
          </h3>
          <div className="space-y-4">
            {[
              { label: "Instagram URL", value: instagram, setter: setInstagram, placeholder: "https://instagram.com/revendendomake" },
              { label: "TikTok URL", value: tiktok, setter: setTiktok, placeholder: "https://tiktok.com/@revendendomake" },
              { label: "YouTube URL", value: youtube, setter: setYoutube, placeholder: "https://youtube.com/@revendendomake" },
            ].map(({ label, value, setter, placeholder }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {label}
                </label>
                <input
                  type="url"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Textos da Home */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">
            Textos da Home
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Hero Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Hero Subheadline
              </label>
              <input
                type="text"
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
        >
          Salvar Configurações
        </button>
      </form>
    </div>
  );
}

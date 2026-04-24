"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Star } from "lucide-react";

export default function NovoDepoimentoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    reseller_name: "",
    city: "",
    result_text: "",
    rating: 5,
    approved: true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.reseller_name || !form.result_text) {
      setError("Nome e depoimento são obrigatórios.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/depoimentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      router.push("/admin/depoimentos");
      router.refresh();
    } catch {
      setError("Erro ao salvar depoimento.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/depoimentos" className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Novo Depoimento</h2>
          <p className="text-neutral-500 text-sm mt-0.5">Adicione o depoimento de uma revendedora.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-neutral-900">Dados da Revendedora</h3>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.reseller_name}
              onChange={(e) => setForm((p) => ({ ...p, reseller_name: e.target.value }))}
              placeholder="Ex: Ana S."
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Cidade</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              placeholder="Ex: São Paulo, SP"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Depoimento <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.result_text}
              onChange={(e) => setForm((p) => ({ ...p, result_text: e.target.value }))}
              rows={4}
              placeholder="O que a revendedora disse sobre a experiência..."
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Avaliação</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, rating: star }))}
                  className="p-0.5"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= form.rating ? "text-amber-400 fill-amber-400" : "text-neutral-200"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-neutral-500">{form.rating} estrela{form.rating !== 1 ? "s" : ""}</span>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={form.approved}
              onChange={(e) => setForm((p) => ({ ...p, approved: e.target.checked }))}
              className="w-4 h-4 accent-primary-700"
            />
            <span className="text-sm text-neutral-700">Aprovar imediatamente (visível no site público)</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 disabled:opacity-60 transition-colors"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Salvando..." : "Salvar Depoimento"}
          </button>
          <Link href="/admin/depoimentos" className="px-6 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

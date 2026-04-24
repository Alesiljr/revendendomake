"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import type { Product } from "@/lib/supabase/types";

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    images: "",
    cost_price: "",
    suggested_price: "",
    stock: "0",
    active: true,
    featured: false,
  });

  useEffect(() => {
    fetch(`/api/admin/produtos/${id}`)
      .then((r) => r.json())
      .then((data: Product) => {
        if (data && data.name) {
          setForm({
            name: data.name,
            description: data.description ?? "",
            images: (data.images ?? []).join("\n"),
            cost_price: String(data.cost_price),
            suggested_price: String(data.suggested_price),
            stock: String(data.stock),
            active: data.active,
            featured: data.featured,
          });
        }
      })
      .catch(() => setError("Produto não encontrado."))
      .finally(() => setLoading(false));
  }, [id]);

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const images = form.images.split("\n").map((u) => u.trim()).filter(Boolean);
      const res = await fetch(`/api/admin/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim() || null,
          images,
          cost_price: parseFloat(form.cost_price) || 0,
          suggested_price: parseFloat(form.suggested_price) || 0,
          stock: parseInt(form.stock) || 0,
          active: form.active,
          featured: form.featured,
        }),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      router.push("/admin/produtos");
      router.refresh();
    } catch {
      setError("Erro ao salvar produto.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Excluir este produto? Esta ação não pode ser desfeita.")) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/produtos/${id}`, { method: "DELETE" });
      router.push("/admin/produtos");
      router.refresh();
    } catch {
      setError("Erro ao excluir produto.");
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/produtos" className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Editar Produto</h2>
            <p className="text-neutral-500 text-sm mt-0.5">{form.name}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 disabled:opacity-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Excluindo..." : "Excluir"}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-neutral-900">Informações Básicas</h3>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nome do Produto</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">URLs das Imagens</label>
            <textarea
              value={form.images}
              onChange={(e) => set("images", e.target.value)}
              rows={3}
              placeholder="Uma URL por linha"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-neutral-900">Preços e Estoque</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Preço de Custo (R$)</label>
              <input
                type="number" min="0" step="0.01"
                value={form.cost_price}
                onChange={(e) => set("cost_price", e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Preço de Venda (R$)</label>
              <input
                type="number" min="0" step="0.01"
                value={form.suggested_price}
                onChange={(e) => set("suggested_price", e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Estoque</label>
            <input
              type="number" min="0"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-3">
          <h3 className="text-base font-semibold text-neutral-900">Visibilidade</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 accent-primary-700" />
            <span className="text-sm text-neutral-700">Produto ativo (visível no site)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-primary-700" />
            <span className="text-sm text-neutral-700">Produto em destaque</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 disabled:opacity-60 transition-colors"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
          <Link href="/admin/produtos" className="px-6 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

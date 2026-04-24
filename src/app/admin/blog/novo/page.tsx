"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function NovoArtigoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft" as "draft" | "published",
  });

  function set(field: string, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.slug) {
        next.slug = value.toLowerCase()
          .normalize("NFD").replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9\s-]/g, "")
          .trim().replace(/\s+/g, "-");
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug) {
      setError("Título e slug são obrigatórios.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          slug: form.slug.trim(),
          excerpt: form.excerpt.trim() || null,
          content: form.content.trim() ? { text: form.content.trim() } : null,
          category: form.category.trim() || null,
          status: form.status,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar artigo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="text-neutral-400 hover:text-neutral-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Novo Artigo</h2>
          <p className="text-neutral-500 text-sm mt-0.5">Crie um artigo para o blog.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-neutral-900">Conteúdo</h3>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Título do artigo"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              placeholder="titulo-do-artigo"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
            />
            <p className="text-xs text-neutral-400 mt-1">Gerado automaticamente a partir do título.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Resumo (Excerpt)</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              placeholder="Breve descrição para listagem e SEO..."
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Conteúdo</label>
            <textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              rows={10}
              placeholder="Escreva o conteúdo do artigo aqui..."
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-neutral-900">Publicação</h3>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Categoria</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="Ex: Dicas, Tendências, Negócios"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
            <div className="flex items-center gap-4">
              {(["draft", "published"] as const).map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={s}
                    checked={form.status === s}
                    onChange={() => setForm((p) => ({ ...p, status: s }))}
                    className="accent-primary-700"
                  />
                  <span className="text-sm text-neutral-700 capitalize">
                    {s === "draft" ? "Rascunho" : "Publicado"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 disabled:opacity-60 transition-colors"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Salvando..." : "Salvar Artigo"}
          </button>
          <Link href="/admin/blog" className="px-6 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

import { createClient } from "@supabase/supabase-js";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/lib/supabase/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

async function getPosts(): Promise<Post[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase: any = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await supabase
    .from("posts")
    .select("id, title, slug, category, status, published_at, created_at")
    .order("created_at", { ascending: false });
  return (data ?? []) as Post[];
}

export default async function BlogAdminPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Blog</h2>
          <p className="text-neutral-500 text-sm mt-1">
            {posts.length} artigo{posts.length !== 1 ? "s" : ""} cadastrado{posts.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/admin/blog/novo"
          className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Artigo
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-neutral-400 mb-4">Nenhum artigo publicado ainda.</p>
            <Link
              href="/admin/blog/novo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Criar primeiro artigo
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-500 text-xs uppercase tracking-wide bg-neutral-50">
                  <th className="px-6 py-3 text-left font-medium">Título</th>
                  <th className="px-6 py-3 text-left font-medium">Categoria</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Data</th>
                  <th className="px-6 py-3 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-neutral-900 max-w-[280px] truncate">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{post.category ?? "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        post.status === "published" ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {post.status === "published" ? "Publicado" : "Rascunho"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      {formatDate(post.published_at ?? post.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-xs text-primary-700 hover:text-primary-800 font-medium"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import { createClient } from "@supabase/supabase-js";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import type { Testimonial } from "@/lib/supabase/types";
import DepoimentoActions from "./depoimento-actions";

function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
      {initials}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-neutral-200"}`} />
      ))}
    </div>
  );
}

async function getTestimonials(): Promise<Testimonial[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase: any = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Testimonial[];
}

export default async function DepoimentosPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Depoimentos</h2>
          <p className="text-neutral-500 text-sm mt-1">
            {testimonials.length} depoimento{testimonials.length !== 1 ? "s" : ""} cadastrado{testimonials.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/admin/depoimentos/novo"
          className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Depoimento
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm px-6 py-12 text-center">
          <p className="text-neutral-400 mb-4">Nenhum depoimento cadastrado ainda.</p>
          <Link
            href="/admin/depoimentos/novo"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar primeiro depoimento
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <InitialsAvatar name={t.reseller_name} />
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">{t.reseller_name}</p>
                  <p className="text-xs text-neutral-500">{t.city}</p>
                </div>
                <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  t.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {t.approved ? "Aprovado" : "Pendente"}
                </span>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-sm text-neutral-600 leading-relaxed">&ldquo;{t.result_text}&rdquo;</p>
              <div className="pt-2 border-t border-neutral-100 flex justify-end">
                <DepoimentoActions id={t.id} approved={t.approved} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

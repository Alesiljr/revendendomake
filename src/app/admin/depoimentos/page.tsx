import { demoTestimonials } from "@/lib/demo-data";
import { Plus, Star } from "lucide-react";

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
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
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function DepoimentosPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Depoimentos</h2>
          <p className="text-neutral-500 text-sm mt-1">
            {demoTestimonials.length} depoimentos — dados de demonstração.
          </p>
        </div>
        <button
          disabled
          title="Disponível com Supabase configurado"
          className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium opacity-40 cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Novo Depoimento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <InitialsAvatar name={t.reseller_name} />
              <div>
                <p className="font-semibold text-neutral-900 text-sm">
                  {t.reseller_name}
                </p>
                <p className="text-xs text-neutral-500">{t.city}</p>
              </div>
              <span
                className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  t.approved
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {t.approved ? "Aprovado" : "Pendente"}
              </span>
            </div>
            <StarRating rating={t.rating} />
            <p className="text-sm text-neutral-600 leading-relaxed">
              &ldquo;{t.result_text}&rdquo;
            </p>
            <div className="pt-2 border-t border-neutral-100 flex justify-end">
              <button
                disabled
                title="Disponível com Supabase"
                className="text-xs text-neutral-400 cursor-not-allowed"
              >
                {t.approved ? "Remover aprovação" : "Aprovar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

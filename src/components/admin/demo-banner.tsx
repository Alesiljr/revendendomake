import { AlertTriangle } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-sm text-amber-800">
      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
      <span>
        <strong>Modo Demo</strong> — dados fictícios. Configure o Supabase em{" "}
        <code className="bg-amber-100 px-1 rounded text-xs">.env.local</code>{" "}
        para usar dados reais.
      </span>
    </div>
  );
}

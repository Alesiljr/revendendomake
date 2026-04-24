"use client";

import { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";

const resellers = [
  { name: "Ana L.", city: "São Paulo, SP", minutes: 3, slots: 7 },
  { name: "Carla M.", city: "Rio de Janeiro, RJ", minutes: 7, slots: 6 },
  { name: "Fernanda S.", city: "Curitiba, PR", minutes: 12, slots: 6 },
  { name: "Juliana T.", city: "Belo Horizonte, MG", minutes: 5, slots: 5 },
  { name: "Mariana O.", city: "Fortaleza, CE", minutes: 18, slots: 5 },
  { name: "Patricia R.", city: "Salvador, BA", minutes: 2, slots: 4 },
  { name: "Camila F.", city: "Manaus, AM", minutes: 9, slots: 4 },
  { name: "Bruna A.", city: "Porto Alegre, RS", minutes: 14, slots: 3 },
  { name: "Leticia N.", city: "Recife, PE", minutes: 6, slots: 3 },
  { name: "Bianca V.", city: "Goiânia, GO", minutes: 21, slots: 2 },
];

export function PurchasePopup() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<typeof resellers[0]>(resellers[0]!);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const initial = setTimeout(() => {
      setCurrent(resellers[0]!);
      setVisible(true);
    }, 4000);

    return () => clearTimeout(initial);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const hideTimer = setTimeout(() => setVisible(false), 4000);

    const nextTimer = setTimeout(() => {
      const next = (index + 1) % resellers.length;
      setIndex(next);
      setCurrent(resellers[next]!);
      setVisible(true);
    }, 8000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [visible, index]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 animate-slide-up">
      <div className="bg-white rounded-xl shadow-lg border border-neutral-100 p-3 flex items-center gap-3 max-w-[272px]">
        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
          <UserCheck className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-neutral-900 truncate">
            {current.name} — {current.city}
          </p>
          <p className="text-xs text-neutral-500">
            acaba de <span className="text-primary font-medium">virar revendedora!</span>
          </p>
          <p className="text-xs text-neutral-400">
            {current.minutes} min atrás &middot;{" "}
            <span className="text-red-500 font-semibold">Restam {current.slots} vagas</span>
          </p>
        </div>
      </div>
    </div>
  );
}

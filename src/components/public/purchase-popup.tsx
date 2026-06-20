"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { UserCheck, TrendingUp } from "lucide-react";

const resellers = [
  { name: "Ana L.", city: "São Paulo, SP" },
  { name: "Carla M.", city: "Rio de Janeiro, RJ" },
  { name: "Fernanda S.", city: "Curitiba, PR" },
  { name: "Juliana T.", city: "Belo Horizonte, MG" },
  { name: "Mariana O.", city: "Fortaleza, CE" },
  { name: "Patricia R.", city: "Salvador, BA" },
  { name: "Camila F.", city: "Manaus, AM" },
  { name: "Bruna A.", city: "Porto Alegre, RS" },
  { name: "Leticia N.", city: "Recife, PE" },
  { name: "Bianca V.", city: "Goiânia, GO" },
  { name: "Simone A.", city: "Belém, PA" },
  { name: "Rafaela C.", city: "Florianópolis, SC" },
  { name: "Tâmara B.", city: "Natal, RN" },
  { name: "Vanessa L.", city: "Maceió, AL" },
  { name: "Gisele P.", city: "Campo Grande, MS" },
  { name: "Roberta F.", city: "Teresina, PI" },
  { name: "Cristina M.", city: "João Pessoa, PB" },
  { name: "Luciana D.", city: "Aracaju, SE" },
  { name: "Priscila K.", city: "Cuiabá, MT" },
  { name: "Débora W.", city: "Macapá, AP" },
  { name: "Aline S.", city: "Porto Velho, RO" },
  { name: "Natalia E.", city: "Palmas, TO" },
  { name: "Sabrina H.", city: "Rio Branco, AC" },
  { name: "Tatiane J.", city: "Boa Vista, RR" },
  { name: "Renata G.", city: "São Luís, MA" },
  { name: "Larissa Q.", city: "Vitória, ES" },
  { name: "Carolina X.", city: "Campinas, SP" },
  { name: "Jéssica Z.", city: "Santos, SP" },
  { name: "Monique Y.", city: "Uberlândia, MG" },
  { name: "Elaine U.", city: "Ribeirão Preto, SP" },
];

type PopupType = "join" | "earnings";

type PopupData = {
  type: PopupType;
  name: string;
  city: string;
  minutes: number;
  slots: number;
  revenue?: number;
  profit?: number;
};

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickIdx(last: number) {
  let i: number;
  do { i = rnd(0, resellers.length - 1); } while (i === last);
  return i;
}

function build(last: number): { data: PopupData; idx: number } {
  const idx = pickIdx(last);
  const person = resellers[idx]!;
  const type: PopupType = Math.random() < 0.5 ? "join" : "earnings";

  const revenue = rnd(8, 42) * 100;
  const profit = rnd(28, 48);

  return {
    idx,
    data: {
      type,
      name: person.name,
      city: person.city,
      minutes: rnd(1, 29),
      slots: rnd(2, 9),
      revenue,
      profit,
    },
  };
}

export function PurchasePopup() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<PopupData | null>(null);
  const lastIdx = useRef(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => timers.current.forEach(clearTimeout);

  const schedule = useCallback(() => {
    clearAll();
    const waitMs = rnd(8000, 14000);

    const t1 = setTimeout(() => {
      const { data: next, idx } = build(lastIdx.current);
      lastIdx.current = idx;
      setData(next);
      setVisible(true);

      const t2 = setTimeout(() => {
        setVisible(false);
        schedule();
      }, 4500);

      timers.current = [t2];
    }, waitMs);

    timers.current = [t1];
  }, []);

  useEffect(() => {
    const t0 = setTimeout(() => {
      const { data: first, idx } = build(-1);
      lastIdx.current = idx;
      setData(first);
      setVisible(true);

      const t1 = setTimeout(() => {
        setVisible(false);
        schedule();
      }, 4500);

      timers.current = [t1];
    }, rnd(4000, 7000));

    return () => { clearTimeout(t0); clearAll(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible || !data) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
      <div className="bg-white rounded-xl shadow-lg border border-neutral-100 p-3 flex items-center gap-3 max-w-[280px]">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${data.type === "join" ? "bg-primary-100" : "bg-green-100"}`}>
          {data.type === "join"
            ? <UserCheck className="w-4 h-4 text-primary" />
            : <TrendingUp className="w-4 h-4 text-green-600" />}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-neutral-900 truncate">
            {data.name} — {data.city}
          </p>
          {data.type === "join" ? (
            <>
              <p className="text-xs text-neutral-500">
                acaba de <span className="text-primary font-medium">virar revendedora!</span>
              </p>
              <p className="text-xs text-neutral-400">
                {data.minutes} min atrás &middot;{" "}
                <span className="text-red-500 font-semibold">Restam {data.slots} vagas</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-xs text-neutral-500">
                faturou{" "}
                <span className="text-green-600 font-bold">
                  R$ {data.revenue!.toLocaleString("pt-BR")}
                </span>{" "}
                este mês
              </p>
              <p className="text-xs text-neutral-400">
                <span className="text-green-600 font-semibold">{data.profit}% de lucro</span>
                {" "}· {data.minutes} min atrás
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

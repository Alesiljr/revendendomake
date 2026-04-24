import { Users, Package, Star, TrendingUp } from "lucide-react";
import { demoLeads, demoProducts, demoTestimonials } from "@/lib/demo-data";

const statusColors: Record<string, string> = {
  novo: "bg-blue-100 text-blue-700",
  contatado: "bg-yellow-100 text-yellow-700",
  convertido: "bg-green-100 text-green-700",
  descartado: "bg-neutral-100 text-neutral-500",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const leadsHoje = demoLeads.filter((l) => {
  const today = new Date().toISOString().slice(0, 10);
  return l.created_at.slice(0, 10) === today;
}).length;

const stats = [
  {
    label: "Leads Hoje",
    value: leadsHoje,
    icon: TrendingUp,
    color: "bg-blue-50 text-blue-700",
  },
  {
    label: "Leads Este Mês",
    value: demoLeads.length,
    icon: Users,
    color: "bg-primary-50 text-primary-700",
  },
  {
    label: "Produtos Ativos",
    value: demoProducts.filter((p) => p.active).length,
    icon: Package,
    color: "bg-secondary-100 text-secondary-700",
  },
  {
    label: "Depoimentos Aprovados",
    value: demoTestimonials.filter((t) => t.approved).length,
    icon: Star,
    color: "bg-amber-50 text-amber-700",
  },
];

const recentLeads = [...demoLeads]
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  .slice(0, 5);

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">Dashboard</h2>
        <p className="text-neutral-500 text-sm mt-1">
          Visão geral do painel administrativo — dados de demonstração.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}
            >
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm font-medium text-neutral-700">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="text-base font-semibold text-neutral-900">
            Leads Recentes
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3 text-left font-medium">Nome</th>
                <th className="px-6 py-3 text-left font-medium">Telefone</th>
                <th className="px-6 py-3 text-left font-medium">Cidade</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-neutral-900">
                    {lead.name}
                  </td>
                  <td className="px-6 py-3 text-neutral-600">{lead.phone}</td>
                  <td className="px-6 py-3 text-neutral-600">
                    {lead.city}, {lead.state}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-neutral-500">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { DollarSign, Package, ShoppingBag, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — JC Store" },
      { name: "description", content: "Painel de gestão da JC Store." },
    ],
  }),
  component: Dashboard,
});

const topProducts = [
  { name: "Camiseta Oversized Preta", sold: 42, revenue: "R$ 3.780,00" },
  { name: "Calça Jeans Slim", sold: 31, revenue: "R$ 5.890,00" },
  { name: "Moletom Canguru", sold: 24, revenue: "R$ 4.320,00" },
  { name: "Tênis Casual Branco", sold: 19, revenue: "R$ 5.510,00" },
  { name: "Boné Trucker", sold: 17, revenue: "R$ 1.190,00" },
];

function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Visão geral</h2>
              <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-md">v1</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">JC Store · resumo do mês</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">Maio de 2026</p>
            <p className="text-xs text-muted-foreground">Mês atual · visão ao vivo</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          <StatCard label="Unidades" value="248" icon={<Package className="h-3.5 w-3.5" />} />
          <StatCard label="Receita" value="R$ 28.450" icon={<DollarSign className="h-3.5 w-3.5" />} accent="success" />
          <StatCard label="Custo total" value="R$ 14.220" icon={<DollarSign className="h-3.5 w-3.5" />} accent="warning" />
          <StatCard label="Margem R$" value="R$ 14.230" accent="success" />
          <StatCard label="Margem %" value="50.0%" accent="primary" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Produtos mais vendidos</h3>
          </div>
          <div className="divide-y divide-border">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium">{p.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{p.revenue}</p>
                  <p className="text-xs text-muted-foreground">{p.sold} un.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Colaboradores ativos</h3>
          </div>
          <p className="text-4xl font-bold">7</p>
          <p className="text-sm text-muted-foreground mt-1">Online hoje: 4</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md bg-secondary p-2">
              <p className="text-muted-foreground">Vendas hoje</p>
              <p className="font-semibold text-foreground">R$ 2.140</p>
            </div>
            <div className="rounded-md bg-secondary p-2">
              <p className="text-muted-foreground">Comandas</p>
              <p className="font-semibold text-foreground">18</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

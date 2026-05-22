import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { DollarSign, Package, ShoppingBag, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Dashboard — JC Store" },
      { name: "description", content: "Painel de gestão da JC Store." },
    ],
  }),
  component: Dashboard,
}));

const topProducts = [
  { name: "Camiseta Oversized Preta", sold: 42, revenue: "R$ 3.780,00" },
  { name: "Calça Jeans Slim", sold: 31, revenue: "R$ 5.890,00" },
  { name: "Moletom Canguru", sold: 24, revenue: "R$ 4.320,00" },
  { name: "Tênis Casual Branco", sold: 19, revenue: "R$ 5.510,00" },
  { name: "Boné Trucker", sold: 17, revenue: "R$ 1.190,00" },
];

const monthsData = {
  0: { month: "Janeiro", units: 198, revenue: "R$ 22.340", cost: "R$ 11.170", margin: "R$ 11.170", marginPercent: "50.0%" },
  1: { month: "Fevereiro", units: 215, revenue: "R$ 24.580", cost: "R$ 12.290", margin: "R$ 12.290", marginPercent: "50.0%" },
  2: { month: "Março", units: 232, revenue: "R$ 26.780", cost: "R$ 13.390", margin: "R$ 13.390", marginPercent: "50.0%" },
  3: { month: "Abril", units: 240, revenue: "R$ 27.650", cost: "R$ 13.825", margin: "R$ 13.825", marginPercent: "50.0%" },
  4: { month: "Maio", units: 248, revenue: "R$ 28.450", cost: "R$ 14.220", margin: "R$ 14.230", marginPercent: "50.0%" },
  5: { month: "Junho", units: 255, revenue: "R$ 29.340", cost: "R$ 14.670", margin: "R$ 14.670", marginPercent: "50.0%" },
  6: { month: "Julho", units: 268, revenue: "R$ 31.200", cost: "R$ 15.600", margin: "R$ 15.600", marginPercent: "50.0%" },
  7: { month: "Agosto", units: 275, revenue: "R$ 32.100", cost: "R$ 16.050", margin: "R$ 16.050", marginPercent: "50.0%" },
  8: { month: "Setembro", units: 262, revenue: "R$ 30.450", cost: "R$ 15.225", margin: "R$ 15.225", marginPercent: "50.0%" },
  9: { month: "Outubro", units: 280, revenue: "R$ 33.200", cost: "R$ 16.600", margin: "R$ 16.600", marginPercent: "50.0%" },
  10: { month: "Novembro", units: 295, revenue: "R$ 35.800", cost: "R$ 17.900", margin: "R$ 17.900", marginPercent: "50.0%" },
  11: { month: "Dezembro", units: 310, revenue: "R$ 38.500", cost: "R$ 19.250", margin: "R$ 19.250", marginPercent: "50.0%" },
};

function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(4);
  const monthData = monthsData[selectedMonth as keyof typeof monthsData];

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
            <div className="flex items-center gap-2 justify-end mb-2">
              <label htmlFor="month-select" className="text-xs text-muted-foreground">Selecione o mês:</label>
              <select 
                id="month-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="px-3 py-1.5 rounded-md border border-border bg-background text-foreground text-sm font-medium hover:bg-accent transition"
              >
                <option value={0}>Janeiro</option>
                <option value={1}>Fevereiro</option>
                <option value={2}>Março</option>
                <option value={3}>Abril</option>
                <option value={4}>Maio</option>
                <option value={5}>Junho</option>
                <option value={6}>Julho</option>
                <option value={7}>Agosto</option>
                <option value={8}>Setembro</option>
                <option value={9}>Outubro</option>
                <option value={10}>Novembro</option>
                <option value={11}>Dezembro</option>
              </select>
            </div>
            <p className="text-2xl font-bold">{monthData.month} de 2026</p>
            <p className="text-xs text-muted-foreground">Mês selecionado · visão ao vivo</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          <StatCard label="Unidades" value={monthData.units.toString()} icon={<Package className="h-3.5 w-3.5" />} />
          <StatCard label="Receita" value={monthData.revenue} icon={<DollarSign className="h-3.5 w-3.5" />} accent="success" />
          <StatCard label="Custo total" value={monthData.cost} icon={<DollarSign className="h-3.5 w-3.5" />} accent="warning" />
          <StatCard label="Margem R$" value={monthData.margin} accent="success" />
          <StatCard label="Margem %" value={monthData.marginPercent} accent="primary" />
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


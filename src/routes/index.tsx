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

const topProducts: { name: string; sold: number; revenue: string }[] = [];

const zero = { units: 0, revenue: "R$ 0,00", cost: "R$ 0,00", margin: "R$ 0,00", marginPercent: "0,0%" };
const monthsData = {
  0: { month: "Janeiro", ...zero },
  1: { month: "Fevereiro", ...zero },
  2: { month: "Março", ...zero },
  3: { month: "Abril", ...zero },
  4: { month: "Maio", ...zero },
  5: { month: "Junho", ...zero },
  6: { month: "Julho", ...zero },
  7: { month: "Agosto", ...zero },
  8: { month: "Setembro", ...zero },
  9: { month: "Outubro", ...zero },
  10: { month: "Novembro", ...zero },
  11: { month: "Dezembro", ...zero },
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


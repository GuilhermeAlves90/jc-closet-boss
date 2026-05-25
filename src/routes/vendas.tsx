import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { ChevronLeft, ChevronRight, RefreshCw, Settings, Trophy, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/vendas")(({
  head: () => ({ meta: [{ title: "Vendas Produtos — JC Store" }] }),
  component: VendasPage,
}));

const zero = { units: 0, revenue: "R$ 0,00", cost: "R$ 0,00", marginR: "R$ 0,00", marginP: "0,0%", noCost: 0 };
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

const ranking: {
  name: string;
  orders: number;
  units: number;
  revenue: string;
  cost: string;
  marginR: string;
  marginP: string;
  ticket: string;
  commP: string;
  commR: string;
}[] = [];

function VendasPage() {
  const [selectedMonth, setSelectedMonth] = useState(4);
  const monthData = monthsData[selectedMonth as keyof typeof monthsData];

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <AppLayout title="Vendas Produtos">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Vendas de Produtos</h2>
              <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-md">v1</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevMonth}
              className="h-9 w-9 rounded-md bg-secondary hover:bg-accent flex items-center justify-center transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-center px-2 min-w-[150px]">
              <p className="text-xl font-bold">{monthData.month} de 2026</p>
              <p className="text-xs text-muted-foreground">Mês selecionado · visão ao vivo</p>
            </div>
            <button 
              onClick={handleNextMonth}
              className="h-9 w-9 rounded-md bg-secondary hover:bg-accent flex items-center justify-center transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-accent text-sm transition"
          >
            <RefreshCw className="h-4 w-4" /> Atualizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-accent text-sm transition">
            <Settings className="h-4 w-4" /> Preços de compra/venda
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          <StatCard label="Unidades" value={monthData.units.toString()} />
          <StatCard label="Receita" value={monthData.revenue} accent="success" />
          <StatCard label="Custo total" value={monthData.cost} accent="warning" />
          <StatCard label="Margem R$" value={monthData.marginR} accent="success" />
          <StatCard label="Margem %" value={monthData.marginP} />
          <StatCard label="Produtos sem custo" value={monthData.noCost.toString()} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="h-5 w-5 text-warning" />
          <h3 className="font-semibold">Ranking de vendedores</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-3 font-medium">#</th>
                <th className="py-3 font-medium">Profissional</th>
                <th className="py-3 font-medium text-right">Comandas</th>
                <th className="py-3 font-medium text-right">Unidades</th>
                <th className="py-3 font-medium text-right">Receita</th>
                <th className="py-3 font-medium text-right">Custo</th>
                <th className="py-3 font-medium text-right">Margem R$</th>
                <th className="py-3 font-medium text-right">Margem %</th>
                <th className="py-3 font-medium text-right">Ticket</th>
                <th className="py-3 font-medium text-right">Comissão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ranking.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-sm text-muted-foreground">
                    Nenhum vendedor cadastrado ainda.
                  </td>
                </tr>
              ) : (
                ranking.map((r, i) => (
                  <tr key={r.name} className="hover:bg-accent/30">
                    <td className="py-4">
                      <span className={`inline-flex h-7 w-7 rounded-full items-center justify-center text-xs font-bold ${i === 0 ? "bg-warning/20 text-warning" : i === 1 ? "bg-muted text-foreground" : i === 2 ? "bg-chart-5/20 text-chart-5" : "bg-secondary text-muted-foreground"}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-4 font-medium">{r.name}</td>
                    <td className="py-4 text-right">{r.orders}</td>
                    <td className="py-4 text-right">{r.units}</td>
                    <td className="py-4 text-right font-semibold">{r.revenue}</td>
                    <td className="py-4 text-right text-muted-foreground">{r.cost}</td>
                    <td className="py-4 text-right text-success">{r.marginR}</td>
                    <td className="py-4 text-right">{r.marginP}</td>
                    <td className="py-4 text-right">{r.ticket}</td>
                    <td className="py-4 text-right text-success font-semibold">{r.commR}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

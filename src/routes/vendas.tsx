import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { ChevronLeft, ChevronRight, RefreshCw, Settings, Trophy, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/vendas")(({
  head: () => ({ meta: [{ title: "Vendas Produtos — JC Store" }] }),
  component: VendasPage,
}));

const monthsData = {
  0: { month: "Janeiro", units: 142, revenue: "R$ 18.540", cost: "R$ 9.270", marginR: "R$ 9.270", marginP: "50.0%", noCost: 0 },
  1: { month: "Fevereiro", units: 154, revenue: "R$ 20.120", cost: "R$ 10.060", marginR: "R$ 10.060", marginP: "50.0%", noCost: 0 },
  2: { month: "Março", units: 168, revenue: "R$ 21.980", cost: "R$ 10.990", marginR: "R$ 10.990", marginP: "50.0%", noCost: 0 },
  3: { month: "Abril", units: 172, revenue: "R$ 22.450", cost: "R$ 11.225", marginR: "R$ 11.225", marginP: "50.0%", noCost: 0 },
  4: { month: "Maio", units: 156, revenue: "R$ 20.375", cost: "R$ 10.159", marginR: "R$ 10.215", marginP: "50.1%", noCost: 0 },
  5: { month: "Junho", units: 184, revenue: "R$ 24.120", cost: "R$ 12.060", marginR: "R$ 12.060", marginP: "50.0%", noCost: 0 },
  6: { month: "Julho", units: 195, revenue: "R$ 25.480", cost: "R$ 12.740", marginR: "R$ 12.740", marginP: "50.0%", noCost: 0 },
  7: { month: "Agosto", units: 202, revenue: "R$ 26.380", cost: "R$ 13.190", marginR: "R$ 13.190", marginP: "50.0%", noCost: 0 },
  8: { month: "Setembro", units: 188, revenue: "R$ 24.560", cost: "R$ 12.280", marginR: "R$ 12.280", marginP: "50.0%", noCost: 0 },
  9: { month: "Outubro", units: 210, revenue: "R$ 27.450", cost: "R$ 13.725", marginR: "R$ 13.725", marginP: "50.0%", noCost: 0 },
  10: { month: "Novembro", units: 225, revenue: "R$ 29.380", cost: "R$ 14.690", marginR: "R$ 14.690", marginP: "50.0%", noCost: 0 },
  11: { month: "Dezembro", units: 245, revenue: "R$ 32.010", cost: "R$ 16.005", marginR: "R$ 16.005", marginP: "50.0%", noCost: 0 },
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

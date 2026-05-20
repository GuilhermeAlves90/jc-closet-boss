import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { ChevronLeft, ChevronRight, RefreshCw, Settings, Trophy, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/vendas")({
  head: () => ({ meta: [{ title: "Vendas Produtos — JC Store" }] }),
  component: VendasPage,
});

const ranking = [
  { name: "LARISSA COSTA", orders: 18, units: 26, revenue: "R$ 4.740,50", cost: "R$ 2.425,44", marginR: "R$ 2.315,06", marginP: "48.8%", ticket: "R$ 263,36", commP: "10%", commR: "R$ 474,05" },
  { name: "CÉSAR RICARDO GOMES", orders: 30, units: 51, revenue: "R$ 7.385,00", cost: "R$ 3.432,46", marginR: "R$ 3.952,54", marginP: "53.5%", ticket: "R$ 246,17", commP: "10%", commR: "R$ 738,50" },
  { name: "ANDRÉ CARLOS", orders: 15, units: 17, revenue: "R$ 3.505,00", cost: "R$ 1.864,09", marginR: "R$ 1.640,91", marginP: "46.8%", ticket: "R$ 233,67", commP: "10%", commR: "R$ 350,50" },
  { name: "ARMANDO SILVA BISPO", orders: 10, units: 15, revenue: "R$ 2.484,00", cost: "R$ 1.254,73", marginR: "R$ 1.229,27", marginP: "49.5%", ticket: "R$ 248,40", commP: "10%", commR: "R$ 248,40" },
  { name: "CAMILA BARBOSA", orders: 11, units: 16, revenue: "R$ 2.260,50", cost: "R$ 1.183,21", marginR: "R$ 1.077,29", marginP: "47.7%", ticket: "R$ 205,50", commP: "10%", commR: "R$ 226,05" },
];

function VendasPage() {
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
            <button className="h-9 w-9 rounded-md bg-secondary hover:bg-accent flex items-center justify-center">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-center px-2">
              <p className="text-xl font-bold">Maio de 2026</p>
              <p className="text-xs text-muted-foreground">Mês atual · visão ao vivo</p>
            </div>
            <button className="h-9 w-9 rounded-md bg-secondary hover:bg-accent flex items-center justify-center">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-accent text-sm">
            <RefreshCw className="h-4 w-4" /> Atualizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-accent text-sm">
            <Settings className="h-4 w-4" /> Preços de compra/venda
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          <StatCard label="Unidades" value="156" />
          <StatCard label="Receita" value="R$ 20.375" accent="success" />
          <StatCard label="Custo total" value="R$ 10.159" accent="warning" />
          <StatCard label="Margem R$" value="R$ 10.215" accent="success" />
          <StatCard label="Margem %" value="50.1%" />
          <StatCard label="Produtos sem custo" value="0" />
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
              {ranking.map((r, i) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

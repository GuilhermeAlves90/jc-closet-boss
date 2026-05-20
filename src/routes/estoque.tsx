import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { Package, Plus, Search, AlertTriangle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/estoque")({
  head: () => ({ meta: [{ title: "Estoque de Roupas — JC Store" }] }),
  component: EstoquePage,
});

type Item = {
  sku: string;
  name: string;
  category: string;
  size: string;
  color: string;
  stock: number;
  min: number;
  cost: number;
  price: number;
};

const initial: Item[] = [
  { sku: "CAM-001", name: "Camiseta Oversized", category: "Camisetas", size: "M", color: "Preto", stock: 24, min: 10, cost: 35, price: 89.9 },
  { sku: "CAM-002", name: "Camiseta Básica", category: "Camisetas", size: "G", color: "Branco", stock: 8, min: 10, cost: 22, price: 49.9 },
  { sku: "CAL-010", name: "Calça Jeans Slim", category: "Calças", size: "42", color: "Azul", stock: 15, min: 8, cost: 75, price: 189.9 },
  { sku: "MOL-005", name: "Moletom Canguru", category: "Moletons", size: "GG", color: "Cinza", stock: 12, min: 6, cost: 70, price: 179.9 },
  { sku: "TEN-022", name: "Tênis Casual", category: "Calçados", size: "41", color: "Branco", stock: 4, min: 5, cost: 130, price: 289.9 },
  { sku: "BON-003", name: "Boné Trucker", category: "Acessórios", size: "U", color: "Preto", stock: 30, min: 10, cost: 25, price: 69.9 },
  { sku: "JAQ-007", name: "Jaqueta Corta-vento", category: "Jaquetas", size: "M", color: "Verde", stock: 6, min: 4, cost: 110, price: 259.9 },
];

function EstoquePage() {
  const [items] = useState(initial);
  const [query, setQuery] = useState("");

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.sku.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase()),
  );

  const totalUnits = items.reduce((s, i) => s + i.stock, 0);
  const totalValue = items.reduce((s, i) => s + i.stock * i.price, 0);
  const totalCost = items.reduce((s, i) => s + i.stock * i.cost, 0);
  const lowStock = items.filter((i) => i.stock <= i.min).length;

  return (
    <AppLayout title="Estoque de Roupas">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="SKUs cadastrados" value={String(items.length)} icon={<Package className="h-3.5 w-3.5" />} />
        <StatCard label="Unidades em estoque" value={String(totalUnits)} accent="success" />
        <StatCard label="Valor em estoque" value={`R$ ${totalValue.toFixed(2)}`} accent="success" />
        <StatCard label="Estoque baixo" value={String(lowStock)} icon={<AlertTriangle className="h-3.5 w-3.5" />} accent="warning" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por SKU, nome ou categoria..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            <Plus className="h-4 w-4" /> Nova peça
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-3 font-medium">SKU</th>
                <th className="py-3 font-medium">Produto</th>
                <th className="py-3 font-medium">Categoria</th>
                <th className="py-3 font-medium">Tamanho</th>
                <th className="py-3 font-medium">Cor</th>
                <th className="py-3 font-medium text-right">Estoque</th>
                <th className="py-3 font-medium text-right">Custo</th>
                <th className="py-3 font-medium text-right">Preço</th>
                <th className="py-3 font-medium text-right">Margem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((i) => {
                const low = i.stock <= i.min;
                const margin = (((i.price - i.cost) / i.price) * 100).toFixed(1);
                return (
                  <tr key={i.sku} className="hover:bg-accent/30">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{i.sku}</td>
                    <td className="py-3 font-medium">{i.name}</td>
                    <td className="py-3 text-muted-foreground">{i.category}</td>
                    <td className="py-3">{i.size}</td>
                    <td className="py-3">{i.color}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${low ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success"}`}>
                        {low && <AlertTriangle className="h-3 w-3" />}
                        {i.stock}
                      </span>
                    </td>
                    <td className="py-3 text-right text-muted-foreground">R$ {i.cost.toFixed(2)}</td>
                    <td className="py-3 text-right font-semibold">R$ {i.price.toFixed(2)}</td>
                    <td className="py-3 text-right text-success">{margin}%</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-border text-sm">
                <td colSpan={5} className="py-3 text-muted-foreground">Totais</td>
                <td className="py-3 text-right font-semibold">{totalUnits}</td>
                <td className="py-3 text-right text-muted-foreground">R$ {totalCost.toFixed(2)}</td>
                <td className="py-3 text-right text-success font-semibold">R$ {totalValue.toFixed(2)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { Package, Plus, Search, AlertTriangle, Minus, X, ShoppingCart } from "lucide-react";
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
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [selling, setSelling] = useState<Item | null>(null);
  const [qty, setQty] = useState(1);

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

  const openSell = (item: Item) => {
    setSelling(item);
    setQty(1);
  };

  const confirmSell = () => {
    if (!selling) return;
    const amount = Math.max(1, Math.min(qty, selling.stock));
    setItems((prev) =>
      prev.map((i) => (i.sku === selling.sku ? { ...i, stock: i.stock - amount } : i)),
    );
    setSelling(null);
  };

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
                <th className="py-3 font-medium">Tam.</th>
                <th className="py-3 font-medium">Cor</th>
                <th className="py-3 font-medium text-right">Estoque</th>
                <th className="py-3 font-medium text-right">Custo</th>
                <th className="py-3 font-medium text-right">Preço</th>
                <th className="py-3 font-medium text-right">Margem</th>
                <th className="py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((i) => {
                const low = i.stock <= i.min;
                const out = i.stock === 0;
                const margin = (((i.price - i.cost) / i.price) * 100).toFixed(1);
                return (
                  <tr key={i.sku} className="hover:bg-accent/30">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{i.sku}</td>
                    <td className="py-3 font-medium">{i.name}</td>
                    <td className="py-3 text-muted-foreground">{i.category}</td>
                    <td className="py-3">{i.size}</td>
                    <td className="py-3">{i.color}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${out ? "bg-destructive/15 text-destructive" : low ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>
                        {low && <AlertTriangle className="h-3 w-3" />}
                        {i.stock}
                      </span>
                    </td>
                    <td className="py-3 text-right text-muted-foreground">R$ {i.cost.toFixed(2)}</td>
                    <td className="py-3 text-right font-semibold">R$ {i.price.toFixed(2)}</td>
                    <td className="py-3 text-right text-success">{margin}%</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => openSell(i)}
                        disabled={out}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:hover:bg-primary/10 disabled:hover:text-primary text-xs font-medium transition"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" /> Vender
                      </button>
                    </td>
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
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {selling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelling(null)}>
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Registrar venda</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Remova unidades do estoque</p>
              </div>
              <button
                onClick={() => setSelling(null)}
                className="h-8 w-8 rounded-md hover:bg-accent flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-lg bg-secondary p-3 mb-4">
              <p className="font-medium">{selling.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selling.category} · {selling.size} · {selling.color}
              </p>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-muted-foreground">Em estoque: <strong className="text-foreground">{selling.stock}</strong></span>
                <span className="text-success font-semibold">R$ {selling.price.toFixed(2)} / un.</span>
              </div>
            </div>

            <label className="text-sm font-medium block mb-2">Quantidade a vender</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-10 w-10 rounded-md bg-secondary hover:bg-accent flex items-center justify-center"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={1}
                max={selling.stock}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(selling.stock, Number(e.target.value) || 1)))}
                className="flex-1 text-center text-lg font-bold py-2 rounded-md bg-secondary border border-border focus:outline-none focus:border-primary"
              />
              <button
                onClick={() => setQty((q) => Math.min(selling.stock, q + 1))}
                className="h-10 w-10 rounded-md bg-secondary hover:bg-accent flex items-center justify-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total da venda</span>
              <span className="text-xl font-bold text-success">
                R$ {(qty * selling.price).toFixed(2)}
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setSelling(null)}
                className="flex-1 py-2.5 rounded-md bg-secondary hover:bg-accent text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={confirmSell}
                className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 text-sm font-semibold"
              >
                Confirmar venda
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

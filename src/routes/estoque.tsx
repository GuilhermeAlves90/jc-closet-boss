import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { Package, Plus, Search, AlertTriangle, Minus, X, ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

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

const STORAGE_KEY = "jcstore:estoque";

type Adjust = { item: Item; mode: "add" | "remove" };

const emptyNew = { sku: "", name: "", category: "", size: "", color: "", stock: 0, min: 0, cost: 0, price: 0 };

function EstoquePage() {
  const [items, setItems] = useState<Item[]>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Item[]) : initial;
    } catch {
      return initial;
    }
  });
  const [query, setQuery] = useState("");
  const [adjust, setAdjust] = useState<Adjust | null>(null);
  const [qty, setQty] = useState(1);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Item>(emptyNew);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

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

  const openAdjust = (item: Item, mode: "add" | "remove") => {
    setAdjust({ item, mode });
    setQty(1);
  };

  const confirmAdjust = () => {
    if (!adjust) return;
    const amount = Math.max(1, qty);
    setItems((prev) =>
      prev.map((i) => {
        if (i.sku !== adjust.item.sku) return i;
        const next = adjust.mode === "add" ? i.stock + amount : Math.max(0, i.stock - amount);
        return { ...i, stock: next };
      }),
    );
    setAdjust(null);
  };

  const handleDelete = (sku: string, name: string) => {
    if (confirm(`Excluir "${name}" do estoque?`)) {
      setItems((prev) => prev.filter((i) => i.sku !== sku));
    }
  };

  const handleCreate = () => {
    if (!draft.sku.trim() || !draft.name.trim()) {
      alert("Informe ao menos SKU e nome do produto.");
      return;
    }
    if (items.some((i) => i.sku.toLowerCase() === draft.sku.toLowerCase())) {
      alert("Já existe um produto com esse SKU.");
      return;
    }
    setItems((prev) => [...prev, { ...draft }]);
    setCreating(false);
    setDraft(emptyNew);
  };

  const maxQty = adjust?.mode === "remove" ? adjust.item.stock : 9999;

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
          <button
            onClick={() => {
              setDraft(emptyNew);
              setCreating(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          >
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-sm text-muted-foreground">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((i) => {
                  const low = i.stock <= i.min;
                  const out = i.stock === 0;
                  const margin = i.price > 0 ? (((i.price - i.cost) / i.price) * 100).toFixed(1) : "0.0";
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
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openAdjust(i, "add")}
                            title="Adicionar ao estoque"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-success/10 text-success hover:bg-success hover:text-success-foreground text-xs font-medium transition"
                          >
                            <ArrowUp className="h-3.5 w-3.5" /> Entrada
                          </button>
                          <button
                            onClick={() => openAdjust(i, "remove")}
                            disabled={out}
                            title="Remover do estoque"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:hover:bg-primary/10 disabled:hover:text-primary text-xs font-medium transition"
                          >
                            <ArrowDown className="h-3.5 w-3.5" /> Saída
                          </button>
                          <button
                            onClick={() => handleDelete(i.sku, i.name)}
                            title="Excluir produto"
                            className="h-7 w-7 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
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

      {adjust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setAdjust(null)}>
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {adjust.mode === "add" ? "Entrada de estoque" : "Saída de estoque"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {adjust.mode === "add" ? "Adicione unidades ao estoque" : "Remova unidades do estoque"}
                </p>
              </div>
              <button
                onClick={() => setAdjust(null)}
                className="h-8 w-8 rounded-md hover:bg-accent flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-lg bg-secondary p-3 mb-4">
              <p className="font-medium">{adjust.item.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {adjust.item.category} · {adjust.item.size} · {adjust.item.color}
              </p>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-muted-foreground">Em estoque: <strong className="text-foreground">{adjust.item.stock}</strong></span>
                <span className="text-success font-semibold">R$ {adjust.item.price.toFixed(2)} / un.</span>
              </div>
            </div>

            <label className="text-sm font-medium block mb-2">
              Quantidade a {adjust.mode === "add" ? "adicionar" : "remover"}
            </label>
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
                max={maxQty}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(maxQty, Number(e.target.value) || 1)))}
                className="flex-1 text-center text-lg font-bold py-2 rounded-md bg-secondary border border-border focus:outline-none focus:border-primary"
              />
              <button
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                className="h-10 w-10 rounded-md bg-secondary hover:bg-accent flex items-center justify-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estoque após</span>
              <span className="text-xl font-bold">
                {adjust.mode === "add" ? adjust.item.stock + qty : Math.max(0, adjust.item.stock - qty)} un.
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setAdjust(null)}
                className="flex-1 py-2.5 rounded-md bg-secondary hover:bg-accent text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAdjust}
                className={`flex-1 py-2.5 rounded-md text-sm font-semibold text-primary-foreground hover:opacity-90 ${adjust.mode === "add" ? "bg-success" : "bg-primary"}`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setCreating(false)}>
          <div
            className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Novo produto</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Cadastre uma peça no estoque</p>
              </div>
              <button
                onClick={() => setCreating(false)}
                className="h-8 w-8 rounded-md hover:bg-accent flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="SKU *">
                <input
                  value={draft.sku}
                  onChange={(e) => setDraft({ ...draft, sku: e.target.value.toUpperCase() })}
                  placeholder="CAM-001"
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Categoria">
                <input
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  placeholder="Camisetas"
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Nome do produto *" full>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="Camiseta Oversized"
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Tamanho">
                <input
                  value={draft.size}
                  onChange={(e) => setDraft({ ...draft, size: e.target.value })}
                  placeholder="M"
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Cor">
                <input
                  value={draft.color}
                  onChange={(e) => setDraft({ ...draft, color: e.target.value })}
                  placeholder="Preto"
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Estoque inicial">
                <input
                  type="number"
                  min={0}
                  value={draft.stock}
                  onChange={(e) => setDraft({ ...draft, stock: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Estoque mínimo">
                <input
                  type="number"
                  min={0}
                  value={draft.min}
                  onChange={(e) => setDraft({ ...draft, min: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Custo (R$)">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={draft.cost}
                  onChange={(e) => setDraft({ ...draft, cost: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Preço de venda (R$)">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={draft.price}
                  onChange={(e) => setDraft({ ...draft, price: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-sm focus:outline-none focus:border-primary"
                />
              </Field>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setCreating(false)}
                className="flex-1 py-2.5 rounded-md bg-secondary hover:bg-accent text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 text-sm font-semibold"
              >
                Cadastrar produto
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "col-span-2" : ""}`}>
      <span className="text-xs font-medium text-muted-foreground block mb-1">{label}</span>
      {children}
    </label>
  );
}

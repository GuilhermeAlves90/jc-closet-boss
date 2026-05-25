import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/lancamentos")({
  head: () => ({ meta: [{ title: "Lançamentos — JC Store" }] }),
  component: LancamentosPage,
});

type Lanc = { id: string; type: "in" | "out"; desc: string; value: string; date: string };

const initial: Lanc[] = [
  { id: "1", type: "in", desc: "Venda — Camiseta Oversized", value: "R$ 89,90", date: "20/05 14:32" },
  { id: "2", type: "out", desc: "Compra de mercadoria", value: "R$ 1.250,00", date: "20/05 10:15" },
  { id: "3", type: "in", desc: "Venda — Calça Jeans Slim", value: "R$ 189,90", date: "19/05 17:48" },
  { id: "4", type: "out", desc: "Pagamento de comissão", value: "R$ 738,50", date: "19/05 09:00" },
  { id: "5", type: "in", desc: "Venda — Tênis Casual", value: "R$ 289,90", date: "18/05 16:21" },
];

const STORAGE_KEY = "jcstore:lancamentos";

function LancamentosPage() {
  const [items, setItems] = useState<Lanc[]>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? (JSON.parse(s) as Lanc[]) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const handleDelete = (id: string, desc: string) => {
    if (confirm(`Excluir "${desc}"?`)) {
      setItems((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <AppLayout title="Lançamentos">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Últimos lançamentos</h3>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Nenhum lançamento.</p>
        ) : (
          <div className="divide-y divide-border">
            {items.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {l.type === "in" ? (
                    <ArrowUpCircle className="h-5 w-5 text-success shrink-0" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-destructive shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{l.desc}</p>
                    <p className="text-xs text-muted-foreground">{l.date}</p>
                  </div>
                </div>
                <p className={`font-semibold whitespace-nowrap ${l.type === "in" ? "text-success" : "text-destructive"}`}>
                  {l.type === "in" ? "+" : "−"} {l.value}
                </p>
                <button
                  onClick={() => handleDelete(l.id, l.desc)}
                  className="h-8 w-8 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition"
                  aria-label={`Excluir ${l.desc}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

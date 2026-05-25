import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — JC Store" }] }),
  component: FinanceiroPage,
});

type Conta = { id: string; desc: string; due: string; value: string };

const initial: Conta[] = [
  { id: "1", desc: "Aluguel da loja", due: "25/05", value: "R$ 4.200,00" },
  { id: "2", desc: "Fornecedor — Tecidos SP", due: "28/05", value: "R$ 2.150,00" },
  { id: "3", desc: "Energia elétrica", due: "30/05", value: "R$ 680,00" },
  { id: "4", desc: "Internet", due: "02/06", value: "R$ 199,90" },
];

const STORAGE_KEY = "jcstore:financeiro";

function FinanceiroPage() {
  const [contas, setContas] = useState<Conta[]>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? (JSON.parse(s) as Conta[]) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contas));
    } catch {}
  }, [contas]);

  const handleDelete = (id: string, desc: string) => {
    if (confirm(`Excluir "${desc}"?`)) {
      setContas((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <AppLayout title="Financeiro">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Receita do mês" value="R$ 0,00" accent="success" />
        <StatCard label="Despesas" value="R$ 0,00" accent="destructive" />
        <StatCard label="Lucro líquido" value="R$ 0,00" accent="primary" />
        <StatCard label="A receber" value="R$ 0,00" accent="warning" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Contas a pagar</h3>
        {contas.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Nenhuma conta cadastrada.</p>
        ) : (
          <div className="divide-y divide-border text-sm">
            {contas.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3 gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{c.desc}</p>
                  <p className="text-xs text-muted-foreground">Vence em {c.due}</p>
                </div>
                <p className="font-semibold whitespace-nowrap">{c.value}</p>
                <button
                  onClick={() => handleDelete(c.id, c.desc)}
                  className="h-8 w-8 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition"
                  aria-label={`Excluir ${c.desc}`}
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

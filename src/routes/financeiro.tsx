import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";

export const Route = createFileRoute("/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — JC Store" }] }),
  component: () => (
    <AppLayout title="Financeiro">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Receita do mês" value="R$ 28.450" accent="success" />
        <StatCard label="Despesas" value="R$ 9.820" accent="destructive" />
        <StatCard label="Lucro líquido" value="R$ 18.630" accent="primary" />
        <StatCard label="A receber" value="R$ 3.210" accent="warning" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Contas a pagar</h3>
        <div className="divide-y divide-border text-sm">
          {[
            { desc: "Aluguel da loja", due: "25/05", value: "R$ 4.200,00" },
            { desc: "Fornecedor — Tecidos SP", due: "28/05", value: "R$ 2.150,00" },
            { desc: "Energia elétrica", due: "30/05", value: "R$ 680,00" },
            { desc: "Internet", due: "02/06", value: "R$ 199,90" },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{c.desc}</p>
                <p className="text-xs text-muted-foreground">Vence em {c.due}</p>
              </div>
              <p className="font-semibold">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";

export const Route = createFileRoute("/caixa")({
  head: () => ({ meta: [{ title: "Caixa do Dia — JC Store" }] }),
  component: () => (
    <AppLayout title="Caixa do Dia">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Abertura" value="R$ 0,00" />
        <StatCard label="Entradas" value="R$ 0,00" accent="success" />
        <StatCard label="Saídas" value="R$ 0,00" accent="destructive" />
        <StatCard label="Saldo atual" value="R$ 0,00" accent="primary" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-3">Movimentações de hoje</h3>
        <p className="text-sm text-muted-foreground">
          0 comandas registradas · ticket médio R$ 0,00
        </p>
      </div>
    </AppLayout>
  ),
});

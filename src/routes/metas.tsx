import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/metas")({
  head: () => ({ meta: [{ title: "Metas — JC Store" }] }),
  component: MetasPage,
});

const metas = [
  { label: "Meta de receita (Maio)", current: 28450, target: 40000 },
  { label: "Unidades vendidas", current: 248, target: 350 },
  { label: "Ticket médio", current: 114, target: 130 },
  { label: "Novos clientes", current: 62, target: 100 },
];

function MetasPage() {
  return (
    <AppLayout title="Metas">
      <div className="grid md:grid-cols-2 gap-4">
        {metas.map((m) => {
          const pct = Math.min(100, (m.current / m.target) * 100);
          return (
            <div key={m.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">{m.label}</p>
                <p className="text-xs text-muted-foreground">{pct.toFixed(0)}%</p>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>{m.current.toLocaleString("pt-BR")}</span>
                <span>Meta: {m.target.toLocaleString("pt-BR")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}

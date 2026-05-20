import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export const Route = createFileRoute("/lancamentos")({
  head: () => ({ meta: [{ title: "Lançamentos — JC Store" }] }),
  component: () => (
    <AppLayout title="Lançamentos">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Últimos lançamentos</h3>
        <div className="divide-y divide-border">
          {[
            { type: "in", desc: "Venda — Camiseta Oversized", value: "R$ 89,90", date: "20/05 14:32" },
            { type: "out", desc: "Compra de mercadoria", value: "R$ 1.250,00", date: "20/05 10:15" },
            { type: "in", desc: "Venda — Calça Jeans Slim", value: "R$ 189,90", date: "19/05 17:48" },
            { type: "out", desc: "Pagamento de comissão", value: "R$ 738,50", date: "19/05 09:00" },
            { type: "in", desc: "Venda — Tênis Casual", value: "R$ 289,90", date: "18/05 16:21" },
          ].map((l, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                {l.type === "in" ? (
                  <ArrowUpCircle className="h-5 w-5 text-success" />
                ) : (
                  <ArrowDownCircle className="h-5 w-5 text-destructive" />
                )}
                <div>
                  <p className="text-sm font-medium">{l.desc}</p>
                  <p className="text-xs text-muted-foreground">{l.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${l.type === "in" ? "text-success" : "text-destructive"}`}>
                {l.type === "in" ? "+" : "−"} {l.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { Mail, Phone, Plus, Users } from "lucide-react";

export const Route = createFileRoute("/colaboradores")({
  head: () => ({ meta: [{ title: "Colaboradores — JC Store" }] }),
  component: ColaboradoresPage,
});

const team = [
  { name: "Larissa Costa", role: "Vendedora Sênior", email: "larissa@jcstore.com", phone: "(11) 98888-1122", sales: "R$ 4.740,50", commission: "10%", active: true },
  { name: "César Ricardo Gomes", role: "Gerente de Loja", email: "cesar@jcstore.com", phone: "(11) 99777-3344", sales: "R$ 7.385,00", commission: "10%", active: true },
  { name: "André Carlos", role: "Vendedor", email: "andre@jcstore.com", phone: "(11) 98666-5566", sales: "R$ 3.505,00", commission: "10%", active: true },
  { name: "Armando Silva Bispo", role: "Vendedor", email: "armando@jcstore.com", phone: "(11) 97555-7788", sales: "R$ 2.484,00", commission: "10%", active: true },
  { name: "Camila Barbosa", role: "Vendedora", email: "camila@jcstore.com", phone: "(11) 96444-9900", sales: "R$ 2.260,50", commission: "10%", active: true },
  { name: "Rodrigo Lima", role: "Estoquista", email: "rodrigo@jcstore.com", phone: "(11) 95333-2211", sales: "—", commission: "—", active: true },
  { name: "Beatriz Souza", role: "Caixa", email: "beatriz@jcstore.com", phone: "(11) 94222-4433", sales: "—", commission: "—", active: false },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

function ColaboradoresPage() {
  const active = team.filter((t) => t.active).length;
  return (
    <AppLayout title="Colaboradores">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total" value={String(team.length)} icon={<Users className="h-3.5 w-3.5" />} />
        <StatCard label="Ativos" value={String(active)} accent="success" />
        <StatCard label="Vendedores" value="5" />
        <StatCard label="Comissão média" value="10%" accent="primary" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">Equipe JC Store</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            <Plus className="h-4 w-4" /> Novo colaborador
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((t) => (
            <div key={t.email} className="rounded-lg border border-border bg-secondary/40 p-4">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {initials(t.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold truncate">{t.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${t.active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                      {t.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {t.email}</p>
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {t.phone}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Vendas no mês</p>
                  <p className="font-semibold text-foreground">{t.sales}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Comissão</p>
                  <p className="font-semibold text-primary">{t.commission}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

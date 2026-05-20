import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  Wallet,
  Receipt,
  Target,
  Store,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vendas", label: "Vendas Produtos", icon: ShoppingBag },
  { to: "/estoque", label: "Estoque de Roupas", icon: Package },
  { to: "/colaboradores", label: "Colaboradores", icon: Users },
  { to: "/lancamentos", label: "Lançamentos", icon: Receipt },
  { to: "/caixa", label: "Caixa do Dia", icon: Wallet },
  { to: "/financeiro", label: "Financeiro", icon: DollarSign },
  { to: "/metas", label: "Metas", icon: Target },
] as const;

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
          <Store className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-sidebar-foreground leading-tight">JC Store</p>
          <p className="text-xs text-muted-foreground">Gestão de Loja</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            activeProps={{
              className:
                "bg-primary/10 text-primary border-l-2 border-primary",
            }}
            inactiveProps={{
              className:
                "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground border-l-2 border-transparent",
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-5 py-3 text-xs text-muted-foreground border-t border-sidebar-border">
        JC Store © 2026
      </div>
    </aside>
  );
}

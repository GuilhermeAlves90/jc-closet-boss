import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} />
        <main className="flex-1 p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  accent?: "primary" | "success" | "warning" | "destructive";
}) {
  const color =
    accent === "success"
      ? "text-success"
      : accent === "warning"
        ? "text-warning"
        : accent === "destructive"
          ? "text-destructive"
          : "text-primary";
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon && <span className={color}>{icon}</span>}
        {label}
      </div>
      <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

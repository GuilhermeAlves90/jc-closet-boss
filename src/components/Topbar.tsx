import { Bell } from "lucide-react";

export function Topbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 backdrop-blur">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
            JC
          </div>
          <span className="text-sm font-medium hidden sm:inline">João Costa</span>
        </div>
      </div>
    </header>
  );
}

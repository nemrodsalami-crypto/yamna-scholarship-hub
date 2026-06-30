import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import {
  Wallet, GraduationCap, Handshake, MessagesSquare,
  LogOut, ChevronRight, Camera, Menu, X, Bell, Building2,
} from "lucide-react";
import { useState } from "react";
import { YamnaLogo } from "@/components/yamna/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ETABLISSEMENTS } from "@/lib/yamna-mock";

export const Route = createFileRoute("/ecole")({
  component: EcoleLayout,
});

const ME = ETABLISSEMENTS[1]; // INPTIC

const NAV = [
  { label: "Suivi paiements", url: "/ecole/paiements", icon: Wallet },
  { label: "Mes boursiers", url: "/ecole/boursiers", icon: GraduationCap },
  { label: "Conventions", url: "/ecole/conventions", icon: Handshake },
  { label: "Messagerie", url: "/ecole/messagerie", icon: MessagesSquare, badge: "1" },
];

function EcoleLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => pathname === url || pathname.startsWith(url + "/");

  const ProfileCard = (
    <div className="border-b bg-gradient-to-b from-info/6 to-transparent px-4 pb-5 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <YamnaLogo compact />
        <div className="flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Partenaire
        </div>
      </div>

      {/* Logo école uploadable */}
      <div className="relative mx-auto w-fit">
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          {/* Placeholder logo */}
          <div className="h-20 w-20 rounded-2xl border-2 border-border bg-gradient-to-br from-info/15 to-primary/10 shadow-md ring-4 ring-background flex items-center justify-center">
            <Building2 className="h-9 w-9 text-info" />
          </div>

          {/* Overlay upload */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/50 text-white transition-opacity",
            logoHover ? "opacity-100" : "opacity-0"
          )}>
            <Camera className="h-5 w-5" />
            <span className="mt-0.5 text-[9px] font-semibold">Changer</span>
          </div>
          <button className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-info text-white ring-2 ring-background shadow">
            <Camera className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-sm font-bold leading-tight">{ME.short}</p>
        <p className="text-[11px] text-muted-foreground leading-snug">{ME.name.split("—")[0].trim()}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{ME.city} · {ME.country}</p>
        <Badge className="mt-2 h-5 border-info/30 bg-info/10 px-2 text-[10px] text-info hover:bg-info/15">
          Référent pédagogique
        </Badge>
      </div>
    </div>
  );

  const sidebar = (
    <div className="flex h-full flex-col">
      {ProfileCard}

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {NAV.map((item) => {
          const active = isActive(item.url);
          return (
            <Link
              key={item.url}
              to={item.url}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors",
                active
                  ? "bg-info/8 text-info"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="h-5 rounded-md px-1.5 text-[10px]">{item.badge}</Badge>
              )}
              {active && <ChevronRight className="h-3 w-3 shrink-0 text-info" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <Link
          to="/"
          className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" /> Déconnexion
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r bg-card lg:block">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-60 border-r bg-card shadow-xl">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur-md">
          <button
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Mini school card */}
          <div className="flex items-center gap-2.5 rounded-xl border bg-card px-3 py-1.5 shadow-sm">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-info/10 text-info">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold leading-none">{ME.short}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{ME.city} · {ME.contact}</p>
            </div>
            <div className="ml-1 hidden items-center gap-1 rounded-full border border-success/30 bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Partenaire actif
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="relative grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-info ring-2 ring-background" />
            </button>
            <Link to="/" className="hidden items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent md:flex">
              <X className="h-3.5 w-3.5" /> Quitter
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

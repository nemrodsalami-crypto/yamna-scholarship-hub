import { Bell, Search, HelpCircle, Command } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";

export function Topbar({ breadcrumb }: { breadcrumb?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />
      {breadcrumb ?? (
        <nav className="hidden items-center gap-1.5 text-sm text-muted-foreground md:flex">
          <span>YAM’NA</span>
          <span className="opacity-50">/</span>
          <span className="font-medium text-foreground">Dashboard</span>
        </nav>
      )}

      <div className="ml-auto flex items-center gap-2">
        <button className="hidden h-9 w-72 items-center gap-2 rounded-lg border bg-secondary/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary md:flex">
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Rechercher étudiants, dossiers…</span>
          <kbd className="inline-flex h-5 items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] text-muted-foreground">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>

        <Button variant="ghost" size="icon" aria-label="Aide" className="h-9 w-9">
          <HelpCircle className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="rounded-md">3 nouvelles</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { t: "Nouveau dossier complet — N. Ondo", d: "Il y a 4 min", tag: "Candidature" },
              { t: "Paiement bourse Mai validé (84/87)", d: "Il y a 22 min", tag: "Paiement" },
              { t: "Justificatif manquant — INPTIC", d: "Il y a 1 h", tag: "Document" },
            ].map((n) => (
              <DropdownMenuItem key={n.t} className="flex flex-col items-start gap-1 py-2.5">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium">{n.t}</span>
                  <Badge variant="outline" className="rounded-md text-[10px]">{n.tag}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{n.d}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="justify-center text-sm text-primary">
              <Link to="/admin">Voir tout le centre de notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-0.5 pr-2 transition-colors hover:bg-accent">
              <Avatar className="h-8 w-8 ring-2 ring-background">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">AM</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline">Aïcha M.</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Préférences</DropdownMenuItem>
            <DropdownMenuItem>Journal d’audit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Se déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

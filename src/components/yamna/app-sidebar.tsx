import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GraduationCap, FolderKanban, Wallet, Files,
  MessagesSquare, BarChart3, ShieldCheck, Settings, Building2, ChevronsLeft,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { YamnaLogo } from "./logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const GROUPS = [
  {
    label: "Pilotage",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Reporting", url: "/admin/reporting", icon: BarChart3 },
    ],
  },
  {
    label: "Programme",
    items: [
      { title: "Candidatures", url: "/admin/candidatures", icon: FolderKanban, badge: "24" },
      { title: "Étudiants", url: "/admin/etudiants", icon: GraduationCap },
      { title: "Bourses", url: "/admin/bourses", icon: ShieldCheck },
      { title: "Paiements", url: "/admin/paiements", icon: Wallet, badge: "3" },
    ],
  },
  {
    label: "Collaboration",
    items: [
      { title: "Documents", url: "/admin/documents", icon: Files },
      { title: "Messagerie", url: "/admin/messagerie", icon: MessagesSquare, badge: "5" },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Utilisateurs", url: "/admin/utilisateurs", icon: Users },
      { title: "Établissements", url: "/admin/etablissements", icon: Building2 },
      { title: "Paramètres", url: "/admin/parametres", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) =>
    url === "/admin" ? pathname === "/admin" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b px-3 py-3">
        <div className="flex items-center justify-between">
          <YamnaLogo compact={collapsed} />
          {!collapsed && (
            <button
              onClick={toggleSidebar}
              className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Replier la sidebar"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        {GROUPS.map((g) => (
          <SidebarGroup key={g.label}>
            {!collapsed && (
              <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {g.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((it) => {
                  const active = isActive(it.url);
                  return (
                    <SidebarMenuItem key={it.url}>
                      <SidebarMenuButton asChild isActive={active} tooltip={it.title}>
                        <Link
                          to={it.url}
                          className={cn(
                            "group/link flex h-9 items-center gap-2.5 rounded-md px-2 text-sm font-medium",
                            active
                              ? "bg-primary/8 text-primary"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                        >
                          <it.icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                          {!collapsed && <span className="truncate">{it.title}</span>}
                          {!collapsed && it.badge && (
                            <Badge
                              variant="secondary"
                              className="ml-auto h-5 rounded-md border-0 bg-secondary px-1.5 text-[10px] font-semibold text-secondary-foreground"
                            >
                              {it.badge}
                            </Badge>
                          )}
                          {active && (
                            <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-primary" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-info ring-2 ring-background" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-foreground">Aïcha Mbadinga</p>
              <p className="truncate text-[11px] text-muted-foreground">Super Admin · COMILOG</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

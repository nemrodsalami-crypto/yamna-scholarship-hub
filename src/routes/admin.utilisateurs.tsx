import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Plus, Download, Users, ShieldCheck, UserCheck, Eye, MoreHorizontal,
  Edit, Ban, Mail, Key, Trash2, CheckCircle2, Clock, X,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UTILISATEURS, type UserRole, type UserStatut } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/utilisateurs")({
  head: () => ({ meta: [{ title: "Utilisateurs — YAM'NA" }] }),
  component: UtilisateursPage,
});

type StatutTab = "all" | UserStatut;

const ROLE_MAP: Record<UserRole, { label: string; cls: string }> = {
  super_admin: { label: "Super Admin", cls: "bg-destructive/10 text-destructive border-destructive/20" },
  gestionnaire: { label: "Gestionnaire", cls: "bg-primary/10 text-primary border-primary/20" },
  referent: { label: "Référent", cls: "bg-info/10 text-info border-info/20" },
  comite: { label: "Comité", cls: "bg-gold/15 text-gold-foreground border-gold/30" },
  lecture: { label: "Lecture seule", cls: "bg-muted text-muted-foreground border-border" },
};

function UtilisateursPage() {
  const [tab, setTab] = useState<StatutTab>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [showInvite, setShowInvite] = useState(false);

  const filtered = useMemo(() => UTILISATEURS.filter((u) => {
    const q = query.toLowerCase();
    const mQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.department.toLowerCase().includes(q);
    const mT = tab === "all" || u.statut === tab;
    return mQ && mT;
  }), [tab, query]);

  const counts = {
    all: UTILISATEURS.length,
    actif: UTILISATEURS.filter(u => u.statut === "actif").length,
    suspendu: UTILISATEURS.filter(u => u.statut === "suspendu").length,
    invite: UTILISATEURS.filter(u => u.statut === "invite").length,
  };

  function toggleSelect(id: string) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  return (
    <div>
      <PageHeader
        title="Utilisateurs & accès"
        description="Gestion des membres de l'équipe, rôles et permissions d'accès à la plateforme YAM'NA."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
            <Button size="sm" className="gap-1.5" onClick={() => setShowInvite(true)}><Plus className="h-3.5 w-3.5" /> Inviter un utilisateur</Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <RoleKpi icon={Users} label="Total utilisateurs" value={UTILISATEURS.length} sub="tous rôles confondus" tone="text-primary" bg="bg-primary/10" />
        <RoleKpi icon={ShieldCheck} label="Administrateurs" value={UTILISATEURS.filter(u => u.role === "super_admin").length} sub="accès complet" tone="text-destructive" bg="bg-destructive/10" />
        <RoleKpi icon={UserCheck} label="Actifs" value={counts.actif} sub="connectés ce mois" tone="text-success" bg="bg-success/12" />
        <RoleKpi icon={Eye} label="Lecture seule" value={UTILISATEURS.filter(u => u.role === "lecture").length} sub="accès observateur" tone="text-muted-foreground" bg="bg-secondary" />
      </div>

      {/* Toolbar */}
      <Card className="mb-4 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={tab} onValueChange={(v) => setTab(v as StatutTab)}>
            <TabsList className="h-9">
              {(["all", "actif", "suspendu", "invite"] as StatutTab[]).map(t => (
                <TabsTrigger key={t} value={t} className="h-7 gap-1.5 text-xs capitalize">
                  {{all:"Tous",actif:"Actifs",suspendu:"Suspendus",invite:"Invités"}[t]}
                  <Badge variant="secondary" className="h-4 rounded-md px-1 text-[10px]">{counts[t as keyof typeof counts]}</Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative min-w-[220px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nom, email, département…" className="h-9 pl-8" />
            </div>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border bg-primary/5 px-3 py-2">
            <span className="text-xs font-medium text-primary">{selected.length} sélectionné(s)</span>
            <div className="ml-auto flex gap-1.5">
              <Button size="sm" variant="ghost" className="h-7 text-xs"><Mail className="mr-1 h-3 w-3" />Contacter</Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive"><Ban className="mr-1 h-3 w-3" />Suspendre</Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setSelected([])}><X className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        )}
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 pl-4">
                <Checkbox
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onCheckedChange={(v) => setSelected(v ? filtered.map(u => u.id) : [])}
                />
              </TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Département</TableHead>
              <TableHead className="text-center">Dossiers</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="pr-4 w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id} className="cursor-pointer">
                <TableCell className="pl-4">
                  <Checkbox checked={selected.includes(u.id)} onCheckedChange={() => toggleSelect(u.id)} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", u.avatarTone)}>{u.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-[11px] text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <RoleBadge role={u.role} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.department}</TableCell>
                <TableCell className="text-center tabular-nums text-sm font-medium">{u.nbrDossiers > 0 ? u.nbrDossiers : "—"}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{u.lastLogin}</TableCell>
                <TableCell><UserStatutBadge s={u.statut} /></TableCell>
                <TableCell className="pr-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2"><Edit className="h-3.5 w-3.5" /> Modifier</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Key className="h-3.5 w-3.5" /> Réinitialiser mot de passe</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Mail className="h-3.5 w-3.5" /> Envoyer un message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {u.statut === "actif" ? (
                        <DropdownMenuItem className="gap-2 text-warning-foreground"><Ban className="h-3.5 w-3.5" /> Suspendre</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="gap-2 text-success"><CheckCircle2 className="h-3.5 w-3.5" /> Réactiver</DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Invite dialog */}
      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Inviter un utilisateur</DialogTitle>
            <DialogDescription>Un email d'invitation sera envoyé avec les instructions de connexion.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Prénom</Label>
                <Input placeholder="Jean" />
              </div>
              <div className="space-y-1.5">
                <Label>Nom</Label>
                <Input placeholder="Dupont" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email professionnel</Label>
              <Input type="email" placeholder="j.dupont@comilog.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Rôle</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Sélectionner un rôle…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gestionnaire">Gestionnaire</SelectItem>
                  <SelectItem value="referent">Référent pédagogique</SelectItem>
                  <SelectItem value="comite">Membre du comité</SelectItem>
                  <SelectItem value="lecture">Lecture seule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Département / Service</Label>
              <Input placeholder="ex. DRH · INPTIC" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvite(false)}>Annuler</Button>
            <Button onClick={() => setShowInvite(false)} className="gap-1.5"><Mail className="h-3.5 w-3.5" /> Envoyer l'invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const { label, cls } = ROLE_MAP[role];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{label}
    </span>
  );
}

function UserStatutBadge({ s }: { s: UserStatut }) {
  const map = {
    actif: { label: "Actif", cls: "bg-success/12 text-success border-success/25", icon: CheckCircle2 },
    suspendu: { label: "Suspendu", cls: "bg-warning/15 text-warning-foreground border-warning/30", icon: Ban },
    invite: { label: "Invité", cls: "bg-info/10 text-info border-info/20", icon: Clock },
  }[s];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium", map.cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{map.label}
    </span>
  );
}

function RoleKpi({ icon: Icon, label, value, sub, tone, bg }: { icon: typeof Users; label: string; value: number; sub: string; tone: string; bg: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", bg, tone)}><Icon className="h-5 w-5" /></div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className={cn("text-xl font-bold tabular-nums", tone)}>{value}</p>
        <p className="truncate text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </Card>
  );
}

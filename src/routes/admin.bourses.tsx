import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Plus, Download, Search, MoreHorizontal, Edit, Trash2, Copy,
  CheckCircle2, PauseCircle, XCircle, Users, Wallet, TrendingUp, Award,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BOURSES, fmtFcfa, type BourseStatut } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/bourses")({
  head: () => ({ meta: [{ title: "Bourses — YAM'NA" }] }),
  component: BoursesPage,
});

function BoursesPage() {
  const [tab, setTab] = useState<"all" | BourseStatut>("all");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);

  const filtered = useMemo(() => BOURSES.filter((b) => {
    const q = query.toLowerCase();
    const mQ = !q || b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q);
    const mT = tab === "all" || b.statut === tab;
    return mQ && mT;
  }), [tab, query]);

  const totalBudget = BOURSES.reduce((s, b) => s + b.budgetAnnuel, 0);
  const totalConsomme = BOURSES.reduce((s, b) => s + b.budgetConsomme, 0);
  const totalBoursiers = BOURSES.reduce((s, b) => s + b.nbrBoursiers, 0);
  const active = BOURSES.filter((b) => b.statut === "actif").length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Gestion des bourses"
        description="Programmes de bourses COMILOG — types, enveloppes budgétaires et critères d'attribution."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
            <Button size="sm" className="gap-1.5" onClick={() => setShowNew(true)}><Plus className="h-3.5 w-3.5" /> Nouveau programme</Button>
          </>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-4 divide-x rounded-xl border bg-card text-center">
        {[
          { icon: Wallet, label: "Budget alloué", value: fmtFcfa(totalBudget), cls: "text-primary" },
          { icon: TrendingUp, label: "Consommé", value: `${Math.round((totalConsomme / totalBudget) * 100)}%`, cls: "text-success" },
          { icon: Users, label: "Bénéficiaires", value: String(totalBoursiers), cls: "text-info" },
          { icon: Award, label: "Actifs", value: `${active}/${BOURSES.length}`, cls: "text-foreground" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="py-3">
            <p className={cn("text-xl font-bold tabular-nums", cls)}>{value}</p>
            <p className="text-[11px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <Card className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="h-9">
              <TabsTrigger value="all" className="h-7 text-xs">Tous <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">{BOURSES.length}</Badge></TabsTrigger>
              <TabsTrigger value="actif" className="h-7 text-xs">Actifs <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">{BOURSES.filter(b => b.statut === "actif").length}</Badge></TabsTrigger>
              <TabsTrigger value="suspendu" className="h-7 text-xs">Suspendus</TabsTrigger>
              <TabsTrigger value="cloture" className="h-7 text-xs">Clôturés</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="ml-auto relative min-w-[220px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="h-9 pl-8" />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5 w-28">Code</TableHead>
              <TableHead>Programme</TableHead>
              <TableHead className="text-center">Boursiers</TableHead>
              <TableHead className="text-right">Budget alloué</TableHead>
              <TableHead className="text-right">Consommé</TableHead>
              <TableHead>Avancement</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="pr-4 w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => {
              const pct = b.budgetAnnuel > 0 ? Math.round((b.budgetConsomme / b.budgetAnnuel) * 100) : 0;
              const barCls = pct >= 90 ? "bg-destructive" : pct >= 75 ? "bg-warning" : "bg-success";
              return (
                <TableRow key={b.id} className={cn(b.statut === "cloture" && "opacity-60")}>
                  <TableCell className="pl-5 font-mono text-xs text-muted-foreground">{b.code}</TableCell>
                  <TableCell>
                    <p className="text-sm font-semibold">{b.name}</p>
                    <p className="max-w-xs truncate text-[11px] text-muted-foreground">{b.description}</p>
                    <div className="mt-1 flex gap-1">
                      {b.criteres.slice(0, 2).map((c) => (
                        <span key={c} className="inline-flex items-center gap-0.5 rounded bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground">
                          <CheckCircle2 className="h-2.5 w-2.5 text-success" />{c}
                        </span>
                      ))}
                      {b.criteres.length > 2 && <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">+{b.criteres.length - 2}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <p className="text-sm font-semibold tabular-nums">{b.nbrBoursiers}</p>
                    <p className="text-[11px] text-muted-foreground">/{b.nbrMax} places</p>
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">{fmtFcfa(b.budgetAnnuel)}</TableCell>
                  <TableCell className="text-right text-sm font-semibold tabular-nums">{fmtFcfa(b.budgetConsomme)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[80px]">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div className={cn("h-full rounded-full", barCls)} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[11px] tabular-nums text-muted-foreground">{pct}%</span>
                    </div>
                  </TableCell>
                  <TableCell><StatutBadge s={b.statut} /></TableCell>
                  <TableCell className="pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2"><Edit className="h-3.5 w-3.5" /> Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Copy className="h-3.5 w-3.5" /> Dupliquer</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Archiver</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">Aucun programme ne correspond à vos critères.</p>
        )}
        <div className="flex items-center justify-between border-t bg-secondary/20 px-5 py-2.5">
          <p className="text-xs text-muted-foreground">{filtered.length} programme{filtered.length > 1 ? "s" : ""}</p>
          <p className="text-xs font-medium tabular-nums text-muted-foreground">Budget total : {fmtFcfa(totalBudget)}</p>
        </div>
      </Card>

      {/* Dialog nouveau programme */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nouveau programme de bourse</DialogTitle>
            <DialogDescription>Définissez les paramètres du nouveau type de bourse COMILOG.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Code interne</Label>
                <Input placeholder="ex. NOUV-2025" />
              </div>
              <div className="space-y-1.5">
                <Label>Statut initial</Label>
                <Select defaultValue="actif">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="suspendu">Suspendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Nom du programme</Label>
              <Input placeholder="ex. Bourse innovation numérique" />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={2} placeholder="Décrivez les objectifs de ce programme…" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Budget annuel (FCFA)</Label>
                <Input type="number" placeholder="100 000 000" />
              </div>
              <div className="space-y-1.5">
                <Label>Nbre max de boursiers</Label>
                <Input type="number" placeholder="20" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Filières éligibles</Label>
              <Input placeholder="ex. Toutes, ou Mines & Géologie" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)}>Annuler</Button>
            <Button onClick={() => setShowNew(false)}>Créer le programme</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatutBadge({ s }: { s: BourseStatut }) {
  const map = {
    actif: { label: "Actif", cls: "bg-success/12 text-success border-success/25", icon: CheckCircle2 },
    suspendu: { label: "Suspendu", cls: "bg-warning/15 text-warning-foreground border-warning/30", icon: PauseCircle },
    cloture: { label: "Clôturé", cls: "bg-muted text-muted-foreground border-border", icon: XCircle },
  }[s];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium", map.cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{map.label}
    </span>
  );
}

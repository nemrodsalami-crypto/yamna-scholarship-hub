import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Filter, Plus, Download, Building2, Globe, GraduationCap, Wallet,
  MoreHorizontal, MapPin, Mail, LayoutGrid, List,
  Edit, ExternalLink, Trash2, CheckCircle2, PauseCircle,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ETABLISSEMENTS, fmtFcfa, type EtabType } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/etablissements")({
  head: () => ({ meta: [{ title: "Établissements — YAM'NA" }] }),
  component: EtablissementsPage,
});

function EtablissementsPage() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [view, setView] = useState<"grid" | "table">("table");
  const [showNew, setShowNew] = useState(false);

  const countries = Array.from(new Set(ETABLISSEMENTS.map(e => e.country)));

  const filtered = useMemo(() => ETABLISSEMENTS.filter((e) => {
    const q = query.toLowerCase();
    const mQ = !q || e.name.toLowerCase().includes(q) || e.short.toLowerCase().includes(q) || e.city.toLowerCase().includes(q);
    const mC = country === "all" || e.country === country;
    return mQ && mC;
  }), [query, country]);

  const totalBoursiers = ETABLISSEMENTS.reduce((s, e) => s + e.nbrBoursiers, 0);
  const totalMontant = ETABLISSEMENTS.reduce((s, e) => s + e.montantTotal, 0);
  const active = ETABLISSEMENTS.filter(e => e.statut === "actif").length;
  const pays = new Set(ETABLISSEMENTS.map(e => e.country)).size;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Établissements partenaires"
        description="Annuaire des établissements d'enseignement supérieur accueillant des boursiers COMILOG."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
            <Button size="sm" className="gap-1.5" onClick={() => setShowNew(true)}><Plus className="h-3.5 w-3.5" /> Ajouter</Button>
          </>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-4 divide-x rounded-xl border bg-card text-center">
        {[
          { icon: Building2, label: "Actifs", value: `${active}/${ETABLISSEMENTS.length}`, cls: "text-primary" },
          { icon: Globe, label: "Pays", value: String(pays), cls: "text-info" },
          { icon: GraduationCap, label: "Boursiers", value: String(totalBoursiers), cls: "text-success" },
          { icon: Wallet, label: "Engagé", value: fmtFcfa(totalMontant), cls: "text-foreground" },
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
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nom, sigle, ville…" className="h-9 pl-8" />
          </div>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="h-9 w-[130px]"><SelectValue placeholder="Pays" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous pays</SelectItem>
              {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" /> Filtres</Button>
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
            <TabsList className="h-9">
              <TabsTrigger value="grid" className="h-7 px-2"><LayoutGrid className="h-3.5 w-3.5" /></TabsTrigger>
              <TabsTrigger value="table" className="h-7 px-2"><List className="h-3.5 w-3.5" /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Card>

      {view === "grid" ? (
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => <EtabCard key={e.id} e={e} />)}
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Établissement</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-center">Boursiers</TableHead>
                <TableHead className="text-right">Montant engagé</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="pr-4 w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id} className="cursor-pointer">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border bg-secondary text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{e.short}</p>
                        <p className="max-w-[200px] truncate text-[11px] text-muted-foreground">{e.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><TypeBadge t={e.type} /></TableCell>
                  <TableCell>
                    <p className="flex items-center gap-1 text-sm"><MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />{e.city}</p>
                    <p className="ml-5 text-[11px] text-muted-foreground">{e.country}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{e.contact}</p>
                    <p className="flex items-center gap-1 text-[11px] text-muted-foreground"><Mail className="h-3 w-3" /><span className="truncate max-w-[140px]">{e.email}</span></p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p className="text-sm font-semibold tabular-nums">{e.nbrBoursiers}</p>
                    <p className="text-[11px] text-muted-foreground">{e.nbrCandidatures} candidats</p>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium tabular-nums">{fmtFcfa(e.montantTotal)}</TableCell>
                  <TableCell><EtabStatutBadge s={e.statut} /></TableCell>
                  <TableCell className="pr-4"><EtabMenu /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">Aucun établissement trouvé.</p>
          )}
          <div className="flex items-center justify-between border-t bg-secondary/20 px-5 py-2.5">
            <p className="text-xs text-muted-foreground">{filtered.length} établissement{filtered.length > 1 ? "s" : ""}</p>
          </div>
        </Card>
      )}

      {/* Dialog ajout */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter un établissement</DialogTitle>
            <DialogDescription>Référencez un nouvel établissement partenaire dans l'annuaire YAM'NA.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5 col-span-2">
                <Label>Nom officiel</Label>
                <Input placeholder="Université des Sciences…" />
              </div>
              <div className="space-y-1.5">
                <Label>Sigle</Label>
                <Input placeholder="USTM" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Type…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="universite">Université</SelectItem>
                    <SelectItem value="grande_ecole">Grande école</SelectItem>
                    <SelectItem value="ecole_superieure">École supérieure</SelectItem>
                    <SelectItem value="iut">IUT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Pays</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Pays…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gabon">Gabon</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Belgique">Belgique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Ville</Label>
                <Input placeholder="Libreville" />
              </div>
              <div className="space-y-1.5">
                <Label>Email contact</Label>
                <Input type="email" placeholder="contact@etab.ga" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Personne de contact</Label>
              <Input placeholder="Pr. Nom Prénom — Directeur Pédagogique" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)}>Annuler</Button>
            <Button onClick={() => setShowNew(false)}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EtabCard({ e }: { e: (typeof ETABLISSEMENTS)[0] }) {
  return (
    <Card className="group flex items-center gap-3 px-4 py-3 transition hover:border-primary/40 hover:shadow-sm">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border bg-secondary text-muted-foreground">
        <Building2 className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{e.short}</p>
          <TypeBadge t={e.type} />
          <EtabStatutBadge s={e.statut} />
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.city}, {e.country}</span>
          <span className="text-border">·</span>
          <span>{e.nbrBoursiers} boursiers</span>
          <span className="text-border">·</span>
          <span>{fmtFcfa(e.montantTotal)}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100">
          Détail <ExternalLink className="h-3 w-3" />
        </Button>
        <EtabMenu />
      </div>
    </Card>
  );
}

function EtabMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2"><Edit className="h-3.5 w-3.5" /> Modifier</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><GraduationCap className="h-3.5 w-3.5" /> Voir les boursiers</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TypeBadge({ t }: { t: EtabType }) {
  const map: Record<EtabType, string> = {
    universite: "Université",
    grande_ecole: "Grande école",
    ecole_superieure: "École sup.",
    iut: "IUT",
  };
  return <Badge variant="secondary" className="rounded-md text-[10px]">{map[t]}</Badge>;
}

function EtabStatutBadge({ s }: { s: string }) {
  return s === "actif" ? (
    <span className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success/12 px-2 py-0.5 text-[10px] font-medium text-success">
      <CheckCircle2 className="h-2.5 w-2.5" /> Actif
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/15 px-2 py-0.5 text-[10px] font-medium text-warning-foreground">
      <PauseCircle className="h-2.5 w-2.5" /> Suspendu
    </span>
  );
}

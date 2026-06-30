import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Filter, Download, Upload, GraduationCap, MapPin,
  MoreHorizontal, ArrowUpDown, LayoutGrid, List,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ETUDIANTS, fmtFcfa, type Etudiant, type EtudiantStatut } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/etudiants")({
  head: () => ({ meta: [{ title: "Étudiants — YAM'NA" }] }),
  component: EtudiantsPage,
});

const STATUS_TABS: { id: "all" | EtudiantStatut; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "boursier", label: "Boursiers" },
  { id: "candidat", label: "Candidats" },
  { id: "alumni", label: "Alumni" },
  { id: "suspendu", label: "Suspendus" },
];

function EtudiantsPage() {
  const [view, setView] = useState<"grid" | "table">("table");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | EtudiantStatut>("all");
  const [country, setCountry] = useState("all");
  const [niveau, setNiveau] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => ETUDIANTS.filter((e) => {
    const q = query.trim().toLowerCase();
    const mQ = !q || [e.name, e.matricule, e.school, e.filiere].some((x) => x.toLowerCase().includes(q));
    const mT = tab === "all" || e.status === tab;
    const mC = country === "all" || e.country === country;
    const mN = niveau === "all" || e.niveau === niveau;
    return mQ && mT && mC && mN;
  }), [query, tab, country, niveau]);

  const counts = useMemo(() => ({
    all: ETUDIANTS.length,
    boursier: ETUDIANTS.filter((e) => e.status === "boursier").length,
    candidat: ETUDIANTS.filter((e) => e.status === "candidat").length,
    alumni: ETUDIANTS.filter((e) => e.status === "alumni").length,
    suspendu: ETUDIANTS.filter((e) => e.status === "suspendu").length,
  }), []);

  const countries = Array.from(new Set(ETUDIANTS.map((e) => e.country)));
  const niveaux = Array.from(new Set(ETUDIANTS.map((e) => e.niveau)));

  return (
    <div className="space-y-4">
      <PageHeader
        title="Étudiants"
        description="Annuaire unifié des bénéficiaires, candidats et alumni du programme YAM'NA."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" /> Importer CSV</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
          </>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-4 divide-x rounded-xl border bg-card text-center">
        {[
          { label: "Boursiers actifs", value: counts.boursier, cls: "text-primary" },
          { label: "Candidats", value: counts.candidat, cls: "text-info" },
          { label: "Alumni", value: counts.alumni, cls: "text-success" },
          { label: "Suspendus", value: counts.suspendu, cls: "text-destructive" },
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
              {STATUS_TABS.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="h-7 gap-1.5 text-xs">
                  {t.label}
                  <Badge variant="secondary" className="h-4 rounded-md px-1 text-[10px]">{counts[t.id]}</Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="ml-auto" />
          <div className="relative min-w-[220px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nom, matricule, école…" className="h-9 pl-8" />
          </div>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="h-9 w-[130px]"><SelectValue placeholder="Pays" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous pays</SelectItem>
              {countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={niveau} onValueChange={setNiveau}>
            <SelectTrigger className="h-9 w-[130px]"><SelectValue placeholder="Niveau" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous niveaux</SelectItem>
              {niveaux.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" /> Filtres</Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><ArrowUpDown className="h-3.5 w-3.5" /> Trier</Button>
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
            <TabsList className="h-9">
              <TabsTrigger value="grid" className="h-7 px-2 text-xs"><LayoutGrid className="h-3.5 w-3.5" /></TabsTrigger>
              <TabsTrigger value="table" className="h-7 px-2 text-xs"><List className="h-3.5 w-3.5" /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Card>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((e) => <EtudiantCard key={e.id} e={e} />)}
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10 pl-4">
                  <Checkbox
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onCheckedChange={(v) => setSelected(v ? filtered.map((e) => e.id) : [])}
                  />
                </TableHead>
                <TableHead>Étudiant</TableHead>
                <TableHead>Établissement</TableHead>
                <TableHead>Filière / Niveau</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Bourse annuelle</TableHead>
                <TableHead>Avancement</TableHead>
                <TableHead className="pr-4 w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => {
                const pct = e.versementsTotal > 0 ? Math.round((e.versementsRecus / e.versementsTotal) * 100) : 0;
                return (
                  <TableRow key={e.id} className="cursor-pointer">
                    <TableCell className="pl-4">
                      <Checkbox checked={selected.includes(e.id)} onCheckedChange={(v) => setSelected((s) => v ? [...s, e.id] : s.filter((x) => x !== e.id))} />
                    </TableCell>
                    <TableCell>
                      <Link to="/admin/etudiants/$id" params={{ id: e.id }} className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7"><AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", e.avatarTone)}>{e.initials}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-sm font-medium hover:text-primary">{e.name}</p>
                          <p className="font-mono text-[11px] text-muted-foreground">{e.matricule}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{e.school}</p>
                      <p className="flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" />{e.city}, {e.country}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{e.filiere}</p>
                      <p className="text-[11px] text-muted-foreground">{e.niveau}</p>
                    </TableCell>
                    <TableCell><StatutPill s={e.status} /></TableCell>
                    <TableCell className="text-right text-sm font-medium tabular-nums">{e.montantAnnuel ? fmtFcfa(e.montantAnnuel) : "—"}</TableCell>
                    <TableCell>
                      {e.status === "boursier" ? (
                        <div className="flex items-center gap-2 min-w-[80px]">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                            <div className="h-full bg-success rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[11px] tabular-nums text-muted-foreground">{pct}%</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">{e.documents}/{e.documentsRequired} docs</span>
                      )}
                    </TableCell>
                    <TableCell className="pr-4">
                      <button className="rounded-md p-1 text-muted-foreground hover:bg-accent"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t bg-secondary/20 px-4 py-2.5">
            <p className="text-xs text-muted-foreground">{filtered.length} étudiant{filtered.length > 1 ? "s" : ""}</p>
          </div>
        </Card>
      )}

      {filtered.length === 0 && (
        <Card className="grid place-items-center py-16 text-sm text-muted-foreground">
          Aucun étudiant ne correspond à vos critères.
        </Card>
      )}
    </div>
  );
}

function EtudiantCard({ e }: { e: Etudiant }) {
  const pct = e.status === "boursier"
    ? (e.versementsTotal > 0 ? Math.round((e.versementsRecus / e.versementsTotal) * 100) : 0)
    : Math.round((e.documents / e.documentsRequired) * 100);

  return (
    <Link
      to="/admin/etudiants/$id"
      params={{ id: e.id }}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:border-primary/40 hover:shadow-sm"
    >
      <div className="flex min-w-0 items-center gap-3 px-3.5 pt-3 pb-2">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className={cn("bg-gradient-to-br text-xs font-bold text-white", e.avatarTone)}>{e.initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">{e.name}</p>
            <StatutPill s={e.status} />
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <GraduationCap className="h-3 w-3 shrink-0" />
            <span className="truncate">{e.school}</span>
            <span className="text-border shrink-0">·</span>
            <span className="shrink-0">{e.niveau}</span>
            <span className="text-border shrink-0">·</span>
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{e.city}</span>
          </div>
        </div>
        <button
          className="shrink-0 rounded-md p-1 text-muted-foreground opacity-0 transition hover:bg-accent group-hover:opacity-100"
          onClick={(ev) => ev.preventDefault()}
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="px-3.5 pb-2.5">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
          <span className="font-mono">{e.matricule}</span>
          <span className="tabular-nums">
            {e.status === "boursier"
              ? `${e.versementsRecus}/${e.versementsTotal} versements`
              : `${e.documents}/${e.documentsRequired} docs`
            } · {pct}%
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-secondary">
          <div className={cn("h-full rounded-full", e.status === "boursier" ? "bg-success" : "bg-primary")} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </Link>
  );
}

export function StatutPill({ s }: { s: EtudiantStatut }) {
  const map: Record<EtudiantStatut, { label: string; cls: string }> = {
    boursier: { label: "Boursier", cls: "bg-success/12 text-success border-success/25" },
    candidat: { label: "Candidat", cls: "bg-info/10 text-info border-info/20" },
    alumni: { label: "Alumni", cls: "bg-primary/10 text-primary border-primary/20" },
    suspendu: { label: "Suspendu", cls: "bg-warning/15 text-warning-foreground border-warning/30" },
  };
  const m = map[s];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium", m.cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {m.label}
    </span>
  );
}

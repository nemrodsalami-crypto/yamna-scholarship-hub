import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Filter, Plus, Download, Upload, GraduationCap, MapPin,
  Mail, Phone, MoreHorizontal, ArrowUpDown, LayoutGrid, List,
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
  head: () => ({ meta: [{ title: "Étudiants — YAM’NA" }] }),
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
  const [view, setView] = useState<"grid" | "table">("grid");
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
    <div>
      <PageHeader
        title="Étudiants"
        description="Annuaire unifié des bénéficiaires, candidats et alumni du programme YAM’NA."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" /> Importer CSV</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Nouvel étudiant</Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniKpi label="Étudiants actifs" value={String(counts.boursier)} sub="boursiers en cours" tone="text-primary" />
        <MiniKpi label="Candidats" value={String(counts.candidat)} sub="à instruire" tone="text-info" />
        <MiniKpi label="Alumni" value={String(counts.alumni)} sub="diplômés" tone="text-success" />
        <MiniKpi label="Suspendus" value={String(counts.suspendu)} sub="à régulariser" tone="text-destructive" />
      </div>

      {/* Tabs + toolbar */}
      <Card className="mb-4 p-3">
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
            <SelectTrigger className="h-9 w-[140px]"><SelectValue placeholder="Pays" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous pays</SelectItem>
              {countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={niveau} onValueChange={setNiveau}>
            <SelectTrigger className="h-9 w-[140px]"><SelectValue placeholder="Niveau" /></SelectTrigger>
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
                <TableHead>Matricule</TableHead>
                <TableHead>Étudiant</TableHead>
                <TableHead>Établissement</TableHead>
                <TableHead>Filière</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Bourse</TableHead>
                <TableHead>Réf.</TableHead>
                <TableHead className="pr-4">Activité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="pl-4">
                    <Checkbox checked={selected.includes(e.id)} onCheckedChange={(v) => setSelected((s) => v ? [...s, e.id] : s.filter((x) => x !== e.id))} />
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{e.matricule}</TableCell>
                  <TableCell>
                    <Link to="/admin/etudiants/$id" params={{ id: e.id }} className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7"><AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", e.avatarTone)}>{e.initials}</AvatarFallback></Avatar>
                      <div>
                        <p className="text-sm font-medium hover:text-primary">{e.name}</p>
                        <p className="text-[11px] text-muted-foreground">{e.email}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{e.school} <span className="text-muted-foreground">· {e.city}</span></TableCell>
                  <TableCell className="text-sm">{e.filiere}</TableCell>
                  <TableCell className="text-sm">{e.niveau}</TableCell>
                  <TableCell><StatutPill s={e.status} /></TableCell>
                  <TableCell className="text-right text-sm font-medium tabular-nums">{e.montantAnnuel ? fmtFcfa(e.montantAnnuel) : "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{e.referent}</TableCell>
                  <TableCell className="pr-4 text-xs text-muted-foreground">{e.lastActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

function MiniKpi({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: string }) {
  return (
    <Card className="p-4">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn("mt-1.5 text-2xl font-bold tabular-nums", tone)}>{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </Card>
  );
}

function EtudiantCard({ e }: { e: Etudiant }) {
  const progress = e.versementsTotal > 0 ? Math.round((e.versementsRecus / e.versementsTotal) * 100) : 0;
  const docProgress = Math.round((e.documents / e.documentsRequired) * 100);
  return (
    <Link
      to="/admin/etudiants/$id"
      params={{ id: e.id }}
      className="group relative block overflow-hidden rounded-xl border bg-card transition hover:shadow-md hover:border-primary/40"
    >
      <div className={cn("h-16 bg-gradient-to-br", e.avatarTone)} />
      <button className="absolute right-2 top-2 rounded-md bg-background/90 p-1 text-muted-foreground opacity-0 transition group-hover:opacity-100">
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>
      <div className="px-4 pb-4">
        <Avatar className="-mt-8 h-14 w-14 ring-4 ring-card">
          <AvatarFallback className={cn("bg-gradient-to-br text-sm font-bold text-white", e.avatarTone)}>{e.initials}</AvatarFallback>
        </Avatar>
        <div className="mt-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-tight">{e.name}</h3>
            <p className="font-mono text-[10px] text-muted-foreground">{e.matricule}</p>
          </div>
          <StatutPill s={e.status} />
        </div>
        <div className="mt-3 space-y-1 text-[12px] text-muted-foreground">
          <p className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> {e.school} · <span className="text-foreground">{e.niveau}</span></p>
          <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.city}, {e.country}</p>
          <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> <span className="truncate">{e.email}</span></p>
        </div>
        {e.status === "boursier" && (
          <div className="mt-3 space-y-2 rounded-lg bg-secondary/50 p-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">{e.bourseType}</span>
              <span className="font-semibold tabular-nums">{fmtFcfa(e.montantAnnuel ?? 0)}</span>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Versements {e.versementsRecus}/{e.versementsTotal}</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-background">
                <div className="h-full bg-success" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        )}
        {e.status !== "boursier" && (
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Documents</span>
              <span className="font-semibold tabular-nums text-foreground">{e.documents}/{e.documentsRequired}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-primary" style={{ width: `${docProgress}%` }} />
            </div>
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-1">
          {e.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{t}</span>
          ))}
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
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", m.cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {m.label}
    </span>
  );
}

// silence unused warnings
void Phone;

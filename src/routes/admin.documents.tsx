import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Upload, Download, Filter, LayoutGrid, List, FileText, FileSpreadsheet,
  CheckCircle2, Clock, AlertCircle, MoreHorizontal, Eye, Trash2, Share2, FolderOpen,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DOCS_GED, type DocCategory, type DocStatut } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/documents")({
  head: () => ({ meta: [{ title: "Documents — YAM'NA" }] }),
  component: DocumentsPage,
});

type DocTab = "all" | DocCategory;

const CAT_TABS: { id: DocTab; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "scolarite", label: "Scolarité" },
  { id: "identite", label: "Identité" },
  { id: "financier", label: "Financier" },
  { id: "academique", label: "Académique" },
  { id: "rapport", label: "Rapports" },
];

function DocumentsPage() {
  const [cat, setCat] = useState<DocTab>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");

  const filtered = useMemo(() => DOCS_GED.filter((d) => {
    const q = query.toLowerCase();
    const mQ = !q || d.name.toLowerCase().includes(q) || d.owner.toLowerCase().includes(q);
    const mC = cat === "all" || d.category === cat;
    return mQ && mC;
  }), [cat, query]);

  const counts = {
    all: DOCS_GED.length,
    scolarite: DOCS_GED.filter(d => d.category === "scolarite").length,
    identite: DOCS_GED.filter(d => d.category === "identite").length,
    financier: DOCS_GED.filter(d => d.category === "financier").length,
    academique: DOCS_GED.filter(d => d.category === "academique").length,
    rapport: DOCS_GED.filter(d => d.category === "rapport").length,
  };

  const valides = DOCS_GED.filter(d => d.statut === "valide").length;
  const enAttente = DOCS_GED.filter(d => d.statut === "en_attente").length;
  const rejetes = DOCS_GED.filter(d => d.statut === "rejete").length;

  return (
    <div>
      <PageHeader
        title="Gestion documentaire"
        description="Base documentaire centralisée — dossiers étudiants, rapports et pièces administratives."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
            <Button size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" /> Téléverser</Button>
          </>
        }
      />

      {/* Stats row */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <StatDoc icon={CheckCircle2} label="Documents validés" value={valides} tone="text-success" bg="bg-success/12" />
        <StatDoc icon={Clock} label="En attente de validation" value={enAttente} tone="text-gold-foreground" bg="bg-gold/15" />
        <StatDoc icon={AlertCircle} label="Rejetés / à corriger" value={rejetes} tone="text-destructive" bg="bg-destructive/10" />
      </div>

      {/* Upload zone */}
      <div className="mb-4 rounded-xl border-2 border-dashed bg-secondary/20 p-6 text-center">
        <div className="grid place-items-center gap-2">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Upload className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">Glisser-déposer vos fichiers ici</p>
            <p className="text-xs text-muted-foreground">PDF, Word, Excel — jusqu'à 50 Mo par fichier</p>
          </div>
          <Button size="sm" variant="outline" className="mt-1 gap-1.5"><FolderOpen className="h-3.5 w-3.5" /> Parcourir</Button>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="mb-4 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={cat} onValueChange={(v) => setCat(v as DocTab)}>
            <TabsList className="h-9 flex-wrap">
              {CAT_TABS.map(t => (
                <TabsTrigger key={t.id} value={t.id} className="h-7 text-xs">
                  {t.label}
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">{counts[t.id as keyof typeof counts]}</Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative min-w-[200px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="h-9 pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" /> Filtres</Button>
            <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
              <TabsList className="h-9">
                <TabsTrigger value="grid" className="h-7 px-2"><LayoutGrid className="h-3.5 w-3.5" /></TabsTrigger>
                <TabsTrigger value="table" className="h-7 px-2"><List className="h-3.5 w-3.5" /></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </Card>

      {view === "grid" ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((d) => <DocCard key={d.id} d={d} />)}
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Document</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Propriétaire</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="pr-4 w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id} className="cursor-pointer">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2.5">
                      <DocIcon ext={d.ext} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium max-w-[240px]">{d.name}</p>
                        {d.etudiant && <p className="text-[11px] text-muted-foreground">{d.etudiant}</p>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><CatBadge cat={d.category} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6"><AvatarFallback className={cn("bg-gradient-to-br text-[9px] font-bold text-white", d.ownerTone)}>{d.ownerInitials}</AvatarFallback></Avatar>
                      <span className="text-sm text-muted-foreground">{d.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.size}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.date}</TableCell>
                  <TableCell><DocStatutBadge s={d.statut} /></TableCell>
                  <TableCell className="pr-4">
                    <DocMenu />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {filtered.length === 0 && (
        <Card className="grid place-items-center py-12 text-sm text-muted-foreground">Aucun document trouvé.</Card>
      )}
    </div>
  );
}

function DocCard({ d }: { d: (typeof DOCS_GED)[0] }) {
  return (
    <Card className="group relative flex flex-col gap-3 p-4 transition hover:shadow-md hover:border-primary/30">
      <div className="flex items-start justify-between gap-2">
        <DocIcon ext={d.ext} large />
        <DocMenu />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight">{d.name}</p>
        {d.etudiant && <p className="mt-0.5 text-[11px] text-muted-foreground">Étudiant · {d.etudiant}</p>}
      </div>
      <div className="flex flex-wrap gap-1">
        {d.tags.slice(0, 2).map(t => (
          <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{t}</span>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-2.5">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6"><AvatarFallback className={cn("bg-gradient-to-br text-[9px] font-bold text-white", d.ownerTone)}>{d.ownerInitials}</AvatarFallback></Avatar>
          <div>
            <p className="text-[11px] font-medium leading-tight">{d.owner}</p>
            <p className="text-[10px] text-muted-foreground">{d.size} · {d.date}</p>
          </div>
        </div>
        <DocStatutBadge s={d.statut} />
      </div>
    </Card>
  );
}

function DocIcon({ ext, large }: { ext: string; large?: boolean }) {
  const sz = large ? "h-12 w-12" : "h-9 w-9";
  const ic = large ? "h-6 w-6" : "h-4 w-4";
  const isPdf = ext === "PDF";
  return (
    <div className={cn("grid shrink-0 place-items-center rounded-lg", sz, isPdf ? "bg-destructive/10 text-destructive" : "bg-success/12 text-success")}>
      {isPdf ? <FileText className={ic} /> : <FileSpreadsheet className={ic} />}
    </div>
  );
}

function DocMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2"><Eye className="h-3.5 w-3.5" /> Aperçu</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><Download className="h-3.5 w-3.5" /> Télécharger</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><Share2 className="h-3.5 w-3.5" /> Partager</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CatBadge({ cat }: { cat: DocCategory }) {
  const map: Record<DocCategory, string> = {
    scolarite: "bg-primary/10 text-primary",
    identite: "bg-info/10 text-info",
    financier: "bg-success/12 text-success",
    academique: "bg-gold/15 text-gold-foreground",
    rapport: "bg-secondary text-muted-foreground",
  };
  const labels: Record<DocCategory, string> = {
    scolarite: "Scolarité", identite: "Identité", financier: "Financier", academique: "Académique", rapport: "Rapport",
  };
  return <span className={cn("inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold", map[cat])}>{labels[cat]}</span>;
}

function DocStatutBadge({ s }: { s: DocStatut }) {
  const map = {
    valide: { label: "Validé", cls: "bg-success/12 text-success border-success/25", icon: CheckCircle2 },
    en_attente: { label: "En attente", cls: "bg-gold/15 text-gold-foreground border-gold/30", icon: Clock },
    rejete: { label: "Rejeté", cls: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle },
  }[s];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium", map.cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{map.label}
    </span>
  );
}

function StatDoc({ icon: Icon, label, value, tone, bg }: { icon: typeof CheckCircle2; label: string; value: number; tone: string; bg: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", bg, tone)}><Icon className="h-4 w-4" /></div>
      <div>
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <p className={cn("text-xl font-bold tabular-nums", tone)}>{value}</p>
      </div>
    </Card>
  );
}

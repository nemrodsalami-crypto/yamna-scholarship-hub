import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Download, GraduationCap, TrendingUp, Wallet, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/yamna/page-header";
import { ETUDIANTS, fmtFcfa } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ecole/boursiers")({
  head: () => ({ meta: [{ title: "Mes boursiers — YAM'NA École" }] }),
  component: EcoleBoursiers,
});

const ALL = ETUDIANTS.filter((e) => e.school === "INPTIC");

function EcoleBoursiers() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => ALL.filter((e) => {
    const q = query.toLowerCase();
    return !q || e.name.toLowerCase().includes(q) || e.filiere.toLowerCase().includes(q) || e.niveau.toLowerCase().includes(q);
  }), [query]);

  const actifs = ALL.filter(e => e.status === "boursier").length;
  const gpaSum = ALL.filter(e => e.status === "boursier").reduce((s, e) => s + e.gpa, 0);
  const gpaMoy = actifs > 0 ? (gpaSum / actifs).toFixed(1) : "—";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mes boursiers"
        description="Liste des étudiants COMILOG inscrits à l'INPTIC — session 2024-2025."
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Exporter la liste
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="flex items-center gap-3 p-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-info/10 text-info"><GraduationCap className="h-5 w-5" /></div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Boursiers actifs</p>
            <p className="text-xl font-bold text-info tabular-nums">{actifs}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/12 text-success"><TrendingUp className="h-5 w-5" /></div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Moyenne GPA</p>
            <p className="text-xl font-bold text-success tabular-nums">{gpaMoy}/20</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Wallet className="h-5 w-5" /></div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Montant total versé</p>
            <p className="text-xl font-bold text-primary tabular-nums">{fmtFcfa(24_500_000)}</p>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-3">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nom, filière, niveau…" className="h-9 pl-8" />
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Étudiant</TableHead>
              <TableHead>Filière / Niveau</TableHead>
              <TableHead className="text-center">GPA</TableHead>
              <TableHead>Type de bourse</TableHead>
              <TableHead>Versements</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e) => (
              <TableRow key={e.id} className="cursor-pointer">
                <TableCell className="pl-6">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-bold text-white", e.avatarTone)}>{e.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{e.name}</p>
                      <p className="text-[11px] text-muted-foreground">{e.matricule}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{e.filiere}</p>
                  <p className="text-[11px] text-muted-foreground">{e.niveau}</p>
                </TableCell>
                <TableCell className="text-center">
                  <span className={cn("text-sm font-bold tabular-nums", e.gpa >= 16 ? "text-success" : e.gpa >= 12 ? "text-foreground" : "text-warning-foreground")}>
                    {e.gpa}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px]">{e.bourseType ?? "—"}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={(e.versementsRecus / Math.max(e.versementsTotal, 1)) * 100} className="h-1.5 w-16" />
                    <span className="text-[11px] tabular-nums text-muted-foreground">{e.versementsRecus}/{e.versementsTotal}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {e.documents < (e.documentsRequired ?? 7) ? (
                    <span className="flex items-center gap-1 text-[11px] text-warning-foreground">
                      <AlertTriangle className="h-3 w-3" />{e.documents}/{e.documentsRequired}
                    </span>
                  ) : (
                    <span className="text-[11px] text-success">{e.documents}/{e.documentsRequired} ✓</span>
                  )}
                </TableCell>
                <TableCell>
                  <EtuStatut s={e.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">Aucun étudiant trouvé.</p>
        )}
      </Card>
    </div>
  );
}

function EtuStatut({ s }: { s: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    boursier: { label: "Boursier actif", cls: "bg-success/12 text-success border-success/25" },
    candidat: { label: "Candidat", cls: "bg-info/10 text-info border-info/20" },
    suspendu: { label: "Suspendu", cls: "bg-warning/15 text-warning-foreground border-warning/30" },
    alumni: { label: "Diplômé", cls: "bg-secondary text-muted-foreground border-border" },
  };
  const cfg = map[s] ?? map.candidat;
  return <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold", cfg.cls)}>{cfg.label}</span>;
}

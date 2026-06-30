import { createFileRoute } from "@tanstack/react-router";
import { Wallet, CheckCircle2, Clock, Download, CreditCard, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/yamna/page-header";
import { ETUDIANTS, fmtFcfa } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/etudiant/paiements")({
  head: () => ({ meta: [{ title: "Mes paiements — YAM'NA" }] }),
  component: EtudiantPaiementsPage,
});

const ME = ETUDIANTS[0];
const MONTANT_TRIM = Math.round((ME.montantAnnuel ?? 0) / 4);

const MES_PAIEMENTS = [
  { ref: "PAI-2024-041", trimestre: "T1 — S5", date: "15 oct. 2024", montant: MONTANT_TRIM, statut: "paye", methode: "BGFI Bank", banque: "BGFI Libreville" },
  { ref: "PAI-2024-018", trimestre: "T4 — S4", date: "15 juil. 2024", montant: MONTANT_TRIM, statut: "paye", methode: "BGFI Bank", banque: "BGFI Libreville" },
  { ref: "PAI-2024-002", trimestre: "T3 — S4", date: "15 avr. 2024", montant: MONTANT_TRIM, statut: "paye", methode: "BGFI Bank", banque: "BGFI Libreville" },
  { ref: "PAI-2024-003", trimestre: "T2 — S5", date: "15 jan. 2025", montant: MONTANT_TRIM, statut: "en_attente", methode: "BGFI Bank", banque: "BGFI Libreville" },
];

function EtudiantPaiementsPage() {
  const totalRecu = MES_PAIEMENTS.filter(p => p.statut === "paye").reduce((s, p) => s + p.montant, 0);
  const pct = Math.round((ME.versementsRecus / ME.versementsTotal) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mes paiements"
        description="Historique de tous les versements de votre bourse COMILOG."
        actions={<Button size="sm" variant="outline" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>}
      />

      {/* KPI */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4 flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/12 text-success"><CheckCircle2 className="h-5 w-5" /></div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Total reçu</p>
            <p className="text-lg font-bold text-success tabular-nums">{fmtFcfa(totalRecu)}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-foreground"><Clock className="h-5 w-5" /></div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">En attente</p>
            <p className="text-lg font-bold text-gold-foreground tabular-nums">{fmtFcfa(MONTANT_TRIM)}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Wallet className="h-5 w-5" /></div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Avancement</p>
            <p className="text-lg font-bold text-primary tabular-nums">{ME.versementsRecus}/{ME.versementsTotal}</p>
          </div>
        </Card>
      </div>

      {/* Prochain versement */}
      <Card className="border-gold/25 bg-gold/4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Prochain versement attendu</CardTitle>
            <Badge variant="outline" className="bg-gold/10 text-gold-foreground border-gold/30"><Clock className="mr-1 h-3 w-3" />En cours de traitement</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <p className="text-2xl font-bold tabular-nums">{fmtFcfa(MONTANT_TRIM)}</p>
            <p className="text-sm text-muted-foreground">Trimestre 2 — Semestre 5 · Session 2024-25</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Avancement total de la bourse</span><span>{pct}%</span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          </div>
          <div className="space-y-2 text-sm md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">15 jan. 2025</span>
            </div>
            <div className="flex items-center gap-2 md:justify-end text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>BGFI Bank · ••••3421</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Référence</TableHead>
              <TableHead>Trimestre</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="pr-4 w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MES_PAIEMENTS.map((p) => (
              <TableRow key={p.ref}>
                <TableCell className="pl-6 font-mono text-xs text-muted-foreground">{p.ref}</TableCell>
                <TableCell className="text-sm">{p.trimestre}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                <TableCell>
                  <div className="text-sm">{p.methode}</div>
                  <div className="text-[11px] text-muted-foreground">{p.banque}</div>
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{fmtFcfa(p.montant)}</TableCell>
                <TableCell><PaiStatut s={p.statut} /></TableCell>
                <TableCell className="pr-4">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* RIB */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Compte bancaire enregistré</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Banque", val: "BGFI Bank Gabon" },
            { label: "Titulaire", val: ME.name },
            { label: "IBAN", val: "GA21 0402 0001 0000 3421 0000 023" },
          ].map(({ label, val }) => (
            <div key={label}>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="mt-0.5 text-sm font-medium font-mono">{val}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PaiStatut({ s }: { s: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    paye: { label: "Reçu", cls: "bg-success/12 text-success border-success/25" },
    en_attente: { label: "En attente", cls: "bg-gold/15 text-gold-foreground border-gold/30" },
  };
  const cfg = map[s] ?? map.en_attente;
  return <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold", cfg.cls)}>{cfg.label}</span>;
}

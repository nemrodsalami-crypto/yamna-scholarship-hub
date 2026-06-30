import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2, Clock, Wallet, CalendarDays, CreditCard,
  Download, TrendingUp, AlertCircle, Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/yamna/page-header";
import { ETUDIANTS, fmtFcfa } from "@/lib/yamna-mock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/etudiant/bourse")({
  head: () => ({ meta: [{ title: "Suivi bourse — YAM'NA" }] }),
  component: EtudiantBourse,
});

const ME = ETUDIANTS[0];
const MONTANT_TRIM = Math.round((ME.montantAnnuel ?? 0) / 4);

const VERSEMENTS = [
  { ref: "PAI-2023-001", label: "T1 — S3", periode: "Oct. 2023", montant: MONTANT_TRIM, statut: "paye", date: "15 oct. 2023" },
  { ref: "PAI-2023-019", label: "T2 — S3", periode: "Jan. 2024", montant: MONTANT_TRIM, statut: "paye", date: "15 jan. 2024" },
  { ref: "PAI-2024-002", label: "T3 — S4", periode: "Avr. 2024", montant: MONTANT_TRIM, statut: "paye", date: "15 avr. 2024" },
  { ref: "PAI-2024-018", label: "T4 — S4", periode: "Jul. 2024", montant: MONTANT_TRIM, statut: "paye", date: "15 juil. 2024" },
  { ref: "PAI-2024-041", label: "T1 — S5", periode: "Oct. 2024", montant: MONTANT_TRIM, statut: "paye", date: "15 oct. 2024" },
  { ref: "PAI-2025-005", label: "T2 — S5", periode: "Jan. 2025", montant: MONTANT_TRIM, statut: "en_attente", date: "Prévu 15 jan. 2025" },
  { ref: "PAI-2025-022", label: "T3 — S5", periode: "Avr. 2025", montant: MONTANT_TRIM, statut: "programme", date: "Prévu 15 avr. 2025" },
  { ref: "PAI-2025-039", label: "T4 — S5", periode: "Jul. 2025", montant: MONTANT_TRIM, statut: "programme", date: "Prévu 15 juil. 2025" },
];

const chartData = VERSEMENTS.map(v => ({
  name: v.label,
  montant: v.montant,
  statut: v.statut,
}));

const STATUT_CLR: Record<string, string> = {
  paye: "hsl(142 71% 45%)",
  en_attente: "hsl(48 96% 53%)",
  programme: "hsl(214 84% 56% / 0.35)",
};

function EtudiantBourse() {
  const totalRecu = VERSEMENTS.filter(v => v.statut === "paye").reduce((s, v) => s + v.montant, 0);
  const totalAttendu = VERSEMENTS.reduce((s, v) => s + v.montant, 0);
  const pct = Math.round((totalRecu / totalAttendu) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suivi de ma bourse"
        description="Détail de votre bourse COMILOG, versements reçus et calendrier prévisionnel."
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Relevé de versements
          </Button>
        }
      />

      {/* Bourse active card */}
      <Card className="overflow-hidden p-0 border-primary/20">
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-info" />
        <CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-success/12 text-success border-success/25 hover:bg-success/15">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Bourse active
              </Badge>
              <Badge variant="outline">Session {ME.promo}</Badge>
            </div>
            <h2 className="mt-2 text-xl font-bold">{ME.bourseType}</h2>
            <p className="text-sm text-muted-foreground">Programme COMILOG — Gabon · Génie logiciel · {ME.school}</p>
            <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-4">
              <div>
                <p className="text-[11px] text-muted-foreground">Montant annuel</p>
                <p className="font-bold text-primary">{fmtFcfa(ME.montantAnnuel ?? 0)}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Par trimestre</p>
                <p className="font-bold">{fmtFcfa(MONTANT_TRIM)}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Référent</p>
                <p className="font-bold">{ME.referent}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Bourse depuis</p>
                <p className="font-bold">{ME.joinedAt}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border bg-secondary/30 px-6 py-4 text-center md:min-w-[160px]">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Total reçu</p>
            <p className="text-2xl font-bold text-success tabular-nums">{fmtFcfa(totalRecu)}</p>
            <p className="text-[11px] text-muted-foreground">sur {fmtFcfa(totalAttendu)}</p>
            <Progress value={pct} className="mt-1 h-2 w-full" />
            <p className="text-xs font-semibold text-muted-foreground">{pct}% versé</p>
          </div>
        </CardContent>
      </Card>

      {/* KPI row */}
      <div className="grid gap-3 sm:grid-cols-4">
        <KpiCard icon={CheckCircle2} label="Versements reçus" value={`${VERSEMENTS.filter(v => v.statut === "paye").length}`} sub={fmtFcfa(totalRecu)} tone="text-success" bg="bg-success/12" />
        <KpiCard icon={Clock} label="En attente" value="1" sub="T2 — S5 · Jan. 2025" tone="text-gold-foreground" bg="bg-gold/15" />
        <KpiCard icon={TrendingUp} label="GPA bourse" value={`${ME.gpa}/20`} sub="Seuil requis : 12/20" tone="text-primary" bg="bg-primary/10" />
        <KpiCard icon={Wallet} label="Prochain versement" value={fmtFcfa(MONTANT_TRIM)} sub="Prévu 15 jan. 2025" tone="text-info" bg="bg-info/10" />
      </div>

      {/* Graphique versements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Calendrier des versements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-success" />Reçu</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-gold" />En attente</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-primary/30" />Programmé</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v: number) => [fmtFcfa(v), "Montant"]}
              />
              <Bar dataKey="montant" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={STATUT_CLR[entry.statut] ?? STATUT_CLR.programme} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Prochain versement */}
      <Card className="border-gold/25 bg-gold/3">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="h-4 w-4 text-gold-foreground" /> Prochain versement attendu
            </CardTitle>
            <Badge variant="outline" className="bg-gold/10 text-gold-foreground border-gold/30">
              <Clock className="mr-1 h-3 w-3" /> En traitement
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <p className="text-3xl font-bold tabular-nums">{fmtFcfa(MONTANT_TRIM)}</p>
            <p className="text-sm text-muted-foreground">Trimestre 2 · Semestre 5 · Session {ME.promo}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-muted-foreground" /><strong>15 janvier 2025</strong></span>
              <span className="flex items-center gap-1.5 text-muted-foreground"><CreditCard className="h-4 w-4" />BGFI Bank · ••••3421</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button variant="outline" size="sm" className="gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" /> Signaler un problème
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Historique table */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <p className="text-sm font-semibold">Historique des versements</p>
          <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-muted-foreground">
            <Download className="h-3.5 w-3.5" /> Exporter
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Référence</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="pr-4 w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VERSEMENTS.map((v) => (
              <TableRow key={v.ref} className={cn(v.statut === "programme" && "opacity-50")}>
                <TableCell className="pl-5 font-mono text-xs text-muted-foreground">{v.ref}</TableCell>
                <TableCell className="text-sm font-medium">{v.label}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{v.date}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{fmtFcfa(v.montant)}</TableCell>
                <TableCell><VersStatut s={v.statut} /></TableCell>
                <TableCell className="pr-4">
                  {v.statut === "paye" && (
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0"><Download className="h-3 w-3" /></Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t bg-secondary/20 px-5 py-3">
          <p className="text-sm text-muted-foreground">Total reçu à ce jour</p>
          <p className="text-base font-bold text-success tabular-nums">{fmtFcfa(totalRecu)}</p>
        </div>
      </Card>

      {/* Conditions de renouvellement */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Conditions de maintien de la bourse</CardTitle></CardHeader>
        <CardContent className="space-y-2.5">
          {[
            { label: "Moyenne générale ≥ 12/20", ok: true, val: `${ME.gpa}/20 actuellement` },
            { label: "Aucun redoublement", ok: true, val: "Parcours validé sans redoublement" },
            { label: "Rapport semestriel soumis", ok: true, val: "Tous les rapports à jour" },
            { label: "Documents à jour", ok: ME.documents >= (ME.documentsRequired ?? 7), val: `${ME.documents}/${ME.documentsRequired} pièces validées` },
            { label: "Présence aux réunions bilans", ok: true, val: "Présent à toutes les réunions" },
          ].map((cond, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border px-4 py-2.5">
              <div className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full", cond.ok ? "bg-success/12 text-success" : "bg-warning/15 text-warning-foreground")}>
                {cond.ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{cond.label}</p>
                <p className="text-[11px] text-muted-foreground">{cond.val}</p>
              </div>
              <Badge variant={cond.ok ? "outline" : "destructive"} className={cn("text-[10px]", cond.ok && "border-success/25 bg-success/10 text-success")}>
                {cond.ok ? "Conforme" : "Action requise"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, sub, tone, bg }: { icon: typeof Wallet; label: string; value: string; sub: string; tone: string; bg: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", bg, tone)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className={cn("text-lg font-bold tabular-nums leading-tight", tone)}>{value}</p>
        <p className="truncate text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </Card>
  );
}

function VersStatut({ s }: { s: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    paye: { label: "Reçu", cls: "bg-success/12 text-success border-success/25" },
    en_attente: { label: "En attente", cls: "bg-gold/15 text-gold-foreground border-gold/30" },
    programme: { label: "Programmé", cls: "bg-secondary text-muted-foreground border-border" },
  };
  const cfg = map[s] ?? map.programme;
  return <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold", cfg.cls)}>{cfg.label}</span>;
}

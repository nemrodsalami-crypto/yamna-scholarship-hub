import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2, Clock, Wallet, CalendarDays, Download,
  TrendingUp, AlertCircle, CreditCard, Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/yamna/page-header";
import { ETABLISSEMENTS, ETUDIANTS, fmtFcfa } from "@/lib/yamna-mock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ecole/paiements")({
  head: () => ({ meta: [{ title: "Suivi paiements — YAM'NA École" }] }),
  component: EcolePaiements,
});

const ME = ETABLISSEMENTS[1]; // INPTIC
const BOURSIERS = ETUDIANTS.filter((e) => e.school === "INPTIC" && e.status === "boursier");

// Virements institutionnels COMILOG → INPTIC (frais de scolarité et d'accueil)
const VIREMENTS = [
  { ref: "VIR-2024-INPTIC-001", label: "Frais de scolarité T1", periode: "Oct. 2023", montant: 5_500_000, statut: "recu", date: "12 oct. 2023", nb: 2 },
  { ref: "VIR-2024-INPTIC-002", label: "Frais de scolarité T2", periode: "Jan. 2024", montant: 5_500_000, statut: "recu", date: "15 jan. 2024", nb: 2 },
  { ref: "VIR-2024-INPTIC-003", label: "Frais de scolarité T3", periode: "Avr. 2024", montant: 5_500_000, statut: "recu", date: "14 avr. 2024", nb: 2 },
  { ref: "VIR-2024-INPTIC-004", label: "Frais de scolarité T4", periode: "Jul. 2024", montant: 5_500_000, statut: "recu", date: "12 jul. 2024", nb: 2 },
  { ref: "VIR-2025-INPTIC-005", label: "Frais de scolarité T1 — S5", periode: "Oct. 2024", montant: 6_000_000, statut: "recu", date: "15 oct. 2024", nb: BOURSIERS.length },
  { ref: "VIR-2025-INPTIC-006", label: "Frais de scolarité T2 — S5", periode: "Jan. 2025", montant: 6_000_000, statut: "en_attente", date: "Prévu 20 jan. 2025", nb: BOURSIERS.length },
  { ref: "VIR-2025-INPTIC-007", label: "Frais de scolarité T3 — S5", periode: "Avr. 2025", montant: 6_000_000, statut: "programme", date: "Prévu 20 avr. 2025", nb: BOURSIERS.length },
  { ref: "VIR-2025-INPTIC-008", label: "Frais de scolarité T4 — S5", periode: "Jul. 2025", montant: 6_000_000, statut: "programme", date: "Prévu 20 jul. 2025", nb: BOURSIERS.length },
];

const chartData = VIREMENTS.map((v) => ({ name: v.periode, montant: v.montant, statut: v.statut }));
const STATUT_CLR: Record<string, string> = {
  recu: "hsl(142 71% 45%)",
  en_attente: "hsl(48 96% 53%)",
  programme: "hsl(214 84% 56% / 0.3)",
};

function EcolePaiements() {
  const totalRecu = VIREMENTS.filter(v => v.statut === "recu").reduce((s, v) => s + v.montant, 0);
  const totalAttendu = VIREMENTS.reduce((s, v) => s + v.montant, 0);
  const pct = Math.round((totalRecu / totalAttendu) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suivi des paiements reçus"
        description="Virements institutionnels COMILOG → INPTIC pour la prise en charge des boursiers."
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Exporter le relevé
          </Button>
        }
      />

      {/* Carte convention active */}
      <Card className="overflow-hidden p-0 border-info/20">
        <div className="h-1.5 w-full bg-gradient-to-r from-info to-primary" />
        <CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-info/10 text-info border-info/25 hover:bg-info/15">
                <Building2 className="mr-1 h-3 w-3" /> Convention active
              </Badge>
              <Badge variant="outline">Session 2024-2025</Badge>
            </div>
            <h2 className="mt-2 text-lg font-bold">INPTIC — Prise en charge COMILOG</h2>
            <p className="text-sm text-muted-foreground">Frais de scolarité · {BOURSIERS.length} boursiers actifs · {ME.city}</p>
            <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-4">
              <div><p className="text-[11px] text-muted-foreground">Budget alloué</p><p className="font-bold text-info">{fmtFcfa(30_000_000)}</p></div>
              <div><p className="text-[11px] text-muted-foreground">Par trimestre</p><p className="font-bold">{fmtFcfa(6_000_000)}</p></div>
              <div><p className="text-[11px] text-muted-foreground">Boursiers</p><p className="font-bold">{BOURSIERS.length} actifs</p></div>
              <div><p className="text-[11px] text-muted-foreground">Contact COMILOG</p><p className="font-bold">Direction Bourses</p></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border bg-secondary/30 px-6 py-4 text-center md:min-w-[160px]">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Total reçu</p>
            <p className="text-2xl font-bold text-success tabular-nums">{fmtFcfa(totalRecu)}</p>
            <p className="text-[11px] text-muted-foreground">sur {fmtFcfa(totalAttendu)}</p>
            <Progress value={pct} className="mt-1 h-2 w-full" />
            <p className="text-xs font-semibold text-muted-foreground">{pct}% reçu</p>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-3 sm:grid-cols-4">
        <KpiCard icon={CheckCircle2} label="Virements reçus" value={`${VIREMENTS.filter(v => v.statut === "recu").length}`} sub={fmtFcfa(totalRecu)} tone="text-success" bg="bg-success/12" />
        <KpiCard icon={Clock} label="En attente" value="1" sub="Prévu 20 jan. 2025" tone="text-gold-foreground" bg="bg-gold/15" />
        <KpiCard icon={TrendingUp} label="Boursiers actifs" value={`${BOURSIERS.length}`} sub="session en cours" tone="text-info" bg="bg-info/10" />
        <KpiCard icon={Wallet} label="Prochain virement" value={fmtFcfa(6_000_000)} sub="Prévu 20 jan. 2025" tone="text-primary" bg="bg-primary/10" />
      </div>

      {/* Graphique */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Calendrier des virements COMILOG → INPTIC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-success" />Reçu</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-gold" />En attente</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-primary/30" />Programmé</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1_000_000}M`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [fmtFcfa(v), "Montant"]} />
              <Bar dataKey="montant" radius={[4, 4, 0, 0]}>
                {chartData.map((e, i) => <Cell key={i} fill={STATUT_CLR[e.statut] ?? STATUT_CLR.programme} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Prochain virement */}
      <Card className="border-gold/25 bg-gold/3">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Prochain virement attendu</CardTitle>
            <Badge variant="outline" className="bg-gold/10 text-gold-foreground border-gold/30">
              <Clock className="mr-1 h-3 w-3" /> En traitement COMILOG
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <p className="text-3xl font-bold tabular-nums">{fmtFcfa(6_000_000)}</p>
            <p className="text-sm text-muted-foreground">Frais de scolarité T2 — Semestre 5 · {BOURSIERS.length} boursiers</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-muted-foreground" /><strong>20 janvier 2025</strong></span>
              <span className="flex items-center gap-1.5 text-muted-foreground"><CreditCard className="h-4 w-4" />Compte INPTIC · BGFI ••••8820</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 self-center">
            <AlertCircle className="h-3.5 w-3.5" /> Signaler un problème
          </Button>
        </CardContent>
      </Card>

      {/* Table historique */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <p className="text-sm font-semibold">Historique des virements institutionnels</p>
          <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-muted-foreground">
            <Download className="h-3.5 w-3.5" /> Exporter
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Référence</TableHead>
              <TableHead>Objet</TableHead>
              <TableHead className="text-center">Boursiers</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="pr-4 w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VIREMENTS.map((v) => (
              <TableRow key={v.ref} className={cn(v.statut === "programme" && "opacity-50")}>
                <TableCell className="pl-5 font-mono text-xs text-muted-foreground">{v.ref}</TableCell>
                <TableCell>
                  <p className="text-sm font-medium">{v.label}</p>
                  <p className="text-[11px] text-muted-foreground">{v.periode}</p>
                </TableCell>
                <TableCell className="text-center text-sm tabular-nums">{v.nb}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{v.date}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{fmtFcfa(v.montant)}</TableCell>
                <TableCell><VirStatut s={v.statut} /></TableCell>
                <TableCell className="pr-4">
                  {v.statut === "recu" && (
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

      {/* Compte bancaire */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Compte bancaire institutionnel</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Banque", val: "BGFI Bank Gabon" },
            { label: "Titulaire", val: ME.name.split("—")[0].trim() },
            { label: "IBAN", val: "GA21 0402 0003 0000 8820 0000 011" },
          ].map(({ label, val }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="mt-0.5 text-sm font-medium font-mono">{val}</p>
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

function VirStatut({ s }: { s: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    recu: { label: "Reçu", cls: "bg-success/12 text-success border-success/25" },
    en_attente: { label: "En attente", cls: "bg-gold/15 text-gold-foreground border-gold/30" },
    programme: { label: "Programmé", cls: "bg-secondary text-muted-foreground border-border" },
  };
  const cfg = map[s] ?? map.programme;
  return <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold", cfg.cls)}>{cfg.label}</span>;
}

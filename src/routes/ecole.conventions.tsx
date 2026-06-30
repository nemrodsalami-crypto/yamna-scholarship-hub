import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, CheckCircle2, Eye, CalendarDays, Building2, Wallet, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/yamna/page-header";
import { ETABLISSEMENTS, fmtFcfa } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ecole/conventions")({
  head: () => ({ meta: [{ title: "Conventions — YAM'NA École" }] }),
  component: EcoleConventions,
});

const ME_ECOLE = ETABLISSEMENTS[1]; // INPTIC

const CONVENTIONS = [
  { id: "CONV-2024-INPTIC", titre: "Convention de partenariat 2024-2025", periode: "Sept. 2024 – Juil. 2025", statut: "active", signeLe: "01 sept. 2024", boursMax: 25, budgetMax: 30_000_000, boursActuels: ME_ECOLE.nbrBoursiers, budgetActuel: ME_ECOLE.montantTotal },
  { id: "CONV-2023-INPTIC", titre: "Convention de partenariat 2023-2024", periode: "Sept. 2023 – Juil. 2024", statut: "expiree", signeLe: "01 sept. 2023", boursMax: 22, budgetMax: 25_000_000, boursActuels: 20, budgetActuel: 22_000_000 },
  { id: "CONV-2022-INPTIC", titre: "Convention de partenariat 2022-2023", periode: "Sept. 2022 – Juil. 2023", statut: "expiree", signeLe: "05 sept. 2022", boursMax: 18, budgetMax: 20_000_000, boursActuels: 17, budgetActuel: 18_500_000 },
];

const DOCS_CONVENTION = [
  { name: "Convention signée 2024-25 (PDF)", date: "01 sept. 2024", type: "Convention" },
  { name: "Annexe pédagogique — Filieres éligibles", date: "01 sept. 2024", type: "Annexe" },
  { name: "Tableau des boursiers 2024-25", date: "15 oct. 2024", type: "Liste" },
  { name: "Procès-verbal comité de sélection", date: "10 oct. 2024", type: "PV" },
  { name: "Relevé de compte INPTIC (RIB)", date: "25 août 2024", type: "Financier" },
];

function EcoleConventions() {
  const active = CONVENTIONS.find(c => c.statut === "active")!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conventions de partenariat"
        description="Documents officiels liant INPTIC et COMILOG dans le cadre du programme YAM'NA."
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Télécharger la convention active
          </Button>
        }
      />

      {/* Convention active */}
      <Card className="border-success/25 bg-success/4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{active.titre}</CardTitle>
            <Badge className="bg-success/15 text-success border-success/25 hover:bg-success/20">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ConvStat icon={CalendarDays} label="Période" value={active.periode} />
            <ConvStat icon={CalendarDays} label="Signée le" value={active.signeLe} />
            <ConvStat icon={Users} label="Boursiers max" value={`${active.boursMax} étudiants`} />
            <ConvStat icon={Wallet} label="Budget max" value={fmtFcfa(active.budgetMax)} />
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Utilisation boursiers</span>
                <span>{active.boursActuels}/{active.boursMax} ({Math.round((active.boursActuels / active.boursMax) * 100)}%)</span>
              </div>
              <Progress value={(active.boursActuels / active.boursMax) * 100} className="h-2" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Utilisation budget</span>
                <span>{Math.round((active.budgetActuel / active.budgetMax) * 100)}%</span>
              </div>
              <Progress value={(active.budgetActuel / active.budgetMax) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        {/* Left — historique */}
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Historique des conventions</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {CONVENTIONS.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{c.titre}</p>
                    <p className="text-[11px] text-muted-foreground">{c.periode} · Signé le {c.signeLe}</p>
                    <div className="mt-1 flex gap-3 text-[11px] text-muted-foreground">
                      <span><Users className="inline h-3 w-3 mr-0.5" />{c.boursActuels}/{c.boursMax}</span>
                      <span><Wallet className="inline h-3 w-3 mr-0.5" />{fmtFcfa(c.budgetActuel)}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 ml-3">
                    <ConvStatut s={c.statut} />
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Download className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right — documents */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Documents annexes</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {DOCS_CONVENTION.map((doc, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors hover:bg-secondary/20">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{doc.name}</p>
                  <p className="text-[10px] text-muted-foreground">{doc.date}</p>
                </div>
                <div className="flex gap-0.5">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0"><Eye className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0"><Download className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ConvStat({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground"><Icon className="h-3 w-3" />{label}</p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

function ConvStatut({ s }: { s: string }) {
  return s === "active" ? (
    <span className="inline-flex rounded-full border border-success/25 bg-success/12 px-2 py-0.5 text-[10px] font-semibold text-success">Active</span>
  ) : (
    <span className="inline-flex rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">Expirée</span>
  );
}

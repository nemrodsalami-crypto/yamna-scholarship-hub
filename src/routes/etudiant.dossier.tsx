import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, AlertCircle, Download, Eye, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/yamna/page-header";
import { ETUDIANTS, CANDIDATURES, fmtFcfa } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/etudiant/dossier")({
  head: () => ({ meta: [{ title: "Mon dossier — YAM'NA" }] }),
  component: MonDossierPage,
});

const ME = ETUDIANTS[0];
const MON_DOSSIER = CANDIDATURES[0];

const DOCS_REQ = [
  { name: "Pièce d'identité nationale", statut: "valide", date: "15 sept. 2023" },
  { name: "Certificat de scolarité 2024-25", statut: "valide", date: "12 sept. 2024" },
  { name: "Relevés de notes S3-S4", statut: "valide", date: "10 sept. 2024" },
  { name: "Lettre de motivation", statut: "valide", date: "15 sept. 2023" },
  { name: "Attestation bancaire (RIB BGFI)", statut: "valide", date: "12 déc. 2024" },
  { name: "Justificatif de domicile", statut: "valide", date: "15 sept. 2023" },
  { name: "Relevé de notes S5 (en cours)", statut: "en_attente", date: "À déposer avant jan. 2025" },
];

const HISTORIQUE = [
  { date: "18 oct. 2023", event: "Bourse activée — Mérite Excellence", type: "success" },
  { date: "10 oct. 2023", event: "Décision comité : ACCEPTÉ (score 87/100)", type: "success" },
  { date: "28 sept. 2023", event: "Éligibilité validée par le service bourses", type: "success" },
  { date: "20 sept. 2023", event: "Dossier complet — en instruction", type: "info" },
  { date: "15 sept. 2023", event: "Dossier déposé en ligne", type: "info" },
];

function MonDossierPage() {
  const scoreVal = MON_DOSSIER?.score ?? 87;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mon dossier de bourse"
        description="Dossier de candidature — Session 2023-2024 · Renouvelé session 2024-2025"
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Télécharger le récapitulatif
          </Button>
        }
      />

      {/* Status banner */}
      <Card className="border-success/30 bg-success/5">
        <CardContent className="flex flex-col gap-4 pt-5 md:flex-row md:items-center">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-success/15 text-success">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-success">Bourse active · Mérite Excellence</p>
            <p className="text-xs text-muted-foreground mt-0.5">Approuvée par le comité COMILOG — Activée le 18 oct. 2023 · Renouvelée sept. 2024</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <p className="text-xs text-muted-foreground">Score de sélection</p>
            <div className="flex items-center gap-2">
              <Progress value={scoreVal} className="h-2 w-24" />
              <span className="text-sm font-bold tabular-nums text-success">{scoreVal}/100</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          {/* Infos personnelles */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Nom complet", val: ME.name },
                { label: "Matricule", val: ME.matricule },
                { label: "Email", val: ME.email },
                { label: "Téléphone", val: ME.phone },
                { label: "Date de naissance", val: ME.birth },
                { label: "Ville de naissance", val: ME.birthCity },
                { label: "Établissement", val: ME.school },
                { label: "Filière", val: ME.filiere },
                { label: "Niveau actuel", val: ME.niveau },
                { label: "Promotion", val: ME.promo },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-0.5 text-sm font-medium">{val}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Pièces justificatives</CardTitle>
                <Badge variant="secondary">{DOCS_REQ.filter(d => d.statut === "valide").length}/{DOCS_REQ.length} validées</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {DOCS_REQ.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border px-3 py-2.5">
                  <div className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-lg",
                    doc.statut === "valide" ? "bg-success/10 text-success" : "bg-gold/12 text-gold-foreground"
                  )}>
                    {doc.statut === "valide" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-tight">{doc.name}</p>
                    <p className="text-[11px] text-muted-foreground">{doc.date}</p>
                  </div>
                  {doc.statut === "valide" ? (
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-[10px] bg-gold/10 text-gold-foreground border-gold/30">À fournir</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-5">
          {/* Financement */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Financement</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Type de bourse", val: ME.bourseType ?? "—" },
                { label: "Montant annuel", val: fmtFcfa(ME.montantAnnuel ?? 0) },
                { label: "Montant par trimestre", val: fmtFcfa(Math.round((ME.montantAnnuel ?? 0) / 4)) },
                { label: "Versements reçus", val: `${ME.versementsRecus} sur ${ME.versementsTotal}` },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold">{val}</span>
                </div>
              ))}
              <Progress value={(ME.versementsRecus / ME.versementsTotal) * 100} className="h-2 mt-1" />
            </CardContent>
          </Card>

          {/* Historique */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Historique du dossier</CardTitle></CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {HISTORIQUE.map((h, i) => (
                  <li key={i} className="flex gap-2.5">
                    <div className={cn(
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                      h.type === "success" ? "bg-success/15 text-success" : "bg-info/10 text-info"
                    )}>
                      {h.type === "success" ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-muted-foreground">{h.date}</p>
                      <p className="text-xs font-medium leading-snug">{h.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

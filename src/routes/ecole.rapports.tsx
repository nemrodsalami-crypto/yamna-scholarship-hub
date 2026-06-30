import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  FileText, CheckCircle2, Clock, AlertTriangle, Plus, Upload,
  ChevronDown, ChevronUp, Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/yamna/page-header";
import { ETUDIANTS } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ecole/rapports")({
  head: () => ({ meta: [{ title: "Rapports académiques — YAM'NA École" }] }),
  component: EcoleRapports,
});

const BOURSIERS = ETUDIANTS.filter((e) => e.school === "INPTIC" && e.status === "boursier");

type RapportStatut = "a_soumettre" | "soumis" | "valide" | "rejete";

const RAPPORTS: { sem: string; periode: string; statut: RapportStatut; soumisLe?: string; valideLe?: string; nb: number }[] = [
  { sem: "S5 — 2024-2025", periode: "Sept. 2024 – Jan. 2025", statut: "a_soumettre", nb: BOURSIERS.length },
  { sem: "S4 — 2023-2024", periode: "Fév. – Jul. 2024", statut: "valide", soumisLe: "12 juil. 2024", valideLe: "28 juil. 2024", nb: 2 },
  { sem: "S3 — 2023-2024", periode: "Sept. 2023 – Jan. 2024", statut: "valide", soumisLe: "15 jan. 2024", valideLe: "30 jan. 2024", nb: 2 },
  { sem: "S2 — 2022-2023", periode: "Fév. – Jul. 2023", statut: "valide", soumisLe: "10 juil. 2023", valideLe: "25 juil. 2023", nb: 2 },
];

const STATUT_CFG: Record<RapportStatut, { label: string; cls: string; icon: typeof CheckCircle2 }> = {
  a_soumettre: { label: "À soumettre", cls: "bg-warning/15 text-warning-foreground border-warning/30", icon: AlertTriangle },
  soumis: { label: "Soumis — en vérification", cls: "bg-info/10 text-info border-info/20", icon: Clock },
  valide: { label: "Validé", cls: "bg-success/12 text-success border-success/25", icon: CheckCircle2 },
  rejete: { label: "Rejeté", cls: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertTriangle },
};

function EcoleRapports() {
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("S5 — 2024-2025");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rapports académiques"
        description="Soumettez les résultats semestriels de vos étudiants boursiers COMILOG."
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => setShowForm(true)}>
            <Plus className="h-3.5 w-3.5" /> Soumettre un rapport
          </Button>
        }
      />

      {/* Alert banner */}
      <Card className="border-warning/30 bg-warning/5 p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-warning/12 text-warning-foreground">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-warning-foreground">Rapport S5 en attente de soumission</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Le rapport du semestre 5 (2024-2025) doit être soumis avant le <strong>10 janvier 2025</strong> pour {BOURSIERS.length} boursier{BOURSIERS.length > 1 ? "s" : ""}.
            </p>
          </div>
          <Button size="sm" className="shrink-0 ml-auto" onClick={() => setShowForm(true)}>Soumettre</Button>
        </div>
      </Card>

      {/* Rapports list */}
      <div className="space-y-3">
        {RAPPORTS.map((r) => {
          const cfg = STATUT_CFG[r.statut];
          const Icon = cfg.icon;
          const open = expanded === r.sem;
          return (
            <Card key={r.sem} className="overflow-hidden p-0">
              <button
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/20"
                onClick={() => setExpanded(open ? null : r.sem)}
              >
                <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", cfg.cls.split(" ").slice(0, 1)[0], cfg.cls.split(" ").slice(1).join(" "))}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{r.sem}</p>
                    <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold", cfg.cls)}>{cfg.label}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{r.periode} · {r.nb} boursier{r.nb > 1 ? "s" : ""}</p>
                </div>
                {open ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </button>

              {open && (
                <div className="border-t bg-secondary/10 px-5 py-4">
                  {r.statut === "a_soumettre" ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Aucun rapport soumis pour ce semestre. Cliquez sur le bouton ci-dessous pour commencer la saisie.</p>
                      <Button size="sm" className="gap-1.5" onClick={() => setShowForm(true)}>
                        <FileText className="h-3.5 w-3.5" /> Commencer la saisie du rapport
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid gap-2 sm:grid-cols-2 text-sm">
                        {r.soumisLe && <div><span className="text-muted-foreground">Soumis le :</span> <span className="font-medium">{r.soumisLe}</span></div>}
                        {r.valideLe && <div><span className="text-muted-foreground">Validé le :</span> <span className="font-medium">{r.valideLe}</span></div>}
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Résultats soumis</p>
                        {BOURSIERS.slice(0, r.nb).map((e) => (
                          <div key={e.id} className="flex items-center justify-between rounded-lg border bg-card px-3 py-2">
                            <span className="text-sm">{e.name}</span>
                            <div className="flex items-center gap-3">
                              <span className={cn("text-sm font-bold tabular-nums", e.gpa >= 12 ? "text-success" : "text-destructive")}>{e.gpa}/20</span>
                              <Badge variant="secondary" className="text-[10px]">Validé</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Submit dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Soumettre un rapport semestriel</DialogTitle>
            <DialogDescription>Saisissez les résultats académiques de vos boursiers pour le semestre en cours.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Semestre</Label>
              <Select defaultValue="s5">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="s5">S5 — 2024-2025</SelectItem>
                  <SelectItem value="s4">S4 — 2023-2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Résultats par étudiant</Label>
              {BOURSIERS.map((e) => (
                <div key={e.id} className="flex items-center gap-3 rounded-lg border px-3 py-2">
                  <span className="flex-1 text-sm font-medium">{e.name}</span>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue={e.gpa} min={0} max={20} step={0.1} className="h-8 w-20 text-right text-sm" />
                    <span className="text-xs text-muted-foreground">/20</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <Label>Observations (optionnel)</Label>
              <Textarea rows={3} placeholder="Commentaires, absences, difficultés particulières…" />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-dashed p-3">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Joindre les relevés de notes (PDF)</span>
              <Button size="sm" variant="outline" className="ml-auto h-7 text-xs">Parcourir</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            <Button className="gap-1.5" onClick={() => setShowForm(false)}>
              <Send className="h-3.5 w-3.5" /> Soumettre le rapport
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

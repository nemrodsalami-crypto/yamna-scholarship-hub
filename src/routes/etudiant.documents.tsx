import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Upload, FileText, CheckCircle2, Clock, AlertCircle,
  Download, Eye, Trash2, FolderOpen, Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/yamna/page-header";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/etudiant/documents")({
  head: () => ({ meta: [{ title: "Mes documents — YAM'NA" }] }),
  component: EtudiantDocumentsPage,
});

type DocStatut = "valide" | "en_attente" | "a_fournir";

const MES_DOCS: { name: string; type: string; size: string; date: string; statut: DocStatut; required: boolean }[] = [
  { name: "Carte nationale d'identité", type: "Identité", size: "1.2 Mo", date: "15 sept. 2023", statut: "valide", required: true },
  { name: "Certificat de scolarité 2024-25", type: "Scolarité", size: "340 Ko", date: "12 sept. 2024", statut: "valide", required: true },
  { name: "Relevés de notes S3-S4", type: "Académique", size: "820 Ko", date: "10 sept. 2024", statut: "valide", required: true },
  { name: "Lettre de motivation", type: "Candidature", size: "210 Ko", date: "15 sept. 2023", statut: "valide", required: true },
  { name: "Attestation bancaire BGFI", type: "Financier", size: "440 Ko", date: "12 déc. 2024", statut: "valide", required: true },
  { name: "Justificatif de domicile", type: "Identité", size: "950 Ko", date: "15 sept. 2023", statut: "valide", required: true },
  { name: "Relevé de notes S5", type: "Académique", size: "—", date: "—", statut: "a_fournir", required: true },
];

const STATUT_CFG: Record<DocStatut, { label: string; icon: typeof CheckCircle2; cls: string; bg: string }> = {
  valide: { label: "Validé", icon: CheckCircle2, cls: "text-success", bg: "bg-success/10" },
  en_attente: { label: "En vérification", icon: Clock, cls: "text-gold-foreground", bg: "bg-gold/12" },
  a_fournir: { label: "À fournir", icon: AlertCircle, cls: "text-destructive", bg: "bg-destructive/10" },
};

const TYPE_CLR: Record<string, string> = {
  Identité: "bg-info/10 text-info",
  Scolarité: "bg-primary/10 text-primary",
  Académique: "bg-gold/15 text-gold-foreground",
  Financier: "bg-success/12 text-success",
  Candidature: "bg-secondary text-muted-foreground",
};

function EtudiantDocumentsPage() {
  const [dragging, setDragging] = useState(false);
  const valides = MES_DOCS.filter(d => d.statut === "valide").length;
  const aFournir = MES_DOCS.filter(d => d.statut === "a_fournir").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mes documents"
        description="Pièces justificatives de votre dossier de bourse COMILOG."
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Ajouter un document
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4 flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-success/12 text-success"><CheckCircle2 className="h-5 w-5" /></div>
          <div><p className="text-[11px] text-muted-foreground uppercase tracking-wider">Validés</p><p className="text-xl font-bold text-success">{valides}</p></div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-foreground"><Clock className="h-5 w-5" /></div>
          <div><p className="text-[11px] text-muted-foreground uppercase tracking-wider">En vérification</p><p className="text-xl font-bold text-gold-foreground">0</p></div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive"><AlertCircle className="h-5 w-5" /></div>
          <div><p className="text-[11px] text-muted-foreground uppercase tracking-wider">À fournir</p><p className="text-xl font-bold text-destructive">{aFournir}</p></div>
        </Card>
      </div>

      {/* Upload zone */}
      <div
        className={cn(
          "rounded-xl border-2 border-dashed p-8 text-center transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-border bg-secondary/20 hover:border-primary/50"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); }}
      >
        <div className="grid place-items-center gap-2">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold">Glisser-déposer vos fichiers ici</p>
          <p className="text-xs text-muted-foreground">PDF, JPG, PNG — jusqu'à 10 Mo par fichier</p>
          <Button size="sm" variant="outline" className="mt-1 gap-1.5"><FolderOpen className="h-3.5 w-3.5" /> Parcourir</Button>
        </div>
      </div>

      {/* Document list */}
      <Card className="overflow-hidden p-0">
        <div className="border-b px-5 py-3">
          <p className="text-sm font-semibold">Dossier complet — {valides}/{MES_DOCS.length} pièces</p>
        </div>
        <div className="divide-y">
          {MES_DOCS.map((doc, i) => {
            const cfg = STATUT_CFG[doc.statut];
            const Icon = cfg.icon;
            return (
              <div key={i} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-secondary/20">
                <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", cfg.bg, cfg.cls)}>
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    {doc.required && <Badge variant="secondary" className="shrink-0 text-[10px] h-4 px-1">Obligatoire</Badge>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                    <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-semibold", TYPE_CLR[doc.type] ?? "bg-secondary text-muted-foreground")}>{doc.type}</span>
                    {doc.size !== "—" && <span>{doc.size}</span>}
                    {doc.date !== "—" && <span>· {doc.date}</span>}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", cfg.bg, cfg.cls)}>
                    <Icon className="h-2.5 w-2.5" />{cfg.label}
                  </span>
                  {doc.statut === "valide" && (
                    <div className="flex gap-0.5">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  )}
                  {doc.statut === "a_fournir" && (
                    <Button size="sm" className="h-7 gap-1 text-xs"><Upload className="h-3 w-3" />Déposer</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

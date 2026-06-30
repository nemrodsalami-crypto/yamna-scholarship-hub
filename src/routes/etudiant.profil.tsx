import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Camera, Mail, Phone, MapPin, Calendar, User, CheckCircle2,
  Clock, AlertCircle, Eye, Download, Upload, FileText, Edit2, Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/yamna/page-header";
import { ETUDIANTS } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/etudiant/profil")({
  head: () => ({ meta: [{ title: "Mon profil — YAM'NA" }] }),
  component: EtudiantProfil,
});

const ME = ETUDIANTS[0];

type DocStatut = "valide" | "en_attente" | "a_fournir";

const MES_DOCS: { name: string; cat: string; size: string; date: string; statut: DocStatut; ext: string }[] = [
  { name: "Carte nationale d'identité", cat: "Identité", size: "1.2 Mo", date: "15 sept. 2023", statut: "valide", ext: "PDF" },
  { name: "Photo d'identité officielle", cat: "Identité", size: "340 Ko", date: "15 sept. 2023", statut: "valide", ext: "JPG" },
  { name: "Acte de naissance", cat: "État civil", size: "680 Ko", date: "15 sept. 2023", statut: "valide", ext: "PDF" },
  { name: "Justificatif de domicile", cat: "Résidence", size: "950 Ko", date: "15 sept. 2023", statut: "valide", ext: "PDF" },
  { name: "Attestation bancaire (RIB BGFI)", cat: "Financier", size: "440 Ko", date: "12 déc. 2024", statut: "valide", ext: "PDF" },
  { name: "Certificat de scolarité 2024-25", cat: "Scolarité", size: "310 Ko", date: "12 sept. 2024", statut: "valide", ext: "PDF" },
  { name: "Lettre de motivation", cat: "Candidature", size: "210 Ko", date: "15 sept. 2023", statut: "valide", ext: "PDF" },
  { name: "Relevé de notes S5 (à fournir)", cat: "Académique", size: "—", date: "—", statut: "a_fournir", ext: "PDF" },
];

const STATUT_CFG: Record<DocStatut, { label: string; icon: typeof CheckCircle2; cls: string; bg: string }> = {
  valide: { label: "Validé", icon: CheckCircle2, cls: "text-success", bg: "bg-success/10" },
  en_attente: { label: "En vérification", icon: Clock, cls: "text-gold-foreground", bg: "bg-gold/12" },
  a_fournir: { label: "À fournir", icon: AlertCircle, cls: "text-destructive", bg: "bg-destructive/10" },
};

const CAT_CLR: Record<string, string> = {
  Identité: "bg-info/10 text-info",
  "État civil": "bg-primary/10 text-primary",
  Résidence: "bg-gold/12 text-gold-foreground",
  Financier: "bg-success/12 text-success",
  Scolarité: "bg-primary/8 text-primary",
  Académique: "bg-secondary text-muted-foreground",
  Candidature: "bg-secondary text-muted-foreground",
};

function EtudiantProfil() {
  const [editing, setEditing] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);
  const valides = MES_DOCS.filter(d => d.statut === "valide").length;
  const aFournir = MES_DOCS.filter(d => d.statut === "a_fournir").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mon profil"
        description="Informations personnelles et pièces justificatives de votre dossier YAM'NA."
        actions={
          editing ? (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Annuler</Button>
              <Button size="sm" className="gap-1.5" onClick={() => setEditing(false)}>
                <Save className="h-3.5 w-3.5" /> Enregistrer
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setEditing(true)}>
              <Edit2 className="h-3.5 w-3.5" /> Modifier
            </Button>
          )
        }
      />

      {/* Carte de profil principale */}
      <Card className="overflow-hidden p-0">
        {/* Bandeau couleur */}
        <div className="h-24 bg-gradient-to-r from-primary via-primary/80 to-info" />
        <CardContent className="relative pb-5 pt-0">
          {/* Photo */}
          <div
            className="relative -mt-12 mb-4 w-fit cursor-pointer"
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={() => setPhotoHover(false)}
          >
            <Avatar className="h-24 w-24 ring-4 ring-background shadow-lg">
              <AvatarFallback className={cn("bg-gradient-to-br text-3xl font-bold text-white", ME.avatarTone)}>
                {ME.initials}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/50 text-white transition-opacity",
              photoHover ? "opacity-100" : "opacity-0"
            )}>
              <Camera className="h-6 w-6" />
              <span className="mt-1 text-[10px] font-semibold">Changer la photo</span>
            </div>
            <button className="absolute bottom-1 right-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-white ring-2 ring-background shadow">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">{ME.name}</h2>
              <p className="text-sm text-muted-foreground">{ME.matricule} · {ME.gender === "F" ? "Étudiante" : "Étudiant"}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge className="bg-success/12 text-success border-success/30 hover:bg-success/15">Boursière active</Badge>
                <Badge variant="outline">{ME.bourseType}</Badge>
                <Badge variant="outline">{ME.promo}</Badge>
              </div>
            </div>
            <div className="flex gap-3 text-sm text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-bold text-success">{ME.gpa}</p>
                <p className="text-[11px]">Moy. /20</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{valides}/{MES_DOCS.length}</p>
                <p className="text-[11px]">Docs validés</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-muted-foreground">{ME.versementsRecus}/{ME.versementsTotal}</p>
                <p className="text-[11px]">Versements</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        {/* Left — infos perso */}
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Prénom" value="Nadia" icon={User} editing={editing} />
                <Field label="Nom de famille" value="Ondo" icon={User} editing={editing} />
                <Field label="Date de naissance" value={ME.birth} icon={Calendar} editing={editing} />
                <Field label="Ville de naissance" value={ME.birthCity} icon={MapPin} editing={editing} />
                <Field label="Email" value={ME.email} icon={Mail} editing={editing} type="email" />
                <Field label="Téléphone" value={ME.phone} icon={Phone} editing={editing} type="tel" />
              </div>
              <Separator />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nationalité" value="Gabonaise" icon={MapPin} editing={editing} />
                <Field label="Ville de résidence" value="Libreville" icon={MapPin} editing={editing} />
                <Field label="Adresse" value="Quartier Glass, Libreville" icon={MapPin} editing={editing} />
                <Field label="Contact d'urgence" value="+241 07 98 76 54" icon={Phone} editing={editing} type="tel" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Informations académiques</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <Field label="Établissement" value={ME.school} icon={MapPin} editing={false} />
              <Field label="Filière" value={ME.filiere} icon={User} editing={false} />
              <Field label="Niveau actuel" value={ME.niveau} icon={User} editing={false} />
              <Field label="Promotion" value={ME.promo} icon={Calendar} editing={false} />
              <Field label="Référent COMILOG" value={ME.referent} icon={User} editing={false} />
              <Field label="Inscrit depuis" value={ME.joinedAt} icon={Calendar} editing={false} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Compte bancaire</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <Field label="Banque" value="BGFI Bank Gabon" icon={User} editing={editing} />
              <Field label="Titulaire" value={ME.name} icon={User} editing={false} />
              <div className="sm:col-span-2">
                <Field label="IBAN" value="GA21 0402 0001 0000 3421 0000 023" icon={User} editing={editing} mono />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right — documents */}
        <div className="space-y-5">
          {/* Doc stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{valides}</p>
              <p className="text-[11px] text-muted-foreground">Documents validés</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{aFournir}</p>
              <p className="text-[11px] text-muted-foreground">À fournir</p>
            </Card>
          </div>

          {/* Upload zone */}
          <div className="rounded-xl border-2 border-dashed bg-secondary/20 p-5 text-center hover:border-primary/40 transition-colors">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground/60" />
            <p className="mt-2 text-sm font-medium">Glisser un document ici</p>
            <p className="text-xs text-muted-foreground">PDF, JPG, PNG — max 10 Mo</p>
            <Button size="sm" variant="outline" className="mt-3 gap-1.5 text-xs">
              <Upload className="h-3 w-3" /> Parcourir
            </Button>
          </div>

          {/* Document list */}
          <Card className="overflow-hidden p-0">
            <div className="border-b px-4 py-3">
              <p className="text-sm font-semibold">Mes pièces justificatives</p>
            </div>
            <div className="divide-y">
              {MES_DOCS.map((doc, i) => {
                const cfg = STATUT_CFG[doc.statut];
                const Icon = cfg.icon;
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-secondary/20">
                    <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold", cfg.bg, cfg.cls)}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{doc.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={cn("rounded px-1 text-[9px] font-semibold", CAT_CLR[doc.cat] ?? "bg-secondary text-muted-foreground")}>{doc.cat}</span>
                        {doc.size !== "—" && <span className="text-[10px] text-muted-foreground">{doc.size}</span>}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <span className={cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold", cfg.bg, cfg.cls)}>
                        <Icon className="h-2.5 w-2.5" />{cfg.label}
                      </span>
                      {doc.statut === "valide" && (
                        <>
                          <button className="grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-accent"><Eye className="h-3 w-3" /></button>
                          <button className="grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-accent"><Download className="h-3 w-3" /></button>
                        </>
                      )}
                      {doc.statut === "a_fournir" && (
                        <Button size="sm" className="h-6 gap-0.5 px-2 text-[10px]"><Upload className="h-2.5 w-2.5" />Déposer</Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, icon: Icon, editing, type = "text", mono = false,
}: {
  label: string; value: string; icon: typeof User; editing: boolean; type?: string; mono?: boolean;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {editing ? (
        <Input type={type} defaultValue={value} className={cn("h-8 text-sm", mono && "font-mono")} />
      ) : (
        <div className={cn("flex items-center gap-1.5 text-sm font-medium", mono && "font-mono text-xs")}>
          <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {value}
        </div>
      )}
    </div>
  );
}

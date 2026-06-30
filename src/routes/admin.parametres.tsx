import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Settings, Bell, Shield, Users, Plug, Globe, Save, Building2, Mail,
  Smartphone, Lock, Eye, AlertTriangle, CheckCircle2, Info, RefreshCw,
  ChevronRight, Upload,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/parametres")({
  head: () => ({ meta: [{ title: "Paramètres — YAM'NA" }] }),
  component: ParametresPage,
});

const SECTIONS = [
  { id: "general", label: "Général", icon: Settings },
  { id: "programme", label: "Programme", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "securite", label: "Sécurité", icon: Shield },
  { id: "equipe", label: "Équipe & Rôles", icon: Users },
  { id: "integrations", label: "Intégrations", icon: Plug },
];

function ParametresPage() {
  const [section, setSection] = useState("general");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <PageHeader
        title="Paramètres"
        description="Configuration de la plateforme YAM'NA Scholar Hub — COMILOG / Eramet."
        actions={
          <Button size="sm" className="gap-1.5" onClick={handleSave}>
            {saved ? <><CheckCircle2 className="h-3.5 w-3.5" /> Enregistré</> : <><Save className="h-3.5 w-3.5" /> Sauvegarder</>}
          </Button>
        }
      />

      <div className="flex gap-6">
        {/* Left nav */}
        <Card className="w-52 shrink-0 self-start p-2">
          <nav className="space-y-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition",
                  section === s.id ? "bg-primary/8 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <s.icon className="h-4 w-4 shrink-0" />
                {s.label}
                {section === s.id && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-5">
          {section === "general" && <GeneralSection />}
          {section === "programme" && <ProgrammeSection />}
          {section === "notifications" && <NotificationsSection />}
          {section === "securite" && <SecuriteSection />}
          {section === "equipe" && <EquipeSection />}
          {section === "integrations" && <IntegrationsSection />}
        </div>
      </div>
    </div>
  );
}

function GeneralSection() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informations de l'organisation</CardTitle>
          <CardDescription>Identité de l'entité gestionnaire du programme.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-xl bg-primary/8 text-primary ring-2 ring-border">
              <Building2 className="h-9 w-9" />
            </div>
            <div>
              <p className="text-sm font-medium">Logo de l'organisation</p>
              <p className="text-xs text-muted-foreground">PNG, SVG · recommandé 200×200px</p>
              <Button variant="outline" size="sm" className="mt-2 h-8 gap-1.5 text-xs"><Upload className="h-3 w-3" /> Changer le logo</Button>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom de l'organisation" defaultValue="COMILOG — Compagnie Minière de l'Ogooué" />
            <Field label="Groupe parent" defaultValue="Eramet Group" />
            <Field label="Email contact" defaultValue="bourses@comilog.com" type="email" />
            <Field label="Téléphone" defaultValue="+241 01 40 10 10" type="tel" />
            <Field label="Site web" defaultValue="https://www.comilog.com" type="url" />
            <Field label="Pays" defaultValue="Gabon" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Adresse postale</Label>
            <Textarea defaultValue="B.P. 27, Moanda, Province du Haut-Ogooué, Gabon" rows={2} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Préférences d'affichage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Langue de l'interface</Label>
              <Select defaultValue="fr">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Fuseau horaire</Label>
              <Select defaultValue="africa">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="africa">Africa/Libreville (WAT +1)</SelectItem>
                  <SelectItem value="paris">Europe/Paris (CET +1)</SelectItem>
                  <SelectItem value="montreal">America/Montreal (EST -5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Format de date</Label>
              <Select defaultValue="dd-mm-yyyy">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">JJ/MM/AAAA</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/JJ/AAAA</SelectItem>
                  <SelectItem value="yyyy-mm-dd">AAAA-MM-JJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Devise</Label>
              <Select defaultValue="fcfa">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fcfa">FCFA (XAF)</SelectItem>
                  <SelectItem value="eur">Euro (EUR)</SelectItem>
                  <SelectItem value="cad">Dollar canadien (CAD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ProgrammeSection() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Paramètres du programme</CardTitle>
          <CardDescription>Règles métier et critères d'éligibilité globaux.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Année académique en cours" defaultValue="2024–2025" />
            <Field label="Session active" defaultValue="Session 2024-2025 S1" />
            <Field label="GPA minimum (sur 20)" defaultValue="12" type="number" />
            <Field label="Enveloppe budgétaire annuelle (FCFA)" defaultValue="2 400 000 000" />
            <Field label="Montant max par boursier (FCFA)" defaultValue="2 500 000" />
            <Field label="Délai traitement dossier (jours)" defaultValue="30" type="number" />
          </div>
          <Separator />
          <div className="space-y-3">
            <ToggleSetting label="Renouvellement automatique des bourses" desc="Renouvelle les bourses actives sous conditions de GPA" defaultChecked />
            <ToggleSetting label="Validation multi-niveau obligatoire" desc="Requiert référent + comité pour toute décision finale" defaultChecked />
            <ToggleSetting label="Score automatique à réception" desc="Calcul automatique du score d'éligibilité à chaque dépôt" defaultChecked />
            <ToggleSetting label="Alertes budget en temps réel" desc="Notification quand l'enveloppe dépasse 80% de consommation" defaultChecked />
            <ToggleSetting label="Candidatures en ligne (portail étudiant)" desc="Autoriser les dépôts de candidature via le portail public" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Documents obligatoires</CardTitle>
          <CardDescription>Pièces requises pour tout dossier de candidature.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Pièce d'identité nationale",
            "Certificat de scolarité de l'année en cours",
            "Relevés de notes des 2 dernières années",
            "Lettre de motivation (min. 500 mots)",
            "Attestation bancaire (RIB)",
            "Justificatif de domicile (moins de 3 mois)",
            "Acte de naissance",
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border bg-secondary/30 px-3 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm">{doc}</span>
              </div>
              <Badge variant="secondary" className="text-[10px]">Obligatoire</Badge>
            </div>
          ))}
          <Button variant="outline" size="sm" className="mt-2 gap-1.5"><Settings className="h-3.5 w-3.5" /> Gérer la liste</Button>
        </CardContent>
      </Card>
    </>
  );
}

function NotificationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Préférences de notification</CardTitle>
        <CardDescription>Configurez les alertes et notifications envoyées à l'équipe.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
          <div className="space-y-3">
            <ToggleSetting label="Nouvelle candidature reçue" desc="Notifier les gestionnaires à chaque nouveau dépôt" defaultChecked />
            <ToggleSetting label="Dossier validé / refusé" desc="Notification au candidat et à l'équipe" defaultChecked />
            <ToggleSetting label="Paiement initié ou confirmé" desc="Confirmation de virement automatique" defaultChecked />
            <ToggleSetting label="Document manquant ou expiré" desc="Alerte quand une pièce est manquante ou à renouveler" defaultChecked />
            <ToggleSetting label="Rappels de comité" desc="Rappel 48h avant chaque réunion de comité" defaultChecked />
          </div>
        </div>
        <Separator />
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Seuils d'alerte</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Seuil alerte budget (%)" defaultValue="80" type="number" />
            <Field label="Délai relance dossier incomplet (jours)" defaultValue="7" type="number" />
          </div>
        </div>
        <Separator />
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rapport périodique</p>
          <div className="space-y-3">
            <ToggleSetting label="Rapport hebdomadaire d'activité" desc="Envoyé chaque lundi à 08:00" defaultChecked />
            <ToggleSetting label="Rapport mensuel de paiements" desc="Récapitulatif de tous les versements du mois" defaultChecked />
            <ToggleSetting label="Rapport trimestriel (DG COMILOG)" desc="Bilan synthétique transmis à la direction" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SecuriteSection() {
  return (
    <>
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning-foreground" />
            <CardTitle className="text-sm text-warning-foreground">Sécurité du compte</CardTitle>
          </div>
          <CardDescription>2 recommandations de sécurité en attente d'action.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-warning/30 bg-warning/10 px-3 py-2">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-warning-foreground" />
              <div>
                <p className="text-sm font-medium">Authentification à deux facteurs</p>
                <p className="text-xs text-muted-foreground">Renforcez la sécurité de votre compte</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="h-8 text-xs">Activer</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Politique de mot de passe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Longueur minimale</Label>
              <Select defaultValue="12">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8 caractères</SelectItem>
                  <SelectItem value="10">10 caractères</SelectItem>
                  <SelectItem value="12">12 caractères</SelectItem>
                  <SelectItem value="16">16 caractères</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Expiration (jours)</Label>
              <Select defaultValue="90">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 jours</SelectItem>
                  <SelectItem value="60">60 jours</SelectItem>
                  <SelectItem value="90">90 jours</SelectItem>
                  <SelectItem value="180">180 jours</SelectItem>
                  <SelectItem value="0">Jamais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <ToggleSetting label="Majuscules et minuscules requises" defaultChecked />
            <ToggleSetting label="Chiffres obligatoires" defaultChecked />
            <ToggleSetting label="Caractères spéciaux obligatoires" defaultChecked />
            <ToggleSetting label="Blocage après 5 tentatives échouées" defaultChecked />
            <ToggleSetting label="Session unique (désactiver connexion multiple)" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Journal d'audit</CardTitle>
          <CardDescription>Toutes les actions sensibles sont tracées et archivées.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ToggleSetting label="Journalisation des connexions" defaultChecked />
          <ToggleSetting label="Journalisation des modifications de dossiers" defaultChecked />
          <ToggleSetting label="Journalisation des paiements" defaultChecked />
          <Separator />
          <Button variant="outline" size="sm" className="gap-1.5"><Eye className="h-3.5 w-3.5" /> Consulter le journal d'audit</Button>
        </CardContent>
      </Card>
    </>
  );
}

function EquipeSection() {
  const ROLES = [
    { id: "super_admin", label: "Super Admin", desc: "Accès complet — gestion plateforme, tous modules", count: 1, cls: "text-destructive" },
    { id: "gestionnaire", label: "Gestionnaire", desc: "Gestion dossiers, paiements, documents", count: 2, cls: "text-primary" },
    { id: "referent", label: "Référent pédagogique", desc: "Instruction dossiers, commentaires, validation étape", count: 2, cls: "text-info" },
    { id: "comite", label: "Membre du comité", desc: "Délibération, vote, accès lecture dossiers complets", count: 2, cls: "text-gold-foreground" },
    { id: "lecture", label: "Lecture seule", desc: "Consultation uniquement — aucune modification", count: 1, cls: "text-muted-foreground" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Rôles et permissions</CardTitle>
        <CardDescription>Définissez les niveaux d'accès pour chaque profil utilisateur.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {ROLES.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-lg border bg-secondary/30 px-4 py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-semibold", r.cls)}>{r.label}</span>
                <Badge variant="secondary" className="h-5 rounded-md px-1.5 text-[10px]">{r.count} utilisateur{r.count > 1 ? "s" : ""}</Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 shrink-0 text-xs">Configurer</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function IntegrationsSection() {
  const INTEGRATIONS = [
    { name: "BGFI Bank API", desc: "Virements automatiques vers comptes BGFI Gabon", statut: "connecte", icon: "🏦" },
    { name: "Microsoft Azure AD", desc: "Authentification SSO via annuaire COMILOG", statut: "connecte", icon: "☁️" },
    { name: "SendGrid Email", desc: "Envoi automatique d'emails transactionnels", statut: "connecte", icon: "📧" },
    { name: "SWIFT / Virement international", desc: "Paiements internationaux France, Canada, Belgique", statut: "config", icon: "🌐" },
    { name: "UGB — Union Gabonaise de Banque", desc: "Virement domestique UGB", statut: "desactive", icon: "🏦" },
    { name: "Portail candidatures (API publique)", desc: "Dépôts de candidatures depuis le portail public", statut: "desactive", icon: "🖥️" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Intégrations & API</CardTitle>
        <CardDescription>Services tiers connectés à la plateforme YAM'NA.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {INTEGRATIONS.map((integ) => (
          <div key={integ.name} className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 transition hover:border-primary/30">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{integ.icon}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{integ.name}</p>
                  <IntegStatut s={integ.statut} />
                </div>
                <p className="text-xs text-muted-foreground">{integ.desc}</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-1.5">
              {integ.statut === "connecte" && <Button variant="ghost" size="sm" className="h-8 text-xs"><RefreshCw className="mr-1 h-3 w-3" />Sync</Button>}
              <Button variant="outline" size="sm" className="h-8 text-xs">
                {integ.statut === "desactive" ? "Activer" : "Configurer"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      <Input type={type} defaultValue={defaultValue} className="h-9" />
    </div>
  );
}

function ToggleSetting({ label, desc, defaultChecked }: { label: string; desc?: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{label}</p>
        {desc && <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} className="shrink-0" />
    </div>
  );
}

function IntegStatut({ s }: { s: string }) {
  const map = {
    connecte: { label: "Connecté", cls: "bg-success/12 text-success" },
    config: { label: "Config. requise", cls: "bg-warning/15 text-warning-foreground" },
    desactive: { label: "Désactivé", cls: "bg-muted text-muted-foreground" },
  }[s] ?? { label: s, cls: "bg-muted text-muted-foreground" };
  return <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-semibold", map.cls)}>{map.label}</span>;
}

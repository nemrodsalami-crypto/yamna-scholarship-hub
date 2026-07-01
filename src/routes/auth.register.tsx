import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle2, User, GraduationCap, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Candidater — YAM'NA" }] }),
  component: RegisterPage,
});

const STEPS = [
  { id: 1, label: "Identité",  icon: User },
  { id: 2, label: "Scolarité", icon: GraduationCap },
  { id: 3, label: "Compte",    icon: KeyRound },
];

function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function next() { setStep((s) => Math.min(s + 1, 3)); }
  function prev() { setStep((s) => Math.max(s - 1, 1)); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) { next(); return; }
    setLoading(true);
    setTimeout(() => navigate({ to: "/etudiant" }), 700);
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="space-y-6">
      {/* Retour */}
      <a
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
      >
        ← Retour à l'accueil
      </a>

      {/* En-tête */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[oklch(0.78_0.14_82)]">
          Programme COMILOG · Session 2025-2026
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight">Candidater à une bourse</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Complétez les 3 étapes pour soumettre votre dossier.
        </p>
      </div>

      {/* Stepper */}
      <div>
        {/* Barre de progression */}
        <div className="relative mb-5 h-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-[oklch(0.78_0.14_82)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-start justify-between">
          {STEPS.map((s) => {
            const done   = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border-2 transition-all duration-300",
                  done   ? "border-[oklch(0.78_0.14_82)] bg-[oklch(0.78_0.14_82)] text-[oklch(0.22_0.05_60)]"
                         : active ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background text-muted-foreground"
                )}>
                  {done
                    ? <CheckCircle2 className="h-4 w-4" />
                    : <s.icon className="h-3.5 w-3.5" />
                  }
                </div>
                <span className={cn(
                  "text-[10px] font-semibold uppercase tracking-wide",
                  active ? "text-foreground" : done ? "text-[oklch(0.78_0.14_82)]" : "text-muted-foreground"
                )}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contenu étape */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Étape 1 — Identité */}
          {step === 1 && (
            <>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Informations personnelles
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Prénom <span className="text-destructive">*</span></Label>
                  <Input className="h-10" placeholder="Marie" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Nom <span className="text-destructive">*</span></Label>
                  <Input className="h-10" placeholder="Obame" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Date de naissance <span className="text-destructive">*</span></Label>
                <Input className="h-10" type="date" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Nationalité <span className="text-destructive">*</span></Label>
                  <Select required>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ga">Gabonaise</SelectItem>
                      <SelectItem value="cm">Camerounaise</SelectItem>
                      <SelectItem value="cg">Congolaise</SelectItem>
                      <SelectItem value="fr">Française</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Ville de résidence</Label>
                  <Input className="h-10" placeholder="Libreville" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>CNI / Passeport <span className="text-destructive">*</span></Label>
                <Input className="h-10" placeholder="GA00000000" required />
              </div>
            </>
          )}

          {/* Étape 2 — Scolarité */}
          {step === 2 && (
            <>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Parcours académique
              </p>
              <div className="space-y-1.5">
                <Label>Établissement <span className="text-destructive">*</span></Label>
                <Select required>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inptic">INPTIC — Libreville</SelectItem>
                    <SelectItem value="ustm">USTM — Franceville</SelectItem>
                    <SelectItem value="ensp">ENSP — Libreville</SelectItem>
                    <SelectItem value="flsh">FLSH — Libreville</SelectItem>
                    <SelectItem value="autre">Autre établissement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Filière <span className="text-destructive">*</span></Label>
                  <Input className="h-10" placeholder="Génie logiciel" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Niveau <span className="text-destructive">*</span></Label>
                  <Select required>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Niveau…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="l1">Licence 1</SelectItem>
                      <SelectItem value="l2">Licence 2</SelectItem>
                      <SelectItem value="l3">Licence 3</SelectItem>
                      <SelectItem value="m1">Master 1</SelectItem>
                      <SelectItem value="m2">Master 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Moyenne / 20</Label>
                  <Input className="h-10" type="number" min="0" max="20" step="0.01" placeholder="14.5" />
                </div>
                <div className="space-y-1.5">
                  <Label>Année</Label>
                  <Select>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Année…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024-2025</SelectItem>
                      <SelectItem value="2023">2023-2024</SelectItem>
                      <SelectItem value="2022">2022-2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Type de bourse <span className="text-destructive">*</span></Label>
                <Select required>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Bourse d'excellence</SelectItem>
                    <SelectItem value="social">Bourse sociale</SelectItem>
                    <SelectItem value="mobilite">Mobilité internationale</SelectItem>
                    <SelectItem value="alternance">Alternance COMILOG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Étape 3 — Compte */}
          {step === 3 && (
            <>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Création de votre accès
              </p>
              <div className="space-y-1.5">
                <Label>Adresse e-mail <span className="text-destructive">*</span></Label>
                <Input className="h-10" type="email" placeholder="vous@email.com" required />
              </div>
              <div className="space-y-1.5">
                <Label>Téléphone <span className="text-destructive">*</span></Label>
                <Input className="h-10" type="tel" placeholder="+241 06 00 00 00" required />
              </div>
              <div className="space-y-1.5">
                <Label>Mot de passe <span className="text-destructive">*</span></Label>
                <Input className="h-10" type="password" placeholder="••••••••" required />
                <p className="text-[11px] text-muted-foreground">
                  12 caractères min. · 1 majuscule · 1 chiffre · 1 caractère spécial
                </p>
              </div>
              <div className="space-y-1.5">
                <Label>Confirmer le mot de passe <span className="text-destructive">*</span></Label>
                <Input className="h-10" type="password" placeholder="••••••••" required />
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Checkbox id="cgu" className="mt-0.5" required />
                <Label htmlFor="cgu" className="text-xs font-normal leading-relaxed text-muted-foreground">
                  J'accepte les{" "}
                  <a href="#" className="text-primary hover:underline">conditions d'utilisation</a>{" "}
                  et la{" "}
                  <a href="#" className="text-primary hover:underline">politique de confidentialité</a>{" "}
                  du programme YAM'NA.
                </Label>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className={cn("flex gap-2 pt-1", step > 1 ? "" : "")}>
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 flex-1"
                onClick={prev}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
              </Button>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className={cn(
                "h-11 flex-1 font-semibold",
                step === 3
                  ? "bg-[oklch(0.78_0.14_82)] text-[oklch(0.22_0.05_60)] hover:bg-[oklch(0.74_0.14_82)] shadow-sm"
                  : ""
              )}
            >
              {step < 3
                ? <>Suivant <ArrowRight className="ml-2 h-4 w-4" /></>
                : loading
                  ? "Création du compte…"
                  : <>Soumettre ma candidature <ArrowRight className="ml-2 h-4 w-4" /></>
              }
            </Button>
          </div>
        </form>
      </div>

      {/* Indicateur */}
      <p className="text-center text-xs text-muted-foreground">
        Étape <span className="font-semibold text-foreground">{step}</span> sur {STEPS.length}
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}

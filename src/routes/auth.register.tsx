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
  { id: 1, label: "Identité", icon: User },
  { id: 2, label: "Scolarité", icon: GraduationCap },
  { id: 3, label: "Compte", icon: KeyRound },
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

  return (
    <div>
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Candidater à une bourse</h1>
        <p className="mt-1 text-sm text-muted-foreground">Programme COMILOG — Session 2025-2026</p>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex items-center gap-0">
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-bold transition-all",
                  done ? "border-success bg-success text-white"
                    : active ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                )}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-3.5 w-3.5" />}
                </div>
                <span className={cn("mt-1 text-[10px] font-medium", active ? "text-foreground" : "text-muted-foreground")}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("mb-3.5 h-px flex-1 transition-colors", done ? "bg-success" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Étape 1 — Identité */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Prénom <span className="text-destructive">*</span></Label>
                <Input placeholder="Marie" required />
              </div>
              <div className="space-y-1.5">
                <Label>Nom <span className="text-destructive">*</span></Label>
                <Input placeholder="Obame" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Date de naissance <span className="text-destructive">*</span></Label>
              <Input type="date" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Nationalité <span className="text-destructive">*</span></Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
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
                <Input placeholder="Libreville" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Numéro CNI / Passeport <span className="text-destructive">*</span></Label>
              <Input placeholder="GA00000000" required />
            </div>
          </>
        )}

        {/* Étape 2 — Scolarité */}
        {step === 2 && (
          <>
            <div className="space-y-1.5">
              <Label>Établissement actuel <span className="text-destructive">*</span></Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
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
                <Label>Filière / Spécialité <span className="text-destructive">*</span></Label>
                <Input placeholder="Génie logiciel" required />
              </div>
              <div className="space-y-1.5">
                <Label>Niveau <span className="text-destructive">*</span></Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Niveau…" /></SelectTrigger>
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
                <Label>Moyenne générale (sur 20)</Label>
                <Input type="number" min="0" max="20" step="0.01" placeholder="14.5" />
              </div>
              <div className="space-y-1.5">
                <Label>Année d'inscription</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Année…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024-2025</SelectItem>
                    <SelectItem value="2023">2023-2024</SelectItem>
                    <SelectItem value="2022">2022-2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Type de bourse souhaité <span className="text-destructive">*</span></Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Bourse d'excellence</SelectItem>
                  <SelectItem value="social">Bourse sociale</SelectItem>
                  <SelectItem value="mobilite">Bourse de mobilité internationale</SelectItem>
                  <SelectItem value="alternance">Bourse en alternance COMILOG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Étape 3 — Compte */}
        {step === 3 && (
          <>
            <div className="space-y-1.5">
              <Label>Adresse e-mail <span className="text-destructive">*</span></Label>
              <Input type="email" placeholder="vous@email.com" required />
            </div>
            <div className="space-y-1.5">
              <Label>Téléphone <span className="text-destructive">*</span></Label>
              <Input type="tel" placeholder="+241 06 00 00 00" required />
            </div>
            <div className="space-y-1.5">
              <Label>Mot de passe <span className="text-destructive">*</span></Label>
              <Input type="password" placeholder="••••••••" required />
              <p className="text-[11px] text-muted-foreground">12 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial.</p>
            </div>
            <div className="space-y-1.5">
              <Label>Confirmer le mot de passe <span className="text-destructive">*</span></Label>
              <Input type="password" placeholder="••••••••" required />
            </div>
            <div className="flex items-start gap-2 pt-1">
              <Checkbox id="cgu" className="mt-0.5" required />
              <Label htmlFor="cgu" className="text-xs font-normal leading-relaxed text-muted-foreground">
                J'accepte les <a href="#" className="text-primary hover:underline">conditions d'utilisation</a> et la{" "}
                <a href="#" className="text-primary hover:underline">politique de confidentialité</a> de YAM'NA.
              </Label>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex gap-2 pt-2">
          {step > 1 && (
            <Button type="button" variant="outline" size="lg" className="h-11 flex-1" onClick={prev}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
            </Button>
          )}
          <Button type="submit" size="lg" className="h-11 flex-1" disabled={loading}>
            {step < 3
              ? <>Suivant <ArrowRight className="ml-2 h-4 w-4" /></>
              : loading ? "Création du compte…" : <>Créer mon compte <ArrowRight className="ml-2 h-4 w-4" /></>
            }
          </Button>
        </div>
      </form>

      {/* Indicateur étape */}
      <p className="mt-5 text-center text-[11px] text-muted-foreground">
        Étape {step} sur {STEPS.length}
      </p>

      <p className="mt-3 text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link to="/auth/login" className="font-medium text-primary hover:underline">Se connecter</Link>
      </p>
    </div>
  );
}

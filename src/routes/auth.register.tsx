import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Candidater — YAM’NA" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div>
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-foreground">
          Session 2025–2026
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Créer mon compte candidat</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Première étape vers votre candidature au programme de bourses COMILOG.
        </p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="fn">Prénom</Label>
            <Input id="fn" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ln">Nom</Label>
            <Input id="ln" required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input id="email" type="email" placeholder="vous@email.com" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tel">Téléphone</Label>
          <Input id="tel" type="tel" placeholder="+241 ..." required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pwd">Mot de passe</Label>
          <Input id="pwd" type="password" required />
          <p className="text-[11px] text-muted-foreground">12 caractères, dont 1 majuscule, 1 chiffre et 1 caractère spécial.</p>
        </div>
        <div className="flex items-start gap-2 pt-1">
          <Checkbox id="cgu" className="mt-0.5" />
          <Label htmlFor="cgu" className="text-xs font-normal leading-relaxed text-muted-foreground">
            J’accepte les <a href="#" className="text-primary hover:underline">conditions d’utilisation</a> et la <a href="#" className="text-primary hover:underline">politique de confidentialité</a> de YAM’NA.
          </Label>
        </div>
        <Button type="submit" size="lg" className="h-11 w-full" asChild>
          <Link to="/auth/mfa">Créer mon compte <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Vous avez déjà un compte ?{" "}
        <Link to="/auth/login" className="font-medium text-primary hover:underline">Se connecter</Link>
      </p>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight, KeyRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Connexion — YAM’NA" }, { name: "description", content: "Connectez-vous à votre espace YAM’NA." }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Bon retour 👋</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Connectez-vous à votre espace YAM’NA.</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/auth/mfa" }); }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">Adresse e-mail professionnelle</Label>
          <Input id="email" type="email" placeholder="prenom.nom@comilog.com" autoComplete="email" required />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link to="/auth/forgot" className="text-xs font-medium text-primary hover:underline">Mot de passe oublié ?</Link>
          </div>
          <div className="relative">
            <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" required className="pr-10" />
            <button type="button" onClick={() => setShow(!show)} aria-label="Afficher le mot de passe"
              className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-accent">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">Garder ma session active 30 jours</Label>
        </div>
        <Button type="submit" size="lg" className="h-11 w-full">
          Se connecter <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Separator className="flex-1" /> ou <Separator className="flex-1" />
      </div>

      <Button variant="outline" size="lg" className="h-11 w-full" asChild>
        <Link to="/auth/login">
          <KeyRound className="mr-2 h-4 w-4" /> Continuer avec le SSO COMILOG
        </Link>
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link to="/auth/register" className="font-medium text-primary hover:underline">Candidater</Link>
      </p>
    </div>
  );
}

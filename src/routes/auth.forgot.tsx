import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({ meta: [{ title: "Mot de passe oublié — YAM’NA" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  return (
    <div>
      <Link to="/auth/login" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Retour à la connexion
      </Link>
      <div className="mb-8">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Mot de passe oublié ?</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Saisissez votre adresse e-mail, nous vous enverrons un lien de réinitialisation sécurisé.
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input id="email" type="email" placeholder="prenom.nom@comilog.com" required />
        </div>
        <Button type="submit" size="lg" className="h-11 w-full">Envoyer le lien</Button>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Le lien est valide 30 minutes. Pensez à vérifier vos spams.
      </p>
    </div>
  );
}

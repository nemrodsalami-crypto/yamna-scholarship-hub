import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({ meta: [{ title: "Mot de passe oublié — YAM'NA" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="space-y-6">
      {/* Retour */}
      <a
        href="/auth/login"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
      >
        ← Retour à la connexion
      </a>

      {/* Icône */}
      <div className="flex flex-col items-start gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[oklch(0.78_0.14_82)]/12 ring-1 ring-[oklch(0.78_0.14_82)]/30">
          {sent
            ? <CheckCircle2 className="h-7 w-7 text-[oklch(0.78_0.14_82)]" />
            : <Mail className="h-7 w-7 text-[oklch(0.78_0.14_82)]" />
          }
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {sent ? "Lien envoyé !" : "Mot de passe oublié ?"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {sent
              ? "Vérifiez votre boîte mail. Le lien de réinitialisation est valide 30 minutes."
              : "Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation sécurisé."
            }
          </p>
        </div>
      </div>

      {!sent && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">Adresse e-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="prenom.nom@email.com"
              className="h-11"
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full bg-[oklch(0.78_0.14_82)] font-semibold text-[oklch(0.22_0.05_60)] hover:bg-[oklch(0.74_0.14_82)] shadow-sm"
          >
            Envoyer le lien <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}

      {sent && (
        <Button asChild size="lg" variant="outline" className="h-11 w-full">
          <Link to="/auth/login">Retour à la connexion</Link>
        </Button>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Pensez à vérifier vos spams si vous ne recevez rien.
      </p>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { ShieldCheck, Smartphone } from "lucide-react";

export const Route = createFileRoute("/auth/mfa")({
  head: () => ({ meta: [{ title: "Double authentification — YAM’NA" }] }),
  component: MfaPage,
});

function MfaPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-foreground">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Vérification en deux étapes</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Saisissez le code à 6 chiffres généré par votre application d’authentification.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-xl border bg-secondary/50 p-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-card text-primary">
          <Smartphone className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium">Application liée</p>
          <p className="truncate text-xs text-muted-foreground">Google Authenticator · ****72</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" size="lg" className="h-11 w-full" asChild>
          <Link to="/admin">Vérifier et continuer</Link>
        </Button>
        <div className="flex items-center justify-between text-xs">
          <Link to="/auth/login" className="text-muted-foreground hover:text-foreground">← Changer de compte</Link>
          <button type="button" className="font-medium text-primary hover:underline">Renvoyer le code</button>
        </div>
      </form>
    </div>
  );
}

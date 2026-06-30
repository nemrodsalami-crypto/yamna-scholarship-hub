import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, Check, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth/reset")({
  head: () => ({ meta: [{ title: "Nouveau mot de passe — YAM’NA" }] }),
  component: ResetPage,
});

const RULES = [
  { t: "Au moins 12 caractères", check: (s: string) => s.length >= 12 },
  { t: "1 majuscule et 1 minuscule", check: (s: string) => /[A-Z]/.test(s) && /[a-z]/.test(s) },
  { t: "1 chiffre", check: (s: string) => /\d/.test(s) },
  { t: "1 caractère spécial", check: (s: string) => /[^A-Za-z0-9]/.test(s) },
];

function ResetPage() {
  const [pwd, setPwd] = useState("");
  const score = RULES.filter((r) => r.check(pwd)).length;
  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Définir un nouveau mot de passe</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Choisissez un mot de passe robuste, unique à YAM’NA.</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="p1">Nouveau mot de passe</Label>
          <Input id="p1" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required />
        </div>
        <Progress value={(score / 4) * 100} className="h-1.5" />
        <ul className="grid gap-1.5 text-xs">
          {RULES.map((r) => {
            const ok = r.check(pwd);
            return (
              <li key={r.t} className={`flex items-center gap-2 ${ok ? "text-success" : "text-muted-foreground"}`}>
                {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />} {r.t}
              </li>
            );
          })}
        </ul>
        <div className="space-y-1.5 pt-2">
          <Label htmlFor="p2">Confirmer le mot de passe</Label>
          <Input id="p2" type="password" required />
        </div>
        <Button type="submit" size="lg" className="h-11 w-full" asChild>
          <Link to="/auth/login">Mettre à jour le mot de passe</Link>
        </Button>
      </form>
    </div>
  );
}

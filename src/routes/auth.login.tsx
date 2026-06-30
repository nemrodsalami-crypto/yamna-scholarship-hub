import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight, GraduationCap, Building2, BarChart3, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Connexion — YAM'NA" }] }),
  component: LoginPage,
});

type Role = "etudiant" | "ecole" | "admin";

const ROLES: { id: Role; label: string; icon: typeof GraduationCap; to: string; email: string; hint: string }[] = [
  { id: "etudiant", label: "Étudiant", icon: GraduationCap, to: "/etudiant", email: "nadia.ondo@inptic.ga", hint: "Boursière COMILOG — Licence 3 INPTIC" },
  { id: "ecole", label: "Référent École", icon: Building2, to: "/ecole", email: "referent@inptic.ga", hint: "Directeur pédagogique — INPTIC" },
  { id: "admin", label: "Administrateur", icon: BarChart3, to: "/admin", email: "admin@comilog.com", hint: "Direction Bourses COMILOG" },
];

function LoginPage() {
  const [role, setRole] = useState<Role>("etudiant");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const current = ROLES.find(r => r.id === role)!;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: current.to }), 600);
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight">Connexion</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sélectionnez votre espace puis saisissez vos identifiants.</p>
      </div>

      {/* Sélecteur de rôle */}
      <div className="mb-6 grid grid-cols-3 gap-1.5 rounded-xl border bg-secondary/40 p-1">
        {ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRole(r.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg py-2.5 text-xs font-medium transition-all",
              role === r.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <r.icon className="h-4 w-4" />
            {r.label}
          </button>
        ))}
      </div>

      {/* Hint identifiants démo */}
      <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-info/25 bg-info/6 px-3.5 py-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-info" />
        <div className="min-w-0 text-[11px] text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground">Identifiants de démonstration</p>
          <p className="mt-0.5 font-mono">{current.email}</p>
          <p className="font-mono">yamna2025</p>
          <p className="mt-1 italic">{current.hint}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            type="email"
            defaultValue={current.email}
            key={role}
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link to="/auth/forgot" className="text-xs text-primary hover:underline">Mot de passe oublié ?</Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              defaultValue="yamna2025"
              autoComplete="current-password"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-accent"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">Garder ma session active</Label>
        </div>
        <Button type="submit" size="lg" className="h-11 w-full" disabled={loading}>
          {loading ? "Connexion…" : <>Se connecter <ArrowRight className="ml-2 h-4 w-4" /></>}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link to="/auth/register" className="font-medium text-primary hover:underline">Candidater</Link>
      </p>
    </div>
  );
}

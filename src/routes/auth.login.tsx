import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight, GraduationCap, Building2, BarChart3 } from "lucide-react";
import { useAuthPanel } from "./auth";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Connexion — YAM'NA" }] }),
  component: LoginPage,
});

type Role = "etudiant" | "ecole" | "admin";

const ROLES: {
  id: Role;
  label: string;
  desc: string;
  icon: typeof GraduationCap;
  to: string;
  email: string;
  password: string;
}[] = [
  {
    id: "etudiant",
    label: "Espace Étudiant",
    desc: "Suivez votre bourse et vos paiements",
    icon: GraduationCap,
    to: "/etudiant",
    email: "nadia.ondo@inptic.ga",
    password: "yamna2025",
  },
  {
    id: "ecole",
    label: "Espace Référent École",
    desc: "Gérez vos étudiants boursiers",
    icon: Building2,
    to: "/ecole",
    email: "referent@inptic.ga",
    password: "yamna2025",
  },
  {
    id: "admin",
    label: "Administration COMILOG",
    desc: "Pilotage du programme",
    icon: BarChart3,
    to: "/admin",
    email: "admin@comilog.com",
    password: "yamna2025",
  },
];

function getRoleFromUrl(): Role | null {
  const r = new URLSearchParams(window.location.search).get("role") as Role | null;
  return ROLES.some((x) => x.id === r) ? r : null;
}

function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setPanelRole } = useAuthPanel();
  const [roleFromUrl] = useState<Role | null>(getRoleFromUrl);
  const current = ROLES.find((r) => r.id === roleFromUrl) ?? null;

  useEffect(() => {
    setPanelRole(roleFromUrl ?? "default");
  }, [roleFromUrl, setPanelRole]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!current) return;
    setLoading(true);
    setTimeout(() => navigate({ to: current.to as any }), 600);
  }

  /* ── Sélection d'espace ── */
  if (!roleFromUrl) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[oklch(0.78_0.14_82)]">
            Programme de bourses COMILOG
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Accédez à votre espace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sélectionnez le portail correspondant à votre profil.
          </p>
        </div>

        <div className="space-y-2.5">
          {ROLES.map((r) => (
            <a
              key={r.id}
              href={`/auth/login?role=${r.id}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <r.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{r.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-[11px] text-muted-foreground">
              Première candidature ?
            </span>
          </div>
        </div>

        <Button asChild size="lg" variant="outline" className="h-11 w-full">
          <Link to="/auth/register">Candidater à une bourse <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    );
  }

  /* ── Formulaire de connexion ── */
  return (
    <div className="space-y-6">
      {/* Retour */}
      <a
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
      >
        ← Retour à l'accueil
      </a>

      {/* En-tête espace */}
      <div className="rounded-xl border border-border bg-primary/4 px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <current.icon className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold leading-none text-foreground">{current.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{current.desc}</p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">Adresse e-mail</Label>
          <Input
            id="email"
            type="email"
            defaultValue={current.email}
            autoComplete="email"
            required
            className="h-11"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
            <Link to="/auth/forgot" className="text-xs text-primary hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              defaultValue={current.password}
              autoComplete="current-password"
              required
              className="h-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
            Garder ma session active
          </Label>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-12 w-full bg-[oklch(0.78_0.14_82)] font-semibold text-[oklch(0.22_0.05_60)] hover:bg-[oklch(0.74_0.14_82)] shadow-sm"
        >
          {loading ? "Connexion en cours…" : <>Se connecter <ArrowRight className="ml-2 h-4 w-4" /></>}
        </Button>
      </form>

      {/* Identifiants démo */}
      <div className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Démo
        </p>
        <p className="mt-1 font-mono text-xs text-foreground">{current.email}</p>
        <p className="font-mono text-xs text-foreground">{current.password}</p>
      </div>

      {roleFromUrl === "etudiant" && (
        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link to="/auth/register" className="font-semibold text-primary hover:underline">
            Candidater
          </Link>
        </p>
      )}
    </div>
  );
}

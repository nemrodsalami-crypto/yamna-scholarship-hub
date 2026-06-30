import { createFileRoute, Outlet } from "@tanstack/react-router";
import { YamnaLogo } from "@/components/yamna/logo";
import { ShieldCheck, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 surface-grid opacity-[0.08]" />
        <div className="absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full bg-info/30 blur-3xl" />
        <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-gold/30 blur-3xl" />

        <div className="relative">
          <YamnaLogo />
        </div>

        <div className="relative max-w-md space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">Plateforme COMILOG</p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-balance">
            Investir dans l’excellence, c’est bâtir le Gabon de demain.
          </h2>
          <div className="space-y-3 pt-2">
            {[
              { icon: ShieldCheck, t: "Sécurité MFA & audit complet" },
              { icon: Users, t: "Trois profils unifiés : admin, école, étudiant" },
              { icon: Sparkles, t: "Suivi en temps réel des paiements et dossiers" },
            ].map((f) => (
              <div key={f.t} className="flex items-center gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-3 backdrop-blur-sm">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary-foreground/10">
                  <f.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{f.t}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} COMILOG · YAM’NA — Programme de bourses étudiantes
        </p>
      </aside>

      {/* Form panel */}
      <main className="grid place-items-center px-4 py-12 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <YamnaLogo />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

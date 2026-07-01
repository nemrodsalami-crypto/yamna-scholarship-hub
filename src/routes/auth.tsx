import { createFileRoute, Outlet } from "@tanstack/react-router";
import { YamnaLogo } from "@/components/yamna/logo";
import { ShieldCheck, Users, Sparkles } from "lucide-react";
import { createContext, useContext, useState } from "react";

/* ── Contexte partagé layout ↔ pages ── */
export type AuthPanelRole = "etudiant" | "ecole" | "admin" | "default";

export const AuthPanelContext = createContext<{
  panelRole: AuthPanelRole;
  setPanelRole: (r: AuthPanelRole) => void;
}>({ panelRole: "default", setPanelRole: () => {} });

export function useAuthPanel() {
  return useContext(AuthPanelContext);
}

/* ── Configuration par rôle ── */
const PANEL: Record<AuthPanelRole, {
  image: string | null;
  badge: string;
  title: string;
}> = {
  etudiant: {
    image: "https://images.pexels.com/photos/8093006/pexels-photo-8093006.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    badge: "Espace Étudiant",
    title: "Suivez votre bourse, vos résultats et vos paiements en toute simplicité.",
  },
  ecole: {
    image: "https://images.pexels.com/photos/36079525/pexels-photo-36079525/free-photo-of-university-of-ghana-balme-library-in-accra.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    badge: "Espace Référent École",
    title: "Gérez les dossiers de vos étudiants boursiers et les paiements vers votre établissement.",
  },
  admin: {
    image: "https://images.pexels.com/photos/35082119/pexels-photo-35082119/free-photo-of-mining-engineer-on-site-with-safety-gear.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    badge: "Administration COMILOG",
    title: "Pilotage du programme de bourses COMILOG.",
  },
  default: {
    image: "https://images.pexels.com/photos/8093006/pexels-photo-8093006.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    badge: "Plateforme COMILOG",
    title: "Investir dans l'excellence, c'est bâtir le Gabon de demain.",
  },
};

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const [panelRole, setPanelRole] = useState<AuthPanelRole>("default");
  const config = PANEL[panelRole];

  return (
    <AuthPanelContext.Provider value={{ panelRole, setPanelRole }}>
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">

        {/* ── Panel gauche — image selon le rôle ── */}
        <aside className="relative hidden overflow-hidden bg-[oklch(0.22_0.06_254)] text-white lg:flex lg:flex-col lg:justify-between lg:p-12">

          {/* Barre or en haut */}
          <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-[oklch(0.78_0.14_82)]" />

          {/* Image de fond avec transition */}
          {config.image && (
            <div
              key={config.image}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{ backgroundImage: `url(${config.image})` }}
            />
          )}

          {/* Overlays vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/15" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />

          {/* Logo — agrandi sur le panel sombre */}
          <div className="relative z-10">
            <img
              src="/logo-eramet-comilog-white.png"
              alt="Eramet Comilog"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Contenu central */}
          <div className="relative z-10 max-w-md space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.78_0.14_82)]/40 bg-[oklch(0.78_0.14_82)]/15 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.14_82)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.78_0.14_82)]">
                {config.badge}
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
              {config.title}
            </h2>
            <div className="space-y-2 pt-1">
              {[
                { icon: ShieldCheck, t: "Sécurité MFA & audit complet" },
                { icon: Users, t: "Trois profils : admin, école, étudiant" },
                { icon: Sparkles, t: "Suivi temps réel des paiements et dossiers" },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3 border-l-2 border-[oklch(0.78_0.14_82)]/50 bg-black/20 px-4 py-2.5 backdrop-blur-sm">
                  <f.icon className="h-3.5 w-3.5 shrink-0 text-[oklch(0.78_0.14_82)]" />
                  <span className="text-sm font-medium text-white/85">{f.t}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-[11px] text-white/30">
            © {new Date().getFullYear()} COMILOG · Groupe Eramet · YAM'NA
          </p>
        </aside>

        {/* ── Formulaire ── */}
        <main className="grid place-items-center px-4 py-12 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <YamnaLogo />
            </div>
            <Outlet />
          </div>
        </main>

      </div>
    </AuthPanelContext.Provider>
  );
}

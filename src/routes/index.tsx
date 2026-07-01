import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, ShieldCheck, GraduationCap, Wallet, CheckCircle2,
  Building2, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { YamnaLogo } from "@/components/yamna/logo";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=90&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=1920&q=90&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1920&q=90&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=90&auto=format&fit=crop",
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(HERO_IMAGES.map(() => false));

  const markLoaded = (i: number) =>
    setLoaded((prev) => { const next = [...prev]; next[i] = true; return next; });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* préchargement silencieux */
  useEffect(() => {
    HERO_IMAGES.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => markLoaded(i);
    });
  }, []);

  return (
    <section className="relative min-h-[92vh] overflow-hidden border-b bg-gray-900">
      {/* Fond sombre pendant le chargement — évite les blancs */}

      {/* Images empilées en crossfade */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: loaded[i] ? `url(${src})` : undefined,
            opacity: i === current && loaded[i] ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay minimal : vignette douce, pas de couleur pleine */}
      {/* Gauche : léger dégradé sombre pour lire le texte */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
      {/* Bas : fondu doux */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      {/* Contenu */}
      <div className="relative z-10 mx-auto grid min-h-[92vh] max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-0 lg:items-center">

        {/* Texte gauche */}
        <div className="flex flex-col justify-center text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
            Le programme de bourses{" "}
            <span className="text-gold drop-shadow-none [text-shadow:none]">COMILOG</span>
            ,{" "}entièrement digitalisé.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            YAM'NA accompagne les étudiants gabonais les plus méritants
            tout au long de leur cursus : candidature en ligne, suivi
            académique et paiements transparents.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-gold text-primary hover:bg-gold/90 shadow-lg font-semibold [text-shadow:none]">
              <Link to="/auth/register">
                Candidater à une bourse <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild size="lg" variant="outline"
              className="border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white hover:border-white/70 [text-shadow:none]"
            >
              <Link to="/auth/login">J'ai déjà un compte</Link>
            </Button>
          </div>

          {/* Stats */}
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/25 pt-8">
            {[
              { v: "1 240+", l: "Boursiers suivis" },
              { v: "48", l: "Établissements partenaires" },
              { v: "12 ans", l: "D'engagement COMILOG" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-2xl font-bold tracking-tight text-white tabular-nums">{s.v}</dt>
                <dd className="mt-0.5 text-xs uppercase tracking-wider text-white/65">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Card accès — glassmorphism */}
        <div className="flex items-center lg:justify-end">
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl lg:max-w-none">
            <Button asChild size="lg" className="h-14 w-full text-base bg-gold text-primary hover:bg-gold/90 shadow font-semibold">
              <Link to="/auth/register">
                Candidater à une bourse <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-3 text-center text-xs text-white/65">
              Candidatures ouvertes jusqu'au{" "}
              <strong className="text-white/90">31 octobre 2025</strong>
            </p>

            <div className="mt-4 text-center">
              <Link
                to="/auth/login"
                className="text-sm text-white/65 underline-offset-4 hover:text-white hover:underline transition-colors"
              >
                J'ai déjà un compte
              </Link>
            </div>

            <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-white/40">
              <div className="h-px flex-1 bg-white/20" />
              Accès rapides
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <div className="space-y-1.5">
              {[
                { icon: GraduationCap, label: "Espace Étudiant", role: "etudiant" },
                { icon: Building2, label: "Espace Référent École", role: "ecole" },
              ].map(({ icon: Icon, label, role }) => (
                <a
                  key={label}
                  href={`/auth/login?role=${role}`}
                  className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white/75 transition hover:border-white/35 hover:bg-white/15 hover:text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0" /> {label}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                </a>
              ))}
            </div>

            <div className="mt-4 text-center">
              <a
                href="/auth/login?role=admin"
                className="text-[11px] text-white/35 underline-offset-4 hover:text-white/60 hover:underline transition-colors"
              >
                Accès administration
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de progression — automatique uniquement, pas de flèches */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {HERO_IMAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-gold" : "w-2 bg-white/35"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YAM'NA — Programme de bourses COMILOG" },
      { name: "description", content: "Découvrez YAM'NA, la plateforme officielle du programme de bourses étudiantes COMILOG. Candidatez en ligne et suivez votre dossier." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <img
              src="/logo-eramet-comilog.png"
              alt="Eramet Comilog"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#programme" className="hover:text-foreground">Programme</a>
            <a href="#parcours" className="hover:text-foreground">Parcours candidat</a>
            <a href="#chiffres" className="hover:text-foreground">Chiffres clés</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
              <Link to="/auth/login">J'ai déjà un compte</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/auth/register">Candidater <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <HeroCarousel />

      {/* Programme */}
      <section id="programme" className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Le programme</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Trois piliers pour faire grandir les talents gabonais
            </h2>
            <p className="mt-4 text-muted-foreground">
              YAM'NA structure l'engagement de COMILOG envers la jeunesse, de la candidature jusqu'à la diplomation.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: BookOpen, title: "Excellence académique", desc: "Sélection rigoureuse, suivi des résultats semestriels et accompagnement personnalisé." },
              { icon: Wallet, title: "Financement transparent", desc: "Paiements automatisés vers les étudiants et les écoles, justificatifs centralisés." },
              { icon: ShieldCheck, title: "Gouvernance maîtrisée", desc: "Comité de validation, journal d'audit complet et reporting institutionnel." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border bg-card p-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/8 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section id="parcours" className="border-b bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Parcours candidat</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Une candidature en 5 étapes claires</h2>
              <p className="mt-4 text-muted-foreground">
                Chaque étape est notifiée par email et dans votre espace. Vous savez à tout moment où en est votre dossier.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link to="/auth/register">Commencer ma candidature <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <ol className="space-y-3">
              {[
                "Création de compte et vérification e-mail",
                "Dépôt du dossier (état civil, scolarité, projet)",
                "Étude d'éligibilité par le service bourses",
                "Passage en comité de sélection",
                "Notification et activation de la bourse",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-4 rounded-xl border bg-card p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <p className="flex-1 pt-1.5 text-sm font-medium">{step}</p>
                  <CheckCircle2 className="h-4 w-4 shrink-0 self-center text-success" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section id="chiffres" className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
            {[
              { v: "1 240", l: "Boursiers actifs" },
              { v: "98%", l: "Taux de réussite" },
              { v: "48", l: "Établissements" },
              { v: "2,4 Md", l: "FCFA versés" },
            ].map((s) => (
              <div key={s.l} className="bg-card p-8 text-center">
                <p className="text-4xl font-bold tracking-tight text-primary tabular-nums">{s.v}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-xl">
            {/* Photo étudiante noire avec livres */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(https://images.pexels.com/photos/30575961/pexels-photo-30575961/free-photo-of-joyful-graduation-celebration-in-winneba-ghana.jpeg?auto=compress&cs=tinysrgb&w=1400&q=90)" }}
            />
            {/* Overlay identique au hero */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/20" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />

            {/* Contenu */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center sm:px-12 sm:py-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  Promotion 2025 — Candidatures ouvertes
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
                Rejoignez la promotion 2025<br className="hidden sm:block" /> des boursiers COMILOG
              </h2>
              <p className="mt-3 text-base text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
                Clôture des candidatures le{" "}
                <strong className="text-white">31 octobre 2025</strong>.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/auth/register"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-gold px-8 text-sm font-semibold text-primary shadow-lg transition hover:bg-gold/90"
                >
                  Candidater maintenant <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/auth/login"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  J'ai déjà un compte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <YamnaLogo />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} COMILOG · YAM'NA · Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Mentions légales</a>
            <a href="#" className="hover:text-foreground">Confidentialité</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ShieldCheck, GraduationCap, Wallet, Sparkles, CheckCircle2,
  Building2, BookOpen, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YamnaLogo } from "@/components/yamna/logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YAM’NA — Programme de bourses COMILOG" },
      { name: "description", content: "Découvrez YAM’NA, la plateforme officielle du programme de bourses étudiantes COMILOG. Candidatez en ligne et suivez votre dossier." },
      { property: "og:title", content: "YAM’NA — Programme de bourses COMILOG" },
      { property: "og:description", content: "Candidatez au programme de bourses COMILOG et suivez votre dossier en toute transparence." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <YamnaLogo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#programme" className="hover:text-foreground">Programme</a>
            <a href="#parcours" className="hover:text-foreground">Parcours candidat</a>
            <a href="#chiffres" className="hover:text-foreground">Chiffres clés</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth/login">Se connecter</Link>
            </Button>
            <Button asChild size="sm" className="shadow-sm">
              <Link to="/auth/register">Candidater <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 surface-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-foreground">
              <Sparkles className="mr-1.5 h-3 w-3" /> Session 2025–2026 ouverte
            </Badge>
            <h1 className="mt-5 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Le programme de bourses{" "}
              <span className="bg-gradient-to-br from-primary to-info bg-clip-text text-transparent">
                COMILOG
              </span>
              , entièrement digitalisé.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              YAM’NA accompagne les étudiants gabonais les plus méritants tout au long de leur cursus :
              candidature en ligne, suivi académique et paiements transparents.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow-sm">
                <Link to="/auth/register">Candidater à une bourse <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/auth/login">J’ai déjà un compte</Link>
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t pt-6">
              {[
                { v: "1 240+", l: "Boursiers suivis" },
                { v: "48", l: "Établissements partenaires" },
                { v: "12 ans", l: "D’engagement COMILOG" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-2xl font-bold tracking-tight text-foreground tabular-nums">{s.v}</dt>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sign-in card */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 via-info/10 to-gold/10 blur-2xl" />
            <div className="rounded-2xl border bg-card p-7 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accès rapide</p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight">Connectez-vous</h2>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Étudiants, référents et administrateurs accèdent à leur espace dédié.
              </p>
              <div className="mt-5 space-y-2">
                <Button asChild className="h-11 w-full justify-between">
                  <Link to="/auth/login">
                    <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Espace Étudiant</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 w-full justify-between">
                  <Link to="/auth/login">
                    <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Espace Référent École</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 w-full justify-between">
                  <Link to="/auth/login">
                    <span className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Espace Administrateur</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                <div className="h-px flex-1 bg-border" /> ou <div className="h-px flex-1 bg-border" />
              </div>
              <Button asChild variant="secondary" className="h-11 w-full justify-between bg-gold/15 text-gold-foreground hover:bg-gold/25">
                <Link to="/auth/register">
                  <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Candidater à une bourse</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-4 text-center text-[11px] text-muted-foreground">
                Période de candidature ouverte jusqu’au <strong className="text-foreground">31 octobre 2025</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Le programme</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Trois piliers pour faire grandir les talents gabonais
            </h2>
            <p className="mt-4 text-muted-foreground">
              YAM’NA structure l’engagement de COMILOG envers la jeunesse, de la candidature jusqu’à la diplomation.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: BookOpen, title: "Excellence académique", desc: "Sélection rigoureuse, suivi des résultats semestriels et accompagnement personnalisé." },
              { icon: Wallet, title: "Financement transparent", desc: "Paiements automatisés vers les étudiants et les écoles, justificatifs centralisés." },
              { icon: ShieldCheck, title: "Gouvernance maîtrisée", desc: "Comité de validation, journal d’audit complet et reporting institutionnel." },
            ].map((f) => (
              <div key={f.title} className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/8 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                <div className="absolute bottom-0 right-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/10 opacity-0 transition-opacity group-hover:opacity-100" />
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
                "Étude d’éligibilité par le service bourses",
                "Passage en comité de sélection",
                "Notification et activation de la bourse",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-4 rounded-xl border bg-card p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium">{step}</p>
                  </div>
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
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary to-info p-12 text-primary-foreground shadow-lg">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prêt·e à rejoindre la promotion 2025 ?</h2>
                <p className="mt-3 max-w-xl text-base text-primary-foreground/85">
                  Les candidatures sont ouvertes jusqu’au 31 octobre 2025. Préparez vos documents et lancez-vous.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button asChild size="lg" variant="secondary" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <Link to="/auth/register">Candidater maintenant <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/auth/login">Se connecter</Link>
                </Button>
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
            © {new Date().getFullYear()} COMILOG · YAM’NA · Tous droits réservés.
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

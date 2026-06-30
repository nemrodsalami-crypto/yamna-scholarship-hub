import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ShieldCheck, GraduationCap, Wallet, CheckCircle2,
  Building2, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { YamnaLogo } from "@/components/yamna/logo";

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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <YamnaLogo />
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 surface-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Le programme de bourses{" "}
              <span className="bg-gradient-to-br from-primary to-info bg-clip-text text-transparent">
                COMILOG
              </span>
              , entièrement digitalisé.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              YAM'NA accompagne les étudiants gabonais les plus méritants tout au long de leur cursus :
              candidature en ligne, suivi académique et paiements transparents.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow-sm">
                <Link to="/auth/register">Candidater à une bourse <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-muted-foreground">
                <Link to="/auth/login">J'ai déjà un compte</Link>
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t pt-6">
              {[
                { v: "1 240+", l: "Boursiers suivis" },
                { v: "48", l: "Établissements partenaires" },
                { v: "12 ans", l: "D'engagement COMILOG" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-2xl font-bold tracking-tight text-foreground tabular-nums">{s.v}</dt>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Card accès */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 via-info/10 to-gold/10 blur-2xl" />
            <div className="rounded-2xl border bg-card p-7 shadow-lg">
              {/* CTA principal */}
              <Button asChild size="lg" className="h-14 w-full text-base shadow-sm">
                <Link to="/auth/register">
                  Candidater à une bourse <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Candidatures ouvertes jusqu'au <strong className="text-foreground">31 octobre 2025</strong>
              </p>

              {/* Déjà un compte */}
              <div className="mt-4 text-center">
                <Link to="/auth/login" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  J'ai déjà un compte
                </Link>
              </div>

              {/* Séparateur */}
              <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                <div className="h-px flex-1 bg-border" /> Accès rapides <div className="h-px flex-1 bg-border" />
              </div>

              {/* Accès portails */}
              <div className="space-y-1.5">
                <Link
                  to="/etudiant"
                  className="flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm text-muted-foreground transition hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                >
                  <span className="flex items-center gap-2.5">
                    <GraduationCap className="h-4 w-4 shrink-0" /> Espace Étudiant
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                </Link>
                <Link
                  to="/ecole"
                  className="flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm text-muted-foreground transition hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                >
                  <span className="flex items-center gap-2.5">
                    <Building2 className="h-4 w-4 shrink-0" /> Espace Référent École
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                </Link>
              </div>

              <div className="mt-4 text-center">
                <Link to="/admin" className="text-[11px] text-muted-foreground/50 underline-offset-4 hover:text-muted-foreground hover:underline">
                  Accès administration
                </Link>
              </div>
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
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-info px-10 py-10 text-center text-primary-foreground shadow-lg">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/8 blur-3xl" />
            <div className="relative mx-auto max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Rejoignez la promotion 2025 des boursiers COMILOG
              </h2>
              <p className="mt-2 text-sm text-primary-foreground/75">
                Clôture des candidatures le <strong className="text-primary-foreground">31 octobre 2025</strong>.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <Button asChild size="default" className="bg-white px-6 font-semibold text-primary shadow hover:bg-white/90">
                  <Link to="/auth/register">Candidater maintenant <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
                <Link to="/auth/login" className="text-sm text-primary-foreground/65 underline-offset-4 hover:text-primary-foreground hover:underline">
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

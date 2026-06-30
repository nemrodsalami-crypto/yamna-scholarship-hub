import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Erreur 404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Page introuvable</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          La ressource que vous cherchez n’existe pas ou a été déplacée.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Retour à l’accueil
          </Link>
          <Link to="/admin" className="inline-flex h-9 items-center rounded-lg border bg-background px-4 text-sm font-medium hover:bg-accent">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-destructive">Erreur 500</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Cette page n’a pas chargé</h1>
        <p className="mt-3 text-sm text-muted-foreground">Une erreur est survenue. Vous pouvez réessayer ou revenir à l’accueil.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Réessayer
          </button>
          <a href="/" className="inline-flex h-9 items-center rounded-lg border bg-background px-4 text-sm font-medium hover:bg-accent">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "YAM’NA — Plateforme bourses étudiantes COMILOG" },
      { name: "description", content: "YAM’NA est la plateforme de gestion du programme de bourses étudiantes COMILOG : candidatures, suivi des boursiers, paiements et reporting." },
      { name: "author", content: "COMILOG" },
      { property: "og:title", content: "YAM’NA — Plateforme bourses étudiantes COMILOG" },
      { property: "og:description", content: "YAM’NA est la plateforme de gestion du programme de bourses étudiantes COMILOG : candidatures, suivi des boursiers, paiements et reporting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "YAM’NA — Plateforme bourses étudiantes COMILOG" },
      { name: "twitter:description", content: "YAM’NA est la plateforme de gestion du programme de bourses étudiantes COMILOG : candidatures, suivi des boursiers, paiements et reporting." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/771903c3-6e6e-4192-a17b-203234edf3fc/id-preview-0149e479--1008bb01-5235-488d-944e-0cfdc81bd18a.lovable.app-1782807511296.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/771903c3-6e6e-4192-a17b-203234edf3fc/id-preview-0149e479--1008bb01-5235-488d-944e-0cfdc81bd18a.lovable.app-1782807511296.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}

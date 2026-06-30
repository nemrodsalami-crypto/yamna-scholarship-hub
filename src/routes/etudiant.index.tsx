import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/etudiant/")({
  beforeLoad: () => { throw redirect({ to: "/etudiant/profil" }); },
  component: () => null,
});

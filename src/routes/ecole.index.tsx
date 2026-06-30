import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ecole/")({
  beforeLoad: () => { throw redirect({ to: "/ecole/paiements" }); },
  component: () => null,
});

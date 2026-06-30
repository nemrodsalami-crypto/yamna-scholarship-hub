import { cn } from "@/lib/utils";

export type YamnaStatus =
  | "recu" | "eligible" | "instruction" | "comite" | "accepte" | "refuse" | "attente"
  | "actif" | "suspendu" | "resilie" | "cloture"
  | "paye" | "en_attente" | "en_retard"
  | "brouillon" | "valide" | "rejete";

const MAP: Record<YamnaStatus, { label: string; tone: string }> = {
  recu: { label: "Dossier reçu", tone: "bg-info/10 text-info border-info/20" },
  eligible: { label: "Éligible", tone: "bg-info/10 text-info border-info/20" },
  instruction: { label: "En instruction", tone: "bg-gold/15 text-gold-foreground border-gold/30" },
  comite: { label: "Comité", tone: "bg-primary/10 text-primary border-primary/20" },
  accepte: { label: "Accepté", tone: "bg-success/12 text-success border-success/25" },
  refuse: { label: "Refusé", tone: "bg-destructive/10 text-destructive border-destructive/20" },
  attente: { label: "Liste d’attente", tone: "bg-muted text-muted-foreground border-border" },
  actif: { label: "Active", tone: "bg-success/12 text-success border-success/25" },
  suspendu: { label: "Suspendue", tone: "bg-warning/15 text-warning-foreground border-warning/30" },
  resilie: { label: "Résiliée", tone: "bg-destructive/10 text-destructive border-destructive/20" },
  cloture: { label: "Clôturée", tone: "bg-muted text-muted-foreground border-border" },
  paye: { label: "Payé", tone: "bg-success/12 text-success border-success/25" },
  en_attente: { label: "En attente", tone: "bg-gold/15 text-gold-foreground border-gold/30" },
  en_retard: { label: "En retard", tone: "bg-destructive/10 text-destructive border-destructive/20" },
  brouillon: { label: "Brouillon", tone: "bg-muted text-muted-foreground border-border" },
  valide: { label: "Validé", tone: "bg-success/12 text-success border-success/25" },
  rejete: { label: "Rejeté", tone: "bg-destructive/10 text-destructive border-destructive/20" },
};

export function StatusBadge({ status, className }: { status: YamnaStatus; className?: string }) {
  const s = MAP[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
      s.tone, className
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Filter, Plus, Download, Wallet, Clock, CheckCircle2, AlertTriangle,
  MoreHorizontal, ChevronDown, X, CreditCard, Calendar, Send,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/yamna/status-badge";
import { PAIEMENTS, fmtFcfa, type PaiementStatut } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/paiements")({
  head: () => ({ meta: [{ title: "Paiements — YAM'NA" }] }),
  component: PaiementsPage,
});

type PaiTab = "all" | PaiementStatut;

const TABS: { id: PaiTab; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "en_attente", label: "En attente" },
  { id: "paye", label: "Payés" },
  { id: "en_retard", label: "En retard" },
];

function PaiementsPage() {
  const [tab, setTab] = useState<PaiTab>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [showProg, setShowProg] = useState(false);

  const filtered = useMemo(() => PAIEMENTS.filter((p) => {
    const q = query.toLowerCase();
    const mQ = !q || p.etudiant.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q) || p.bourse.toLowerCase().includes(q);
    const mT = tab === "all" || p.statut === tab;
    return mQ && mT;
  }), [tab, query]);

  const counts = {
    all: PAIEMENTS.length,
    en_attente: PAIEMENTS.filter(p => p.statut === "en_attente").length,
    paye: PAIEMENTS.filter(p => p.statut === "paye").length,
    en_retard: PAIEMENTS.filter(p => p.statut === "en_retard").length,
  };

  const totalMois = PAIEMENTS.filter(p => p.statut === "paye").reduce((s, p) => s + p.montant, 0);
  const totalAttente = PAIEMENTS.filter(p => p.statut === "en_attente").reduce((s, p) => s + p.montant, 0);
  const totalRetard = PAIEMENTS.filter(p => p.statut === "en_retard").reduce((s, p) => s + p.montant, 0);

  function toggleSelect(id: string) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  return (
    <div>
      <PageHeader
        title="Paiements & Versements"
        description="Suivi des paiements et versements du programme COMILOG — Session 2024–2025."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
            <Button size="sm" className="gap-1.5" onClick={() => setShowProg(true)}><Plus className="h-3.5 w-3.5" /> Programmer un paiement</Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiPay icon={Wallet} label="Total versé (session)" value={fmtFcfa(totalMois)} sub={`${counts.paye} versements effectués`} tone="text-primary" bg="bg-primary/10" />
        <KpiPay icon={CheckCircle2} label="Payés ce mois" value={String(counts.paye)} sub={fmtFcfa(totalMois)} tone="text-success" bg="bg-success/12" />
        <KpiPay icon={Clock} label="En attente" value={String(counts.en_attente)} sub={fmtFcfa(totalAttente)} tone="text-gold-foreground" bg="bg-gold/15" />
        <KpiPay icon={AlertTriangle} label="En retard" value={String(counts.en_retard)} sub={fmtFcfa(totalRetard)} tone="text-destructive" bg="bg-destructive/10" />
      </div>

      {/* Toolbar */}
      <Card className="mb-4 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={tab} onValueChange={(v) => setTab(v as PaiTab)}>
            <TabsList className="h-9">
              {TABS.map(t => (
                <TabsTrigger key={t.id} value={t.id} className="h-7 gap-1.5 text-xs">
                  {t.label}
                  {t.id !== "all" && counts[t.id as keyof typeof counts] > 0 && (
                    <Badge variant={t.id === "en_retard" ? "destructive" : "secondary"} className="h-4 rounded-md px-1 text-[10px]">
                      {counts[t.id as keyof typeof counts]}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative min-w-[220px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Étudiant, référence, bourse…" className="h-9 pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" /> Filtres</Button>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border bg-primary/5 px-3 py-2">
            <span className="text-xs font-medium text-primary">{selected.length} sélectionné(s)</span>
            <div className="ml-auto flex gap-1.5">
              <Button size="sm" variant="outline" className="h-7 gap-1 text-xs"><Send className="h-3 w-3" /> Initier les virements</Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs">Exporter sélection</Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setSelected([])}><X className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        )}
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 pl-4">
                <Checkbox
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onCheckedChange={(v) => setSelected(v ? filtered.map(p => p.id) : [])}
                />
              </TableHead>
              <TableHead>Référence</TableHead>
              <TableHead>Étudiant</TableHead>
              <TableHead>Programme de bourse</TableHead>
              <TableHead>Trimestre</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead>Date prog.</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="pr-4 w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="cursor-pointer">
                <TableCell className="pl-4">
                  <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggleSelect(p.id)} />
                </TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{p.ref}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", p.etudiantTone)}>{p.etudiantInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{p.etudiant}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.bourse}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-md text-[10px]">{p.trimestre}</Badge>
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{fmtFcfa(p.montant)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.dateProg}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CreditCard className="h-3 w-3 shrink-0" />{p.methode}
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{p.banque}</p>
                </TableCell>
                <TableCell><PaiStatusBadge s={p.statut} /></TableCell>
                <TableCell className="pr-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir le détail</DropdownMenuItem>
                      <DropdownMenuItem>Télécharger reçu</DropdownMenuItem>
                      {p.statut !== "paye" && <DropdownMenuItem className="text-success">Marquer comme payé</DropdownMenuItem>}
                      {p.statut === "en_retard" && <DropdownMenuItem className="text-destructive">Signaler l'incident</DropdownMenuItem>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="grid place-items-center py-12 text-sm text-muted-foreground">Aucun paiement trouvé.</div>
        )}
      </Card>

      {/* Program payment dialog */}
      <Dialog open={showProg} onOpenChange={setShowProg}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Programmer un paiement</DialogTitle>
            <DialogDescription>Planifiez un versement pour un boursier du programme COMILOG.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Étudiant</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Sélectionner un étudiant…" /></SelectTrigger>
                <SelectContent>
                  {["Nadia Ondo", "Sandrine Bivigou", "Yann Mavoungou", "Mireille Andjoua", "Léa Mouele"].map(n => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Programme de bourse</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                <SelectContent>
                  {["Mérite Excellence", "International Excellence", "Filière prioritaire COMILOG"].map(n => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Trimestre</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="T…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="T1">T1 2024-25</SelectItem>
                    <SelectItem value="T2">T2 2024-25</SelectItem>
                    <SelectItem value="T3">T3 2024-25</SelectItem>
                    <SelectItem value="T4">T4 2024-25</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Montant (FCFA)</Label>
                <Input type="number" placeholder="312 500" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Date de virement prévue</Label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input type="date" className="pl-8" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Méthode de paiement</Label>
              <Select defaultValue="virement">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="virement">Virement bancaire (BGFI)</SelectItem>
                  <SelectItem value="swift">Virement SWIFT</SelectItem>
                  <SelectItem value="cheque">Chèque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProg(false)}>Annuler</Button>
            <Button onClick={() => setShowProg(false)}>Programmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function KpiPay({ icon: Icon, label, value, sub, tone, bg }: { icon: typeof Wallet; label: string; value: string; sub: string; tone: string; bg: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", bg, tone)}><Icon className="h-5 w-5" /></div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className={cn("text-lg font-bold tabular-nums leading-tight", tone)}>{value}</p>
        <p className="truncate text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </Card>
  );
}

function PaiStatusBadge({ s }: { s: PaiementStatut }) {
  const map = {
    paye: { label: "Payé", cls: "bg-success/12 text-success border-success/25" },
    en_attente: { label: "En attente", cls: "bg-gold/15 text-gold-foreground border-gold/30" },
    en_retard: { label: "En retard", cls: "bg-destructive/10 text-destructive border-destructive/20" },
  }[s];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", map.cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{map.label}
    </span>
  );
}

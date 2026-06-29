import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Filter, Plus, Download, LayoutGrid, List, ChevronDown,
  MoreHorizontal, Paperclip, MessageCircle, Star, Calendar, ArrowUpDown, X,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { StatusBadge } from "@/components/yamna/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CANDIDATURES, STAGES, type Candidature, type KanbanStage, fmtFcfa } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/candidatures")({
  head: () => ({ meta: [{ title: "Candidatures — YAM’NA" }] }),
  component: CandidaturesPage,
});

function CandidaturesPage() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [query, setQuery] = useState("");
  const [filiere, setFiliere] = useState<string>("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [items, setItems] = useState<Candidature[]>(CANDIDATURES);

  const filtered = useMemo(() => items.filter((c) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.ref.toLowerCase().includes(q) || c.school.toLowerCase().includes(q);
    const matchF = filiere === "all" || c.filiere === filiere;
    return matchQ && matchF;
  }), [items, query, filiere]);

  const byStage = useMemo(() => {
    const m = new Map<KanbanStage, Candidature[]>();
    STAGES.forEach((s) => m.set(s.id, []));
    filtered.forEach((c) => m.get(c.stage)?.push(c));
    return m;
  }, [filtered]);

  function moveTo(stage: KanbanStage) {
    if (!dragId) return;
    setItems((prev) => prev.map((c) => (c.id === dragId ? { ...c, stage } : c)));
    setDragId(null);
  }

  const filieres = Array.from(new Set(items.map((c) => c.filiere)));

  return (
    <div>
      <PageHeader
        title="Pipeline candidatures"
        description="Session 2025–2026 · Suivez chaque dossier de la réception à la notification."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Nouvelle candidature</Button>
          </>
        }
      />

      {/* Toolbar */}
      <Card className="mb-4 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher nom, référence, école…"
              className="h-9 pl-8"
            />
          </div>
          <Select value={filiere} onValueChange={setFiliere}>
            <SelectTrigger className="h-9 w-[180px]"><SelectValue placeholder="Filière" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes filières</SelectItem>
              {filieres.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" /> Filtres <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">2</Badge></Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><ArrowUpDown className="h-3.5 w-3.5" /> Trier</Button>
          <div className="ml-auto">
            <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "table")}>
              <TabsList className="h-9">
                <TabsTrigger value="kanban" className="h-7 gap-1.5 text-xs"><LayoutGrid className="h-3.5 w-3.5" /> Kanban</TabsTrigger>
                <TabsTrigger value="table" className="h-7 gap-1.5 text-xs"><List className="h-3.5 w-3.5" /> Tableau</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border bg-primary/5 px-3 py-2">
            <span className="text-xs font-medium text-primary">{selected.length} sélectionné(s)</span>
            <div className="ml-auto flex gap-1.5">
              <Button size="sm" variant="ghost" className="h-7 text-xs">Affecter référent</Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs">Programmer comité</Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive">Rejeter</Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setSelected([])}><X className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        )}
      </Card>

      {view === "kanban" ? (
        <div className="grid grid-flow-col auto-cols-[300px] gap-3 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const list = byStage.get(stage.id) ?? [];
            const total = list.reduce((sum, c) => sum + c.amount, 0);
            return (
              <div
                key={stage.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => moveTo(stage.id)}
                className="flex min-h-[600px] flex-col rounded-xl border bg-secondary/40"
              >
                <div className="flex items-start justify-between gap-2 border-b bg-card px-3 py-2.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-full", toneClass(stage.tone))} />
                      <h3 className="truncate text-sm font-semibold">{stage.label}</h3>
                      <Badge variant="secondary" className="h-5 rounded-md px-1.5 text-[10px]">{list.length}</Badge>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{stage.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"><Plus className="h-3.5 w-3.5" /></Button>
                </div>
                <div className="flex-1 space-y-2 p-2">
                  {list.map((c) => (
                    <KanbanCard
                      key={c.id}
                      c={c}
                      dragging={dragId === c.id}
                      onDragStart={() => setDragId(c.id)}
                      onDragEnd={() => setDragId(null)}
                    />
                  ))}
                  {list.length === 0 && (
                    <div className="grid h-24 place-items-center rounded-lg border border-dashed text-[11px] text-muted-foreground">
                      Glisser un dossier ici
                    </div>
                  )}
                </div>
                <div className="border-t bg-card px-3 py-2 text-[11px] text-muted-foreground">
                  Total demandé : <span className="font-semibold text-foreground tabular-nums">{fmtFcfa(total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10 pl-4">
                  <Checkbox
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onCheckedChange={(v) => setSelected(v ? filtered.map((c) => c.id) : [])}
                  />
                </TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Candidat</TableHead>
                <TableHead>Établissement</TableHead>
                <TableHead>Filière</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Référent</TableHead>
                <TableHead className="pr-4">MAJ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="cursor-pointer">
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={selected.includes(c.id)}
                      onCheckedChange={(v) => setSelected((s) => v ? [...s, c.id] : s.filter((x) => x !== c.id))}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{c.ref}</TableCell>
                  <TableCell>
                    <Link to="/admin/candidatures/$id" params={{ id: c.id }} className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7"><AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", c.avatarTone)}>{c.initials}</AvatarFallback></Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium hover:text-primary">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground">{c.niveau}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{c.school} · <span className="text-muted-foreground">{c.city}</span></TableCell>
                  <TableCell className="text-sm">{c.filiere}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">{fmtFcfa(c.amount)}</TableCell>
                  <TableCell><ScorePill score={c.score} /></TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.referent}</TableCell>
                  <TableCell className="pr-4 text-xs text-muted-foreground">{c.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

function KanbanCard({ c, dragging, onDragStart, onDragEnd }: { c: Candidature; dragging: boolean; onDragStart: () => void; onDragEnd: () => void }) {
  const completion = Math.round((c.documents / c.documentsRequired) * 100);
  return (
    <Link
      to="/admin/candidatures/$id"
      params={{ id: c.id }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={cn(
        "group/card block rounded-lg border bg-card p-3 shadow-xs transition hover:shadow-md hover:border-primary/40",
        dragging && "opacity-50 ring-2 ring-primary"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] text-muted-foreground">{c.ref}</span>
        <button className="rounded p-0.5 text-muted-foreground opacity-0 transition hover:bg-accent group-hover/card:opacity-100">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2.5">
        <Avatar className="h-9 w-9 shrink-0"><AvatarFallback className={cn("bg-gradient-to-br text-xs font-semibold text-white", c.avatarTone)}>{c.initials}</AvatarFallback></Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight">{c.name}</p>
          <p className="truncate text-[11px] text-muted-foreground">{c.school} · {c.niveau}</p>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {c.tags.slice(0, 2).map((t) => (
          <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{t}</span>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Dossier complet</span>
          <span className="font-semibold tabular-nums">{c.documents}/{c.documentsRequired}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-secondary">
          <div className={cn("h-full rounded-full", completion === 100 ? "bg-success" : "bg-primary")} style={{ width: `${completion}%` }} />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t pt-2.5">
        <span className="text-xs font-semibold tabular-nums text-foreground">{fmtFcfa(c.amount)}</span>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Paperclip className="h-3 w-3" />{c.documents}</span>
          <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />3</span>
          {c.score >= 80 && <Star className="h-3 w-3 fill-gold text-gold" />}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{c.updatedAt}</span>
        <span>{c.referent}</span>
      </div>
    </Link>
  );
}

function ScorePill({ score }: { score: number }) {
  if (score === 0) return <span className="text-xs text-muted-foreground">—</span>;
  const tone = score >= 80 ? "bg-success/15 text-success" : score >= 65 ? "bg-info/15 text-info" : "bg-warning/15 text-warning-foreground";
  return <span className={cn("inline-flex h-5 items-center rounded-md px-1.5 text-[11px] font-semibold tabular-nums", tone)}>{score}</span>;
}

function toneClass(t: string) {
  switch (t) {
    case "info": return "bg-info";
    case "gold": return "bg-gold";
    case "primary": return "bg-primary";
    case "success": return "bg-success";
    default: return "bg-muted-foreground/50";
  }
}

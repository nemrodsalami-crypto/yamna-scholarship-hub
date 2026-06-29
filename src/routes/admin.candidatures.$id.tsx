import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, CheckCircle2, XCircle, MessageCircle, Paperclip, Download, MoreHorizontal,
  FileText, Calendar, MapPin, Mail, Phone, GraduationCap, Wallet, Star, Send, Clock,
  ShieldCheck, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/yamna/status-badge";
import { getCandidature, fmtFcfa, STAGES } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/candidatures/$id")({
  head: ({ params }) => ({ meta: [{ title: `Dossier ${params.id} — YAM’NA` }] }),
  loader: ({ params }) => {
    const c = getCandidature(params.id);
    if (!c) throw notFound();
    return { c };
  },
  component: CandidatureDetail,
});

const TIMELINE = [
  { who: "Comité", what: "Délibération programmée pour le 01/10/2025", time: "Auj. 10:24", icon: Calendar, tone: "primary" as const },
  { who: "Olivier B.", what: "A validé l’éligibilité après vérification des relevés", time: "Hier 16:08", icon: CheckCircle2, tone: "success" as const },
  { who: "Système", what: "Score automatique calculé : 87/100", time: "Hier 16:00", icon: Star, tone: "gold" as const },
  { who: "Candidat", what: "A déposé l’attestation d’inscription définitive", time: "26 sept. 09:42", icon: Paperclip, tone: "info" as const },
  { who: "Marina N.", what: "A demandé un justificatif complémentaire", time: "24 sept. 14:18", icon: AlertTriangle, tone: "warning" as const },
  { who: "Système", what: "Dossier reçu et accusé envoyé au candidat", time: "12 sept. 08:00", icon: FileText, tone: "muted" as const },
];

const DOCUMENTS = [
  { name: "Pièce d’identité.pdf", size: "1.2 Mo", who: "Candidat", date: "12 sept.", verified: true },
  { name: "Acte de naissance.pdf", size: "640 ko", who: "Candidat", date: "12 sept.", verified: true },
  { name: "Attestation d’inscription 2025-26.pdf", size: "412 ko", who: "Candidat", date: "26 sept.", verified: true },
  { name: "Relevés notes L2.pdf", size: "1.8 Mo", who: "Candidat", date: "12 sept.", verified: true },
  { name: "Lettre de motivation.pdf", size: "210 ko", who: "Candidat", date: "12 sept.", verified: true },
  { name: "RIB BGFI Bank.pdf", size: "180 ko", who: "Candidat", date: "12 sept.", verified: true },
  { name: "Justificatif domicile.pdf", size: "520 ko", who: "Candidat", date: "12 sept.", verified: false },
];

const COMMENTS = [
  { who: "Olivier B.", role: "Référent INPTIC", time: "il y a 2 h", text: "Excellent dossier, mention TB en L2. Je recommande passage en comité.", tone: "from-primary to-info" },
  { who: "Marina N.", role: "Gestionnaire", time: "Hier", text: "Justificatif de domicile à revalider — illisible sur la copie scannée.", tone: "from-success to-info" },
  { who: "Jean M.", role: "Membre comité", time: "26 sept.", text: "Filière prioritaire COMILOG (génie logiciel), à prioriser sur l’enveloppe Q4.", tone: "from-gold to-warning" },
];

function CandidatureDetail() {
  const { c } = Route.useLoaderData();
  const currentStageIdx = STAGES.findIndex((s) => s.id === c.stage);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Breadcrumb + back */}
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/admin/candidatures" className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Retour aux candidatures
        </Link>
        <span>/</span>
        <span className="font-mono">{c.ref}</span>
      </div>

      {/* Header card */}
      <Card className="mb-4 overflow-hidden p-0">
        <div className="bg-gradient-to-br from-primary/8 via-info/5 to-transparent p-5">
          <div className="flex flex-wrap items-start gap-5">
            <Avatar className="h-20 w-20 shrink-0 ring-4 ring-card">
              <AvatarFallback className={cn("bg-gradient-to-br text-2xl font-bold text-white", c.avatarTone)}>{c.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{c.name}</h1>
                <StatusBadge status={c.status} />
                {c.score >= 80 && (
                  <Badge variant="secondary" className="gap-1 border-gold/30 bg-gold/15 text-gold-foreground">
                    <Star className="h-3 w-3 fill-current" /> Excellence
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.filiere} · {c.niveau} · {c.school}</p>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-muted-foreground sm:grid-cols-4">
                <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{c.email}</span>
                <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{c.phone}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{c.city}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Déposé le {c.createdAt}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> Message</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive"><XCircle className="h-3.5 w-3.5" /> Rejeter</Button>
              <Button size="sm" className="gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Valider l’étape</Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-6 flex items-center gap-1 overflow-x-auto">
            {STAGES.map((s, i) => {
              const done = i < currentStageIdx;
              const active = i === currentStageIdx;
              return (
                <div key={s.id} className="flex flex-1 min-w-[120px] items-center gap-1">
                  <div className={cn("flex flex-1 flex-col gap-1.5")}>
                    <div className={cn(
                      "h-1.5 rounded-full",
                      done ? "bg-success" : active ? "bg-primary" : "bg-border"
                    )} />
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold",
                        done ? "bg-success text-success-foreground" : active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      )}>
                        {done ? "✓" : i + 1}
                      </div>
                      <span className={cn("text-[11px] font-medium", (done || active) ? "text-foreground" : "text-muted-foreground")}>{s.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left main */}
        <div className="space-y-4 lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Vue d’ensemble</TabsTrigger>
              <TabsTrigger value="documents" className="gap-1.5">Documents <Badge variant="secondary" className="h-4 px-1 text-[10px]">{DOCUMENTS.length}</Badge></TabsTrigger>
              <TabsTrigger value="timeline">Activité</TabsTrigger>
              <TabsTrigger value="comments" className="gap-1.5">Commentaires <Badge variant="secondary" className="h-4 px-1 text-[10px]">{COMMENTS.length}</Badge></TabsTrigger>
              <TabsTrigger value="decision">Décision</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Évaluation automatique</CardTitle>
                  <CardDescription>Critères pondérés du règlement bourses COMILOG</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { k: "Résultats académiques", v: 92, w: "30%" },
                    { k: "Filière prioritaire", v: 100, w: "20%" },
                    { k: "Niveau d’études", v: 80, w: "15%" },
                    { k: "Situation socio-économique", v: 76, w: "20%" },
                    { k: "Lettre de motivation", v: 88, w: "15%" },
                  ].map((r) => (
                    <div key={r.k}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium">{r.k}</span>
                        <span className="text-muted-foreground">Poids {r.w} · <span className="font-semibold text-foreground tabular-nums">{r.v}/100</span></span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div className={cn("h-full rounded-full", r.v >= 85 ? "bg-success" : r.v >= 70 ? "bg-primary" : "bg-warning")} style={{ width: `${r.v}%` }} />
                      </div>
                    </div>
                  ))}
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Score global pondéré</p>
                      <p className="text-2xl font-bold tabular-nums">{c.score}<span className="text-sm font-medium text-muted-foreground">/100</span></p>
                    </div>
                    <Badge className="bg-success/15 text-success">Recommandation : Accepter</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Plan de financement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { k: "Frais de scolarité", v: 850000 },
                      { k: "Hébergement", v: 250000 },
                      { k: "Vie quotidienne", v: 150000 },
                    ].map((b) => (
                      <div key={b.k} className="rounded-lg border bg-secondary/30 p-3">
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{b.k}</p>
                        <p className="mt-1 text-base font-semibold tabular-nums">{fmtFcfa(b.v)}</p>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Montant total demandé</span>
                    <span className="text-lg font-bold tabular-nums text-primary">{fmtFcfa(c.amount)}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base">Pièces du dossier</CardTitle>
                    <CardDescription>{c.documents}/{c.documentsRequired} documents · {DOCUMENTS.filter(d => d.verified).length} vérifiés</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1.5"><Paperclip className="h-3.5 w-3.5" /> Demander une pièce</Button>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {DOCUMENTS.map((d) => (
                    <div key={d.name} className="flex items-center gap-3 rounded-lg border p-2.5 hover:bg-accent/40">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{d.name}</p>
                        <p className="text-[11px] text-muted-foreground">{d.size} · déposé par {d.who} le {d.date}</p>
                      </div>
                      {d.verified ? (
                        <Badge className="bg-success/15 text-success">Vérifié</Badge>
                      ) : (
                        <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning-foreground">À revoir</Badge>
                      )}
                      <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Historique du dossier</CardTitle></CardHeader>
                <CardContent>
                  <ol className="relative ml-4 space-y-5 border-l">
                    {TIMELINE.map((t, i) => (
                      <li key={i} className="ml-4">
                        <span className={cn(
                          "absolute -left-[11px] grid h-5 w-5 place-items-center rounded-full border-2 border-card",
                          t.tone === "success" && "bg-success text-success-foreground",
                          t.tone === "primary" && "bg-primary text-primary-foreground",
                          t.tone === "gold" && "bg-gold text-gold-foreground",
                          t.tone === "info" && "bg-info text-info-foreground",
                          t.tone === "warning" && "bg-warning text-warning-foreground",
                          t.tone === "muted" && "bg-muted text-muted-foreground",
                        )}>
                          <t.icon className="h-2.5 w-2.5" />
                        </span>
                        <p className="text-sm"><span className="font-semibold">{t.who}</span> <span className="text-muted-foreground">— {t.what}</span></p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground"><Clock className="mr-1 inline h-3 w-3" />{t.time}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Échanges internes</CardTitle><CardDescription>Visible uniquement par le comité et les référents</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  {COMMENTS.map((c, i) => (
                    <div key={i} className="flex gap-3">
                      <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", c.tone)}>{c.who.split(" ").map(s => s[0]).join("")}</AvatarFallback></Avatar>
                      <div className="min-w-0 flex-1 rounded-lg border bg-secondary/30 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div><span className="text-sm font-semibold">{c.who}</span> <span className="text-[11px] text-muted-foreground">· {c.role}</span></div>
                          <span className="text-[11px] text-muted-foreground">{c.time}</span>
                        </div>
                        <p className="mt-1 text-sm">{c.text}</p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2">
                    <Textarea placeholder="Ajouter un commentaire au dossier…" rows={3} />
                    <div className="flex justify-end">
                      <Button size="sm" className="gap-1.5"><Send className="h-3.5 w-3.5" /> Publier</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="decision" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Délibération du comité</CardTitle><CardDescription>Comité du 01 octobre 2025 · 10:00 — Salle Mbéri</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { v: "Accepter", icon: CheckCircle2, tone: "success", count: 3 },
                      { v: "Liste d’attente", icon: Clock, tone: "muted", count: 1 },
                      { v: "Refuser", icon: XCircle, tone: "destructive", count: 0 },
                    ].map((b) => (
                      <button key={b.v} className={cn(
                        "flex items-center justify-between rounded-xl border-2 p-4 transition hover:shadow-md",
                        b.tone === "success" && "border-success/40 bg-success/5 hover:bg-success/10",
                        b.tone === "destructive" && "border-destructive/30 bg-destructive/5",
                        b.tone === "muted" && "border-border bg-secondary/30"
                      )}>
                        <div className="text-left">
                          <p className="text-sm font-semibold">{b.v}</p>
                          <p className="text-[11px] text-muted-foreground">{b.count} vote(s)</p>
                        </div>
                        <b.icon className={cn(
                          "h-5 w-5",
                          b.tone === "success" && "text-success",
                          b.tone === "destructive" && "text-destructive",
                          b.tone === "muted" && "text-muted-foreground"
                        )} />
                      </button>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Motivation de la décision</p>
                    <Textarea rows={4} placeholder="Justifier la décision conformément au règlement du programme…" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Informations clés</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Info icon={Wallet} label="Montant demandé" value={fmtFcfa(c.amount)} />
              <Info icon={GraduationCap} label="Établissement" value={`${c.school} · ${c.city}`} />
              <Info icon={ShieldCheck} label="Référent" value={c.referent} />
              <Info icon={Calendar} label="Échéance comité" value="01 oct. 2025" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Tags</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-md font-medium">{t}</Badge>
                ))}
                <Badge variant="outline" className="cursor-pointer rounded-md border-dashed">+ Ajouter</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Référents assignés</CardTitle></CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { n: "Olivier B.", r: "Référent pédagogique" },
                { n: "Marina N.", r: "Gestionnaire dossier" },
                { n: "Jean M.", r: "Membre du comité" },
              ].map((p, i) => (
                <div key={p.n} className="flex items-center gap-2.5">
                  <Avatar className="h-8 w-8"><AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", ["from-primary to-info","from-success to-info","from-gold to-warning"][i])}>{p.n.split(" ").map(s => s[0]).join("")}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.n}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{p.r}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">+ Ajouter un référent</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-secondary text-muted-foreground"><Icon className="h-3.5 w-3.5" /></div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

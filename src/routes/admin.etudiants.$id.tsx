import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, GraduationCap, Building2, Star,
  Download, MoreHorizontal, MessageSquare, FileText, Wallet, ShieldCheck,
  CheckCircle2, Clock, AlertCircle, Edit, Camera, Pencil,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getEtudiant, fmtFcfa, type Etudiant } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";
import { StatutPill } from "./admin.etudiants";

export const Route = createFileRoute("/admin/etudiants/$id")({
  head: () => ({ meta: [{ title: "Profil étudiant — YAM’NA" }] }),
  loader: ({ params }): Etudiant => {
    const e = getEtudiant(params.id);
    if (!e) throw notFound();
    return e;
  },
  component: EtudiantDetail,
  notFoundComponent: () => (
    <div className="grid place-items-center py-24 text-sm text-muted-foreground">
      Étudiant introuvable. <Link to="/admin/etudiants" className="ml-2 text-primary">Retour à l’annuaire</Link>
    </div>
  ),
});

function EtudiantDetail() {
  const e = Route.useLoaderData();
  const progress = e.versementsTotal > 0 ? Math.round((e.versementsRecus / e.versementsTotal) * 100) : 0;

  return (
    <div>
      <div className="mb-4">
        <Link to="/admin/etudiants" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Annuaire étudiants
        </Link>
      </div>

      {/* Cover + identity */}
      <Card className="overflow-hidden p-0">
        <div className={cn("relative h-40 bg-gradient-to-br", e.avatarTone)}>
          <div className="absolute inset-0 surface-grid opacity-[0.12]" />
          <button className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-background/90 px-2 py-1 text-[11px] font-medium text-foreground backdrop-blur hover:bg-background">
            <Camera className="h-3.5 w-3.5" /> Bannière
          </button>
        </div>
        <div className="px-6 pb-5">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-card">
                  <AvatarFallback className={cn("bg-gradient-to-br text-2xl font-bold text-white", e.avatarTone)}>{e.initials}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-card hover:bg-primary/90">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">{e.name}</h1>
                  <StatutPill s={e.status} />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                  <span className="font-mono">{e.matricule}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" /> {e.niveau} · {e.filiere}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {e.school}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {e.city}, {e.country}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <Button variant="outline" size="sm" className="gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> Message</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Dossier PDF</Button>
              <Button size="sm" className="gap-1.5"><Edit className="h-3.5 w-3.5" /> Modifier</Button>
              <Button variant="outline" size="icon" className="h-9 w-9"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="space-y-5">
          <Tabs defaultValue="apercu">
            <TabsList>
              <TabsTrigger value="apercu">Aperçu</TabsTrigger>
              <TabsTrigger value="parcours">Parcours académique</TabsTrigger>
              <TabsTrigger value="bourse">Bourse & paiements</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="activite">Activité</TabsTrigger>
            </TabsList>

            {/* APERCU */}
            <TabsContent value="apercu" className="mt-4 space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <StatTile icon={Star} label="Moyenne générale" value={e.gpa.toFixed(1)} sub="/20 · session en cours" tone="text-gold-foreground" bg="bg-gold/12" />
                <StatTile icon={Wallet} label="Versements" value={`${e.versementsRecus}/${e.versementsTotal}`} sub={`${progress}% de l’année`} tone="text-success" bg="bg-success/12" />
                <StatTile icon={FileText} label="Documents" value={`${e.documents}/${e.documentsRequired}`} sub="dossier réglementaire" tone="text-primary" bg="bg-primary/10" />
              </div>

              <Card className="p-5">
                <SectionTitle title="À propos" action={<Pencil className="h-3.5 w-3.5 text-muted-foreground" />} />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Étudiant{e.gender === "F" ? "e" : ""} en <strong className="text-foreground">{e.filiere}</strong> à <strong className="text-foreground">{e.school}</strong>,
                  {" "}{e.name.split(" ")[0]} a rejoint le programme YAM’NA en {e.joinedAt}. Profil suivi par {e.referent}.
                  {e.status === "boursier" && ` Bénéficie de la bourse "${e.bourseType}" d’un montant annuel de ${fmtFcfa(e.montantAnnuel ?? 0)}.`}
                </p>
              </Card>

              <Card className="p-5">
                <SectionTitle title="Informations personnelles" action={<Pencil className="h-3.5 w-3.5 text-muted-foreground" />} />
                <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  <InfoLine icon={Mail} label="Email" value={e.email} />
                  <InfoLine icon={Phone} label="Téléphone" value={e.phone} />
                  <InfoLine icon={Calendar} label="Né(e) le" value={`${e.birth} · ${e.birthCity}`} />
                  <InfoLine icon={MapPin} label="Résidence" value={`${e.city}, ${e.country}`} />
                  <InfoLine icon={GraduationCap} label="Établissement" value={`${e.school} · ${e.niveau}`} />
                  <InfoLine icon={Building2} label="Promotion" value={e.promo} />
                </div>
              </Card>
            </TabsContent>

            {/* PARCOURS */}
            <TabsContent value="parcours" className="mt-4 space-y-4">
              <Card className="p-5">
                <SectionTitle title="Cursus" />
                <div className="mt-4 space-y-4">
                  {[
                    { year: "2024 — en cours", school: e.school, niveau: e.niveau, status: "Inscrit", tone: "bg-success/12 text-success" },
                    { year: "2023 — 2024", school: e.school, niveau: "Licence 2 · " + e.filiere, status: "Validé · 15.2/20", tone: "bg-primary/10 text-primary" },
                    { year: "2022 — 2023", school: e.school, niveau: "Licence 1 · " + e.filiere, status: "Validé · 14.7/20", tone: "bg-primary/10 text-primary" },
                    { year: "2021 — 2022", school: "Lycée National Léon Mba", niveau: "Baccalauréat scientifique", status: "Mention Bien", tone: "bg-gold/15 text-gold-foreground" },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={cn("grid h-8 w-8 place-items-center rounded-full", step.tone)}>
                          <GraduationCap className="h-3.5 w-3.5" />
                        </div>
                        {i < 3 && <div className="my-1 w-px flex-1 bg-border" />}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{step.year}</p>
                          <Badge variant="secondary" className="h-5 rounded-md px-1.5 text-[10px]">{step.status}</Badge>
                        </div>
                        <p className="mt-0.5 text-sm font-semibold text-foreground">{step.niveau}</p>
                        <p className="text-xs text-muted-foreground">{step.school}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <SectionTitle title="Résultats académiques · Session 2024-2025" />
                <div className="mt-4 overflow-hidden rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50 text-[11px] uppercase tracking-wider text-muted-foreground">
                      <tr><th className="px-3 py-2 text-left">Matière</th><th className="px-3 py-2 text-left">Coef.</th><th className="px-3 py-2 text-right">Note</th><th className="px-3 py-2 text-right">Rang</th></tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        { m: "Algorithmique avancée", c: 4, n: 17.5, r: "2/45" },
                        { m: "Bases de données", c: 3, n: 16.0, r: "5/45" },
                        { m: "Réseaux & systèmes", c: 3, n: 15.5, r: "7/45" },
                        { m: "Anglais technique", c: 2, n: 14.0, r: "12/45" },
                        { m: "Management de projet", c: 2, n: 18.5, r: "1/45" },
                      ].map((row) => (
                        <tr key={row.m}>
                          <td className="px-3 py-2 font-medium">{row.m}</td>
                          <td className="px-3 py-2 text-muted-foreground">{row.c}</td>
                          <td className="px-3 py-2 text-right font-semibold tabular-nums">{row.n.toFixed(1)}</td>
                          <td className="px-3 py-2 text-right text-muted-foreground">{row.r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* BOURSE */}
            <TabsContent value="bourse" className="mt-4 space-y-4">
              {e.status === "boursier" || e.status === "alumni" ? (
                <>
                  <Card className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Bourse en cours</p>
                        <h3 className="mt-1 text-lg font-bold">{e.bourseType}</h3>
                        <p className="text-xs text-muted-foreground">Année académique {e.promo} · suivi par {e.referent}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold tabular-nums text-primary">{fmtFcfa(e.montantAnnuel ?? 0)}</p>
                        <p className="text-[11px] text-muted-foreground">montant annuel</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Avancement des versements</span>
                      <span className="font-semibold tabular-nums">{e.versementsRecus}/{e.versementsTotal} · {progress}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-gradient-to-r from-primary to-success" style={{ width: `${progress}%` }} />
                    </div>
                  </Card>

                  <Card className="overflow-hidden p-0">
                    <div className="border-b px-5 py-3 text-sm font-semibold">Historique des versements</div>
                    <table className="w-full text-sm">
                      <thead className="bg-secondary/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                        <tr><th className="px-5 py-2 text-left">Référence</th><th className="px-3 py-2 text-left">Date</th><th className="px-3 py-2 text-left">Échéance</th><th className="px-3 py-2 text-right">Montant</th><th className="px-3 py-2 text-left">Méthode</th><th className="px-5 py-2 text-left">Statut</th></tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          { ref: "PAY-2025-0412", d: "12 sept. 2024", e: "T1", m: 312500, meth: "Virement BGFI", st: "Payé", tone: "bg-success/12 text-success" },
                          { ref: "PAY-2025-0588", d: "08 déc. 2024", e: "T2", m: 312500, meth: "Virement BGFI", st: "Payé", tone: "bg-success/12 text-success" },
                          { ref: "PAY-2025-0712", d: "—", e: "T3", m: 312500, meth: "—", st: "Programmé", tone: "bg-info/10 text-info" },
                          { ref: "PAY-2025-0814", d: "—", e: "T4", m: 312500, meth: "—", st: "À venir", tone: "bg-muted text-muted-foreground" },
                        ].map((p) => (
                          <tr key={p.ref}>
                            <td className="px-5 py-3 font-mono text-[11px] text-muted-foreground">{p.ref}</td>
                            <td className="px-3 py-3 text-muted-foreground">{p.d}</td>
                            <td className="px-3 py-3">{p.e}</td>
                            <td className="px-3 py-3 text-right font-semibold tabular-nums">{fmtFcfa(p.m)}</td>
                            <td className="px-3 py-3 text-muted-foreground">{p.meth}</td>
                            <td className="px-5 py-3"><span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium", p.tone)}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{p.st}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </>
              ) : (
                <Card className="grid place-items-center py-12 text-sm text-muted-foreground">
                  <ShieldCheck className="mb-2 h-6 w-6 text-muted-foreground/60" />
                  Aucune bourse active. Statut courant : <strong className="ml-1 text-foreground">{e.status}</strong>.
                </Card>
              )}
            </TabsContent>

            {/* DOCUMENTS */}
            <TabsContent value="documents" className="mt-4">
              <Card className="overflow-hidden p-0">
                <div className="flex items-center justify-between border-b px-5 py-3">
                  <div className="text-sm font-semibold">Documents du dossier <span className="ml-1 text-xs font-normal text-muted-foreground">({e.documents}/{e.documentsRequired})</span></div>
                  <Button size="sm" variant="outline" className="h-8 gap-1.5"><FileText className="h-3.5 w-3.5" /> Demander un document</Button>
                </div>
                <ul className="divide-y">
                  {[
                    { n: "Certificat de scolarité 2024-2025", k: "PDF · 142 Ko", s: "ok", d: "Validé 12 sept." },
                    { n: "Pièce d’identité", k: "PDF · 1.2 Mo", s: "ok", d: "Validé 10 sept." },
                    { n: "Relevé de notes S5", k: "PDF · 220 Ko", s: "ok", d: "Validé 12 sept." },
                    { n: "RIB bancaire", k: "PDF · 88 Ko", s: "pending", d: "En attente de signature" },
                    { n: "Attestation de logement", k: "—", s: "missing", d: "Manquant" },
                  ].map((d) => (
                    <li key={d.n} className="flex items-center gap-3 px-5 py-3">
                      <div className={cn("grid h-9 w-9 place-items-center rounded-lg", d.s === "ok" ? "bg-success/12 text-success" : d.s === "pending" ? "bg-gold/15 text-gold-foreground" : "bg-destructive/10 text-destructive")}>
                        {d.s === "ok" ? <CheckCircle2 className="h-4 w-4" /> : d.s === "pending" ? <Clock className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{d.n}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{d.k} · {d.d}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">{d.s === "missing" ? "Téléverser" : "Voir"}</Button>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            {/* ACTIVITE */}
            <TabsContent value="activite" className="mt-4">
              <Card className="p-5">
                <SectionTitle title="Journal d’activité" />
                <ol className="mt-4 space-y-4">
                  {[
                    { t: "Versement T2 effectué", d: "08 déc. 2024 · BGFI Bank", icon: Wallet, tone: "bg-success/12 text-success" },
                    { t: "Document « Relevé S5 » validé par Olivier B.", d: "12 sept. 2024", icon: CheckCircle2, tone: "bg-primary/10 text-primary" },
                    { t: "Renouvellement de bourse approuvé en comité", d: "30 août 2024", icon: ShieldCheck, tone: "bg-gold/15 text-gold-foreground" },
                    { t: "Compte créé sur YAM’NA", d: e.joinedAt, icon: GraduationCap, tone: "bg-info/10 text-info" },
                  ].map((a, i) => (
                    <li key={i} className="flex gap-3">
                      <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full", a.tone)}><a.icon className="h-3.5 w-3.5" /></div>
                      <div>
                        <p className="text-sm font-medium">{a.t}</p>
                        <p className="text-[11px] text-muted-foreground">{a.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Référent COMILOG</p>
            <div className="mt-3 flex items-center gap-2.5">
              <Avatar className="h-9 w-9"><AvatarFallback className="bg-gradient-to-br from-primary to-info text-[11px] font-semibold text-white">OB</AvatarFallback></Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{e.referent}</p>
                <p className="truncate text-[11px] text-muted-foreground">Responsable suivi · DRH</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> Contacter</Button>
          </Card>

          <Card className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tags</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {e.tags.map((t) => (
                <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{t}</span>
              ))}
              <button className="rounded-md border border-dashed px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground">+ Ajouter</button>
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Raccourcis</p>
            <div className="mt-2 space-y-1">
              {[
                { i: FileText, t: "Voir candidature liée" },
                { i: Wallet, t: "Planifier un paiement" },
                { i: MessageSquare, t: "Démarrer une conversation" },
                { i: Download, t: "Exporter la fiche (PDF)" },
              ].map((a) => (
                <button key={a.t} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
                  <a.i className="h-3.5 w-3.5" /> {a.t}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Métadonnées</p>
            <dl className="mt-2 space-y-1.5 text-xs">
              <div className="flex justify-between"><dt className="text-muted-foreground">Créé le</dt><dd>{e.joinedAt}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Dernière activité</dt><dd>{e.lastActivity}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Matricule</dt><dd className="font-mono">{e.matricule}</dd></div>
            </dl>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, label, value, sub, tone, bg }: { icon: typeof Star; label: string; value: string; sub: string; tone: string; bg: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={cn("grid h-10 w-10 place-items-center rounded-lg", bg, tone)}><Icon className="h-5 w-5" /></div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-lg font-bold tabular-nums leading-none">{value}</p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </Card>
  );
}

function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold">{title}</h2>
      {action && <button className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">{action}</button>}
    </div>
  );
}

function InfoLine({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-md bg-secondary text-muted-foreground"><Icon className="h-3.5 w-3.5" /></div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm">{value}</p>
      </div>
    </div>
  );
}

PageHeader; // type-only no-op (kept import warm); intentionally unused

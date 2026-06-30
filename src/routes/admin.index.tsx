import { createFileRoute } from "@tanstack/react-router";
import {
  GraduationCap, Wallet, FolderKanban, Coins, Plus, Download, AlertTriangle,
  ChevronRight, MoreHorizontal, CalendarDays, ArrowUpRight,
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { KpiCard } from "@/components/yamna/kpi-card";
import { PageHeader } from "@/components/yamna/page-header";
import { StatusBadge, type YamnaStatus } from "@/components/yamna/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — YAM’NA Admin" }] }),
  component: AdminDashboard,
});

const PAY_DATA = [
  { m: "Jan", v: 180, b: 165 }, { m: "Fév", v: 195, b: 180 }, { m: "Mar", v: 210, b: 195 },
  { m: "Avr", v: 205, b: 200 }, { m: "Mai", v: 235, b: 220 }, { m: "Juin", v: 248, b: 230 },
  { m: "Juil", v: 220, b: 215 }, { m: "Août", v: 255, b: 240 }, { m: "Sep", v: 290, b: 260 },
];

const PIE = [
  { name: "Sciences", value: 38, color: "var(--color-chart-1)" },
  { name: "Ingénierie", value: 28, color: "var(--color-chart-2)" },
  { name: "Management", value: 18, color: "var(--color-chart-3)" },
  { name: "Santé", value: 11, color: "var(--color-chart-4)" },
  { name: "Autres", value: 5, color: "var(--color-chart-5)" },
];

const CANDIDATS: Array<{ name: string; init: string; school: string; amount: string; status: YamnaStatus; date: string }> = [
  { name: "Nadia Ondo", init: "NO", school: "INPTIC · Libreville", amount: "1 250 000", status: "comite", date: "Aujourd’hui, 10:24" },
  { name: "Yann Mavoungou", init: "YM", school: "USTM · Franceville", amount: "1 100 000", status: "instruction", date: "Aujourd’hui, 09:11" },
  { name: "Sandrine Bivigou", init: "SB", school: "Polytech Lyon (FR)", amount: "1 850 000", status: "accepte", date: "Hier, 17:48" },
  { name: "Théo Nguema", init: "TN", school: "ENS Libreville", amount: "950 000", status: "eligible", date: "Hier, 14:02" },
  { name: "Aïsha Boukandou", init: "AB", school: "Université Laval (CA)", amount: "2 100 000", status: "refuse", date: "27 sept." },
  { name: "Léa Mouele", init: "LM", school: "INSA Toulouse (FR)", amount: "1 950 000", status: "attente", date: "27 sept." },
];

function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Vue d’ensemble"
        description="Bonjour Aïcha 👋 — voici l’état du programme COMILOG aujourd’hui, lundi 29 septembre 2025."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Nouvelle bourse</Button>
          </>
        }
      />

      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Boursiers actifs" value="1 240" delta={6} hint="vs. trimestre précédent" icon={<GraduationCap className="h-4 w-4" />} />
        <KpiCard label="Paiements du mois" value="287" delta={12} hint="84 / 87 versés" icon={<Wallet className="h-4 w-4" />} tone="success" />
        <KpiCard label="Candidatures en cours" value="24" delta={-3} hint="6 nouvelles cette semaine" icon={<FolderKanban className="h-4 w-4" />} tone="info" />
        <KpiCard label="Budget consommé" value="62%" delta={4} hint="1,48 / 2,40 Md FCFA" icon={<Coins className="h-4 w-4" />} tone="gold" />
      </div>

      {/* Charts Row */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-base">Paiements vs. budget</CardTitle>
              <CardDescription>Montants versés (millions FCFA) sur les 9 derniers mois</CardDescription>
            </div>
            <Tabs defaultValue="9m">
              <TabsList className="h-8">
                <TabsTrigger value="30j" className="h-6 text-xs">30j</TabsTrigger>
                <TabsTrigger value="9m" className="h-6 text-xs">9 mois</TabsTrigger>
                <TabsTrigger value="12m" className="h-6 text-xs">12 mois</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <AreaChart data={PAY_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.32} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.22} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }}
                    labelStyle={{ color: "var(--color-muted-foreground)" }}
                  />
                  <Area type="monotone" dataKey="b" name="Budget" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#g2)" />
                  <Area type="monotone" dataKey="v" name="Versé" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Répartition par filière</CardTitle>
            <CardDescription>Boursiers actifs 2024–2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={56} outerRadius={92} paddingAngle={2} stroke="var(--color-card)" strokeWidth={3}>
                    {PIE.map((e) => <Cell key={e.name} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Recent candidates table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Candidatures récentes</CardTitle>
              <CardDescription>Dernières mises à jour du pipeline</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">Voir tout <ChevronRight className="h-3.5 w-3.5" /></Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Candidat</TableHead>
                  <TableHead>Établissement</TableHead>
                  <TableHead className="text-right">Montant (FCFA)</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="pr-6">Mise à jour</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CANDIDATS.map((c) => (
                  <TableRow key={c.name} className="cursor-pointer">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">{c.init}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                          <p className="text-[11px] text-muted-foreground">Bourse externe · L3</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.school}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{c.amount}</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                    <TableCell className="pr-6 text-xs text-muted-foreground">{c.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right column: alerts + activity */}
        <div className="space-y-4">
          <Card className="border-warning/30 bg-warning/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-warning/15 text-warning-foreground">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm">3 alertes à traiter</CardTitle>
                  <CardDescription className="text-xs">À examiner avant la fin de semaine</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { t: "Justificatifs manquants — Promo INPTIC", d: "12 dossiers concernés" },
                { t: "Budget Q4 à 87% de consommation", d: "Seuil d’alerte atteint" },
                { t: "Renouvellements à valider", d: "8 bourses en attente" },
              ].map((a) => (
                <button key={a.t} className="flex w-full items-start justify-between gap-2 rounded-lg p-2 text-left hover:bg-warning/10">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.t}</p>
                    <p className="text-xs text-muted-foreground">{a.d}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm">Activité récente</CardTitle>
              <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-72 px-4">
                <div className="space-y-4 py-2">
                  {[
                    { who: "Olivier B.", act: "a validé la candidature de", target: "N. Ondo", time: "Il y a 4 min", tone: "success" },
                    { who: "Système", act: "a programmé le paiement de", target: "Bourse Mai", time: "Il y a 22 min", tone: "info" },
                    { who: "Référent INPTIC", act: "a déposé 12 justificatifs", target: "", time: "Il y a 1 h", tone: "muted" },
                    { who: "Comité", act: "a refusé", target: "A. Boukandou", time: "Hier 16:08", tone: "destructive" },
                    { who: "Marina N.", act: "a créé l’utilisateur", target: "j.medza@comilog.com", time: "Hier 11:42", tone: "muted" },
                    { who: "Audit", act: "export PDF généré", target: "Rapport Q3 2025", time: "27 sept.", tone: "muted" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        a.tone === "success" ? "bg-success" :
                        a.tone === "info" ? "bg-info" :
                        a.tone === "destructive" ? "bg-destructive" : "bg-muted-foreground/50"
                      }`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-tight">
                          <span className="font-medium">{a.who}</span>{" "}
                          <span className="text-muted-foreground">{a.act}</span>{" "}
                          {a.target && <span className="font-medium text-primary">{a.target}</span>}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">Prochaines échéances</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">Calendrier <ArrowUpRight className="h-3 w-3" /></Button>
            </CardHeader>
            <CardContent className="space-y-2 pb-4">
              {[
                { d: "01", m: "Oct", t: "Comité de sélection", s: "10:00 · Salle Mbéri" },
                { d: "05", m: "Oct", t: "Paiement mensuel boursiers", s: "Automatique" },
                { d: "12", m: "Oct", t: "Clôture session 2025", s: "23:59" },
              ].map((e) => (
                <div key={e.d + e.t} className="flex items-center gap-3 rounded-lg border bg-secondary/40 p-2.5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-card text-center">
                    <span className="-mb-0.5 text-base font-bold leading-none tabular-nums">{e.d}</span>
                    <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{e.m}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{e.t}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{e.s}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

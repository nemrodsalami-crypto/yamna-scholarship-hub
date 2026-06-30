import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download, TrendingUp, Globe, Wallet, GraduationCap, Printer, Filter,
  BarChart2, ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { KpiCard } from "@/components/yamna/kpi-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ETUDIANTS, fmtFcfa } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/reporting")({
  head: () => ({ meta: [{ title: "Reporting — YAM'NA" }] }),
  component: ReportingPage,
});

const MONTHLY = [
  { m: "Jan", verse: 188, prog: 170, nb: 240 },
  { m: "Fév", verse: 205, prog: 195, nb: 248 },
  { m: "Mar", verse: 218, prog: 210, nb: 252 },
  { m: "Avr", verse: 202, prog: 205, nb: 255 },
  { m: "Mai", verse: 240, prog: 232, nb: 260 },
  { m: "Juin", verse: 258, prog: 248, nb: 268 },
  { m: "Juil", verse: 225, prog: 220, nb: 265 },
  { m: "Août", verse: 262, prog: 255, nb: 275 },
  { m: "Sep", verse: 298, prog: 290, nb: 287 },
];

const BY_SCHOOL = [
  { school: "USTM", n: 28 },
  { school: "INPTIC", n: 22 },
  { school: "Poly Lyon", n: 12 },
  { school: "ENS Lib.", n: 15 },
  { school: "Mines Paris", n: 8 },
  { school: "INSA TLS", n: 9 },
  { school: "UOB", n: 12 },
  { school: "ENI", n: 8 },
];

const BY_PAYS = [
  { name: "Gabon", value: 58, color: "var(--color-chart-1)" },
  { name: "France", value: 24, color: "var(--color-chart-2)" },
  { name: "Canada", value: 10, color: "var(--color-chart-3)" },
  { name: "Belgique", value: 5, color: "var(--color-chart-4)" },
  { name: "Autres", value: 3, color: "var(--color-chart-5)" },
];

const BY_TYPE = [
  { name: "Mérite Excellence", value: 32, color: "var(--color-chart-1)" },
  { name: "International", value: 28, color: "var(--color-chart-2)" },
  { name: "Filière prior.", value: 24, color: "var(--color-chart-3)" },
  { name: "Renouvellement", value: 12, color: "var(--color-chart-4)" },
  { name: "Aide sociale", value: 4, color: "var(--color-chart-5)" },
];

const TTSTYLE = { borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 };

function ReportingPage() {
  const [period, setPeriod] = useState("session");
  const [annee, setAnnee] = useState("2024-2025");

  return (
    <div>
      <PageHeader
        title="Reporting & Analytics"
        description="Tableau de bord analytique du programme COMILOG / Eramet — Session 2024–2025"
        actions={
          <>
            <Select value={annee} onValueChange={setAnnee}>
              <SelectTrigger className="h-9 w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024–2025</SelectItem>
                <SelectItem value="2023-2024">2023–2024</SelectItem>
                <SelectItem value="2022-2023">2022–2023</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1.5"><Printer className="h-3.5 w-3.5" /> Imprimer</Button>
            <Button size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter PDF</Button>
          </>
        }
      />

      <div className="mb-5">
        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="30j">30 jours</TabsTrigger>
            <TabsTrigger value="3m">3 mois</TabsTrigger>
            <TabsTrigger value="6m">6 mois</TabsTrigger>
            <TabsTrigger value="session">Session complète</TabsTrigger>
            <TabsTrigger value="annuel">Comparatif annuel</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Boursiers actifs" value="287" delta={8} hint="vs session précédente" icon={<GraduationCap className="h-4 w-4" />} />
        <KpiCard label="Budget versé" value="1,48 Md" delta={12} hint="62% de l'enveloppe allouée" icon={<Wallet className="h-4 w-4" />} tone="success" />
        <KpiCard label="Taux de réussite" value="91%" delta={3} hint="étudiants avec résultats valides" icon={<TrendingUp className="h-4 w-4" />} tone="info" />
        <KpiCard label="Pays couverts" value="8" delta={1} hint="Gabon, France, Canada…" icon={<Globe className="h-4 w-4" />} tone="gold" />
      </div>

      {/* Row 1 */}
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-base">Évolution des versements</CardTitle>
              <CardDescription>Montants versés vs programmés (millions FCFA) — 2024-2025</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 shrink-0"><Filter className="h-3 w-3" /> Filtrer</Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={MONTHLY} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <Tooltip contentStyle={TTSTYLE} />
                  <Area type="monotone" dataKey="prog" name="Programmé" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#gp)" strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="verse" name="Versé" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#gv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Répartition géographique</CardTitle>
            <CardDescription>Pays d'accueil des boursiers actifs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={BY_PAYS} dataKey="value" nameKey="name" cx="50%" cy="46%" innerRadius={48} outerRadius={76} paddingAngle={2} stroke="var(--color-card)" strokeWidth={3}>
                    {BY_PAYS.map((e) => <Cell key={e.name} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={TTSTYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Boursiers par établissement</CardTitle>
              <CardDescription>Nombre de bénéficiaires actifs · Session 2024-25</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">Voir détail <ArrowUpRight className="h-3.5 w-3.5" /></Button>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer>
                <BarChart data={BY_SCHOOL} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="school" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <Tooltip contentStyle={TTSTYLE} />
                  <Bar dataKey="n" name="Boursiers" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Types de bourses</CardTitle>
            <CardDescription>Distribution des bénéficiaires par programme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={BY_TYPE} dataKey="value" nameKey="name" cx="50%" cy="46%" outerRadius={76} paddingAngle={2} stroke="var(--color-card)" strokeWidth={3}>
                    {BY_TYPE.map((e) => <Cell key={e.name} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={TTSTYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance table */}
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Classement performance académique</CardTitle>
            <CardDescription>Top boursiers par GPA — Session 2024–2025</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5"><BarChart2 className="h-3.5 w-3.5" /> Comparer</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12 pl-6">#</TableHead>
                <TableHead>Étudiant</TableHead>
                <TableHead>Établissement</TableHead>
                <TableHead>Filière</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead className="text-right">GPA</TableHead>
                <TableHead className="text-right">Bourse</TableHead>
                <TableHead className="pr-6">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...ETUDIANTS].sort((a, b) => b.gpa - a.gpa).map((e, i) => (
                <TableRow key={e.id} className="cursor-pointer">
                  <TableCell className="pl-6">
                    <span className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold",
                      i === 0 ? "bg-gold/20 text-gold-foreground" :
                      i === 1 ? "bg-secondary text-secondary-foreground" :
                      i === 2 ? "bg-warning/15 text-warning-foreground" : "text-muted-foreground"
                    )}>{i + 1}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", e.avatarTone)}>{e.initials}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">{e.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{e.school}</TableCell>
                  <TableCell className="text-sm">{e.filiere}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{e.niveau}</TableCell>
                  <TableCell className="text-right">
                    <span className={cn("font-bold tabular-nums", e.gpa >= 16 ? "text-success" : e.gpa >= 14 ? "text-primary" : "text-foreground")}>{e.gpa.toFixed(1)}<span className="text-[11px] font-normal text-muted-foreground">/20</span></span>
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">{e.montantAnnuel ? fmtFcfa(e.montantAnnuel) : "—"}</TableCell>
                  <TableCell className="pr-6">
                    <Badge variant="secondary" className={cn("border text-[10px]",
                      e.status === "boursier" ? "border-success/25 bg-success/12 text-success" :
                      e.status === "alumni" ? "border-primary/20 bg-primary/10 text-primary" :
                      e.status === "candidat" ? "border-info/20 bg-info/10 text-info" :
                      "border-warning/30 bg-warning/15 text-warning-foreground"
                    )}>{e.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

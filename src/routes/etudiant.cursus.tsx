import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, TrendingUp, Award, Download, BookOpen, CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/yamna/page-header";
import { ETUDIANTS } from "@/lib/yamna-mock";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/etudiant/cursus")({
  head: () => ({ meta: [{ title: "Mon cursus — YAM'NA" }] }),
  component: EtudiantCursus,
});

const ME = ETUDIANTS[0];

const SEMESTRES = [
  { sem: "S1", periode: "Sept.–Jan. 2022", niveau: "Licence 1", gpa: 14.2, ects: 30, mention: "Assez bien", valide: true },
  { sem: "S2", periode: "Fév.–Jun. 2022", niveau: "Licence 1", gpa: 15.0, ects: 30, mention: "Bien", valide: true },
  { sem: "S3", periode: "Sept.–Jan. 2023", niveau: "Licence 2", gpa: 15.8, ects: 30, mention: "Bien", valide: true },
  { sem: "S4", periode: "Fév.–Jun. 2023", niveau: "Licence 2", gpa: 16.1, ects: 30, mention: "Bien", valide: true },
  { sem: "S5", periode: "Sept.–Jan. 2024", niveau: "Licence 3", gpa: 16.4, ects: 30, mention: "Bien", valide: true },
  { sem: "S6", periode: "Fév.–Jun. 2025", niveau: "Licence 3", gpa: null, ects: 30, mention: "En cours", valide: false },
];

const chartData = SEMESTRES.filter(s => s.gpa !== null).map(s => ({ name: s.sem, gpa: s.gpa }));

const MODULES_S5 = [
  { code: "INF501", name: "Architecture logicielle", coeff: 4, note: 17.5, statut: "valide" },
  { code: "INF502", name: "Réseaux et protocoles", coeff: 3, note: 15.0, statut: "valide" },
  { code: "INF503", name: "Base de données avancées", coeff: 4, note: 18.0, statut: "valide" },
  { code: "INF504", name: "Sécurité informatique", coeff: 3, note: 14.5, statut: "valide" },
  { code: "INF505", name: "Projet de développement", coeff: 6, note: 17.0, statut: "valide" },
  { code: "MAT501", name: "Mathématiques appliquées", coeff: 2, note: 13.0, statut: "valide" },
  { code: "ANG501", name: "Anglais technique", coeff: 2, note: 16.0, statut: "valide" },
];

function getMention(gpa: number) {
  if (gpa >= 16) return { label: "Bien", cls: "bg-success/12 text-success border-success/25" };
  if (gpa >= 14) return { label: "Assez bien", cls: "bg-info/10 text-info border-info/20" };
  if (gpa >= 12) return { label: "Passable", cls: "bg-gold/12 text-gold-foreground border-gold/25" };
  return { label: "Insuffisant", cls: "bg-destructive/10 text-destructive border-destructive/20" };
}

function EtudiantCursus() {
  const totalECTS = SEMESTRES.filter(s => s.valide).reduce((s, r) => s + r.ects, 0);
  const ectsTotal = SEMESTRES.reduce((s, r) => s + r.ects, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mon cursus académique"
        description="Parcours scolaire, résultats par semestre et relevés de notes."
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Télécharger le relevé
          </Button>
        }
      />

      {/* Fiche d'inscription */}
      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold">{ME.filiere}</h2>
              <Badge variant="outline">{ME.niveau}</Badge>
              <Badge className="bg-success/12 text-success border-success/25 hover:bg-success/15">Session {ME.promo}</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{ME.school} · {ME.city}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />Inscrit depuis {ME.joinedAt}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 rounded-xl border bg-secondary/30 px-5 py-3 text-center md:shrink-0">
            <div>
              <p className="text-[11px] text-muted-foreground">Moyenne</p>
              <p className="text-xl font-bold text-success tabular-nums">{ME.gpa}/20</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">ECTS</p>
              <p className="text-xl font-bold text-primary tabular-nums">{totalECTS}/{ectsTotal}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Mention</p>
              <p className="text-sm font-bold text-foreground">Bien</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Évolution GPA */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Évolution de la moyenne par semestre</CardTitle>
            <Badge variant="outline" className="gap-1"><TrendingUp className="h-3 w-3 text-success" />+0.4 depuis S1</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gpaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(var(--color-primary))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="oklch(var(--color-primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[10, 20]} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v: number) => [`${v}/20`, "Moyenne"]}
              />
              <Area type="monotone" dataKey="gpa" stroke="oklch(var(--color-primary))" strokeWidth={2} fill="url(#gpaGrad)" dot={{ r: 4, fill: "oklch(var(--color-primary))" }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* Semestres */}
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Résultats par semestre</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {SEMESTRES.map((s) => {
                const mention = s.gpa ? getMention(s.gpa) : null;
                return (
                  <div key={s.sem} className={cn(
                    "rounded-xl border px-4 py-3",
                    !s.valide && "border-dashed opacity-60"
                  )}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/8 text-sm font-bold text-primary">{s.sem}</span>
                        <div>
                          <p className="text-sm font-semibold">{s.niveau}</p>
                          <p className="text-[11px] text-muted-foreground">{s.periode}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {s.gpa !== null ? (
                          <>
                            <span className="text-base font-bold tabular-nums text-foreground">{s.gpa}/20</span>
                            {mention && <Badge variant="outline" className={cn("text-[10px]", mention.cls)}>{mention.label}</Badge>}
                          </>
                        ) : (
                          <Badge variant="secondary" className="text-[10px]">En cours</Badge>
                        )}
                        <span className="text-[11px] text-muted-foreground">{s.ects} ECTS</span>
                        {s.valide && (
                          <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs">
                            <Download className="h-3 w-3" /> Relevé
                          </Button>
                        )}
                      </div>
                    </div>
                    {s.gpa !== null && (
                      <div className="mt-2">
                        <Progress value={(s.gpa / 20) * 100} className="h-1.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Notes S5 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Détail des notes — S5</CardTitle>
                <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs"><Download className="h-3 w-3" />PDF</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-secondary/30">
                    <th className="py-2 pl-5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Code</th>
                    <th className="py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Module</th>
                    <th className="py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Coeff.</th>
                    <th className="py-2 pr-5 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Note /20</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MODULES_S5.map((m) => (
                    <tr key={m.code} className="hover:bg-secondary/20">
                      <td className="py-2.5 pl-5 font-mono text-xs text-muted-foreground">{m.code}</td>
                      <td className="py-2.5 font-medium">{m.name}</td>
                      <td className="py-2.5 text-center text-muted-foreground">{m.coeff}</td>
                      <td className={cn("py-2.5 pr-5 text-right font-bold tabular-nums", m.note >= 14 ? "text-success" : m.note >= 10 ? "text-foreground" : "text-destructive")}>
                        {m.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t bg-secondary/30">
                    <td colSpan={3} className="py-2.5 pl-5 text-sm font-bold">Moyenne S5</td>
                    <td className="py-2.5 pr-5 text-right text-base font-bold text-success">{ME.gpa}/20</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right — certifications & honneur */}
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Distinctions</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Tableau d'honneur S5", date: "Jan. 2025", icon: Award, cls: "text-gold-foreground bg-gold/15" },
                { label: "Tableau d'honneur S4", date: "Jun. 2024", icon: Award, cls: "text-gold-foreground bg-gold/15" },
                { label: "Mention Bien — L2", date: "Jun. 2023", icon: BookOpen, cls: "text-info bg-info/10" },
                { label: "Prix excellence COMILOG", date: "Oct. 2023", icon: Award, cls: "text-primary bg-primary/10" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border px-3 py-2.5">
                  <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", d.cls)}>
                    <d.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{d.label}</p>
                    <p className="text-[11px] text-muted-foreground">{d.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Progression ECTS</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary tabular-nums">{totalECTS}</p>
                <p className="text-sm text-muted-foreground">crédits validés sur {ectsTotal}</p>
              </div>
              <Progress value={(totalECTS / ectsTotal) * 100} className="h-3" />
              <p className="text-center text-xs text-muted-foreground">
                {ectsTotal - totalECTS} crédits restants pour la Licence 3
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

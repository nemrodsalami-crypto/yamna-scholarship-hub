import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Award, Download, BookOpen, CalendarDays, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/yamna/page-header";
import { ETUDIANTS } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/etudiant/cursus")({
  head: () => ({ meta: [{ title: "Mon cursus — YAM'NA" }] }),
  component: EtudiantCursus,
});

const ME = ETUDIANTS[0];

const SEMESTRES = [
  { sem: "S1", periode: "Sept.–Jan. 2022", niveau: "Licence 1", gpa: 14.2, ects: 30, valide: true },
  { sem: "S2", periode: "Fév.–Jun. 2022",  niveau: "Licence 1", gpa: 15.0, ects: 30, valide: true },
  { sem: "S3", periode: "Sept.–Jan. 2023", niveau: "Licence 2", gpa: 15.8, ects: 30, valide: true },
  { sem: "S4", periode: "Fév.–Jun. 2023",  niveau: "Licence 2", gpa: 16.1, ects: 30, valide: true },
  { sem: "S5", periode: "Sept.–Jan. 2024", niveau: "Licence 3", gpa: 16.4, ects: 30, valide: true },
  { sem: "S6", periode: "Fév.–Jun. 2025",  niveau: "Licence 3", gpa: null,  ects: 30, valide: false },
];

const MODULES_S5 = [
  { code: "INF501", name: "Architecture logicielle",     coeff: 4, note: 17.5 },
  { code: "INF502", name: "Réseaux et protocoles",       coeff: 3, note: 15.0 },
  { code: "INF503", name: "Base de données avancées",    coeff: 4, note: 18.0 },
  { code: "INF504", name: "Sécurité informatique",       coeff: 3, note: 14.5 },
  { code: "INF505", name: "Projet de développement",     coeff: 6, note: 17.0 },
  { code: "MAT501", name: "Mathématiques appliquées",    coeff: 2, note: 13.0 },
  { code: "ANG501", name: "Anglais technique",           coeff: 2, note: 16.0 },
];

function mention(gpa: number) {
  if (gpa >= 16) return { label: "Bien",        cls: "bg-success/10 text-success border-success/20" };
  if (gpa >= 14) return { label: "Assez bien",  cls: "bg-info/10 text-info border-info/20" };
  if (gpa >= 12) return { label: "Passable",    cls: "bg-gold/10 text-gold-foreground border-gold/20" };
  return           { label: "Insuffisant",       cls: "bg-destructive/10 text-destructive border-destructive/20" };
}

function EtudiantCursus() {
  const totalECTS  = SEMESTRES.filter(s => s.valide).reduce((a, s) => a + s.ects, 0);
  const ectsTotal  = SEMESTRES.reduce((a, s) => a + s.ects, 0);

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
      <Card className="p-0 overflow-hidden">
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold">{ME.filiere}</h2>
              <Badge variant="outline">{ME.niveau}</Badge>
              <Badge className="bg-success/12 text-success border-success/25 hover:bg-success/15">
                Session {ME.promo}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{ME.school} · {ME.city}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />Depuis {ME.joinedAt}</span>
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
              <p className="text-sm font-bold">Bien</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_270px]">
        <div className="space-y-5">

          {/* Résultats par semestre */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Résultats par semestre</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {SEMESTRES.map((s) => {
                const m = s.gpa ? mention(s.gpa) : null;
                return (
                  <div
                    key={s.sem}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3",
                      !s.valide && "border-dashed opacity-55"
                    )}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/8 text-sm font-bold text-primary">
                      {s.sem}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{s.niveau}</p>
                      <p className="text-[11px] text-muted-foreground">{s.periode}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {s.gpa !== null ? (
                        <>
                          <span className="text-base font-bold tabular-nums">{s.gpa}/20</span>
                          {m && <Badge variant="outline" className={cn("text-[10px]", m.cls)}>{m.label}</Badge>}
                        </>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">En cours</Badge>
                      )}
                      <span className="text-[11px] text-muted-foreground w-14 text-right">{s.ects} ECTS</span>
                      {s.valide && (
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Notes S5 */}
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <p className="text-sm font-semibold">Détail des notes — S5</p>
              <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs">
                <Download className="h-3 w-3" /> PDF
              </Button>
            </div>
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
                    <td className={cn(
                      "py-2.5 pr-5 text-right font-bold tabular-nums",
                      m.note >= 14 ? "text-success" : m.note >= 10 ? "text-foreground" : "text-destructive"
                    )}>
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
          </Card>
        </div>

        {/* Colonne droite */}
        <div className="space-y-5">

          {/* ECTS en chiffres */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Crédits ECTS</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-end justify-between">
                <p className="text-4xl font-bold text-primary tabular-nums">{totalECTS}</p>
                <p className="pb-1 text-sm text-muted-foreground">/ {ectsTotal} crédits</p>
              </div>
              <div className="rounded-lg border bg-secondary/30 px-3 py-2 text-sm text-muted-foreground">
                {ectsTotal - totalECTS} crédits restants pour valider la Licence 3
              </div>
              <div className="space-y-1">
                {[
                  { label: "Licence 1", ects: 60, fait: 60 },
                  { label: "Licence 2", ects: 60, fait: 60 },
                  { label: "Licence 3", ects: 60, fait: 30 },
                ].map((l) => (
                  <div key={l.label} className="flex items-center justify-between rounded border px-3 py-1.5">
                    <span className="text-xs font-medium">{l.label}</span>
                    <span className={cn(
                      "text-xs font-bold tabular-nums",
                      l.fait === l.ects ? "text-success" : "text-primary"
                    )}>
                      {l.fait}/{l.ects}
                      {l.fait === l.ects && <CheckCircle2 className="ml-1 inline h-3 w-3" />}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distinctions */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Distinctions</CardTitle></CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { label: "Tableau d'honneur S5", date: "Jan. 2025", icon: Award,    cls: "text-gold-foreground bg-gold/15" },
                { label: "Tableau d'honneur S4", date: "Jun. 2024", icon: Award,    cls: "text-gold-foreground bg-gold/15" },
                { label: "Mention Bien — L2",    date: "Jun. 2023", icon: BookOpen, cls: "text-info bg-info/10" },
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
        </div>
      </div>
    </div>
  );
}

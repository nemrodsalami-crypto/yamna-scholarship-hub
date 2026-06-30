import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Inbox, Send, Archive, Star, Search, Plus, Tag, MoreHorizontal,
  AlertTriangle, ChevronRight, Paperclip, Reply, Forward, Trash2,
  Clock, Circle,
} from "lucide-react";
import { PageHeader } from "@/components/yamna/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MSG_THREADS, type MessageThread } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/messagerie")({
  head: () => ({ meta: [{ title: "Messagerie — YAM'NA" }] }),
  component: MessageriePage,
});

const FOLDERS = [
  { id: "entrant", label: "Boîte de réception", icon: Inbox, count: 3 },
  { id: "interne", label: "Interne", icon: Tag, count: 2 },
  { id: "envoi", label: "Envoyés", icon: Send, count: 0 },
  { id: "archive", label: "Archives", icon: Archive, count: 0 },
  { id: "star", label: "Importants", icon: Star, count: 2 },
];

function MessageriePage() {
  const [folder, setFolder] = useState("entrant");
  const [selected, setSelected] = useState<MessageThread | null>(MSG_THREADS[0]);
  const [query, setQuery] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const threads = MSG_THREADS.filter((t) => {
    const q = query.toLowerCase();
    const mQ = !q || t.subject.toLowerCase().includes(q) || t.from.toLowerCase().includes(q);
    const mF = folder === "entrant" ? t.categorie === "entrant" || t.categorie === "interne" : true;
    return mQ && mF;
  });

  const unread = MSG_THREADS.filter(t => t.unread).length;

  return (
    <div>
      <PageHeader
        title="Messagerie"
        description="Échanges internes, notifications et communications du programme YAM'NA."
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => setShowCompose(true)}><Plus className="h-3.5 w-3.5" /> Nouveau message</Button>
        }
      />

      <div className="flex h-[calc(100vh-220px)] min-h-[560px] gap-4 overflow-hidden">
        {/* Left: folder nav */}
        <Card className="flex w-52 shrink-0 flex-col gap-0 p-0 overflow-hidden">
          <div className="p-3 border-b">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Dossiers</p>
          </div>
          <ScrollArea className="flex-1 p-2">
            <nav className="space-y-0.5">
              {FOLDERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFolder(f.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition",
                    folder === f.id ? "bg-primary/8 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <f.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate text-left">{f.label}</span>
                  {f.count > 0 && (
                    <Badge variant="secondary" className="h-5 min-w-[20px] rounded-md px-1 text-[10px]">{f.count}</Badge>
                  )}
                </button>
              ))}
            </nav>

            <Separator className="my-3" />

            <div className="px-2">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Priorité</p>
              {[
                { label: "Urgent", cls: "text-destructive" },
                { label: "Haute priorité", cls: "text-warning-foreground" },
                { label: "Normal", cls: "text-muted-foreground" },
              ].map((l) => (
                <button key={l.label} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-accent">
                  <Circle className={cn("h-2.5 w-2.5 fill-current", l.cls)} />
                  <span className="text-muted-foreground">{l.label}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Center: thread list */}
        <Card className="flex w-80 shrink-0 flex-col gap-0 p-0 overflow-hidden">
          <div className="border-b p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="h-8 pl-8 text-xs" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className={cn(
                    "w-full p-3 text-left transition hover:bg-accent/50",
                    selected?.id === t.id && "bg-primary/5 border-l-2 border-primary"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-bold text-white", t.fromTone)}>{t.fromInitials}</AvatarFallback>
                      </Avatar>
                      {t.unread && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={cn("truncate text-xs", t.unread ? "font-semibold text-foreground" : "font-medium text-muted-foreground")}>{t.from}</span>
                        <span className="shrink-0 text-[10px] text-muted-foreground">{t.time}</span>
                      </div>
                      <p className={cn("mt-0.5 truncate text-xs leading-tight", t.unread ? "font-medium text-foreground" : "text-muted-foreground")}>{t.subject}</p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{t.preview}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <PrioriteBadge p={t.priorite} />
                        <CategorieBadge c={t.categorie} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {threads.length === 0 && (
                <div className="grid place-items-center py-12 text-xs text-muted-foreground">Aucun message trouvé.</div>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Right: thread detail */}
        <Card className="flex min-w-0 flex-1 flex-col gap-0 p-0 overflow-hidden">
          {selected ? (
            <>
              <div className="flex items-start justify-between gap-4 border-b p-4">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold leading-tight">{selected.subject}</h2>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>De : <strong className="text-foreground">{selected.from}</strong></span>
                    <span>·</span>
                    <span>{selected.time}</span>
                    <span>·</span>
                    <PrioriteBadge p={selected.priorite} />
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Reply className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Forward className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Archive className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selected.messages.map((msg, i) => (
                    <div key={i} className="flex gap-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-semibold text-white", msg.tone)}>{msg.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{msg.who}</span>
                          </div>
                          <span className="text-[11px] text-muted-foreground shrink-0"><Clock className="mr-1 inline h-3 w-3" />{msg.time}</span>
                        </div>
                        <div className="mt-1.5 rounded-lg border bg-secondary/30 p-3">
                          <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-3">
                <Textarea placeholder={`Répondre à ${selected.from}…`} rows={2} className="resize-none text-sm" />
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Paperclip className="h-3.5 w-3.5" /></Button>
                  </div>
                  <Button size="sm" className="gap-1.5"><Reply className="h-3.5 w-3.5" /> Répondre</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="grid flex-1 place-items-center text-sm text-muted-foreground">
              Sélectionnez un message pour le lire.
            </div>
          )}
        </Card>
      </div>

      {/* Compose sheet */}
      <Sheet open={showCompose} onOpenChange={setShowCompose}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Nouveau message</SheetTitle>
            <SheetDescription>Rédigez et envoyez un message à un membre de l'équipe ou un référent.</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Destinataire(s)</Label>
              <Input placeholder="Email ou nom…" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Objet</Label>
              <Input placeholder="Objet du message…" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Message</Label>
              <Textarea rows={8} placeholder="Rédigez votre message…" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Priorité</Label>
              <div className="flex gap-2">
                {["Normal", "Haute", "Urgent"].map((p) => (
                  <Button key={p} variant={p === "Normal" ? "default" : "outline"} size="sm" className="h-8 text-xs">{p}</Button>
                ))}
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" className="gap-1.5"><Paperclip className="h-3.5 w-3.5" /> Joindre</Button>
            <Button className="gap-1.5" onClick={() => setShowCompose(false)}><Send className="h-3.5 w-3.5" /> Envoyer</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function PrioriteBadge({ p }: { p: string }) {
  if (p === "normal") return null;
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
      p === "urgent" ? "bg-destructive/10 text-destructive" : "bg-warning/15 text-warning-foreground"
    )}>
      <AlertTriangle className="h-2.5 w-2.5" />{p === "urgent" ? "Urgent" : "Haute"}
    </span>
  );
}

function CategorieBadge({ c }: { c: string }) {
  const map: Record<string, string> = {
    entrant: "bg-info/10 text-info",
    interne: "bg-primary/10 text-primary",
    envoi: "bg-secondary text-muted-foreground",
  };
  const labels: Record<string, string> = { entrant: "Entrant", interne: "Interne", envoi: "Envoyé" };
  return <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", map[c])}>{labels[c]}</span>;
}

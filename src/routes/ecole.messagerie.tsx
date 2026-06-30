import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Paperclip, Reply, Archive } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/yamna/page-header";
import { MSG_THREADS } from "@/lib/yamna-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ecole/messagerie")({
  head: () => ({ meta: [{ title: "Messagerie — YAM'NA École" }] }),
  component: EcoleMessagerie,
});

const THREADS = MSG_THREADS.slice(2, 5);

function EcoleMessagerie() {
  const [selected, setSelected] = useState(THREADS[0]);
  const [reply, setReply] = useState("");

  return (
    <div className="space-y-4">
      <PageHeader
        title="Messagerie"
        description="Échanges avec le service des bourses COMILOG."
      />

      <div className="flex h-[calc(100vh-260px)] min-h-[480px] gap-4">
        {/* Thread list */}
        <Card className="flex w-72 shrink-0 flex-col overflow-hidden p-0">
          <div className="border-b px-4 py-3">
            <p className="text-sm font-semibold">Messages</p>
            <Badge variant="secondary" className="mt-1 h-5 rounded-md px-1.5 text-[10px]">1 non lu</Badge>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {THREADS.map((t) => {
                const unread = t.unread > 0;
                const active = selected.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelected(t)}
                    className={cn(
                      "relative flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40",
                      active && "bg-secondary/60 border-l-2 border-info"
                    )}
                  >
                    <Avatar className="mt-0.5 h-8 w-8 shrink-0">
                      <AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-bold text-white", t.avatarTone)}>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className={cn("truncate text-sm", unread ? "font-bold" : "font-medium")}>{t.from}</p>
                        <span className="shrink-0 text-[10px] text-muted-foreground">{t.lastTime}</span>
                      </div>
                      <p className={cn("truncate text-[11px]", unread ? "font-semibold text-foreground" : "text-muted-foreground")}>{t.subject}</p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{t.preview}</p>
                      {unread && <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-info" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Thread detail */}
        <Card className="flex min-w-0 flex-1 flex-col overflow-hidden p-0">
          <div className="flex items-start justify-between border-b px-5 py-3">
            <div>
              <p className="font-semibold">{selected.subject}</p>
              <p className="text-xs text-muted-foreground">De : {selected.from} · {selected.lastTime}</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Reply className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Archive className="h-4 w-4" /></Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {selected.messages.map((msg, i) => (
                <div key={i} className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className={cn("bg-gradient-to-br text-[10px] font-bold text-white", msg.tone)}>{msg.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{msg.who}</span>
                      <span className="text-[11px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <div className="mt-1.5 rounded-xl rounded-tl-none border bg-secondary/30 px-4 py-3 text-sm">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder={`Répondre à ${selected.from}…`}
              rows={3}
              className="resize-none text-sm"
            />
            <div className="mt-2 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
                <Paperclip className="h-3.5 w-3.5" /> Joindre un fichier
              </Button>
              <Button size="sm" className="gap-1.5" disabled={!reply.trim()} onClick={() => setReply("")}>
                <Send className="h-3.5 w-3.5" /> Envoyer
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

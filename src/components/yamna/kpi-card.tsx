import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  spark?: number[];
  tone?: "primary" | "success" | "gold" | "info";
  icon?: React.ReactNode;
}

const TONES = {
  primary: "text-primary",
  success: "text-success",
  gold: "text-gold-foreground",
  info: "text-info",
} as const;

export function KpiCard({ label, value, delta, hint, spark, tone = "primary", icon }: KpiCardProps) {
  const data = (spark ?? [4, 6, 5, 8, 7, 10, 9, 12, 11, 14]).map((v, i) => ({ i, v }));
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground tabular-nums">{value}</p>
        </div>
        {icon && (
          <div className={cn("grid h-9 w-9 place-items-center rounded-lg bg-secondary", TONES[tone])}>
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {delta !== undefined && (
            <span className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold",
              positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}>
              {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(delta)}%
            </span>
          )}
          {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        </div>
        <div className="h-8 w-24 opacity-90">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`g-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={1.5} fill={`url(#g-${label})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

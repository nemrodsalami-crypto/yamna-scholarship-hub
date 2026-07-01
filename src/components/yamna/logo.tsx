import { cn } from "@/lib/utils";

interface YamnaLogoProps {
  className?: string;
  compact?: boolean;
  /** Utiliser la version blanche pour les fonds sombres */
  white?: boolean;
}

export function YamnaLogo({ className, compact = false, white = false }: YamnaLogoProps) {
  const src = white ? "/logo-eramet-comilog-white.png" : "/logo-eramet-comilog.png";

  if (compact) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <img src={src} alt="Eramet Comilog" className="h-7 w-auto object-contain" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <img src={src} alt="Eramet Comilog" className="h-10 w-auto object-contain" />
    </div>
  );
}

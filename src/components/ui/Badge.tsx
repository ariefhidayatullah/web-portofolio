import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "dark" | "blue" | "green" | "zinc";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors";

  const variants = {
    default: "bg-white/5 text-slate-300 border border-white/10",
    dark: "bg-blue-600/20 text-blue-300 border border-blue-500/30",
    blue: "bg-sky-500/10 text-sky-300 border border-sky-500/25",
    green: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/25",
    zinc: "bg-white/5 text-slate-400 border border-white/10",
  };

  return (
    <span className={cn(base, variants[variant], className)}>{children}</span>
  );
}

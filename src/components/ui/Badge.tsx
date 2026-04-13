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
    default: "bg-zinc-100 text-zinc-700",
    dark: "bg-[#111111] text-white",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    green: "bg-green-50 text-green-700 border border-green-200",
    zinc: "bg-zinc-100 text-zinc-500",
  };

  return (
    <span className={cn(base, variants[variant], className)}>{children}</span>
  );
}

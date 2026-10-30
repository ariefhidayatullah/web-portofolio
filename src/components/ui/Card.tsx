import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6",
        hover &&
          "hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(44,103,237,0.15)] transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

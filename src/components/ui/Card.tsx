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
        "bg-white border border-zinc-200 rounded-xl p-6",
        hover &&
          "hover:-translate-y-1 hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

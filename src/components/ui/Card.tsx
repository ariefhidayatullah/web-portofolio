import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

// .glass-card is unlayered CSS, so it beats SpotlightCard's own surface/shadow.
// Radius and padding need "!" to beat its rounded-3xl p-8.
export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <SpotlightCard
      spotlightColor="#60a5fa"
      className={cn(
        "glass-card rounded-2xl! p-6!",
        hover &&
          "hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(44,103,237,0.15)] transition-all duration-300",
        className
      )}
    >
      {children}
    </SpotlightCard>
  );
}

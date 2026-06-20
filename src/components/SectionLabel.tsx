import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold uppercase tracking-lux text-primary/80 dark:text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}

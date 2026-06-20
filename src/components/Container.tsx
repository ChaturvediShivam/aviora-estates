import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  tight?: boolean;
}

export function Container({ children, className, tight }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-6 lg:px-8",
        tight ? "max-w-3xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}

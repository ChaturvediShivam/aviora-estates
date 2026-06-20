import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
}

const sizeClasses = {
  xl: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  lg: "text-3xl md:text-4xl lg:text-5xl",
  md: "text-2xl md:text-3xl",
};

export function SectionHeading({
  children,
  className,
  as: Component = "h2",
  size = "lg",
}: SectionHeadingProps) {
  return (
    <Component
      className={cn(
        "font-serif text-text-heading leading-[1.1] tracking-tight dark:text-text-inverse",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

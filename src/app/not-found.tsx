import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 md:pb-32 bg-luxury-gradient dark:bg-luxury-gradient-dark flex items-center">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-lux text-primary/80 dark:text-primary mb-5">404 — Page Not Found</p>
        <SectionHeading size="xl" className="mb-6">
          This corner of the estate is quiet.
        </SectionHeading>
        <p className="mx-auto max-w-xl text-lg text-muted dark:text-muted-inverse mb-10">
          The page you were looking for does not exist. Let us guide you back to the villa.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary">Return Home</Button>
          <Button href="/properties/noida-estate" variant="outline">Explore the Villa</Button>
        </div>
      </Container>
    </section>
  );
}

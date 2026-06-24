import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          December 2–3, 2026 &middot; Bell Harbor Conference Center, Seattle
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Digital Health Counsel
        </h1>
        <p className="mt-4 text-xl font-medium text-accent-light sm:text-2xl">
          From Promise to Proof: The Legal Operating System for Healthcare AI
        </p>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          The curated summit for the lawyers and leaders responsible for making
          healthcare AI provable, governable, contractable, and trustworthy.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/apply">
            <Button size="lg">Apply to Participate</Button>
          </Link>
          <Link href="/events">
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
              Explore Past Summits
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              December 2–3, 2026 &middot; Bell Harbor Conference Center, Seattle
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              DHC26 AI Summit
            </h1>
            <p className="mt-4 text-xl font-medium text-accent-light sm:text-2xl">
              From Promise to Proof: The Legal Operating System for Healthcare AI
            </p>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              The curated summit for the lawyers and leaders responsible for
              building the legal, governance, and trust infrastructure for
              healthcare AI.
            </p>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              DHC26 will focus on the practical work required to move healthcare
              AI from promise to responsible deployment at scale: evidence of
              value, AI governance, vendor contracting, liability allocation,
              health data rights, product counsel, consumer-facing AI, and legal
              operations.
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
          <div className="flex-shrink-0">
            <Image
              src="/images/dhc-logo.jpeg"
              alt="Digital Health Counsel"
              width={400}
              height={400}
              className="rounded-2xl border border-white/15 shadow-2xl shadow-black/30"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Transforming Health Care
          <span className="block text-accent-light">Through Innovation</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          Digital Health Council convenes, educates and empowers leaders
          dedicated to transforming health care through technology, policy, and
          innovation.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/summit-2026">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-white">
              2026 Summit
            </Button>
          </Link>
          <Link href="/events">
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
              Past Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

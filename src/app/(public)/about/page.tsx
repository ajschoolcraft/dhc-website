import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Digital Health Counsel brings together leaders working at the intersection of healthcare, technology, law, policy, data, and artificial intelligence.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        About Digital Health Counsel
      </h1>

      <div className="mt-8 space-y-6 text-text-light leading-relaxed">
        <p>
          Digital Health Counsel brings together leaders working at the
          intersection of healthcare, technology, law, policy, data, and
          artificial intelligence.
        </p>

        <p>
          Founded by healthcare and technology lawyer Dave Schoolcraft, DHC was
          created to support practical, cross-disciplinary conversation about how
          digital innovation is reshaping healthcare. Our work focuses on the
          real-world challenges of health system transformation — including AI
          governance, digital health strategy, data use, interoperability,
          privacy, procurement, contracting, regulatory change, and responsible
          implementation.
        </p>

        <p>
          The annual DHC AI Summit convenes health systems, technology companies,
          policymakers, lawyers, investors, clinicians, and innovators to move
          beyond abstract discussion and focus on what it takes to implement AI
          and data-driven tools in ways that are trustworthy, effective, and
          aligned with the needs of patients, providers, and communities.
        </p>

        <p>
          DHC is built around a simple premise: the future of healthcare will not
          be shaped by technology alone. It will require collaboration across
          disciplines, institutions, and sectors — and a shared commitment to
          turning innovation into responsible practice.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text">Founder</h2>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row">
          <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-xl">
            <Image
              src="/images/speakers/dhc-2024/dave-schoolcraft.jpg"
              alt="Dave Schoolcraft"
              fill
              className="object-cover"
              style={{ objectPosition: "center top" }}
              sizes="192px"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text">
              Dave Schoolcraft<span className="font-normal text-text-light">, JD</span>
            </h3>
            <p className="text-sm text-accent">
              Partner and Chair, Digital Health Team
            </p>
            <p className="text-sm text-text-light">Ogden Murphy Wallace</p>
            <p className="mt-3 text-sm leading-relaxed text-text-light">
              Dave Schoolcraft has worked for more than 25 years at the
              intersection of health care, law, and all things digital. He is a
              Partner and Chair of the Digital Health Team at the Ogden Murphy
              Wallace law firm in Seattle. He provides strategic guidance to
              health care provider organizations and technology companies seeking
              to drive health system transformation. Dave has a national practice
              advising clients on technology licensing, artificial intelligence,
              data governance, health information privacy and security issues.
              Dave is also the founder of the Digital Health Group, LLC which
              produces collaborative events for those working on the next wave of
              AI and data-driven innovation in health care.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 rounded-xl bg-surface p-8 text-center">
        <h2 className="text-xl font-bold text-text">Get in Touch</h2>
        <p className="mt-2 text-text-light">
          Questions about DHC or interested in getting involved?
        </p>
        <div className="mt-4">
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

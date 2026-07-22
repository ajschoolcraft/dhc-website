import Image from "next/image";
import { SponsorInquiryForm } from "@/components/forms/sponsor-inquiry-form";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

const pastSponsors = [
  { name: "Ogden Murphy Wallace", logo: "/images/sponsors/ogden-murphy-wallace.png", width: 180, height: 160 },
  { name: "Microsoft", logo: "/images/sponsors/microsoft.png", width: 550, height: 120 },
  { name: "Milliman", logo: "/images/sponsors/milliman-logo.png", width: 260, height: 60 },
  { name: "Fenwick", logo: "/images/sponsors/fenwick-logo.png", width: 180, height: 180 },
];

export const metadata: Metadata = {
  title: "Sponsorship",
  description: "Sponsor the 2026 Digital Health Counsel AI Summit.",
};

const sponsorTiers = [
  { name: "Anchor Sponsor", description: "Premier visibility and strategic alignment with DHC26." },
  { name: "Strategic Track Sponsor", description: "Align your brand with a specific DHC26 content track." },
  { name: "Legal Operations Sponsor", description: "Support the AI for legal operations programming." },
  { name: "GC / Legal Leadership Dinner Sponsor", description: "Host the exclusive dinner for general counsel and legal leadership." },
  { name: "Speaker / Faculty Dinner Sponsor", description: "Host the speakers and faculty dinner." },
  { name: "Reception Sponsor", description: "Sponsor the networking reception." },
  { name: "Supporting Sponsor", description: "Support DHC26 and gain brand visibility." },
];

export default function SponsorshipPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-text">Sponsor DHC26</h1>
        <p className="mt-4 text-text-light text-lg">
          DHC26 brings together a curated audience of senior legal and governance
          leaders from health systems, digital health companies, AI companies,
          regulators, academics, law firms, insurers, consultants, and legal tech.
        </p>
        <p className="mt-4 text-text-light">
          Sponsoring DHC26 is an opportunity to support serious education and
          responsible healthcare AI adoption while engaging directly with the
          decision-makers shaping the legal infrastructure for healthcare AI.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text">Sponsorship Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {sponsorTiers.map((tier) => (
            <Card key={tier.name}>
              <CardContent>
                <h3 className="font-semibold text-text">{tier.name}</h3>
                <p className="mt-1 text-sm text-text-light">{tier.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text">Past Sponsors</h2>
        <div className="mt-6 grid grid-cols-2 gap-6">
          {pastSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center rounded-xl bg-surface p-10 h-48"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-xl">
        <h2 className="text-2xl font-bold text-text">Submit Sponsor Inquiry</h2>
        <p className="mt-2 text-sm text-text-light">
          Interested in sponsoring? Fill out the form below or contact us at{" "}
          <a href="mailto:info@digitalhealthcounsel.com" className="text-accent hover:underline">
            info@digitalhealthcounsel.com
          </a>
        </p>
        <div className="mt-8">
          <SponsorInquiryForm />
        </div>
      </section>
    </div>
  );
}

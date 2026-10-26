import Image from "next/image";
import { Hero } from "@/components/marketing/hero";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const speakers: { name: string; title?: string; org?: string; photo: string; photoPosition?: string; logo?: string; logoClass?: string }[] = [
  { name: "Prof. Glenn Cohen", title: "Deputy Dean", org: "Harvard Law School", photo: "/images/speakers/dhc-2026/glenn-cohen.jpg", photoPosition: "5% 35%" },
  { name: "Joanne Kim", title: "Director of Products & Services", org: "VegaHealth", photo: "/images/speakers/dhc-2026/joannekim.jpg", photoPosition: "center 15%", logo: "/images/logos/speakers/vegahealth.png" },
  { name: "Julie Barnes", title: "Co-founder & CEO", org: "Maverick Health Policy", photo: "/images/speakers/dhc-2026/julie-barnes.jpg", photoPosition: "45% 30%", logo: "/images/logos/speakers/maverick.png", logoClass: "h-10 max-w-[160px]" },
  { name: "Brendan Keeler", title: "Interoperability Practice Lead", org: "HTD", photo: "/images/speakers/dhc-2026/brendan-keeler.jpg", photoPosition: "center 25%", logo: "/images/logos/speakers/htd.png" },
  { name: "Jill Degraff", title: "Chief Privacy & Regulatory Officer", org: "b.well", photo: "/images/speakers/dhc-2026/jill-degraff.jpg", photoPosition: "55% 25%", logo: "/images/logos/speakers/bwell.png" },
  { name: "Jake Bernstein", title: "Global AI & Innovation Partner", org: "K&L Gates", photo: "/images/speakers/dhc-2026/jake-bernstein.jpg", photoPosition: "center 5%", logo: "/images/logos/speakers/kl-gates.svg" },
  { name: "Tayab Waseem", title: "MD, PhD", org: "George Washington University", photo: "/images/speakers/dhc-2026/twaseem.jpg", logo: "/images/logos/speakers/gwu-transparent.png" },
  { name: "Lucia C. Savage", title: "CEO", org: "Savage Healthcare Strategies", photo: "/images/speakers/dhc-2026/lucia2.jpg", photoPosition: "center 5%", logo: "/images/logos/speakers/savage-healthcare.svg", logoClass: "h-10 max-w-[150px]" },
  { name: "Brenton Hill", title: "Operations & General Counsel", org: "CHAI", photo: "/images/speakers/dhc-2026/brenton-hill.jpg", photoPosition: "center 25%", logo: "/images/logos/speakers/chai.png" },
  { name: "Deven McGraw", title: "Chief Regulatory & Privacy Officer", org: "Citizen Health", photo: "/images/speakers/dhc-2026/deven-mcgraw.jpg", photoPosition: "20% 30%", logo: "/images/logos/speakers/citizen-health.png" },
  { name: "Rachel Larrenaga", title: "General Counsel", org: "Cepheid", photo: "/images/speakers/dhc-2026/rachel-larrenaga.jpg", photoPosition: "center 20%", logo: "/images/logos/speakers/cepheid.svg", logoClass: "h-12 max-w-[140px]" },
  { name: "Laura Jantos", title: "Founder & CEO", org: "LDJ Consulting LLC", photo: "/images/speakers/dhc-2026/laura-jantos.jpg", photoPosition: "center 25%" },
  { name: "Zach Boyd", title: "Director of the Office of AI", org: "State of Utah", photo: "/images/speakers/dhc-2026/zach-boyd.jpg", photoPosition: "center 15%", logo: "/images/logos/speakers/utah-ai-transparent.png" },
  { name: "Merry-Ann Keane", title: "Superintendent & CEO", org: "Ocean Beach Health", photo: "/images/speakers/dhc-2026/merry-ann-keane.jpg", photoPosition: "center 25%", logo: "/images/logos/speakers/ocean-beach-health.png", logoClass: "h-11 max-w-[145px]" },
  { name: "Ranjani Ramamurthy", title: "Physician-Engineer & Founder", org: "LLMED.AI", photo: "/images/speakers/dhc-2026/ranjani-ramamurthy.jpg", photoPosition: "center 30%", logo: "/images/logos/speakers/llmed-ai.png" },
];

const whyDhc26 = [
  { title: "AI Governance", description: "Frameworks for health system AI oversight, risk management, and institutional accountability." },
  { title: "Vendor Diligence & Contracting", description: "Practical approaches to evaluating, negotiating, and contracting with healthcare AI vendors." },
  { title: "Liability & Risk Allocation", description: "Emerging liability frameworks and allocation of responsibility across the AI value chain." },
  { title: "Evidence of Value", description: "Standards for substantiating clinical and operational claims made by AI-enabled products." },
  { title: "FDA, SaMD & CDS", description: "Regulatory pathways for software as a medical device and clinical decision support." },
  { title: "Health Data Rights & Privacy", description: "Data rights, de-identification, secondary use, and privacy in the age of model training." },
  { title: "Consumer Health AI", description: "Legal and ethical challenges of consumer-facing AI, chatbots, and mental health tools." },
  { title: "AI for Legal Operations", description: "How healthcare legal teams are using AI to transform their own workflows and operations." },
];

const whoShouldApply = [
  "Health system GCs, AGCs, and in-house counsel",
  "Product counsel at digital health, health IT, AI, medtech, and life sciences companies",
  "Privacy, compliance, cybersecurity, and data governance leaders",
  "Legal operations leaders",
  "Outside counsel working deeply in healthcare AI, digital health, FDA, privacy, technology transactions, and risk management",
  "Regulators, academics, and policy leaders",
  "Selected technology, insurance, consulting, and legal tech leaders with substantive experience in the space",
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  return (
    <>
      <Hero />

      {payment === "success" && (
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
            <h3 className="text-lg font-semibold text-green-800">Payment Confirmed</h3>
            <p className="mt-2 text-sm text-green-700">
              Thank you! Your registration is complete. You will receive a confirmation email shortly.
            </p>
          </div>
        </div>
      )}
      {payment === "cancelled" && (
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-6 text-center">
            <h3 className="text-lg font-semibold text-yellow-800">Payment Cancelled</h3>
            <p className="mt-2 text-sm text-yellow-700">
              Your payment was not completed. You can use the link in your approval email to try again.
            </p>
          </div>
        </div>
      )}

      <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-text">
          Speaker Spotlight
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-light">
          Confirmed speakers for DHC26 — more announcements coming soon.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {speakers.map((speaker, i) => (
            <div key={speaker.name} className={`flex flex-col items-center text-center${i === speakers.length - 1 && speakers.length % 2 === 1 ? " col-span-2 sm:col-span-1" : ""}`}>
              <div className="relative aspect-square w-full max-w-[160px] overflow-hidden rounded-2xl border border-gray-100">
                <Image
                  src={speaker.photo}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                  style={{
                    ...(speaker.photoPosition ? { objectPosition: speaker.photoPosition } : {}),
                  }}
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-text">{speaker.name}</p>
              {speaker.title && (
                <p className="mt-0.5 text-xs text-text-light">{speaker.title}</p>
              )}
              {speaker.logo ? (
                <div className={`mt-auto pt-2 w-full ${speaker.logoClass ?? "h-10 max-w-[140px]"}`}>
                  <Image
                    src={speaker.logo}
                    alt={speaker.org ?? ""}
                    width={160}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : speaker.org ? (
                <div className="mt-auto pt-2 flex h-10 max-w-[140px] flex-col items-center justify-center leading-tight">
                  {speaker.org === "Harvard Law School" ? (
                    <>
                      <span className="text-xs font-bold tracking-wide text-text">Harvard</span>
                      <span className="text-xs font-bold tracking-wide text-text">Law School</span>
                    </>
                  ) : speaker.org === "LDJ Consulting LLC" ? (
                    <>
                      <span className="text-xs font-bold tracking-wide text-text">LDJ</span>
                      <span className="text-xs font-bold tracking-wide text-text">Consulting</span>
                    </>
                  ) : (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-text-light/70">{speaker.org}</span>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-text-light">
          DHC26 Sponsors
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 items-end gap-10 sm:gap-8">
          <div className="flex flex-col items-center">
            <div className="flex h-[200px] items-center">
              <Image
                src="/images/logos/sponsors/legora.png"
                alt="Legora"
                width={320}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-text-light">Presenting Partner</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-[200px] items-center">
              <Image
                src="/images/sponsors/omw-logo-blue.png"
                alt="Ogden Murphy Wallace"
                width={280}
                height={280}
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-text-light">Founding Sponsor</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-[200px] items-center">
              <Image
                src="/images/logos/sponsors/seattle-u-law.png"
                alt="Seattle University School of Law"
                width={300}
                height={228}
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-text-light">Principal Academic Sponsor</p>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-text">
            About Digital Health Counsel
          </h2>
          <p className="mt-6 text-text-light text-lg">
            Digital Health Counsel is a convening platform for leaders working at
            the intersection of healthcare, technology, artificial intelligence,
            law, governance, privacy, data strategy, and innovation.
          </p>
          <p className="mt-4 text-text-light">
            Healthcare AI has moved beyond the question of whether the technology
            is impressive. The next phase is about evidence, governance,
            contracting, liability allocation, data rights, product counsel,
            consumer-facing AI, legal operations, and institutional trust.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src="/images/landing-page-photo.jpg"
            alt="DHC 2025 summit — attendees and panelists during a session"
            fill
            className="object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
            priority
          />
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-text">
            Why DHC26 Matters
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyDhc26.map((item) => (
              <Card key={item.title}>
                <CardContent>
                  <h3 className="font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-light">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-text">
          Who Should Apply
        </h2>
        <ul className="mx-auto mt-8 max-w-2xl space-y-3">
          {whoShouldApply.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
              <span className="text-text-light">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-text">
            Past Summit Highlights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-text-light">
            Digital Health Counsel has grown into a serious recurring convening
            for healthcare AI, law, policy, technology, and governance leaders.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { name: "DHC23", desc: "Our inaugural summit convening healthcare AI and legal leaders." },
              { name: "DHC24", desc: "Expanded to include product counsel, privacy, and AI governance tracks." },
              { name: "DHC25", desc: "Our largest gathering with speakers from health systems, regulators, and AI companies." },
            ].map((event) => (
              <Card key={event.name}>
                <CardContent>
                  <h3 className="font-semibold text-text">{event.name}</h3>
                  <p className="mt-2 text-sm text-text-light">{event.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/events"
              className="text-sm font-medium text-accent hover:text-accent-dark"
            >
              View all past summits &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
          <h2 className="text-3xl font-bold">Apply to DHC26</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Applications are reviewed on a rolling basis. Accepted applicants
            will receive registration details after review.
          </p>
          <div className="mt-8">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-white hover:bg-accent-light transition-colors"
            >
              Apply to Participate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

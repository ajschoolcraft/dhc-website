import { Hero } from "@/components/marketing/hero";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const whyDhc26 = [
  { title: "AI Governance", description: "Frameworks for health system AI oversight, risk management, and institutional accountability." },
  { title: "Vendor Diligence & Contracting", description: "Practical approaches to evaluating, negotiating, and contracting with healthcare AI vendors." },
  { title: "Liability & Allocation", description: "Emerging liability frameworks and allocation of responsibility across the AI value chain." },
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

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-text">
          About Digital Health Counsel
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-text-light text-lg">
          Digital Health Counsel is a convening platform for leaders working at
          the intersection of healthcare, technology, artificial intelligence,
          law, governance, privacy, data strategy, and innovation.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-text-light">
          Healthcare AI has moved beyond the question of whether the technology
          is impressive. The next phase is about evidence, governance,
          contracting, liability allocation, data rights, product counsel,
          consumer-facing AI, legal operations, and institutional trust.
        </p>
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
              { name: "DHC 2023", desc: "Our inaugural summit convening healthcare AI and legal leaders." },
              { name: "DHC 2024", desc: "Expanded to include product counsel, privacy, and AI governance tracks." },
              { name: "DHC 2025", desc: "Our largest gathering with speakers from health systems, regulators, and AI companies." },
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

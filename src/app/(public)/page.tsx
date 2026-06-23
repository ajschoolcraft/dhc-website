import { Hero } from "@/components/marketing/hero";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const highlights = [
  {
    title: "Annual Summits",
    description:
      "Multi-day events bringing together leaders in healthcare, law, technology, and policy to address the most pressing challenges in digital health.",
  },
  {
    title: "Strategic Consulting",
    description:
      "Expert guidance on complex legal, policy, and operational issues facing health IT developers, providers, researchers, and entrepreneurs.",
  },
  {
    title: "Education & Community",
    description:
      "Webinars, in-person events, and a growing network of professionals dedicated to advancing digital health innovation.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-text">
          What We Do
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-light">
          DHC helps address complex legal, policy and operational issues in
          support of information technology developers, health care providers,
          researchers, investors and digital health entrepreneurs.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardContent>
                <p className="mt-2 text-sm text-text-light">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-text">2026 DHC Summit</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-light">
            Join healthcare, legal, and technology leaders for our premier annual
            event. Applications are now open.
          </p>
          <div className="mt-8">
            <Link
              href="/summit-2026"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-light transition-colors"
            >
              Learn More & Apply
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

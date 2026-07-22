import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import DHC2023Page from "./dhc-2023-page";
import DHC2024Page from "./dhc-2024-page";
import DHC2025Page from "./dhc-2025-page";

type Speaker = { name: string; title: string; organization: string };

type EventData = {
  title: string;
  date: string;
  location: string;
  description: string;
  themes: string[];
  speakers: Speaker[];
};

const events: Record<string, EventData> = {
  "dhc-2025": {
    title: "DHC 2025 — Digital Health Counsel AI Summit",
    date: "November 19–20, 2025",
    location: "Seattle, WA",
    description:
      "The third annual Digital Health Counsel summit and our largest gathering to date, in collaboration with Ogden Murphy Wallace and Microsoft.",
    themes: [],
    speakers: [],
  },
  "microsoft-workshop-2025": {
    title: "Spring 2025 Microsoft Workshop",
    date: "Spring 2025",
    location: "Microsoft Campus, Redmond, WA",
    description:
      "An intensive workshop held in collaboration with Microsoft, bringing together healthcare AI leaders, enterprise technology strategists, and legal professionals. The workshop focused on responsible AI deployment in healthcare, enterprise governance frameworks, and practical strategies for managing AI risk at scale.",
    themes: [
      "Responsible AI in healthcare",
      "Enterprise AI governance",
      "Microsoft healthcare AI capabilities",
      "AI risk management at scale",
    ],
    speakers: [
      { name: "Speaker details", title: "Coming soon", organization: "Check back for updates" },
    ],
  },
  "dhc-2024": {
    title: "DHC 2024",
    date: "2024",
    location: "Seattle, WA",
    description:
      "The second annual Digital Health Counsel summit expanded to include dedicated tracks on product counsel, privacy and data governance, and AI governance. DHC 2024 featured speakers from leading health systems, digital health companies, regulatory bodies, and law firms.",
    themes: [
      "Product counsel for healthcare AI",
      "Privacy and data governance",
      "AI governance and risk management",
      "Evidence of value for AI products",
      "Liability and risk allocation",
    ],
    speakers: [
      { name: "Speaker details", title: "Coming soon", organization: "Check back for updates" },
    ],
  },
  "dhc-2023": {
    title: "DHC 2023 — Advancing Medicine in the Age of AI",
    date: "September 12–13, 2023",
    location: "Seattle, WA",
    description:
      "The inaugural Digital Health Counsel summit brought together healthcare AI and legal leaders for two days of focused programming on the emerging legal infrastructure needed for healthcare AI adoption.",
    themes: [],
    speakers: [],
  },
  "2025-summit": {
    title: "DHC 2025",
    date: "2025",
    location: "Seattle, WA",
    description: "Redirected. See dhc-2025.",
    themes: [],
    speakers: [],
  },
  "2024-summit": {
    title: "DHC 2024",
    date: "2024",
    location: "Seattle, WA",
    description: "Redirected. See dhc-2024.",
    themes: [],
    speakers: [],
  },
};

export function generateStaticParams() {
  return Object.keys(events).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events[slug];
  if (!event) return { title: "Event Not Found" };
  return { title: event.title };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events[slug];

  if (!event) notFound();

  if (slug === "dhc-2023") {
    return <DHC2023Page />;
  }

  if (slug === "dhc-2024") {
    return <DHC2024Page />;
  }

  if (slug === "dhc-2025") {
    return <DHC2025Page />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-4">
        <Badge variant="info">{event.date}</Badge>
      </div>
      <h1 className="text-3xl font-bold text-text">{event.title}</h1>
      <p className="mt-2 text-text-light">{event.location}</p>

      <div className="mt-8 prose prose-gray max-w-none">
        <p className="text-text-light leading-relaxed">{event.description}</p>
      </div>

      {event.themes.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-text">Key Themes</h2>
          <ul className="mt-4 space-y-2">
            {event.themes.map((theme) => (
              <li key={theme} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <span className="text-text-light">{theme}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {event.speakers.length > 0 && event.speakers[0].name !== "Speaker details" && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-text">Speakers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.speakers.map((speaker, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <p className="font-medium text-text">{speaker.name}</p>
                <p className="text-sm text-text-light">{speaker.title}</p>
                <p className="text-sm text-text-light">{speaker.organization}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 rounded-xl bg-surface p-6 text-center">
        <p className="text-sm text-text-light">
          Photos, detailed speaker information, and session summaries will be
          added as content is provided.
        </p>
      </section>
    </div>
  );
}

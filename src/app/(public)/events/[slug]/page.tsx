import { notFound } from "next/navigation";
import type { Metadata } from "next";

type EventData = {
  title: string;
  date: string;
  location: string;
  description: string;
  speakers: { name: string; title: string; organization: string }[];
};

const events: Record<string, EventData> = {
  "2025-summit": {
    title: "2025 DHC Annual Summit",
    date: "October 2025",
    location: "Washington, D.C.",
    description:
      "Placeholder description for the 2025 summit. The founder will provide detailed content including session summaries, keynote highlights, and takeaways.",
    speakers: [
      { name: "Speaker Name", title: "Title", organization: "Organization" },
      { name: "Speaker Name", title: "Title", organization: "Organization" },
    ],
  },
  "2024-summit": {
    title: "2024 DHC Annual Summit",
    date: "October 2024",
    location: "Washington, D.C.",
    description:
      "Placeholder description for the 2024 summit. The founder will provide detailed content including session summaries, keynote highlights, and takeaways.",
    speakers: [
      { name: "Speaker Name", title: "Title", organization: "Organization" },
    ],
  },
};

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events[slug];
  if (!event) return { title: "Event Not Found" };
  return { title: event.title, description: event.description };
}

export function generateStaticParams(): Params[] {
  return Object.keys(events).map((slug) => ({ slug }));
}

export default async function EventPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const event = events[slug];

  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">{event.title}</h1>
      <p className="mt-2 text-text-light">
        {event.date} &middot; {event.location}
      </p>

      <div className="mt-8 aspect-video bg-surface-dark rounded-xl flex items-center justify-center text-text-light">
        Event Photo Gallery Placeholder
      </div>

      <div className="mt-8 prose prose-slate max-w-none">
        <p className="text-text-light">{event.description}</p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text">Speakers</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {event.speakers.map((speaker, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-surface-dark flex items-center justify-center text-text-light text-xs">
                Photo
              </div>
              <h3 className="mt-3 font-semibold text-text">{speaker.name}</h3>
              <p className="text-sm text-text-light">{speaker.title}</p>
              <p className="text-sm text-text-light">{speaker.organization}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

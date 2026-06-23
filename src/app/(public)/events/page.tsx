import { EventCard } from "@/components/marketing/event-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Events",
  description: "Explore past Digital Health Council summit events.",
};

const pastEvents = [
  {
    slug: "2025-summit",
    title: "2025 DHC Annual Summit",
    date: "October 2025",
    location: "Washington, D.C.",
    summary:
      "Placeholder summary for the 2025 summit. Content will be provided by the founder including speaker information, photos, and event highlights.",
  },
  {
    slug: "2024-summit",
    title: "2024 DHC Annual Summit",
    date: "October 2024",
    location: "Washington, D.C.",
    summary:
      "Placeholder summary for the 2024 summit. Content will be provided by the founder including speaker information, photos, and event highlights.",
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">Past Events</h1>
      <p className="mt-4 text-text-light max-w-2xl">
        Explore our history of bringing together leaders in healthcare, law, and
        technology.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {pastEvents.map((event) => (
          <EventCard key={event.slug} {...event} />
        ))}
      </div>
    </div>
  );
}

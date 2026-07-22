import { EventCard } from "@/components/marketing/event-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Summits",
  description: "A history of Digital Health Counsel summits and workshops.",
};

const pastEvents = [
  {
    slug: "dhc-2025",
    title: "DHC25",
    date: "2025",
    location: "Seattle, WA",
    coverImage: "/images/DHC25-cover-proto.jpg",
    summary:
      "Our largest gathering with speakers from health systems, regulators, AI companies, and law firms. Expanded tracks on AI governance, product counsel, and legal operations.",
  },
  {
    slug: "microsoft-workshop-2025",
    title: "Spring 2025 Microsoft Workshop",
    date: "Spring 2025",
    location: "Microsoft Campus, Redmond, WA",
    coverImage: "/images/ms-workshop-2025-cover.jpg",
    summary:
      "An intensive workshop in collaboration with Microsoft exploring healthcare AI deployment, responsible AI frameworks, and enterprise governance strategies.",
  },
  {
    slug: "dhc-2024",
    title: "DHC24",
    date: "2024",
    location: "Seattle, WA",
    coverImage: "/images/DHC24-cover.png",
    summary:
      "Expanded to include product counsel, privacy, and AI governance tracks. Featured speakers from leading health systems, digital health companies, and regulatory bodies.",
  },
  {
    slug: "dhc-2023",
    title: "DHC23",
    date: "September 2023",
    location: "Seattle, WA",
    coverImage: "/images/DHC23-cover.jpg",
    summary:
      "Our inaugural summit convening healthcare AI and legal leaders. Established the foundation for Digital Health Counsel as a serious recurring convening platform.",
  },
];

export default function PastSummitsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">Past Summits</h1>
      <p className="mt-4 max-w-2xl text-text-light">
        Digital Health Counsel has grown into a serious recurring convening for
        healthcare AI, law, policy, technology, and governance leaders.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {pastEvents.map((event) => (
          <EventCard key={event.slug} {...event} />
        ))}
      </div>
    </div>
  );
}

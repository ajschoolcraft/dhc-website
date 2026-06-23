import Link from "next/link";
import { Card } from "@/components/ui/card";

type EventCardProps = {
  slug: string;
  title: string;
  date: string;
  location: string;
  summary: string;
};

export function EventCard({ slug, title, date, location, summary }: EventCardProps) {
  return (
    <Link href={`/events/${slug}`}>
      <Card className="hover:shadow-md transition-shadow h-full">
        <div className="aspect-video bg-surface-dark rounded-lg mb-4 flex items-center justify-center text-text-light text-sm">
          Event Photo
        </div>
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <p className="mt-1 text-sm text-text-light">
          {date} &middot; {location}
        </p>
        <p className="mt-3 text-sm text-text-light line-clamp-3">{summary}</p>
      </Card>
    </Link>
  );
}

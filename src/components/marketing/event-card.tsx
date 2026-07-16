import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

type EventCardProps = {
  slug: string;
  title: string;
  date: string;
  location: string;
  summary: string;
  coverImage?: string;
};

export function EventCard({ slug, title, date, location, summary, coverImage }: EventCardProps) {
  return (
    <Link href={`/events/${slug}`}>
      <Card className="hover:shadow-md transition-shadow h-full">
        <div className="relative aspect-video rounded-lg mb-4 overflow-hidden bg-surface-dark">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-text-light text-sm">
              Event Photo
            </div>
          )}
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

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { speakers, schedule } from "./dhc-2023-data";
import type { Speaker } from "./dhc-2023-data";

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
        {speaker.photo ? (
          <Image
            src={speaker.photo}
            alt={speaker.name}
            fill
            className="object-cover"
            style={{ objectPosition: speaker.photoPosition || "center top" }}
            sizes="96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-text-light">
            {speaker.name.split(" ").map((n) => n[0]).join("")}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-text">
          {speaker.name}
          {speaker.credentials && (
            <span className="font-normal text-text-light">
              , {speaker.credentials}
            </span>
          )}
        </p>
        <p className="text-sm text-accent">{speaker.title}</p>
        {speaker.organization && (
          <p className="text-sm text-text-light">{speaker.organization}</p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-text-light">
          {speaker.bio}
        </p>
      </div>
    </div>
  );
}

export default function DHC2023Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-4 flex items-center gap-3">
        <Badge variant="info">September 12–13, 2023</Badge>
        <Badge>Seattle, WA</Badge>
      </div>
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        Digital Health Counsel 2023: Advancing Medicine in the Age of AI
      </h1>
      <p className="mt-4 max-w-3xl text-text-light leading-relaxed">
        The inaugural Digital Health Counsel summit brought together healthcare
        AI and legal leaders for two days of focused programming on the emerging
        legal infrastructure needed for healthcare AI adoption. In collaboration
        with Ogden Murphy Wallace, DHC 2023 established the foundation for what
        has become a serious recurring convening platform.
      </p>

      <div className="mt-4 flex items-center gap-6 text-sm text-text-light">
        <span className="font-medium uppercase tracking-wider text-accent">
          Inspire &bull; Educate &bull; Collaborate
        </span>
      </div>

      {schedule.map((day) => (
        <section key={day.day} className="mt-14">
          <div className="flex items-baseline gap-4 border-b-2 border-accent pb-3">
            <h2 className="text-2xl font-bold text-text">{day.day}</h2>
            <span className="text-lg text-text-light">{day.date}</span>
          </div>

          <div className="mt-6 space-y-10">
            {day.sessions.map((session, i) => (
              <div key={i}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-sm font-medium text-accent whitespace-nowrap">
                    {session.time}
                  </span>
                  <h3
                    className={`text-lg font-bold ${
                      session.type === "break"
                        ? "text-text-light italic"
                        : "text-text"
                    }`}
                  >
                    {session.title}
                  </h3>
                </div>

                {session.speakerIds && session.speakerIds.length > 0 && (
                  <div className="mt-4 space-y-6 border-l-2 border-border pl-6 ml-0 sm:ml-[120px]">
                    {session.speakerIds.map((id) => {
                      const speaker = speakers[id];
                      if (!speaker) return null;
                      return <SpeakerCard key={id} speaker={speaker} />;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-16 rounded-xl bg-surface p-8 text-center">
        <h2 className="text-xl font-bold text-text">
          Interested in DHC26?
        </h2>
        <p className="mt-2 text-text-light">
          The next Digital Health Counsel AI Summit takes place December 2–3,
          2026 at Bell Harbor Conference Center, Seattle.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Link href="/summit-2026">
            <Button>Learn About DHC26</Button>
          </Link>
          <Link href="/apply">
            <Button variant="secondary">Apply to Attend</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

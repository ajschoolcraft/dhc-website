import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { speakers, schedule } from "./ms-workshop-2025-data";

export default function MSWorkshop2025Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-4 flex items-center gap-3">
        <Badge variant="info">March 14, 2025</Badge>
        <Badge>Microsoft Campus, Redmond, WA</Badge>
      </div>
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        Bridging Law and Innovation: Effective AI Collaborations in Biomedicine
      </h1>
      <p className="mt-4 max-w-3xl text-text-light leading-relaxed">
        A half-day workshop held at the Microsoft campus in collaboration with
        Microsoft and Ogden Murphy Wallace, bringing together attorneys,
        clinicians, data scientists, researchers, compliance experts, and
        business leaders working in healthcare AI research and development.
      </p>

      <div className="mt-4 flex items-center gap-6 text-sm text-text-light">
        <span className="font-medium uppercase tracking-wider text-accent">
          Inspire &bull; Educate &bull; Collaborate
        </span>
      </div>

      <section className="mt-14">
        <div className="flex items-baseline gap-4 border-b-2 border-accent pb-3">
          <h2 className="text-2xl font-bold text-text">Workshop</h2>
          <span className="text-lg text-text-light">{schedule.date}</span>
        </div>

        <div className="mt-6 space-y-10">
          {schedule.sessions.map((session, i) => (
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

              {session.description && (
                <p className="mt-2 text-sm text-text-light leading-relaxed ml-0 sm:ml-[140px]">
                  {session.description}
                </p>
              )}

              {(session.moderatorId || (session.speakerIds && session.speakerIds.length > 0)) && (
                <div className="mt-3 border-l-2 border-border pl-6 ml-0 sm:ml-[140px]">
                  {session.moderatorId && speakers[session.moderatorId] && (
                    <div className="mb-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-accent">
                        Moderator
                      </span>
                      <p className="mt-1 text-sm text-text">
                        <span className="font-semibold">
                          {speakers[session.moderatorId].name}
                        </span>
                        {speakers[session.moderatorId].credentials && (
                          <span className="text-text-light">
                            , {speakers[session.moderatorId].credentials}
                          </span>
                        )}
                        <span className="text-text-light">
                          {" — "}
                          {speakers[session.moderatorId].title}
                          {speakers[session.moderatorId].organization &&
                            `, ${speakers[session.moderatorId].organization}`}
                        </span>
                      </p>
                    </div>
                  )}
                  {session.speakerIds && session.speakerIds.length > 0 && (
                    <div className="space-y-1.5">
                      {session.moderatorId && (
                        <span className="text-xs font-medium uppercase tracking-wider text-accent">
                          {session.speakerIds.length > 1 ? "Panelists" : "Speaker"}
                        </span>
                      )}
                      {session.speakerIds.map((id) => {
                        const speaker = speakers[id];
                        if (!speaker) return null;
                        return (
                          <p key={id} className="text-sm text-text">
                            <span className="font-semibold">{speaker.name}</span>
                            {speaker.credentials && (
                              <span className="text-text-light">
                                , {speaker.credentials}
                              </span>
                            )}
                            <span className="text-text-light">
                              {" — "}
                              {speaker.title}
                              {speaker.organization && `, ${speaker.organization}`}
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

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

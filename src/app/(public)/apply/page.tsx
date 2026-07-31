import { ApplicationForm } from "@/components/forms/application-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply to DHC26",
  description:
    "Submit your application to attend the 2026 Digital Health Counsel AI Summit.",
};

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">Apply to DHC26</h1>
      <p className="mt-4 text-text-light">
        DHC26 uses a curated application-first process. Submission does not
        guarantee attendance. Accepted applicants will receive registration
        details after review. Registration fees may vary by attendee category
        and participation role. Complimentary or reduced-fee registration may be
        available for selected in-house, government, academic, and nonprofit
        participants.
      </p>
      <p className="mt-2 text-sm text-text-light">
        Questions? Contact us at{" "}
        <a href="mailto:info@digitalhealthcounsel.com" className="text-accent hover:underline">
          info@digitalhealthcounsel.com
        </a>
      </p>
      <div className="mt-10">
        <ApplicationForm />
      </div>
    </div>
  );
}

import { ApplicationForm } from "@/components/forms/application-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 DHC Summit",
  description:
    "Apply to attend the 2026 Digital Health Council Annual Summit.",
};

export default async function Summit2026Page({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        {payment === "success" && (
          <div className="mb-8 rounded-xl bg-green-50 border border-green-200 p-6 text-center">
            <h3 className="text-lg font-semibold text-green-800">
              Payment Confirmed
            </h3>
            <p className="mt-2 text-sm text-green-700">
              Thank you! Your registration is complete. You will receive a
              confirmation email shortly.
            </p>
          </div>
        )}
        {payment === "cancelled" && (
          <div className="mb-8 rounded-xl bg-yellow-50 border border-yellow-200 p-6 text-center">
            <h3 className="text-lg font-semibold text-yellow-800">
              Payment Cancelled
            </h3>
            <p className="mt-2 text-sm text-yellow-700">
              Your payment was not completed. You can use the link in your
              approval email to try again.
            </p>
          </div>
        )}
        <h1 className="text-3xl font-bold text-text">2026 DHC Annual Summit</h1>
        <p className="mt-4 text-text-light">
          Join healthcare, legal, and technology leaders for our premier annual
          event focused on the intersection of law, healthcare, and AI.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-surface p-4">
            <p className="text-sm font-medium text-text-light">Date</p>
            <p className="mt-1 font-semibold text-text">TBD</p>
          </div>
          <div className="rounded-lg bg-surface p-4">
            <p className="text-sm font-medium text-text-light">Location</p>
            <p className="mt-1 font-semibold text-text">TBD</p>
          </div>
          <div className="rounded-lg bg-surface p-4">
            <p className="text-sm font-medium text-text-light">Format</p>
            <p className="mt-1 font-semibold text-text">In-Person</p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-text">Apply to Attend</h2>
          <p className="mt-2 text-sm text-text-light">
            Attendance is by application only. Submit your application below and
            we will review it and follow up via email.
          </p>
          <div className="mt-8">
            <ApplicationForm />
          </div>
        </section>
      </div>
    </div>
  );
}

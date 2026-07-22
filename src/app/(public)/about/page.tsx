import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Digital Health Counsel.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">About Digital Health Counsel</h1>
      <p className="mt-4 text-text-light">
        Content coming soon.
      </p>
    </div>
  );
}

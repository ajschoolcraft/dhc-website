import { ContactForm } from "@/components/forms/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Digital Health Counsel.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold text-text">Contact Us</h1>
        <p className="mt-4 text-text-light">
          Have a question or want to learn more about Digital Health Counsel?
          We&apos;d love to hear from you.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
        <div className="mt-8 rounded-lg bg-surface p-6">
          <h2 className="text-lg font-semibold text-text">Sponsorship Inquiries</h2>
          <p className="mt-2 text-sm text-text-light">
            Interested in sponsoring DHC26? Visit our{" "}
            <a href="/sponsorship" className="text-accent hover:underline">
              sponsorship page
            </a>{" "}
            or email us at{" "}
            <a href="mailto:info@digitalhealthcounsel.com" className="text-accent hover:underline">
              info@digitalhealthcounsel.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

import { ContactForm } from "@/components/forms/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Digital Health Council.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold text-text">Contact Us</h1>
        <p className="mt-4 text-text-light">
          Have a question or want to learn more about Digital Health Council?
          We&apos;d love to hear from you.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Digital Health Counsel brings together leaders working at the intersection of healthcare, technology, law, policy, data, and artificial intelligence.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        About Digital Health Counsel
      </h1>

      <div className="mt-8 space-y-6 text-text-light leading-relaxed">
        <p>
          Digital Health Counsel brings together leaders working at the
          intersection of healthcare, technology, law, policy, data, and
          artificial intelligence.
        </p>

        <p>
          Founded by healthcare and technology lawyer Dave Schoolcraft, DHC was
          created to support practical, cross-disciplinary conversation about how
          digital innovation is reshaping healthcare. Our work focuses on the
          real-world challenges of health system transformation — including AI
          governance, digital health strategy, data use, interoperability,
          privacy, procurement, contracting, regulatory change, and responsible
          implementation.
        </p>

        <p>
          The annual DHC AI Summit convenes health systems, technology companies,
          policymakers, lawyers, investors, clinicians, and innovators to move
          beyond abstract discussion and focus on what it takes to implement AI
          and data-driven tools in ways that are trustworthy, effective, and
          aligned with the needs of patients, providers, and communities.
        </p>

        <p>
          DHC is built around a simple premise: the future of healthcare will not
          be shaped by technology alone. It will require collaboration across
          disciplines, institutions, and sectors — and a shared commitment to
          turning innovation into responsible practice.
        </p>
      </div>
    </div>
  );
}

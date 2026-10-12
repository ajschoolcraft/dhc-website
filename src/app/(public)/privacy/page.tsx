import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Digital Health Counsel and the Digital Health Counsel AI Summit.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-text-light">Effective date: July 20, 2026</p>

      <div className="mt-8 space-y-8 text-text-light leading-relaxed">
        <p>
          Digital Health Group, LLC, doing business as Digital Health Counsel
          (&ldquo;DHC,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;), operates
          www.digitalhealthcounsel.com and produces the Digital Health Counsel AI
          Summit. This policy describes the personal information we collect
          through the site and through the summit application and registration
          process, and what we do with it.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-text">What we collect</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-text">Information you give us</h3>
              <p className="mt-1">
                When you apply to attend, register, submit a sponsor inquiry, or
                contact us, we collect what you submit: your name, email address,
                phone number, title, organization, organization website, LinkedIn
                profile, city, state, and country; your role, registration
                category, and topic interests; your answers to the application
                questions; dietary preferences; and the content of your message.
                If you nominate someone else, we collect the information you give
                us about that person.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-text">Payment information</h3>
              <p className="mt-1">
                Registration fees are handled by a third-party payment processor.
                We do not receive or store full payment card numbers.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-text">
                Information collected automatically
              </h3>
              <p className="mt-1">
                Our hosting provider logs standard technical information when you
                visit the site, such as IP address, browser type, and pages
                viewed.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text">How we use it</h2>
          <p className="mt-4">
            We use personal information to review applications, register
            attendees, plan and run the summit (including name badges, catering,
            and continuing legal education credit), respond to inquiries, and
            send you information about this and future Digital Health Counsel
            events. Dietary preferences are used only to plan catering.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text">How we share it</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-text">Sponsors</h3>
              <p className="mt-1">
                We may share the name, title, organization, and email address of
                registered attendees with summit sponsors, who may contact you
                about their own products, services, and events. Sponsors handle
                that information under their own privacy policies. To opt out,
                email{" "}
                <a
                  href="mailto:info@digitalhealthcounsel.com"
                  className="text-accent hover:underline"
                >
                  info@digitalhealthcounsel.com
                </a>{" "}
                before the summit.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-text">Service providers</h3>
              <p className="mt-1">
                Companies that host the site, process registrations and payments,
                deliver email, and support the event receive information as
                needed to perform those services for us.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-text">CLE authorities</h3>
              <p className="mt-1">
                If you request continuing legal education credit, we may report
                your attendance and bar number to the applicable bar or
                accrediting body.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-text">
                Legal and business transfers
              </h3>
              <p className="mt-1">
                We may disclose information when required by law, to protect our
                rights or the safety of others, or to a successor if
                DHC&rsquo;s operations are transferred.
              </p>
            </div>
            <p>
              Apart from the sponsor sharing described above, we do not sell or
              rent personal information.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text">
            Cookies and Do Not Track
          </h2>
          <p className="mt-4">
            We do not use advertising cookies, and we do not allow third parties
            to collect personal information about your activity over time and
            across other websites when you use our site. Because we do not track
            visitors across other websites, the site does not respond to browser
            Do Not Track signals.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text">Your choices</h2>
          <p className="mt-4">
            To review, correct, or delete your information, opt out of sponsor
            sharing, or stop receiving our emails, contact us at{" "}
            <a
              href="mailto:info@digitalhealthcounsel.com"
              className="text-accent hover:underline"
            >
              info@digitalhealthcounsel.com
            </a>
            . We may keep records we are required to retain, such as payment and
            CLE attendance records.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text">
            Retention and security
          </h2>
          <p className="mt-4">
            We keep personal information for as long as needed for the purposes
            described above and use reasonable safeguards to protect it. If you
            submit information from outside the United States, it will be
            processed in the United States.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text">Children</h2>
          <p className="mt-4">
            The site is intended for professionals and is not directed to
            children under 13. We do not knowingly collect their information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text">
            Changes to this policy
          </h2>
          <p className="mt-4">
            We may update this policy by posting a revised version on this page
            with a new effective date. If a change materially affects how we use
            information we already hold, we will notify you by email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text">Contact</h2>
          <p className="mt-4">
            Questions about this policy go to Digital Health Group, LLC dba
            Digital Health Counsel at{" "}
            <a
              href="mailto:info@digitalhealthcounsel.com"
              className="text-accent hover:underline"
            >
              info@digitalhealthcounsel.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

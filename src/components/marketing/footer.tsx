import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Digital Health Counsel
            </h3>
            <p className="mt-2 text-sm text-white/60">
              A convening platform for leaders working at the intersection of
              healthcare, technology, AI, law, governance, privacy, data
              strategy, and innovation.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/summit-2026" className="text-sm text-white/60 hover:text-white">
                  DHC26
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-white/60 hover:text-white">
                  Past Summits
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-sm text-white/60 hover:text-white">
                  Apply
                </Link>
              </li>
              <li>
                <Link href="/sponsorship" className="text-sm text-white/60 hover:text-white">
                  Sponsorship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <span className="text-sm text-white/60">info@digitalhealthcounsel.com</span>
              </li>
              <li>
                <span className="text-sm text-white/60">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-white/60">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Digital Health Counsel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

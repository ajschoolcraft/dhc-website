import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider">
              Digital Health Council
            </h3>
            <p className="mt-2 text-sm text-text-light">
              Convening, educating and empowering leaders dedicated to
              transforming health care.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/events" className="text-sm text-text-light hover:text-primary">
                  Past Events
                </Link>
              </li>
              <li>
                <Link href="/summit-2026" className="text-sm text-text-light hover:text-primary">
                  2026 Summit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-light hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <span className="text-sm text-text-light">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-text-light">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-text-light">
          &copy; {new Date().getFullYear()} Digital Health Group, LLC. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import logoImage from "@/assets/autolink-logo.png";
import { business, navLinks } from "@/data/business";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="section-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Image
            src={logoImage}
            alt={`${business.legalName} logo`}
            className="h-14 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {business.legalName} — a Dubai-based vehicle trading company in Ras Al Khor.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase">Navigation</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase">Contact</h2>
          <address className="mt-4 space-y-2.5 text-sm text-muted-foreground not-italic">
            <p>Ras Al Khor, Dubai, UAE</p>
            <p>
              <a
                href={`tel:${business.phoneHref}`}
                className="transition-colors hover:text-foreground"
              >
                {business.phoneDisplay}
              </a>
            </p>
          </address>
          {business.social.length > 0 ? (
            <ul className="mt-4 flex gap-3">
              {business.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-shell flex items-center justify-between py-6">
          <p className="text-xs text-muted-foreground">
            © 2026 {business.legalName}. All rights reserved.
          </p>
          <a
            href="/admin"
            className="text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground"
          >
            Car Manager
          </a>
        </div>
      </div>
    </footer>
  );
}

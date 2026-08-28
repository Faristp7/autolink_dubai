import { MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
import { business, whatsappLink } from "@/data/business";
import { Reveal } from "./Reveal";
import { InquiryForm } from "./InquiryForm";

export function LocationSection() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-surface py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">Location</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-tight font-extrabold tracking-tight">
            Visit AutoLink
          </h2>

          <address className="mt-8 space-y-1 text-base not-italic">
            <p className="font-semibold">{business.legalName}</p>
            <p className="text-muted-foreground">{business.addressLine1}</p>
            <p className="text-muted-foreground">{business.addressLine2}</p>
            <p className="text-muted-foreground">{business.addressLine3}</p>
            <p className="pt-3">
              <a href={`tel:${business.phoneHref}`} className="font-semibold hover:text-primary">
                {business.phoneDisplay}
              </a>
            </p>
          </address>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </a>
            <a
              href={`tel:${business.phoneHref}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Us
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-6">
            <h3 className="text-lg font-bold tracking-tight">Send a Vehicle Inquiry</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Not on WhatsApp? Share your details and our team will get back to you by email.
            </p>
            <InquiryForm className="mt-5" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative h-full min-h-[300px] overflow-hidden rounded-xl border border-border bg-background">
            <iframe
              title="Map showing AutoLink in Ras Al Khor, Dubai"
              src="https://www.google.com/maps?q=Manama%20Street%2C%20Ras%20Al%20Khor%2C%20Dubai&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[300px] w-full grayscale-[0.4] contrast-[1.05]"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-md border border-border bg-background/85 px-3 py-2 text-xs font-medium backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Ras Al Khor, Dubai
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

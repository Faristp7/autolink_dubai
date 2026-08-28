import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function ContactCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-[clamp(1.85rem,5vw,3.25rem)] leading-tight font-extrabold tracking-tight text-balance">
              Ready to Find Your Next Vehicle?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Explore our vehicles or speak directly with the AutoLink team.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#vehicles"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold tracking-wide text-primary-foreground uppercase shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Explore Vehicles
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex h-13 items-center justify-center rounded-md border border-border px-8 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-secondary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

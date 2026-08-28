import Image from "next/image";
import { ArrowRight, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { business } from "@/data/business";

const trust = [
  { icon: Sparkles, label: "Quality Vehicles" },
  { icon: ShieldCheck, label: "Trusted Service" },
  { icon: MapPin, label: "Dubai Based" },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[92svh] items-center overflow-hidden">
      <Image
        src={heroImage}
        alt="Premium SUV displayed in a dark AutoLink showroom"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        priority
        placeholder="blur"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.12_0.006_60/0.94),oklch(0.12_0.006_60/0.72)_55%,oklch(0.12_0.006_60/0.45))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_bottom,transparent,var(--background))]"
      />

      <div className="section-shell pt-32 pb-20 sm:pt-36">
        <div className="max-w-2xl">
          <p className="eyebrow">Auto Link Specialized Vehicles Trading</p>
          <h1 className="mt-5 text-[clamp(2.5rem,8vw,4.75rem)] leading-[1.02] font-extrabold tracking-tight text-balance">
            Find Your Next Drive.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Premium vehicles, carefully selected for drivers who expect more.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#vehicles"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-md bg-primary px-7 text-sm font-semibold tracking-wide text-primary-foreground uppercase shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Explore Our Vehicles
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex h-13 items-center justify-center rounded-md border border-border bg-background/30 px-7 text-sm font-semibold tracking-wide uppercase backdrop-blur-sm transition-colors hover:bg-secondary"
            >
              Contact {business.shortName}
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

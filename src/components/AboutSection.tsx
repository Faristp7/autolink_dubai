import { ArrowRight } from "lucide-react";
import Image from "next/image";
import aboutImage from "@/assets/about.jpg";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 border-y border-border bg-surface py-20 sm:py-28">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-border">
            <Image
              src={aboutImage}
              alt="Vehicle presented inside the AutoLink showroom in Dubai"
              className="aspect-[4/5] w-full object-cover"
              placeholder="blur"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">About AutoLink</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-tight font-extrabold tracking-tight text-balance">
            A Better Way to Buy Your Next Vehicle.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              AutoLink Specialized Vehicles Trading LLC is a Dubai-based vehicle trading company
              operating from Ras Al Khor. We focus on quality vehicles and a professional,
              straightforward buying experience.
            </p>
            <p>
              From everyday SUVs and sedans to specialized and commercial vehicles, our team helps
              you understand exactly what you are buying — with clear information and direct
              communication from first enquiry to handover.
            </p>
          </div>
          <a
            href="#why"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-md border border-border px-6 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-secondary"
          >
            Learn More About Us
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

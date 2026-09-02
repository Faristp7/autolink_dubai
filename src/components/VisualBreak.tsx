import { ArrowRight } from "lucide-react";
import Image from "next/image";
import breakImage from "@/assets/break.png";

export function VisualBreak() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={breakImage}
        alt="Dark SUV driving on an open road towards the Dubai skyline at dusk"
        className="h-[420px] w-full object-cover sm:h-[520px]"
        placeholder="blur"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.12_0.006_60/0.95),oklch(0.12_0.006_60/0.45))]"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="section-shell pb-12 sm:pb-16">
          <h2 className="max-w-xl text-[clamp(1.75rem,5vw,3rem)] leading-tight font-extrabold tracking-tight text-balance">
            Drive Something Worth Remembering.
          </h2>
          <a
            href="#vehicles"
            className="group mt-7 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold tracking-wide text-primary-foreground uppercase shadow-glow transition-transform hover:-translate-y-0.5"
          >
            View Available Vehicles
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

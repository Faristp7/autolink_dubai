import { BadgeCheck, Briefcase, MapPin, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const pillars = [
  { icon: BadgeCheck, label: "Quality Vehicles" },
  { icon: Briefcase, label: "Professional Service" },
  { icon: MapPin, label: "Dubai Location" },
  { icon: Users, label: "Customer Focus" },
];

export function TrustStrip() {
  return (
    <section aria-label="What AutoLink stands for" className="border-y border-border bg-surface">
      <div className="section-shell py-10">
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, label }, i) => (
            <Reveal as="li" key={label} delay={i * 70}>
              <div className="flex min-w-0 items-center gap-3">
                <Icon
                  className="h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="truncate text-sm font-semibold tracking-wide">{label}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

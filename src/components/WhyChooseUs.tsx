import { CarFront, Eye, Layers, HeartHandshake } from "lucide-react";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: CarFront,
    title: "Quality Vehicles",
    text: "Carefully selected vehicles with attention to quality and presentation.",
  },
  {
    icon: Eye,
    title: "Transparent Experience",
    text: "A straightforward and professional buying experience.",
  },
  {
    icon: Layers,
    title: "Specialized Selection",
    text: "A diverse selection of vehicles suited to different needs.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    text: "Focused on making the vehicle-buying process simple and comfortable.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">The AutoLink Difference</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-tight font-extrabold tracking-tight">
            Why AutoLink?
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-base font-bold">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

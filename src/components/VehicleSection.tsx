import { Reveal } from "./Reveal";

const brands = [
  "Toyota",
  "Nissan",
  "Mercedes-Benz",
  "BMW",
  "Land Cruiser",
  "Lexus",
  "Range Rover",
  "Mitsubishi",
  "Porsche",
  "Audi",
  "Honda",
  "Ford",
];

const photos = [
  { src: "/cars/camary1.png", alt: "Full-size luxury SUV in a dark studio" },
  { src: "/cars/corola2.png", alt: "Luxury performance saloon with studio lighting" },
  { src: "/cars/hondacivic3.png", alt: "Off-road 4x4 vehicle in a showroom" },
  { src: "/cars/landCruiser4.png", alt: "Executive sedan side profile" },
  { src: "/cars/accent5.png", alt: "Double-cab pickup truck" },
  { src: "/cars/nissanPatrol6.png", alt: "Specialized utility van" },
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...brands, ...brands];
  return (
    <div className="flex overflow-hidden" aria-hidden="true">
      <ul
        className="flex min-w-full shrink-0 animate-marquee items-center gap-0"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {items.map((brand, i) => (
          <li key={i} className="flex shrink-0 items-center">
            <span className="px-8 text-2xl font-extrabold tracking-[0.18em] whitespace-nowrap text-muted-foreground/60 uppercase transition-colors hover:text-primary sm:text-3xl">
              {brand}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary/50" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VehicleSection() {
  return (
    <section id="gallery" className="scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Our Collection</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-tight font-extrabold tracking-tight">
            The Brands We Live For
          </h2>
          <p className="mt-4 text-muted-foreground">
            From luxury saloons to off-road legends — AutoLink sources across
            the world's most trusted marques.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <div className="border-y border-border py-6" role="presentation">
          <MarqueeRow />
        </div>
      </Reveal>

      <div className="section-shell">
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <Reveal
              as="li"
              key={photo.src}
              delay={Math.min(i, 3) * 90}
              className={i === 0 ? "col-span-2 lg:col-span-1" : ""}
            >
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

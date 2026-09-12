import { ArrowRight, MessageCircle, Gauge, Calendar, Fuel, Cpu, ShieldCheck } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { whatsappLink } from "@/data/business";

export function VehicleCard({
  vehicle,
  onViewDetails,
}: {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
}) {
  const specs = [
    { label: "Year", value: String(vehicle.year), icon: Calendar, show: true },
    { label: "Variant", value: vehicle.variant || "Standard Trim", icon: ShieldCheck, show: Boolean(vehicle.variant) },
    { label: "Engine", value: vehicle.engine || "Standard Engine", icon: Cpu, show: Boolean(vehicle.engine) },
    { label: "Transmission", value: vehicle.transmission, icon: Gauge, show: true },
    { label: "Fuel Type", value: vehicle.fuel, icon: Fuel, show: true },
    { label: "Specs", value: vehicle.specs || "", icon: ShieldCheck, show: Boolean(vehicle.specs) },
  ].filter((s) => s.show);

  const whatsappMessage = `Hello AutoLink, I am interested in the ${vehicle.brand} ${vehicle.name}${vehicle.variant ? ` (${vehicle.variant})` : ""} - ${vehicle.year}. Could you please share more details and availability?`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-premium">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <img
          src={vehicle.image || vehicle.images[0] || "/cars/camary1.png"}
          alt={`${vehicle.brand} ${vehicle.name}${vehicle.variant ? ` ${vehicle.variant}` : ""}`}
          width={1200}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vehicle.featured ? (
            <span className="rounded-md bg-primary px-2.5 py-1 text-[0.65rem] font-bold tracking-widest text-primary-foreground uppercase shadow-sm">
              Featured
            </span>
          ) : null}
          {vehicle.specs ? (
            <span className="rounded-md bg-background/85 backdrop-blur-md px-2.5 py-1 text-[0.65rem] font-bold tracking-widest text-foreground uppercase border border-border/50">
              {vehicle.specs}
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Brand */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            {vehicle.brand}
          </p>
        </div>

        {/* Car Name */}
        <h3 className="mt-1 text-xl font-extrabold leading-snug tracking-tight text-foreground">
          {vehicle.name}
        </h3>

        {/* Variant Subtitle */}
        {vehicle.variant ? (
          <p className="mt-1 text-xs font-semibold tracking-wide text-muted-foreground">
            {vehicle.variant}
          </p>
        ) : null}

        {/* Detailed Vehicle Info Specs Grid (No Price, No KM) */}
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-border pt-4 text-xs">
          {specs.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex flex-col min-w-0">
                <dt className="text-[0.65rem] font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1">
                  <Icon className="h-3 w-3 text-primary/70 shrink-0" />
                  {item.label}
                </dt>
                <dd className="mt-0.5 truncate font-medium text-foreground">{item.value}</dd>
              </div>
            );
          })}
        </dl>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row pt-2 border-t border-border/40">
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-3 text-xs font-bold text-primary-foreground tracking-wide transition-transform hover:-translate-y-0.5 shadow-sm"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => onViewDetails(vehicle)}
            className="group/btn inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-semibold tracking-wide transition-colors hover:bg-secondary"
            aria-label={`View details for ${vehicle.brand} ${vehicle.name}`}
          >
            View Details
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1 shrink-0"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

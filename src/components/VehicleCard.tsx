import { ArrowRight, MessageCircle } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { whatsappLink } from "@/data/business";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

export function VehicleCard({
  vehicle,
  onViewDetails,
}: {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
}) {
  const spec = [
    { label: "Year", value: String(vehicle.year), show: true },
    { label: "Mileage", value: `${formatPrice(vehicle.mileage)} KM`, show: vehicle.mileage > 0 },
    { label: "Transmission", value: vehicle.transmission, show: true },
    { label: "Fuel", value: vehicle.fuel, show: true },
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-premium">
      <div className="relative aspect-[3/2] overflow-hidden bg-surface">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.name}`}
          width={1200}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {vehicle.featured ? (
          <span className="absolute top-3 left-3 rounded-md bg-primary px-2.5 py-1 text-[0.65rem] font-bold tracking-widest text-primary-foreground uppercase">
            Featured
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{vehicle.brand}</p>
        <h3 className="mt-1.5 text-lg leading-snug font-bold">{vehicle.name}</h3>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-4 text-sm">
          {spec.map((item) => (
            <div
              key={item.label}
              className={`min-w-0 ${!item.show ? "invisible" : ""}`}
              aria-hidden={!item.show}
            >
              <dt className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                {item.label}
              </dt>
              <dd className="truncate font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>

        <p className={`mt-5 text-xl font-extrabold tracking-tight ${vehicle.price === 0 ? "invisible" : ""}`}>
          <span className="text-sm font-semibold text-muted-foreground">AED </span>
          {formatPrice(vehicle.price)}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:gap-2 sm:flex-row">
          <a
            href={whatsappLink(
              `Hello AutoLink, I'm interested in the ${vehicle.name} (${vehicle.year}). Could you please share more details?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-primary py-3 sm:py-0 px-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => onViewDetails(vehicle)}
            className="group/btn inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-border py-3 sm:py-0 px-4 text-sm font-semibold transition-colors hover:bg-secondary"
            aria-label={`View details for ${vehicle.name}`}
          >
            View Details
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

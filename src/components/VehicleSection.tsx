"use client";

import { useState } from "react";
import { type Vehicle } from "@/data/vehicles";
import { useCars } from "@/lib/carsStore";
import { VehicleCard } from "./VehicleCard";
import { VehicleDetailModal } from "./VehicleDetailModal";
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
  "Hyundai",
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
  const vehicles = useCars();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  return (
    <section id="vehicles" className="scroll-mt-24 overflow-hidden py-20 sm:py-28">
      {/* Brand Showcase Header */}
      <div className="section-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Our Fleet & Collection</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-tight font-extrabold tracking-tight">
            Explore Vehicles & Variants
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore full vehicle specifications, trims, and variants below.
          </p>
        </Reveal>
      </div>

      {/* Brand Marquee */}
      <Reveal className="mt-10">
        <div className="border-y border-border py-6" role="presentation">
          <MarqueeRow />
        </div>
      </Reveal>

      {/* Vehicles Inventory Showcase */}
      <div className="section-shell mt-12">
        {/* Vehicles Grid */}
        {vehicles.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle, i) => (
              <Reveal as="li" key={vehicle.id} delay={Math.min(i, 3) * 80}>
                <VehicleCard vehicle={vehicle} onViewDetails={handleViewDetails} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No vehicles available right now.
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}

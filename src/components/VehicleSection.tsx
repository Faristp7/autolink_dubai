"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, type Vehicle } from "@/data/vehicles";
import { useCars } from "@/lib/carsStore";
import { VehicleCard } from "./VehicleCard";
import { VehicleDetailModal } from "./VehicleDetailModal";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function VehicleSection() {
  const vehicles = useCars();
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openDetails = (vehicle: Vehicle) => {
    setSelected(vehicle);
    setModalOpen(true);
  };

  const filtered = useMemo(
    () => (active === "All" ? vehicles : vehicles.filter((v) => v.category === active)),
    [active, vehicles],
  );

  // Prevent hydration warning/mismatch for localStorage data
  if (!mounted) return null;

  // Hide the entire Vehicles section when there are no listings.
  if (vehicles.length === 0) return null;

  return (
    <section id="vehicles" className="scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Inventory</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-tight font-extrabold tracking-tight">
            Explore Our Vehicles
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover carefully selected vehicles available at AutoLink.
          </p>
        </Reveal>

        <Reveal className="mt-9">
          <div
            role="tablist"
            aria-label="Filter vehicles by category"
            className="-mx-5 flex ml-auto snap-x gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0"
          >
            {categories.map((category) => {
              const selected = active === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(category)}
                  className={cn(
                    "h-10 shrink-0 snap-start rounded-md border px-4 text-sm font-medium whitespace-nowrap transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <>
            {/* Mobile Carousel View */}
            <div className="block sm:hidden mt-10">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4 pb-4">
                  {filtered.map((vehicle, i) => (
                    <CarouselItem key={vehicle.id} className="basis-[85%] pl-4">
                      <Reveal delay={Math.min(i, 3) * 90} className="h-full">
                        <VehicleCard vehicle={vehicle} onViewDetails={openDetails} />
                      </Reveal>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Desktop Grid View */}
            <ul className="hidden sm:grid mt-10 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((vehicle, i) => (
                <Reveal as="li" key={vehicle.id} delay={Math.min(i, 3) * 90} className="h-full">
                  <VehicleCard vehicle={vehicle} onViewDetails={openDetails} />
                </Reveal>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-12 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-muted-foreground">
            No vehicles listed in this category right now. Contact our team for current
            availability.
          </p>
        )}

        <p className="mt-8 text-xs text-muted-foreground">
          Listings shown are sample entries for presentation. Live AutoLink inventory will be
          published here.
        </p>
      </div>

      <VehicleDetailModal vehicle={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}

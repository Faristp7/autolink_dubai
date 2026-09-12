"use client";

import { useEffect, useState } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Vehicle } from "@/data/vehicles";
import { business, whatsappLink } from "@/data/business";
import { cn } from "@/lib/utils";
import { InquiryForm } from "./InquiryForm";

type Props = {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function VehicleDetailModal({ vehicle, open, onOpenChange }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (open) {
      setActiveImage(0);
      setShowForm(false);
    }
  }, [open, vehicle?.id]);

  if (!vehicle) return null;

  const specs = [
    { label: "Brand", value: vehicle.brand, show: true },
    { label: "Model", value: vehicle.name, show: true },
    { label: "Variant", value: vehicle.variant || "Standard", show: Boolean(vehicle.variant) },
    { label: "Engine", value: vehicle.engine || "Standard Engine", show: Boolean(vehicle.engine) },
    { label: "Year", value: String(vehicle.year), show: true },
    { label: "Transmission", value: vehicle.transmission, show: true },
    { label: "Fuel Type", value: vehicle.fuel, show: true },
    { label: "Regional Specs", value: vehicle.specs || "", show: Boolean(vehicle.specs) },
    { label: "Location", value: "Ras Al Khor, Dubai", show: true },
  ].filter((s) => s.show);

  const whatsappMessage = `Hello AutoLink, I am interested in the ${vehicle.brand} ${vehicle.name}${vehicle.variant ? ` (${vehicle.variant})` : ""} - ${vehicle.year}. Could you please share more details?`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-3xl overflow-y-auto border-border bg-card p-0 sm:rounded-xl">
        <div className="grid md:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-3 bg-surface p-4 sm:p-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={vehicle.image || vehicle.images[activeImage] || vehicle.images[0] || "/cars/camary1.png"}
                alt={`${vehicle.brand} ${vehicle.name} — photo ${activeImage + 1}`}
                className="h-full w-full object-cover"
              />
              {vehicle.featured ? (
                <span className="absolute top-3 left-3 rounded-md bg-primary px-2.5 py-1 text-[0.65rem] font-bold tracking-widest text-primary-foreground uppercase">
                  Featured
                </span>
              ) : null}
            </div>
            {vehicle.images.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {vehicle.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View photo ${i + 1}`}
                    aria-current={i === activeImage}
                    className={cn(
                      "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                      i === activeImage
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Details */}
          <div className="flex flex-col p-5 sm:p-6">
            <DialogHeader className="text-left">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
                  {vehicle.brand}
                </p>
                {vehicle.specs ? (
                  <span className="text-[0.65rem] font-bold tracking-widest uppercase bg-secondary px-2 py-0.5 rounded border border-border">
                    {vehicle.specs}
                  </span>
                ) : null}
              </div>

              <DialogTitle className="mt-1 text-2xl font-extrabold tracking-tight text-foreground">
                {vehicle.name}
              </DialogTitle>

              {vehicle.variant ? (
                <p className="mt-0.5 text-sm font-semibold text-muted-foreground">
                  {vehicle.variant}
                </p>
              ) : null}

              <DialogDescription className="sr-only">
                Full specifications and inquiry options for the {vehicle.brand} {vehicle.name}.
              </DialogDescription>
            </DialogHeader>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4 text-sm">
              {specs.map((item) => (
                <div key={item.label} className="min-w-0">
                  <dt className="text-[0.68rem] font-semibold tracking-wider text-muted-foreground uppercase">
                    {item.label}
                  </dt>
                  <dd className="truncate font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex flex-col gap-2 pt-6">
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Inquire on WhatsApp
              </a>
              <a
                href={`tel:${business.phoneHref}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {business.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => setShowForm((v) => !v)}
                aria-expanded={showForm}
                className="inline-flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {showForm ? "Hide inquiry form" : "No WhatsApp? Send an inquiry"}
              </button>
              {showForm ? (
                <InquiryForm
                  className="mt-1 border-t border-border pt-4"
                  vehicleLabel={`${vehicle.brand} ${vehicle.name} ${vehicle.variant ? `(${vehicle.variant})` : ""} - ${vehicle.year}`}
                />
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

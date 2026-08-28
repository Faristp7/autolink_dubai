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

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(value);

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
    { label: "Brand", value: vehicle.brand },
    { label: "Model", value: vehicle.name },
    { label: "Year", value: String(vehicle.year) },
    { label: "Mileage", value: `${formatNumber(vehicle.mileage)} KM` },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Fuel Type", value: vehicle.fuel },
    { label: "Category", value: vehicle.category },
    { label: "Location", value: "Ras Al Khor, Dubai" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-3xl overflow-y-auto border-border bg-card p-0 sm:rounded-xl">
        <div className="grid md:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-3 bg-surface p-4 sm:p-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={vehicle.images[activeImage]}
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
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                {vehicle.brand}
              </p>
              <DialogTitle className="mt-1 text-2xl font-extrabold tracking-tight">
                {vehicle.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Full specifications and inquiry options for the {vehicle.name}.
              </DialogDescription>
            </DialogHeader>

            <p className="mt-3 text-2xl font-extrabold tracking-tight">
              <span className="text-sm font-semibold text-muted-foreground">AED </span>
              {formatNumber(vehicle.price)}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-5 text-sm">
              {specs.map((item) => (
                <div key={item.label} className="min-w-0">
                  <dt className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                    {item.label}
                  </dt>
                  <dd className="truncate font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex flex-col gap-2 pt-6">
              <a
                href={whatsappLink(
                  `Hello AutoLink, I'm interested in the ${vehicle.name} (${vehicle.year}) listed at AED ${formatNumber(vehicle.price)}. Could you please share more details?`,
                )}
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
                  vehicleLabel={`${vehicle.brand} ${vehicle.name} (${vehicle.year})`}
                />
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

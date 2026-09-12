"use client";

import { useSyncExternalStore } from "react";
import { vehicles as seedVehicles, type Vehicle } from "@/data/vehicles";

let memoryCars: Vehicle[] | null = null;
const listeners = new Set<() => void>();

function read(): Vehicle[] {
  // Always clean up any stale localStorage if it exists so users see git updates
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem("autolink_cars_v2");
      window.localStorage.removeItem("autolink_cars");
    } catch {
      /* ignore */
    }
  }
  return memoryCars ?? seedVehicles;
}

function emit() {
  listeners.forEach((l) => l());
}

export function getCars(): Vehicle[] {
  return read();
}

export function saveCars(next: Vehicle[]) {
  memoryCars = next;
  emit();
}

export function resetCars() {
  memoryCars = null;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCars(): Vehicle[] {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => seedVehicles,
  );
}

export function newCarId() {
  return `car-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

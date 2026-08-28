"use client";

import { useSyncExternalStore } from "react";
import { vehicles as seedVehicles, type Vehicle } from "@/data/vehicles";

const STORAGE_KEY = "autolink_cars_v1";

let cache: Vehicle[] | null = null;
const listeners = new Set<() => void>();

function read(): Vehicle[] {
  if (typeof window === "undefined") return seedVehicles;
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as Vehicle[]) : seedVehicles;
  } catch {
    cache = seedVehicles;
  }
  return cache;
}

function emit() {
  listeners.forEach((l) => l());
}

export function getCars(): Vehicle[] {
  return read();
}

export function saveCars(next: Vehicle[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage full or unavailable */
  }
  emit();
}

export function resetCars() {
  cache = null;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
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

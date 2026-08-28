import carsJson from "./cars.json";

export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  price: number;
  images: string[];
  category: VehicleCategory;
  featured?: boolean;
};

export const categories = [
  "All",
  "SUVs",
  "Sedans",
  "Luxury",
  "4×4",
  "Commercial",
  "Specialized Vehicles",
] as const;

export type VehicleCategory = Exclude<(typeof categories)[number], "All">;

/**
 * Car listings live in src/data/cars.json.
 * The admin panel (/admin) edits them in the browser and can download an
 * updated cars.json to make changes permanent for every visitor.
 */
export const vehicles: Vehicle[] = carsJson as Vehicle[];

/** Set to real reviews when available; empty renders a placeholder state. */
export const reviews: { name: string; rating: number; text: string }[] = [];

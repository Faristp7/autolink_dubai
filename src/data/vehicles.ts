import carsJson from "./cars.json";

export type RawVehicleJson = {
  id: string;
  name: string;
  brand: string;
  variant?: string;
  engine?: string;
  specs?: string;
  year?: number;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  price?: number;
  image?: string;
  images?: string[];
  featured?: boolean;
};

export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  variant?: string;
  engine?: string;
  specs?: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  price: number;
  image: string;
  images: string[];
  featured?: boolean;
};

/**
 * Car listings live directly in src/data/cars.json.
 * Anyone can edit src/data/cars.json, push to Git, and it updates live everywhere.
 */
export const vehicles: Vehicle[] = (carsJson as RawVehicleJson[]).map((item) => {
  const primaryImg = item.image || item.images?.[0] || "/cars/camary1.png";
  const allImages = item.images && item.images.length > 0 ? item.images : [primaryImg];
  return {
    ...item,
    year: item.year ?? 2024,
    mileage: item.mileage ?? 0,
    fuel: item.fuel ?? "Petrol",
    transmission: item.transmission ?? "Automatic",
    price: item.price ?? 0,
    image: primaryImg,
    images: allImages,
  };
});

/** Set to real reviews when available; empty renders a placeholder state. */
export const reviews: { name: string; rating: number; text: string }[] = [];

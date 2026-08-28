"use client";

import { useEffect, useRef, useState } from "react";
import { Download, LogOut, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { categories, type Vehicle, type VehicleCategory } from "@/data/vehicles";
import { getCars, newCarId, resetCars, saveCars, useCars } from "@/lib/carsStore";

const ADMIN_PASSWORD = "autolink2026";
const SESSION_KEY = "autolink_admin_ok";

type Draft = Omit<Vehicle, "year" | "mileage" | "price"> & {
  year: string;
  mileage: string;
  price: string;
};

const emptyDraft = (): Draft => ({
  id: newCarId(),
  name: "",
  brand: "",
  year: "",
  mileage: "",
  fuel: "Petrol",
  transmission: "Automatic",
  price: "",
  images: [],
  category: "SUVs",
  featured: false,
});

const toDraft = (v: Vehicle): Draft => ({
  ...v,
  year: String(v.year),
  mileage: String(v.mileage),
  price: String(v.price),
  featured: Boolean(v.featured),
});

const field =
  "h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary";
const labelCls = "text-xs font-semibold tracking-wide text-muted-foreground uppercase";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "yes");
  }, []);

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) {
              sessionStorage.setItem(SESSION_KEY, "yes");
              setAuthed(true);
            } else {
              setError("Wrong password. Please try again.");
            }
          }}
          className="w-full max-w-sm rounded-xl border border-border bg-card p-7"
        >
          <h1 className="text-2xl font-extrabold tracking-tight">Car Manager</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the admin password to manage the cars shown on the website.
          </p>
          <label className={`${labelCls} mt-6 block`} htmlFor="pw">
            Password
          </label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className={`${field} mt-2`}
            autoComplete="current-password"
          />
          {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            className="mt-5 h-11 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground"
          >
            Log in
          </button>
        </form>
      </main>
    );
  }

  return (
    <CarManager
      onLogout={() => {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
        setPassword("");
      }}
    />
  );
}

function CarManager({ onLogout }: { onLogout: () => void }) {
  const cars = useCars();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [notice, setNotice] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const flash = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const save = () => {
    if (!draft) return;
    if (!draft.name.trim()) return flash("Please enter the car name.");
    const car: Vehicle = {
      ...draft,
      name: draft.name.trim(),
      brand: draft.brand.trim(),
      year: Number(draft.year) || new Date().getFullYear(),
      mileage: Number(draft.mileage) || 0,
      price: Number(draft.price) || 0,
    };
    const list = getCars();
    const exists = list.some((c) => c.id === car.id);
    saveCars(exists ? list.map((c) => (c.id === car.id ? car : c)) : [car, ...list]);
    setDraft(null);
    flash(exists ? "Car updated." : "Car added.");
  };

  const remove = (id: string) => {
    if (!window.confirm("Delete this car listing?")) return;
    saveCars(getCars().filter((c) => c.id !== id));
    flash("Car deleted.");
  };

  const addImages = async (files: FileList | null) => {
    if (!files || !draft) return;
    const encoded = await Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.readAsDataURL(file);
          }),
      ),
    );
    setDraft({ ...draft, images: [...draft.images, ...encoded] });
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(getCars(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cars.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!Array.isArray(parsed)) throw new Error("bad");
      saveCars(parsed as Vehicle[]);
      flash("Car list loaded from file.");
    } catch {
      flash("That file is not a valid cars.json file.");
    }
  };

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Car Manager</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {cars.length} car{cars.length === 1 ? "" : "s"} shown on the website.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDraft(emptyDraft())}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              <Plus className="h-4 w-4" aria-hidden="true" /> Add car
            </button>
            <button
              type="button"
              onClick={download}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Save file
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium"
            >
              <Upload className="h-4 w-4" aria-hidden="true" /> Load file
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => upload(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
            </button>
          </div>
        </header>

        {notice ? (
          <p className="mt-4 rounded-md border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
            {notice}
          </p>
        ) : null}

        <p className="mt-4 rounded-md border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
          Changes appear on the website right away on this device. To publish them for everyone,
          click <strong>Save file</strong> and send the downloaded <code>cars.json</code> to your
          web team (it replaces <code>src/data/cars.json</code>).
        </p>

        {draft ? (
          <section className="mt-6 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{draft.name || "New car"}</h2>
              <button type="button" onClick={() => setDraft(null)} aria-label="Close form">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Text
                label="Car name"
                value={draft.name}
                onChange={(v) => setDraft({ ...draft, name: v })}
              />
              <Text
                label="Brand"
                value={draft.brand}
                onChange={(v) => setDraft({ ...draft, brand: v })}
              />
              <Text
                label="Year"
                value={draft.year}
                onChange={(v) => setDraft({ ...draft, year: v })}
                inputMode="numeric"
              />
              <Text
                label="Mileage (KM)"
                value={draft.mileage}
                onChange={(v) => setDraft({ ...draft, mileage: v })}
                inputMode="numeric"
              />
              <Text
                label="Price (AED)"
                value={draft.price}
                onChange={(v) => setDraft({ ...draft, price: v })}
                inputMode="numeric"
              />
              <div>
                <label className={labelCls} htmlFor="cat">
                  Category
                </label>
                <select
                  id="cat"
                  className={`${field} mt-2`}
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value as VehicleCategory })
                  }
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="fuel">
                  Fuel
                </label>
                <select
                  id="fuel"
                  className={`${field} mt-2`}
                  value={draft.fuel}
                  onChange={(e) => setDraft({ ...draft, fuel: e.target.value })}
                >
                  {["Petrol", "Diesel", "Hybrid", "Electric"].map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="trans">
                  Transmission
                </label>
                <select
                  id="trans"
                  className={`${field} mt-2`}
                  value={draft.transmission}
                  onChange={(e) => setDraft({ ...draft, transmission: e.target.value })}
                >
                  {["Automatic", "Manual"].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="mt-5 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(draft.featured)}
                onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                className="h-4 w-4"
              />
              Show a “Featured” badge on this car
            </label>

            <div className="mt-6">
              <p className={labelCls}>Photos</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {draft.images.map((src, i) => (
                  <div
                    key={`${src.slice(0, 24)}-${i}`}
                    className="relative h-24 w-32 overflow-hidden rounded-md border border-border"
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      aria-label="Remove photo"
                      onClick={() =>
                        setDraft({ ...draft, images: draft.images.filter((_, x) => x !== i) })
                      }
                      className="absolute top-1 right-1 rounded-full bg-background/90 p-1"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <label className="flex h-24 w-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
                  + Add photo
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => addImages(e.target.files)}
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={save}
                className="h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground"
              >
                Save car
              </button>
              <button
                type="button"
                onClick={() => setDraft(null)}
                className="h-11 rounded-md border border-border px-6 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </section>
        ) : null}

        <section className="mt-8 grid gap-4">
          {cars.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No cars yet. The Vehicles section is hidden on the website until you add one.
            </p>
          ) : (
            cars.map((car) => (
              <article
                key={car.id}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <img
                  src={car.images[0] ?? "/cars/v1.jpg"}
                  alt=""
                  className="h-20 w-28 rounded-md object-cover"
                />
                <div className="min-w-40 flex-1">
                  <p className="text-xs tracking-wider text-muted-foreground uppercase">
                    {car.brand}
                  </p>
                  <h3 className="font-bold">{car.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {car.year} · {car.category} · AED {car.price.toLocaleString("en-AE")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDraft(toDraft(car))}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(car.id)}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-destructive/50 px-4 text-sm font-medium text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Reset to the car list saved in the website files?")) resetCars();
          }}
          className="mt-8 text-sm text-muted-foreground underline"
        >
          Reset to the original list
        </button>
      </div>
    </main>
  );
}

function Text({
  label,
  value,
  onChange,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  inputMode?: "numeric";
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label className={labelCls} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} mt-2`}
      />
    </div>
  );
}

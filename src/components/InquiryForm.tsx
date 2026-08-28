"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { business } from "@/data/business";

const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Please enter your name" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Phone must be less than 30 characters" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Please add a short message" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type Errors = Partial<Record<keyof z.infer<typeof inquirySchema>, string>>;

type Props = {
  /** Vehicle context prefilled into the subject and message body. */
  vehicleLabel?: string;
  className?: string;
};

/**
 * Inquiry form fallback for visitors who don't use WhatsApp.
 * Submits by opening the visitor's mail client with a prefilled message
 * addressed to the dealership inbox (no backend required).
 */
export function InquiryForm({ vehicleLabel, className }: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = inquirySchema.safeParse(data);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    const { name, email, phone, message } = parsed.data;
    const subject = vehicleLabel
      ? `Vehicle Inquiry — ${vehicleLabel}`
      : "Vehicle Inquiry — AutoLink";
    const body = [
      vehicleLabel ? `Vehicle: ${vehicleLabel}` : null,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const inputClass =
    "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="inq-name" className="sr-only">
            Your name
          </label>
          <input
            id="inq-name"
            name="name"
            maxLength={100}
            placeholder="Your name"
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className="mt-1 text-xs text-primary">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="inq-email" className="sr-only">
            Email address
          </label>
          <input
            id="inq-email"
            name="email"
            type="email"
            maxLength={255}
            placeholder="Email address"
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="mt-1 text-xs text-primary">{errors.email}</p> : null}
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="inq-phone" className="sr-only">
          Phone number (optional)
        </label>
        <input
          id="inq-phone"
          name="phone"
          type="tel"
          maxLength={30}
          placeholder="Phone number (optional)"
          className={inputClass}
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone ? <p className="mt-1 text-xs text-primary">{errors.phone}</p> : null}
      </div>

      <div className="mt-3">
        <label htmlFor="inq-message" className="sr-only">
          Message
        </label>
        <textarea
          id="inq-message"
          name="message"
          rows={4}
          maxLength={1000}
          defaultValue={
            vehicleLabel
              ? `I'm interested in the ${vehicleLabel}. Please share availability and full details.`
              : ""
          }
          placeholder="How can we help?"
          className="w-full resize-y rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <p className="mt-1 text-xs text-primary">{errors.message}</p> : null}
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Send Inquiry by Email
      </button>

      {sent ? (
        <p role="status" className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            Your email app should now be open with the inquiry ready to send. If nothing happened,
            write to{" "}
            <a
              href={`mailto:${business.email}`}
              className="font-medium text-foreground underline underline-offset-2"
            >
              {business.email}
            </a>
            .
          </span>
        </p>
      ) : (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Prefer email? We reply to {business.email} during business hours.
        </p>
      )}
    </form>
  );
}

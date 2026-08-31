/**
 * Central business information for AutoLink Specialized Vehicles Trading LLC.
 * Update these values when confirmed business details change.
 */
export const business = {
  legalName: "AutoLink Specialized Vehicles Trading LLC",
  shortName: "AutoLink",
  addressLine1: "Sajaya Building – B",
  addressLine2: "Manama Street, Ras Al Khor",
  addressLine3: "Dubai, UAE",
  phoneDisplay: "+971 52 304 7694",
  phoneHref: "+971523047694",
  /**
   * WhatsApp number in international format without symbols.
   * Currently set to the listed business line — replace when a dedicated
   * WhatsApp number is confirmed by the client.
   */
  whatsappNumber: "971523047694",
  whatsappMessage:
    "Hello AutoLink, I'm interested in one of your vehicles. Could you please share more details?",
  website: "www.autolink.ae",
  /** Inbox used by the email inquiry fallback — update when confirmed. */
  email: "info@autolink.ae",
  /** Set to a verified Google Business profile link when available. */
  googleReviewsUrl: null as string | null,
  /** Set to a verified Google Maps place link when available. */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sajaya+Building+B%2C+Manama+Street%2C+Ras+Al+Khor%2C+Dubai",
  /** Add entries only when real profiles are confirmed. */
  social: [] as { label: string; href: string }[],
};

export function whatsappLink(message: string = business.whatsappMessage) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Vehicles", href: "#vehicles" },
  { label: "About Us", href: "#about" },
  { label: "Why AutoLink", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

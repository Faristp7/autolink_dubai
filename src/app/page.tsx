import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VehicleSection } from "@/components/VehicleSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { VisualBreak } from "@/components/VisualBreak";
import { TrustStrip } from "@/components/TrustStrip";
import { Reviews } from "@/components/Reviews";
import { LocationSection } from "@/components/LocationSection";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { business } from "@/data/business";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: business.legalName,
    telephone: business.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.addressLine1}, ${business.addressLine2}`,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <VehicleSection />
        <AboutSection />
        <WhyChooseUs />
        <VisualBreak />
        <TrustStrip />
        <Reviews />
        <LocationSection />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

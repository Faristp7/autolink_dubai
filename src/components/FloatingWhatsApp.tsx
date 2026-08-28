import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/business";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AutoLink on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-primary opacity-20"
      />
      <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
    </a>
  );
}

import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoLink Specialized Vehicles Trading LLC | Premium Vehicles in Dubai",
  description:
    "Explore quality vehicles at AutoLink Specialized Vehicles Trading LLC in Ras Al Khor, Dubai. Discover our vehicle collection and contact our team today.",
  openGraph: {
    siteName: "AutoLink Specialized Vehicles Trading LLC",
    type: "website",
    title: "AutoLink Specialized Vehicles Trading LLC | Premium Vehicles in Dubai",
    description:
      "Explore quality vehicles at AutoLink Specialized Vehicles Trading LLC in Ras Al Khor, Dubai. Discover our vehicle collection and contact our team today.",
    url: "https://www.autolink.ae",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoLink Specialized Vehicles Trading LLC | Premium Vehicles in Dubai",
    description:
      "Explore quality vehicles at AutoLink Specialized Vehicles Trading LLC in Ras Al Khor, Dubai. Discover our vehicle collection and contact our team today.",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sora.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

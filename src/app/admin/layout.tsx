import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Manager | AutoLink Specialized Vehicles Trading LLC",
  description: "Private area to add, edit and remove AutoLink car listings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

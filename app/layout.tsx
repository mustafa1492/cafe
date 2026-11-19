import type { Metadata, Viewport } from "next";
import "@/core/ui/ui.css";
import "./globals.css";
import { cafeConfig } from "@/products/kafe/config";

export const metadata: Metadata = {
  title: cafeConfig.name,
  applicationName: cafeConfig.name,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

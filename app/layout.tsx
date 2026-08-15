import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppProviders } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lonomart | Website creation foundation",
  description: "Create and publish a professional website in 3–5 minutes.",
  applicationName: "Lonomart",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <AntdRegistry>
          <AppProviders>{children}</AppProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}

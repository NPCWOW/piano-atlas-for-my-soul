import type { Metadata, Viewport } from "next";
import AmbientMotion from "@/components/AmbientMotion";
import "./globals.css";
import "./reference-overrides.css";

export const metadata: Metadata = {
  title: "Piano Atlas for my soul",
  description:
    "A musical atlas, learning companion and personal library for pianists.",
};

export const viewport: Viewport = {
  themeColor: "#f3efe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning>
        {children}
        <AmbientMotion />
      </body>
    </html>
  );
}

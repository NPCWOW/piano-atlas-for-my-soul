import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piano Atlas for my soul",
  description: "The digital musical passport for every pianist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
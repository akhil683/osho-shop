import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sadhana Music House",
  description:
    "Discover our handpicked selection of premium musical instruments from top brands",
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

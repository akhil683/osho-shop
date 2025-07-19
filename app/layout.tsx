import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Providers from "@/lib/ReactQueryProvider";

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
      <Providers>
        <body>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}

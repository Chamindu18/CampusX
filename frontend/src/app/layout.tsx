import "./globals.css";

import type { Metadata } from "next";

/**
 * Global metadata.
 */
export const metadata: Metadata = {
  title: "CampusX",
  description:
    "Modern student marketplace platform",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root application layout.
 */
export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
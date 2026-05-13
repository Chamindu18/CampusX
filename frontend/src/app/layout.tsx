import "./globals.css";

import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

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
      <body>
        {/* Application Content */}
        {children}

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "16px",
              padding: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
/**
 * Platform application layout.
 */

import type { ReactNode } from "react";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

interface PlatformLayoutProps {
  children: ReactNode;
}

export default function PlatformLayout({
  children,
}: PlatformLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Atmospheric Background */}
      <AnimatedBackground />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[280px]">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="relative z-10 p-10">
          {children}
        </div>
      </div>
    </main>
  );
}
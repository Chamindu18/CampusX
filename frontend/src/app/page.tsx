/**
 * Homepage
 */

import { Navbar } from "@/components/layout/Navbar";

import { HeroSection } from "@/components/sections/home/HeroSection";
import { CategoriesSection } from "@/components/sections/home/CategoriesSection";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-slate-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <CategoriesSection />
    </main>
  );
}
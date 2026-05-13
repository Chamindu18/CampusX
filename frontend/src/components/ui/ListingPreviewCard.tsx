/**
 * Marketplace preview card.
 *
 * Used for hero visual composition.
 */

import { Laptop, BookOpen, Gamepad2 } from "lucide-react";

import { Card } from "@/components/ui/Card";

interface ListingPreviewCardProps {
  title: string;
  category: string;
  price: string;
  type: "electronics" | "books" | "gaming";
}

/**
 * Icon mapping.
 */
const iconMap = {
  electronics: Laptop,
  books: BookOpen,
  gaming: Gamepad2,
};

export function ListingPreviewCard({
  title,
  category,
  price,
  type,
}: ListingPreviewCardProps) {
  const Icon = iconMap[type];

  return (
    <Card className="group w-full max-w-sm border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top */}
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Icon className="h-6 w-6" />
        </div>

        {/* Category */}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Campus marketplace listing preview
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xl font-bold text-slate-900">
          {price}
        </span>

        <button className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
          View
        </button>
      </div>
    </Card>
  );
}
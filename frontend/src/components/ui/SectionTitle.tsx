/**
 * Reusable section heading component.
 */

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {/* Title */}
      <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-6 text-lg leading-8 text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}
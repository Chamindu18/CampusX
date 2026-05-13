/**
 * Homepage footer.
 */

import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              CampusX
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Modern student marketplace platform.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-slate-600">
            <a
              href="#features"
              className="transition hover:text-slate-900"
            >
              Features
            </a>

            <a
              href="#safety"
              className="transition hover:text-slate-900"
            >
              Safety
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-slate-900"
            >
              How It Works
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
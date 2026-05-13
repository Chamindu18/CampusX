/**
 * Dashboard homepage.
 */

import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div>
      {/* Heading */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Welcome to your CampusX workspace.
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Card 1 */}
        <Card className="border-white/40 bg-white/70 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Marketplace
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Browse and manage student listings.
          </p>

          <a
            href="/marketplace"
            className="
              mt-8
              inline-flex
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Open Marketplace
          </a>
        </Card>

        {/* Card 2 */}
        <Card className="border-white/40 bg-white/70 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Auctions
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Participate in live student auctions.
          </p>
        </Card>

        {/* Card 3 */}
        <Card className="border-white/40 bg-white/70 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Messages
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Communicate with buyers and sellers.
          </p>
        </Card>
      </div>
    </div>
  );
}
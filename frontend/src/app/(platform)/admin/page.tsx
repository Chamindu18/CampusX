/**
 * Admin moderation dashboard.
 */

async function getReports() {
  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/reports`,
      {
        cache: "no-store",
      }
    );

  return response.json();
}

export default async function AdminPage() {
  /**
   * Fetch reports.
   */
  const reports =
    await getReports();

  return (
    <div>
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Platform moderation and safety
          management.
        </p>
      </div>

      {/* REPORTS */}
      <div className="mt-12 space-y-6">
        {reports.map(
          (report: any) => (
            <div
              key={report.id}
              className="
                rounded-3xl
                border
                border-white/40
                bg-white/70
                p-8
                backdrop-blur-xl
              "
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div
                    className="
                      inline-flex
                      rounded-full
                      bg-red-100
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-red-700
                    "
                  >
                    {
                      report.reason
                    }
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-slate-900">
                    {
                      report.listing
                        .title
                    }
                  </h2>

                  <p className="mt-3 text-slate-500">
                    Reported by{" "}
                    {
                      report.reporter
                        .name
                    }
                  </p>
                </div>

                <div
                  className="
                    rounded-full
                    bg-yellow-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-yellow-700
                  "
                >
                  {
                    report.status
                  }
                </div>
              </div>

              {/* Description */}
              {report.description && (
                <div className="mt-8">
                  <p className="leading-7 text-slate-600">
                    {
                      report.description
                    }
                  </p>
                </div>
              )}

              {/* Listing */}
              <div
                className="
                  mt-8
                  rounded-2xl
                  bg-slate-100
                  p-5
                "
              >
                <p className="text-sm text-slate-500">
                  Listing Description
                </p>

                <p className="mt-3 leading-7 text-slate-700">
                  {
                    report.listing
                      .description
                  }
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
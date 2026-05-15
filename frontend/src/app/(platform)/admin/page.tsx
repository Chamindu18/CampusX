/**
 * Admin moderation dashboard.
 */

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/**
 * Fetch reports.
 */
async function getReports() {
  try {
    return prisma.report.findMany({
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        listing: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(error);

    return [];
  }
}

export default async function AdminPage() {
  /**
   * Current user.
   */
  const currentUser =
    await getCurrentUser();

  /**
   * Unauthorized access.
   */
  if (
    !currentUser
  ) {
    redirect("/login");
  }

  if (
    currentUser.role !==
      "ADMIN"
  ) {
    redirect("/dashboard");
  }

  /**
   * Fetch reports.
   */
  const reports =
    await getReports();

  return (
    <div>
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Platform moderation and
          safety management.
        </p>
      </div>

      {/* ================================= */}
      {/* STATS */}
      {/* ================================= */}

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {/* Total Reports */}
        <div
          className="
            rounded-3xl
            border
            border-white/40
            bg-white/70
            p-8
            backdrop-blur-xl
          "
        >
          <p className="text-sm text-slate-500">
            Total Reports
          </p>

          <h2 className="mt-4 text-5xl font-black text-slate-900">
            {reports.length}
          </h2>
        </div>

        {/* Pending */}
        <div
          className="
            rounded-3xl
            border
            border-white/40
            bg-white/70
            p-8
            backdrop-blur-xl
          "
        >
          <p className="text-sm text-slate-500">
            Pending Reports
          </p>

          <h2 className="mt-4 text-5xl font-black text-yellow-600">
            {
              reports.filter(
                (report) =>
                  report.status ===
                  "PENDING"
              ).length
            }
          </h2>
        </div>

        {/* Resolved */}
        <div
          className="
            rounded-3xl
            border
            border-white/40
            bg-white/70
            p-8
            backdrop-blur-xl
          "
        >
          <p className="text-sm text-slate-500">
            Resolved Reports
          </p>

          <h2 className="mt-4 text-5xl font-black text-green-600">
            {
              reports.filter(
                (report) =>
                  report.status ===
                  "RESOLVED"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* ================================= */}
      {/* REPORTS */}
      {/* ================================= */}

      <div className="mt-14 space-y-6">
        {reports.length ===
          0 && (
          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-slate-300
              bg-white/50
              px-10
              py-24
              text-center
              backdrop-blur-xl
            "
          >
            <h3 className="text-3xl font-bold text-slate-900">
              No reports found
            </h3>

            <p className="mt-4 text-slate-500">
              Platform moderation queue
              is currently empty.
            </p>
          </div>
        )}

        {reports.map(
          (report) => (
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
              {/* ================================= */}
              {/* TOP */}
              {/* ================================= */}

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  {/* Reason */}
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
                    {report.reason}
                  </div>

                  {/* Title */}
                  <h2 className="mt-5 text-2xl font-bold text-slate-900">
                    {
                      report.listing
                        ?.title
                    }
                  </h2>

                  {/* Reporter */}
                  <p className="mt-3 text-slate-500">
                    Reported by{" "}
                    {
                      report.reporter
                        ?.name
                    }
                  </p>
                </div>

                {/* Status */}
                <div
                  className={`
                    inline-flex
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    ${
                      report.status ===
                      "PENDING"
                        ? `
                          bg-yellow-100
                          text-yellow-700
                        `
                        : `
                          bg-green-100
                          text-green-700
                        `
                    }
                  `}
                >
                  {report.status}
                </div>
              </div>

              {/* ================================= */}
              {/* DESCRIPTION */}
              {/* ================================= */}

              {report.description && (
                <div className="mt-8">
                  <p className="leading-7 text-slate-600">
                    {
                      report.description
                    }
                  </p>
                </div>
              )}

              {/* ================================= */}
              {/* LISTING DESCRIPTION */}
              {/* ================================= */}

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
                      ?.description
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
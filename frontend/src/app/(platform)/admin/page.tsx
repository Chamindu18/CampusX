"use client";

/**
 * Admin moderation dashboard.
 */

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

interface Report {
  id: string;

  reason: string;

  description?: string;

  status: string;

  listing: {
    id: string;

    title: string;

    description: string;
  };

  reporter: {
    name: string;

    email: string;
  };
}

export default function AdminPage() {
  /**
   * Reports state.
   */
  const [reports, setReports] =
    useState<Report[]>([]);

  /**
   * Loading state.
   */
  const [loading, setLoading] =
    useState(true);

  /**
   * Fetch reports.
   */
  async function fetchReports() {
    try {
      const response =
        await fetch(
          "/api/reports"
        );

      const data =
        await response.json();

      setReports(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to fetch reports"
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Resolve report.
   */
  async function resolveReport(
    id: string
  ) {
    try {
      const response =
        await fetch(
          `/api/reports/${id}`,
          {
            method: "PATCH",
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        "Report resolved"
      );

      fetchReports();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to resolve report"
      );
    }
  }

  /**
   * Delete listing.
   */
  async function removeListing(
    id: string
  ) {
    const confirmed =
      confirm(
        "Delete this listing?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/reports/${id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        "Listing removed"
      );

      fetchReports();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to remove listing"
      );
    }
  }

  /**
   * Initial fetch.
   */
  useEffect(() => {
    fetchReports();
  }, []);

  /**
   * Loading UI.
   */
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading reports...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Platform moderation and
          safety management.
        </p>
      </div>

      {/* REPORTS */}
      <div className="mt-12 space-y-6">
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
            "
          >
            <h3 className="text-3xl font-bold text-slate-900">
              No reports found
            </h3>
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
              {/* Top */}
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
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
                    {report.reason}
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-slate-900">
                    {
                      report.listing
                        ?.title
                    }
                  </h2>

                  <p className="mt-3 text-slate-500">
                    Reported by{" "}
                    {
                      report.reporter
                        ?.name
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
                  {report.status}
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
                      ?.description
                  }
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() =>
                    resolveReport(
                      report.id
                    )
                  }
                  className="
                    rounded-2xl
                    bg-green-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                  "
                >
                  Resolve Report
                </button>

                <button
                  onClick={() =>
                    removeListing(
                      report.id
                    )
                  }
                  className="
                    rounded-2xl
                    bg-red-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-700
                  "
                >
                  Remove Listing
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
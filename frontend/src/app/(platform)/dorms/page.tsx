"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  DormCard,
} from "@/components/ui/DormCard";

/**
 * Universities.
 */
const universities = [
  "All",
  "NSBM",
  "SLIIT",
  "UCSC",
  "University of Moratuwa",
  "University of Colombo",
  "University of Kelaniya",
  "University of Peradeniya",
];

export default function DormsPage() {
  /**
   * Dorms state.
   */
  const [
    dorms,
    setDorms,
  ] = useState<any[]>(
    []
  );

  /**
   * Loading state.
   */
  const [
    loading,
    setLoading,
  ] = useState(true);

  /**
   * Filters.
   */
  const [
    university,
    setUniversity,
  ] = useState("All");

  const [
    gender,
    setGender,
  ] = useState("");

  /**
   * Fetch dorms.
   */
  useEffect(() => {
    async function fetchDorms() {
      try {
        /**
         * Query params.
         */
        const params =
          new URLSearchParams();

        if (
          university !==
          "All"
        ) {
          params.append(
            "university",
            university
          );
        }

        if (
          gender
        ) {
          params.append(
            "gender",
            gender
          );
        }

        /**
         * Request.
         */
        const response =
          await fetch(
            `/api/dorms?${params.toString()}`
          );

        const result =
          await response.json();

        setDorms(
          result.dorms ||
            []
        );
      } catch (
        error
      ) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    fetchDorms();
  }, [
    university,
    gender,
  ]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Student Dorms
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Find safe boarding places near your university.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">
          {/* University */}
          <select
            value={
              university
            }
            onChange={(
              event
            ) =>
              setUniversity(
                event.target
                  .value
              )
            }
            className="
              h-12
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              px-4
              text-sm
              outline-none
            "
          >
            {universities.map(
              (
                item
              ) => (
                <option
                  key={
                    item
                  }
                  value={
                    item
                  }
                >
                  {item}
                </option>
              )
            )}
          </select>

          {/* Gender */}
          <select
            value={
              gender
            }
            onChange={(
              event
            ) =>
              setGender(
                event.target
                  .value
              )
            }
            className="
              h-12
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              px-4
              text-sm
              outline-none
            "
          >
            <option value="">
              All
            </option>

            <option value="Boys">
              Boys
            </option>

            <option value="Girls">
              Girls
            </option>

            <option value="Mixed">
              Mixed
            </option>
          </select>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="mt-20 text-center">
          <p className="text-slate-500">
            Loading dorms...
          </p>
        </div>
      ) : dorms.length ===
        0 ? (
        <div className="mt-20 text-center">
          <p className="text-lg text-slate-500">
            No dorms found.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {dorms.map(
            (dorm) => (
              <DormCard
                key={
                  dorm.id
                }
                {...dorm}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

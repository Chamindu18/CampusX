"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  useParams,
} from "next/navigation";

import Link from "next/link";

import {
  MapPin,
  GraduationCap,
  BedDouble,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function DormDetailPage() {
  /**
   * Route params.
   */
  const params =
    useParams();

  const dormId =
    params.id as string;

  /**
   * Dorm state.
   */
  const [
    dorm,
    setDorm,
  ] = useState<any>(
    null
  );

  /**
   * Loading state.
   */
  const [
    loading,
    setLoading,
  ] = useState(true);

  /**
   * Fetch dorm.
   */
  useEffect(() => {
    async function fetchDorm() {
      try {
        const response =
          await fetch(
            `/api/dorms/${dormId}`
          );

        const result =
          await response.json();

        setDorm(
          result
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

    if (
      dormId
    ) {
      fetchDorm();
    }
  }, [dormId]);

  /**
   * Loading UI.
   */
  if (
    loading
  ) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading dorm...
        </p>
      </div>
    );
  }

  /**
   * Not found.
   */
  if (!dorm) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Dorm not found
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* IMAGES */}
        <div>
          <div className="grid gap-4">
            {dorm.imageUrls.map(
              (
                image: string
              ) => (
                <div
                  key={image}
                  className="
                    relative
                    h-[350px]
                    overflow-hidden
                    rounded-3xl
                  "
                >
                  <Image
                    src={image}
                    alt={
                      dorm.title
                    }
                    fill
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900">
                {dorm.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 text-slate-500">
                <MapPin className="h-5 w-5" />

                <span>
                  {dorm.city}
                </span>
              </div>
            </div>

            <div
              className="
                rounded-full
                bg-blue-100
                px-5
                py-3
                text-sm
                font-semibold
                text-blue-700
              "
            >
              {dorm.gender}
            </div>
          </div>

          {/* Price */}
          <div className="mt-8">
            <p className="text-5xl font-black text-slate-900">
              LKR{" "}
              {dorm.price.toLocaleString()}
            </p>

            <p className="mt-2 text-slate-500">
              per month
            </p>
          </div>

          {/* Meta */}
          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3 text-slate-700">
              <GraduationCap className="h-5 w-5" />

              <span>
                {
                  dorm.university
                }
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <BedDouble className="h-5 w-5" />

              <span>
                {
                  dorm.roomType
                }
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="h-5 w-5" />

              <span>
                {
                  dorm.distanceFromUniversity
                }
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Description
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              {
                dorm.description
              }
            </p>
          </div>

          {/* Facilities */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Facilities
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {dorm.facilities.map(
                (
                  facility: string
                ) => (
                  <div
                    key={
                      facility
                    }
                    className="
                      rounded-full
                      bg-slate-100
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    {
                      facility
                    }
                  </div>
                )
              )}
            </div>
          </div>

          {/* Owner */}
          <div
            className="
              mt-12
              rounded-3xl
              border
              border-white/40
              bg-white/70
              p-8
              backdrop-blur-xl
            "
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Owner Information
            </h2>

            <p className="mt-5 text-slate-600">
              Posted by{" "}
              <span className="font-semibold">
                {
                  dorm.user
                    .name
                }
              </span>
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Call */}
              <a
                href={`tel:${dorm.contactNumber}`}
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-green-600
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                "
              >
                <Phone className="h-5 w-5" />

                Call Owner
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/94${dorm.contactNumber.replace(
                  /^0/,
                  ""
                )}`}
                target="_blank"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-emerald-500
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                "
              >
                <MessageCircle className="h-5 w-5" />

                WhatsApp
              </a>

              {/* Internal Chat */}
              <Link
                href={`/messages?userId=${dorm.user.id}`}
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-blue-600
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                "
              >
                <MessageCircle className="h-5 w-5" />

                Message Inside CampusX
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
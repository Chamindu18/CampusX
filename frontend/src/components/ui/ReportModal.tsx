"use client";

/**
 * Listing report modal.
 */

import { useState } from "react";

import toast from "react-hot-toast";

import { X } from "lucide-react";

interface ReportModalProps {
  listingId: string;

  open: boolean;

  onClose: () => void;
}

const reasons = [
  "Spam",

  "Fake Listing",

  "Scam",

  "Harassment",

  "Inappropriate Content",

  "Other",
];

export function ReportModal({
  listingId,
  open,
  onClose,
}: ReportModalProps) {
  /**
   * Form state.
   */
  const [reason, setReason] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  /**
   * Hidden state.
   */
  if (!open) {
    return null;
  }

  /**
   * Submit report.
   */
  async function handleSubmit() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/reports",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              listingId,

              reason,

              description,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error
        );

        return;
      }

      toast.success(
        "Report submitted"
      );

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to submit report"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-xl
          rounded-[32px]
          bg-white
          p-8
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              Report Listing
            </h2>

            <p className="mt-2 text-slate-500">
              Help keep CampusX safe.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
              transition
              hover:bg-slate-200
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Reasons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {reasons.map((item) => (
            <button
              key={item}
              onClick={() =>
                setReason(item)
              }
              className={`
                rounded-2xl
                px-5
                py-3
                text-sm
                font-medium
                transition
                ${
                  reason === item
                    ? `
                      bg-red-600
                      text-white
                    `
                    : `
                      bg-slate-100
                      text-slate-700
                    `
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="mt-8">
          <textarea
            rows={5}
            placeholder="Additional details..."
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              py-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button
            disabled={
              !reason || loading
            }
            onClick={
              handleSubmit
            }
            className="
              rounded-2xl
              bg-red-600
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {loading
              ? "Submitting..."
              : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
}
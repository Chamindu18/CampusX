"use client";

/**
 * Listing image uploader.
 */

import Image from "next/image";

import {
  UploadDropzone,
} from "@uploadthing/react";

import type {
  OurFileRouter,
} from "@/app/api/uploadthing/core";

interface ImageUploadProps {
  value: string[];

  onChange: (
    urls: string[]
  ) => void;
}

export function ImageUpload({
  value,
  onChange,
}: ImageUploadProps) {
  return (
    <div>
      {/* Preview Grid */}
      {value.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          {value.map((url) => (
            <div
              key={url}
              className="
                relative
                h-40
                overflow-hidden
                rounded-2xl
              "
            >
              <Image
                src={url}
                alt="Listing image"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <UploadDropzone<OurFileRouter>
        endpoint="listingImageUploader"
        onClientUploadComplete={(
          response
        ) => {
          const urls =
            response.map(
              (file) => file.url
            );

          onChange(urls);
        }}
        onUploadError={(
          error: Error
        ) => {
          console.error(error);
        }}
        appearance={{
          container:
            "border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50 p-10",
        }}
      />
    </div>
  );
}
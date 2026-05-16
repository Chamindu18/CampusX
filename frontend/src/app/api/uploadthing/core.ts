/**
 * UploadThing configuration.
 */

import {
  createUploadthing,
  type FileRouter,
} from "uploadthing/next";

import { UploadThingError } from "uploadthing/server";

import { getCurrentUser } from "@/lib/current-user";

const f = createUploadthing();

/* ===================================================== */
/* FILE ROUTER */
/* ===================================================== */

export const ourFileRouter = {
  /**
   * Marketplace listing uploads.
   */
  listingImageUploader:
    f({
      image: {
        /**
         * Limits.
         */
        maxFileSize: "4MB",

        maxFileCount: 5,
      },
    })

      /**
       * Middleware.
       */
      .middleware(
        async () => {
          /**
           * Auth check.
           */
          const currentUser =
            await getCurrentUser();

          if (
            !currentUser
          ) {
            throw new UploadThingError(
              "Unauthorized"
            );
          }

          return {
            userId:
              currentUser.id,
          };
        }
      )

      /**
       * Upload complete.
       */
      .onUploadComplete(
        async ({
          metadata,
          file,
        }) => {
          console.log(
            "Upload complete:",
            {
              userId:
                metadata.userId,

              url: file.url,

              name:
                file.name,
            }
          );

          return {
            uploadedBy:
              metadata.userId,

            url: file.url,
          };
        }
      ),
} satisfies FileRouter;

/* ===================================================== */
/* TYPES */
/* ===================================================== */

export type OurFileRouter =
  typeof ourFileRouter;
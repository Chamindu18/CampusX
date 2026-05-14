/**
 * UploadThing configuration.
 */

import {
  createUploadthing,
  type FileRouter,
} from "uploadthing/next";

const f = createUploadthing();

/**
 * Upload router.
 */
export const ourFileRouter = {
  listingImageUploader:
    f({
      image: {
        maxFileSize: "8MB",
        maxFileCount: 4,
      },
    }).onUploadComplete(
      async ({ file }) => {
        console.log(
          "Upload complete:",
          file.url
        );

        return {
          url: file.url,
        };
      }
    ),
} satisfies FileRouter;

export type OurFileRouter =
  typeof ourFileRouter;
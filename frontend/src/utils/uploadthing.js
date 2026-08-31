import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } = generateReactHelpers({
  url: "http://localhost:5001/api/uploadthing",
});

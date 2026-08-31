import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } = generateReactHelpers({
  url: `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/uploadthing`,
});

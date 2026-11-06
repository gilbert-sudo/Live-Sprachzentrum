const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  libraryUploader: f({
    pdf: { maxFileSize: "512MB", maxFileCount: 1 },
    audio: { maxFileSize: "512MB", maxFileCount: 100 },
    image: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .onUploadComplete((data) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload completed for", data);
    }),
};

module.exports = { uploadRouter };

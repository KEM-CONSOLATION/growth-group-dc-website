import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  name: "default",
  title: "Growth Group Website",
  // Prefer Studio env vars, then fall back to Next.js public ones
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    (() => {
      console.log(
        "process.env.SANITY_STUDIO_PROJECT_ID",
        process.env.SANITY_STUDIO_PROJECT_ID
      );
      console.log(
        "process.env.NEXT_PUBLIC_SANITY_PROJECT_ID",
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      );
      throw new Error(
        "Sanity Studio: Missing projectId. Set SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local"
      );
    })(),
  dataset:
    process.env.SANITY_STUDIO_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    "production",
  basePath: "/studio",
  plugins: [
    deskTool(),
    codeInput(),
    visionTool(), // Optional: Sanity Vision for querying content
  ],
  schema: {
    types: schemaTypes,
  },
});

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "3kct911x",
  dataset: "production",
  useCdn: true,       // true = faster cached reads, fine for public content
  apiVersion: "2024-01-01",
  // No token — dataset is public, read-only access is free
});

const builder = imageUrlBuilder(client);

// Helper: convert a Sanity image reference to a URL
// Usage: urlFor(image).width(800).url()
export const urlFor = (source) => builder.image(source);

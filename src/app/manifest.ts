import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MAIA Management",
    short_name: "MAIA",
    description:
      "Unlock the door to Miami's vibrant lifestyle. Property management and apartment rentals in Miami Beach.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3eee7",
    theme_color: "#1d1d1b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

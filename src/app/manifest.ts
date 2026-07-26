import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#faf3ec",
    theme_color: "#faf3ec",
    icons: [
      {
        src: "/logo.png",
        sizes: "2000x2000",
        type: "image/png",
      },
    ],
  };
}

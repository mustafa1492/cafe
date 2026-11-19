import type { MetadataRoute } from "next";
import { cafeConfig } from "@/products/kafe/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: cafeConfig.name,
    short_name: cafeConfig.shortName,
    lang: "tr",
    start_url: "/",
    display: "standalone",
  };
}

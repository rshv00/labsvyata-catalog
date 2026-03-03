import type { MetadataRoute } from "next";
import { characters } from "@/content/characters";
import { programs } from "@/content/programs";

const baseUrl = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/characters", "/programs", "/prices", "/about", "/contacts"];

  const characterRoutes = characters.map((item) => `/characters/${item.slug}`);
  const programRoutes = programs.map((item) => `/programs/${item.slug}`);

  return [...staticRoutes, ...characterRoutes, ...programRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}

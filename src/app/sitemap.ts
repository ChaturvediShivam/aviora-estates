import type { MetadataRoute } from "next";
import { business, properties } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/gallery", "/contact", "/refund-policy", "/terms"];
  const staticUrls = routes.map((route) => ({
    url: `${business.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const propertyUrls = properties.map((property) => ({
    url: `${business.url}/properties/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...propertyUrls];
}

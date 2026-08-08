import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://kayhuhu-roadmap.vercel.app";
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ementa`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/sabatina-teste`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/provas`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "monthly", priority: 0.6 },
  ];
}

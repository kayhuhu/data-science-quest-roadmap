import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://kayhuhu-roadmap.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/portfolio"],
      disallow: ["/app", "/anotacoes", "/configuracoes", "/caderno-de-erros"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

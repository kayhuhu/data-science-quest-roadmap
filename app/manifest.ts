import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Data Science Quest",
    short_name: "DS Quest",
    description: "24 semanas na ordem do planejamento para dominar a ementa, construir projetos e defender decisões.",
    start_url: "/",
    display: "standalone",
    background_color: "#07111f",
    theme_color: "#07111f",
    lang: "pt-BR",
  };
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Data Science Quest",
    short_name: "DS Quest",
    description: "24 semanas, sabatina real e duas provas interativas para dominar fundamentos e aplicações bancárias de Ciência de Dados.",
    start_url: "/",
    display: "standalone",
    background_color: "#07111f",
    theme_color: "#07111f",
    lang: "pt-BR",
  };
}

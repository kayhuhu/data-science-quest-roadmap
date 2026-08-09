import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import "./weekly-study.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://kayhuhu-roadmap.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Data Science Quest — Jornada de 22 semanas",
    template: "%s · Data Science Quest",
  },
  description:
    "Roadmap completo para dominar a ementa de Cientista de Dados, construir 22 projetos e treinar 51 perguntas de sabatina e duas provas reais.",
  applicationName: "Data Science Quest",
  keywords: ["ciência de dados", "roadmap", "Itaú", "machine learning", "estudos"],
  openGraph: {
    title: "Data Science Quest",
    description:
      "22 semanas na ordem canônica do roadmap v12 para dominar a ementa, construir projetos e defender decisões.",
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Data Science Quest",
    images: [{ url: "/og.png", width: 1792, height: 928, alt: "Data Science Quest — jornada visual de 22 semanas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Science Quest",
    description:
      "22 semanas na ordem canônica do roadmap v12 para dominar a ementa, construir projetos e defender decisões.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

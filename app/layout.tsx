import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data Science Quest — Jornada de 22 semanas",
  description:
    "Roadmap completo para dominar a ementa de Cientista de Dados, construir 22 projetos e treinar prova prática e sabatina.",
  applicationName: "Data Science Quest",
  keywords: ["ciência de dados", "roadmap", "Itaú", "machine learning", "estudos"],
  openGraph: {
    title: "Data Science Quest",
    description:
      "22 semanas para dominar a ementa, construir projetos e defender decisões.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Science Quest",
    description:
      "22 semanas para dominar a ementa, construir projetos e defender decisões.",
  },
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

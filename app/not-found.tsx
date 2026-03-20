import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getCanonicalUrl } from "@/lib/seo";

const notFoundUrl = getCanonicalUrl("/404");

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  description: "Сторінка недоступна або була переміщена.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: notFoundUrl,
  },
  openGraph: {
    title: "Сторінку не знайдено | Лабораторія свята",
    description: "Сторінка недоступна або була переміщена.",
    url: notFoundUrl,
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Сторінку не знайдено | Лабораторія свята",
    description: "Сторінка недоступна або була переміщена.",
  },
};

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-3xl font-black text-slate-900">Сторінку не знайдено</h1>
      <p className="mt-3 text-sm text-slate-700">Можливо, посилання застаріло або сторінку перенесено.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        На головну
      </Link>
    </Container>
  );
}

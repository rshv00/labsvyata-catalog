import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CharacterCatalogClient } from "@/components/catalog/CharacterCatalogClient";
import { characters } from "@/content/characters";
import { site } from "@/content/site";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Аніматори та персонажі у Боярці",
  description:
    "Персонажі та аніматори у Боярці для дитячих свят: фільтруйте за віком, тематикою, тривалістю та ціною.",
  alternates: {
    canonical: getCanonicalUrl("/characters"),
  },
  openGraph: {
    title: `Аніматори та персонажі у Боярці | ${site.brand_name_ua}`,
    description: "Каталог персонажів для дитячих свят у Боярці з пошуком, фільтрами та сортуванням.",
    url: getCanonicalUrl("/characters"),
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Аніматори та персонажі у Боярці | ${site.brand_name_ua}`,
    description: "Оберіть персонажа за віком, тривалістю та бюджетом.",
  },
};

export default function CharactersPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Головна" }, { label: "Персонажі" }]} />
      <h1 className="text-3xl font-black text-slate-900">Персонажі</h1>
      <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          Персонажі — це образи ведучих. Їх можна обрати до будь-якої програми. Вартість залежить від пакету — дивіться
          «Ціни».
        </p>
        <Link
          href="/prices/"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Перейти до цін
        </Link>
      </div>

      <div className="mt-6">
        <CharacterCatalogClient items={characters} />
      </div>
    </Container>
  );
}

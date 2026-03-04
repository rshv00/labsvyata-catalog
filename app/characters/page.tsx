import type { Metadata } from "next";
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
      <p className="mt-2 text-sm text-slate-700">Обирайте улюблених героїв за тематикою, віком, тривалістю та бюджетом.</p>

      <div className="mt-6">
        <CharacterCatalogClient items={characters} />
      </div>
    </Container>
  );
}

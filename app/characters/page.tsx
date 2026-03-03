import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CharacterCatalogClient } from "@/components/catalog/CharacterCatalogClient";
import { characters } from "@/content/characters";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Персонажі",
  description: `Каталог персонажів для дитячих свят від ${site.brand_name_ua} у ${site.city_ua}.`,
  openGraph: {
    title: `Персонажі | ${site.brand_name_ua}`,
    description: `Переглядайте персонажів за віком, тривалістю та ціною у ${site.city_ua}.`,
    locale: "uk_UA",
    type: "website",
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

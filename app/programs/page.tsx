import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProgramCatalogClient } from "@/components/catalog/ProgramCatalogClient";
import { programs } from "@/content/programs";
import { site } from "@/content/site";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Програми для свят у Боярці",
  description: "Програми для свят у Боярці: квести, шоу та тематичні формати для дітей різного віку.",
  alternates: {
    canonical: getCanonicalUrl("/programs"),
  },
  openGraph: {
    title: `Програми для свят у Боярці | ${site.brand_name_ua}`,
    description: "Каталог програм для дитячих свят у Боярці з фільтрами за віком, тривалістю та ціною.",
    url: getCanonicalUrl("/programs"),
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Програми для свят у Боярці | ${site.brand_name_ua}`,
    description: "Оберіть програму свята за тематикою, віком і бюджетом.",
  },
};

export default function ProgramsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Головна" }, { label: "Програми" }]} />
      <h1 className="text-3xl font-black text-slate-900">Програми</h1>
      <p className="mt-2 text-sm text-slate-700">Підбирайте формат свята за віком, тематикою, тривалістю та ціною.</p>

      <div className="mt-6">
        <ProgramCatalogClient items={programs} />
      </div>
    </Container>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProgramCatalogClient } from "@/components/catalog/ProgramCatalogClient";
import { programs } from "@/content/programs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Програми",
  description: `Каталог шоу та програм для дитячих свят від ${site.brand_name_ua}.`,
  openGraph: {
    title: `Програми | ${site.brand_name_ua}`,
    description: `Квести, шоу, майстер-класи та інші програми у ${site.city_ua}.`,
    locale: "uk_UA",
    type: "website",
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

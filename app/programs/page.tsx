import type { Metadata } from "next";
import Link from "next/link";
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
      <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          Вартість залежить від пакету та формату (приміщення/виїзд). Дивіться сторінку «Ціни».
        </p>
        <Link
          href="/prices/"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Перейти до цін
        </Link>
      </div>

      <div className="mt-6">
        <ProgramCatalogClient items={programs} />
      </div>
    </Container>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pricing } from "@/content/pricing";
import { site } from "@/content/site";
import { formatMinutes, formatPriceUah } from "@/lib/format";

export const metadata: Metadata = {
  title: "Ціни",
  description: `Пакети та додаткові опції ${site.brand_name_ua} у ${site.city_ua}.`,
  openGraph: {
    title: `Ціни | ${site.brand_name_ua}`,
    description: "Актуальні пакети та додаткові опції для дитячих свят.",
    locale: "uk_UA",
    type: "website",
  },
};

export default function PricesPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Головна" }, { label: "Ціни" }]} />
      <h1 className="text-3xl font-black text-slate-900">Ціни</h1>
      <p className="mt-2 text-sm text-slate-700">Оберіть пакет або зберіть свою програму з додаткових опцій.</p>

      <section className="mt-6">
        <h2 className="text-2xl font-black text-slate-900">Пакети</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pricing.packages.map((pkg) => (
            <article key={pkg.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
              <h3 className="text-xl font-bold text-slate-900">{pkg.name_ua}</h3>
              <p className="mt-1 text-sm text-slate-600">{formatMinutes(pkg.duration_minutes)}</p>
              <p className="mt-3 text-lg font-extrabold text-brand-700">{formatPriceUah(pkg.price_uah_from)}</p>
              {pkg.recommended_for_ua ? <p className="mt-2 text-sm text-slate-700">{pkg.recommended_for_ua}</p> : null}
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {pkg.includes_ua.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-slate-900">Додаткові опції</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {pricing.addons.map((addon) => (
            <article key={addon.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900">{addon.name_ua}</h3>
                <span className="whitespace-nowrap rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-800">
                  {formatPriceUah(addon.price_uah_from)}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{addon.description_ua}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {addon.tags_ua.map((tag) => (
                  <li key={tag} className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs text-brand-800">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <p className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-slate-700">
        Примітка: виїзд, формат локації та кількість дітей можуть впливати на фінальну вартість.
      </p>
    </Container>
  );
}

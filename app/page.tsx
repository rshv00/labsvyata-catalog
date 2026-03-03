import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { ContactCtas } from "@/components/sections/ContactCtas";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { characters } from "@/content/characters";
import { programs } from "@/content/programs";
import { pricing } from "@/content/pricing";
import { site } from "@/content/site";
import { getFeaturedCharacters, getFeaturedPrograms } from "@/lib/catalog";
import { formatMinutes, formatPriceUah } from "@/lib/format";

const featuredCharacters = getFeaturedCharacters(characters, 4);
const featuredPrograms = getFeaturedPrograms(programs, 4);

export default function HomePage() {
  return (
    <>
      <section className="border-b border-brand-100 bg-gradient-to-br from-white via-brand-50 to-brand-100">
        <Container className="py-14 md:py-20">
          <div className="max-w-3xl space-y-6">
            <p className="inline-flex rounded-full bg-white px-4 py-1 text-sm font-semibold text-brand-800 shadow-soft">
              {site.city_ua}
            </p>
            <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">{site.brand_name_ua}</h1>
            <p className="text-base leading-relaxed text-slate-700 md:text-lg">{site.slogan_ua}</p>
            <ContactCtas />
          </div>
        </Container>
      </section>

      <Container className="space-y-14 py-12">
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black text-slate-900">Популярні персонажі</h2>
            <Link href="/characters" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              Усі персонажі
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCharacters.map((item) => (
              <CharacterCard key={item.slug} character={item} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black text-slate-900">Популярні програми</h2>
            <Link href="/programs" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              Усі програми
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPrograms.map((item) => (
              <ProgramCard key={item.slug} program={item} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black text-slate-900">Пакети</h2>
            <Link href="/prices" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              Усі ціни
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pricing.packages.map((pkg) => (
              <article key={pkg.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                <h3 className="text-xl font-bold text-slate-900">{pkg.name_ua}</h3>
                <p className="mt-2 text-sm text-slate-600">{formatMinutes(pkg.duration_minutes)}</p>
                <p className="mt-2 text-lg font-extrabold text-brand-700">{formatPriceUah(pkg.price_uah_from)}</p>
                <p className="mt-2 text-sm text-slate-700">{pkg.recommended_for_ua}</p>
              </article>
            ))}
          </div>
        </section>

        <HowToOrder />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-slate-900">Географія виїзду</h2>
          <p className="mt-2 text-sm text-slate-700">
            Працюємо у {site.city_ua} та сусідніх населених пунктах. Точну вартість виїзду уточнюйте у менеджера.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {site.service_area_ua.map((city) => (
              <li key={city} className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm text-brand-800">
                {city}
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}

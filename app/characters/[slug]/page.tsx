import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Gallery } from "@/components/ui/Gallery";
import { TagChips } from "@/components/ui/TagChips";
import { PriceBadge } from "@/components/ui/PriceBadge";
import { ContactCtas } from "@/components/sections/ContactCtas";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { characters } from "@/content/characters";
import { getRelatedCharactersByTags } from "@/lib/catalog";
import { formatMinutes } from "@/lib/format";
import { resolveCatalogImage, resolveCatalogImages } from "@/lib/instagram";
import { getCanonicalUrl } from "@/lib/seo";

type CharacterPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export function generateMetadata({ params }: CharacterPageProps): Metadata {
  const item = characters.find((character) => character.slug === params.slug);

  if (!item) {
    return {
      title: "Персонажа не знайдено",
    };
  }

  const durationText = item.duration_options_minutes.map((duration) => `${duration} хв`).join(", ");
  const priceText = new Intl.NumberFormat("uk-UA").format(item.base_price_uah_from);
  const description = `${item.short_ua} Вік: ${item.age_range_ua}. Тривалість: ${durationText}. Ціна від ${priceText} грн.`;
  const canonical = getCanonicalUrl(`/characters/${item.slug}`);

  return {
    title: `${item.name_ua} — аніматор у Боярці`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${item.name_ua} — аніматор у Боярці`,
      description,
      url: canonical,
      locale: "uk_UA",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${item.name_ua} — аніматор у Боярці`,
      description,
    },
  };
}

export default function CharacterDetailPage({ params }: CharacterPageProps) {
  const item = characters.find((character) => character.slug === params.slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedCharactersByTags(characters, item, 3);
  const galleryImages = [
    {
      ...item.hero_image,
      src: resolveCatalogImage(item.hero_image.src, `${item.slug}-hero`),
    },
    ...resolveCatalogImages(item.images, item.slug),
  ];

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Головна" },
          { href: "/characters", label: "Персонажі" },
          { label: item.name_ua },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Gallery images={galleryImages} />
        </div>
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h1 className="text-3xl font-black text-slate-900">{item.name_ua}</h1>
          <p className="text-sm leading-relaxed text-slate-700">{item.description_ua}</p>
          <div className="flex flex-wrap items-center gap-3">
            <PriceBadge price={item.base_price_uah_from} />
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{item.age_range_ua}</span>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Варіанти тривалості</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {item.duration_options_minutes.map((duration) => (
                <li key={duration} className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm text-brand-800">
                  {formatMinutes(duration)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Теги</h2>
            <TagChips tags={item.tags_ua} className="mt-2" />
          </div>

          <ContactCtas compact />
        </div>
      </section>

      <div className="mt-8">
        <HowToOrder />
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-black text-slate-900">Схожі персонажі</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((character) => (
              <CharacterCard key={character.slug} character={character} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}

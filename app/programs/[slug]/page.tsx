import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Gallery } from "@/components/ui/Gallery";
import { TagChips } from "@/components/ui/TagChips";
import { PriceBadge } from "@/components/ui/PriceBadge";
import { ContactCtas } from "@/components/sections/ContactCtas";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { programs } from "@/content/programs";
import { getRelatedProgramsByTags } from "@/lib/catalog";
import { formatCurrencyUah, formatMinutes } from "@/lib/format";
import { resolveCatalogImage, resolveCatalogImages } from "@/lib/instagram";
import { getCanonicalUrl } from "@/lib/seo";

type ProgramPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export function generateMetadata({ params }: ProgramPageProps): Metadata {
  const item = programs.find((program) => program.slug === params.slug);

  if (!item) {
    return {
      title: "Програму не знайдено",
    };
  }

  const priceText = new Intl.NumberFormat("uk-UA").format(item.price_uah_from);
  const description = `${item.short_ua} Тривалість: ${item.duration_minutes} хв. Ціна від ${priceText} грн.`;
  const canonical = getCanonicalUrl(`/programs/${item.slug}`);

  return {
    title: `${item.name_ua} — програма для свята у Боярці`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${item.name_ua} — програма для свята у Боярці`,
      description,
      url: canonical,
      locale: "uk_UA",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${item.name_ua} — програма для свята у Боярці`,
      description,
    },
  };
}

export default function ProgramDetailPage({ params }: ProgramPageProps) {
  const item = programs.find((program) => program.slug === params.slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedProgramsByTags(programs, item, 3);
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
          { href: "/programs", label: "Програми" },
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
            {item.pricing_tiers?.length ? (
              <span className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">
                Вартість за тарифами
              </span>
            ) : (
              <PriceBadge price={item.price_uah_from} />
            )}
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{item.recommended_ages_ua}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{formatMinutes(item.duration_minutes)}</span>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Що входить</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {item.included_ua.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          {item.pricing_tiers?.length ? (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Вартість</h2>
              <ul className="mt-2 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {item.pricing_tiers.map((tier) => (
                  <li key={`${tier.label_ua}-${tier.price_uah}`} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{tier.label_ua}</p>
                      {tier.note_ua ? <p className="text-xs text-slate-600">{tier.note_ua}</p> : null}
                    </div>
                    <p className="whitespace-nowrap text-sm font-extrabold text-brand-700">{formatCurrencyUah(tier.price_uah)}</p>
                  </li>
                ))}
              </ul>
              {item.pricing_notes_ua?.length ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-700">
                  {item.pricing_notes_ua.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

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
          <h2 className="text-2xl font-black text-slate-900">Схожі програми</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}

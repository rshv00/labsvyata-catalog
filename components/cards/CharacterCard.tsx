import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/content/types";
import { formatMinutes } from "@/lib/format";
import { resolveCatalogImage } from "@/lib/instagram";
import { PriceBadge } from "@/components/ui/PriceBadge";
import { TagChips } from "@/components/ui/TagChips";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  const minDuration = Math.min(...character.duration_options_minutes);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/characters/${character.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
        <div className="relative aspect-[4/3]">
          <Image
            src={resolveCatalogImage(character.hero_image.src, `${character.slug}-hero`)}
            alt={character.hero_image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
            <h3 className="text-lg font-bold text-slate-900">{character.name_ua}</h3>
            <PriceBadge price={character.base_price_uah_from} />
          </div>
          <p className="text-sm text-slate-700">{character.short_ua}</p>
          <ul className="flex flex-wrap gap-3 text-xs text-slate-600">
            <li>{character.age_range_ua}</li>
            <li>{formatMinutes(minDuration)}+</li>
          </ul>
          <TagChips tags={character.tags_ua.slice(0, 3)} />
        </div>
      </Link>
    </article>
  );
}

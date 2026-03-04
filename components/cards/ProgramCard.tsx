import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/content/types";
import { formatMinutes } from "@/lib/format";
import { resolveCatalogImage } from "@/lib/instagram";
import { TagChips } from "@/components/ui/TagChips";

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/programs/${program.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
        <div className="relative aspect-[4/3]">
          <Image
            src={resolveCatalogImage(program.hero_image.src, `${program.slug}-hero`)}
            alt={program.hero_image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-3 p-4">
          <h3 className="text-lg font-bold text-slate-900">{program.name_ua}</h3>
          <p className="text-sm text-slate-700">{program.short_ua}</p>
          <ul className="flex flex-wrap gap-3 text-xs text-slate-600">
            <li>{program.recommended_ages_ua}</li>
            <li>{formatMinutes(program.duration_minutes)}</li>
          </ul>
          <TagChips tags={program.tags_ua.slice(0, 3)} />
        </div>
      </Link>
    </article>
  );
}

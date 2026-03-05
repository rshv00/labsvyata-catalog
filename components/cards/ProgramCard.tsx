import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/content/types";
import { resolveCatalogImage } from "@/lib/instagram";
import { TagChips } from "@/components/ui/TagChips";

type ProgramCardProps = {
  program: Program;
};

const programHeroObjectPosition: Record<string, string> = {
  "banana-party": "center 24%",
  "veselkovi-pryhody": "center 20%",
  "kazkovyi-svit-barbi-ta-podruzhok": "center 22%",
  "kholodne-sertse": "center 21%",
  "shkola-nevermor": "center 18%",
  "shcheniachyi-patrul": "center 23%",
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
            style={{ objectPosition: programHeroObjectPosition[program.slug] ?? "center center" }}
          />
        </div>
        <div className="space-y-3 p-4">
          <h3 className="text-lg font-bold text-slate-900">{program.name_ua}</h3>
          <p className="text-sm text-slate-700">{program.short_ua}</p>
          <p className="text-xs text-slate-600">{program.recommended_ages_ua}</p>
          <TagChips tags={program.tags_ua.slice(0, 3)} />
        </div>
      </Link>
    </article>
  );
}

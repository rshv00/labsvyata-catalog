"use client";

import { useMemo, useState } from "react";
import type { Program } from "@/content/types";
import { uniqueStrings } from "@/lib/catalog";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { MinimalCatalogFilters } from "@/components/ui/MinimalCatalogFilters";

type ProgramCatalogClientProps = {
  items: Program[];
};

export function ProgramCatalogClient({ items }: ProgramCatalogClientProps) {
  const [search, setSearch] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = useMemo(() => uniqueStrings(items.flatMap((item) => item.tags_ua)), [items]);
  const ages = useMemo(() => uniqueStrings(items.map((item) => item.recommended_ages_ua)), [items]);
  const tagCounts = useMemo(
    () =>
      items.reduce<Record<string, number>>((acc, item) => {
        item.tags_ua.forEach((tag) => {
          acc[tag] = (acc[tag] ?? 0) + 1;
        });
        return acc;
      }, {}),
    [items],
  );
  const ageCounts = useMemo(
    () =>
      items.reduce<Record<string, number>>((acc, item) => {
        acc[item.recommended_ages_ua] = (acc[item.recommended_ages_ua] ?? 0) + 1;
        return acc;
      }, {}),
    [items],
  );

  const filtered = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const result = items.filter((item) => {
      const searchable = [item.name_ua, item.short_ua, item.description_ua, item.tags_ua.join(" ")].join(" ").toLowerCase();
      const matchesSearch = searchValue ? searchable.includes(searchValue) : true;
      const matchesAge = selectedAge ? item.recommended_ages_ua === selectedAge : true;
      const matchesTags = selectedTags.length > 0 ? item.tags_ua.some((tag) => selectedTags.includes(tag)) : true;

      return matchesSearch && matchesAge && matchesTags;
    });

    return result.sort((a, b) => a.name_ua.localeCompare(b.name_ua, "uk"));
  }, [items, search, selectedAge, selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]));
  }

  function resetFilters() {
    setSearch("");
    setSelectedAge("");
    setSelectedTags([]);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
      <MinimalCatalogFilters
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Назва або опис"
        ageOptions={ages}
        ageCounts={ageCounts}
        selectedAge={selectedAge}
        onAgeChange={setSelectedAge}
        tags={tags}
        tagCounts={tagCounts}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onClearTags={() => setSelectedTags([])}
        onReset={resetFilters}
        resultCount={filtered.length}
      />

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-soft">
          Знайдено: <span className="font-semibold text-slate-900">{filtered.length}</span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <ProgramCard key={item.slug} program={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
            Нічого не знайдено. Спробуйте змінити фільтри або запит.
          </div>
        )}
      </div>
    </div>
  );
}

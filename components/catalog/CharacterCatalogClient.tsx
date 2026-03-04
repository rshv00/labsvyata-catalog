"use client";

import { useMemo, useState } from "react";
import type { Character } from "@/content/types";
import { uniqueStrings } from "@/lib/catalog";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { MinimalCatalogFilters } from "@/components/ui/MinimalCatalogFilters";

type CharacterCatalogClientProps = {
  items: Character[];
};

export function CharacterCatalogClient({ items }: CharacterCatalogClientProps) {
  const [search, setSearch] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = useMemo(() => uniqueStrings(items.flatMap((item) => item.tags_ua)), [items]);
  const ages = useMemo(() => uniqueStrings(items.map((item) => item.age_range_ua)), [items]);

  const filtered = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const result = items.filter((item) => {
      const searchable = [item.name_ua, item.short_ua, item.description_ua, item.tags_ua.join(" ")].join(" ").toLowerCase();
      const matchesSearch = searchValue ? searchable.includes(searchValue) : true;
      const matchesAge = selectedAge ? item.age_range_ua === selectedAge : true;
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
    <div className="space-y-5">
      <MinimalCatalogFilters
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Ім’я або опис"
        ageOptions={ages}
        selectedAge={selectedAge}
        onAgeChange={setSelectedAge}
        tags={tags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onClearTags={() => setSelectedTags([])}
        onReset={resetFilters}
        resultCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <CharacterCard key={item.slug} character={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
          Нічого не знайдено. Спробуйте змінити фільтри або запит.
        </div>
      )}
    </div>
  );
}

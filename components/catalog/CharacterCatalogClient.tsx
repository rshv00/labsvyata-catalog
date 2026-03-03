"use client";

import { useMemo, useState } from "react";
import type { Character } from "@/content/types";
import { uniqueNumbers, uniqueStrings } from "@/lib/catalog";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { FilterPanel } from "@/components/ui/FilterPanel";
import { SortSelect, type SortValue } from "@/components/ui/SortSelect";

type CharacterCatalogClientProps = {
  items: Character[];
};

export function CharacterCatalogClient({ items }: CharacterCatalogClientProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortValue>("popular");

  const tags = useMemo(() => uniqueStrings(items.flatMap((item) => item.tags_ua)), [items]);
  const ages = useMemo(() => uniqueStrings(items.map((item) => item.age_range_ua)), [items]);
  const durations = useMemo(() => uniqueNumbers(items.flatMap((item) => item.duration_options_minutes)), [items]);

  const filtered = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    const minValue = minPrice ? Number(minPrice) : null;
    const maxValue = maxPrice ? Number(maxPrice) : null;

    const result = items.filter((item) => {
      const searchable = [item.name_ua, item.short_ua, item.description_ua, item.tags_ua.join(" ")].join(" ").toLowerCase();
      const matchesSearch = searchValue ? searchable.includes(searchValue) : true;
      const matchesTag = selectedTag ? item.tags_ua.includes(selectedTag) : true;
      const matchesAge = selectedAge ? item.age_range_ua === selectedAge : true;
      const durationValue = selectedDuration ? Number(selectedDuration) : null;
      const matchesDuration = durationValue ? item.duration_options_minutes.includes(durationValue) : true;
      const matchesMin = minValue !== null ? item.base_price_uah_from >= minValue : true;
      const matchesMax = maxValue !== null ? item.base_price_uah_from <= maxValue : true;

      return matchesSearch && matchesTag && matchesAge && matchesDuration && matchesMin && matchesMax;
    });

    return result.sort((a, b) => {
      if (sort === "price_asc") return a.base_price_uah_from - b.base_price_uah_from;
      if (sort === "price_desc") return b.base_price_uah_from - a.base_price_uah_from;
      if ((a.is_featured ?? false) !== (b.is_featured ?? false)) {
        return a.is_featured ? -1 : 1;
      }
      return a.name_ua.localeCompare(b.name_ua, "uk");
    });
  }, [items, search, selectedTag, selectedAge, selectedDuration, minPrice, maxPrice, sort]);

  function resetFilters() {
    setSearch("");
    setSelectedTag("");
    setSelectedAge("");
    setSelectedDuration("");
    setMinPrice("");
    setMaxPrice("");
    setSort("popular");
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          tags={tags}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          ageOptions={ages}
          selectedAge={selectedAge}
          onAgeChange={setSelectedAge}
          durationOptions={durations}
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onReset={resetFilters}
        />
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <SortSelect value={sort} onChange={setSort} />
          <p className="mt-3 text-sm text-slate-600">
            Знайдено: <span className="font-semibold text-slate-900">{filtered.length}</span>
          </p>
        </div>
      </div>

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

type MinimalCatalogFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  ageOptions: string[];
  ageCounts: Record<string, number>;
  selectedAge: string;
  onAgeChange: (value: string) => void;
  tags: string[];
  tagCounts: Record<string, number>;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
  onReset: () => void;
  resultCount: number;
};

export function MinimalCatalogFilters({
  search,
  onSearchChange,
  searchPlaceholder,
  ageOptions,
  ageCounts,
  selectedAge,
  onAgeChange,
  tags,
  tagCounts,
  selectedTags,
  onToggleTag,
  onClearTags,
  onReset,
  resultCount,
}: MinimalCatalogFiltersProps) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft lg:sticky lg:top-24">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-900">Фільтри</p>
        <p className="text-xs font-semibold text-slate-600">{resultCount} товарів</p>
      </div>

      <div className="space-y-0">
        <section className="border-b border-slate-200 px-4 py-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Пошук</span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </label>
        </section>

        <section className="border-b border-slate-200 px-4 py-4">
          <p className="mb-2 text-sm font-medium text-slate-700">Вікова група</p>
          <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
            <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-800">
              <span className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="age-filter"
                  checked={selectedAge === ""}
                  onChange={() => onAgeChange("")}
                  className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                Усі
              </span>
              <span className="text-xs text-slate-500">{Object.values(ageCounts).reduce((sum, value) => sum + value, 0)}</span>
            </label>
            {ageOptions.map((age) => (
              <label key={age} className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-800">
                <span className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="age-filter"
                    checked={selectedAge === age}
                    onChange={() => onAgeChange(age)}
                    className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  {age}
                </span>
                <span className="text-xs text-slate-500">{ageCounts[age] ?? 0}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-slate-700">Теги</p>
            <button
              type="button"
              onClick={onClearTags}
              className="text-xs font-semibold text-brand-700 transition hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Усі
            </button>
          </div>
          <div className="max-h-52 space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <label key={tag} className="flex cursor-pointer items-start justify-between gap-3 text-sm text-slate-800">
                  <span className="inline-flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => onToggleTag(tag)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span>{tag}</span>
                  </span>
                  <span className="text-xs text-slate-500">{tagCounts[tag] ?? 0}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-slate-500">Тегів поки немає.</p>
            )}
          </div>
        </section>
      </div>

      <div className="border-t border-slate-200 px-4 py-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-xl border border-brand-300 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Скинути фільтри
        </button>
      </div>
    </aside>
  );
}

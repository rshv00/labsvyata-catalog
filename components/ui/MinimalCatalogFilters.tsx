import { SearchInput } from "./SearchInput";

type MinimalCatalogFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  ageOptions: string[];
  selectedAge: string;
  onAgeChange: (value: string) => void;
  tags: string[];
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
  selectedAge,
  onAgeChange,
  tags,
  selectedTags,
  onToggleTag,
  onClearTags,
  onReset,
  resultCount,
}: MinimalCatalogFiltersProps) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_minmax(0,1.5fr)]">
        <SearchInput value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Вікова група</span>
          <select
            value={selectedAge}
            onChange={(event) => onAgeChange(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            <option value="">Будь-яка</option>
            {ageOptions.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="block">
          <legend className="mb-1 block text-sm font-medium text-slate-700">Теги</legend>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onClearTags}
              className="rounded-lg border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Усі
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Скинути
            </button>
          </div>
          <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
            {tags.length > 0 ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {tags.map((tag) => (
                  <li key={tag}>
                    <label className="inline-flex cursor-pointer items-start gap-2 text-sm text-slate-800">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => onToggleTag(tag)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span>{tag}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">Тегів поки немає.</p>
            )}
          </div>
        </fieldset>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Знайдено: <span className="font-semibold text-slate-900">{resultCount}</span>
        </p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-brand-300 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Скинути фільтри
        </button>
      </div>
    </aside>
  );
}

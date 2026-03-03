import { SearchInput } from "./SearchInput";

type FilterPanelProps = {
  search: string;
  onSearchChange: (value: string) => void;
  tags: string[];
  selectedTag: string;
  onTagChange: (value: string) => void;
  ageOptions: string[];
  selectedAge: string;
  onAgeChange: (value: string) => void;
  durationOptions: number[];
  selectedDuration: string;
  onDurationChange: (value: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReset: () => void;
};

export function FilterPanel({
  search,
  onSearchChange,
  tags,
  selectedTag,
  onTagChange,
  ageOptions,
  selectedAge,
  onAgeChange,
  durationOptions,
  selectedDuration,
  onDurationChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: FilterPanelProps) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <SearchInput value={search} onChange={onSearchChange} placeholder="Ім'я, опис або тег" />

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Тема / тег</span>
          <select
            value={selectedTag}
            onChange={(event) => onTagChange(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            <option value="">Усі теги</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

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

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Тривалість</span>
          <select
            value={selectedDuration}
            onChange={(event) => onDurationChange(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            <option value="">Будь-яка</option>
            {durationOptions.map((duration) => (
              <option key={duration} value={String(duration)}>
                {duration} хв
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Ціна від</span>
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(event) => onMinPriceChange(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              placeholder="0"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Ціна до</span>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(event) => onMaxPriceChange(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              placeholder="10000"
            />
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-xl border border-brand-300 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        Скинути фільтри
      </button>
    </aside>
  );
}

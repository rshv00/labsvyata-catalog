export type SortValue = "popular" | "price_asc" | "price_desc";

type SortSelectProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">Сортування</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortValue)}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      >
        <option value="popular">За популярністю</option>
        <option value="price_asc">За ціною ↑</option>
        <option value="price_desc">За ціною ↓</option>
      </select>
    </label>
  );
}

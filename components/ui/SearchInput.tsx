type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = "Пошук" }: SearchInputProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">Пошук</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
    </label>
  );
}

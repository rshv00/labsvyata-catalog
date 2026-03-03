type TagChipsProps = {
  tags: string[];
  className?: string;
};

export function TagChips({ tags, className = "" }: TagChipsProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Теги">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

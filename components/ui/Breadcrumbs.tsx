import Link from "next/link";

type Crumb = {
  href?: string;
  label: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-slate-900">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? <span aria-hidden>•</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

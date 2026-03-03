import { formatPriceUah } from "@/lib/format";

type PriceBadgeProps = {
  price: number;
  className?: string;
};

export function PriceBadge({ price, className = "" }: PriceBadgeProps) {
  return (
    <span className={`inline-flex rounded-full bg-brand-600 px-3 py-1 text-sm font-semibold text-white ${className}`}>
      {formatPriceUah(price)}
    </span>
  );
}

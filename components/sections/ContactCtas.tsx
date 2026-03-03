import { site } from "@/content/site";
import { formatPhoneHref } from "@/lib/format";

type ContactCtasProps = {
  compact?: boolean;
};

export function ContactCtas({ compact = false }: ContactCtasProps) {
  const rootClasses = compact ? "flex flex-wrap gap-2" : "flex flex-wrap gap-3";
  const buttonClasses = compact
    ? "rounded-xl px-3 py-2 text-sm font-semibold"
    : "rounded-xl px-4 py-2.5 text-sm font-semibold";

  return (
    <div className={rootClasses}>
      <a
        href={site.telegram_url}
        target="_blank"
        rel="noreferrer"
        className={`${buttonClasses} bg-brand-600 text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
      >
        Написати в Telegram
      </a>
      <a
        href={site.instagram_url}
        target="_blank"
        rel="noreferrer"
        className={`${buttonClasses} border border-brand-300 bg-white text-brand-800 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
      >
        Instagram
      </a>
      <a
        href={formatPhoneHref(site.phones[0])}
        className={`${buttonClasses} border border-brand-300 bg-white text-brand-800 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
      >
        Подзвонити
      </a>
    </div>
  );
}

import { site } from "@/content/site";
import { formatPhoneHref } from "@/lib/format";

export function MobileQuickActions() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 px-4 md:hidden">
      <div className="pointer-events-auto mx-auto grid max-w-content grid-cols-3 overflow-hidden rounded-2xl border border-brand-200 bg-white/95 p-1 shadow-soft backdrop-blur">
        <a
          href={site.telegram_url}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-brand-800 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Telegram
        </a>
        <a
          href={site.instagram_url}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-brand-800 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Instagram
        </a>
        <a
          href={formatPhoneHref(site.phones[0])}
          className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-brand-800 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Дзвінок
        </a>
      </div>
    </div>
  );
}


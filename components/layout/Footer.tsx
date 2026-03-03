import { site } from "@/content/site";
import { formatPhoneHref } from "@/lib/format";
import { Container } from "./Container";

export function Footer() {
  const mainPhone = site.phones[0];

  return (
    <footer className="mt-16 border-t border-brand-100 bg-brand-50">
      <Container className="grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-black text-brand-900">{site.brand_name_ua}</h2>
          <p className="mt-2 text-sm text-slate-700">{site.city_ua}</p>
          <p className="mt-2 text-sm text-slate-700">{site.working_hours_ua}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-800">Контакти</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  className="hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  href={formatPhoneHref(phone)}
                >
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                className="hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                href={site.telegram_url}
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                className="hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                href={site.instagram_url}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-800">Швидкий зв’язок</h3>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={site.telegram_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Написати в Telegram
            </a>
            <a
              href={site.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-brand-300 bg-white px-4 py-2 text-center text-sm font-semibold text-brand-800 transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Instagram
            </a>
            <a
              href={formatPhoneHref(mainPhone)}
              className="rounded-xl border border-brand-300 bg-white px-4 py-2 text-center text-sm font-semibold text-brand-800 transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Подзвонити
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

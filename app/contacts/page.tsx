import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactCtas } from "@/components/sections/ContactCtas";
import { site } from "@/content/site";
import { formatPhoneHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Контакти",
  description: `Контакти ${site.brand_name_ua}: телефони, Telegram, Instagram, графік роботи.`,
  openGraph: {
    title: `Контакти | ${site.brand_name_ua}`,
    description: "Швидкі способи зв’язку для узгодження дитячого свята.",
    locale: "uk_UA",
    type: "website",
  },
};

export default function ContactsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Головна" }, { label: "Контакти" }]} />
      <h1 className="text-3xl font-black text-slate-900">Контакти</h1>
      <p className="mt-2 text-sm text-slate-700">Зручно зв’язатися через Telegram, Instagram або телефоном.</p>
      <div className="mt-4">
        <ContactCtas />
      </div>

      <section className="mt-6">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-900">Телефони</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a href={formatPhoneHref(phone)} className="font-medium text-brand-700 hover:text-brand-800">
                  {phone}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-600">Telegram, Viber та Instagram доступні у кнопках вище.</p>
        </article>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-soft">
        <p className="font-semibold text-slate-900">Адреса</p>
        <div className="mt-2 space-y-1">
          {site.address_lines_ua?.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="mt-2">
          <strong>Години роботи:</strong> {site.working_hours_ua}
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-bold text-slate-900">Локація на карті</h2>
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
          <iframe
            title="Лабораторія свята на OpenStreetMap"
            src={site.map_embed_url}
            className="h-72 w-full"
            loading="lazy"
          />
        </div>
        <a
          href={site.map_url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Відкрити на OpenStreetMap
        </a>
      </section>

    </Container>
  );
}

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

      <section className="mt-6 grid gap-4 md:grid-cols-2">
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
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-900">Соцмережі</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <a href={site.telegram_url} target="_blank" rel="noreferrer" className="font-medium text-brand-700 hover:text-brand-800">
                Telegram
              </a>
            </li>
            <li>
              <a href={site.instagram_url} target="_blank" rel="noreferrer" className="font-medium text-brand-700 hover:text-brand-800">
                Instagram
              </a>
            </li>
          </ul>
        </article>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-soft">
        <p>
          <strong>Адреса:</strong> {site.address_text_ua ?? "Уточнюється"}
        </p>
        <p className="mt-2">
          <strong>Години роботи:</strong> {site.working_hours_ua}
        </p>
      </section>

      <div className="mt-6">
        <ContactCtas />
      </div>
    </Container>
  );
}

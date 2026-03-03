import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactCtas } from "@/components/sections/ContactCtas";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Про нас",
  description: `Про команду ${site.brand_name_ua}: досвід, підхід і формат роботи.`,
  openGraph: {
    title: `Про нас | ${site.brand_name_ua}`,
    description: "Дізнайтеся більше про команду та підхід до дитячих свят.",
    locale: "uk_UA",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Головна" }, { label: "Про нас" }]} />
      <h1 className="text-3xl font-black text-slate-900">Про нас</h1>
      <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-soft">
        <p>
          <strong>{site.brand_name_ua}</strong> - команда аніматорів та ведучих дитячих подій у Боярці та поруч. Ми створюємо
          програми, які адаптуються під вік дітей, формат локації та ваші побажання.
        </p>
        <p>
          Наш підхід: безпека, активне залучення кожної дитини, чіткий таймінг і живий контакт з батьками на кожному етапі
          підготовки.
        </p>
        <p>
          У каталозі зібрані популярні персонажі, шоу та пакети. Ви можете обрати готовий варіант або комбінувати програму з
          додатковими опціями.
        </p>
      </div>
      <div className="mt-6">
        <ContactCtas />
      </div>
    </Container>
  );
}

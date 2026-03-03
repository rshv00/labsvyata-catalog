type HowToOrderProps = {
  title?: string;
};

export function HowToOrder({ title = "Як замовити" }: HowToOrderProps) {
  return (
    <section className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
      <h2 className="text-xl font-bold text-brand-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-700">
        Напишіть менеджеру в Telegram або Instagram і вкажіть коротко параметри свята.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
        <li>Дата і бажаний час початку.</li>
        <li>Вік дитини та кількість гостей.</li>
        <li>Адреса або локація проведення.</li>
        <li>Обраний персонаж чи програма.</li>
        <li>Побажання: тривалість, додаткові опції, тематика.</li>
      </ul>
    </section>
  );
}

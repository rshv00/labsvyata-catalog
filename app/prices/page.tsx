import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pricing } from "@/content/pricing";
import type { Package, PackageGroup } from "@/content/types";
import { formatCurrencyUah } from "@/lib/format";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ціни на дитячі свята в Боярці",
  description:
    "Актуальні ціни на дитячі свята в Боярці: пакети в приміщенні, на виїзд та окремі програми для садочків і молодших шкіл.",
  alternates: {
    canonical: getCanonicalUrl("/prices"),
  },
  openGraph: {
    title: "Ціни на дитячі свята в Боярці",
    description: "Порівняйте пакети: свято в приміщенні, свято на виїзд і окремі програми для садочків та молодших шкіл.",
    url: getCanonicalUrl("/prices"),
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ціни на дитячі свята в Боярці",
    description: "Пакети в приміщенні, на виїзд та для садочків/молодших шкіл, додаткові опції і прозорі умови розрахунку.",
  },
};

const DURATIONS = [120, 180] as const;
const TIERS = ["Стандарт", "Максимум"] as const;

type DurationKey = (typeof DURATIONS)[number];
type TierKey = (typeof TIERS)[number];
type DurationTierMatrix = Record<DurationKey, Record<TierKey, Package | null>>;

function getTierFromPackage(packageItem: Package): TierKey | null {
  const normalized = packageItem.name_ua.toLowerCase();

  if (normalized.includes("стандарт")) {
    return "Стандарт";
  }

  if (normalized.includes("максимум")) {
    return "Максимум";
  }

  return null;
}

function groupByLocationAndDuration(packages: Package[]): DurationTierMatrix {
  const matrix: DurationTierMatrix = {
    120: {
      "Стандарт": null,
      "Максимум": null,
    },
    180: {
      "Стандарт": null,
      "Максимум": null,
    },
  };

  for (const packageItem of packages) {
    const duration = DURATIONS.find((value) => value === packageItem.duration_minutes);
    const tier = getTierFromPackage(packageItem);

    if (!duration || !tier) {
      continue;
    }

    matrix[duration][tier] = packageItem;
  }

  return matrix;
}

function getDurationLabel(minutes: DurationKey): string {
  return minutes === 120 ? "2 години" : "3 години";
}

function getSharedTimingByDuration(minutes: DurationKey): string {
  return minutes === 120 ? "1,5 години активних ігор + 30 хв перекус" : "2,5 години активних ігор + 30 хв перекус";
}

function isMatrixGroup(packages: Package[]): boolean {
  if (packages.length === 0) {
    return false;
  }

  return packages.every((packageItem) => {
    const duration = DURATIONS.find((value) => value === packageItem.duration_minutes);
    const tier = getTierFromPackage(packageItem);

    return Boolean(duration && tier);
  });
}

function getSharedIncludes(packages: Package[]): string[] | null {
  if (packages.length === 0) {
    return null;
  }

  const base = packages[0].includes_ua.join("||");
  const areAllEqual = packages.every((packageItem) => packageItem.includes_ua.join("||") === base);

  return areAllEqual ? packages[0].includes_ua : null;
}

function getSharedDuration(packages: Package[]): number | null {
  if (packages.length === 0) {
    return null;
  }

  const baseDuration = packages[0].duration_minutes;
  const areAllEqual = packages.every((packageItem) => packageItem.duration_minutes === baseDuration);

  return areAllEqual ? baseDuration : null;
}

function getHoursLabel(minutes: number): string {
  if (minutes % 60 !== 0) {
    return `${minutes} хв`;
  }

  const hours = minutes / 60;
  const lastDigit = hours % 10;
  const lastTwoDigits = hours % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `${hours} година`;
  }

  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return `${hours} години`;
  }

  return `${hours} годин`;
}

const packageGroups: PackageGroup[] =
  pricing.package_groups && pricing.package_groups.length > 0
    ? pricing.package_groups
    : [
        {
          slug: "all-packages",
          category_ua: "Пакети",
          rule_ua: "Уточнюйте умови у менеджера.",
          packages: pricing.packages,
        },
      ];

const groupPriority: Record<string, number> = {
  "Свято в нашому приміщенні": 0,
  "Свято на виїзд": 1,
  "Програми для садочків і молодших шкіл": 2,
};

const orderedPackageGroups = [...packageGroups].sort((first, second) => {
  const firstPriority = groupPriority[first.category_ua] ?? 99;
  const secondPriority = groupPriority[second.category_ua] ?? 99;

  return firstPriority - secondPriority;
});

export default function PricesPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Головна" }, { label: "Ціни" }]} />
      <h1 className="text-3xl font-black text-slate-900">Ціни</h1>
      <p className="mt-2 text-sm text-slate-700">Оберіть формат свята, тривалість та пакет.</p>
      <p className="mt-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm leading-relaxed text-slate-700">
        Фінальна вартість формується за форматом події, тривалістю та кількістю дітей у групі. Для кожного блоку діють свої
        правила за кількістю учасників і тривалістю програми. Для формату на виїзд трансфер за межі м. Боярка рахується окремо.
        Перед бронюванням узгодьте локацію, дату та наповнення пакета з менеджером.
      </p>

      <section className="mt-6 space-y-6">
        {orderedPackageGroups.map((group) => {
          const matrixGroup = isMatrixGroup(group.packages);
          const matrix = matrixGroup ? groupByLocationAndDuration(group.packages) : null;
          const sharedIncludes = matrixGroup ? null : getSharedIncludes(group.packages);
          const sharedDuration = matrixGroup ? null : getSharedDuration(group.packages);

          return (
            <article key={group.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft md:p-6">
              <h2 className="text-2xl font-black text-slate-900">{group.category_ua}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-800">{group.rule_ua}</p>
              {group.notes_ua?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {group.notes_ua.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}

              {matrixGroup && matrix ? (
                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  {DURATIONS.map((duration) => (
                    <section key={duration} className="rounded-2xl border border-brand-100 bg-brand-50/40 p-4">
                      <h3 className="text-xl font-black text-brand-900">{getDurationLabel(duration)}</h3>
                      <p className="mt-1 text-sm text-slate-600">{getSharedTimingByDuration(duration)}</p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {TIERS.map((tier) => {
                          const packageItem = matrix[duration][tier];

                          return (
                            <article key={`${duration}-${tier}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                              <h4 className="text-lg font-black text-slate-900">{tier}</h4>
                              {packageItem ? (
                                <>
                                  <p className="mt-2 text-2xl font-extrabold text-brand-700">{formatCurrencyUah(packageItem.price_uah_from)}</p>
                                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                                    {packageItem.includes_ua.map((line) => (
                                      <li key={line}>{line}</li>
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                <p className="mt-3 text-sm font-medium text-slate-600">Немає пакета</p>
                              )}
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <>
                  {sharedDuration ? <p className="mt-4 text-sm text-slate-700">Тривалість програми: {getHoursLabel(sharedDuration)}</p> : null}
                  {sharedIncludes?.length ? (
                    <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/40 p-4">
                      <h3 className="text-lg font-black text-brand-900">Що входить у програму</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {sharedIncludes.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.packages.map((packageItem) => (
                      <article key={packageItem.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                        <h3 className="text-lg font-black text-slate-900">{packageItem.name_ua}</h3>
                        <p className="mt-2 text-2xl font-extrabold text-brand-700">{formatCurrencyUah(packageItem.price_uah_from)}</p>
                        {!sharedIncludes?.length ? (
                          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                            {packageItem.includes_ua.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </>
              )}
            </article>
          );
        })}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-slate-900">Чи потрібні додаткові послуги?</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {pricing.addons.map((addon) => (
            <article key={addon.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">{addon.name_ua}</h3>
                {addon.slug === "guest-gifts" || addon.name_ua === "Подарунки гостям" ? (
                  <p className="text-sm italic font-semibold text-brand-800">50 грн за 1 людину</p>
                ) : (
                  <p className="text-sm font-semibold text-brand-800">{addon.price_uah_from} грн</p>
                )}
              </div>
              <p className="mt-2 text-sm text-slate-700">{addon.description_ua}</p>
              {addon.notes_ua?.length ? (
                <ul className="mt-2 space-y-1">
                  {addon.notes_ua.map((note) => (
                    <li key={note} className="text-sm italic text-slate-600">
                      {note}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <p className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-slate-700">
        Примітка: виїзд, формат локації та кількість дітей можуть впливати на фінальну вартість.
      </p>
    </Container>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pricing } from "@/content/pricing";
import type { Package, PackageGroup } from "@/content/types";
import { site } from "@/content/site";
import { formatCurrencyUah, formatMinutes, formatPriceUah } from "@/lib/format";

export const metadata: Metadata = {
  title: "Ціни",
  description: `Пакети та додаткові опції ${site.brand_name_ua} у ${site.city_ua}.`,
  openGraph: {
    title: `Ціни | ${site.brand_name_ua}`,
    description: "Актуальні пакети та додаткові опції для дитячих свят.",
    locale: "uk_UA",
    type: "website",
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

      <section className="mt-6 space-y-6">
        {orderedPackageGroups.map((group) => {
          const matrix = groupByLocationAndDuration(group.packages);

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

              <div className="mt-5 grid gap-6 lg:grid-cols-2">
                {DURATIONS.map((duration) => (
                  <section key={duration} className="rounded-2xl border border-brand-100 bg-brand-50/40 p-4">
                    <h3 className="text-xl font-black text-brand-900">{getDurationLabel(duration)}</h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {TIERS.map((tier) => {
                        const packageItem = matrix[duration][tier];

                        return (
                          <article key={`${duration}-${tier}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                            <h4 className="text-lg font-black text-slate-900">{tier}</h4>
                            {packageItem ? (
                              <>
                                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                                  {formatMinutes(packageItem.duration_minutes)}
                                </p>
                                <p className="mt-2 text-2xl font-extrabold text-brand-700">{formatCurrencyUah(packageItem.price_uah_from)}</p>
                                {packageItem.timing_ua ? <p className="mt-2 text-sm text-slate-700">{packageItem.timing_ua}</p> : null}
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
            </article>
          );
        })}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-slate-900">Додаткові опції</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {pricing.addons.map((addon) => (
            <article key={addon.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900">{addon.name_ua}</h3>
                <span className="whitespace-nowrap rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-800">
                  {formatPriceUah(addon.price_uah_from)}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{addon.description_ua}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {addon.tags_ua.map((tag) => (
                  <li key={tag} className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs text-brand-800">
                    {tag}
                  </li>
                ))}
              </ul>
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

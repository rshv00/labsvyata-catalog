import type { Character } from "./types";

export const characters: Character[] = [
  {
    slug: "posipaky",
    name_ua: "Посіпаки",
    short_ua: "Яскрава парна анімація з гумором, рухливими іграми та веселими челенджами.",
    description_ua:
      "Посіпаки у парі створюють максимально драйвову атмосферу: інтерактивні конкурси, музичні активності, естафети та багато сміху для дітей різного віку.",
    age_range_ua: "4-10 років",
    duration_options_minutes: [60, 90, 120],
    base_price_uah_from: 2500,
    tags_ua: ["пара персонажів", "мультгерої", "активні ігри", "весела вечірка"],
    hero_image: { src: "/images/characters/posipaky/hero.jpg", alt: "Посіпаки" },
    images: [{ src: "/images/characters/posipaky/hero.jpg", alt: "Посіпаки на святі" }],
    is_featured: true,
  },
  {
    slug: "anna-ta-elza",
    name_ua: "Анна та Ельза",
    short_ua: "Казковий дует принцес для ніжного й чарівного дитячого свята.",
    description_ua:
      "Анна та Ельза проводять програму у форматі казкової пригоди: танцювальні паузи, тематичні ігри та святкові активності з атмосферою королівства.",
    age_range_ua: "3-9 років",
    duration_options_minutes: [60, 90, 120],
    base_price_uah_from: 2600,
    tags_ua: ["принцеси", "казкова програма", "пара персонажів", "Frozen"],
    hero_image: { src: "/images/characters/anna-ta-elza/hero.jpg", alt: "Анна та Ельза" },
    images: [{ src: "/images/characters/anna-ta-elza/hero.jpg", alt: "Анна та Ельза на святі" }],
    is_featured: true,
  },
  {
    slug: "yedynorizhka-ta-veselka",
    name_ua: "Єдиноріжка та Веселка",
    short_ua: "Кольорова святкова пара з фантазійними іграми, танцями та яскравими емоціями.",
    description_ua:
      "Єдиноріжка та Веселка дарують wow-настрій: креативні завдання, командні активності, музичні конкурси та багато святкового кольору.",
    age_range_ua: "4-10 років",
    duration_options_minutes: [60, 90, 120],
    base_price_uah_from: 2500,
    tags_ua: ["єдиноріжка", "веселка", "яскрава вечірка", "пара персонажів"],
    hero_image: { src: "/images/characters/yedynorizhka-ta-veselka/hero.jpg", alt: "Єдиноріжка та Веселка" },
    images: [
      {
        src: "/images/characters/yedynorizhka-ta-veselka/hero.jpg",
        alt: "Єдиноріжка та Веселка на святі",
      },
    ],
    is_featured: true,
  },
  {
    slug: "skai-ta-honshchyk",
    name_ua: "Скай та Гонщик",
    short_ua: "Рятувальна парна анімація з командними місіями та тематичними іграми.",
    description_ua:
      "Скай та Гонщик проводять активну програму у стилі рятувальної команди: естафети, інтерактивні завдання та веселі місії для дітей.",
    age_range_ua: "3-8 років",
    duration_options_minutes: [60, 90, 120],
    base_price_uah_from: 2500,
    tags_ua: ["щенячий патруль", "рятувальна місія", "мультгерої", "пара персонажів"],
    hero_image: { src: "/images/characters/skai-ta-honshchyk/hero.jpg", alt: "Скай та Гонщик" },
    images: [{ src: "/images/characters/skai-ta-honshchyk/hero.jpg", alt: "Скай та Гонщик на святі" }],
    is_featured: true,
  },
  {
    slug: "rumi-ta-mira",
    name_ua: "Румі та Міра",
    short_ua: "Стильний дует для старших дітей: музика, танці, конкурси та сучасний вайб.",
    description_ua:
      "Румі та Міра ведуть трендову програму для тінейджерів: батли, творчі завдання, музичні активності та командні челенджі.",
    age_range_ua: "8-14 років",
    duration_options_minutes: [60, 90, 120],
    base_price_uah_from: 2700,
    tags_ua: ["k-pop", "тінейджери", "танцювальна програма", "пара персонажів"],
    hero_image: { src: "/images/characters/rumi-ta-mira/hero.jpg", alt: "Румі та Міра" },
    images: [{ src: "/images/characters/rumi-ta-mira/hero.jpg", alt: "Румі та Міра на святі" }],
    is_featured: true,
  },
];

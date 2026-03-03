import type { Program } from "./types";

const placeholder = "/images/placeholder.jpg";

export const programs: Program[] = [
  {
    slug: "pirate-quest",
    name_ua: "Піратський квест",
    short_ua: "Пошук скарбів, карта пригод і командна гра.",
    description_ua:
      "Діти об'єднуються у команди, проходять випробування за картою та знаходять скарб. Програма підходить для приміщення й вулиці.",
    recommended_ages_ua: "6-11 років",
    duration_minutes: 90,
    price_uah_from: 3200,
    tags_ua: ["квест", "командна гра", "пригоди"],
    included_ua: [
      "Сценарій і реквізит",
      "1-2 ведучих",
      "Командні випробування",
      "Музичний супровід"
    ],
    hero_image: { src: placeholder, alt: "Піратський квест" },
    images: [
      { src: placeholder, alt: "Карта скарбів" },
      { src: placeholder, alt: "Піратські випробування" },
      { src: placeholder, alt: "Фінал квесту" },
    ],
    is_featured: true,
  },
  {
    slug: "bubble-show",
    name_ua: "Шоу мильних бульбашок",
    short_ua: "Велетенські бульбашки, трюки та інтерактив із дітьми.",
    description_ua:
      "Яскраве бульбашкове шоу з різними формами, димними бульбашками та участю гостей у номері.",
    recommended_ages_ua: "3-12 років",
    duration_minutes: 45,
    price_uah_from: 2800,
    tags_ua: ["шоу", "інтерактив", "малюки"],
    included_ua: [
      "Професійний реквізит",
      "Інтерактив з дітьми",
      "Фото-момент у велетенській бульбашці"
    ],
    hero_image: { src: placeholder, alt: "Шоу мильних бульбашок" },
    images: [
      { src: placeholder, alt: "Велика бульбашка" },
      { src: placeholder, alt: "Бульбашки на святі" },
      { src: placeholder, alt: "Інтерактив з дітьми" },
    ],
    is_featured: true,
  },
  {
    slug: "science-show",
    name_ua: "Наукове шоу",
    short_ua: "Ефектні безпечні експерименти та wow-емоції.",
    description_ua:
      "Наукова програма з сухим льодом, полімерами та інтерактивними дослідами, адаптованими під вік дітей.",
    recommended_ages_ua: "6-13 років",
    duration_minutes: 60,
    price_uah_from: 3500,
    tags_ua: ["наука", "шоу", "освітнє"],
    included_ua: [
      "Ведучий-експериментатор",
      "Набір безпечних дослідів",
      "Участь дітей у дослідах",
      "Пам'ятне фото"
    ],
    hero_image: { src: placeholder, alt: "Наукове шоу" },
    images: [
      { src: placeholder, alt: "Наукові експерименти" },
      { src: placeholder, alt: "Сухий лід" },
      { src: placeholder, alt: "Діти на науковому шоу" },
    ],
    is_featured: true,
  },
  {
    slug: "face-painting-zone",
    name_ua: "Аквагрим-зона",
    short_ua: "Художній аквагрим з індивідуальними ескізами для гостей.",
    description_ua:
      "Професійний аквагример створює образи за побажанням дітей. Добре поєднується з будь-якою програмою.",
    recommended_ages_ua: "3-12 років",
    duration_minutes: 60,
    price_uah_from: 1900,
    tags_ua: ["творчість", "додаткова опція", "малюки"],
    included_ua: [
      "Гіпоалергенні фарби",
      "Індивідуальні малюнки",
      "До 20 дітей за 60 хв"
    ],
    hero_image: { src: placeholder, alt: "Аквагрим" },
    images: [
      { src: placeholder, alt: "Аквагрим для дітей" },
      { src: placeholder, alt: "Зона аквагриму" },
      { src: placeholder, alt: "Тематичні образи" },
    ],
  },
  {
    slug: "slime-workshop",
    name_ua: "Майстер-клас зі слаймів",
    short_ua: "Кожна дитина створює власний слайм і забирає з собою.",
    description_ua:
      "Творчий майстер-клас: кольори, декор, текстури. Формат ідеально підходить для класних свят і домашніх вечірок.",
    recommended_ages_ua: "6-12 років",
    duration_minutes: 75,
    price_uah_from: 3300,
    tags_ua: ["майстер-клас", "творчість", "спокійний формат"],
    included_ua: [
      "Матеріали для всіх учасників",
      "Ведучий",
      "Контейнери для слаймів",
      "Пакування готових робіт"
    ],
    hero_image: { src: placeholder, alt: "Майстер-клас зі слаймів" },
    images: [
      { src: placeholder, alt: "Створення слаймів" },
      { src: placeholder, alt: "Матеріали для майстер-класу" },
      { src: placeholder, alt: "Готові слайми" },
    ],
  },
  {
    slug: "kids-disco",
    name_ua: "Дитяча дискотека",
    short_ua: "Музичний сет, танцювальні батли та світлові ефекти.",
    description_ua:
      "Ведучий-DJ проводить драйвову програму з іграми, батлами та сучасною дитячою музикою.",
    recommended_ages_ua: "7-14 років",
    duration_minutes: 90,
    price_uah_from: 3600,
    tags_ua: ["диско", "тінейджери", "танці"],
    included_ua: [
      "DJ-супровід",
      "Танцювальні конкурси",
      "Сценарні інтерактиви",
      "Базове світло"
    ],
    hero_image: { src: placeholder, alt: "Дитяча дискотека" },
    images: [
      { src: placeholder, alt: "Танцювальний батл" },
      { src: placeholder, alt: "DJ на святі" },
      { src: placeholder, alt: "Дискотека для дітей" },
    ],
    is_featured: true,
  },
  {
    slug: "pinata-party",
    name_ua: "Піньята-паті",
    short_ua: "Святкова програма з тематичною піньятою та конкурсами.",
    description_ua:
      "Ведучий поєднує активні ігри, музичні паузи та кульмінацію з піньятою, наповненою солодощами чи сюрпризами.",
    recommended_ages_ua: "4-10 років",
    duration_minutes: 60,
    price_uah_from: 2900,
    tags_ua: ["піньята", "активні ігри", "святковий фінал"],
    included_ua: [
      "Ведучий",
      "Піньята (базова)",
      "Конкурси до фіналу",
      "Музичний супровід"
    ],
    hero_image: { src: placeholder, alt: "Піньята-паті" },
    images: [
      { src: placeholder, alt: "Піньята на святі" },
      { src: placeholder, alt: "Конкурси перед піньятою" },
      { src: placeholder, alt: "Радість дітей" },
    ],
  },
  {
    slug: "neon-party",
    name_ua: "Неонова вечірка",
    short_ua: "Флуоресцентні елементи, glow-атмосфера та музичний драйв.",
    description_ua:
      "Стильна вечірка для старших дітей: UV-акценти, неонові ігри, танцювальна програма та яскраві фото.",
    recommended_ages_ua: "9-15 років",
    duration_minutes: 90,
    price_uah_from: 4100,
    tags_ua: ["неон", "тінейджери", "диско"],
    included_ua: [
      "Ведучий",
      "Неоновий реквізит",
      "Тематичні інтерактиви",
      "Фото-паузи"
    ],
    hero_image: { src: placeholder, alt: "Неонова вечірка" },
    images: [
      { src: placeholder, alt: "Glow атмосфера" },
      { src: placeholder, alt: "Неонові конкурси" },
      { src: placeholder, alt: "Неонова дискотека" },
    ],
  },
];

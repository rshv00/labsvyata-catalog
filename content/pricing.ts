import type { Pricing } from "./types";

export const pricing: Pricing = {
  packages: [
    {
      slug: "start-60",
      name_ua: "Старт",
      duration_minutes: 60,
      includes_ua: [
        "1 аніматор",
        "Тематичний сценарій",
        "Музичний супровід",
        "Базовий реквізит"
      ],
      price_uah_from: 2200,
      recommended_for_ua: "Невелике свято до 10 дітей",
    },
    {
      slug: "classic-90",
      name_ua: "Класик",
      duration_minutes: 90,
      includes_ua: [
        "1-2 аніматори",
        "Розширений сценарій",
        "Активні ігри + конкурсний блок",
        "Міні-дискотека"
      ],
      price_uah_from: 3400,
      recommended_for_ua: "День народження 10-15 дітей",
    },
    {
      slug: "party-120",
      name_ua: "Свято+",
      duration_minutes: 120,
      includes_ua: [
        "2 аніматори",
        "Тематичний квест",
        "Міні-шоу або майстер-клас",
        "Танцювальна програма"
      ],
      price_uah_from: 4900,
      recommended_for_ua: "Активне свято 15-20 дітей",
    },
    {
      slug: "premium-150",
      name_ua: "Преміум",
      duration_minutes: 150,
      includes_ua: [
        "2-3 аніматори",
        "Повний сценарій з вау-фіналом",
        "Шоу + майстер-клас",
        "Координація таймінгу події"
      ],
      price_uah_from: 6900,
      recommended_for_ua: "Велике свято або виїзний івент",
    },
  ],
  addons: [
    {
      slug: "face-painting",
      name_ua: "Аквагрим",
      description_ua: "Індивідуальні малюнки для гостей.",
      price_uah_from: 1500,
      tags_ua: ["творчість", "популярне"],
    },
    {
      slug: "twisting-balloons",
      name_ua: "Фігурки з кульок",
      description_ua: "Твістинг: мечі, квіти, тваринки.",
      price_uah_from: 1200,
      tags_ua: ["кульки", "швидка опція"],
    },
    {
      slug: "pinata",
      name_ua: "Піньята",
      description_ua: "Тематична піньята з базовим наповненням.",
      price_uah_from: 1400,
      tags_ua: ["фінал", "сюрприз"],
    },
    {
      slug: "paper-show",
      name_ua: "Паперове шоу",
      description_ua: "Біле паперове шоу для фіналу програми.",
      price_uah_from: 2400,
      tags_ua: ["шоу", "диско"],
    },
    {
      slug: "mini-disco-light",
      name_ua: "Світло для міні-дискотеки",
      description_ua: "Компактний світловий комплект.",
      price_uah_from: 1600,
      tags_ua: ["світло", "диско"],
    },
    {
      slug: "photo-zone",
      name_ua: "Міні фотозона",
      description_ua: "Банер + декор у тематиці свята.",
      price_uah_from: 2200,
      tags_ua: ["декор", "фото"],
    },
    {
      slug: "master-class-extra",
      name_ua: "Додатковий майстер-клас",
      description_ua: "Творчий блок на вибір (слайми/листівки/браслети).",
      price_uah_from: 2800,
      tags_ua: ["майстер-клас", "творчість"],
    },
    {
      slug: "bubble-machine",
      name_ua: "Генератор бульбашок",
      description_ua: "Оренда на час програми з витратними матеріалами.",
      price_uah_from: 900,
      tags_ua: ["бульбашки", "декор"],
    },
    {
      slug: "travel-outside",
      name_ua: "Виїзд за межі Боярки",
      description_ua: "Додаткова вартість залежно від відстані.",
      price_uah_from: 500,
      tags_ua: ["логістика", "виїзд"],
    },
  ],
};

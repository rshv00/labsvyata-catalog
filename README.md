# Лабораторія свята - каталог сайту (Next.js)

Локальний інформаційний каталог для дитячої агенції **"Лабораторія свята"** (Боярка, Україна).

## Особливості

- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Повністю локальний контент у `content/*.ts`
- Локальні зображення у `public/images`
- Без БД, без CMS, без checkout/booking/forms
- Каталоги персонажів і програм з клієнтським пошуком, фільтрами, сортуванням

## Вимоги

- Node.js 18+
- npm 9+

## Встановлення

```bash
npm install
```

## Локальний запуск

```bash
npm run dev
```

Після запуску відкрийте `http://localhost:3000`.

## Продакшн-збірка

```bash
npm run build
npm start
```

Після `npm run build` статичний експорт зберігається в папці `out/`.  
`npm start` піднімає локальний статичний сервер для цієї збірки на `http://localhost:3000`.

## Azure Functions (деплой)

Для Azure використовується окремий хост у `azure-function-host/`, який роздає статичні файли з `out/`.

Базовий цикл:

```bash
npm run build
rsync -a --delete out/ azure-function-host/out/
cd azure-function-host
npm install
zip -qr /tmp/labsvyata-function-deploy.zip .
az functionapp deployment source config-zip --resource-group <rg> --name <app> --src /tmp/labsvyata-function-deploy.zip
```

## Де редагувати контент

- `content/site.ts` - бренд, контакти, географія, базові SEO-рядки
- `content/characters.ts` - список персонажів
- `content/programs.ts` - список програм
- `content/pricing.ts` - пакети та додаткові опції
- `content/types.ts` - типи даних

## Як додати персонажа

1. Відкрийте `content/characters.ts`.
2. Додайте новий об'єкт у масив `characters`.
3. Вкажіть унікальний `slug` у форматі `lowercase-hyphen`.
4. Заповніть поля `name_ua`, `short_ua`, `description_ua`, вік, тривалості, ціну, теги.
5. Додайте `hero_image` та `images` (локальні шляхи у `public/images`).
6. За потреби виставте `is_featured: true`, щоб показувати на головній.

## Як додати програму

1. Відкрийте `content/programs.ts`.
2. Додайте об'єкт у масив `programs`.
3. Задайте унікальний `slug` (`lowercase-hyphen`).
4. Заповніть поля опису, віку, тривалості, ціни, тегів і `included_ua`.
5. Пропишіть `hero_image` та `images` на локальні файли.
6. Опційно: `is_featured: true` для головної сторінки.

## Зображення: як додати/замінити

Рекомендована структура:

- `public/images/characters/<slug>/hero.jpg`
- `public/images/characters/<slug>/1.jpg`
- `public/images/characters/<slug>/2.jpg`
- `public/images/programs/<slug>/hero.jpg`
- `public/images/programs/<slug>/1.jpg`
- `public/images/programs/<slug>/2.jpg`

Поточний плейсхолдер:

- `public/images/placeholder.jpg`

Після додавання файлів оновіть шляхи в `content/characters.ts` або `content/programs.ts`, наприклад:

```ts
hero_image: { src: "/images/characters/minecraft-steve-alex/hero.jpg", alt: "Стів і Алекс" }
```

## Правила для slug

- Тільки lowercase-символи латиниці, цифри, дефіс
- Без пробілів
- Унікальний в межах свого каталогу
- Приклад: `minecraft-steve-alex`, `science-show`

## Troubleshooting

### Зображення не відображається

- Перевірте, що файл справді існує в `public/images/...`
- Перевірте шлях у контенті: має починатися з `/images/...`
- Переконайтеся, що назва файлу і розширення співпадають (`.jpg`, `.png`)

### Неправильний шлях або 404

- Звірте `slug` у URL і в контент-файлі
- Переконайтеся, що `generateStaticParams` підхоплює потрібний slug

### Помилки збірки

- Виконайте `npm install` повторно
- Перевірте синтаксис у `content/*.ts`
- Запустіть `npm run build` і виправте помилки TypeScript

## Структура проєкту

```text
.
├── app
│   ├── about/page.tsx
│   ├── characters
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── contacts/page.tsx
│   ├── programs
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── prices/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── sitemap.ts
├── components
│   ├── cards
│   │   ├── CharacterCard.tsx
│   │   └── ProgramCard.tsx
│   ├── catalog
│   │   ├── CharacterCatalogClient.tsx
│   │   └── ProgramCatalogClient.tsx
│   ├── layout
│   │   ├── Container.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── sections
│   │   ├── ContactCtas.tsx
│   │   └── HowToOrder.tsx
│   └── ui
│       ├── Breadcrumbs.tsx
│       ├── FilterPanel.tsx
│       ├── Gallery.tsx
│       ├── PriceBadge.tsx
│       ├── SearchInput.tsx
│       ├── SortSelect.tsx
│       └── TagChips.tsx
├── content
│   ├── characters.ts
│   ├── pricing.ts
│   ├── programs.ts
│   ├── site.ts
│   └── types.ts
├── lib
│   ├── catalog.ts
│   └── format.ts
├── azure-function-host
│   ├── .gitignore
│   ├── README.md
│   ├── host.json
│   ├── package.json
│   └── src/functions/staticCatalog.js
├── public/images
│   ├── characters/.gitkeep
│   ├── programs/.gitkeep
│   └── placeholder.jpg
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

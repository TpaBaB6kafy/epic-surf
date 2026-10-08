# EPIC: библиотека компонентов V1

Второй подход, 2026-10-05. Живой каталог: `/design-system?lang=ru` и `/design-system?lang=en`. Отдельный образец секций для адаптивной проверки: `/design-system?preview=1&lang=ru`. Все образцы импортируют библиотеку, а не копируют её JSX и стили. В iframe взаимодействие включается явно: до включения колесо/жест прокручивает страницу каталога, iframe исключён из tab navigation.

## Источник и устройство

Порядок чтения: [геометрия](layout-and-scale.md) → [основы оформления](foundations.md) → этот API → [карта композиций](components-and-patterns.md). Реальная главная остаётся визуальным эталоном; эта библиотека предоставляет новые переиспользуемые реализации её ролей. Первый публичный пилот — уроки EN/RU: [шаблон услуги и новые exports](service-template.md). Остальные публичные страницы сохраняют свои реализации.

| Файл | Ответственность |
| --- | --- |
| `app/components/design-system/tokens.js` | Именованные значения, роль и источник. Этот же реестр рисует таблицу каталога и поставляет runtime CSS variables |
| `primitives.jsx` | Каркас, поверхности, заголовки, кнопки, фильтры, фотографии |
| `interactive.jsx` | FAQ, поля, статусы формы, доступный диалог |
| `recipes.jsx` | Процесс, предложение услуги, Included, отзывы, галерея, завершающее действие |
| `system.css` | Изолированные стили `.epic-ds`, композиционные пропорции и breakpoint recipes |
| `index.js` | Единый набор exports для страниц и каталога |
| `app/design-system/DesignSystemCatalog.jsx` | Подписи, реальные данные образцов, локальные демонстрационные handlers |
| `app/design-system/catalog.css` | Только оболочка каталога: навигация, паспорт образца, код, таблица tokens |

`PageFrame` обязателен: он устанавливает scope, язык и токены. Не импортировать библиотеку ради глобального изменения стилей. Не накладывать её корень на уже оформленную главную. CSS рецептов хранит отличающиеся пропорции конкретных композиций; не превращать все числа в один общий radius или spacing.

## Начать новую страницу

```jsx
import { PageFrame, Section, SectionHeading, Action } from '@/app/components/design-system';

export default function Example({ locale, onBooking }) {
  const ru = locale === 'ru';
  return (
    <PageFrame locale={locale}>
      <main>
        <Section>
          <SectionHeading accent={ru ? 'урок' : 'lesson'}>
            {ru ? 'Выбери свой' : 'Choose your'}
          </SectionHeading>
          <Action onClick={onBooking}>{ru ? 'Записаться' : 'Book now'}</Action>
        </Section>
      </main>
    </PageFrame>
  );
}
```

Пример демонстрирует только визуальный каркас. Владелец страницы добавляет metadata, alternate EN/RU, canonical, schema и реальные handlers. Клиентский обработчик передаётся из клиентского компонента; Server Component не передаёт обычную функцию через серверную границу. Shell проекта и библиотека не заменяют друг друга.

## Паспорт примитивов

| Export | Входы и варианты | Контракт |
| --- | --- | --- |
| `PageFrame` | `locale="en" / "ru"`, `children`, `className`, `style`, DOM props | Один корень на страницу. Desktop ≥1200: S=min(94vw,2160px), C=S×.832; mobile/tablet отдельные поля. Не уменьшать корень через scale/zoom |
| `ContentFrame` | `as="div"`, `readable`, DOM props | Общие края C. `readable` ограничивает именно текстовый столбец до 68ch; не всю страницу |
| `Section` | `id`, `tone="dark" / "paper" / "sea"`, DOM props | Секция уже включает ContentFrame. Не вкладывать ещё один ContentFrame без причины. Обычный вертикальный ритм 64–96px |
| `SectionHeading` | `as="h2"`, `recipe="process" / "service" / "utility"`, `align="center" / "left"`, `accent`, DOM props | Выбирать heading level по документу. `accent` добавляет выделенную часть. Process/Service сохраняют выразительный характер; Utility — Montserrat. Heading bounded 32–44 desktop, phone 24–32 |
| `Surface` | `as="article"`, `tone="dark" / "paper" / "sea"`, DOM props | Спокойная информационная поверхность; сама не является кнопкой. Поля, радиус и карточная тень общие |
| `Action` | `href` или `onClick`, `variant="primary" / "secondary"`, `size="small" / "regular" / "large"`, `disabled`, `loading`, DOM props | Без href — native button; с href — anchor. `type="submit"` для формы. Loading отключает активацию и добавляет aria-busy. Disabled link теряет href и tab stop. Не передавать `target` без href |
| `IconControl` | обязательный `label`, `direction="previous" / "next"`, либо `icon`, `tone="sea" / "paper"`, `size="small" / "regular"`, DOM props | Label переводится страницей. Без direction/icon — X. 44px small / 58px regular; disabled native |
| `Filter` | `selected`, `children`, DOM props | Native button с aria-pressed, минимум 44px. Контейнер группы получает понятное aria-label |
| `FramedPhoto` | обязательные `src`, `alt`; `ratio="4 / 3"`, `shape="rounded" / "service" / "round" / "arch" / "plain"`, `slot`, `framing`, `mobileFraming`, `sizes`, `priority`, wrapper DOM props | Реальная фотография, cover, управляемая рамка. `alt=""` только для декоративного фото. `priority` включает eager loading. `sizes` описывает место фото. Не задавать wrapper height без понимания aspect ratio |

Action: small ≥44px / 13px label; regular 60px / 16px; large 60–84px / 16–22px. Основная коралловая и вторичная графитовая сохраняют верхний блик/нижнюю грань. Secondary phone <700px имеет исходную плоскую серую заливку. Hover требует подходящего pointer; keyboard focus отдельный. При reduced motion подъём/нажатие и вращение spinner отключены, состояния остаются видимыми.

Фотографии используют сохранённое кадрирование `app/data/gallery-framing.json`: например `slot="how-1"`, `slot="lesson-group"`. Явные `framing={{x:50,y:50,scale:1}}` и `mobileFraming` имеют приоритет; x/y ограничены 0–100, scale 1–2.5, отсутствующие координаты центрируются. Mobile crop включается <700px. Само фото допускает scale, весь интерфейс — нет. Сохранённые slots относятся к определённым исходным фотографиям: не переносить crop на другое изображение без просмотра.

## Паспорт интерактивных компонентов

| Export | API | Поведение и ограничения |
| --- | --- | --- |
| `FAQItem` | `question`, children answer; `open` + `onOpenChange` либо `defaultOpen` | Controlled/uncontrolled. Native button, aria-expanded, связанный answer region. Скрытый ответ не попадает в navigation |
| `FAQList` | `items: [{id?,q,a}]` | Одновременно открыт один ответ. Ответы строковые; для богатого содержимого использовать FAQItem |
| `Field` | `label`, `help`, `error`, `as="input" / "textarea" / "select"`, `id?`, native props/children | Native label/id, help/error через aria-describedby, aria-invalid. `required` остаётся native и показывает звёздочку. Родитель формы определяет валидацию и фокус ошибки |
| `FormStatus` | `kind="info" / "error" / "success"`, children | Error — alert, остальные — status. Не объявлять успех до ответа настоящего backend |
| `Dialog` | обязательные `open`, `onClose`, `title`, children; переводимый `closeLabel`, `className` | Native modal dialog. Фокус начинается на close, цикл Tab/Shift+Tab, Escape/backdrop, body scroll lock, возврат к opener. `data-autofocus` на другом элементе задаёт начальный фокус |

Field/FormStatus — новые необходимые роли, основанные на существующем утилитарном языке и диалоговых поверхностях. Они не объявляются точной копией полей главной: её booking flow устроен иначе. Ошибки и успех используют текст и семантический статус, а не только цвет. Светлые Surface/Section и Dialog имеют свои читаемые status/help цвета.

В этой версии Dialog рассчитан на одну открытую оболочку. Для вложенных модалей сначала расширить общий контракт и проверить стек focus/scroll locks. Содержимое длинного диалога прокручивается внутри, max-height зависит от dvh; close остаётся доступен при обычной навигации.

## Паспорт готовых композиций

| Export | API | Применение / ограничения |
| --- | --- | --- |
| `ProcessGrid` | `title`, `accent`, `locale`, `steps:[{id?,title,description? / desc,src,alt?,slot?}]` | 4 коротких шага — проверенный случай. 2 колонки ≥1000px, 1 ниже. Desktop card min-height17.222222×S/100, photo16.25×S/100. Фото и label связаны. Длинный текст увеличивает карточку |
| `ServiceOffer` | `title`, `price`, `currency="VND"`, `description`, `image`, `slot`, `action` React node, `previous?`, `next?`, `locale` | Текст/цена + фото; на телефоне <700 фото выше текста, CTA со стрелками ниже. Для одной услуги callbacks отсутствуют. Цена отделена от currency. Родитель управляет выбранной услугой и объявляет изменения |
| `IncludedPanel` | `image`, `alt`, `items: string[]` либо `[{id?,text}]` | Круговое фото + короткие пояснения. <700 один столбец. Не использовать для длинного гайда |
| `ReviewCard` | `review:{name,language,excerpt,englishTranslation?,reviewUrl,avatarUrl?}`, `locale` | 4 строки, проверенный author, настоящий link. EN translation помечается. Арка без button shadow. Google avatar — внешняя зависимость; не подменять вымышленным портретом |
| `ReviewRating` | `rating`, `href`, `locale` | Проверенный aggregate рейтинг, Google link. Не вычисляет рейтинг из featured выборки. Текущий источник 5.0; звездный рисунок показывает шкалу из 5 |
| `ReviewsSection` | `title`, `reviews`, `rating`, `href`, `locale`, `transition=false` | 3 карточки desktop ≥1200, 2 на 900–1199 с центрированным нечётным последним, 1 ниже900. Внешний слой допускает широкую волну; ContentFrame общий. Wave optional и не повторяется у каждого блока |
| `PhotoGallery` | `albums:[{id,label,photos:[{src,alt,slot?}]}]`, `locale` | Проверены 2 альбома по 5 фотографий. 1 крупная +4 малых на desktop; phone <700 крупная сверху. Native dialog: ArrowLeft/Right, controls, горизонтальный swipe, Escape, focus return. Обычная вертикальная прокрутка не запрещена |
| `RelatedAction` | children copy, `label`, `href` либо `onClick` | Морская поверхность + primary CTA. Desktop в строку, phone в столбец |

Входные данные должны быть непустыми. Галерейная раскладка V1 рассчитана на пять фото; другое количество требует отдельного layout recipe, иначе появятся пустые/неподходящие ячейки. ReviewsSection проверен на три featured отзыва. ServiceOffer описывает один выбранный формат, а не готовый booking flow или общий каталог досок.

Рецепты показывают характер и правила текущей главной, но не импортируют её старые responsive branches, SVG-панели или жёсткие handoff coordinates. Новые признаки уже отличены от текущего production: hit targets ≥44px, tablet Process body16px вместо исторических14.08px, ordinary utility typography bounded. Главная сохраняет свои нынешние реализации до отдельной миграции.

## EN/RU и шрифты

PageFrame переключает явные роли: EN Recursive heading / Chivo body; RU Recursive + Consolas/monospace fallback heading / Arial body; Montserrat labels, price and reviews в обеих локалях. Файлы fonts сейчас подключает `app/globals.css`; любой новый root layout должен подключать его. Новый случайный шрифт не вводить.

Язык страницы, metadata и ссылки устанавливает её owning route. Catalog меняет html lang и query, чтобы пример можно было открыть в нужном языке. Продакшен alternate links и partner attribution не поручаются компоненту.

## Как проверять

```powershell
npm run dev -- --port 3000
node scripts/qa-design-system.mjs
```

Можно задать `EPIC_DS_URL`, `EPIC_DS_OUTPUT`. Сценарий проверяет каталог в Chromium, отсутствие native submit до загрузки JavaScript, native interactions и направление жеста галереи, обычное/reduced motion, реальные viewport iframe, EN/RU на 14 ширинах 320–3200, общие desktop edges, hit targets, локальные изображения, noindex/nofollow, отсутствие production analytics/schema и sitemap entries. Снимки и отчёт сохраняются в `output/design-system-library-2026-10-05`. Он не отправляет booking, не подтверждает работоспособность Google Maps и не заменяет визуальный просмотр снимков.

Tailwind в `app/globals.css` сканирует только `app` через `source("./")`: временные копии, логи и QA-артефакты не являются исходниками UI. Это предотвращает включение архивного кода в stylesheet и раздувание generated cache. Новый код вне `app`, если такой появится, должен быть зарегистрирован явно. [Правило source detection Tailwind](https://tailwindcss.com/docs/detecting-classes-in-source-files).

Перед переносом компонента на публичный маршрут дополнительно проверить действия именно этой страницы: booking/rental, конкретную доску, attribution, messenger, language/canonical/schema. Browser errors и local asset failures не допускаются. Внешние аватары фиксируются отдельно. Пограничные ширины и длинные переводы обязательны.

## Что остаётся третьему подходу

Сборка демонстрационной страницы без индивидуальных button/font/container наборов; проверенные стартовые шаблоны услуги, аренды, посадочной и гайда; расширение ролей для длинного текста/таблиц и каталога досок по фактической потребности; карта достижимых legacy imports и вывод старого Poster System. Это отдельный следующий подход. Commit, push и deploy этим каталогом не выполняются.

## Шаблон услуги

Третий подход добавляет SiteShell, ContentStory, ServiceChoices и ServicePageTemplate. Полные контракты, ограничения и рабочий пример — в [паспортах шаблона услуги](service-template.md). Все exports доступны через общий index.js.

## Фото-шаблон страницы уроков

Переиспользуемые `ServiceChoices`, `LessonGearArtwork`, `LessonIncluded`, `LessonProcess` и `ServicePageTemplate` описаны в [service-template.md](service-template.md). Каталог использует тот же выбор формата и актуальный коллаж, что и страница уроков. Для Header страницы используется действующий компонент главной; альтернативная десктопная шапка первого пилота удалена. Новая роль `--ds-font-service-display` применяется только к выбранной композиции и поддерживает EN/RU. Публикация и массовый перенос не являются частью пилота.

## Сворачиваемый подвал SiteFooter

`SiteFooter` выделен из существующего подвала уроков и переиспользуется на партнёрской странице. Входы: `locale`, `languageHref`, `fullWidthDetails=false`, `serviceType='surf_lesson'`. Сохраняет компактные logo/nav/language/messenger и native details «Контакты и карта», внутри — действующий HomeV2Footer с ручной активацией карты. По умолчанию раскрываемая часть находится внутри ContentFrame, как у уроков. `fullWidthDetails` выносит её за ContentFrame: карта/фон full-bleed, текст остаётся на общих краях C. `serviceType='partnership'` меняет сообщение мессенджеров на партнёрское и включает код партнёра; названия событий сохраняются.

Проверены EN/RU, сворачивание и раскрытие, карта на всю ширину у партнёров, исходная ширина у уроков, query языка и код в WhatsApp/Telegram. Общий компонент и стили исключают отдельную слегка отличающуюся копию подвала.

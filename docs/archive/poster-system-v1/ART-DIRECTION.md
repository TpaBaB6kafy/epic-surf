# Epic Surf Poster System v1 — art direction

> ARCHIVED 2026-10-05: historical Poster System/specimen brief. It is not an active instruction, worktree requirement, or layout authority. Follow [the approved EPIC standard](../../design/layout-and-scale.md). Reference images remain in the original epic-surf-poster-art-direction-v1 package; do not copy them into production.

## Цель

Сделать текущий specimen единым poster-collage интерфейсом. Сейчас новые коллажные композиции существуют рядом со старыми прямоугольными UI-секциями как два разных продукта. После прохода все разделы должны ощущаться одной системой, но с разной интенсивностью выразительных приёмов.

Это не задача «сделать всё рваным». Это задача построить повторяемую композиционную грамматику.

## Иерархия источников

1. Реальный Home V2 и текущая страница `/design-system/poster`.
2. Функциональные и responsive-ограничения проекта.
3. Правила этого документа.
4. Референсы `REF-01`—`REF-10` — только как источники отдельных приёмов, не как макеты для копирования.

## Неизменная основа Epic Surf

- Dark canvas: `#2E2E2E`
- Coral action: `#FE746A`
- Deep teal: `#395962`
- Paper white: `#F6F6F6`
- Mint accent: `#AAFFC7`, редко
- Крупная спортивно-редакционная типографика
- Реальные фотографии Epic Surf
- Высокий контраст и понятная иерархия
- Контролируемая асимметрия вместо декоративного хаоса

Референсные палитры не переносить. Не добавлять розовый, жёлтый или голубой как новые системные цвета только потому, что они есть на картинках.

## Единая грамматика, четыре уровня интенсивности

### 0. Calm utility

Для FAQ, пояснений, состояний, EN/RU wrapping и служебной информации.

- Стабильная сетка и спокойный фон.
- Одна редакционная ось: номер, вертикальная линия, метаданные или акцентный заголовок.
- Без декоративного torn edge на каждой строке.
- Компактные блоки текста вместо набора одинаковых карточек.

### 1. Functional UI

Для foundations, actions, tabs, selector rows и системных компонентов.

- Строгая структура остаётся, но получает общие признаки системы: крупная нумерация, типографический слой, активная коралловая ось, clipped edge или один offset plane.
- Не более одного доминирующего poster-device на композицию.
- Интерактивные элементы не вращать и не деформировать.

### 2. Conversion / product

Для Price and Media, Choose Your Lesson, rental/lesson selectors и CTA.

- Фото — главный объект, UI примыкает или частично перекрывает его.
- Активный выбор визуально связан с фото через номер, линию, цветовую плоскость или общую базовую линию.
- Цена оформляется как ticket/label/receipt, а не как ещё одна generic card.
- Разрешён один cutout, один clipped/torn edge или один контролируемый overlap.
- Читаемость цены и CTA важнее декоративного эффекта.

### 3. Editorial / photo-led

Для events, gallery, how it works, included и spot/story content.

- 2–3 визуальных слоя: крупное фото, supporting plane, заметка/номер/подпись.
- Torn boundary, cutout, halftone или type-mask используется как ведущий приём — один основной приём на секцию.
- Воздух и пустые зоны считаются частью композиции.
- Не превращать секцию в плотную стопку бумажек.

## Роли референсов

| Файл | Роль в системе | Где применять | Не копировать |
| --- | --- | --- | --- |
| `REF-01-torn-wave-editorial.jpg` | Рваная граница как крупный переход между фото и цветовой плоскостью | Hero, section break, spot story | Цветовую палитру и плотный мелкий текст |
| `REF-02-screenprint-surfer.jpg` | Двухцветный screen-print как редкий графический акцент | Один декоративный moment на страницу | Полную стилизацию всех фото |
| `REF-03-editorial-cutout.jpg` | Cutout-фигура, крупная геометрия и редакционная иерархия | Lessons, instructors, feature lead | Японский текст и буквальную композицию |
| `REF-04-calm-surf-editorial.jpg` | Спокойный photo-led блок с сильным заголовком | Utility, intro, long-form pause | Обложку журнала 1:1 |
| `REF-05-doodle-collage.jpg` | Рукописная пометка как человеческий голос | Surf Guide, community note, rare annotation | Дудлы вокруг каждого блока |
| `REF-06-halftone-surfer.jpg` | Halftone и контурный cutout | Один editorial accent, empty state, illustration | Новую фиолетовую палитру |
| `REF-07-numbered-editorial-system.jpg` | Главная системная модель: номера, overlap, metadata, CTA | Вся дизайн-система, особенно selectors | Автомобильную эстетику и гигантские цифры без смысла |
| `REF-08-layered-type-collage.jpg` | Наслоение фотографии, типографики и цветовых плоскостей | Gallery, events, lesson story | Случайные слои без иерархии |
| `REF-09-sport-photo-type-hero.jpg` | Сильный спортивный photo/type hero | Hero, event lead, campaign CTA | Чужие логотипы и рекламный layout |
| `REF-10-type-mask-metadata.jpg` | Type-mask, индекс и компактные метаданные | Spot file, lesson index, board catalog | Плохочитаемый type-mask в длинном тексте |

### Главные авторитеты

Основной каркас: `REF-07` + `REF-10`.

Коллаж и пластика: `REF-01` + `REF-03` + `REF-08`.

Паузы и функциональная ясность: `REF-04`.

Редкие специи: `REF-02`, `REF-05`, `REF-06`, `REF-09`.

## Общие композиционные правила

- У каждой секции один ведущий объект и максимум два supporting layers.
- Overlap должен связывать смысловые части, а не просто «делать красиво».
- Поворот допустим только у фото/бумажного слоя, обычно до `1.5deg`.
- Текст, CTA, tabs, input и selector controls не вращать.
- Torn edge использовать как границу большой плоскости, а не как рамку каждой карточки.
- Стикер должен сообщать статус, категорию, шаг или короткую заметку; бессмысленные наклейки запрещены.
- Номер должен отражать порядок, выбранный пункт или индекс контента.
- Halftone — максимум один заметный мотив на viewport/крупную секцию.
- Generic card допустима только для действительно независимого выбираемого объекта. Абзацы не упаковывать в карточки автоматически.
- Не повторять один и тот же layout подряд. Ритм строится чередованием photo-led, type-led и calm utility секций.

## Mobile: не стопка карточек

На мобильном не требуется уменьшенная копия desktop, но должен сохраниться тот же характер.

- Логический DOM-порядок остаётся линейным и доступным.
- В каждой ключевой feature-секции сохранять хотя бы один не-прямоугольный силуэт: clipped photo, torn boundary, cutout, offset label или type plane.
- Допустим контролируемый overlap примерно `12–24px`, если он не перекрывает важный текст и controls.
- Если desktop-overlap нельзя сохранить, заменять его не стопкой карточек, а edge-to-edge фото, нестандартным crop, offset-заголовком, боковым индексом или подписью, заходящей на край фото.
- Чередовать mobile-композиции: full-bleed photo, split image/text, numbered row, clipped figure, horizontal selector. Не делать все секции одинаковыми вертикальными boxes.
- Не вращать текст и controls.
- Минимальные touch targets: `44×44px`.
- Supporting text: не меньше `14px`; controls: `13px`; micro-labels: `11px` и только для вторичной информации.
- Не допускать horizontal overflow.
- На `prefers-reduced-motion` не должно оставаться обязательных motion-зависимых состояний.
- На 390 px композиция должна выглядеть намеренно собранной, а не «desktop сломался и всё упало вниз».

## Что требуется унифицировать

- `SYSTEM FOUNDATIONS`
- `ACTIONS AND STATES`
- `SURFACE RHYTHM`
- `PRICE AND MEDIA`
- `CHOOSE YOUR LESSON`
- `CALM UTILITY`
- `OUR EVENTS`
- `COMPOSITION GRAMMAR`
- `POSTER COLLAGE DEVICES`
- `EVERYTHING INCLUDED`
- `EPIC MOMENTS`
- `EN / RU WRAPPING`

Не добавлять ещё одну демонстрационную секцию как отдельный «остров». Нужно провести грамматику через существующие разделы и при необходимости объединить дублирующие примеры.

## Anti-patterns

- AI-bento: много одинаковых скруглённых карточек с равным визуальным весом.
- Пять декоративных приёмов в одной секции.
- Torn edge, tape, sticker и rotation на каждом элементе.
- Случайная асимметрия без ведущей оси.
- Внешняя референсная палитра вместо Epic Surf palette.
- Нечитаемый мелкий текст ради «журнальности».
- Вращение controls и CTA.
- Mobile как длинная колонка одинаковых карточек.
- Копирование чужих изображений или логотипов в продукт.
- Изменение production routes во время работы над specimen.

## Definition of done

- Один визуальный язык считывается от foundations до gallery и EN/RU fixtures.
- `PRICE AND MEDIA` и `CHOOSE YOUR LESSON` больше не выглядят как старый квадратный интерфейс рядом с новым collage-блоком.
- Выразительность дозирована: utility-секции спокойнее, photo-led секции богаче.
- Mobile сохраняет poster character без generic card stack.
- Все состояния остаются понятными, доступными и пригодными для переноса в реальные landing pages.

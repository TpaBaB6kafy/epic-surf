# Prompt for Codex — unify Epic Surf Poster System

> ARCHIVED 2026-10-05: historical Poster System/specimen brief. It is not an active instruction, worktree requirement, or layout authority. Follow [the approved EPIC standard](../../design/layout-and-scale.md). Reference images remain in the original epic-surf-poster-art-direction-v1 package; do not copy them into production.

Работай только в отдельном preview-worktree:

`C:\Users\TpaBa\epic-surf-home-v2-preview`

Ветка:

`design/home-v2-poster-collage`

Локальный preview:

`http://localhost:3001/design-system/poster`

Reference bundle:

`C:\Users\TpaBa\epic-surf-poster-art-direction-v1`

Сначала полностью прочитай:

- `C:\Users\TpaBa\epic-surf-poster-art-direction-v1\ART-DIRECTION.md`
- `C:\Users\TpaBa\epic-surf-poster-art-direction-v1\README.md`

Затем визуально изучи `CONTACT-SHEET.jpg` и все изображения в `references`. Используй их только как источники описанных композиционных приёмов. Не копируй чужие изображения, логотипы, тексты или палитры в проект.

## Контекст

Текущая страница Poster System уже содержит foundations, UI states, Price/Media, Lessons, Events, Composition Grammar и новые Poster Collage Devices. Проблема: новые коллажные композиции добавлены отдельным островом, а старые секции — особенно `PRICE AND MEDIA` и `CHOOSE YOUR LESSON` — сохранили прежний квадратный параллельный язык. В итоге на одной странице живут две дизайн-системы.

## Задача

Сделай один целостный visual unification pass по существующему specimen. Не добавляй ещё одну секцию с примерами. Проведи poster-collage grammar через все существующие разделы с разной интенсивностью:

- calm utility — почти строгая редакционная сетка;
- functional UI — ясная структура с индексом, акцентной осью или одним offset plane;
- conversion/product — фото, selector и price/CTA собираются в одну композицию;
- editorial/photo-led — 2–3 слоя, controlled overlap и один ведущий collage-device.

Главный приоритет:

1. `PRICE AND MEDIA`
2. `CHOOSE YOUR LESSON`
3. `SURFACE RHYTHM` и `ACTIONS AND STATES`
4. `OUR EVENTS`, `EVERYTHING INCLUDED`, `EPIC MOMENTS`
5. Остальные foundations/utility/locale sections

После работы они должны выглядеть как части одной системы с уже удачной `COMPOSITION GRAMMAR`, а не как старый UI плюс новая демонстрация коллажа.

## Жёсткий scope

Разрешено менять только:

- `app/design-system/poster/PosterSystem.stories.jsx`
- `app/design-system/poster/poster-system.css`

Не менять:

- `app/design-system/poster/page.jsx`
- `app/design-system/poster/layout.jsx`
- production routes и production components
- `app/design-lab`
- внешний/старый `epic-surf-design-family-v1`
- package dependencies

Не создавать новые assets. Использовать только существующие Epic Surf/Home V2 изображения. Reference bundle не копировать в репозиторий.

## Обязательные визуальные правила

- Сохрани Epic Surf palette: `#2E2E2E`, `#FE746A`, `#395962`, `#F6F6F6`, mint `#AAFFC7` только как редкий accent.
- Основной системный каркас брать из `REF-07` и `REF-10`: нумерация, типографическая иерархия, metadata, связь фото и UI.
- Collage plasticity брать из `REF-01`, `REF-03`, `REF-08`: torn boundary, cutout, overlap, но максимум один ведущий приём на секцию.
- `REF-04` использовать как ориентир для спокойных пауз и utility blocks.
- `REF-02`, `REF-05`, `REF-06`, `REF-09` использовать очень дозированно.
- Не превращать всё в рваные карточки. Не добавлять tape/sticker/rotation повсюду.
- Не использовать generic AI-bento и ряды одинаковых rounded cards.
- Текст и интерактивные controls не вращать. Поворот разрешён у photo/paper planes, обычно не более `1.5deg`.
- Стикеры, номера и metadata должны иметь смысл, а не быть декором.
- Generic card использовать только для независимого selectable object.

## Mobile — стопки запрещены

Mobile должен быть красивым самостоятельным монтажом, а не длинной колонкой одинаковых карточек.

- Сохраняй логический и доступный DOM order.
- В каждой ключевой feature-секции оставляй один poster gesture: clipped/torn photo, cutout, offset label, side index или type plane.
- Controlled overlap `12–24px` допустим, если не мешает тексту и controls.
- Если desktop-overlap не помещается, заменяй его edge-to-edge photo, intentional crop, offset heading или label-on-image — не generic card stack.
- Чередуй форматы секций: full-bleed, split, numbered row, clipped figure, horizontal selector.
- Touch targets минимум `44×44px`; supporting text минимум `14px`; controls `13px`; micro-labels `11px` только для вторичного текста.
- Никакого horizontal overflow.

## Рабочий порядок

1. До изменений сними baseline всей страницы и крупные crops ключевых секций на 390 и 1440 px.
2. Коротко опиши найденную текущую grammar и несостыковки.
3. Сначала выдели повторяемые CSS recipes/tokens для index rail, photo plane, paper note, clipped/torn edge, metadata и price ticket.
4. Примени их к существующим секциям; не дублируй новый JSX без необходимости.
5. Удали или объедини демонстрационные примеры, если они повторяют один и тот же приём и создают визуальный шум.
6. Проверь результат в живом browser, а не только по исходному коду.
7. Остановись после визуальной и технической проверки. Не делай commit, push, stash, cherry-pick или перенос в `main`.

## Проверка

Обязательно проверить:

- 390, 640, 768, 1024, 1440 и 1920 px;
- крупные before/after crops каждой существенно изменённой секции;
- отсутствие horizontal overflow;
- отсутствие broken assets и console/runtime errors;
- EN/RU wrapping;
- focus-visible, disabled, loading и error states;
- touch targets минимум `44×44px`;
- `prefers-reduced-motion`;
- lint;
- `git diff --check`;
- финальный `git status --short`.

## Формат отчёта

Покажи:

1. Что изменилось в общей grammar.
2. Before/after для `PRICE AND MEDIA` и `CHOOSE YOUR LESSON` на 1440 и 390 px.
3. По одному крупному after-crop остальных изменённых групп.
4. Результаты responsive и технических проверок.
5. Точный список изменённых файлов.

Не заявляй, что дизайн готов к production. Формулировка результата: «unification pass готов для визуального утверждения».

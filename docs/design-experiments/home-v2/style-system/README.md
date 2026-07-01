# Home V2 Style System

## Назначение документа

Этот README — главный style authority для визуальной работы над Home V2. Его нужно читать до проектирования, реализации и visual QA любых изменений интерфейса на экспериментальных страницах.

Документ определяет visual form, composition и presentation layer. Он не заменяет production-контракты проекта, не описывает бизнес-логику и не даёт разрешения менять функциональное поведение.

## Scope

Правила распространяются только на:

- `/home-v2`;
- `/ru/home-v2`;
- Home V2 presentation-компоненты и assets, используемые исключительно этими routes.

## Что не входит в scope

Без отдельного подтверждения этот style system не распространяется на:

- production routes `/` и `/ru`;
- SEO, sitemap, robots, canonical и language alternates;
- бизнес-логику, данные и структуру переводов;
- analytics и `trackEvent()`;
- partner attribution;
- booking, rental и messenger flows;
- modals, iframe и fallback behavior;
- публичную навигацию и внутренние SEO links.

## Разрешение конфликтов

- Production design system сохраняет design tokens, бренд, функциональную логику, данные, accessibility и базовые UX-контракты.
- Home V2 style system определяет visual form, composition и presentation layer только для `/home-v2` и `/ru/home-v2`.
- При конфликте visual form на Home V2 приоритет имеет этот README.
- При конфликте logic, data, routes, SEO, analytics, attribution или modals приоритет имеет production contract.
- Если визуальное решение нельзя реализовать без изменения production contract, работу нужно остановить и запросить подтверждение.

## Главный принцип

> Унифицировать токены, поведение, качество и базовые примитивы; не унифицировать силуэт, композицию и декоративный акцент каждой секции.

Общая система должна делать страницу цельной, но не превращать разные секции в повторение одного компонента. Повторяемость допустима на уровне цвета, типографической дисциплины, accessibility, spacing logic и технических helpers. Силуэт, плотность, пропорции, ритм и ведущий visual device должны отвечать задаче конкретной секции.

## Foundations

### Палитра

Использовать только текущую палитру Epic Surf School:

- `epicDark`: `#2E2E2E`;
- `epicRed`: `#FE746A`;
- `epicWhite`: `#F6F6F6`;
- `epicMint`: `#AAFFC7`;
- `epicGray`: `#585858`.

`epicRed` служит для CTA, важных stamps и приоритетных акцентов, а не для одинакового offset у каждого заголовка. `epicMint` поддерживает surf energy и secondary surfaces. `epicDark` и `epicWhite` формируют основные контрастные поля.

### Typography

- Предпочтительна bold uppercase editorial typography с ясной иерархией.
- EN и RU варианты считаются равноправными композициями.
- RU heading нельзя втискивать в геометрию, рассчитанную только на короткий EN text.
- Допустимы перенос, изменение ширины backing, локальная корректировка scale и иной line break, если сохраняется иерархия.
- Декоративная типографика не должна ухудшать читаемость цены, CTA или важного пояснения.

### Imagery

- Использовать реальные Epic Surf photos и существующие согласованные assets.
- Black-and-white treatment уместен, когда он снижает визуальный шум или помогает акцентному цвету управлять иерархией.
- Цветное фото допустимо, если цвет несёт настроение, информацию или отделяет секцию от соседней.
- Изображение, graphic и type могут пересекаться, но не должны закрывать важный текст и интерактивные элементы.

### Paper, poster и collage rhythm

Paper texture, rough labels, torn edges, tilt, overlap и print/grain cues — это словарь, а не обязательный checklist для каждой секции. В каждой композиции выбирается минимальный набор приёмов, который поддерживает её задачу.

## Composition principles

- Соседние секции должны отличаться силуэтом, плотностью и ритмом.
- Не применять один и тот же framed-title pattern ко всем секциям.
- В пределах секции или одного viewport должен доминировать не более одного poster-device.
- Tape, pin или sticker используются только тогда, когда обозначают прикрепление, приоритет, подпись, статус или иной понятный смысл.
- Hard border применяется как структурный или контрастный инструмент, а не как default для каждого блока.
- Offset и shadow должны усиливать hierarchy или depth; их нельзя добавлять только ради формального соответствия poster style.
- Белое пространство может быть частью poster composition. Его не нужно автоматически заполнять рамками и карточками.
- Photo-led, type-led, information-led и utility-led sections не обязаны использовать одинаковую конструкцию.
- Крупные изменения нескольких секций нельзя объединять в один visual pass без промежуточной full-page проверки.

## Section archetypes

Archetypes задают направление и роль, но не являются одинаковыми templates.

### Utility sections: LiveCam и Forecast

Главное — инструментальная понятность, состояние данных, preview и доступность действия. Poster character создаётся композицией artboard, контрастом и типографикой; дополнительные рамки и stickers не должны конкурировать с utility content.

### Process и lesson cards

Последовательность и различия между предложениями должны считываться быстрее декора. Допустимы нумерация, горизонтальный ритм, photo/type layering и один общий chapter cue. Каждая карточка не обязана повторять tape или одинаковый offset.

### Included / info block

Это scannable information section. Группировка, иерархия и быстрый просмотр важнее имитации набора одинаковых бумажных карточек. Один выразительный info device предпочтительнее рамки вокруг каждого короткого пункта.

### Trust / Reviews

Секция должна ощущаться человеческой и достоверной. Имена, текст отзывов и trust marker первичны. Note-like treatment возможен, но не должен превращать отзывы в однотипную таблицу.

### FAQ

FAQ прежде всего interactive reading surface. Состояния accordion, кликабельность и спокойная типографика важнее collage density. Poster character может жить в chapter composition или одном accent, а не обязательно в каждой строке.

### Events

Events — photo-led editorial stories с различимыми масштабами и приоритетами. Не сводить фотографии, даты, описания и CTA к одинаковым boxed cards, если это убирает ощущение события.

### Gallery

Gallery должна оставаться image-led. Controls и frames обслуживают просмотр, а не становятся главным визуальным мотивом. Ритм, crop и последовательность изображений важнее декоративного обрамления каждого фото.

### Footer

Footer завершает композицию и сохраняет навигационную ясность. Он может менять плотность и тон относительно предыдущей секции, но контакты, map, social и messenger actions должны оставаться легко различимыми.

## Primitives and reuse

Технически можно переиспользовать:

- design tokens и typography scales;
- responsive containers и spacing tokens;
- focus, hover и disabled states;
- accessibility behavior;
- interaction wrappers;
- helpers для нескольких visual variants;
- data mapping и существующие callbacks.

Нельзя превращать в обязательный визуальный штамп:

- один framed heading;
- один hard shadow или coral offset;
- одинаковую paper card;
- tape corner или pin;
- одинаковый rotation;
- одинаковую border treatment;
- один силуэт grid для секций с разными задачами.

`SectionTitle` может существовать как helper для semantic structure, spacing, typography и нескольких независимых variants. Он не должен навязывать один backing, border, shadow, offset или decoration всем секциям. Использование helper не означает визуальную идентичность его экземпляров.

## Anti-patterns

- Одинаковая большая белая рамка с coral offset в каждой секции.
- Hard border как default для каждого heading, card, image и control.
- Tape corner на каждой карточке независимо от смысла.
- RU headings, которые ломают layout ради сохранения EN pattern.
- Белые секции, превращённые в тяжёлые рамочные таблицы.
- Decorative elements без информационной, иерархической или композиционной задачи.
- Одновременная полная перекомпоновка нескольких секций без промежуточной визуальной проверки.
- Тесты, которые закрепляют один декоративный вид как обязательный contract для всех секций.

## Responsive rules

- Обязательные review widths: desktop около `1440px` и mobile `390px`.
- На `390px` не должно быть document-level horizontal overflow.
- RU wrapping проверяется отдельно от EN, а не считается побочным результатом responsive CSS.
- На mobile offsets, overlaps и rotations уменьшаются или отключаются, если они мешают чтению и действиям.
- CTA, prices, key copy и accordion controls должны оставаться читаемыми и достижимыми.
- Mobile composition — самостоятельная stacked poster rhythm, а не уменьшенная desktop collage.

## Visual QA checklist

Перед утверждением визуальных изменений:

- [ ] Сделать full-page screenshots для EN и RU.
- [ ] Проверить desktop около `1440px` и mobile `390px`.
- [ ] Сравнить соседние секции: они не должны выглядеть экземплярами одного template.
- [ ] Найти доминирующий poster-device каждой секции и убедиться, что он не повторяется механически по всей странице.
- [ ] Проверить, что CTA, prices и важный текст читаются до декоративных деталей.
- [ ] Проверить RU line breaks, размеры backing и высоту controls отдельно.
- [ ] Проверить отсутствие horizontal overflow и перекрытия интерактивных элементов.
- [ ] Проверить, что visual treatment не изменил business logic, analytics, attribution, routes или modal behavior.
- [ ] Свериться с approved references и bad-result references до реализации и после full-page capture.

## Связанные документы

- `../brief.md` — исходная задача и ограничения эксперимента.
- `../workflow.md` — branch, routes, verification и preview workflow.
- `references/README.md` — правила использования visual references.
- `references/bad-result-2026-07-01.md` — отрицательный пример слишком буквальной компонентной унификации.
- `../../../project-context/02-design-system.md` — production design system и общие brand tokens.

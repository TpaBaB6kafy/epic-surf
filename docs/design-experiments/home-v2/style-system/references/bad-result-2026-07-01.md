# Bad Result Reference: 2026-07-01

## Статус

Это отрицательный visual reference. Реализация была отклонена и откатана. Скриншоты сохранены только для анализа:

- `../../../../../screenshots/home-v2-en-desktop.png`;
- `../../../../../screenshots/home-v2-ru-desktop.png`.

Отклонённая спецификация сохранена как historical reference:

- `../../../../superpowers/specs/2026-07-01-home-v2-section-system-design.md`.

## Что пошло не так

Общая идея reusable primitives была применена слишком буквально. Разные по задаче секции получили повторяющийся набор признаков:

- большую белую heading-плашку;
- coral hard offset или shadow;
- прямоугольную рамку;
- одинаковую paper-card логику;
- повторяющиеся tape, pin или sticker accents;
- близкую плотность и grid silhouette.

В результате страница стала технически цельной, но композиционно однообразной. Included, Reviews, FAQ, Events и Gallery различались контентом, однако выглядели как варианты одного template.

## Почему это не «плохой poster style»

Проблема не в poster vocabulary как таковом. Hard borders, paper surfaces, offsets, tape, bold uppercase type и black-and-white imagery остаются допустимыми инструментами Home V2.

Ошибка — слишком буквальная компонентная унификация: visual devices перестали отвечать задаче секции и начали использоваться потому, что были доступны в общем primitive. Система подменила художественное решение повторением implementation pattern.

Хороший Home V2 poster style должен быть связан общими tokens и характером, но сохранять контраст между photo-led, utility-led, trust-led и information-led sections.

## Anti-patterns из скриншотов

Не повторять:

- один framed-title с одинаковой геометрией почти для каждого chapter;
- coral offset как постоянную подпись всех headings;
- hard border одновременно на heading, card, image и control;
- tape corner или sticker без понятной роли;
- превращение коротких info items в тяжёлую таблицу одинаковых рамок;
- превращение Reviews в набор однотипных notes, теряющих человеческий характер;
- подчинение FAQ декоративному treatment вместо спокойного accordion reading flow;
- одинаковый карточный силуэт Events и information sections;
- обрамление Gallery, которое конкурирует с фотографиями;
- сохранение EN geometry ценой неестественных RU line breaks;
- изменение сразу многих sections до промежуточной full-page проверки.

## Что проверять перед следующей реализацией

1. Сформулировать роль и archetype каждой изменяемой секции.
2. Для каждой секции назвать один ведущий visual device и объяснить его функцию.
3. Сравнить соседние секции по silhouette, density и rhythm.
4. Убедиться, что один heading treatment не стал default для всей страницы.
5. Проверить EN и RU отдельно до распространения pattern на следующую секцию.
6. Делать изменения небольшими visual batches и снимать промежуточные full-page screenshots.
7. Проверить desktop около `1440px` и mobile `390px`.
8. Проверить CTA, prices, important copy, accordion states и gallery controls.
9. Убедиться, что visual work не изменил analytics, attribution, routes, SEO и modal behavior.
10. Сопоставить итог с `../README.md` и только после этого расширять pattern на другие sections.

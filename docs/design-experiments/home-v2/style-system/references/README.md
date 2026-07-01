# Home V2 Style References

## Назначение

Эта папка содержит описание approved references и bad-result references, которые используются при анализе Home V2 visual work.

## Правила использования

- References не являются production assets.
- Их нельзя импортировать в React components, CSS или публичный asset pipeline.
- Они используются только как visual guidance для композиции, ритма, типографики, imagery и оценки результата.
- Нельзя копировать reference one-to-one, включая конкретный layout, изображения, текст, палитру и декоративные детали.
- Перед реализацией нужно изучить как approved references, так и bad-result references.
- После реализации full-page screenshots нужно сравнить с обоими типами references: approved показывают желаемые качества, bad-result — ошибки, которые нельзя повторять.

## Типы references

### Approved reference

Показывает направление и качества, которые допустимо интерпретировать: editorial rhythm, collage layering, photo/type relationship, contrast и controlled rawness.

Исходный визуальный reference Home V2 находится вне production assets:

- `../../references/ref-01-surf-poster-collage.webp`

### Bad-result reference

Фиксирует уже проверенное решение, которое технически может соответствовать части требований, но визуально не утверждено. Такой reference нужен не для стилистического копирования, а для распознавания повторяющихся ошибок.

- `bad-result-2026-07-01.md`
- `../../../../../screenshots/home-v2-en-desktop.png`
- `../../../../../screenshots/home-v2-ru-desktop.png`

## Обязательный порядок анализа

1. Определить задачу и archetype изменяемой секции.
2. Выписать качества approved reference, которые действительно помогают этой задаче.
3. Проверить bad-result reference и исключить механическое повторение его patterns.
4. Выбрать один доминирующий poster-device для секции.
5. Проверить результат full-page, а не только в изолированном component viewport.


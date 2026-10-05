# Epic Surf Poster Art Direction v1

> ARCHIVED 2026-10-05: historical Poster System/specimen brief. It is not an active instruction, worktree requirement, or layout authority. Follow [the approved EPIC standard](../../design/layout-and-scale.md). Reference images remain in the original epic-surf-poster-art-direction-v1 package; do not copy them into production.

Пакет для унификации локальной дизайн-системы Epic Surf в `app/design-system/poster`.

## Что внутри

- `ART-DIRECTION.md` — правила единого poster-collage языка, роли референсов и responsive-логика.
- `CODEX-PROMPT.md` — готовое задание для Codex на следующий визуальный проход.
- `CONTACT-SHEET.jpg` — быстрый обзор всех референсов.
- `references/REF-01...REF-10` — 10 отобранных визуальных референсов с осмысленными именами.

## Как использовать

1. Распаковать папку рядом с рабочими копиями репозитория, рекомендуемый путь:
   `C:\Users\TpaBa\epic-surf-poster-art-direction-v1`.
2. Открыть Codex в worktree:
   `C:\Users\TpaBa\epic-surf-home-v2-preview`.
3. Убедиться, что preview работает на `http://localhost:3001/design-system/poster`.
4. Передать Codex содержимое `CODEX-PROMPT.md` либо попросить прочитать этот файл по абсолютному пути.
5. После прохода оценивать не только full-page screenshot, но и крупные снимки каждой изменённой секции на desktop и mobile.

## Важно

- Референсы нужны только для частного анализа композиционных приёмов. Не копировать их изображения, логотипы, тексты или фирменные цвета в production и не коммитить эту папку в репозиторий.
- Текущую папку `app/design-system/poster` переименовывать не нужно.
- Внешний пакет `epic-surf-design-family-v1` и старый `app/design-lab` не являются источником истины.
- Источник истины: текущий Home V2, существующий локальный Poster System и правила из этого пакета.
- Commit, push и перенос в production — только после отдельного подтверждения.

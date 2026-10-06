import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const out=path.resolve(process.env.EPIC_BASELINE_OUTPUT || 'output/design-system-baseline-2026-10-05');
const r=JSON.parse(await fs.readFile(path.join(out,'baseline.json'),'utf8'));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const cards=r.samples.filter(s=>s.screenshot).map(s=>`<article data-lang="${s.lang}" data-width="${s.width}"><h2>${s.lang.toUpperCase()} · ${s.width}px</h2><p><a href="${s.screenshot}">Полный размер</a> · overflow: ${s.overflow} · внешние фото без загрузки: ${s.failedImages.length}</p><a href="${s.screenshot}"><img loading="lazy" src="${s.screenshot}" alt="Главная ${s.lang} ${s.width}px"></a></article>`).join('');
await fs.writeFile(path.join(out,'index.html'),`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EPIC — эталон главной, подход 1</title><style>body{margin:0;background:#1f1f1f;color:#f6f6f6;font:16px/1.5 Arial;padding:32px}h1{font-size:28px}a{color:#fe746a}select{padding:10px;border-radius:12px;font:inherit}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:24px}article{padding:16px;background:#2e2e2e;border-radius:24px}article img{display:block;width:100%;height:auto}article[hidden]{display:none}p{max-width:90ch}small{color:#bbb}</style><h1>EPIC · текущая главная · 05.10.2026</h1><p>Фиксация перед созданием библиотеки. ${r.samples.length} измерений EN/RU; 14 полных снимков. Это текущая реализация, а не предложение нового оформления.</p><p>Виджеты заменены подписанными заглушками, погодные запросы и аналитика отключены, reduced motion включён. Недоступные внешние аватары Google отмечены у каждого снимка. Локальные стили, фотографии и шрифты сохранены.</p><small>Commit ${esc(r.commit)} · <a href="baseline.json">Все измерения JSON</a> · <a href="contact-sheet.png">Обзор ключевых секций</a></small><p><label>Язык <select id="lang"><option value="all">EN + RU</option><option>en</option><option>ru</option></select></label> <label>Ширина <select id="width"><option value="all">Все</option>${[...new Set(r.samples.filter(s=>s.screenshot).map(s=>s.width))].map(w=>`<option>${w}</option>`).join('')}</select></label></p><main>${cards}</main><script>function filter(){document.querySelectorAll('article').forEach(a=>{a.hidden=(lang.value!=='all'&&a.dataset.lang!==lang.value)||(width.value!=='all'&&a.dataset.width!==width.value)})}lang.onchange=width.onchange=filter;</script></html>`);
// Crop section details from full-page images so sticky controls do not cover them.
for(const s of r.samples.filter(s=>[390,1440,2560].includes(s.width))){
 const source=sharp(path.join(out,s.screenshot));const meta=await source.metadata();
 for(const key of ['how','lessons','reviews','events']){
  const b=s.elements[key][0].rect,left=Math.max(0,Math.floor(b.x)),top=Math.max(0,Math.floor(b.y));
  await source.clone().extract({left,top,width:Math.min(meta.width-left,Math.ceil(b.width)),height:Math.min(meta.height-top,Math.ceil(b.height))}).png().toFile(path.join(out,`${s.lang}-${s.width}-${key}.png`));
 }
}
const tiles=[]; const cellW=450,cellH=570;
let i=0;
for(const lang of ['en','ru'])for(const key of ['how','lessons','reviews'])for(const width of [390,1440,2560]){
 const file=path.join(out,`${lang}-${width}-${key}.png`);
 const photo=await sharp(file).resize({width:cellW-20,height:cellH-55,fit:'inside',withoutEnlargement:true}).png().toBuffer();
 const m=await sharp(photo).metadata(),x=(i%3)*cellW,y=Math.floor(i/3)*cellH;
 const label=Buffer.from(`<svg width="450" height="40"><rect width="450" height="40" fill="#2e2e2e"/><text x="12" y="26" font-family="Arial" font-size="18" fill="#f6f6f6">${lang.toUpperCase()} ${width}px · ${key}</text></svg>`);
 tiles.push({input:label,left:x,top:y},{input:photo,left:x+Math.floor((cellW-m.width)/2),top:y+45});i++;
}
await sharp({create:{width:cellW*3,height:cellH*6,channels:3,background:'#1f1f1f'}}).composite(tiles).png().toFile(path.join(out,'contact-sheet.png'));
console.log('Viewer and contact sheet created.');


// Keep a small, portable factual baseline in docs; detailed captures stay in output.
const pick=(lang,width)=>r.samples.find(s=>s.lang===lang&&s.width===width);
const value=(lang,width,key)=>pick(lang,width).elements[key][0];
const n=s=>String(Math.round(parseFloat(s)*100)/100);
const cell=s=>String(s??'—').replaceAll('|','/').replaceAll('\n',' ');
const table=(headers,rows)=>[headers,headers.map(()=> '---'),...rows].map(row=>'| '+row.map(cell).join(' | ')+' |').join('\n');
const widths=[390,1024,1440,2560];
const typeRows=[['Заголовок How','howHeading'],['Заголовок уроков','lessonHeading'],['Текст How','howCopy'],['Описание урока EN','lessonDescription'],['Подпись CTA урока','lessonCtaLabel'],['Текст отзыва','reviewCopy'],['Вопрос FAQ','faqQuestion'],['Текст большого события EN','eventCopy']].map(([label,key])=>[label,...widths.map(w=>{const f=value('en',w,key).font;return `${n(f.size)} / ${n(f.lineHeight)}`;})]);
const shapeRows=[['Карточка How','howCard'],['Фото How','howPhoto'],['Фото урока','lessonPhoto'],['Отзыв','reviewCard'],['Событие','eventCard'],['Фото галереи','galleryTile']].map(([label,key])=>[label,...widths.map(w=>n(value('en',w,key).radius))]);
const fontRows=['howHeading','howTitle','howCopy','lessonHeading','lessonDescription','lessonCtaLabel','reviewCopy','faqQuestion','eventCopy'].map(key=>[key,...['en','ru'].map(lang=>pick(lang,1440).renderedFonts[key].map(f=>f.postScriptName).join(', '))]);
const geometryRows=[1200,1440,1920,2560,3200].map(w=>{const s=pick('en',w);return [w,s.elements.how[0].rect.width,s.elements.howHeading[0].rect.width,s.elements.howHeading[0].rect.x,s.elements.footer[0].rect.width];});
const docCapturePath=path.relative(path.resolve('docs/design'),out).split(path.sep).join('/');
const body=`# EPIC: измеренный эталон главной

Автоматически сформировано scripts/render-design-baseline.mjs. Дата проекта: 2026-10-05. Эта таблица фиксирует текущую реализацию и не заменяет [нормативный стандарт](layout-and-scale.md).

## Происхождение

- Git commit: ${r.commit}.
- Время фиксации UTC: ${r.capturedAt}.
- URL: ${r.baseUrl}; маршруты / и /ru.
- Изменения отслеживаемых файлов при начале фиксации: ${r.trackedChanges || 'отсутствовали'}.
- Chromium, deviceScaleFactor 1, viewport height 1000 CSS px, reduced motion.
- ${r.samples.length} измерений, ${r.samples.filter(s=>s.screenshot).length} полных снимков; widths: 320, 360, 390, 699, 700, 899, 900, 1024, 1199, 1200, 1440, 1920, 2560, 3200; оба языка.
- HTTP 200: ${r.samples.filter(s=>s.httpStatus===200).length}/${r.samples.length}; горизонтальное переполнение: ${r.samples.filter(s=>s.overflow).length}; pageerror: ${r.samples.reduce((sum,s)=>sum+s.pageErrors.length,0)}.

Внешние iframe заменены подписанными заглушками, weather и analytics requests отключены, видео остаётся статическим. Это изоляция изменчивых сервисов для style baseline; их рабочее содержимое и бронирование данным прогоном не проверялись. Локальные изображения и стили не заменялись.

В ${r.samples.filter(s=>s.failedImages.length).length} измерениях часть внешних Google avatars не загрузилась; все зарегистрированные failed images относятся к lh3.googleusercontent.com. Наличие арки без фото на таком снимке не является эталоном оформления. Подробный список есть в baseline.json.

## Просмотр

- [Интерактивный список полных снимков](${docCapturePath}/index.html).
- [Обзор How, Lessons и Reviews на EN/RU](${docCapturePath}/contact-sheet.png).
- [Исходные измерения и CSS selectors](${docCapturePath}/baseline.json).

Крупные фрагменты вырезаны из full-page снимков: sticky-шапка не перекрывает содержание. Full-page сохраняет шапку и messenger controls. Файлы output локальные; для другой рабочей копии воспроизвести capture и render, как описано в [README](README.md).

## Геометрия desktop, EN

Ширина контента здесь измеряется по заголовку How. Ширина footer — фактическая, а не его CSS max-width; отличается от нормативного общего края.

${table(['Окно','Композиция How','Контент How','Левый край контента','Footer main'],geometryRows)}

Предел stage на 2560 и 3200 действительно остаётся 2160 px. Карточка How на 1440: ${value('en',1440,'howCard').rect.width}×${value('en',1440,'howCard').rect.height} px; на 2560: ${value('en',2560,'howCard').rect.width}×${value('en',2560,'howCard').rect.height} px. min-height отличается от фактической высоты фото: подпись и содержание участвуют в итоговой геометрии.

## Типографика, EN

В каждой ячейке: font-size / line-height, px. Значения округлены до двух знаков. Это различные роли и рецепты, а не одна общая шкала body.

${table(['Роль',...widths.map(w=>w+' px')],typeRows)}

RU описание урока на 1440: ${n(value('ru',1440,'lessonDescription').font.size)} / ${n(value('ru',1440,'lessonDescription').font.lineHeight)}; на 2560: ${n(value('ru',2560,'lessonDescription').font.size)} / ${n(value('ru',2560,'lessonDescription').font.lineHeight)} px. RU событие на 1440: ${n(value('ru',1440,'eventCopy').font.size)} / ${n(value('ru',1440,'eventCopy').font.lineHeight)}; на 2560: ${n(value('ru',2560,'eventCopy').font.size)} / ${n(value('ru',2560,'eventCopy').font.lineHeight)} px.

## Какие шрифты реально рисуют текст

Chromium CSS.getPlatformFontsForNode на первых текущих элементах, 1440 px. Смешанный результат означает, что разные символы рисуются разными fonts. Названия PostScript у variable font могут отличаться от CSS family; это не другая гарнитура.

${table(['Элемент','EN: PostScript names','RU: PostScript names'],fontRows)}

Fallback Consolas/Arial относится к этой Windows-среде. Другие платформы могут выбрать иной системный шрифт. Указать Recursive в документации как гарантированный RU font было бы неверно. В каталоге потребуется явная языковая роль и сравнение (DS-01).

## Радиусы

Значения EN/RU совпадают в измеренных рецептах. Числа px; у капсул остаётся 999 px, у круглых controls — 50%. Автоматически превращать максимальный радиус фото в общий card token нельзя.

${table(['Поверхность',...widths.map(w=>w+' px')],shapeRows)}

Аватар: mobile/tablet 88×104 px, radius 44 44 18 18; desktop 96×112 px, radius 48 48 18 18. Тень отсутствует. Отзыв имеет padding 24×30 px во всех измеренных режимах, 4 строки, line-height 1.5. Это отдельный компонент.

## Действия

${table(['Элемент','390 px: W×H','1440 px: W×H','2560 px: W×H'],[['Урок: CTA','lessonCta'],['Арендовать','rentalCta'],['Каталог досок','rentalSecondary']].map(([label,key])=>[label,...[390,1440,2560].map(w=>{const b=value('en',w,key).rect;return b.width+'×'+b.height;})]))}

Подпись CTA урока: Montserrat, 700. Основная поверхность — коралловый градиент с границей 3 px и объёмной тенью. Secondary rental поверхность отличается по breakpoint (DS-07). Ссылка полного отзыва имеет фактическую высоту 32 px; это расхождение с целью новых controls ≥44 px, а не новое правило (DS-05).

## Ограничения и следующий шаг

- Capture фиксирует только начальные урок/альбом и закрытый FAQ. Остальные content cases и interaction states проверить в каталоге во втором подходе.
- Обычное движение, live widget data, booking/rental и аналитика не проверены этим прогоном.
- Внешние аватары нестабильны; локальные фото сохранились.
- Полный список различий и правила их обработки: [decisions-and-rollout.md](decisions-and-rollout.md).
`;
await fs.writeFile(path.resolve('docs/design/homepage-baseline.md'),body);
console.log('Portable baseline summary written.');

# Homepage Copy Map — Epic Surf School

Purpose:
This file is for editing homepage copy only. Edit only the "New RU" and "New EN" columns, then return this file for implementation.

Do not edit partner page copy here.

## Copy Table

| Section | Key / Code location | Current RU | New RU | Current EN | New EN | Notes |
|---|---|---|---|---|---|---|
| Header / navigation | `translations.navLessons` | Уроки |  | Lessons |  | Header nav link |
| Header / navigation | `translations.navHow` | Процесс |  | Process |  | Header nav link |
| Header / navigation | `translations.navForecast` | Прогноз |  | Forecast |  | Header nav link |
| Header / navigation | `translations.navEvents` | Эвенты |  | Events |  | Header nav link |
| Header / navigation | `translations.navLocation` | Карта |  | Map |  | Header nav link |
| Header / navigation | `Header.jsx partnersLabel` | Для партнеров |  | Partners |  | Hardcoded in homepage header; links to partner page but is visible on homepage |
| Header / navigation | `translations.btnBook` | Записаться |  | Book Now |  | Header CTA and lesson card CTA |
| Header / navigation | `Header.jsx languageLabel` | EN |  | RU |  | Hardcoded language switch label |
| Hero | `Hero.jsx heroTitle` | Поймай свою EPIC волну в Дананге |  | Catch your EPIC wave in Da Nang |  | Hardcoded sr-only H1; current `translations.heroTitle*` values are not used by `Hero.jsx` |
| Hero | `Hero.jsx heroSubtitle` | ШКОЛА СЕРФИНГА В ДА НАНГЕ - МЕСТО, ГДЕ ЖИВУТ СЕРФИНГОМ |  | SURF SCHOOL IN DA NANG — A PLACE BUILT AROUND SURFING |  | Hardcoded visible hero subtitle |
| Hero | `translations.heroTitle` | Поймай свою |  | Catch Your |  | Present in translations but not currently rendered by `Hero.jsx` |
| Hero | `translations.heroTitleEpic` | Epic |  | Epic |  | Present in translations but not currently rendered by `Hero.jsx` |
| Hero | `translations.heroTitleEnd` | волну в Дананге |  | Wave in Da Nang |  | Present in translations but not currently rendered by `Hero.jsx` |
| Hero / footer | `translations.heroSub` | ШКОЛА СЕРФИНГА В ДАНАНГЕ - МЕСТО, ГДЕ ЖИВУТ СЕРФИНГОМ |  | Best surf school on My Khe Beach. Expert coaching, top-tier gear, and the best community. |  | Rendered in footer intro; not rendered by `Hero.jsx` |
| Why Epic | `translations.whyItems[0].title` | Сертифицированные инструкторы |  | Certified Instructors |  | Feature card |
| Why Epic | `translations.whyItems[0].desc` | Методичное обучение для уверенного и быстрого прогресса. |  | Structured coaching for fast, confident progress. |  | Feature card |
| Why Epic | `translations.whyItems[1].title` | Персональный подход |  | Personal Focus |  | Feature card |
| Why Epic | `translations.whyItems[1].desc` | Внимание к каждому ученику и обучение с учётом уровня твоей подготовки. |  | Attention to every student, with coaching adapted to your current level. |  | Feature card |
| Why Epic | `translations.whyItems[2].title` | Идеальные условия |  | Perfect Conditions |  | Feature card |
| Why Epic | `translations.whyItems[2].desc` | Подбираем локации в зависимости от условий в море и уровня твоего катания. |  | We choose spots based on ocean conditions and your riding level. |  | Feature card |
| Why Epic | `translations.whyItems[3].title` | Уверенный старт |  | Confident Start |  | Feature card |
| Why Epic | `translations.whyItems[3].desc` | Ты поймаешь свою волну уже на первом уроке. |  | You will catch your first wave during your first lesson. |  | Feature card |
| Process / how it works | `translations.howTitle` | Как проходят |  | How it |  | Section title |
| Process / how it works | `translations.howTitleEnd` | уроки |  | works |  | Section title accent |
| Process / how it works | `translations.howIntro` | Мы разработали систему обучения, которая позволяет 90% новичков встать на доску уже на первом занятии. Ваш прогресс и безопасность — наш главный приоритет. |  | We have developed a teaching system that allows 90% of beginners to stand up on a board during their very first lesson. Your safety and progress are our priority. |  | Section subtitle |
| Process / how it works | `translations.howSteps[0].title` | Встреча |  | Meet & Gear Up |  | Step card |
| Process / how it works | `translations.howSteps[0].time` | 10 мин |  | 10 min |  | Step badge |
| Process / how it works | `translations.howSteps[0].desc` | Знакомство, подготовка и подбор серфборда под ваш уровень. |  | Meet your coach, gear up, and get the perfect surfboard for your level. |  | Step description |
| Process / how it works | `translations.howSteps[1].title` | Подготовка на берегу |  | Beach Theory |  | Step card |
| Process / how it works | `translations.howSteps[1].time` | 15 мин |  | 15 min |  | Step badge |
| Process / how it works | `translations.howSteps[1].desc` | Основы сёрфинга и правила безопасности. Отработка базовых упражнений: тейк-офф (вставание на доску), повороты, генерация скорости. |  | Surfing basics and ocean safety. Practicing core movements: pop-up, turning, and speed generation. |  | Step description |
| Process / how it works | `translations.howSteps[2].title` | Практика в воде |  | Ocean Practice |  | Step card |
| Process / how it works | `translations.howSteps[2].time` | 75 мин |  | 75 min |  | Step badge |
| Process / how it works | `translations.howSteps[2].desc` | Ловим волны под контролем инструктора, корректируем ошибки и наслаждаемся сёрфингом. |  | Catching waves under your instructor's guidance, fixing mistakes, and enjoying the ride. |  | Step description |
| Process / how it works | `translations.howSteps[3].title` | Рекомендации |  | Review & Tips |  | Step card |
| Process / how it works | `translations.howSteps[3].time` | 10 мин |  | 10 min |  | Step badge |
| Process / how it works | `translations.howSteps[3].desc` | Разбор урока и домашнее задание для дальнейшего прогресса. |  | Session review and personalized homework for your continuous progress. |  | Step description |
| Process / how it works | `HowItWorks.jsx hiddenText` | Тут будет какой-то текст, когда товарищи серферы его сформулируют. |  | Тут будет какой-то текст, когда товарищи серферы его сформулируют. |  | Hardcoded expanded text; same Russian text appears in EN page |
| Lessons | `translations.sectionTitle` | Выбери свой |  | Choose Your |  | Section title |
| Lessons | `translations.sectionTitleRide` | формат |  | Ride |  | Section title accent |
| Lessons | `translations.cards[0].title` | Групповой урок |  | Group Lesson |  | Lesson card |
| Lessons | `translations.cards[0].badge` | Популярно |  | Most Popular |  | Lesson card badge |
| Lessons | `translations.cards[0].desc` | Идеально для новичков. До 4-х человек на инструктора. |  | Perfect for beginners. Up to 4 people per instructor. |  | Lesson card description |
| Lessons | `translations.cards[0].price` | 900,000 VND |  | 900,000 VND |  | Lesson card price |
| Lessons | `translations.cards[1].title` | Сплит урок |  | Split Lesson |  | Lesson card |
| Lessons | `translations.cards[1].badge` | Выгодно |  | Best Value |  | Lesson card badge |
| Lessons | `translations.cards[1].desc` | Для 2-х человек. Больше внимания тренера. Цена за двоих. |  | For 2 people. More coach attention. Price for two. |  | Lesson card description |
| Lessons | `translations.cards[1].price` | 2,500,000 VND |  | 2,500,000 VND |  | Lesson card price |
| Lessons | `translations.cards[2].title` | Приватный урок |  | Private Lesson |  | Lesson card |
| Lessons | `translations.cards[2].badge` | Премиум |  | Premium |  | Lesson card badge |
| Lessons | `translations.cards[2].desc` | Индивидуальная тренировка для быстрого прогресса. |  | Individual coaching for faster progress. |  | Lesson card description |
| Lessons | `translations.cards[2].price` | 1,800,000 VND |  | 1,800,000 VND |  | Lesson card price |
| Lessons | `translations.cards[3].title` | Серф-скейт |  | Surf-skate |  | Lesson card |
| Lessons | `translations.cards[3].badge` | Для базы |  | Fundamentals |  | Lesson card badge |
| Lessons | `translations.cards[3].desc` | Отработка баланса, поворотов и техники на суше. |  | Practice balance, turns and surf technique on land. |  | Lesson card description |
| Lessons | `translations.cards[3].price` | 600,000 VND |  | 600,000 VND |  | Lesson card price |
| Lessons | `translations.cards[4].title` | Line-up / Pro |  | Line-up / Pro |  | Lesson card |
| Lessons | `translations.cards[4].badge` | Для опытных |  | Advanced |  | Lesson card badge |
| Lessons | `translations.cards[4].desc` | Выход на лайнап с гидом. Поиск лучших пиков. |  | Guided line-up session and the best peak search. |  | Lesson card description |
| Lessons | `translations.cards[4].price` | 2,400,000 VND |  | 2,400,000 VND |  | Lesson card price |
| Lessons / messenger CTA | `Lessons.jsx lessonMessages.ru.surf_skate` / `lessonMessages.en.surf_skate` | Здравствуйте! Хочу записаться на surf-skate урок. Подскажите, пожалуйста, доступное время и детали. |  | Hi! I'd like to book a surf-skate lesson. Could you please send me the available times and details? |  | Hardcoded WhatsApp prefill for non-booking lesson |
| Lessons / messenger CTA | `Lessons.jsx lessonMessages.ru.lineup_pro` / `lessonMessages.en.lineup_pro` | Здравствуйте! Хочу записаться на Line-up / Pro урок. У меня уже есть опыт серфинга. Подскажите, пожалуйста, доступное время и детали. |  | Hi! I'd like to book a Line-up / Pro lesson. I already have surfing experience. Could you please send me the available times and details? |  | Hardcoded WhatsApp prefill for non-booking lesson |
| Included | `translations.includedLabel` | Всё включено |  | Included |  | Passed from `LandingPage` but not rendered by current `IncludedBento.jsx` |
| Included | `translations.includedTitle` | Всё включено |  | Everything included |  | Section title |
| Included | `translations.includedSubtitle` | Мы подготовим всё необходимое для урока: доску, лайкру, защиту от солнца и фото/видео. |  | We prepare the essentials for your lesson: board, rashguard, sun protection and photos/videos. |  | Section description |
| Included | `translations.includedAccentTitle` | Нет снаряжения?<br>Не проблема. |  | No gear?<br>No problem. |  | Accent block; newline in source |
| Included | `translations.includedAccentDesc` | Всё, что нужно для первого занятия, уже входит в стоимость. |  | Everything you need for the first session is already included. |  | Accent block |
| Included | `translations.includedItems[0].label` | Доска |  | Board |  | Bento item |
| Included | `translations.includedItems[0].desc` | Подберём softboard под твой уровень, рост и вес. |  | Softboard matched to your level, height and weight. |  | Bento item |
| Included | `translations.includedItems[1].label` | Лайкра |  | Rashguard |  | Bento item |
| Included | `translations.includedItems[1].desc` | Чистая лайкра для защиты от солнца и натирания. |  | Clean lycra for sun and rash protection. |  | Bento item |
| Included | `translations.includedItems[2].label` | Zinc SPF |  | Zinc SPF |  | Bento item |
| Included | `translations.includedItems[2].desc` | Плотная защита лица от тропического солнца. |  | Strong face protection for tropical sun. |  | Bento item |
| Included | `translations.includedItems[3].label` | Фото / видео |  | Photos / videos |  | Bento item |
| Included | `translations.includedItems[3].desc` | Снимаем лучшие моменты твоего урока. |  | We capture the best moments of your lesson. |  | Bento item |
| Rentals | `Rentals.jsx hardcoded badge` | BOARD RENTAL |  | BOARD RENTAL |  | Hardcoded visible badge; same text in RU/EN |
| Rentals | `translations.rentalBadge` | Gear up |  | Professional Gear |  | Present in translations but not rendered by current `Rentals.jsx` |
| Rentals | `translations.rentalTitle` | Аренда |  | Surf Board |  | Section title |
| Rentals | `translations.rentalTitleSurf` | Досок |  | Rentals |  | Section title accent |
| Rentals | `translations.rentalDesc` | Мы предоставляем премиальные софт-топы, лонгборды и шортборды. Поможем подобрать доску под текущие условия. |  | We provide premium soft-tops, longboards, and performance shortboards. |  | Fallback description if `rentalDescPrimary` missing |
| Rentals | `translations.rentalDescPrimary` | У нас можно арендовать мягкие доски для новичков, лонгборды и жёсткие доски для уверенного катания. |  | You can rent soft boards for beginners, longboards, and hard boards for confident riding. |  | Rendered section description |
| Rentals | `translations.rentalDescSecondary` | Поможем подобрать доску, привезём к месту катания и дадим всё необходимое для комфортной сессии. |  | We will help choose the right board, bring it to your surf spot, and provide everything you need for a comfortable session. |  | Present in translations but not rendered by current `Rentals.jsx` |
| Rentals | `Rentals.jsx image overlay title` | EPIC SURF RENTAL |  | EPIC SURF RENTAL |  | Hardcoded desktop image overlay |
| Rentals | `Rentals.jsx image overlay subtitle` | Boards, rashguards & local advice |  | Boards, rashguards & local advice |  | Hardcoded desktop image overlay; same text in RU/EN |
| Rentals | `translations.boardTypes[0]` | Софтборды |  | Softboards |  | Board image alt / carousel aria-label |
| Rentals | `translations.boardTypes[1]` | Лонгборды |  | Longboards |  | Board image alt / carousel aria-label |
| Rentals | `translations.boardTypes[2]` | Малибу |  | Malibus |  | Board image alt / carousel aria-label |
| Rentals | `translations.boardTypes[3]` | Шортборды |  | Shortboards |  | Board image alt / carousel aria-label |
| Rentals | `translations.featureDelivery` | Привозим на спот |  | Spot Delivery |  | Feature tile |
| Rentals | `translations.featureDeliveryDesc` | Доставим доску туда, где удобно кататься. |  | We will bring the board to the spot where it is convenient to surf. |  | Feature tile mobile description |
| Rentals | `translations.featureSizes` | Все размеры |  | All Sizes |  | Feature tile |
| Rentals | `translations.featureSizesDesc` | Подберём доску под уровень и условия. |  | We will match the board to your level and the conditions. |  | Feature tile mobile description |
| Rentals | `translations.featureLycra` | Лайкры и цинк |  | Rashguards & Zinc |  | Feature tile |
| Rentals | `translations.featureLycraDesc` | Дадим базовую защиту от солнца. |  | We will provide basic sun protection. |  | Feature tile mobile description |
| Rentals | `translations.featureWetsuits` | Гидрокостюмы |  | Wetsuits |  | Feature tile |
| Rentals | `translations.featureWetsuitsDesktop` | Гидро-<br>костюмы |  | Wet-<br>suits |  | Desktop feature tile; newline in source |
| Rentals | `translations.featureWetsuitsDesc` | Есть варианты для прохладных дней. |  | Options available for cooler days. |  | Feature tile mobile description |
| Rentals | `translations.rentalPrice` | от 250,000 VND |  | from 250,000 VND |  | Price label |
| Rentals | `translations.rentalUnit` | Сессия / 2 часа |  | 2 hour / Session |  | Price unit |
| Rentals | `translations.rentalBtn` | Арендовать |  | Rent Now |  | Rental CTA |
| Rentals | `Rentals.jsx arrow aria-label` | Previous board |  | Previous board |  | Hardcoded aria-label; same text in RU/EN |
| Rentals | `Rentals.jsx arrow aria-label` | Next board |  | Next board |  | Hardcoded aria-label; same text in RU/EN |
| Forecast / location | `translations.forecastTitle` | Условия на |  | Current |  | Forecast heading |
| Forecast / location | `translations.forecastTitleSpot` | Сегодня |  | Forecast |  | Forecast heading |
| Forecast / location | `translations.forecastPeriod` | Период |  | Period |  | Metric label |
| Forecast / location | `translations.forecastWind` | Ветер |  | Wind |  | Metric label |
| Forecast / location | `translations.forecastDir` | Направление |  | Direction |  | Metric label |
| Forecast / location | `translations.forecastWater` | Вода |  | Water |  | Metric label |
| Forecast / location | `translations.forecastStatusGood` | Идеально для обучения |  | Perfect for beginners |  | Forecast status |
| Forecast / location | `translations.forecastStatusHigh` | Только для опытных |  | Advanced surfers only |  | Forecast status |
| Forecast / location | `Forecast.jsx t.forecastWaveHeight` |  |  |  |  | Key is referenced but not defined in translations |
| Forecast / location | `Forecast.jsx mobile map CTA` | Активировать карту |  | Activate map |  | Hardcoded conditional text |
| Forecast / location | `Forecast.jsx iframe title` | Windy Forecast |  | Windy Forecast |  | Hardcoded iframe title; same text in RU/EN |
| Forecast / location | `translations.locationTitle` | Найди наш |  | Find the |  | Present in translations but not rendered by current footer/location component |
| Forecast / location | `translations.locationTitleSpot` | Спот |  | Spot |  | Present in translations but not rendered by current footer/location component |
| Forecast / location | `translations.locationAddress` | Пляж Микхе, Дананг |  | My Khe Beach, Da Nang |  | Footer location text |
| Forecast / location | `translations.locationLandmark` | Ищите красный флаг EPIC SURF на песке напротив TMS Hotel |  | Look for the Red EPIC SURF flag opposite TMS Hotel |  | Present in translations but not rendered by current footer/location component |
| Reviews | `translations.reviewsTitle` | Лучшие вайбы в Дананге |  | The best surf vibes |  | Section title |
| Reviews | `translations.reviewsLink` | Читать все отзывы на Google Maps |  | Read more on Google Maps |  | Reviews CTA |
| Reviews | `translations.reviewsList[0].name` | Evgenia |  | Evgenia |  | Review card |
| Reviews | `translations.reviewsList[0].text` | Отличные уроки! Ребята влюбили меня в серф! Очень понятные объяснения, много практики. 🔥 |  | Great lessons! The team made us fall in love with surfing! 🔥 |  | Review card |
| Reviews | `translations.reviewsList[0].date` | Неделю назад |  | 1 week ago |  | Review card |
| Reviews | `translations.reviewsList[1].name` | Дмитрий Харламов |  | Dmitry Kharlamov |  | Review card |
| Reviews | `translations.reviewsList[1].text` | Отличная команда! Паша — очень крутой инструктор с чувством юмора! 👍 |  | Excellent team! Pasha is a very cool instructor! 👍 |  | Review card |
| Reviews | `translations.reviewsList[1].date` | 2 недели назад |  | 2 weeks ago |  | Review card |
| Reviews | `translations.reviewsList[2].name` | Peter Thanh |  | Peter Thanh |  | Review card |
| Reviews | `translations.reviewsList[2].text` | Despite of the bad weather the instructor was very friendly and teach very well. 👌 |  | Despite of the bad weather the instructor was friendly. 👌 |  | Review card |
| Reviews | `translations.reviewsList[2].date` | Месяц назад |  | 1 month ago |  | Review card |
| FAQ | `translations.faqTitle` | Вопросы и |  | FAQ |  | Section title |
| FAQ | `translations.faqTitleEnd` | Ответы |  |  |  | Section title accent; empty in EN |
| FAQ | `translations.faqItems[0].q` | Нужно ли уметь плавать? |  | Do I need to be a strong swimmer? |  | FAQ question |
| FAQ | `translations.faqItems[0].a` | Желательно уметь держаться на воде. Уроки проходят на безопасной глубине, а инструктор всегда рядом. |  | Basic skills are enough. Lessons are held in safe depths. |  | FAQ answer |
| FAQ | `translations.faqItems[1].q` | Что брать с собой? |  | What should I bring? |  | FAQ question |
| FAQ | `translations.faqItems[1].a` | Купальник/плавки, полотенце, солнцезащитный крем. Лайкру и цинк мы дадим. |  | Swimwear, towel, and sunscreen. We provide the rest. |  | FAQ answer |
| FAQ | `translations.faqItems[2].q` | В какое время лучше приходить? |  | When is the best time? |  | FAQ question |
| FAQ | `translations.faqItems[2].a` | Зависит от приливов. Напишите нам — мы подскажем лучшее время на завтра. |  | Depends on tides. Text us for tomorrow's forecast. |  | FAQ answer |
| FAQ | `translations.faqItems[3].q` | Сколько нужно заниматься, чтобы встать на доску? |  | How long does it take to stand up on the board? |  | FAQ question |
| FAQ | `translations.faqItems[3].a` | Большинство уезжает уже на первом занятии, все в ваших руках. |  | Most students get riding during the first lesson, but it is in your hands. |  | FAQ answer |
| Events | `translations.eventsTitle` | Наши эвенты |  | Our Events |  | Section title |
| Events | `translations.eventsIntro` | Активности Epic Surf School: фестивали, дни рождения школы, совместные катания и встречи нашего серф-комьюнити. |  | Epic Surf School activities: festivals, school birthdays, community rides, beach meetups, and surf sessions with our crew. |  | Present in translations but not rendered by current `Events.jsx` |
| Events | `translations.eventsItems[0].title` | Da Nang Surfing Open 2025 |  | Da Nang Surfing Open 2025 |  | Event card |
| Events | `translations.eventsItems[0].type` | Фестиваль |  | Festival |  | Event card badge |
| Events | `translations.eventsItems[0].desc` | Большой день на пляже: серф-контест, музыка, фото, друзья школы и много волн. |  | A full beach day with surf contests, music, photos, school friends, and plenty of waves. |  | Event card |
| Events | `translations.eventsItems[0].buttonLabel` | Смотреть фото |  | View photos |  | Event gallery CTA |
| Events | `translations.eventsItems[1].title` | День рождения школы |  | School birthday |  | Event card |
| Events | `translations.eventsItems[1].type` | Community |  | Community |  | Event card badge |
| Events | `translations.eventsItems[1].desc` | Празднуем вместе с учениками, инструкторами и друзьями Epic Surf. |  | We celebrate together with students, instructors, and friends of Epic Surf. |  | Event card |
| Events | `translations.eventsItems[1].buttonLabel` | Смотреть фото |  | View photos |  | Event gallery CTA |
| Events | `translations.eventsItems[2].title` | Sunset surf sessions |  | Sunset surf sessions |  | Event card |
| Events | `translations.eventsItems[2].type` | Регулярно |  | Regular |  | Event card badge |
| Events | `translations.eventsItems[2].desc` | Вечерние катания, мягкий свет, фото сессии и спокойный вайб после уроков. |  | Evening rides, soft light, photo moments, and a relaxed after-lesson vibe. |  | Event card |
| Events | `translations.eventsItems[2].buttonLabel` | Смотреть фото |  | View photos |  | Event gallery CTA |
| Events | `translations.eventsItems[3].title` | Community rides |  | Community rides |  | Event card |
| Events | `translations.eventsItems[3].type` | Meet-up |  | Meet-up |  | Event card badge |
| Events | `translations.eventsItems[3].desc` | Совместные выезды и сессии для учеников, которые хотят больше практики. |  | Shared trips and sessions for students who want more water time and practice. |  | Event card |
| Events | `translations.eventsItems[3].buttonLabel` | Смотреть фото |  | View photos |  | Event gallery CTA |
| Gallery | `Gallery.jsx hardcoded title` | Epic |  | Epic |  | Hardcoded section title; same text in RU/EN |
| Gallery | `Gallery.jsx hardcoded title accent` | Moments |  | Moments |  | Hardcoded section title; same text in RU/EN |
| Gallery | `translations.galleryBadge` | Комьюнити и вайб |  | Community & Vibe |  | Present in translations but not rendered by current `Gallery.jsx` |
| Gallery | `translations.galleryInstagram` | Следи за нами в Instagram |  | Follow us on Instagram |  | Instagram CTA |
| Gallery | `gallery.js getEventGalleryGroups[0].label` | All |  | All |  | Hardcoded gallery filter; same text in RU/EN |
| Gallery | `gallery.js getEventGalleryGroups[1].label` | Da Nang Surfing Open 2025 |  | Da Nang Surfing Open 2025 |  | Hardcoded gallery filter |
| Gallery | `gallery.js getEventGalleryGroups[2].label` | ДР школы |  | Birthday |  | Gallery filter |
| Gallery | `gallery.js getEventGalleryGroups[3].label` | Sunset |  | Sunset |  | Hardcoded gallery filter |
| Gallery | `gallery.js getEventGalleryGroups[4].label` | Community |  | Community |  | Hardcoded gallery filter |
| Gallery | `Gallery.jsx galleryAlt` | `{activeGalleryGroup.label} photo {idx + 1} - Epic Surf School Da Nang` |  | `{activeGalleryGroup.label} photo {idx + 1} - Epic Surf School Da Nang` |  | Hardcoded image alt template; same text in RU/EN except group label |
| Footer | `Footer.jsx partnersLabel` | Для партнёров |  | Partners |  | Hardcoded footer link; links to partner page but is visible on homepage |
| Footer | `Footer.jsx telegram channel label` | TG Channel |  | TG Channel |  | Hardcoded footer social CTA |
| Footer | `Footer.jsx copyright` | © 2026 Epic Surf School - Ride Every Day |  | © 2026 Epic Surf School - Ride Every Day |  | Hardcoded footer copyright; same text in RU/EN |
| Footer | `Footer.jsx social aria-label` | Epic Surf School Instagram |  | Epic Surf School Instagram |  | Hardcoded aria-label |
| Footer | `Footer.jsx social aria-label` | Epic Surf School Facebook |  | Epic Surf School Facebook |  | Hardcoded aria-label |
| Footer | `Footer.jsx social aria-label` | Epic Surf School YouTube |  | Epic Surf School YouTube |  | Hardcoded aria-label |
| Footer | `Footer.jsx social aria-label` | Epic Surf School Threads |  | Epic Surf School Threads |  | Hardcoded aria-label |
| Footer | `Footer.jsx social aria-label/title` | Epic Surf School Telegram direct chat |  | Epic Surf School Telegram direct chat |  | Hardcoded aria-label |
| Footer | `Footer.jsx social aria-label/title` | Epic Surf School official Telegram channel |  | Epic Surf School official Telegram channel |  | Hardcoded aria-label |
| Footer / location | `Footer.jsx map iframe title` | Epic Surf School Da Nang location map |  | Epic Surf School Da Nang location map |  | Hardcoded iframe title |
| Floating messenger | `MessengerFab.jsx message` | Привет! Хочу задать вопрос про Epic Surf School. |  | Hi! I have a question about Epic Surf School. |  | Hardcoded messenger prefill text |
| Floating messenger | `MessengerFab.jsx aria-label` | WhatsApp chat |  | WhatsApp chat |  | Hardcoded aria-label |
| Floating messenger | `MessengerFab.jsx aria-label` | Telegram chat |  | Telegram chat |  | Hardcoded aria-label |
| Floating messenger | `MessengerFab.jsx aria-label` | Zalo chat |  | Zalo chat |  | Hardcoded aria-label |
| Booking modal | `translations.modalTitle` | Запись |  | Booking |  | Booking modal title |
| Booking modal | `BookingModal.jsx link text` | Open booking in new tab |  | Open booking in new tab |  | Hardcoded booking modal link; same text shown in RU/EN |
| Booking modal | `BookingModal.jsx iframe title` | Booking |  | Booking |  | Hardcoded iframe title |
| Booking modal | `BookingModal.jsx close aria-label` | Close booking modal |  | Close booking modal |  | Hardcoded aria-label |
| Rental modal | `translations.rentalModalTitle` | Забронировать аренду |  | Book your rental |  | Rental modal title |
| Rental modal | `translations.rentalModalSub` | Выберите удобный мессенджер. Мы ответим вам в течение 5 минут. |  | Choose your preferred messenger. We will reply within 5 minutes. |  | Rental modal subtitle |
| Rental modal | `translations.msgRental` | Привет! Хочу забронировать аренду доски в Epic Surf. |  | Hi! I want to book a surfboard rental at Epic Surf. |  | Present in translations but current `RentalModal.jsx` uses hardcoded `message` instead |
| Rental modal | `RentalModal.jsx message` | Привет! Хочу арендовать доску для серфинга. |  | Hi! I want to rent a surfboard. |  | Hardcoded messenger prefill |
| Rental modal | `RentalModal.jsx messenger labels` | WhatsApp |  | WhatsApp |  | Hardcoded modal button label |
| Rental modal | `RentalModal.jsx messenger labels` | Telegram |  | Telegram |  | Hardcoded modal button label |
| Rental modal | `RentalModal.jsx messenger labels` | Zalo |  | Zalo |  | Hardcoded modal button label |
| SEO / metadata | `siteConfig.name` | Epic Surf School Da Nang |  | Epic Surf School Da Nang |  | Shared site metadata and structured data |
| SEO / metadata | `siteConfig.shortName` | Epic Surf |  | Epic Surf |  | Shared metadata template |
| SEO / metadata | `siteConfig.address.streetAddress` | My Khe Beach |  | My Khe Beach |  | Structured data address |
| SEO / metadata | `siteConfig.address.addressLocality` | Da Nang |  | Da Nang |  | Structured data address |
| SEO / metadata | `siteConfig.ogImage alt` | Da Nang Surfing Open 2025 by Epic Surf School |  | Da Nang Surfing Open 2025 by Epic Surf School |  | Open Graph image alt |
| SEO / metadata | `seoLocales.ru.title` / `seoLocales.en.title` | Epic Surf School Da Nang \| Уроки серфинга и аренда досок |  | Epic Surf School Da Nang \| Surf Lessons & Board Rentals |  | Homepage SEO title |
| SEO / metadata | `seoLocales.ru.description` / `seoLocales.en.description` | Epic Surf School Da Nang: уроки серфинга, аренда досок и серф-комьюнити на пляже My Khe в Дананге, Вьетнам. |  | Surf lessons, board rentals and surf community on My Khe Beach in Da Nang, Vietnam. |  | Homepage SEO description |
| SEO / metadata | `seoLocales.ru.keywords` / `seoLocales.en.keywords` | серфинг Дананг; уроки серфинга Дананг; аренда досок Дананг; серф школа Дананг; серфинг My Khe; Epic Surf School |  | surf school Da Nang; surf lessons Da Nang; surfboard rental Da Nang; My Khe Beach surf; beginner surf lessons Vietnam; Da Nang surf community |  | Homepage SEO keywords |
| SEO / metadata | `seoLocales.ru.faqItems[0].question` / `seoLocales.en.faqItems[0].question` | Сколько нужно заниматься, чтобы встать на доску? |  | How long does it take to stand up on the board? |  | Structured data FAQ |
| SEO / metadata | `seoLocales.ru.faqItems[0].answer` / `seoLocales.en.faqItems[0].answer` | Большинство учеников уезжает уже на первом занятии, все в ваших руках. |  | Most students get riding during the first lesson, but it is in your hands. |  | Structured data FAQ; RU differs from visible FAQ |
| SEO / metadata | `seoLocales.ru.faqItems[1].question` / `seoLocales.en.faqItems[1].question` | Нужен ли опыт для первого урока серфинга? |  | Do I need experience for my first surf lesson? |  | Structured data FAQ |
| SEO / metadata | `seoLocales.ru.faqItems[1].answer` / `seoLocales.en.faqItems[1].answer` | Нет. Мы подбираем доску, спот и темп занятия под уровень ученика. |  | No. We choose the board, spot and lesson pace based on your current level. |  | Structured data FAQ |
| SEO / metadata | `seoLocales.ru.faqItems[2].question` / `seoLocales.en.faqItems[2].question` | Можно ли арендовать доску в Epic Surf School? |  | Can I rent a surfboard at Epic Surf School? |  | Structured data FAQ |
| SEO / metadata | `seoLocales.ru.faqItems[2].answer` / `seoLocales.en.faqItems[2].answer` | Да. Мы сдаем софтборды, лонгборды, малибу и шортборды для разных условий. |  | Yes. We rent soft-tops, longboards, malibu boards and shortboards for different conditions. |  | Structured data FAQ |
| SEO / structured data | `buildStructuredData knowsAbout[]` | Surf lessons; Surfboard rental; Beginner surfing; My Khe Beach; Da Nang surfing |  | Surf lessons; Surfboard rental; Beginner surfing; My Khe Beach; Da Nang surfing |  | Hardcoded structured data; same in RU/EN |
| SEO / structured data | `buildStructuredData Service name/serviceType` | Surf lessons in Da Nang; Surf lessons; Surfboard rentals in Da Nang; Surfboard rental |  | Surf lessons in Da Nang; Surf lessons; Surfboard rentals in Da Nang; Surfboard rental |  | Hardcoded structured data; same in RU/EN |


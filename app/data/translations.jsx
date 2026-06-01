import { ShieldCheck, Users } from "lucide-react";
import { WhyBeachIcon, WhyMapV2Icon } from "../components/Icons";

export const translations = {
    ru: {
      howTitle: "Как проходят",
      howTitleEnd: "уроки",
      howIntro: "Мы проводим обучение серфингу во Вьетнаме по надежной методике. С нами вы сможете уверенно встать на доску, поймать первую волну и кайфануть от океана на первом же уроке. Ваш прогресс и безопасность - наш главный приоритет.",

    
      rentalModalTitle: "Забронировать аренду",
      rentalModalSub: "Выберите удобный мессенджер. Мы ответим вам в течение 5 минут.",
      msgRental: "Привет! Хочу забронировать аренду доски в Epic Surf.",
      includedLabel: "Всё включено",
      includedTitle: "Всё включено",
      includedSubtitle: "Мы подготовим всё необходимое для урока: доску, лайкру, защиту от солнца и фото/видео.",
      includedAccentTitle: "Нет снаряжения?\nНе проблема.",
      includedAccentDesc: "Всё, что нужно для первого занятия, уже входит в стоимость.",
      includedItems: [
        { icon: "board", label: "Доска", desc: "Подберём softboard под твой уровень, рост и вес." },
        { icon: "rashguard", label: "Лайкра", desc: "Чистая лайкра для защиты от солнца и натирания." },
        { icon: "zinc", label: "Zinc SPF", desc: "Плотная защита лица от тропического солнца." },
        { icon: "camera", label: "Фото / видео", desc: "Снимаем лучшие моменты твоего урока." }
      ],
      whyItems: [
        { icon: <ShieldCheck size={40} />, title: "Сертифицированные инструкторы", desc: "Методичное обучение для уверенного и быстрого прогресса." },
        { icon: <Users size={40} />, title: "Персональный подход", desc: "Внимание к каждому ученику и обучение с учётом уровня твоей подготовки." },
        { icon: <WhyBeachIcon size={40} />, title: "Идеальные условия", desc: "Подбираем локации в зависимости от условий в море и уровня твоего катания." },
        { icon: <WhyMapV2Icon size={40} />, title: "Уверенный старт", desc: "Ты поймаешь свою волну уже на первом уроке." }
      ],
      navLessons: "Уроки", navRentals: "Аренда", navHow: "Процесс", navForecast: "Прогноз", navEvents: "Эвенты", navLocation: "Карта", btnBook: "Записаться",
      heroTitle: "Поймай свою", heroTitleEpic: "Epic", heroTitleEnd: "волну в Дананге",
      heroSub: "ШКОЛА СЕРФИНГА В ДАНАНГЕ - МЕСТО, ГДЕ ЖИВУТ СЕРФИНГОМ",
      sectionTitle: "Выбери свой", sectionTitleRide: "формат",
      rentalBadge: "Gear up", rentalTitle: "Аренда", rentalTitleSurf: "Досок",
      rentalDesc: "Мы предоставляем премиальные софт-топы, лонгборды и шортборды. Поможем подобрать доску под текущие условия.",
      rentalDescPrimary: "У нас можно арендовать мягкие доски для новичков, лонгборды и жёсткие доски для уверенного катания.",
      rentalDescSecondary: "Поможем подобрать доску, привезём к месту катания и дадим всё необходимое для комфортной сессии.",
      rentalPrice: "от 250,000 VND", rentalUnit: "Сессия / 2 часа", rentalBtn: "Арендовать",
      reviewsTitle: "Лучшие вайбы в Дананге", reviewsLink: "Читать все отзывы на Google Maps",
      galleryBadge: "Комьюнити и вайб",
      galleryInstagram: "Следи за нами в Instagram",
      eventsTitle: "Наши эвенты",
      eventsIntro: "Активности Epic Surf School: фестивали, дни рождения школы, совместные катания и встречи нашего серф-комьюнити.",
      eventsItems: [
        { title: "Da Nang Surfing Open 2025", type: "Фестиваль", desc: "Большой день на пляже: серф-контест, музыка, фото, друзья школы и много волн.", image: "/gallery/events/danang-open-2026.webp", galleryKey: "surf-fest", imageClass: "object-cover object-center", buttonLabel: "Смотреть фото" },
        { title: "День рождения школы", type: "Community", desc: "Празднуем вместе с учениками, инструкторами и друзьями Epic Surf.", image: "/gallery/events/school-birthday.webp", galleryKey: "birthday", imageClass: "object-cover object-center", buttonLabel: "Смотреть фото" },
        { title: "Sunset surf sessions", type: "Регулярно", desc: "Вечерние катания, мягкий свет, фото сессии и спокойный вайб после уроков.", image: "/gallery/events/sunset-surf.webp", galleryKey: "sunset", imageClass: "object-cover object-center", buttonLabel: "Смотреть фото" },
        { title: "Community rides", type: "Meet-up", desc: "Совместные выезды и сессии для учеников, которые хотят больше практики.", image: "/gallery/events/community-rides.webp", galleryKey: "community", imageClass: "object-cover object-center", buttonLabel: "Смотреть фото" }
      ],
      locationTitle: "Найди наш", locationTitleSpot: "Спот",
      locationAddress: "Пляж Микхе, Дананг", locationLandmark: "Ищите красный флаг EPIC SURF на песке напротив TMS Hotel",
      modalTitle: "Запись", featureLycra: "Лайкры и цинк", featureSizes: "Все размеры", featureWetsuits: "Гидрокостюмы", featureDelivery: "Привозим на спот",
      featureWetsuitsDesktop: "Гидро-\nкостюмы",
      featureDeliveryDesc: "Доставим доску туда, где удобно кататься.",
      featureSizesDesc: "Подберём доску под уровень и условия.",
      featureLycraDesc: "Дадим базовую защиту от солнца.",
      featureWetsuitsDesc: "Есть варианты для прохладных дней.",
      boardTypes: ["Софтборды", "Лонгборды", "Малибу", "Шортборды"],
      howTitle: "Как проходят", howTitleEnd: "уроки",
      howSteps: [
        {
          title: "Встреча",
          time: "10 мин",
          desc: "Знакомство, подготовка и подбор серфборда."
        },
        {
          title: "Подготовка на берегу",
          time: "15 мин",
          desc: "Основы сёрфинга и правила безопасности. Отработка базовых упражнений: тейк-офф, повороты, генерация скорости."
        },
        {
          title: "Практика в воде",
          time: "75 мин",
          desc: "Ловим волны под контролем инструктора, корректируем ошибки и наслаждаемся сёрфингом."
        },
        {
          title: "Рекомендации",
          time: "10 мин",
          desc: "Разбор урока и домашнее задание для дальнейшего прогресса."
        }
      ],
      forecastTitle: "Условия на", forecastTitleSpot: "Сегодня", forecastPeriod: "Период", forecastWind: "Ветер", forecastDir: "Направление", forecastWater: "Вода",
      forecastStatusGood: "Идеально для обучения", forecastStatusHigh: "Только для опытных",
      faqTitle: "Вопросы и", faqTitleEnd: "Ответы",
      faqItems: [
        { q: "Нужно ли уметь плавать?", a: "Желательно уметь держаться на воде. Уроки проходят на безопасной глубине, а инструктор всегда рядом." },
        { q: "Что брать с собой?", a: "Купальник/плавки, полотенце, солнцезащитный крем. Лайкру и цинк мы дадим." },
        { q: "В какое время лучше приходить?", a: "Зависит от приливов. Напишите нам — мы подскажем лучшее время на завтра." },
        { q: "Сколько нужно заниматься, чтобы встать на доску?", a: "Большинство уезжает уже на первом занятии, все в ваших руках." }
      ],
      cards: [
        { id: "group", title: "Групповой урок", badge: "Популярно", desc: "Подходит для тех, кто хочет учиться в лёгкой, живой атмосфере единомышленников.", price: "900.000 VND" },
        { id: "split", title: "Сплит урок", badge: "Выгодно", desc: "Идеально подходит для пар, друзей или детей - максимум внимания и практики в комфортной атмосфере. На уроке вы вдвоём и инструктор.", price: "2.500.000 VND" },
        { id: "private", title: "Приватный урок", badge: "Премиум", desc: "Формат один на один с инструктором, который даёт максимальный результат и быстрый прогресс уже за одно занятие.", price: "1.800.000 VND" },
        { id: "surf_skate", title: "Серф-скейт", badge: "Для базы", desc: "Идеальный тренажер для отработки маневров на суше.", price: "600.000 VND" },
        { id: "lineup_pro", title: "Line-up / Pro", badge: "Для опытных", desc: "Урок для продолжающих сёрферов: зелёные волны, проезд по стенке.", price: "2.400.000 VND" }
      ],
      reviewsList: [
        { name: "Evgenia", text: "Отличные уроки! Ребята влюбили меня в серф! Очень понятные объяснения, много практики. 🔥", date: "Неделю назад" },
        { name: "Дмитрий Харламов", text: "Отличная команда! Паша — очень крутой инструктор с чувством юмора! 👍", date: "2 недели назад" },
        { name: "Peter Thanh", text: "Despite of the bad weather the instructor was very friendly and teach very well. 👌", date: "Месяц назад" }
      ]
    },
    en: {
      howTitle: "How it",
      howTitleEnd: "works",
      howIntro: "We teach surf lessons in Vietnam using a proven and reliable method. At our surf school in Da Nang, you’ll learn to stand up confidently, catch your first wave, and enjoy the ocean from your very first lesson. Your progress and safety are our top priorities.",

      
      rentalModalTitle: "Book your rental",
      rentalModalSub: "Choose your preferred messenger. We will reply within 5 minutes.",
      msgRental: "Hi! I want to book a surfboard rental at Epic Surf.",
      includedLabel: "Included",
      includedTitle: "Everything included",
      includedSubtitle: "We prepare the essentials for your lesson: board, rashguard, sun protection and photos/videos.",
      includedAccentTitle: "No gear?\nNo problem.",
      includedAccentDesc: "Everything you need for the first session is already included.",
      includedItems: [
        { icon: "board", label: "Board", desc: "Softboard matched to your level, height and weight." },
        { icon: "rashguard", label: "Rashguard", desc: "Clean lycra for sun and rash protection." },
        { icon: "zinc", label: "Zinc SPF", desc: "Strong face protection for tropical sun." },
        { icon: "camera", label: "Photos / videos", desc: "We capture the best moments of your lesson." }
      ],
      whyItems: [
        { icon: <ShieldCheck size={40} />, title: "Certified Instructors", desc: "Structured coaching for fast, confident progress." },
        { icon: <Users size={40} />, title: "Personal Focus", desc: "Attention to every student, with coaching adapted to your current level." },
        { icon: <WhyBeachIcon size={40} />, title: "Perfect Conditions", desc: "We choose spots based on ocean conditions and your riding level." },
        { icon: <WhyMapV2Icon size={40} />, title: "Confident Start", desc: "You will catch your first wave during your first lesson." }
      ],
      navLessons: "Lessons", navRentals: "Rentals", navHow: "Process", navForecast: "Forecast", navEvents: "Events", navLocation: "Map", btnBook: "Book Now",
      heroTitle: "Catch Your", heroTitleEpic: "Epic", heroTitleEnd: "Wave in Da Nang",
      heroSub: "Best surf school on My Khe Beach. Expert coaching, top-tier gear, and the best community.",
      sectionTitle: "Choose Your", sectionTitleRide: "Ride",
      rentalBadge: "Professional Gear", rentalTitle: "Surf Board", rentalTitleSurf: "Rentals",
      rentalDesc: "We provide premium soft-tops, longboards, and performance shortboards.",
      rentalDescPrimary: "You can rent soft boards for beginners, longboards, and hard boards for confident riding.",
      rentalDescSecondary: "We will help choose the right board, bring it to your surf spot, and provide everything you need for a comfortable session.",
      rentalPrice: "from 250,000 VND", rentalUnit: "2 hour / Session", rentalBtn: "Rent Now",
      reviewsTitle: "The best surf vibes", reviewsLink: "Read more on Google Maps",
      galleryBadge: "Community & Vibe",
      galleryInstagram: "Follow us on Instagram",
      eventsTitle: "Our Events",
      eventsIntro: "Epic Surf School activities: festivals, school birthdays, community rides, beach meetups, and surf sessions with our crew.",
      eventsItems: [
        { title: "Da Nang Surfing Open 2025", type: "Festival", desc: "A full beach day with surf contests, music, photos, school friends, and plenty of waves.", image: "/gallery/events/danang-open-2026.webp", galleryKey: "surf-fest", imageClass: "object-cover object-center", buttonLabel: "View photos" },
        { title: "School birthday", type: "Community", desc: "We celebrate together with students, instructors, and friends of Epic Surf.", image: "/gallery/events/school-birthday.webp", galleryKey: "birthday", imageClass: "object-cover object-center", buttonLabel: "View photos" },
        { title: "Sunset surf sessions", type: "Regular", desc: "Evening rides, soft light, photo moments, and a relaxed after-lesson vibe.", image: "/gallery/events/sunset-surf.webp", galleryKey: "sunset", imageClass: "object-cover object-center", buttonLabel: "View photos" },
        { title: "Community rides", type: "Meet-up", desc: "Shared trips and sessions for students who want more water time and practice.", image: "/gallery/events/community-rides.webp", galleryKey: "community", imageClass: "object-cover object-center", buttonLabel: "View photos" }
      ],
      locationTitle: "Find the", locationTitleSpot: "Spot",
      locationAddress: "My Khe Beach, Da Nang", locationLandmark: "Look for the Red EPIC SURF flag opposite TMS Hotel",
      modalTitle: "Booking", featureLycra: "Rashguards & Zinc", featureSizes: "All Sizes", featureWetsuits: "Wetsuits", featureDelivery: "Spot Delivery",
      featureWetsuitsDesktop: "Wet-\nsuits",
      featureDeliveryDesc: "We will bring the board to the spot where it is convenient to surf.",
      featureSizesDesc: "We will match the board to your level and the conditions.",
      featureLycraDesc: "We will provide basic sun protection.",
      featureWetsuitsDesc: "Options available for cooler days.",
      boardTypes: ["Softboards", "Longboards", "Malibus", "Shortboards"],
      howTitle: "How it", howTitleEnd: "works",
      howSteps: [
        {
          title: "Meet & Gear Up",
          time: "10 min",
          desc: "We meet, get to know you, prepare for the lesson, and choose the right surfboard."
        },
        {
          title: "Beach Theory",
          time: "15 min",
          desc: "We cover the basics of surfing and ocean safety, then practice key movements on the beach: take-off, turns, and speed generation."
        },
        {
          title: "Ocean Practice",
          time: "75 min",
          desc: "Catching waves under your instructor's guidance, fixing mistakes, and enjoying the ride."
        },
        {
          title: "Review & Tips",
          time: "10 min",
          desc: "Session review and personalized homework for your continuous progress."
        }
      ],
      forecastTitle: "Current", forecastTitleSpot: "Forecast", forecastPeriod: "Period", forecastWind: "Wind", forecastDir: "Direction", forecastWater: "Water",
      forecastStatusGood: "Perfect for beginners", forecastStatusHigh: "Advanced surfers only",
      faqTitle: "FAQ", faqTitleEnd: "",
      faqItems: [
        { q: "Do I need to be a strong swimmer?", a: "Basic skills are enough. Lessons are held in safe depths." },
        { q: "What should I bring?", a: "Swimwear, towel, and sunscreen. We provide the rest." },
        { q: "When is the best time?", a: "Depends on tides. Text us for tomorrow's forecast." },
        { q: "How long does it take to stand up on the board?", a: "Most students get riding during the first lesson, but it is in your hands." }
      ],
      cards: [
        { id: "group", title: "Group Lesson", badge: "Most Popular", desc: "Perfect for those who want to learn in a relaxed, lively atmosphere with like-minded people.", price: "900.000 VND" },
        { id: "split", title: "Split Lesson", badge: "Best Value", desc: "Perfect for couples, friends, or kids — with maximum attention and practice in a comfortable atmosphere. Just two students and one instructor.", price: "2.500.000 VND" },
        { id: "private", title: "Private Lesson", badge: "Premium", desc: "One-on-one format with an instructor for maximum results and fast progress in just one lesson.", price: "1.800.000 VND" },
        { id: "surf_skate", title: "Surf-skate", badge: "Fundamentals", desc: "The perfect land-based training tool for practicing surf maneuvers.", price: "600.000 VND" },
        { id: "lineup_pro", title: "Line-up / Pro", badge: "Advanced", desc: "A lesson for intermediate surfers: green waves, trimming, and riding down the line.", price: "2.400.000 VND" }
      ],
      reviewsList: [
        { name: "Evgenia", text: "Great lessons! The team made us fall in love with surfing! 🔥", date: "1 week ago" },
        { name: "Dmitry Kharlamov", text: "Excellent team! Pasha is a very cool instructor! 👍", date: "2 weeks ago" },
        { name: "Peter Thanh", text: "Despite of the bad weather the instructor was friendly. 👌", date: "1 month ago" }
      ]
    }
  };

import { Target, Award, ShieldCheck, Users, Shirt, Camera, Smile } from "lucide-react";
import { CustomSurfIcon } from "../components/Icons";

export const translations = {
    ru: {
      howTitle: "Как проходят",
      howTitleEnd: "уроки",
      howIntro: "Мы разработали систему обучения, которая позволяет 90% новичков встать на доску уже на первом занятии. Ваш прогресс и безопасность — наш главный приоритет.",

    
      includedItems: [
        { label: "Серф", desc: "Доски разного размера под твой вес и габариты, включая доски для детей." },
        { label: "Экип + защита", desc: "Лайкра твоего размера и профессиональный цинк для защиты от солнца." },
        { label: "Контент", desc: "Качественные фото и видео с урока, с вашими лучшими проездами." },
        { label: "Вайб", desc: "Кокос и обучение с душой" }
      ],
      rentalModalTitle: "Забронировать аренду",
      rentalModalSub: "Выберите удобный мессенджер. Мы ответим вам в течение 5 минут.",
      msgRental: "Привет! Хочу забронировать аренду доски в Epic Surf.",
      includedTitle: "В стоимость включено",
      includedItems: [
        { icon: <CustomSurfIcon />, label: "Серф", desc: "Доски разного размера под твой вес и габариты, включая доски для детей." },
        { icon: <Shirt size={32} />, label: "Экип + защита", desc: "Лайкра твоего размера и профессиональный цинк для защиты от солнца." },
        { icon: <Camera size={32} />, label: "Контент", desc: "Качественные фото и видео с урока, с вашими лучшими проездами." },
        { icon: <Smile size={32} />, label: "Вайб", desc: "Кокос и обучение с душой" }
      ],
      whyItems: [
        { icon: <ShieldCheck size={40} />, title: "Сертифицированные инструкторы", desc: "Методичное обучение для уверенного и быстрого прогресса." },
        { icon: <Users size={40} />, title: "Персональный подход", desc: "Внимание к каждому ученику и обучение с учётом уровня твоей подготовки." },
        { icon: <Award size={40} />, title: "Идеальные условия", desc: "Подбираем локации в зависимости от условий в море и уровня твоего катания." },
        { icon: <Target size={40} />, title: "Уверенный старт", desc: "Ты поймаешь свою волну уже на первом уроке." }
      ],
      navLessons: "Уроки", navRentals: "Аренда", navHow: "Процесс", navForecast: "Прогноз", navEvents: "Эвенты", navLocation: "Карта", btnBook: "Записаться",
      heroTitle: "Поймай свою", heroTitleEpic: "Epic", heroTitleEnd: "волну в Дананге",
      heroSub: "Лучшая серф-школа на пляже Микхе. Профессиональное обучение и топовое оборудование и лучшее комьюнити.",
      sectionTitle: "Выбери свой", sectionTitleRide: "Формат",
      rentalBadge: "Gear up", rentalTitle: "Аренда", rentalTitleSurf: "Досок",
      rentalDesc: "Мы предоставляем премиальные софт-топы, лонгборды и шортборды. Поможем подобрать доску под текущие условия.",
      rentalPrice: "от 250,000 VND", rentalUnit: "Сессия / 2 часа", rentalBtn: "Арендовать",
      reviewsTitle: "Лучшие вайбы в Дананге", reviewsLink: "Читать все отзывы на Google Maps",
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
      boardTypes: ["Софтборды", "Лонгборды", "Малибу", "Шортборды"],
      howTitle: "Как проходят", howTitleEnd: "уроки",
      howSteps: [
        {
          title: "Встреча",
          time: "15 мин",
          desc: "Знакомство, подготовка и подбор серфборда под ваш уровень."
        },
        {
          title: "Подготовка на берегу",
          time: "20 мин",
          desc: "Основы сёрфинга и правила безопасности. Отработка базовых упражнений: тейк-офф (вставание на доску), повороты, генерация скорости."
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
        { title: "Групповой урок", badge: "Популярно", desc: "Идеально для новичков. До 4-х человек на инструктора.", price: "900,000 VND" },
        { title: "Сплит урок", badge: "Выгодно", desc: "Для 2-х человек. Больше внимания тренера. Цена за двоих.", price: "2,500,000 VND" },
        { title: "Приватный урок", badge: "Премиум", desc: "Индивидуальная тренировка для быстрого прогресса.", price: "1,800,000 VND" },
        { title: "Серф-скейт", badge: "Для базы", desc: "Техника поворотов на суше. Ускоряет прогресс в воде.", price: "600,000 VND" },
        { title: "Line-up / Pro", badge: "Для опытных", desc: "Выход на лайнап с гидом. Поиск лучших пиков.", price: "2,400,000 VND" }
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
      howIntro: "We have developed a teaching system that allows 90% of beginners to stand up on a board during their very first lesson. Your safety and progress are our priority.",

      
      includedItems: [
        { label: "Surfboard", desc: "Boards in different sizes for your weight and build, including boards for kids." },
        { label: "Gear + protection", desc: "A rashguard in your size and professional zinc for sun protection." },
        { label: "Media", desc: "Quality photos and videos from the lesson, including your best rides." },
        { label: "The Vibe", desc: "Coconut & good mood" }
      ],
      rentalModalTitle: "Book your rental",
      rentalModalSub: "Choose your preferred messenger. We will reply within 5 minutes.",
      msgRental: "Hi! I want to book a surfboard rental at Epic Surf.",
      includedTitle: "What's Included",
      includedItems: [
        { icon: <CustomSurfIcon />, label: "Surfboard", desc: "Boards in different sizes for your weight and build, including boards for kids." },
        { icon: <Shirt size={32} />, label: "Gear + protection", desc: "A rashguard in your size and professional zinc for sun protection." },
        { icon: <Camera size={32} />, label: "Media", desc: "Quality photos and videos from the lesson, including your best rides." },
        { icon: <Smile size={32} />, label: "The Vibe", desc: "Coconut & good mood" }
      ],
      whyItems: [
        { icon: <ShieldCheck size={40} />, title: "Certified Instructors", desc: "Structured coaching for fast, confident progress." },
        { icon: <Users size={40} />, title: "Personal Focus", desc: "Attention to every student, with coaching adapted to your current level." },
        { icon: <Award size={40} />, title: "Perfect Conditions", desc: "We choose spots based on ocean conditions and your riding level." },
        { icon: <Target size={40} />, title: "Confident Start", desc: "You will catch your first wave during your first lesson." }
      ],
      navLessons: "Lessons", navRentals: "Rentals", navHow: "Process", navForecast: "Forecast", navEvents: "Events", navLocation: "Map", btnBook: "Book Now",
      heroTitle: "Catch Your", heroTitleEpic: "Epic", heroTitleEnd: "Wave in Da Nang",
      heroSub: "Best surf school on My Khe Beach. Expert coaching, top-tier gear, and the best community.",
      sectionTitle: "Choose Your", sectionTitleRide: "Ride",
      rentalBadge: "Professional Gear", rentalTitle: "Surf Board", rentalTitleSurf: "Rentals",
      rentalDesc: "We provide premium soft-tops, longboards, and performance shortboards.",
      rentalPrice: "from 250,000 VND", rentalUnit: "2 hour / Session", rentalBtn: "Rent Now",
      reviewsTitle: "The best surf vibes", reviewsLink: "Read more on Google Maps",
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
      boardTypes: ["Softboards", "Longboards", "Malibus", "Shortboards"],
      howTitle: "How it", howTitleEnd: "works",
      howSteps: [
        {
          title: "Meet & Gear Up",
          time: "15 min",
          desc: "Meet your coach, gear up, and get the perfect surfboard for your level."
        },
        {
          title: "Beach Theory",
          time: "20 min",
          desc: "Surfing basics and ocean safety. Practicing core movements: pop-up, turning, and speed generation."
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
        { title: "Group Lesson", badge: "Most Popular", desc: "Perfect for beginners. Max 4 people.", price: "900,000 VND" },
        { title: "Split Lesson", badge: "Best Value", desc: "For 2 people. More coach attention.", price: "2,500,000 VND" },
        { title: "Private Lesson", badge: "Premium", desc: "1-on-1 coaching for maximum progress.", price: "1,800,000 VND" },
        { title: "Surf-skate", badge: "Fundamentals", desc: "Master turns on land to speed up your progress in the water.", price: "600,000 VND" },
        { title: "Line-up / Pro", badge: "Advanced", desc: "Guiding to the best peaks.", price: "2,400,000 VND" }
      ],
      reviewsList: [
        { name: "Evgenia", text: "Great lessons! The team made us fall in love with surfing! 🔥", date: "1 week ago" },
        { name: "Dmitry Kharlamov", text: "Excellent team! Pasha is a very cool instructor! 👍", date: "2 weeks ago" },
        { name: "Peter Thanh", text: "Despite of the bad weather the instructor was friendly. 👌", date: "1 month ago" }
      ]
    }
  };


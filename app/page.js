"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Waves, MapPin, Target, Award, Star, Phone, MessageCircle,
  X, Globe, ShieldCheck, Users, Wind, Thermometer, ArrowUp, Menu,
  Shirt, Camera, Smile, CheckCircle2, ChevronLeft, ChevronRight, Send
} from "lucide-react";

export default function EpicSurfLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRentalOptions, setShowRentalOptions] = useState(false);
  const [mapActive, setMapActive] = useState(false);
  const [lang, setLang] = useState('ru');
  const [bookingUrl, setBookingUrl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [activeBoard, setActiveBoard] = useState(0);
  const [activeGalleryEvent, setActiveGalleryEvent] = useState("all");
  const boardSliderRef = useRef(null);
  const lessonsScrollRef = useRef(null);
  const lessonsDragRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    moved: false
  });

  // FETCH LIVE DATA
  useEffect(() => {
    async function getForecast() {
      try {
        const marineRes = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=16.061&longitude=108.247&current=wave_height,wave_period`);
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=16.061&longitude=108.247&current=wind_speed_10m,wind_direction_10m`);
        const marine = await marineRes.json();
        const weather = await weatherRes.json();
        setForecast({
          height: marine.current.wave_height,
          period: marine.current.wave_period,
          windSpeed: weather.current.wind_speed_10m,
          windDir: weather.current.wind_direction_10m,
          water: 26
        });
      } catch (e) { console.error(e); }
    }
    getForecast();
  }, []);

  const translations = {
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
        { icon: <ShieldCheck size={40} />, title: "Мы профи", desc: "95% учеников встают на доску на первом занятии." },
        { icon: <Users size={40} />, title: "Твой вайб", desc: "Мы не просто школа, мы комьюнити. Настоящий Серф вайб." },
        { icon: <Award size={40} />, title: "Премиум стафф", desc: "Только свежее оборудование. Регулярно обновляем доски." },
        { icon: <Target size={40} />, title: "Личный прогресс", desc: "Тренер контролирует каждое движение и твой темп." }
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
        { icon: <ShieldCheck size={40} />, title: "We Are Pros", desc: "95% of our students stand up on their very first lesson." },
        { icon: <Users size={40} />, title: "The Surf Vibe", desc: "More than just a school, we’re a community. That’s the real surf vibe." },
        { icon: <Award size={40} />, title: "Premium Gear", desc: "Top-tier equipment only. We regularly update our boards." },
        { icon: <Target size={40} />, title: "Personal Focus", desc: "Your coach tracks every move and adjusts to your pace." }
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

  const t = translations[lang];
  const includedImages = [
    { primary: "/gallery/included-board.png" },
    { primary: "/gallery/included-shirt.png", secondary: "/gallery/included-zinc.png" },
    { primary: "/gallery/included-camera.png" },
    { primary: "/gallery/included-coconut.png" }
  ];
  const links = {
    group: "https://n1304231.alteg.io/company/1248257/activity/select?o=m-1act2026-04-23",
    personal: "https://n1304231.alteg.io/company/1248257/personal/select-time?o=m-1",
    rental: "https://n1304231.alteg.io/company/1248257/personal/select-services?o=m-1",
    whatsapp: "https://wa.me/84383880164",
    telegram: "https://t.me/danangsurf",
    telegramChannel: "https://t.me/surfdanang",
    zalo: "https://zalo.me/84383880164",
    googleMaps: "https://www.google.com/maps/place/EPIC+Surf+School+Da+Nang/@16.0464674,108.2504812,17z",
    instagram: "https://www.instagram.com/epicsurfvn?igsh=eHdzMTZhanY2M2Zx",
    facebook: "https://www.facebook.com/epicsurfdanang/",
    youtube: "https://youtube.com/@epicsurf",
    threads: "https://threads.net/@epicsurf_danang"
  };
  const danangOpenPhotos = Array.from({ length: 30 }, (_, idx) => `/gallery/events/danang-open-2025/danang-open-2025-${idx + 1}.webp`);
  const birthdayPhotos = [
    "/gallery/events/birthday/epic-birthday-4.webp",
    "/gallery/events/birthday/epic-birthday-6.webp",
    "/gallery/events/birthday/epic-birthday-7.webp",
    "/gallery/events/birthday/epic-birthday-11-alt.webp",
    "/gallery/events/birthday/epic-birthday-8.webp",
    "/gallery/events/birthday/epic-birthday-12.webp",
    "/gallery/events/birthday/epic-birthday-5.webp",
    "/gallery/events/birthday/epic-birthday-1.webp",
    "/gallery/events/birthday/epic-birthday-2.webp",
    "/gallery/events/birthday/epic-birthday-10.webp",
    "/gallery/events/birthday/epic-birthday-13.webp",
    "/gallery/events/birthday/epic-birthday-11.webp"
  ];
  const sunsetPhotos = [13, 14, 15, 16, 17, 18];
  const communityPhotos = [3, 4, 5, 6, 7, 8];
  const interleavePhotos = (...groups) => {
    const maxLength = Math.max(...groups.map((group) => group.length));
    return Array.from({ length: maxLength }).flatMap((_, idx) => groups.map((group) => group[idx]).filter(Boolean));
  };
  const mixedEventPhotos = interleavePhotos(danangOpenPhotos, birthdayPhotos, sunsetPhotos, communityPhotos);
  const eventGalleryGroups = [
    { key: "all", label: "All", photos: mixedEventPhotos },
    { key: "surf-fest", label: "Da Nang Surfing Open 2025", photos: danangOpenPhotos },
    { key: "birthday", label: lang === 'ru' ? "ДР школы" : "Birthday", photos: birthdayPhotos },
    { key: "sunset", label: "Sunset", photos: sunsetPhotos },
    { key: "community", label: "Community", photos: communityPhotos }
  ];
  const activeGalleryGroup = eventGalleryGroups.find((group) => group.key === activeGalleryEvent) || eventGalleryGroups[0];
  const galleryPhotoSrc = (photo) => typeof photo === "string" ? photo : `/gallery/${photo}.webp`;
  const galleryLayoutClasses = [
    "col-span-6 row-span-2",
    "col-span-3 row-span-1",
    "col-span-3 row-span-1",
    "col-span-3 row-span-1",
    "col-span-3 row-span-1",
    "col-span-6 row-span-1",
    "col-span-6 row-span-1"
  ];

  const handleLessonsWheel = (event) => {
    const scroller = lessonsScrollRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const canScroll =
      (delta < 0 && scroller.scrollLeft > 0) ||
      (delta > 0 && scroller.scrollLeft < maxScrollLeft - 1);

    if (!delta || !canScroll) return;

    event.preventDefault();
    scroller.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleLessonsPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const scroller = lessonsScrollRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    lessonsDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false
    };
    scroller.setPointerCapture?.(event.pointerId);
  };

  const handleLessonsPointerMove = (event) => {
    const scroller = lessonsScrollRef.current;
    const drag = lessonsDragRef.current;
    if (!scroller || !drag.isDragging) return;

    const diff = event.clientX - drag.startX;
    if (Math.abs(diff) > 4) drag.moved = true;
    scroller.scrollLeft = drag.scrollLeft - diff;
  };

  const stopLessonsDrag = (event) => {
    const scroller = lessonsScrollRef.current;
    if (scroller?.hasPointerCapture?.(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    lessonsDragRef.current.isDragging = false;
  };

  const handleLessonsClickCapture = (event) => {
    if (!lessonsDragRef.current.moved) return;

    event.preventDefault();
    event.stopPropagation();
    lessonsDragRef.current.moved = false;
  };

  const scrollBoardSlider = (direction) => {
    const slider = boardSliderRef.current;
    if (!slider) return;

    slider.scrollBy({ left: slider.clientWidth * direction, behavior: "smooth" });
  };

  const scrollToBoard = (index) => {
    const slider = boardSliderRef.current;
    if (!slider) return;

    slider.scrollTo({ left: slider.clientWidth * index, behavior: "smooth" });
  };

  const updateActiveBoard = () => {
    const slider = boardSliderRef.current;
    if (!slider) return;

    setActiveBoard(Math.max(0, Math.min(3, Math.round(slider.scrollLeft / slider.clientWidth))));
  };

  const openEventGallery = (galleryKey) => {
    setActiveGalleryEvent(galleryKey);
    requestAnimationFrame(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div
      className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-clip transition-colors duration-500 scroll-smooth"
      style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
    >

      {/* 1. HEADER + MOBILE MENU */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-white shadow-md">

        <div className="h-16 md:h-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex items-center justify-between gap-2">

            {/* LOGO (TEXT BRAND) */}
            <Link href="/" className="flex-shrink-0 transition-transform active:scale-95 z-[110] font-black text-2xl uppercase flex items-center">
              <span className="text-[#1A1C20]" style={{ letterSpacing: '-0.02em' }}>EPIC</span>
              <span className="text-[#EF233C]" style={{ letterSpacing: '0.05em' }}>SURF</span>
            </Link>
            {/* DESKTOP NAV (Скрыта на мобилках) */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#lessons" className="text-[11px] font-bold uppercase tracking-wide leading-snug text-epicDark hover:text-epicRed transition-colors">{t.navLessons}</a>
              <a href="#how-it-works" className="text-[11px] font-bold uppercase tracking-wide leading-snug text-epicDark hover:text-epicRed transition-colors">{t.navHow}</a>
              <a href="#forecast" className="text-[11px] font-bold uppercase tracking-wide leading-snug text-epicDark hover:text-epicRed transition-colors">{t.navForecast}</a>
              <a href="#events" className="text-[11px] font-bold uppercase tracking-wide leading-snug text-epicDark hover:text-epicRed transition-colors">{t.navEvents}</a>
              <a href="#location" className="text-[11px] font-bold uppercase tracking-wide leading-snug text-epicDark hover:text-epicRed transition-colors">{t.navLocation}</a>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 md:gap-4 z-[110]">
              {/* Переключатель языка (компактный) */}
              <button
                onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
                className="w-9 h-9 flex items-center justify-center bg-epicDark text-white rounded-full font-bold text-[10px] uppercase shadow-md"
              >
                {lang === 'ru' ? 'EN' : 'RU'}
              </button>

              {/* Кнопка записи (чуть меньше на мобилке) */}
              <button
                onClick={() => setBookingUrl(links.group)}
                className="bg-epicRed text-white px-4 md:px-8 h-9 md:h-10 rounded-full font-bold uppercase text-[11px] tracking-wide leading-snug shadow-lg shadow-epicRed/20 active:scale-95 transition-all"
              >
                {t.btnBook}
              </button>

              {/* БУРГЕР-МЕНЮ (Только для мобилок) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center bg-epicPink rounded-full text-epicDark transition-all"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ВЫПАДАЮЩЕЕ МОБИЛЬНОЕ МЕНЮ */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-epicPink lg:hidden z-0 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 pb-8 relative z-10">
                {[
                  { href: "#lessons", label: t.navLessons },
                  { href: "#how-it-works", label: t.navHow },
                  { href: "#forecast", label: t.navForecast },
                  { href: "#events", label: t.navEvents },
                  { href: "#location", label: t.navLocation }
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold tracking-normal leading-snug break-words text-epicDark hover:text-epicRed py-2 border-b border-epicPink/50"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION — CLEAN STYLE */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden">

        {/* 🎬 ВИДЕО-ФОН */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
          <source src="/hero-surf.mp4" type="video/mp4" />
        </video>

        {/* 🎨 СПОКОЙНАЯ ТОНИРОВКА (Вместо точек) */}
        <div className="absolute inset-0 z-[1] bg-epicDark/40"></div>

        {/* ГРАДИЕНТЫ ДЛЯ ЧИТАЕМОСТИ */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-epicDark/50 via-transparent to-epicDark/70 pointer-events-none"></div>

        <div className="relative z-10 text-center px-4 pt-20 flex flex-col items-center">
          <motion.h1
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="text-[10vw] sm:text-5xl md:text-8xl font-extrabold text-white tracking-normal mb-8 leading-[0.95] text-center flex flex-col items-center break-words"
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="block">
              {t.heroTitle}
            </motion.span>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 py-2 text-[#EF233C]" // Цвет как у кнопки чата
            >
              <span className="font-black">Epic</span>
              <span className="text-white font-extrabold">{lang === 'ru' ? 'волну' : 'wave'}</span>
            </motion.div>

            <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="block">
              {lang === 'ru' ? 'в Дананге' : 'in Da Nang'}
            </motion.span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="text-white/90 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            {t.heroSub}
          </motion.p>
        </div>
      </section>

      {/* WAVE TOP */}
      <WaveDivider color="#FFFFFF" flip={true} />

      {/* 2.5 WHY EPIC (4 ICONS, 2x2 MOBILE) */}
      <section className="py-24 bg-epicWhite px-6 border-b border-epicPink/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-12 text-center">
            {t.whyItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center" // Добавили flex для центровки
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-epicPink rounded-[24px] md:rounded-[30px] flex items-center justify-center text-epicRed shadow-sm border border-white/50 mb-6">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm md:text-lg font-bold text-epicDark leading-snug break-words hyphens-auto">{item.title}</h3>
                  <p className="text-epicDark/60 text-[11px] md:text-sm max-w-[160px] md:max-w-[280px] mx-auto leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 2.7 HOW IT WORKS */}
      <section id="how-it-works" className="py-32 bg-epicWhite scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
            <h2 className="text-4xl md:text-7xl font-black tracking-normal text-epicDark leading-[0.98] break-words">
              {t.howTitle} <span className="text-epicRed">{t.howTitleEnd}</span>
            </h2>
            <p className="text-epicDark/50 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              {t.howIntro}
            </p>
          </div>

          <div className="space-y-32">
            {t.howSteps.map((step, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
              >
                {/* ФОТО: Чистый стиль, только скругление и тень */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2"
                >
                  <div className="aspect-[4/3] w-full rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 relative">
                    <Image
                      src={`/gallery/process-${idx + 1}.webp`}
                      alt={step.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                {/* ТЕКСТОВЫЙ БЛОК: Чистый текст без рамок */}
                <div className="w-full lg:w-1/2">
                  <div className="flex flex-col items-center lg:items-start space-y-6">
                    <div className="bg-epicRed text-white px-4 py-1 rounded-full text-[11px] font-bold tracking-wide leading-snug shadow-md">
                      {step.time}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black tracking-normal text-epicDark leading-tight text-center lg:text-left break-words hyphens-auto">
                      {step.title}
                    </h3>
                    <p className="text-epicDark/70 text-base md:text-lg leading-relaxed font-medium text-center lg:text-left max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. LESSONS SERVICES */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 md:mb-16 tracking-normal leading-tight text-epicDark break-words">
          {t.sectionTitle} <span className="text-epicRed">{t.sectionTitleRide}</span>
        </h2>

        <div
          ref={lessonsScrollRef}
          onWheel={handleLessonsWheel}
          onPointerDown={handleLessonsPointerDown}
          onPointerMove={handleLessonsPointerMove}
          onPointerUp={stopLessonsDrag}
          onPointerCancel={stopLessonsDrag}
          onPointerLeave={stopLessonsDrag}
          onClickCapture={handleLessonsClickCapture}
          className="relative left-1/2 w-screen -translate-x-1/2 px-6 md:left-auto md:w-full md:-mx-6 md:translate-x-0 md:px-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none touch-auto snap-x snap-mandatory md:snap-none scroll-px-6"
        >
          <div className="flex gap-4 sm:gap-6 md:gap-8 pb-8 w-max">
            {t.cards.map((item, i) => (
              <motion.div
                key={i}
                className="w-[76vw] max-w-[300px] sm:w-[300px] flex-shrink-0 snap-start bg-epicPink rounded-[40px] overflow-hidden shadow-lg flex flex-col border border-white/50 group"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={`/gallery/lesson-${i + 1}.webp`}
                    alt={item.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4 text-epicRed">
                    {i === 0 ? <Waves size={32} /> :
                      i === 1 ? <Award size={32} /> :
                        i === 2 ? <Star size={32} /> :
                          i === 3 ? <Wind size={32} /> : <Target size={32} />}
                  </div>
                  <div className="text-[11px] text-epicRed font-bold mb-2 tracking-wide leading-snug">{item.badge}</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-epicDark leading-snug break-words hyphens-auto">{item.title}</h3>
                  <p className="text-epicDark/70 mb-6 text-sm flex-1">{item.desc}</p>
                  <div className="text-2xl font-black mb-8 text-epicDark">{item.price}</div>
                  <button onClick={() => setBookingUrl(links.group)} className="w-full bg-epicDark text-white py-5 rounded-[20px] font-black uppercase text-xs tracking-wide shadow-lg transition-all duration-300 group-hover:bg-epicRed hover:bg-epicRed hover:-translate-y-0.5 active:translate-y-0 active:scale-95">{t.btnBook}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED (BENTO BOX) */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black mb-12 tracking-normal leading-tight text-epicDark text-center break-words">
            {t.includedTitle}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-[1.24fr_0.96fr_0.96fr_0.84fr] md:grid-rows-2 gap-4 md:gap-6 md:auto-rows-[250px]">
            {t.includedItems.map((item, idx) => {
              const titleSize = "text-2xl md:text-2xl font-black leading-tight mb-2 break-words";
              const descSize = "text-[11px] md:text-sm font-bold tracking-wide leading-snug break-words";

              // Manual card tuning: card = tile size/grid, img/secondaryImg = image position, text = position/alignment, titleClass/descClass = text width, wrapping, hyphenation.
              const styles = [
                { // 0: Серф 
                  card: "col-span-2 md:col-span-1 md:row-span-2 md:col-start-1 bg-[#EDF2F4] justify-end min-h-[270px] md:min-h-[520px]",
                  img: "absolute top-16 right-1 w-[55%] md:top-26 md:right-2 md:w-[105%] object-contain rotate-8",
                  text: "absolute left-8 bottom-46 md:left-8 md:bottom-100 max-w-[60%] md:max-w-[62%] z-10",
                  titleClass: "whitespace-normal break-words hyphens-auto",
                  descClass: "whitespace-normal break-words hyphens-auto",
                  title: "text-epicDark", desc: "text-epicDark/40"
                },
                { // 1: Экип + защита
                  card: "col-span-2 md:col-span-2 md:row-span-1 md:col-start-2 bg-[#EDF2F4] justify-center min-h-[240px] md:min-h-[250px]",
                  img: "absolute -bottom-18 -right-2 w-[50%] md:-bottom-28 md:right-88 md:w-[42%] object-contain rotate-3 md:rotate-5",
                  secondaryImg: "absolute -bottom-8 right-[42%] w-[28%] -md:bottom-6 md:right-[-10%] md:w-[38%] object-contain -rotate-6",
                  text: "absolute left-8 top-4 md:left-42 md:top-6 max-w-[56%] md:max-w-[45%] z-10 text-left md:text-center",
                  titleClass: "whitespace-normal break-words hyphens-auto",
                  descClass: "whitespace-normal break-words hyphens-auto",
                  title: "text-epicDark", desc: "text-epicDark/40"
                },
                { // 2: Контент
                  card: "col-span-2 md:col-span-2 md:row-span-1 md:col-start-2 bg-[#EDF2F4] justify-center min-h-[240px] md:min-h-[250px]",
                  img: "absolute -bottom-0 -right-12 w-[68%] md:bottom-0 -md:right-2 md:w-[58%] object-contain rotate-0 md:rotate-0",
                  text: "absolute left-8 top-4 md:left-8 md:top-6 max-w-[54%] md:max-w-[50%] z-10",
                  titleClass: "whitespace-normal break-words hyphens-auto",
                  descClass: "whitespace-normal break-words hyphens-auto",
                  title: "text-epicDark", desc: "text-epicDark/40"
                },
                { // 3: Вайб
                  card: "col-span-2 md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1 bg-[#EDF2F4] justify-end min-h-[180px] md:min-h-[520px]",
                  img: "absolute -bottom-12 -right-1 w-[44%] md:-bottom-6 md:-right-8 md:w-[110%] object-contain rotate-6 md:rotate-8",
                  text: "absolute left-8 bottom-27 md:left-8 md:bottom-105 max-w-[56%] md:max-w-[82%] z-10",
                  titleClass: "whitespace-normal break-words hyphens-auto",
                  descClass: "whitespace-normal break-words hyphens-auto",
                  title: "text-epicDark", desc: "text-epicDark/40"
                }
              ][idx];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-[40px] p-8 relative overflow-hidden group shadow-sm border border-gray-100 flex flex-col transition-all duration-300 ${styles.card}`}
                >
                  <Image
                    src={includedImages[idx].primary}
                    alt={item.label}
                    width={420}
                    height={300}
                    className={`!max-w-none drop-shadow-xl transition-all duration-500 z-0 ${styles.img}`}
                  />
                  {includedImages[idx].secondary && (
                    <Image
                      src={includedImages[idx].secondary}
                      alt=""
                      width={320}
                      height={260}
                      className={`!max-w-none drop-shadow-xl transition-all duration-500 z-0 ${styles.secondaryImg}`}
                    />
                  )}
                  <div className={styles.text}>
                    <h4 className={`${styles.title} ${titleSize} ${styles.titleClass || ""}`}>{item.label}</h4>
                    <p className={`${styles.desc} ${descSize} ${styles.descClass || ""}`}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. RENTALS (FULL-WIDTH DARK) */}
      <section id="rentals" className="bg-epicDark text-white py-24 mt-20 relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
            <div className="lg:w-1/2 flex items-center justify-center relative group">
              <div className="relative w-full aspect-[4/3] min-h-[300px] sm:min-h-[380px] lg:aspect-auto lg:min-h-[620px] xl:min-h-[680px] overflow-hidden rounded-[36px] md:rounded-[60px] border border-white/10 shadow-2xl shadow-black/20 bg-[#1a1c2c]">
                <div ref={boardSliderRef} id="board-slider" onScroll={updateActiveBoard} className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                  {[1, 2, 3, 4].map((num, idx) => (
                    <div key={num} className="min-w-full h-full snap-center relative">
                      <Image src={`/gallery/board-${num}.webp`} alt={t.boardTypes[idx]} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-90" />
                      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8"><div className="bg-black/55 backdrop-blur-md border border-white/10 text-white px-4 md:px-5 py-2 rounded-full text-[11px] font-bold tracking-wide leading-snug shadow-xl">{t.boardTypes[idx]}</div></div>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollBoardSlider(-1)} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/12 backdrop-blur-md rounded-full flex items-center justify-center border border-white/15 hover:bg-epicRed transition-all opacity-90 hover:opacity-100 shadow-xl"><ChevronLeft className="w-5 h-5 md:w-7 md:h-7" /></button>
                <button onClick={() => scrollBoardSlider(1)} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/12 backdrop-blur-md rounded-full flex items-center justify-center border border-white/15 hover:bg-epicRed transition-all opacity-90 hover:opacity-100 shadow-xl"><ChevronRight className="w-5 h-5 md:w-7 md:h-7" /></button>
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md border border-white/10 px-3 py-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToBoard(idx)}
                      aria-label={`${t.boardTypes[idx]}`}
                      className={`h-2 rounded-full transition-all ${activeBoard === idx ? 'w-7 bg-epicRed' : 'w-2 bg-white/45 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="mb-12">
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-normal leading-[0.98] text-white break-words">{t.rentalTitle} <br /><span className="text-epicRed">{t.rentalTitleSurf}</span></h2>
                <p className="text-white/55 text-base md:text-lg max-w-lg leading-relaxed">{t.rentalDesc}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12">
                {[{ k: 'featureLycra', svg: <LycraIcon /> }, { k: 'featureSizes', svg: <SizesIcon /> }, { k: 'featureWetsuits', svg: <WetsuitIcon /> }, { k: 'featureDelivery', svg: <DeliveryIcon /> }].map((feat) => (
                  <div key={feat.k} className="flex items-center gap-3 md:gap-4 p-4 md:p-6 rounded-[28px] md:rounded-[32px] bg-white/5 border border-white/5 hover:border-epicRed/30 transition-all group backdrop-blur-sm min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 text-epicRed group-hover:scale-110 transition-transform">{feat.svg}</div>
                    <span className="min-w-0 text-[10px] md:text-[11px] font-bold text-white/75 leading-snug tracking-normal break-words hyphens-auto">{t[feat.k]}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-white/10">
                <div className="text-center sm:text-left"><div className="text-4xl md:text-5xl font-black text-white leading-tight">{t.rentalPrice}</div><div className="text-[11px] opacity-35 tracking-wide font-bold mt-2">{t.rentalUnit}</div></div>
                <button onClick={() => setShowRentalOptions(true)} className="w-full sm:w-auto px-12 py-6 bg-epicRed text-white rounded-[20px] font-black uppercase text-sm tracking-wide hover:bg-white hover:text-epicRed transition-all shadow-xl active:scale-95">{t.rentalBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORECAST (SWELL REPORT) — ВОЗВРАТ ГАБАРИТОВ + ФИКС КОНТЕНТА */}
      <section id="forecast" className="py-24 bg-epicWhite px-6 scroll-mt-24 border-t border-epicPink/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-epicDark rounded-[40px] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row min-h-[500px]">

            {/* ЛЕВАЯ ПАНЕЛЬ: ПОКАЗАТЕЛИ (Высота 100%, отступы как были) */}
            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 text-white">

              <div className="relative z-10 space-y-10">
                {/* 1. Главный показатель (Высота) — Крупно + Центровка */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]"></span>
                    <span className="text-[11px] font-bold tracking-wide opacity-35 leading-snug">{t.forecastTitle} {t.forecastTitleSpot}</span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-7xl lg:text-9xl font-black tracking-normal leading-[0.95]">{forecast?.height || "0.86"}</span>
                      <span className="text-3xl lg:text-5xl font-bold text-epicRed leading-[0.95]">m</span>
                    </div>
                    <div className="hidden md:block pl-6 border-l border-white/20">
                      <span className="text-sm font-bold tracking-wide opacity-35">{t.forecastWaveHeight}</span>
                    </div>
                  </div>

                  <div className="bg-epicRed text-white px-5 py-2 rounded-full font-bold text-[11px] lg:text-xs tracking-wide shadow-xl leading-snug">
                    {(forecast?.height || 0.8) < 1.2 ? t.forecastStatusGood : t.forecastStatusHigh}
                  </div>
                </div>

                {/* 2. Сетка параметров 2x2 — Крупно + Центровка */}
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 border-t border-white/10 pt-8">
                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[11px] lg:text-xs font-bold opacity-35 flex items-center gap-2 leading-snug"><Waves className="w-4 h-4" /> {t.forecastPeriod}</div>
                    <span className="font-black text-3xl lg:text-4xl">{forecast?.period || "4.95"}s</span>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[11px] lg:text-xs font-bold opacity-35 flex items-center gap-2 leading-snug"><Wind className="w-4 h-4" /> {t.forecastWind}</div>
                    <span className="font-black text-3xl lg:text-4xl">{Math.round(forecast?.windSpeed || 23)}<span className="text-xs lg:text-sm opacity-35 ml-1">km/h</span></span>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[11px] lg:text-xs font-bold opacity-35 flex items-center gap-2 leading-snug"><Globe className="w-4 h-4" /> {t.forecastDir}</div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-epicRed rounded-full flex items-center justify-center text-white" style={{ transform: `rotate(${forecast?.windDir || 225}deg)` }}><ArrowUp className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={4} /></div>
                      <span className="font-black text-2xl lg:text-3xl">SW</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[11px] lg:text-xs font-bold opacity-35 flex items-center gap-2 leading-snug"><Thermometer className="w-4 h-4" /> {t.forecastWater}</div>
                    <span className="font-black text-3xl lg:text-4xl">26°C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ПРАВАЯ ПАНЕЛЬ: КАРТА WINDY (Высота 400px как была) */}
            <div className="lg:w-3/5 h-[400px] lg:h-auto bg-white relative">
              <iframe
                src="https://embed.windy.com/embed2.html?lat=16.061&lon=108.247&zoom=11&overlay=waves&product=ecmwf&metricWind=km%2Fh"
                className={`w-full h-full border-none transition-opacity duration-500 ${mapActive ? 'opacity-100' : 'opacity-80'}`}
                title="Windy Forecast"
              ></iframe>

              {/* Защита от застревания пальца */}
              {!mapActive && (
                <div
                  onClick={() => setMapActive(true)}
                  className="absolute inset-0 z-20 bg-epicDark/20 backdrop-blur-[1px] flex items-center justify-center lg:hidden cursor-pointer"
                >
                  <div className="bg-white/95 text-epicDark px-6 py-3 rounded-2xl font-bold text-[11px] tracking-wide shadow-2xl flex items-center gap-2 leading-snug">
                    <Globe size={14} className="animate-spin" />
                    {lang === 'ru' ? 'Активировать карту' : 'Activate map'}
                  </div>
                </div>
              )}

              {/* Кнопка выхода */}
              {mapActive && (
                <button onClick={() => setMapActive(false)} className="absolute top-4 right-4 z-30 bg-epicRed text-white p-2 rounded-full lg:hidden shadow-xl"><X size={20} /></button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 5. REVIEWS */}
      <section id="reviews" className="py-24 bg-epicPink border-y border-white/50 scroll-mt-24 text-center text-epicDark px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black mb-20 tracking-normal leading-tight break-words">{t.reviewsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {t.reviewsList.map((rev, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-10 rounded-[40px] shadow-xl text-left flex flex-col justify-between border border-white">
                <p className="font-medium leading-relaxed text-base md:text-lg mb-8 break-words">{rev.text}</p>
                <div className="flex items-center gap-4 border-t border-epicPink pt-6">
                  <div className="w-14 h-14 bg-epicDark text-white rounded-full flex items-center justify-center font-black overflow-hidden border-2 border-white shadow-sm relative">
                    {rev.img ? <Image src={rev.img} fill sizes="56px" className="object-cover" alt={rev.name} /> : rev.name.charAt(0)}
                  </div>
                  <div className="min-w-0"><div className="text-sm font-bold tracking-wide leading-snug break-words">{rev.name}</div><div className="text-[11px] opacity-45 font-bold leading-snug">{rev.date}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
          <a href={links.googleMaps} target="_blank" className="inline-flex items-center gap-3 text-epicRed font-bold text-sm tracking-wide leading-snug break-words">{t.reviewsLink} <Globe size={14} /></a>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-32 bg-epicWhite px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16 tracking-normal leading-tight break-words">{t.faqTitle} <span className="text-epicRed">{t.faqTitleEnd}</span></h2>
          <div className="space-y-4">
            {t.faqItems.map((item, idx) => (
              <div key={idx} className="border-b border-epicPink pb-4">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center py-6 text-left group">
                  <span className="font-bold text-lg md:text-2xl text-epicDark group-hover:text-epicRed transition-colors leading-snug break-words">{item.q}</span>
                  <div className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}><X size={24} className="text-epicRed" /></div>
                </button>
                <AnimatePresence>{openFaq === idx && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-6 text-epicDark/60 text-lg leading-relaxed">{item.a}</p></motion.div>}</AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EVENTS */}
      <section id="events" className="py-24 bg-epicWhite px-6 scroll-mt-24 border-t border-epicPink/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-14">
            <div className="max-w-3xl">
              <div className="inline-block bg-epicRed/10 text-epicRed px-4 py-1 rounded-full font-bold text-[11px] tracking-wide border border-epicRed/10 mb-5">Community Calendar</div>
              <h2 className="text-4xl md:text-7xl font-black tracking-normal leading-tight text-epicDark break-words">{t.eventsTitle}</h2>
            </div>
            <p className="max-w-xl text-base md:text-lg font-medium leading-relaxed text-epicDark/60 break-words">{t.eventsIntro}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 h-full rounded-[36px] lg:rounded-[44px] overflow-hidden bg-epicDark text-white border border-white/10 shadow-2xl"
            >
              <div className="grid md:grid-cols-[0.9fr_1.1fr] min-h-[520px] h-full">
                <div className="relative min-h-[320px] md:h-full bg-white/5">
                  <Image src={t.eventsItems[0].image} alt={t.eventsItems[0].title} fill sizes="(min-width: 1024px) 40vw, 100vw" className={t.eventsItems[0].imageClass} />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-end">
                  <div className="text-epicRed text-[11px] font-bold tracking-wide leading-snug mb-5">{t.eventsItems[0].type}</div>
                  <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-normal mb-5 break-words">{t.eventsItems[0].title}</h3>
                  <p className="text-white/65 text-base md:text-lg font-medium leading-relaxed break-words">{t.eventsItems[0].desc}</p>
                  <button onClick={() => openEventGallery(t.eventsItems[0].galleryKey)} className="mt-8 self-start rounded-full bg-white px-6 py-3 text-[11px] font-bold tracking-wide leading-snug text-epicDark transition-all hover:bg-epicRed hover:text-white active:scale-95">{t.eventsItems[0].buttonLabel}</button>
                </div>
              </div>
            </motion.article>

            <div className="lg:col-span-5 grid sm:grid-cols-3 lg:grid-cols-1 gap-5 lg:gap-6">
              {t.eventsItems.slice(1).map((event, idx) => (
                <motion.article
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-epicPink shadow-sm"
                >
                  <div className="grid lg:grid-cols-[180px_1fr] h-full">
                    <div className="relative h-52 sm:h-44 lg:h-full min-h-[180px] bg-epicPink">
                      <Image src={event.image} alt={event.title} fill sizes="(min-width: 1024px) 180px, 100vw" className={event.imageClass} />
                    </div>
                    <div className="p-6 flex flex-col justify-center min-w-0">
                      <div className="text-epicRed text-[10px] font-bold tracking-wide leading-snug mb-3">{event.type}</div>
                      <h3 className="text-xl md:text-2xl font-black leading-tight tracking-normal text-epicDark mb-3 break-words">{event.title}</h3>
                      <p className="text-epicDark/55 text-sm font-medium leading-relaxed break-words">{event.desc}</p>
                      <button onClick={() => openEventGallery(event.galleryKey)} className="mt-5 self-start rounded-full bg-epicDark px-5 py-3 text-[10px] font-bold tracking-wide leading-snug text-white transition-all hover:bg-epicRed active:scale-95">{event.buttonLabel}</button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. DARK EPIC GALLERY */}
      <section id="gallery" className="py-24 bg-epicDark px-6 scroll-mt-24 border-t border-white/5 overflow-visible">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="space-y-4 text-white">
              <div className="inline-block bg-white/5 text-epicRed px-4 py-1 rounded-full font-bold text-[11px] tracking-wide border border-white/10">Community & Vibe</div>
              <h2 className="text-5xl md:text-8xl font-black tracking-normal leading-[0.98] break-words">Epic <br /><span className="text-epicRed">Moments</span></h2>
            </div>
            <a href={links.instagram} target="_blank" className="group flex items-center gap-3 bg-white text-epicDark px-8 py-4 rounded-[20px] font-bold text-sm tracking-wide hover:bg-epicRed hover:text-white transition-all shadow-xl"><span>{lang === 'ru' ? 'Следить за нашей серф-жизнью' : 'Follow our surf life'}</span><InstagramIcon /></a>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {eventGalleryGroups.map((group) => (
              <button
                key={group.key}
                onClick={() => setActiveGalleryEvent(group.key)}
                className={`rounded-full px-5 py-3 text-[11px] font-bold tracking-wide leading-snug transition-all active:scale-95 ${activeGalleryEvent === group.key ? 'bg-epicRed text-white' : 'bg-white/5 text-white/65 hover:bg-white/10 hover:text-white'}`}
              >
                {group.label}
              </button>
            ))}
          </div>

          <div className="relative overflow-visible">
            {/* Desktop Editorial Scroll */}
            <div className="hidden md:block relative max-h-[620px] lg:max-h-[720px] overflow-hidden">
              <div className="h-full max-h-[620px] lg:max-h-[720px] overflow-y-auto scrollbar-hide scroll-smooth pr-1">
                <div className="grid grid-cols-12 auto-rows-[220px] lg:auto-rows-[260px] gap-5 lg:gap-6 pb-24">
                  {activeGalleryGroup.photos.map((photo, idx) => (
                    <motion.div
                      key={`${activeGalleryGroup.key}-desktop-${photo}-${idx}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ scale: 1.02, zIndex: 30 }}
                      className={`relative ${galleryLayoutClasses[idx % galleryLayoutClasses.length]} group cursor-pointer overflow-hidden rounded-[32px] lg:rounded-[44px] border border-white/10 bg-white/5 shadow-2xl transition-shadow duration-500`}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                      <Image src={galleryPhotoSrc(photo)} alt={activeGalleryGroup.label} fill sizes="(min-width: 1024px) 50vw, 50vw" className="object-cover grayscale-[0.18] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-epicDark/80 to-transparent"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-epicDark to-transparent"></div>
            </div>
            {/* Mobile Swipe */}
            <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 gap-4 pb-4">
              {activeGalleryGroup.photos.map((photo) => (
                <div key={`${activeGalleryGroup.key}-mobile-${photo}`} className="w-[85vw] h-[380px] sm:h-[440px] flex-shrink-0 snap-center relative overflow-hidden rounded-[34px] shadow-xl border border-white/10">
                  <Image src={galleryPhotoSrc(photo)} alt={activeGalleryGroup.label} fill sizes="85vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="location" className="bg-epicDark text-white pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-20 text-center md:text-left">
            <div className="lg:col-span-5 space-y-12">
          <div><div className="text-4xl font-black uppercase tracking-normal mb-6">EPIC <span className="text-epicRed">SURF</span></div><p className="text-white/55 text-base md:text-lg leading-relaxed max-w-sm mx-auto md:mx-0">{t.heroSub}</p></div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href={links.instagram} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all"><InstagramIcon /></a>
                <a href={links.facebook} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all"><FacebookIcon /></a>
                <a href={links.youtube} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all"><YoutubeIcon /></a>
                <a href={links.threads} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all"><ThreadsIcon /></a>
                <a href={links.telegram} target="_blank" rel="noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all" aria-label="Epic Surf School Telegram direct chat" title="Telegram direct chat"><Send size={20} /></a>
                <a href={links.telegramChannel} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-white/5 px-5 text-[11px] font-bold tracking-wide leading-snug text-white hover:bg-epicRed transition-all" aria-label="Epic Surf School official Telegram channel" title="Epic Surf School official Telegram channel"><Send size={16} /> TG Channel</a>
              </div>
              <div className="pt-8 border-t border-white/5 font-bold text-[11px] tracking-wide text-white/55 flex items-center justify-center md:justify-start gap-3 mb-2 leading-snug">
                <MapPin size={16} className="text-epicRed" /> {t.locationAddress}
              </div>
            </div>
            <div className="lg:col-span-7 h-[450px] rounded-[60px] overflow-hidden border border-white/10 shadow-2xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s" className="w-full h-full border-none lg:grayscale lg:invert lg:contrast-125 lg:opacity-60 lg:hover:grayscale-0 lg:hover:invert-0 transition-all duration-1000" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-[11px] font-bold tracking-wide text-white/25 text-center md:text-left">© 2026 Epic Surf School — Ride Every Day</div>
        </div>
      </footer>

      {/* MESSENGERS FAB */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-end gap-4">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${isChatOpen ? 'bg-epicDark rotate-[135deg]' : 'bg-epicRed rotate-0'}`}>{isChatOpen ? <X size={32} color="white" /> : <MessageCircle size={32} color="white" />}</button>
        <AnimatePresence>{isChatOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} className="flex flex-col gap-4 mb-2">
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center rounded-full active:scale-95 shadow-xl overflow-hidden" aria-label="WhatsApp chat">
              <ChatWhatsAppIcon className="w-full h-full" />
            </a>
            <a href={links.telegram} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center rounded-full active:scale-95 shadow-xl overflow-hidden" aria-label="Telegram chat">
              <ChatTelegramIcon className="w-full h-full" />
            </a>
            <a href={links.zalo} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center rounded-full active:scale-95 shadow-xl overflow-hidden" aria-label="Zalo chat">
              <ChatZaloIcon className="w-full h-full" />
            </a>
          </motion.div>
        )}</AnimatePresence>
        {isChatOpen && <div onClick={() => setIsChatOpen(false)} className="fixed inset-0 z-[-1] bg-black/5 backdrop-blur-[2px]" />}
      </div>

      {/* 8. MODAL (УРОКИ) */}
      <AnimatePresence>{bookingUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingUrl(null)} className="absolute inset-0 bg-epicDark/95 backdrop-blur-md cursor-pointer" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-5xl h-[85vh] bg-epicWhite rounded-[40px] overflow-hidden z-10 flex flex-col shadow-2xl border border-white/20">
            <div className="flex justify-between items-center p-6 border-b border-epicPink bg-epicWhite text-epicDark font-bold uppercase text-[11px] tracking-wide leading-snug"><span>{t.modalTitle}</span><button onClick={() => setBookingUrl(null)} className="p-2 bg-epicPink rounded-full text-epicDark"><X size={18} /></button></div>
            <div className="flex-1 bg-white relative"><iframe src={bookingUrl} className="w-full h-full border-none" title="Booking" /></div>
          </motion.div>
        </div>
      )}</AnimatePresence>

      {/* 9. RENTAL MODAL (АРЕНДА) — ВСТАВЛЕНО СЮДА */}
      <AnimatePresence>
        {showRentalOptions && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRentalOptions(false)}
              className="absolute inset-0 bg-epicDark/95 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[50px] p-10 shadow-2xl text-center border border-white/20"
            >
              <button onClick={() => setShowRentalOptions(false)} className="absolute top-8 right-8 text-epicDark/20 hover:text-epicRed transition-colors">
                <X size={24} />
              </button>

              <div className="mb-10 pt-4 text-epicDark">
                <div className="w-20 h-20 bg-[#EDF2F4] rounded-[30px] flex items-center justify-center text-epicRed mx-auto mb-6 shadow-sm">
                  <MessageCircle size={40} />
                </div>
                <h3 className="text-3xl font-black tracking-normal leading-tight break-words mb-3">{t.rentalModalTitle}</h3>
                <p className="opacity-60 text-sm leading-relaxed">{t.rentalModalSub}</p>
              </div>

              <div className="flex flex-col gap-4">
                <a href={`${links.whatsapp}?text=${encodeURIComponent(t.msgRental)}`} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#25D366] text-white px-8 py-5 rounded-2xl font-bold uppercase text-[11px] tracking-wide leading-snug hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  WhatsApp <MessageCircle size={20} />
                </a>
                <a href={links.telegram} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#0088cc] text-white px-8 py-5 rounded-2xl font-bold uppercase text-[11px] tracking-wide leading-snug hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  Telegram <ArrowUp size={20} className="rotate-45" />
                </a>
                <a href={links.zalo} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#0068ff] text-white px-8 py-5 rounded-2xl font-bold uppercase text-[11px] tracking-wide leading-snug hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  Zalo <span className="text-lg font-black">Z</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ И ИКОНКИ ---

function WaveDivider({ flip = false, color = "#FFFFFF" }) {
  return (
    <div className={`relative w-full overflow-hidden leading-[0] z-20 ${flip ? 'rotate-180 -mt-1' : '-mb-1'}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,-1.11,1200,0H0Z" fill={color} opacity="0.25"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5V0H0Z" fill={color} opacity="0.5"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0H0Z" fill={color}></path>
      </svg>
    </div>
  );
}

function CustomSurfIcon() {
  return (
    <svg width="100%" height="100%" viewBox="-2 -2 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0529 6.50719C13.3329 3.22719 18.3609 1.84219 20.9389 2.01419C21.3019 2.03919 21.4829 2.05119 21.7159 2.28419C21.9489 2.51619 21.9609 2.69819 21.9859 3.06119C22.1579 5.63919 20.7739 10.6672 17.4929 13.9472C14.4459 16.9942 9.81491 19.8992 6.80991 21.6482C6.45691 21.8542 6.27991 21.9572 6.13291 21.9852C5.92706 22.0235 5.7143 21.9871 5.53285 21.8827C5.3514 21.7782 5.21314 21.6124 5.14291 21.4152C5.09291 21.2742 5.09291 21.0652 5.09291 20.6492C5.09291 20.2522 5.09291 20.0542 5.04991 19.8912C4.99046 19.6651 4.87201 19.4588 4.70667 19.2934C4.54134 19.1281 4.33505 19.0096 4.10891 18.9502C3.94591 18.9072 3.74791 18.9072 3.35091 18.9072C2.93391 18.9072 2.72591 18.9072 2.58391 18.8572C2.38685 18.7868 2.22132 18.6484 2.11704 18.467C2.01276 18.2856 1.97655 18.0729 2.01491 17.8672C2.04291 17.7192 2.14491 17.5432 2.35091 17.1892C4.10091 14.1852 7.00491 9.55419 10.0529 6.50719Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 8C17.41 14.134 10.398 8.453 5.5 12.5M7 17L8 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SizesIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.678 20.5C4.936 18.536 4.5 15.966 4.5 13.185C4.5 10.23 4.992 7.52 5.816 5.521C6.226 4.523 6.736 3.666 7.338 3.047C7.944 2.425 8.691 2 9.548 2C10.407 2 11.154 2.425 11.759 3.047C12.362 3.666 12.871 4.523 13.282 5.521C13.3847 5.77033 13.482 6.03 13.574 6.3C13.6867 6.13867 13.8 5.983 13.914 5.833C14.553 4.998 15.248 4.318 15.974 3.887C16.702 3.453 17.517 3.239 18.33 3.457C19.144 3.675 19.743 4.267 20.157 5.007C20.569 5.744 20.832 6.68 20.967 7.723C21.238 9.813 21.017 12.486 20.273 15.265C19.746 17.232 19.017 19.025 18.18 20.5H20C20.1989 20.5 20.3897 20.579 20.5303 20.7197C20.671 20.8603 20.75 21.0511 20.75 21.25C20.75 21.4489 20.671 21.6397 20.5303 21.7803C20.3897 21.921 20.1989 22 20 22H4C3.80109 22 3.61032 21.921 3.46967 21.7803C3.32902 21.6397 3.25 21.4489 3.25 21.25C3.25 21.0511 3.32902 20.8603 3.46967 20.7197C3.61032 20.579 3.80109 20.5 4 20.5H5.678ZM7.203 6.092C6.47 7.869 6 10.377 6 13.185C6 16.119 6.513 18.718 7.297 20.5H10.085C9.761 18.372 9.971 15.595 10.744 12.712C11.204 10.993 11.818 9.41 12.522 8.056C12.3616 7.38681 12.152 6.73037 11.895 6.092C11.528 5.202 11.11 4.53 10.685 4.093C10.262 3.659 9.878 3.5 9.549 3.5C9.219 3.5 8.836 3.659 8.413 4.093C7.987 4.53 7.569 5.201 7.203 6.092ZM16.427 20.5C17.036 19.5432 17.551 18.5299 17.965 17.474L15.529 15.248C15.4404 15.1667 15.3335 15.108 15.2175 15.0766C15.1014 15.0453 14.9795 15.0423 14.862 15.068L11.639 15.778C11.377 17.588 11.379 19.222 11.605 20.5H16.427ZM13.222 10.091L15.622 9.563C15.9741 9.4855 16.3396 9.49374 16.6879 9.58702C17.0361 9.6803 17.3568 9.85589 17.623 10.099L19.437 11.757C19.614 10.322 19.622 9.011 19.48 7.917C19.36 6.988 19.136 6.255 18.848 5.74C18.561 5.228 18.245 4.987 17.942 4.906C17.64 4.826 17.245 4.876 16.741 5.176C16.234 5.477 15.674 6.001 15.106 6.744C14.436 7.621 13.786 8.761 13.222 10.091ZM12.592 11.766C12.3296 12.5579 12.1086 13.363 11.93 14.178L14.539 13.604C14.8912 13.5263 15.257 13.5345 15.6054 13.6278C15.9538 13.7211 16.2747 13.8967 16.541 14.14L18.513 15.942C18.7659 15.1469 18.9772 14.3391 19.146 13.522L16.611 11.206C16.5222 11.1251 16.4153 11.0667 16.2992 11.0357C16.1831 11.0047 16.0613 11.0021 15.944 11.028L12.592 11.766Z" fill="currentColor" />
    </svg>
  );
}

function LycraIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3V4.5M17 13C17 11.6739 16.4732 10.4021 15.5355 9.46447C14.5979 8.52678 13.3261 8 12 8C10.6739 8 9.40215 8.52678 8.46447 9.46447C7.52678 10.4021 7 11.6739 7 13M5.988 6.99L4.928 5.929M22 13H20.5M3.5 13H2M19.07 5.929L18.01 6.989M6.5 16V19C6.5 19.943 6.5 20.414 6.793 20.707C7.086 21 7.557 21 8.5 21C9.443 21 9.914 21 10.207 20.707C10.5 20.414 10.5 19.943 10.5 19V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5 16L15.5 21L17.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WetsuitIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 22.5006V21.5006H3C3.53333 21.5006 4.04667 21.4173 4.54 21.2506C5.03333 21.0839 5.52 20.8533 6 20.5586C6.48 20.8533 6.96667 21.0829 7.46 21.2476C7.95333 21.4123 8.46667 21.4946 9 21.4946C9.53333 21.4946 10.051 21.4123 10.553 21.2476C11.055 21.0829 11.5373 20.8529 12 20.5576C12.48 20.8529 12.9667 21.0829 13.46 21.2476C13.9533 21.4123 14.4667 21.4946 15 21.4946C15.5333 21.4946 16.051 21.4123 16.553 21.2476C17.055 21.0829 17.5373 20.8529 18 20.5576C18.4627 20.8529 18.945 21.0839 19.447 21.2506C19.949 21.4173 20.4667 21.5006 21 21.5006H21.5V22.5006H21C20.522 22.5006 20.033 22.4349 19.533 22.3036C19.033 22.1723 18.522 21.9689 18 21.6936C17.478 21.9689 16.967 22.1723 16.467 22.3036C15.967 22.4349 15.478 22.5006 15 22.5006C14.522 22.5006 14.033 22.4349 13.533 22.3036C13.033 22.1723 12.522 21.9689 12 21.6936C11.478 21.9689 10.967 22.1723 10.467 22.3036C9.967 22.4349 9.478 22.5006 9 22.5006C8.522 22.5006 8.033 22.4349 7.533 22.3036C7.033 22.1723 6.522 21.9689 6 21.6936C5.478 21.9689 4.967 22.1723 4.467 22.3036C3.967 22.4349 3.478 22.5006 3 22.5006H2.5ZM8.692 4.30859L14.05 5.29459C14.2067 5.32793 14.3643 5.39726 14.523 5.50259C14.6823 5.60793 14.8113 5.75526 14.91 5.94459L15.785 7.49459C16.2183 8.24459 16.815 8.86893 17.575 9.36759C18.335 9.86626 19.169 10.1543 20.077 10.2316V11.2506C18.9303 11.1613 17.885 10.7946 16.941 10.1506C15.9957 9.50726 15.234 8.63493 14.656 7.53359L11.329 9.96259L15.5 13.2506V17.1006C15.7413 17.2713 16.0413 17.4979 16.4 17.7806C16.7587 18.0633 17.042 18.2906 17.25 18.4626C17.0413 18.6339 16.738 18.7856 16.34 18.9176C15.9427 19.0496 15.496 19.1156 15 19.1156C14.4767 19.1156 13.9533 19.0156 13.43 18.8156C12.9073 18.6156 12.4307 18.2989 12 17.8656C11.5693 18.2989 11.1243 18.6063 10.665 18.7876C10.2063 18.9676 9.76667 19.0709 9.346 19.0976C9.30733 19.0976 9.27 19.0943 9.234 19.0876C9.19733 19.0823 9.16167 19.0739 9.127 19.0626C7.51367 18.0659 6.17267 17.0099 5.104 15.8946C4.03467 14.7793 3.5 13.9063 3.5 13.2756C3.5 12.9643 3.64567 12.7573 3.937 12.6546C4.22767 12.5519 4.532 12.5006 4.85 12.5006C5.308 12.5006 5.956 12.6066 6.794 12.8186C7.632 13.0306 8.59533 13.3726 9.684 13.8446L8.345 8.89059L12.316 6.00059L11.703 5.89059C11.3697 5.82926 11.0063 5.75859 10.613 5.67859C10.2197 5.59859 9.85667 5.52793 9.524 5.46659C9.19133 5.40526 8.98733 5.36859 8.912 5.35659L6.336 7.12759L5.769 6.30459L8.692 4.30859ZM10.108 10.6586L10.731 14.2696C11.2837 14.5376 11.887 14.8603 12.541 15.2376C13.1943 15.6156 13.8473 15.9979 14.5 16.3846V13.9426L10.108 10.6586ZM17 5.19259C16.54 5.19259 16.143 5.02593 15.809 4.69259C15.475 4.35793 15.308 3.96059 15.308 3.50059C15.308 3.04059 15.4747 2.64359 15.808 2.30959C16.1413 1.97559 16.5387 1.80859 17 1.80859C17.4613 1.80859 17.8583 1.97526 18.191 2.30859C18.525 2.64326 18.692 3.04059 18.692 3.50059C18.692 3.96059 18.5253 4.35759 18.192 4.69159C17.8573 5.02559 17.46 5.19259 17 5.19259Z" fill="currentColor" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 20.9992C18.801 19.7722 15.584 18.9992 12 18.9992C8.416 18.9992 5.199 19.7722 3 20.9992M9.5 6.44917C7.833 6.11417 5 6.44917 3.5 9.48217M9.5 6.44917C12 5.94717 15 7.47117 15 11.4972M9.5 6.44917C8.5 4.43317 6.5 2.94017 3 4.95217M9.5 6.45017C10.5 6.95417 11.5 8.47717 11.5 11.9992M9.5 6.49917C8.5 8.33217 6.5 13.4992 6.5 19.4992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 7C20.1046 7 21 6.10457 21 5C21 3.89543 20.1046 3 19 3C17.8954 3 17 3.89543 17 5C17 6.10457 17.8954 7 19 7Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChatTelegramIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#chatTelegramClip)">
        <path d="M8.00201 0H7.99801C3.58701 0 1.04969e-05 3.588 1.04969e-05 8C-0.0027286 9.68501 0.530659 11.3272 1.52301 12.689L0.526011 15.661L3.60101 14.678C4.90538 15.5434 6.43669 16.0034 8.00201 16C12.413 16 16 12.411 16 8C16 3.589 12.413 0 8.00201 0Z" fill="url(#chatTelegramGradient)" />
        <path d="M3.62693 7.9082C5.95943 6.8922 7.51443 6.22237 8.29193 5.8987C10.5144 4.97458 10.9757 4.81408 11.2769 4.80864C11.3432 4.80758 11.4907 4.82395 11.5869 4.90177C11.6669 4.96739 11.6894 5.05614 11.7007 5.11845C11.7107 5.1807 11.7244 5.32258 11.7132 5.43333C11.5932 6.69833 11.0719 9.76808 10.8069 11.185C10.6957 11.7845 10.4744 11.9855 10.2607 12.0051C9.79568 12.0478 9.44318 11.6981 8.99318 11.4032C8.28943 10.9416 7.89193 10.6543 7.20818 10.204C6.41818 9.68345 6.93068 9.39733 7.38068 8.92983C7.49818 8.80745 9.54568 6.94558 9.58443 6.7767C9.58943 6.75558 9.59443 6.67683 9.54693 6.63533C9.50068 6.5937 9.43193 6.60795 9.38193 6.6192C9.31068 6.6352 8.18693 7.3787 6.00693 8.84958C5.68818 9.06883 5.39943 9.1757 5.13943 9.17008C4.85443 9.16395 4.30443 9.00858 3.89568 8.87583C3.39568 8.71295 2.99693 8.62683 3.03193 8.3502C3.04943 8.2062 3.24818 8.05883 3.62693 7.9082Z" fill="white" />
      </g>
      <defs>
        <linearGradient id="chatTelegramGradient" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229FDA" />
        </linearGradient>
        <clipPath id="chatTelegramClip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ChatWhatsAppIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#chatWhatsAppClip)">
        <path d="M8.00201 0H7.99801C3.58701 0 1.04969e-05 3.588 1.04969e-05 8C-0.0027286 9.68501 0.530659 11.3272 1.52301 12.689L0.526011 15.661L3.60101 14.678C4.90538 15.5434 6.43669 16.0034 8.00201 16C12.413 16 16 12.411 16 8C16 3.589 12.413 0 8.00201 0Z" fill="#4CAF50" />
        <path d="M12.6571 11.2982C12.4641 11.8432 11.6981 12.2952 11.0871 12.4272C10.6691 12.5162 10.1231 12.5872 8.28505 11.8252C5.93405 10.8512 4.42005 8.46216 4.30205 8.30716C4.18905 8.15216 3.35205 7.04216 3.35205 5.89416C3.35205 4.74616 3.93505 4.18716 4.17005 3.94716C4.36305 3.75016 4.68205 3.66016 4.98805 3.66016C5.08705 3.66016 5.17605 3.66516 5.25605 3.66916C5.49105 3.67916 5.60905 3.69316 5.76405 4.06416C5.95705 4.52916 6.42705 5.67716 6.48305 5.79516C6.54005 5.91316 6.59705 6.07316 6.51705 6.22816C6.44205 6.38816 6.37605 6.45916 6.25805 6.59516C6.14005 6.73116 6.02805 6.83516 5.91005 6.98116C5.80205 7.10816 5.68005 7.24416 5.81605 7.47916C5.95205 7.70916 6.42205 8.47616 7.11405 9.09216C8.00705 9.88716 8.73105 10.1412 8.99005 10.2492C9.18305 10.3292 9.41305 10.3102 9.55405 10.1602C9.73305 9.96716 9.95405 9.64716 10.1791 9.33216C10.3391 9.10616 10.5411 9.07816 10.7531 9.15816C10.9691 9.23316 12.1121 9.79816 12.3471 9.91516C12.5821 10.0332 12.7371 10.0892 12.7941 10.1882C12.8501 10.2872 12.8501 10.7522 12.6571 11.2982Z" fill="#FAFAFA" />
      </g>
      <defs>
        <clipPath id="chatWhatsAppClip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ChatZaloIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#chatZaloClip)">
        <path d="M8.00201 0H7.99801C3.58701 0 1.04969e-05 3.588 1.04969e-05 8C-0.0027286 9.68501 0.530659 11.3272 1.52301 12.689L0.526011 15.661L3.60101 14.678C4.90538 15.5434 6.43669 16.0034 8.00201 16C12.413 16 16 12.411 16 8C16 3.589 12.413 0 8.00201 0Z" fill="#0068FF" />
        <path d="M8.245 7.17927V6.9657H8.91835V9.96865H8.53315C8.45701 9.96869 8.38395 9.94008 8.32995 9.88908C8.27595 9.83809 8.24541 9.76885 8.245 9.69651C7.96399 9.89197 7.62437 9.99739 7.2761 9.99701C6.3692 9.99701 5.6339 9.29888 5.6339 8.43787C5.6339 7.5769 6.3692 6.87878 7.2761 6.87878C7.62437 6.8784 7.96399 6.98382 8.245 7.17927ZM5.4594 6V6.09738C5.4594 6.27898 5.4339 6.42723 5.30965 6.60113L5.29465 6.61742C5.26755 6.64664 5.2039 6.71528 5.1736 6.75247L3.012 9.33004H5.4594V9.69495C5.45938 9.7309 5.45191 9.7665 5.4374 9.79971C5.4229 9.83293 5.40166 9.8631 5.37488 9.88851C5.34811 9.91392 5.31632 9.93407 5.28135 9.94781C5.24638 9.96156 5.2089 9.96862 5.17105 9.9686H2V9.79655C2 9.58584 2.0551 9.49188 2.12475 9.39393L4.4291 6.68421H2.0961V6H5.4594ZM9.73505 9.96865C9.67141 9.96862 9.61038 9.94461 9.56536 9.90188C9.52033 9.85915 9.49499 9.8012 9.4949 9.74074V6H10.2157V9.96865H9.73505ZM12.3467 6.85997C13.26 6.85997 14 7.56332 14 8.4296C14 9.2966 13.2599 10 12.3467 10C11.4335 10 10.6934 9.2966 10.6934 8.4296C10.6934 7.56332 11.4335 6.85997 12.3467 6.85997ZM7.2761 9.35522C7.80985 9.35522 8.2423 8.94457 8.2423 8.43787C8.2423 7.93198 7.8098 7.52133 7.2761 7.52133C6.7424 7.52133 6.3099 7.93193 6.3099 8.43787C6.3099 8.94457 6.7424 9.35522 7.2761 9.35522ZM12.3467 9.35365C12.8835 9.35365 13.3192 8.94005 13.3192 8.4296C13.3192 7.91991 12.8835 7.50637 12.3467 7.50637C11.809 7.50637 11.3742 7.91991 11.3742 8.4296C11.3742 8.94005 11.809 9.35365 12.3467 9.35365Z" fill="white" />
      </g>
      <defs>
        <clipPath id="chatZaloClip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function InstagramIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>); }
function FacebookIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>); }
function YoutubeIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>); }
function ThreadsIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.25 20.25C17.25 21.75 14.5 22.5 12 22.5C6.75 22.5 2.5 18.25 2.5 13C2.5 7.75 6.75 3.5 12 3.5C14.5 3.5 16.75 4.5 18.25 6C19.75 7.5 20.5 9.75 20.5 12.25C20.5 14.75 19.5 16.5 18 17.5C16.5 18.5 14.5 18.5 13 17.5C12.5 17.15 12.15 16.75 11.85 16.25C11.15 16.85 10.25 17.25 9.25 17.25C7.25 17.25 5.75 15.75 5.75 13.5C5.75 11.25 7.25 9.75 9.25 9.75C10.25 9.75 11.15 10.15 11.85 10.75C12.15 10.25 12.5 9.75 13 9.75C15 9.75 16.5 11.25 16.5 13.5C16.5 15.75 15 17.25 13 17.25C12.75 17.25 12.5 17.25 12.25 17.15C12.5 17.75 13 18.25 13.5 18.5" /></svg>); }

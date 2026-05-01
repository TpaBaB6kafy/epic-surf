"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Waves, MapPin, Target, Award, Star, Phone, MessageCircle,
  X, Globe, ShieldCheck, Users, Wind, Thermometer, ArrowUp, Menu,
  Shirt, Camera, Sun, Smile, CheckCircle2, ChevronLeft, ChevronRight
} from "lucide-react";

export default function EpicSurfLanding() {
  const[isMenuOpen, setIsMenuOpen] = useState(false);
  const[showRentalOptions, setShowRentalOptions] = useState(false);
  const [mapActive, setMapActive] = useState(false);
  const[lang, setLang] = useState('ru');
  const [bookingUrl, setBookingUrl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const[openFaq, setOpenFaq] = useState(null);
  const [forecast, setForecast] = useState(null);

  const boardSliderRef = useRef(null);

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
  },[]);

  const translations = {
    ru: {
      howTitle: "Как проходят",
      howTitleEnd: "уроки",
      howIntro: "Мы разработали систему обучения, которая позволяет 90% новичков встать на доску уже на первом занятии. Ваш прогресс и безопасность — наш главный приоритет.",
      rentalModalTitle: "Забронировать аренду",
      rentalModalSub: "Выберите удобный мессенджер. Мы ответим вам в течение 5 минут.",
      msgRental: "Привет! Хочу забронировать аренду доски в Epic Surf.",
      includedTitle: "В стоимость включено",
      includedItems:[
        { icon: <CustomSurfIcon />, label: "Серф", desc: "Доска под твой уровень" },
        { icon: <Shirt size={32} />, label: "Экип", desc: "Лайкра твоего размера" },
        { icon: <Sun size={32} />, label: "Защита", desc: "Профессиональный цинк" },
        { icon: <Camera size={32} />, label: "Контент", desc: "Фото и видео с урока" },
        { icon: <Smile size={32} />, label: "Вайб", desc: "Кокос и обучение с душой" }
      ],
      whyItems:[
        { icon: <ShieldCheck size={40} />, title: "ISA Сертификация", desc: "Наши инструкторы — профи с международными дипломами." },
        { icon: <Users size={40} />, title: "Твой вайб", desc: "Мы не просто школа, мы — комьюнити. Кокосы и лучший чилл." },
        { icon: <Award size={40} />, title: "Премиум стафф", desc: "Только свежее оборудование. Регулярно обновляем доски." },
        { icon: <Target size={40} />, title: "Личный прогресс", desc: "Тренер контролирует каждое движение и твой темп." }
      ],
      navLessons: "Уроки", navRentals: "Аренда", navHow: "Процесс", navForecast: "Прогноз", navLocation: "Карта", btnBook: "Записаться",
      heroTitle: "Поймай свою", heroTitleEpic: "Epic", heroTitleEnd: "волну в Дананге",
      heroSub: "Лучшая серф-школа на пляже Микхе. Профессиональное обучение и топовое оборудование и лучшее комьюнити.",
      sectionTitle: "Выбери свой", sectionTitleRide: "Формат",
      rentalBadge: "Gear up", rentalTitle: "Аренда", rentalTitleSurf: "Досок",
      rentalDesc: "Мы предоставляем премиальные софт-топы, лонгборды и шортборды. Поможем подобрать доску под текущие условия.",
      rentalPrice: "от 250,000 VND", rentalUnit: "Сессия / 2 часа", rentalBtn: "Арендовать",
      reviewsTitle: "Лучшие вайбы в Дананге", reviewsLink: "Читать все отзывы на Google Maps",
      locationTitle: "Найди наш", locationTitleSpot: "Спот",
      locationAddress: "Пляж Микхе, Дананг", locationLandmark: "Ищите красный флаг EPIC SURF на песке напротив TMS Hotel",
      modalTitle: "Запись", featureLycra: "Лайкры и цинк", featureSizes: "Все размеры", featureWetsuits: "Гидрокостюмы", featureDelivery: "Привозим на спот",
      boardTypes:["Софтборды", "Лонгборды", "Малибу", "Шортборды"],
      howSteps:[
        { title: "Встреча и экип", time: "15 мин", descA: "Знакомимся с вашим тренером, подбираем софтборд по росту и весу. Выдаем чистую лайкру и наносим профи-цинк.", descB: "Берем доски и отправляемся на берег к месту тренировки. Начинаем плавное погружение в атмосферу океана." },
        { title: "Теория и база", time: "20 мин", descA: "Проводим суставную разминку на песке. Разбираем правила безопасности, этикет в воде и механику волн.", descB: "Отрабатываем технику гребли и вставания на доску (pop-up). Тренер корректирует движения до автоматизма." },
        { title: "Практика в воде", time: "75 мин", descA: "Идем в океан! Инструктор помогает преодолеть прибой и контролирует каждое ваше движение в воде.", descB: "Ловим первые волны! Тренер подталкивает и дает советы в моменте. Вы чувствуете драйв и реальное скольжение." },
        { title: "Разбор и чилл", time: "10 мин", descA: "Возвращаемся на базу. Отдыхаем в тени с холодным кокосом и делимся первыми впечатлениями от каталки.", descB: "Проводим видео-разбор ваших ошибок. Скидываем весь отснятый фото и видео контент вам в мессенджер." }
      ],
      forecastTitle: "Условия на", forecastTitleSpot: "Сегодня", forecastPeriod: "Период", forecastWind: "Ветер", forecastDir: "Направление", forecastWater: "Вода",
      forecastStatusGood: "Идеально для обучения", forecastStatusHigh: "Только для опытных", forecastWaveHeight: "Высота волны",
      faqTitle: "Вопросы и", faqTitleEnd: "Ответы",
      faqItems:[
        { q: "Нужно ли уметь плавать?", a: "Желательно уметь держаться на воде. Уроки проходят на безопасной глубине, а инструктор всегда рядом." },
        { q: "Что брать с собой?", a: "Купальник/плавки, полотенце, солнцезащитный крем. Лайкру и цинк мы дадим." },
        { q: "В какое время лучше приходить?", a: "Зависит от приливов. Напишите нам — мы подскажем лучшее время на завтра." }
      ],
      cards:[
        { title: "Групповой урок", badge: "Популярно", desc: "Идеально для новичков. До 4-х человек на инструктора.", price: "900,000 VND" },
        { title: "Сплит урок", badge: "Выгодно", desc: "Для 2-х человек. Больше внимания тренера. Цена за двоих.", price: "2,500,000 VND" },
        { title: "Приватный урок", badge: "Премиум", desc: "Индивидуальная тренировка для быстрого прогресса.", price: "1,800,000 VND" },
        { title: "Line-up / Pro", badge: "Для опытных", desc: "Выход на лайнап с гидом. Поиск лучших пиков.", price: "2,400,000 VND" }
      ],
      reviewsList:[
        { name: "Evgenia", text: "Отличные уроки! Ребята влюбили меня в серф! Очень понятные объяснения, много практики. 🔥", date: "Неделю назад" },
        { name: "Дмитрий Харламов", text: "Отличная команда! Паша — очень крутой инструктор с чувством юмора! 👍", date: "2 недели назад" },
        { name: "Peter Thanh", text: "Despite of the bad weather the instructor was very friendly and teach very well. 👌", date: "Месяц назад" }
      ]
    },
    en: {
      howTitle: "How it",
      howTitleEnd: "works",
      howIntro: "We have developed a teaching system that allows 90% of beginners to stand up on a board during their very first lesson. Your safety and progress are our priority.",
      rentalModalTitle: "Book your rental",
      rentalModalSub: "Choose your preferred messenger. We will reply within 5 minutes.",
      msgRental: "Hi! I want to book a surfboard rental at Epic Surf.",
      includedTitle: "What's Included",
      includedItems:[
        { icon: <CustomSurfIcon />, label: "Surfboard", desc: "Board for your level" },
        { icon: <Shirt size={32} />, label: "Gear", desc: "Fresh rashguard" },
        { icon: <Sun size={32} />, label: "Sun Block", desc: "Zinc protection" },
        { icon: <Camera size={32} />, label: "Media", desc: "Photos & videos" },
        { icon: <Smile size={32} />, label: "The Vibe", desc: "Coconut & good mood" }
      ],
      whyItems:[
        { icon: <ShieldCheck size={40} />, title: "ISA Certified", desc: "Our instructors are ISA professionals. Safety is our #1 priority." },
        { icon: <Users size={40} />, title: "The Surf Vibe", desc: "More than a school — we are a community. Free photos, coconuts and chill." },
        { icon: <Award size={40} />, title: "Premium Gear", desc: "Top-tier equipment only. We regularly update our boards." },
        { icon: <Target size={40} />, title: "Personal Focus", desc: "Your coach tracks every move and adjusts to your pace." }
      ],
      navLessons: "Lessons", navRentals: "Rentals", navHow: "Process", navForecast: "Forecast", navLocation: "Map", btnBook: "Book Now",
      heroTitle: "Catch Your", heroTitleEpic: "Epic", heroTitleEnd: "Wave in Da Nang",
      heroSub: "Best surf school on My Khe Beach. Expert coaching, top-tier gear, and the best community.",
      sectionTitle: "Choose Your", sectionTitleRide: "Ride",
      rentalBadge: "Professional Gear", rentalTitle: "Surf Board", rentalTitleSurf: "Rentals",
      rentalDesc: "We provide premium soft-tops, longboards, and performance shortboards.",
      rentalPrice: "from 250,000 VND", rentalUnit: "2 hour / Session", rentalBtn: "Rent Now",
      reviewsTitle: "The best surf vibes", reviewsLink: "Read more on Google Maps",
      locationTitle: "Find the", locationTitleSpot: "Spot",
      locationAddress: "My Khe Beach, Da Nang", locationLandmark: "Look for the Red EPIC SURF flag opposite TMS Hotel",
      modalTitle: "Booking", featureLycra: "Rashguards & Zinc", featureSizes: "All Sizes", featureWetsuits: "Wetsuits", featureDelivery: "Spot Delivery",
      boardTypes:["Softboards", "Longboards", "Malibus", "Shortboards"],
      howSteps:[
        { title: "Meet & Gear Up", time: "15 min", descA: "Meet your coach and pick the perfect board for your level. Get a fresh rashguard and professional sun zinc.", descB: "Grab the boards and head to the beach. Start soaking in the ocean vibes as we walk to our training spot." },
        { title: "Beach Theory", time: "20 min", descA: "Joint mobility warm-up on the sand. We cover ocean safety rules, wave etiquette, and water basics.", descB: "Practice paddling and the pop-up technique. Your coach will fix your stance until it's muscle memory." },
        { title: "Ocean Practice", time: "75 min", descA: "Time to surf! Your coach helps you get past the break and ensures your safety at all times in the water.", descB: "Catch your first waves! The coach gives you a push and real-time tips. Feel the speed and pure joy of surfing." },
        { title: "Review & Chill", time: "10 min", descA: "Head back to the base. Relax in the shade with a fresh coconut and share your first surfing stories.", descB: "Watch your session's video review. We'll send all high-res photos and videos directly to your phone." }
      ],
      forecastTitle: "Current", forecastTitleSpot: "Forecast", forecastPeriod: "Period", forecastWind: "Wind", forecastDir: "Direction", forecastWater: "Water",
      forecastStatusGood: "Perfect for beginners", forecastStatusHigh: "Advanced surfers only", forecastWaveHeight: "Wave Height",
      faqTitle: "FAQ", faqTitleEnd: "",
      faqItems:[
        { q: "Do I need to be a strong swimmer?", a: "Basic skills are enough. Lessons are held in safe depths." },
        { q: "What should I bring?", a: "Swimwear, towel, and sunscreen. We provide the rest." },
        { q: "When is the best time?", a: "Depends on tides. Text us for tomorrow's forecast." }
      ],
      cards:[
        { title: "Group Lesson", badge: "Most Popular", desc: "Perfect for beginners. Max 4 people.", price: "900,000 VND" },
        { title: "Split Lesson", badge: "Best Value", desc: "For 2 people. More coach attention.", price: "2,500,000 VND" },
        { title: "Private Lesson", badge: "Premium", desc: "1-on-1 coaching for maximum progress.", price: "1,800,000 VND" },
        { title: "Line-up / Pro", badge: "Advanced", desc: "Guiding to the best peaks.", price: "2,400,000 VND" }
      ],
      reviewsList:[
        { name: "Evgenia", text: "Great lessons! The team made us fall in love with surfing! 🔥", date: "1 week ago" },
        { name: "Dmitry Kharlamov", text: "Excellent team! Pasha is a very cool instructor! 👍", date: "2 weeks ago" },
        { name: "Peter Thanh", text: "Despite of the bad weather the instructor was friendly. 👌", date: "1 month ago" }
      ]
    }
  };

  const t = translations[lang];
  const links = {
    group: "https://n1304231.alteg.io/company/1248257/activity/select?o=m-1act2026-04-23",
    personal: "https://n1304231.alteg.io/company/1248257/personal/select-time?o=m-1",
    rental: "https://n1304231.alteg.io/company/1248257/personal/select-services?o=m-1",
    whatsapp: "https://wa.me/84383880164",
    telegram: "https://t.me/danangsurf",
    zalo: "https://zalo.me/84383880164",
    googleMaps: "https://www.google.com/maps/place/EPIC+Surf+School+Da+Nang/@16.0464674,108.2504812,17z",
    instagram: "https://www.instagram.com/epicsurfvn?igsh=eHdzMTZhanY2M2Zx",
    facebook: "https://www.facebook.com/epicsurfdanang/",
    youtube: "https://youtube.com/@epicsurf",
    threads: "https://threads.net/@epicsurf_danang"
  };

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-hidden transition-colors duration-500 scroll-smooth">

      {/* НЕВИДИМЫЙ SVG ФИЛЬТР ДЛЯ ЭФФЕКТА РВАНОЙ БУМАГИ НА ФОТО */}
      <svg className="hidden absolute pointer-events-none">
        <defs>
          <filter id="torn-edge" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 1. HEADER */}
      <header className="fixed top-0 left-0 w-full z-[100]">
        <div className="bg-white relative z-20 h-16 md:h-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex items-center justify-between gap-2">
            
            <a href="/" className="flex-shrink-0 transition-transform active:scale-95 z-[110]">
              <img src="/logo.png" alt="Logo" className="h-9 md:h-12 w-auto object-contain" />
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              <a href="#lessons" className="text-[10px] font-black uppercase tracking-widest text-epicDark hover:text-epicRed transition-colors">{t.navLessons}</a>
              <a href="#how-it-works" className="text-[10px] font-black uppercase tracking-widest text-epicDark hover:text-epicRed transition-colors">{t.navHow}</a>
              <a href="#forecast" className="text-[10px] font-black uppercase tracking-widest text-epicDark hover:text-epicRed transition-colors">{t.navForecast}</a>
              <a href="#location" className="text-[10px] font-black uppercase tracking-widest text-epicDark hover:text-epicRed transition-colors">{t.navLocation}</a>
            </nav>

            <div className="flex items-center gap-2 md:gap-4 z-[110]">
              <button 
                onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} 
                className="w-9 h-9 flex items-center justify-center bg-epicDark text-white paper-circle font-bold text-[10px] uppercase shadow-md"
              >
                {lang === 'ru' ? 'EN' : 'RU'}
              </button>
              
              <button 
                onClick={() => setBookingUrl(links.group)} 
                className="bg-epicRed text-white px-4 md:px-8 h-9 md:h-10 paper-btn font-black uppercase text-[10px] tracking-widest shadow-lg shadow-epicRed/20 active:scale-95 transition-all"
              >
                {t.btnBook}
              </button>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center bg-epicPink paper-circle text-epicDark transition-all"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-[calc(100%-2px)] left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg className="relative block w-full h-[25px] md:h-[40px]" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L1200,0 L1200,30 L1050,90 L850,20 L650,110 L400,15 L220,85 L80,10 L0,55 Z" fill="white"></path>
          </svg>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-white shadow-2xl border-t border-epicPink lg:hidden z-0 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 bg-white relative z-10">
                {[
                  { href: "#lessons", label: t.navLessons },
                  { href: "#how-it-works", label: t.navHow },
                  { href: "#forecast", label: t.navForecast },
                  { href: "#location", label: t.navLocation }
                ].map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-black uppercase tracking-tighter text-epicDark hover:text-epicRed py-2 border-b border-epicPink/50"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="h-10 w-full overflow-hidden leading-[0]">
                 <svg className="block w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 L1200,0 L1200,30 L1050,90 L850,20 L650,110 L400,15 L220,85 L80,10 L0,55 Z" fill="white"></path></svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5]">
          <source src="/hero-surf.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-40"
          style={{ backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`, backgroundSize: '6px 6px' }}
        ></div>

        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-epicDark/40 via-transparent to-epicDark/60 pointer-events-none"></div>

        <div className="relative z-10 text-center px-4 pt-20 flex flex-col items-center">
          <motion.h1
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="text-[10vw] sm:text-5xl md:text-8xl font-extrabold text-white uppercase tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl text-center flex flex-col items-center"
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="block">
              {t.heroTitle}
            </motion.span>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center justify-center whitespace-nowrap gap-x-3 md:gap-x-5 py-2"
            >
              <motion.img
                src="/gallery/epic-text.webp"
                alt="Epic"
                className="h-[1.1em] md:h-[1.4em] w-auto object-contain drop-shadow-xl translate-y-[12%]"
                animate={{ x:[0, 5, -5, 0], y:[0, -12, 5, 0], rotate:[-2, 1, -3, -2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, rotate: 0 }}
              />
              <span className="inline-block">{lang === 'ru' ? 'волну' : 'wave'}</span>
            </motion.div>

            <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="block">
              {lang === 'ru' ? 'в Дананге' : 'in Da Nang'}
            </motion.span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {t.heroSub}
          </motion.p>
        </div>
      </section>

      {/* WAVE TOP */}
      <WaveDivider color="#FFFFFF" flip={true} />

      {/* 2.5 WHY EPIC */}
      <section className="py-16 md:py-24 bg-epicWhite px-6 border-b border-epicPink/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-12 text-center">
            {t.whyItems.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-epicPink paper-circle mx-auto flex items-center justify-center text-epicRed shadow-sm border border-white/50">{item.icon}</div>
                <div className="space-y-2">
                  <h3 className="text-sm md:text-xl font-black uppercase text-epicDark leading-tight">{item.title}</h3>
                  <p className="text-epicDark/60 text-[11px] md:text-sm max-w-[160px] md:max-w-[280px] mx-auto leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.7 HOW IT WORKS */}
      <section id="how-it-works" className="relative py-32 overflow-hidden scroll-mt-24" style={{
        background: 'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8F9FA 50%, #EDF2F4 100%)'
      }}>
        <div className="absolute top-20 right-[-5%] text-[15vw] font-black text-epicRed/[0.02] uppercase pointer-events-none select-none italic">Ocean</div>
        <div className="absolute bottom-20 left-[-5%] text-[15vw] font-black text-epicCoral/[0.04] uppercase pointer-events-none select-none italic">Vibe</div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-epicDark leading-none">
              {t.howTitle} <span className="text-epicRed italic">{t.howTitleEnd}</span>
            </h2>
            <p className="text-epicDark/40 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              {t.howIntro}
            </p>
          </div>

          <div className="space-y-32 md:space-y-48">
            {t.howSteps.map((step, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2 relative group"
                >
                  <div className="absolute -inset-2 bg-epicRed/5 paper-edge rotate-1 group-hover:rotate-0 transition-transform duration-700"></div>
                  <div className="bg-white p-4 md:p-6 paper-edge-alt shadow-2xl border border-epicPink relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="aspect-[4/3] w-full paper-edge overflow-hidden bg-gray-100">
                      <img
                        src={`/gallery/process-${idx + 1}.webp`}
                        alt={step.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 torn-photo"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1537519646099-335112f03225?q=80&w=800'; }}
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="flex flex-col items-center lg:items-start space-y-4">
                    <div className="inline-block bg-epicRed text-white px-4 py-1 paper-btn text-[10px] font-black uppercase tracking-widest shadow-md">
                      {step.time}
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-epicDark leading-[0.9] text-center lg:text-left">
                      {step.title}
                    </h3>
                  </div>

                  <div className="grid gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: idx % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-6 md:p-8 bg-white/60 backdrop-blur-md paper-edge border border-white shadow-sm flex gap-5 items-start group hover:bg-white transition-colors"
                    >
                      <span className="text-2xl font-black text-epicRed/20 group-hover:text-epicRed transition-colors">1.</span>
                      <p className="text-epicDark/70 text-base md:text-lg leading-relaxed font-medium">
                        {step.descA}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: idx % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="p-6 md:p-8 bg-white/60 backdrop-blur-md paper-edge border border-white shadow-sm flex gap-5 items-start group hover:bg-white transition-colors"
                    >
                      <span className="text-2xl font-black text-epicRed/20 group-hover:text-epicRed transition-colors">2.</span>
                      <p className="text-epicDark/70 text-base md:text-lg leading-relaxed font-medium">
                        {step.descB}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LESSONS SERVICES */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24 overflow-hidden">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 md:mb-16 uppercase tracking-tighter text-epicDark">{t.sectionTitle} <span className="text-epicRed italic">{t.sectionTitleRide}</span></h2>
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {t.cards.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="min-w-[85vw] md:min-w-0 snap-center bg-epicPink paper-edge overflow-hidden shadow-lg flex flex-col border border-white/50">
              <img src={`/gallery/lesson-${i + 1}.webp`} alt={item.title} className="h-48 overflow-hidden object-cover w-full torn-photo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600'; }} />
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-4 text-epicRed">{i === 1 ? <Award size={32} /> : i === 2 ? <Star size={32} /> : <Waves size={32} />}</div>
                <div className="text-[10px] text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 uppercase text-epicDark">{item.title}</h3>
                <p className="text-epicDark/70 mb-6 text-sm flex-1">{item.desc}</p>
                <div className="text-2xl font-black mb-8 text-epicDark">{item.price}</div>
                <button onClick={() => setBookingUrl(links.group)} className="w-full bg-epicDark text-white py-5 paper-btn font-black uppercase text-xs hover:bg-epicRed transition-all shadow-lg active:scale-95">{t.btnBook}</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WHAT'S INCLUDED */}
        <div className="my-20 md:my-32 py-16 md:py-24 bg-epicPink/50 paper-edge-alt border border-white relative overflow-hidden">
          <h3 className="relative z-10 text-3xl md:text-7xl font-black uppercase mb-16 md:mb-24 tracking-tighter text-epicDark text-center">
            {t.includedTitle}
          </h3>

          <div className="flex lg:grid lg:grid-cols-5 gap-6 md:gap-8 overflow-x-auto lg:overflow-visible px-6 md:px-12 scrollbar-hide snap-x snap-mandatory relative z-10">
            {t.includedItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -12, scale: 1.05 }}
                className="min-w-[160px] md:min-w-0 flex-1 snap-center flex flex-col items-center group"
              >
                <div className={`relative mb-8 transition-all duration-500 ${idx % 2 === 0 ? 'rotate-[-4deg]' : 'rotate-[4deg]'} group-hover:rotate-0 ${idx === 0 ? 'w-32 h-32 md:w-48 md:h-48' : 'w-24 h-24 md:w-36 md:h-36'}`}>
                  <div className="absolute inset-4 bg-black/20 blur-2xl paper-circle translate-y-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={`/gallery/incl-${idx + 1}.webp`}
                    alt={item.label}
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=200'; }}
                  />
                </div>

                <div className="text-center space-y-2">
                  <div className="inline-block px-3 py-1 bg-white paper-btn shadow-sm border border-epicPink text-[10px] md:text-xs font-black uppercase text-epicRed mb-1">
                    {item.label}
                  </div>
                  <p className="text-[10px] md:text-sm font-bold text-epicDark/40 uppercase leading-tight tracking-widest max-w-[130px] mx-auto">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex lg:hidden justify-center gap-2 mt-12 opacity-20">
            {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 paper-circle bg-epicDark"></div>)}
          </div>
        </div>
      </section>

      {/* 4. RENTALS */}
      <section id="rentals" className="bg-epicDark text-white py-24 mt-20 relative overflow-hidden scroll-mt-24">
        <div className="absolute right-0 top-10 md:right-12 md:top-24 w-64 h-64 md:w-[500px] md:h-[500px] text-white/5 pointer-events-none -rotate-12 z-0">
          <SizesIcon />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
            <div className="lg:w-1/2 flex items-center justify-center relative group">
              <div className="relative w-full aspect-[4/3] lg:aspect-square overflow-hidden paper-edge border border-white/10 shadow-2xl bg-[#1a1c2c]">
                
                <div ref={boardSliderRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full scroll-smooth">
                  {[1, 2, 3, 4].map((num, idx) => (
                    <div key={num} className="min-w-full h-full snap-center relative">
                      <img src={`/gallery/board-${num}.webp`} alt={t.boardTypes[idx]} className="w-full h-full object-cover opacity-90 torn-photo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1537519646099-335112f03225?q=80&w=800'; }} />
                      <div className="absolute bottom-10 left-10"><div className="bg-black/50 backdrop-blur-md border border-white/10 text-white px-6 py-2 paper-btn text-[10px] font-black uppercase tracking-widest">{t.boardTypes[idx]}</div></div>
                    </div>
                  ))}
                </div>
                <button onClick={() => { boardSliderRef.current?.scrollBy({ left: -400, behavior: 'smooth' }); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md paper-circle flex items-center justify-center border border-white/10 hover:bg-epicRed transition-all hidden md:flex opacity-0 group-hover:opacity-100"><ChevronLeft size={28} /></button>
                <button onClick={() => { boardSliderRef.current?.scrollBy({ left: 400, behavior: 'smooth' }); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md paper-circle flex items-center justify-center border border-white/10 hover:bg-epicRed transition-all hidden md:flex opacity-0 group-hover:opacity-100"><ChevronRight size={28} /></button>
              
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="mb-12"><div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-epicRed"></div><span className="text-[10px] font-black uppercase tracking-[0.3em] text-epicRed">{t.rentalBadge}</span></div>
                <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none text-white">{t.rentalTitle} <br /><span className="text-epicRed italic">{t.rentalTitleSurf}</span></h2>
                <p className="text-white/50 text-lg md:text-xl max-w-lg leading-relaxed">{t.rentalDesc}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12">
                {[{ k: 'featureLycra', svg: <LycraIcon /> }, { k: 'featureSizes', svg: <SizesIcon /> }, { k: 'featureWetsuits', svg: <WetsuitIcon /> }, { k: 'featureDelivery', svg: <DeliveryIcon /> }].map((feat) => (
                  <div key={feat.k} className="flex items-center gap-4 p-6 paper-edge bg-white/5 border border-white/5 hover:border-epicRed/30 transition-all group backdrop-blur-sm">
                    <div className="w-10 h-10 flex-shrink-0 text-epicRed group-hover:scale-110 transition-transform">{feat.svg}</div>
                    <span className="text-[11px] font-black uppercase text-white/70 leading-tight tracking-wider">{t[feat.k]}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-white/10">
                <div className="text-center sm:text-left"><div className="text-4xl md:text-5xl font-black text-white">{t.rentalPrice}</div><div className="text-[10px] opacity-30 uppercase tracking-[0.2em] font-bold mt-2">{t.rentalUnit}</div></div>
                <button onClick={() => setShowRentalOptions(true)} className="w-full sm:w-auto px-12 py-6 bg-epicRed text-white paper-btn font-black uppercase text-sm hover:bg-white hover:text-epicRed transition-all shadow-xl active:scale-95">{t.rentalBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORECAST */}
      <section id="forecast" className="py-24 bg-epicWhite px-6 scroll-mt-24 border-t border-epicPink/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-epicDark paper-edge overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row min-h-[500px]">

            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 text-white">
              <div className="relative z-10 space-y-10">
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#00FF41] paper-circle animate-pulse shadow-[0_0_10px_#00FF41]"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">{t.forecastTitle} {t.forecastTitleSpot}</span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-8xl lg:text-9xl font-black tracking-tighter leading-none">{forecast?.height || "0.86"}</span>
                      <span className="text-3xl lg:text-5xl font-bold text-epicRed italic uppercase leading-none">m</span>
                    </div>
                    <div className="hidden md:block pl-6 border-l border-white/20">
                      <span className="text-sm font-black uppercase tracking-widest opacity-30">{t.forecastWaveHeight}</span>
                    </div>
                  </div>

                  <div className="bg-epicRed text-white px-5 py-2 paper-btn font-black text-[10px] lg:text-xs uppercase tracking-widest shadow-xl">
                    {(forecast?.height || 0.8) < 1.2 ? t.forecastStatusGood : t.forecastStatusHigh}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-10 gap-x-6 border-t border-white/10 pt-8">
                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[10px] lg:text-xs font-black uppercase opacity-30 flex items-center gap-2"><Waves className="w-4 h-4" /> {t.forecastPeriod}</div>
                    <span className="font-black text-3xl lg:text-4xl">{forecast?.period || "4.95"}s</span>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[10px] lg:text-xs font-black uppercase opacity-30 flex items-center gap-2"><Wind className="w-4 h-4" /> {t.forecastWind}</div>
                    <span className="font-black text-3xl lg:text-4xl">{Math.round(forecast?.windSpeed || 23)}<span className="text-xs lg:text-sm opacity-30 ml-1 uppercase">km/h</span></span>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[10px] lg:text-xs font-black uppercase opacity-30 flex items-center gap-2"><Globe className="w-4 h-4" /> {t.forecastDir}</div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-epicRed paper-circle flex items-center justify-center text-white" style={{ transform: `rotate(${forecast?.windDir || 225}deg)` }}><ArrowUp className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={4} /></div>
                      <span className="font-black text-2xl lg:text-3xl uppercase">SW</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[10px] lg:text-xs font-black uppercase opacity-30 flex items-center gap-2"><Thermometer className="w-4 h-4" /> {t.forecastWater}</div>
                    <span className="font-black text-3xl lg:text-4xl">26°C</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/5 h-[400px] lg:h-auto bg-white relative">
              <iframe
                src="https://embed.windy.com/embed2.html?lat=16.061&lon=108.247&zoom=11&overlay=waves&product=ecmwf&metricWind=km%2Fh"
                className={`w-full h-full border-none transition-opacity duration-500 ${mapActive ? 'opacity-100' : 'opacity-80'}`}
                title="Windy Forecast"
              ></iframe>

              {!mapActive && (
                <div
                  onClick={() => setMapActive(true)}
                  className="absolute inset-0 z-20 bg-epicDark/20 backdrop-blur-[1px] flex items-center justify-center lg:hidden cursor-pointer"
                >
                  <div className="bg-white/95 text-epicDark px-6 py-3 paper-btn font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center gap-2">
                    <Globe size={14} className="animate-spin" />
                    {lang === 'ru' ? 'Активировать карту' : 'Activate map'}
                  </div>
                </div>
              )}

              {mapActive && (
                <button onClick={() => setMapActive(false)} className="absolute top-4 right-4 z-30 bg-epicRed text-white p-2 paper-circle lg:hidden shadow-xl"><X size={20} /></button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS */}
      <section id="reviews" className="py-24 bg-epicPink border-y border-white/50 scroll-mt-24 text-center text-epicDark px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black mb-20 uppercase tracking-tighter leading-none">{t.reviewsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {t.reviewsList.map((rev, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-10 paper-edge shadow-xl text-left flex flex-col justify-between border border-white">
                <p className="font-medium italic leading-relaxed text-lg mb-8">"{rev.text}"</p>
                <div className="flex items-center gap-4 border-t border-epicPink pt-6">
                  <div className="w-14 h-14 bg-epicDark text-white paper-circle flex items-center justify-center font-black overflow-hidden border-2 border-white shadow-sm">
                    {rev.img ? <img src={rev.img} className="w-full h-full object-cover torn-photo" alt={rev.name} /> : rev.name.charAt(0)}
                  </div>
                  <div><div className="text-sm font-black uppercase tracking-widest">{rev.name}</div><div className="text-[10px] uppercase opacity-40 font-bold">{rev.date}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
          <a href={links.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-epicRed font-black uppercase text-xs tracking-widest">{t.reviewsLink} <Globe size={14} /></a>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-32 bg-epicWhite px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16">{t.faqTitle} <span className="text-epicRed italic">{t.faqTitleEnd}</span></h2>
          <div className="space-y-4">
            {t.faqItems.map((item, idx) => (
              <div key={idx} className="border-b border-epicPink pb-4">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center py-6 text-left group">
                  <span className="font-black uppercase text-lg md:text-2xl text-epicDark group-hover:text-epicRed transition-colors">{item.q}</span>
                  <div className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}><X size={24} className="text-epicRed" /></div>
                </button>
                <AnimatePresence>{openFaq === idx && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-6 text-epicDark/60 text-lg leading-relaxed">{item.a}</p></motion.div>}</AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY */}
      <section id="gallery" className="py-24 bg-epicDark px-6 scroll-mt-24 border-t border-white/5 overflow-visible">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="space-y-4 text-white">
              <div className="inline-block bg-white/5 text-epicRed px-4 py-1 paper-btn font-black text-[10px] uppercase tracking-widest border border-white/10">Community & Vibe</div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Epic <br /><span className="text-epicRed italic">Moments</span></h2>
            </div>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white text-epicDark px-8 py-4 paper-btn font-black uppercase text-[10px] hover:bg-epicRed hover:text-white transition-all shadow-xl"><span>Follow our surf life</span><InstagramIcon /></a>
          </div>

          <div className="relative overflow-visible">
            <div className="hidden md:block columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 overflow-visible">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <motion.div key={`desktop-${num}`} whileHover={{ scale: 1.05, zIndex: 50 }} className="relative break-inside-avoid group cursor-pointer mb-6">
                  <div className="absolute inset-0 bg-epicRed/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 paper-edge -z-10"></div>
                  <img src={`/gallery/${num}.webp`} alt="Surf" className="paper-edge w-full h-auto object-cover shadow-2xl border border-white/10 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 torn-photo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800'; }} />
                </motion.div>
              ))}
            </div>
            <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 gap-4 pb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={`mobile-${num}`} className="w-[85vw] flex-shrink-0 snap-center">
                  <img src={`/gallery/${num}.webp`} alt="Surf" className="paper-edge w-full h-[450px] object-cover shadow-xl border border-white/10 torn-photo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800'; }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WAVE BOTTOM */}
      <WaveDivider color="#2B2D42" />

      {/* 8. FOOTER */}
      <footer id="location" className="bg-epicDark text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-20 text-center md:text-left">
            <div className="lg:col-span-5 space-y-12">
              <div><div className="text-4xl font-black uppercase italic mb-6">EPIC <span className="text-epicRed">SURF</span></div><p className="text-white/50 text-xl leading-relaxed max-w-sm mx-auto md:mx-0">{t.heroSub}</p></div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 paper-circle hover:bg-epicRed transition-all"><InstagramIcon /></a>
                <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 paper-circle hover:bg-epicRed transition-all"><FacebookIcon /></a>
                <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 paper-circle hover:bg-epicRed transition-all"><YoutubeIcon /></a>
                <a href={links.threads} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 paper-circle hover:bg-epicRed transition-all"><ThreadsIcon /></a>
              </div>
              <div className="pt-8 border-t border-white/5 font-black uppercase text-[10px] tracking-widest text-white/50 flex items-center justify-center md:justify-start gap-3 mb-2">
                <MapPin size={16} className="text-epicRed" /> {t.locationAddress}
              </div>
            </div>
            <div className="lg:col-span-7 h-[450px] paper-edge overflow-hidden border border-white/10 shadow-2xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s" className="w-full h-full border-none lg:grayscale lg:invert lg:contrast-125 lg:opacity-60 lg:hover:grayscale-0 lg:hover:invert-0 transition-all duration-1000" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 text-center md:text-left">© 2026 Epic Surf School — Ride Every Day</div>
        </div>
      </footer>

      {/* MESSENGERS FAB */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-end gap-4">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 flex items-center justify-center paper-circle shadow-2xl transition-all duration-300 active:scale-90 ${isChatOpen ? 'bg-epicDark rotate-[135deg]' : 'bg-epicRed rotate-0'}`}>{isChatOpen ? <X size={32} color="white" /> : <MessageCircle size={32} color="white" />}</button>
        <AnimatePresence>{isChatOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} className="flex flex-col gap-4 mb-2">
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#25D366] text-white paper-circle active:scale-95 shadow-xl"><MessageCircle size={28} /></a>
            <a href={links.telegram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#0088cc] text-white paper-circle active:scale-95 shadow-xl"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg></a>
            <a href={links.zalo} target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#0068ff] text-white paper-circle text-lg font-black italic shadow-xl">Z</a>
          </motion.div>
        )}</AnimatePresence>
        {isChatOpen && <div onClick={() => setIsChatOpen(false)} className="fixed inset-0 z-[-1] bg-black/5 backdrop-blur-[2px]" />}
      </div>

      {/* 8. MODAL (УРОКИ) */}
      <AnimatePresence>{bookingUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingUrl(null)} className="absolute inset-0 bg-epicDark/95 backdrop-blur-md cursor-pointer" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-5xl h-[85vh] bg-epicWhite paper-edge overflow-hidden z-10 flex flex-col shadow-2xl border border-white/20">
            <div className="flex justify-between items-center p-6 border-b border-epicPink bg-epicWhite text-epicDark font-black uppercase text-[10px]"><span>{t.modalTitle}</span><button onClick={() => setBookingUrl(null)} className="p-2 bg-epicPink paper-circle text-epicDark"><X size={18} /></button></div>
            <div className="flex-1 bg-white relative"><iframe src={bookingUrl} className="w-full h-full border-none" title="Booking" /></div>
          </motion.div>
        </div>
      )}</AnimatePresence>

      {/* 9. RENTAL MODAL (АРЕНДА) */}
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
              className="relative w-full max-w-sm bg-white paper-edge p-10 shadow-2xl text-center border border-white/20"
            >
              <button onClick={() => setShowRentalOptions(false)} className="absolute top-8 right-8 text-epicDark/20 hover:text-epicRed transition-colors">
                <X size={24} />
              </button>

              <div className="mb-10 pt-4 text-epicDark">
                <div className="w-20 h-20 bg-[#EDF2F4] paper-circle flex items-center justify-center text-epicRed mx-auto mb-6 shadow-sm">
                  <MessageCircle size={40} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-3">{t.rentalModalTitle}</h3>
                <p className="opacity-60 text-sm leading-relaxed">{t.rentalModalSub}</p>
              </div>

              <div className="flex flex-col gap-4">
                <a href={`${links.whatsapp}?text=${encodeURIComponent(t.msgRental)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[#25D366] text-white px-8 py-5 paper-btn font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  WhatsApp <MessageCircle size={20} />
                </a>
                <a href={links.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[#0088cc] text-white px-8 py-5 paper-btn font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  Telegram <ArrowUp size={20} className="rotate-45" />
                </a>
                <a href={links.zalo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[#0068ff] text-white px-8 py-5 paper-btn font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  Zalo <span className="text-lg font-black italic tracking-tighter">Z</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ...ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ И ИКОНКИ НИЖЕ (ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ)...

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
    </svg>
  );
}

function WetsuitIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 22.5006V21.5006H3C3.53333 21.5006 4.04667 21.4173 4.54 21.2506C5.03333 21.0839 5.52 20.8533 6 20.5586C6.48 20.8533 6.96667 21.0829 7.46 21.2476C7.95333 21.4123 8.46667 21.4946 9 21.4946C9.53333 21.4946 10.051 21.4123 10.553 21.2476C11.055 21.0829 11.5373 20.8529 12 20.5576" fill="currentColor" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 20.9992C18.801 19.7722 15.584 18.9992 12 18.9992C8.416 18.9992 5.199 19.7722 3 20.9992M9.5 6.44917C7.833 6.11417 5 6.44917 3.5 9.48217" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>); }
function FacebookIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>); }
function YoutubeIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>); }
function ThreadsIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.25 20.25C17.25 21.75 14.5 22.5 12 22.5C6.75 22.5 2.5 18.25 2.5 13C2.5 7.75 6.75 3.5 12 3.5C14.5 3.5 16.75 4.5 18.25 6C19.75 7.5 20.5 9.75 20.5 12.25C20.5 14.75 19.5 16.5 18 17.5C16.5 18.5 14.5 18.5 13 17.5C12.5 17.15 12.15 16.75 11.85 16.25C11.15 16.85 10.25 17.25 9.25 17.25C7.25 17.25 5.75 15.75 5.75 13.5C5.75 11.25 7.25 9.75 9.25 9.75C10.25 9.75 11.15 10.15 11.85 10.75C12.15 10.25 12.5 9.75 13 9.75C15 9.75 16.5 11.25 16.5 13.5C16.5 15.75 15 17.25 13 17.25C12.75 17.25 12.5 17.25 12.25 17.15C12.5 17.75 13 18.25 13.5 18.5" /></svg>); }
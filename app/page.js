"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Waves, MapPin, Award, Star, Phone, MessageCircle, 
  X, Globe, ShieldCheck, Users, Wind, Thermometer, ArrowUp
} from "lucide-react";

export default function EpicSurfLanding() {
  const [lang, setLang] = useState('ru'); 
  const [bookingUrl, setBookingUrl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [forecast, setForecast] = useState(null);

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
      navLessons: "Уроки", navRentals: "Аренда", navHow: "Процесс", navForecast: "Прогноз", navLocation: "Карта", btnBook: "Записаться",
      heroTitle: "Поймай свою", heroTitleEpic: "Epic", heroTitleEnd: "волну в Дананге",
      heroSub: "Лучшая серф-школа на пляже Микхе. Профессиональное обучение, топовое оборудование и лучшее комьюнити.",
      sectionTitle: "Выбери свой", sectionTitleRide: "Формат",
      rentalBadge: "Gear up", rentalTitle: "Аренда", rentalTitleSurf: "Досок",
      rentalDesc: "Мы предоставляем премиальные софт-топы, лонгборды и шортборды. Поможем подобрать доску под текущие условия.",
      rentalPrice: "от 250,000 VND", rentalUnit: "Сессия / 2 часа", rentalBtn: "Арендовать",
      reviewsTitle: "Лучшие вайбы в Дананге", reviewsLink: "Читать все отзывы на Google Maps",
      locationTitle: "Найди наш", locationTitleSpot: "Спот",
      locationAddress: "Пляж Микхе, Дананг", locationLandmark: "Ищите красный флаг EPIC SURF на песке напротив TMS Hotel",
      btnOpenMaps: "Открыть в Картах", footerNav: "Навигация", footerMaps: "Карты", modalTitle: "Запись",
      featureLycra: "Лайкры и цинк", featureSizes: "Все размеры", featureWetsuits: "Гидро-\nкостюмы", featureDelivery: "Привозим на спот",
      boardTypes: ["Софтборды", "Лонгборды", "Малибу", "Шортборды"],
      whyISA: "ISA Сертификация", whyISADesc: "Наши инструкторы имеют международные сертификаты ISA. Безопасность — наш приоритет.",
      whyVibe: "Твой вайб", whyVibeDesc: "Мы не просто школа, мы — комьюнити. Бесплатные фото, кокосы и лучший чилл на пляже.",
      whyGear: "Премиум стафф", whyGearDesc: "Только свежее оборудование. Регулярно обновляем доски и лайкры для твоего комфорта.",
      howTitle: "Как проходят", howTitleEnd: "уроки",
      howSteps: [
        { title: "Встреча и экипировка", desc: "Знакомимся с тренером, подбираем доску и выдаем свежую лайкру с цинком.", time: "15 мин" },
        { title: "Теория на берегу", desc: "Разминка, техника гребли и правильного вставания на доску (pop-up). Безопасность.", time: "20 мин" },
        { title: "Практика в океане", desc: "Идем в воду! Тренер всегда рядом: помогает ловить волны и корректирует движения.", time: "75 мин" },
        { title: "Разбор и контент", desc: "Отдыхаем с кокосом, разбираем ошибки и скидываем ваши фото и видео.", time: "10 мин" }
      ],
      forecastTitle: "Условия на", forecastTitleSpot: "Сегодня", forecastPeriod: "Период", forecastWind: "Ветер", forecastDir: "Направление", forecastWater: "Вода",
      forecastStatusGood: "Идеально для обучения", forecastStatusHigh: "Только для опытных",
      faqTitle: "Вопросы и", faqTitleEnd: "Ответы",
      faqItems: [
        { q: "Нужно ли уметь плавать?", a: "Желательно уметь держаться на воде. Уроки проходят на безопасной глубине, а инструктор всегда рядом." },
        { q: "Что брать с собой?", a: "Купальник/плавки, полотенце, солнцезащитный крем. Лайкру и цинк мы дадим." },
        { q: "В какое время лучше приходить?", a: "Зависит от приливов. Напишите нам — мы подскажем лучшее время на завтра." }
      ],
      cards: [
        { title: "Групповой урок", badge: "Популярно", desc: "Идеально для новичков. До 4-х человек на инструктора.", price: "900,000 VND" },
        { title: "Сплит урок", badge: "Выгодно", desc: "Для 2-х человек. Больше внимания тренера. Цена за двоих.", price: "2,500,000 VND" },
        { title: "Приватный урок", badge: "Премиум", desc: "Индивидуальная тренировка для быстрого прогресса.", price: "1,800,000 VND" },
        { title: "Line-up / Pro", badge: "Для опытных", desc: "Выход на лайнап с гидом. Поиск лучших пиков.", price: "2,400,000 VND" }
      ],
      reviewsList: [
        { name: "Evgenia", text: "Отличные уроки! Пошла с друзьями просто попробовать и ребята влюбили меня в серф! Очень понятные объяснения, много практики и фото/видео после урока. 🔥", date: "Неделю назад" },
        { name: "Дмитрий Харламов", text: "Отличная команда! На второй день уже тренировали повороты. Паша — очень крутой инструктор с чувством юмора! И фотосессия бонусом. 👍", date: "2 недели назад" },
        { name: "Peter Thanh", text: "Despite of the bad weather the instructor was very friendly and teach very well. I can only recommend this surf school! 👌", date: "Месяц назад" }
      ]
    },
    en: {
      navLessons: "Lessons", navRentals: "Rentals", navHow: "Process", navForecast: "Forecast", navLocation: "Map", btnBook: "Book Now",
      heroTitle: "Catch Your", heroTitleEpic: "Epic", heroTitleEnd: "Wave in Da Nang",
      heroSub: "Best surf school on My Khe Beach. Expert coaching, top-tier gear, and the best surf community in Vietnam.",
      sectionTitle: "Choose Your", sectionTitleRide: "Ride",
      rentalBadge: "Professional Gear", rentalTitle: "Surf Board", rentalTitleSurf: "Rentals",
      rentalDesc: "We provide premium soft-tops, longboards, and performance shortboards. Expert advice included.",
      rentalPrice: "from 250,000 VND", rentalUnit: "2 hour / Session", rentalBtn: "Rent Now",
      reviewsTitle: "The best surf vibes", reviewsLink: "Read more on Google Maps",
      locationTitle: "Find the", locationTitleSpot: "Spot",
      locationAddress: "My Khe Beach, Da Nang", locationLandmark: "Look for the Red EPIC SURF flag opposite TMS Hotel",
      btnOpenMaps: "Open in Google Maps", footerNav: "Navigation", footerMaps: "Maps", modalTitle: "Booking",
      featureLycra: "Rashguards & Zinc", featureSizes: "All Sizes", featureWetsuits: "Wetsuits", featureDelivery: "Spot Delivery",
      boardTypes: ["Softboards", "Longboards", "Malibus", "Shortboards"],
      whyISA: "ISA Certified", whyISADesc: "Our instructors are ISA certified professionals. Safety is our #1 priority.",
      whyVibe: "The Surf Vibe", whyVibeDesc: "More than a school — we are a community. Free photos, coconuts, and beach chill.",
      whyGear: "Premium Gear", whyGearDesc: "Top-tier equipment only. We regularly update our boards for your comfort.",
      howTitle: "How it", howTitleEnd: "works",
      howSteps: [
        { title: "Meet & Gear Up", desc: "Meet your coach, pick the right board, and get a fresh rashguard and zinc.", time: "15 min" },
        { title: "Beach Theory", desc: "Warm-up, paddling technique, and pop-up practice. Safety briefing.", time: "20 min" },
        { title: "Ocean Practice", desc: "Time to surf! Your coach stays close to help you catch waves and fix balance.", time: "75 min" },
        { title: "Feedback & Media", desc: "Chill with a coconut, review progress, and get your epic photos and videos.", time: "10 min" }
      ],
      forecastTitle: "Current", forecastTitleSpot: "Forecast", forecastPeriod: "Period", forecastWind: "Wind", forecastDir: "Direction", forecastWater: "Water",
      forecastStatusGood: "Perfect for beginners", forecastStatusHigh: "Advanced surfers only",
      faqTitle: "FAQ", faqTitleEnd: "",
      faqItems: [
        { q: "Do I need to be a strong swimmer?", a: "Basic skills are enough. Lessons are held in safe depths with the instructor by your side." },
        { q: "What should I bring?", a: "Swimwear, towel, and sunscreen. We provide rashguards and zinc." },
        { q: "When is the best time to surf?", a: "Depends on tides. Text us, and we'll check tomorrow's forecast for you." }
      ],
      cards: [
        { title: "Group Lesson", badge: "Most Popular", desc: "Perfect for beginners. Max 4 people per instructor.", price: "900,000 VND" },
        { title: "Split Lesson", badge: "Best Value", desc: "For 2 people. More coach attention. Price for both.", price: "2,500,000 VND" },
        { title: "Private Lesson", badge: "Premium", desc: "1-on-1 coaching for maximum progress.", price: "1,800,000 VND" },
        { title: "Line-up / Pro", badge: "Advanced", desc: "Guiding to the best peaks for experienced surfers.", price: "2,400,000 VND" }
      ],
      reviewsList: [
        { name: "Evgenia", text: "Great lessons! Went with friends to try it out and the team made us fall in love with surfing! Very clear technique explanations and awesome photos. 🔥", date: "1 week ago" },
        { name: "Dmitry Kharlamov", text: "Excellent team! By the second day, we were already practicing turns. Pasha is a very cool instructor! Plus, you get a bonus photoshoot. 👍", date: "2 weeks ago" },
        { name: "Peter Thanh", text: "Despite of the bad weather the instructor was very friendly and teach very well. I can only recommend this surf school! 👌", date: "1 month ago" }
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
    instagram: "https://instagram.com/epicsurf_danang",
    facebook: "https://facebook.com/epicsurf.vn",
    youtube: "https://youtube.com/@epicsurf",
    threads: "https://threads.net/@epicsurf_danang"
  };

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-hidden transition-colors duration-500 scroll-smooth">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full bg-epicWhite/90 backdrop-blur-md z-50 border-b border-epicPink">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center text-epicDark">
          <div className="text-xl md:text-2xl font-black tracking-tighter uppercase flex-shrink-0">
            EPIC <span className="text-epicRed italic">SURF</span>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#lessons" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-epicRed transition-colors">{t.navLessons}</a>
            <a href="#how-it-works" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-epicRed transition-colors">{t.navHow}</a>
            <a href="#forecast" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-epicRed transition-colors">{t.navForecast}</a>
            <a href="#location" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-epicRed transition-colors">{t.navLocation}</a>
          </nav>
          <div className="flex items-center gap-2 md:gap-6">
            <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="flex items-center gap-2 font-bold text-[10px] uppercase bg-epicPink px-3 py-2 rounded-full hover:bg-epicRed hover:text-white transition-all text-epicDark">
              <Globe size={14} /> <span className="hidden sm:inline">{lang === 'ru' ? 'EN' : 'RU'}</span>
            </button>
            <button onClick={() => setBookingUrl(links.group)} className="bg-epicRed text-white px-4 md:px-6 py-2 rounded-full font-bold uppercase text-[10px] shadow-lg active:scale-95 transition-all">{t.btnBook}</button>
          </div>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src="/hero-surf.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-4 pt-20">
          <motion.h1 key={lang} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight mb-6 drop-shadow-2xl">
            {t.heroTitle} <br/><span className="text-epicRed italic">{t.heroTitleEpic}</span> {t.heroTitleEnd}
          </motion.h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">{t.heroSub}</p>
        </div>
      </section>

      {/* 2.5 WHY EPIC */}
      <section className="py-20 bg-epicWhite px-6 border-b border-epicPink/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <ShieldCheck size={40} />, title: t.whyISA, desc: t.whyISADesc },
              { icon: <Users size={40} />, title: t.whyVibe, desc: t.whyVibeDesc },
              { icon: <Award size={40} />, title: t.whyGear, desc: t.whyGearDesc }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-20 h-20 bg-epicPink rounded-[30px] mx-auto flex items-center justify-center text-epicRed shadow-sm">{item.icon}</div>
                <h3 className="text-xl font-black uppercase text-epicDark">{item.title}</h3>
                <p className="text-epicDark/60 text-sm max-w-[280px] mx-auto">{item.desc}</p>
              </div>
            ))}
        </div>
      </section>

      {/* 2.7 HOW IT WORKS (FIXED SPACING) */}
      <section id="how-it-works" className="py-20 md:py-32 bg-epicWhite px-6 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-epicDark leading-none">
              {t.howTitle} <br/><span className="text-epicRed italic">{t.howTitleEnd}</span>
            </h2>
          </div>
          <div className="space-y-16 md:space-y-32"> {/* Уменьшил отступы на мобилке */}
            {t.howSteps.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 lg:gap-24`}
              >
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute -inset-2 md:-inset-4 bg-epicPink rounded-[30px] md:rounded-[50px] rotate-2 transition-transform -z-10 opacity-50"></div>
                  <div className="aspect-[4/3] w-full rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl border border-white/50 bg-epicDark/5">
                    <img 
                      src={`/gallery/process-${idx + 1}.webp`} 
                      alt={step.title} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1537519646099-335112f03225?q=80&w=800'; }} 
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-3 md:space-y-6 text-center lg:text-left">
                  <div className="inline-block bg-epicPink text-epicRed px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {step.time}
                  </div>
                  <h3 className="text-2xl md:text-5xl font-black uppercase text-epicDark leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-epicDark/60 text-base md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES (FIXED MOBILE SWIPE) */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24 overflow-hidden">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 md:mb-16 uppercase tracking-tighter text-epicDark">
          {t.sectionTitle} <span className="text-epicRed italic">{t.sectionTitleRide}</span>
        </h2>
        
        {/* Container for swipe: flex on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {t.cards.map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }} 
              className="min-w-[85vw] md:min-w-0 snap-center bg-epicPink rounded-[40px] overflow-hidden shadow-lg flex flex-col border border-white/50 group"
            >
              <div className="h-44 overflow-hidden">
                <img 
                  src={`/gallery/lesson-${i + 1}.webp`} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600'; }} 
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-4 text-epicRed">
                  {i === 1 ? <Award size={32} /> : i === 2 ? <Star size={32} /> : <Waves size={32} />}
                </div>
                <div className="text-[10px] text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 uppercase text-epicDark">{item.title}</h3>
                <p className="text-epicDark/70 mb-6 text-sm flex-1">{item.desc}</p>
                <div className="text-2xl font-black mb-8 text-epicDark">{item.price}</div>
                <button 
                  onClick={() => setBookingUrl(i === 0 ? links.group : links.personal)} 
                  className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-xs hover:bg-epicRed transition-all active:scale-95"
                >
                  {t.btnBook}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RENTALS */}
        <div id="rentals" className="bg-epicDark text-white rounded-[40px] overflow-hidden shadow-2xl mt-12 border border-white/5 scroll-mt-24">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-1/2 relative bg-[#1a1a1a] min-h-[400px]">
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full">
                {[1, 2, 3, 4].map((num, idx) => (
                  <div key={num} className="min-w-full h-full snap-center relative">
                    <img src={`/gallery/board-${num}.webp`} alt={t.boardTypes[idx]} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1537519646099-335112f03225?q=80&w=800'; }} />
                    <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black uppercase">{t.boardTypes[idx]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-between">
              <div>
                <div className="text-epicRed font-bold mb-4 uppercase tracking-[0.3em] text-xs">{t.rentalBadge}</div>
                <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">{t.rentalTitle} <span className="text-epicRed italic">{t.rentalTitleSurf}</span></h3>
                <p className="text-white/60 text-lg mb-10">{t.rentalDesc}</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-6 mb-12">
                  {[
                    { k: 'featureLycra', d: "M12 3V4.5M17 13C17 11.6739 16.4732 10.4021 15.5355 9.46447C14.5979 8.52678 13.3261 8 12 8C10.6739 8 9.40215 8.52678 8.46447 9.46447C7.52678 10.4021 7 11.6739 7 13M5.988 6.99L4.928 5.929M22 13H20.5M3.5 13H2M19.07 5.929L18.01 6.989M6.5 16V19C6.5 19.943 6.5 20.414 6.793 20.707C7.086 21 7.557 21 8.5 21C9.443 21 9.914 21 10.207 20.707C10.5 20.414 10.5 19.943 10.5 19V16" },
                    { k: 'featureSizes', d: "M5.678 20.5C4.936 18.536 4.5 15.966 4.5 13.185C4.5 10.23 4.992 7.52 5.816 5.521C6.226 4.523 6.736 3.666 7.338 3.047C7.944 2.425 8.691 2 9.548 2C10.407 2 11.154 2.425 11.759 3.047C12.362 3.666 12.871 4.523 13.282 5.521C13.3847 5.77033 13.482 6.03 13.574 6.3C13.6867 6.13867 13.8 5.983 13.914 5.833C14.553 4.998 15.248 4.318 15.974 3.887C16.702 3.453 17.517 3.239 18.33 3.457C19.144 3.675 19.743 4.267 20.157 5.007C20.569 5.744 20.832 6.68 20.967 7.723C21.238 9.813 21.017 12.486 20.273 15.265C19.746 17.232 19.017 19.025 18.18 20.5H20C20.1989 20.5 20.3897 20.579 20.5303 20.7197C20.671 20.8603 20.75 21.0511 20.75 21.25C20.75 21.4489 20.671 21.6397 20.5303 21.7803C20.3897 21.921 20.1989 22 20 22H4C3.80109 22 3.61032 21.921 3.46967 21.7803C3.32902 21.6397 3.25 21.4489 3.25 21.25C3.25 21.0511 3.32902 20.8603 3.46967 20.7197C3.61032 20.579 3.80109 20.5 4 20.5H5.678" },
                    { k: 'featureWetsuits', d: "M2.5 22.5006V21.5006H3C3.53333 21.5006 4.04667 21.4173 4.54 21.2506C5.03333 21.0839 5.52 20.8533 6 20.5586C6.48 20.8533 6.96667 21.0829 7.46 21.2476C7.95333 21.4123 8.46667 21.4946 9 21.4946C9.53333 21.4946 10.051 21.4123 10.553 21.2476C11.055 21.0829 11.5373 20.8529 12 20.5576" },
                    { k: 'featureDelivery', d: "M21 20.9992C18.801 19.7722 15.584 18.9992 12 18.9992C8.416 18.9992 5.199 19.7722 3 20.9992M9.5 6.44917C7.833 6.11417 5 6.44917 3.5 9.48217" }
                  ].map((feat) => (
                    <div key={feat.k} className="flex items-center gap-3 group/feat">
                      <div className="p-3 bg-white/5 rounded-2xl group-hover/feat:bg-epicRed transition-all"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-epicRed group-hover/feat:text-white transition-colors"><path d={feat.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                      <span className="text-[10px] font-black uppercase text-white/80 leading-tight whitespace-pre-line">{t[feat.k]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-8">
                <div className="text-3xl font-black tracking-tighter">{t.rentalPrice} <br/><span className="text-xs opacity-40 uppercase tracking-widest">{t.rentalUnit}</span></div>
                <button onClick={() => setBookingUrl(links.rental)} className="w-full md:w-auto px-12 py-5 bg-epicRed text-white rounded-2xl font-black uppercase text-xs hover:bg-white hover:text-epicRed transition-all shadow-xl">{t.rentalBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORECAST */}
      <section id="forecast" className="py-24 bg-epicWhite px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-epicDark rounded-[40px] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row min-h-[500px]">
            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
              <Waves size={300} className="absolute -right-20 -top-20 text-white/5 pointer-events-none" />
              <div className="relative z-10 space-y-10 text-white text-center md:text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start gap-3"><span className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]"></span><span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{t.forecastTitle} {t.forecastTitleSpot}</span></div>
                  <div className="flex items-baseline justify-center md:justify-start gap-3"><span className="text-7xl font-black tracking-tighter">{forecast?.height || "0.8"}</span><span className="text-2xl font-bold text-epicRed italic">m</span></div>
                  <div className="inline-block bg-epicRed px-4 py-1 rounded-full font-black text-[10px] uppercase">{(forecast?.height || 0.8) < 1.2 ? t.forecastStatusGood : t.forecastStatusHigh}</div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1"><div className="text-[10px] opacity-30 font-bold uppercase"><Waves size={14} /> {t.forecastPeriod}</div><p className="text-2xl font-black">{forecast?.period || "7.5"}s</p></div>
                  <div className="space-y-1"><div className="text-[10px] opacity-30 font-bold uppercase"><Wind size={14} /> {t.forecastWind}</div><p className="text-2xl font-black">{Math.round(forecast?.windSpeed || 12)} km/h</p></div>
                  <div className="space-y-1"><div className="text-[10px] opacity-30 font-bold uppercase"><Globe size={14} /> {t.forecastDir}</div><div className="flex items-center justify-center md:justify-start gap-2"><div className="w-6 h-6 flex items-center justify-center bg-epicRed rounded-full" style={{ transform: `rotate(${forecast?.windDir || 225}deg)` }}><ArrowUp size={14} /></div><span className="text-xl font-black">SW</span></div></div>
                  <div className="space-y-1"><div className="text-[10px] opacity-30 font-bold uppercase"><Thermometer size={14} /> {t.forecastWater}</div><p className="text-2xl font-black">26°C</p></div>
                </div>
              </div>
            </div>
            <div className="lg:w-3/5 h-[350px] lg:h-auto bg-black"><iframe src="https://embed.windy.com/embed2.html?lat=16.061&lon=108.247&detailLat=16.059&detailLon=108.274&width=650&height=450&zoom=11&level=surface&overlay=waves&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" className="w-full h-full border-none opacity-70 grayscale invert contrast-125 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-1000"></iframe></div>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS */}
      <section id="reviews" className="py-24 bg-epicPink border-y border-white/50 scroll-mt-24 text-center text-epicDark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16"><div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-epicRed fill-epicRed" />)}</div><div className="text-[10px] font-black uppercase tracking-widest">Excellent 5/5 on Google Maps</div></div>
          <h2 className="text-4xl md:text-7xl font-black mb-20 uppercase tracking-tighter leading-none">{t.reviewsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {t.reviewsList.map((rev, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-10 rounded-[40px] shadow-xl text-left flex flex-col justify-between border border-white">
                <div><div className="flex gap-1 mb-6">{[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-epicRed fill-epicRed" />)}</div><p className="font-medium italic leading-relaxed text-lg mb-8">"{rev.text}"</p></div>
                <div className="flex items-center gap-4 border-t border-epicPink pt-6"><div className="w-12 h-12 bg-epicDark text-white rounded-full flex items-center justify-center font-black">{rev.name.charAt(0)}</div><div><div className="text-sm font-black uppercase tracking-widest">{rev.name}</div><div className="text-[10px] uppercase opacity-40 font-bold">{rev.date}</div></div></div>
              </motion.div>
            ))}
          </div>
          <a href="https://www.google.com/maps/place/EPIC+Surf+School+Da+Nang/@16.0464674,108.2504812,17z/data=!4m8!3m7!1s0x314217f20b1fa357:0xa323fdd182ae974!8m2!3d16.0464674!4d108.2504812!9m1!1b1!16s%2Fg%2F11vlwxw7nd" target="_blank" className="inline-flex items-center gap-3 text-epicRed font-black uppercase text-xs tracking-widest">{t.reviewsLink} <Globe size={14} /></a>
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

      {/* 7. GALLERY (FIXED SPEED) */}
      <section className="py-24 bg-epicDark overflow-hidden flex flex-col gap-6">
        <div className="flex w-[200%] animate-marquee gap-4" style={{ animationDuration: '25s' }}> {/* Было 60s по умолчанию в CSS, теперь 25s */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-[260px] h-[350px] md:w-[450px] md:h-[550px] flex-shrink-0 rounded-[24px] md:rounded-[32px] overflow-hidden">
              <img 
                src={`/gallery/${(i % 20) + 1}.webp`} 
                alt="Surf" 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="location" className="bg-epicDark text-white pt-24 pb-12 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-20 text-center md:text-left">
            <div className="lg:col-span-5 space-y-12">
              <div>
                <div className="text-4xl font-black tracking-tighter uppercase mb-6 italic">EPIC <span className="text-epicRed">SURF</span></div>
                <p className="text-white/50 text-xl leading-relaxed max-w-sm mx-auto md:mx-0">{t.heroSub}</p>
              </div>

              {/* SOCIAL LINKS (FIXED) */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href={links.instagram} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-epicRed hover:scale-110 transition-all text-white">
                  <InstagramIcon />
                </a>
                <a href={links.facebook} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-epicRed hover:scale-110 transition-all text-white">
                  <FacebookIcon />
                </a>
                <a href={links.youtube} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-epicRed hover:scale-110 transition-all text-white">
                  <YoutubeIcon />
                </a>
                <a href={links.threads} target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-epicRed hover:scale-110 transition-all text-white">
                  <ThreadsIcon />
                </a>
                <a href="tel:+84383880164" className="p-4 bg-white/5 rounded-full hover:bg-epicRed hover:scale-110 transition-all text-white">
                  <Phone size={20} />
                </a>
              </div>

              <div className="pt-8 border-t border-white/5 font-black uppercase text-[10px] tracking-widest text-white/50">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <MapPin size={16} className="text-epicRed" /> {t.locationAddress}
                </div>
                <p className="text-white/80 font-medium normal-case tracking-normal italic text-sm">{t.locationLandmark}</p>
              </div>
            </div>
            
            <div className="lg:col-span-7 h-[450px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s" className="w-full h-full border-none lg:grayscale lg:invert lg:contrast-125 lg:opacity-60 lg:hover:grayscale-0 lg:hover:invert-0 transition-all duration-1000" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className="flex justify-between items-center pt-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
            <div>© 2026 Epic Surf School</div>
            <div>Ride Every Day</div>
          </div>
        </div>
      </footer>

      {/* MESSENGERS */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-end gap-4">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${isChatOpen ? 'bg-epicDark rotate-[135deg]' : 'bg-epicRed rotate-0'}`}>{isChatOpen ? <X size={32} color="white" /> : <MessageCircle size={32} color="white" />}</button>
        <AnimatePresence>{isChatOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} className="flex flex-col gap-4 mb-2">
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full active:scale-95"><MessageCircle size={28} /></a>
            <a href={links.telegram} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#0088cc] text-white rounded-full active:scale-95"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
            <a href={links.zalo} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#0068ff] text-white rounded-full text-lg font-black italic">Z</a>
          </motion.div>
        )}</AnimatePresence>
        {isChatOpen && <div onClick={() => setIsChatOpen(false)} className="fixed inset-0 z-[-1] bg-black/5 backdrop-blur-[2px]" />}
      </div>

      {/* MODAL */}
      <AnimatePresence>{bookingUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingUrl(null)} className="absolute inset-0 bg-epicDark/90 backdrop-blur-md cursor-pointer" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-5xl h-[85vh] bg-epicWhite rounded-[40px] overflow-hidden z-10 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-epicPink bg-epicWhite text-epicDark font-black uppercase text-[10px]"><span>{t.modalTitle}</span><button onClick={() => setBookingUrl(null)} className="p-2 bg-epicPink rounded-full text-epicDark"><X size={18} /></button></div>
            <div className="flex-1 bg-white relative"><iframe src={bookingUrl} className="w-full h-full border-none" title="Booking" /></div>
          </motion.div>
        </div>
      )}</AnimatePresence>

    </div>
  );
}

// ICONS
function InstagramIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>); }
function FacebookIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>); }
function YoutubeIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>); }
function ThreadsIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.25 20.25C17.25 21.75 14.5 22.5 12 22.5C6.75 22.5 2.5 18.25 2.5 13C2.5 7.75 6.75 3.5 12 3.5C14.5 3.5 16.75 4.5 18.25 6C19.75 7.5 20.5 9.75 20.5 12.25C20.5 14.75 19.5 16.5 18 17.5C16.5 18.5 14.5 18.5 13 17.5C12.5 17.15 12.15 16.75 11.85 16.25C11.15 16.85 10.25 17.25 9.25 17.25C7.25 17.25 5.75 15.75 5.75 13.5C5.75 11.25 7.25 9.75 9.25 9.75C10.25 9.75 11.15 10.15 11.85 10.75C12.15 10.25 12.5 9.75 13 9.75C15 9.75 16.5 11.25 16.5 13.5C16.5 15.75 15 17.25 13 17.25C12.75 17.25 12.5 17.25 12.25 17.15C12.5 17.75 13 18.25 13.5 18.5" /></svg>); }
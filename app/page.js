"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, MapPin, Award, Star, Phone, MessageCircle, X, Globe } from "lucide-react";

export default function EpicSurfLanding() {
  const [lang, setLang] = useState('ru'); 
  const [bookingUrl, setBookingUrl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const translations = {
    ru: {
      contactUs: "Связаться с нами",
      navLessons: "Уроки",
      navRentals: "Аренда",
      btnBook: "Записаться",
      heroTitle: "Поймай свою",
      heroTitleEpic: "Epic",
      heroTitleEnd: "волну в Дананге",
      heroSub: "Премиальная серф-школа на пляже Микхе. Профессиональное обучение, топовое оборудование и лучшее комьюнити.",
      sectionTitle: "Выбери свой",
      sectionTitleRide: "Формат",
      rentalBadge: "Gear up",
      rentalTitle: "Аренда",
      rentalTitleSurf: "Досок",
      rentalDesc: "Мы предоставляем премиальные софт-топы, лонгборды и шортборды. Аренда включает воск и советы по текущему прогнозу.",
      rentalPrice: "от 250,000 VND",
      rentalUnit: "Сессия / 2 часа",
      rentalBtn: "Арендовать",
      reviewsTitle: "Лучшие вайбы в Дананге",
      reviewText: "Потрясающий опыт! Поймал свою первую волну уже через 20 минут! Инструктор сделал всё очень простым и безопасным.",
      locationTitle: "Найди наш",
      locationTitleSpot: "Спот",
      locationSubtitle: "Мы находимся в самом центре пляжа Микхе",
      locationAddress: "Пляж Микхе, Дананг",
      locationLandmark: "Ищите красный флаг EPIC SURF на песке",
      btnOpenMaps: "Открыть в Картах",
      footerLocation: "Дананг, пляж Микхе. 06:00 — 18:00",
      footerNav: "Навигация",
      footerMaps: "Карты",
      modalTitle: "Запись",
      featureLycra: "Лайкры и цинк",
      featureSizes: "Все размеры",
      featureWetsuits: "Гидрокостюмы",
      featureDelivery: "Привозим на спот",
      boardTypes: ["Софтборды", "Лонгборды", "Малибу", "Шортборды"],
      cards: [
        { title: "Групповой урок", badge: "Популярно", desc: "До 4-х человек на инструктора. Идеально для новичков.", price: "900,000 VND" },
        { title: "Сплит урок", badge: "Выгодно", desc: "Для 2-х человек. Больше внимания тренера. Цена за двоих.", price: "2,500,000 VND" },
        { title: "Приватный урок", badge: "Премиум", desc: "Индивидуальная тренировка для быстрого прогресса.", price: "1,800,000 VND" },
        { title: "Line-up / Pro", badge: "Для опытных", desc: "Выход на лайнап с гидом. Поиск лучших пиков.", price: "2,400,000 VND" }
      ]
    },
    en: {
      contactUs: "Contact us",
      navLessons: "Lessons",
      navRentals: "Rentals",
      btnBook: "Book Now",
      heroTitle: "Catch Your",
      heroTitleEpic: "Epic",
      heroTitleEnd: "Wave in Da Nang",
      heroSub: "Premium surf school on My Khe Beach. Expert coaching, top-tier gear, and the best surf community.",
      sectionTitle: "Choose Your",
      sectionTitleRide: "Ride",
      rentalBadge: "Professional Gear",
      rentalTitle: "Surf Board",
      rentalTitleSurf: "Rentals",
      rentalDesc: "We provide premium soft-tops, longboards, and performance shortboards. Expert advice included.",
      rentalPrice: "from 250,000 VND",
      rentalUnit: "2 hour / Session",
      rentalBtn: "Rent Now",
      reviewsTitle: "The best surf vibes",
      reviewText: "Amazing experience! Caught my first wave in 20 minutes! This school is pure fire.",
      locationTitle: "Find the",
      locationTitleSpot: "Spot",
      locationSubtitle: "In the heart of My Khe Beach",
      locationAddress: "My Khe Beach, Da Nang",
      locationLandmark: "Look for EPIC SURF flag on the sand",
      btnOpenMaps: "Open in Google Maps",
      footerLocation: "My Khe Beach, Da Nang. 06:00 — 18:00",
      footerNav: "Navigation",
      footerMaps: "Open Maps",
      modalTitle: "Booking",
      featureLycra: "Rashguards & Zinc",
      featureSizes: "All Sizes",
      featureWetsuits: "Wetsuits",
      featureDelivery: "Spot Delivery",
      boardTypes: ["Softboards", "Longboards", "Malibus", "Shortboards"],
      cards: [
        { title: "Group Lesson", badge: "Most Popular", desc: "Max 4 people per instructor. Perfect for beginners.", price: "900,000 VND" },
        { title: "Split Lesson", badge: "Best Value", desc: "For 2 people. More coach attention. Price for both.", price: "2,500,000 VND" },
        { title: "Private Lesson", badge: "Premium", desc: "1-on-1 coaching for maximum progress.", price: "1,800,000 VND" },
        { title: "Line-up / Pro", badge: "Advanced", desc: "Guiding to the best peaks for experienced surfers.", price: "2,400,000 VND" }
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
    zalo: "https://zalo.me/84383880164"
  };

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-hidden transition-colors duration-500">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full bg-epicWhite/80 backdrop-blur-md z-50 border-b border-epicPink">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-black tracking-tighter uppercase">
            EPIC <span className="text-epicRed italic">SURF</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
              className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest bg-epicPink px-3 py-2 rounded-full hover:bg-epicRed hover:text-white transition-all text-epicDark"
            >
              <Globe size={14} /> {lang === 'ru' ? 'EN' : 'RU'}
            </button>
            <button 
              onClick={() => setBookingUrl(links.group)} 
              className="bg-epicRed text-white px-5 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-epicRed/30 active:scale-95 transition-all"
            >
              {t.btnBook}
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src="/hero-surf.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <motion.h1 key={lang} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight mb-6 leading-none drop-shadow-2xl">
            {t.heroTitle} <br/><span className="text-epicRed italic">{t.heroTitleEpic}</span> {t.heroTitleEnd}
          </motion.h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">{t.heroSub}</p>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-tighter text-epicDark">
          {t.sectionTitle} <span className="text-epicRed italic">{t.sectionTitleRide}</span>
        </h2>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden overflow-visible mb-12">
          <motion.div drag="x" dragConstraints={{ left: -950, right: 0 }} className="flex gap-6 px-2 cursor-grab active:cursor-grabbing">
            {t.cards.map((item, i) => (
              <div key={i} className="min-w-[280px] bg-epicPink rounded-[40px] p-8 shadow-xl flex flex-col border border-white/50">
                <div className="mb-6"><Waves size={40} className="text-epicRed" /></div>
                <div className="text-[10px] text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
                <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight text-epicDark">{item.title}</h3>
                <p className="text-epicDark/70 mb-8 text-sm leading-relaxed flex-1">{item.desc}</p>
                <div className="text-2xl font-black mb-6 text-epicDark">{item.price}</div>
                <button onClick={() => setBookingUrl(i === 0 ? links.group : links.personal)} className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest active:scale-95 transition-all shadow-md">{t.btnBook}</button>
              </div>
            ))}
          </motion.div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {t.cards.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-epicPink rounded-[40px] p-8 shadow-lg flex flex-col border border-white/50 group">
              <div className="mb-6 transition-transform group-hover:scale-110 duration-300">
                {i === 1 ? <Award size={40} className="text-epicRed" /> : i === 2 ? <Star size={40} className="text-epicRed" /> : <Waves size={40} className="text-epicRed" />}
              </div>
              <div className="text-[10px] text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight text-epicDark">{item.title}</h3>
              <p className="text-epicDark/70 mb-8 text-sm leading-relaxed flex-1">{item.desc}</p>
              <div className="text-2xl font-black mb-8 tracking-tighter text-epicDark">{item.price}</div>
              <button onClick={() => setBookingUrl(i === 0 ? links.group : links.personal)} className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-epicRed transition-all shadow-md">{t.btnBook}</button>
            </motion.div>
          ))}
        </div>

        {/* RENTALS CARD */}
        <div id="rentals" className="bg-epicDark text-white rounded-[40px] overflow-hidden shadow-2xl mt-12 border border-white/5">
          <div className="flex flex-col lg:flex-row">
            
            {/* Левая часть: Галерея досок (БЕЗ иконки Globe) */}
            <div className="lg:w-1/2 relative bg-[#1a1a1a]">
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[350px] lg:h-full min-h-[400px]">
                {[1, 2, 3, 4].map((num, idx) => (
                  <div key={num} className="min-w-full h-full snap-center relative group">
                    <img 
                      src={`/gallery/board-${num}.webp`} 
                      alt={t.boardTypes[idx]}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1537519646099-335112f03225?q=80&w=800'; }}
                    />
                    <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
                      <span className="text-xs font-black uppercase tracking-widest">{t.boardTypes[idx]}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Иконка Globe удалена отсюда */}
            </div>

            {/* Правая часть: Контент и 4 иконки */}
            <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-between bg-epicDark">
              <div>
                <div className="text-epicRed font-bold mb-4 uppercase tracking-[0.3em] text-xs">
                  {t.rentalBadge}
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-tight">
                  {t.rentalTitle} <span className="text-epicRed italic">{t.rentalTitleSurf}</span>
                </h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
                  {t.rentalDesc}
                </p>

                {/* Сетка преимуществ: 2x2 */}
                <div className="grid grid-cols-2 gap-6 mb-12">
                  
                  {/* 1. Лайкры и цинк (Твой UV SVG) */}
                  <div className="flex items-center gap-4 group/feat">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-epicRed transition-all flex-shrink-0">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-epicRed group-hover:text-white transition-colors duration-300">
                        <path d="M12 3V4.5M17 13C17 11.6739 16.4732 10.4021 15.5355 9.46447C14.5979 8.52678 13.3261 8 12 8C10.6739 8 9.40215 8.52678 8.46447 9.46447C7.52678 10.4021 7 11.6739 7 13M5.988 6.99L4.928 5.929M22 13H20.5M3.5 13H2M19.07 5.929L18.01 6.989M6.5 16V19C6.5 19.943 6.5 20.414 6.793 20.707C7.086 21 7.557 21 8.5 21C9.443 21 9.914 21 10.207 20.707C10.5 20.414 10.5 19.943 10.5 19V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M13.5 16L15.5 21L17.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80 leading-tight">{t.featureLycra}</span>
                  </div>
                  
                  {/* 2. Все размеры (Твой Surfboard SVG) */}
                  <div className="flex items-center gap-4 group/feat">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-epicRed transition-all flex-shrink-0">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-epicRed group-hover:text-white transition-colors duration-300">
                        <path d="M5.678 20.5C4.936 18.536 4.5 15.966 4.5 13.185C4.5 10.23 4.992 7.52 5.816 5.521C6.226 4.523 6.736 3.666 7.338 3.047C7.944 2.425 8.691 2 9.548 2C10.407 2 11.154 2.425 11.759 3.047C12.362 3.666 12.871 4.523 13.282 5.521C13.3847 5.77033 13.482 6.03 13.574 6.3C13.6867 6.13867 13.8 5.983 13.914 5.833C14.553 4.998 15.248 4.318 15.974 3.887C16.702 3.453 17.517 3.239 18.33 3.457C19.144 3.675 19.743 4.267 20.157 5.007C20.569 5.744 20.832 6.68 20.967 7.723C21.238 9.813 21.017 12.486 20.273 15.265C19.746 17.232 19.017 19.025 18.18 20.5H20C20.1989 20.5 20.3897 20.579 20.5303 20.7197C20.671 20.8603 20.75 21.0511 20.75 21.25C20.75 21.4489 20.671 21.6397 20.5303 21.7803C20.3897 21.921 20.1989 22 20 22H4C3.80109 22 3.61032 21.921 3.46967 21.7803C3.32902 21.6397 3.25 21.4489 3.25 21.25C3.25 21.0511 3.32902 20.8603 3.46967 20.7197C3.61032 20.579 3.80109 20.5 4 20.5H5.678ZM7.203 6.092C6.47 7.869 6 10.377 6 13.185C6 16.119 6.513 18.718 7.297 20.5H10.085C9.761 18.372 9.971 15.595 10.744 12.712C11.204 10.993 11.818 9.41 12.522 8.056C12.3616 7.38681 12.152 6.73037 11.895 6.092C11.528 5.202 11.11 4.53 10.685 4.093C10.262 3.659 9.878 3.5 9.549 3.5C9.219 3.5 8.836 3.659 8.413 4.093C7.987 4.53 7.569 5.201 7.203 6.092ZM16.427 20.5C17.036 19.5432 17.551 18.5299 17.965 17.474L15.529 15.248C15.4404 15.1667 15.3335 15.108 15.2175 15.0766C15.1014 15.0453 14.9795 15.0423 14.862 15.068L11.639 15.778C11.377 17.588 11.379 19.222 11.605 20.5H16.427ZM13.222 10.091L15.622 9.563C15.9741 9.4855 16.3396 9.49374 16.6879 9.58702C17.0361 9.6803 17.3568 9.85589 17.623 10.099L19.437 11.757C19.614 10.322 19.622 9.011 19.48 7.917C19.36 6.988 19.136 6.255 18.848 5.74C18.561 5.228 18.245 4.987 17.942 4.906C17.64 4.826 17.245 4.876 16.741 5.176C16.234 5.477 15.674 6.001 15.106 6.744C14.436 7.621 13.786 8.761 13.222 10.091ZM12.592 11.766C12.3296 12.5579 12.1086 13.363 11.93 14.178L14.539 13.604C14.8912 13.5263 15.257 13.5345 15.6054 13.6278C15.9538 13.7211 16.2747 13.8967 16.541 14.14L18.513 15.942C18.7659 15.1469 18.9772 14.3391 19.146 13.522L16.611 11.206C16.5222 11.1251 16.4153 11.0667 16.2992 11.0357C16.1831 11.0047 16.0613 11.0021 15.944 11.028L12.592 11.766Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80 leading-tight">{t.featureSizes}</span>
                  </div>

                  {/* 3. Гидрокостюмы (Твой Surfing SVG) */}
                  <div className="flex items-center gap-4 group/feat">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-epicRed transition-all flex-shrink-0">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-epicRed group-hover:text-white transition-colors duration-300">
                        <path d="M2.5 22.5006V21.5006H3C3.53333 21.5006 4.04667 21.4173 4.54 21.2506C5.03333 21.0839 5.52 20.8533 6 20.5586C6.48 20.8533 6.96667 21.0829 7.46 21.2476C7.95333 21.4123 8.46667 21.4946 9 21.4946C9.53333 21.4946 10.051 21.4123 10.553 21.2476C11.055 21.0829 11.5373 20.8529 12 20.5576C12.48 20.8529 12.9667 21.0829 13.46 21.2476C13.9533 21.4123 14.4667 21.4946 15 21.4946C15.5333 21.4946 16.051 21.4123 16.553 21.2476C17.055 21.0829 17.5373 20.8529 18 20.5576C18.4627 20.8529 18.945 21.0839 19.447 21.2506C19.949 21.4173 20.4667 21.5006 21 21.5006H21.5V22.5006H21C20.522 22.5006 20.033 22.4349 19.533 22.3036C19.033 22.1723 18.522 21.9689 18 21.6936C17.478 21.9689 16.967 22.1723 16.467 22.3036C15.967 22.4349 15.478 22.5006 15 22.5006C14.522 22.5006 14.033 22.4349 13.533 22.3036C13.033 22.1723 12.522 21.9689 12 21.6936C11.478 21.9689 10.967 22.1723 10.467 22.3036C9.967 22.4349 9.478 22.5006 9 22.5006C8.522 22.5006 8.033 22.4349 7.533 22.3036C7.033 22.1723 6.522 21.9689 6 21.6936C5.478 21.9689 4.967 22.1723 4.467 22.3036C3.967 22.4349 3.478 22.5006 3 22.5006H2.5ZM8.692 4.30859L14.05 5.29459C14.2067 5.32793 14.3643 5.39726 14.523 5.50259C14.6823 5.60793 14.8113 5.75526 14.91 5.94459L15.785 7.49459C16.2183 8.24459 16.815 8.86893 17.575 9.36759C18.335 9.86626 19.169 10.1543 20.077 10.2316V11.2506C18.9303 11.1613 17.885 10.7946 16.941 10.1506C15.9957 9.50726 15.234 8.63493 14.656 7.53359L11.329 9.96259L15.5 13.2506V17.1006C15.7413 17.2713 16.0413 17.4979 16.4 17.7806C16.7587 18.0633 17.042 18.2906 17.25 18.4626C17.0413 18.6339 16.738 18.7856 16.34 18.9176C15.9427 19.0496 15.496 19.1156 15 19.1156C14.4767 19.1156 13.9533 19.0156 13.43 18.8156C12.9073 18.6156 12.4307 18.2989 12 17.8656C11.5693 18.2989 11.1243 18.6063 10.665 18.7876C10.2063 18.9676 9.76667 19.0709 9.346 19.0976C9.30733 19.0976 9.27 19.0943 9.234 19.0876C9.19733 19.0823 9.16167 19.0739 9.127 19.0626C7.51367 18.0659 6.17267 17.0099 5.104 15.8946C4.03467 14.7793 3.5 13.9063 3.5 13.2756C3.5 12.9643 3.64567 12.7573 3.937 12.6546C4.22767 12.5519 4.532 12.5006 4.85 12.5006C5.308 12.5006 5.956 12.6066 6.794 12.8186C7.632 13.0306 8.59533 13.3726 9.684 13.8446L8.345 8.89059L12.316 6.00059L11.703 5.89059C11.3697 5.82926 11.0063 5.75859 10.613 5.67859C10.2197 5.59859 9.85667 5.52793 9.524 5.46659C9.19133 5.40526 8.98733 5.36859 8.912 5.35659L6.336 7.12759L5.769 6.30459L8.692 4.30859ZM10.108 10.6586L10.731 14.2696C11.2837 14.5376 11.887 14.8603 12.541 15.2376C13.1943 15.6156 13.8473 15.9979 14.5 16.3846V13.9426L10.108 10.6586ZM17 5.19259C16.54 5.19259 16.143 5.02593 15.809 4.69259C15.475 4.35793 15.308 3.96059 15.308 3.50059C15.308 3.04059 15.4747 2.64359 15.808 2.30959C16.1413 1.97559 16.5387 1.80859 17 1.80859C17.4613 1.80859 17.8583 1.97526 18.191 2.30859C18.525 2.64326 18.692 3.04059 18.692 3.50059C18.692 3.96059 18.5253 4.35759 18.192 4.69159C17.8573 5.02559 17.46 5.19259 17 5.19259Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80 leading-tight">{t.featureWetsuits}</span>
                  </div>

                  {/* 4. Привозим на спот (Твой Beach SVG) */}
                  <div className="flex items-center gap-4 group/feat">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-epicRed transition-all flex-shrink-0">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-epicRed group-hover:text-white transition-colors duration-300">
                        <path d="M21 20.9992C18.801 19.7722 15.584 18.9992 12 18.9992C8.416 18.9992 5.199 19.7722 3 20.9992M9.5 6.44917C7.833 6.11417 5 6.44917 3.5 9.48217M9.5 6.44917C12 5.94717 15 7.47117 15 11.4972M9.5 6.44917C8.5 4.43317 6.5 2.94017 3 4.95217M9.5 6.45017C10.5 6.95417 11.5 8.47717 11.5 11.9992M9.5 6.49917C8.5 8.33217 6.5 13.4992 6.5 19.4992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 7C20.1046 7 21 6.10457 21 5C21 3.89543 20.1046 3 19 3C17.8954 3 17 3.89543 17 5C17 6.10457 17.8954 7 19 7Z" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80 leading-tight">{t.featureDelivery}</span>
                  </div>

                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-8">
                <div className="text-3xl font-black tracking-tighter text-center md:text-left">
                  {t.rentalPrice} <br/>
                  <span className="text-sm font-normal opacity-40 uppercase tracking-widest">
                    {t.rentalUnit}
                  </span>
                </div>
                <button 
                  onClick={() => setBookingUrl(links.rental)} 
                  className="w-full md:w-auto px-12 py-5 bg-epicRed text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-epicRed transition-all shadow-xl shadow-epicRed/20 active:scale-95"
                >
                  {t.rentalBtn}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section className="py-24 bg-epicDark overflow-hidden flex flex-col gap-6">
        <div className="flex w-[200%] animate-marquee gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-[300px] h-[400px] md:w-[450px] md:h-[550px] flex-shrink-0 rounded-[32px] overflow-hidden shadow-2xl">
              <img src={`/gallery/${(i % 20) + 1}.webp`} alt="Surf" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. REVIEWS */}
      <section className="py-32 bg-epicPink text-epicDark text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Star className="text-epicRed mx-auto mb-10 h-16 w-16 fill-current" />
          <h2 className="text-4xl md:text-6xl font-black mb-16 uppercase tracking-tighter italic text-epicDark">"{t.reviewsTitle}"</h2>
          <div className="bg-epicWhite p-10 md:p-16 rounded-[50px] shadow-2xl border border-white max-w-2xl mx-auto relative">
             <div className="absolute -top-6 -left-6 text-epicRed opacity-20"><Waves size={80} /></div>
             <p className="text-xl md:text-3xl font-medium italic mb-12 text-epicDark leading-tight relative z-10">"{t.reviewText}"</p>
             <div className="font-black text-xl uppercase tracking-widest">— Sarah T., Australia</div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER WITH INTEGRATED MAP */}
      <footer id="location" className="bg-epicDark text-white pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <div className="text-4xl font-black tracking-tighter uppercase mb-6 italic">EPIC <span className="text-epicRed">SURF</span></div>
                <p className="text-white/50 text-xl leading-relaxed">{t.heroSub}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold uppercase tracking-widest text-xs text-epicRed">{t.footerNav}</h4>
                  <nav className="flex flex-col gap-3 text-white/70">
                    <a href="#lessons" className="hover:text-white transition-colors">{t.navLessons}</a>
                    <a href="#rentals" className="hover:text-white transition-colors">{t.navRentals}</a>
                  </nav>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold uppercase tracking-widest text-xs text-epicRed">Socials</h4>
                  <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-epicRed transition-all"><InstagramIcon /></a>
                    <a href="tel:+84383880164" className="p-3 bg-white/5 rounded-full hover:bg-epicRed transition-all"><Phone size={20} /></a>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 text-white/50 mb-2">
                  <MapPin size={18} className="text-epicRed" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">{t.locationAddress}</span>
                </div>
                <p className="text-white/80 font-medium">{t.footerLocation}</p>
                <p className="text-white/40 text-xs mt-2 italic">{t.locationLandmark}</p>
              </div>
            </div>

            {/* Map Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="h-[400px] md:h-[500px] rounded-[40px] overflow-hidden border border-white/10 relative shadow-2xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s" 
                  className="w-full h-full border-none lg:grayscale lg:invert lg:contrast-125 lg:opacity-60 lg:hover:grayscale-0 lg:hover:invert-0 lg:hover:opacity-100 transition-all duration-1000"
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute top-6 left-6 pointer-events-none">
                   <div className="bg-epicRed text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">Our Spot</div>
                </div>
              </div>
              <div className="flex">
                <a href="https://www.google.com/maps/place/EPIC+Surf+School+Da+Nang/@16.0464674,108.2504812,17z" target="_blank" rel="noreferrer" className="w-full lg:w-max bg-white text-epicDark px-8 py-5 rounded-3xl font-black uppercase text-[11px] tracking-widest hover:bg-epicRed hover:text-white transition-all shadow-xl text-center">
                  {t.btnOpenMaps}
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            <div>© 2026 Epic Surf School</div>
            <div className="hidden md:block">Ride Every Day</div>
          </div>
        </div>
      </footer>

      {/* 7. MESSENGERS */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-end gap-4">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${isChatOpen ? 'bg-epicDark rotate-[135deg]' : 'bg-epicRed rotate-0'}`}>
          {isChatOpen ? <X size={32} color="white" /> : <MessageCircle size={32} color="white" />}
          {!isChatOpen && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#25D366] border-4 border-epicWhite rounded-full animate-ping"></span>}
        </button>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} className="flex flex-col gap-4 mb-2">
              <a href={links.whatsapp} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-xl active:scale-95 transition-transform"><MessageCircle size={28} /></a>
              <a href={links.telegram} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#0088cc] text-white rounded-full shadow-xl active:scale-95 transition-transform"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
              <a href={links.zalo} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#0068ff] text-white rounded-full shadow-xl active:scale-95 transition-transform"><div className="font-black text-lg tracking-tighter uppercase">Z</div></a>
            </motion.div>
          )}
        </AnimatePresence>
        {isChatOpen && <div onClick={() => setIsChatOpen(false)} className="fixed inset-0 z-[-1] bg-black/5 backdrop-blur-[2px]" />}
      </div>

      {/* 8. ALTEGIO MODAL */}
      <AnimatePresence>
        {bookingUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingUrl(null)} className="absolute inset-0 bg-epicDark/90 backdrop-blur-md cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-5xl h-[85vh] bg-epicWhite rounded-[40px] overflow-hidden z-10 flex flex-col shadow-2xl border border-white/10">
              <div className="flex justify-between items-center p-6 border-b border-epicPink bg-epicWhite text-epicDark">
                <span className="font-black uppercase tracking-widest text-xs text-epicDark">Epic <span className="text-epicRed italic">Booking</span></span>
                <button onClick={() => setBookingUrl(null)} className="p-3 bg-epicPink rounded-full text-epicDark hover:bg-epicRed hover:text-white transition-all"><X size={20} /></button>
              </div>
              <div className="flex-1 bg-white relative">
                <iframe src={bookingUrl} className="w-full h-full border-none" title="Booking" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Мини-компонент иконки Instagram (т.к. Lucide её убрали)
function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  );
}
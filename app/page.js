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
      featureWax: "Воск включен",
      featureLeash: "Лиш и плавники",
      featureSizes: "Все размеры",
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
      featureWax: "Wax included",
      featureLeash: "Leash & Fins",
      featureSizes: "All Sizes",
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
            
            {/* Левая часть: Горизонтальная галерея досок */}
            <div className="lg:w-1/2 relative bg-[#1a1a1a]">
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[350px] lg:h-full min-h-[400px]">
                {/* Цикл по 4 видам досок (нужно закинуть фото board-1.webp и т.д. в public/gallery/) */}
                {[1, 2, 3, 4].map((num, idx) => (
                  <div key={num} className="min-w-full h-full snap-center relative group">
                    <img 
                      src={`/gallery/board-${num}.webp`} 
                      alt={t.boardTypes[idx]}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1537519646099-335112f03225?q=80&w=800'; }}
                    />
                    {/* Подпись типа доски поверх фото */}
                    <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
                      <span className="text-xs font-black uppercase tracking-widest">{t.boardTypes[idx]}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Подсказка, что можно листать (только на мобилках) */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 lg:hidden animate-pulse">
                <div className="bg-epicRed p-2 rounded-full shadow-lg">
                   <Globe size={16} className="rotate-90" />
                </div>
              </div>
            </div>

            {/* Правая часть: Контент и Иконки */}
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

                {/* Блок с мини-иконками (Улучшено) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                  <div className="flex items-center gap-3 group">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-epicRed transition-colors">
                      <Waves size={20} className="text-epicRed group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{t.featureWax}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 group">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-epicRed transition-colors">
                      <Award size={20} className="text-epicRed group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{t.featureLeash}</span>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-epicRed transition-colors">
                      <Globe size={20} className="text-epicRed group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{t.featureSizes}</span>
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
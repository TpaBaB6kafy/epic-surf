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
      navLessons: "Уроки", navRentals: "Аренда", btnBook: "Записаться",
      heroTitle: "Поймай свою", heroTitleEpic: "Epic", heroTitleEnd: "волну в Дананге",
      heroSub: "Премиальная серф-школа на пляже Микхе. Профессиональное обучение, топовое оборудование и лучшее комьюнити.",
      sectionTitle: "Выбери свой", sectionTitleRide: "Формат",
      rentalBadge: "Профессиональный стафф", rentalTitle: "Аренда", rentalTitleSurf: "серф-бордов",
      rentalDesc: "Мы предоставляем премиальные софт-топы, лонгборды и перформанс шортборды. Аренда включает воск и советы по текущему прогнозу.",
      rentalPrice: "от 250,000 VND", rentalUnit: "Сессия / 2 часа", rentalBtn: "Арендовать",
      reviewsTitle: "Лучшие вайбы в Дананге", reviewText: "Потрясающий опыт! В первый раз встал на доску, и инструктор сделал всё очень простым и безопасным. Поймал свою первую волну уже через 20 минут!",
      locationTitle: "Найди наш", locationTitleSpot: "Спот",
      locationAddress: "Пляж Микхе, Дананг", locationLandmark: "Ищите красный флаг EPIC SURF на песке",
      btnOpenMaps: "Открыть в Картах", footerNav: "Навигация", footerMaps: "Карты", modalTitle: "Запись",
      cards: [
        { title: "Групповой урок", badge: "Популярно", desc: "Идеально для новичков. До 4-х человек на инструктора.", price: "900,000 VND" },
        { title: "Сплит урок", badge: "Выгодно", desc: "Для 2-х человек. Больше внимания тренера. Цена за двоих.", price: "2,500,000 VND" },
        { title: "Приватный урок", badge: "Премиум", desc: "Индивидуальная тренировка для быстрого прогресса.", price: "1,800,000 VND" },
        { title: "Line-up / Pro", badge: "Для опытных", desc: "Выход на лайнап с гидом. Поиск лучших пиков.", price: "2,400,000 VND" }
      ]
    },
    en: {
      navLessons: "Lessons", navRentals: "Rentals", btnBook: "Book Now",
      heroTitle: "Catch Your", heroTitleEpic: "Epic", heroTitleEnd: "Wave in Da Nang",
      heroSub: "Premium surf school on My Khe Beach. Expert coaching, top-tier gear, and the best surf community.",
      sectionTitle: "Choose Your", sectionTitleRide: "Ride",
      rentalBadge: "Professional Gear", rentalTitle: "Surf Board", rentalTitleSurf: "Rentals",
      rentalDesc: "We provide premium soft-tops, longboards, and performance shortboards. Expert advice included.",
      rentalPrice: "from 250,000 VND", rentalUnit: "2 hour / Session", rentalBtn: "Rent Now",
      reviewsTitle: "The best surf vibes", reviewText: "Amazing experience! First time surfing and the instructor made it so easy and safe. Caught my first wave in 20 minutes!",
      locationTitle: "Find the", locationTitleSpot: "Spot",
      locationAddress: "My Khe Beach, Da Nang", locationLandmark: "Look for the Red EPIC SURF flag on the sand",
      btnOpenMaps: "Open in Google Maps", footerNav: "Navigation", footerMaps: "Maps", modalTitle: "Booking",
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
    googleMaps: "https://www.google.com/maps/place/EPIC+Surf+School+Da+Nang/@16.0464674,108.2504812,17z"
  };

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-hidden">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full bg-epicWhite/80 backdrop-blur-md z-50 border-b border-epicPink">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-epicDark">
          <div className="text-xl md:text-2xl font-black uppercase tracking-tighter">
            EPIC <span className="text-epicRed italic">SURF</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="flex items-center gap-2 font-bold text-[10px] uppercase bg-epicPink px-3 py-2 rounded-full hover:bg-epicRed hover:text-white transition-all text-epicDark"><Globe size={14} /> {lang === 'ru' ? 'EN' : 'RU'}</button>
            <button onClick={() => setBookingUrl(links.group)} className="bg-epicRed text-white px-5 py-2 rounded-full font-bold uppercase text-[10px] shadow-lg shadow-epicRed/30">{t.btnBook}</button>
          </div>
        </div>
      </header>

      {/* 2. HERO */}
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

      {/* 3. УСЛУГИ (ТВОИ РОДНЫЕ КАРТОЧКИ) */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-tighter text-epicDark">
          {t.sectionTitle} <span className="text-epicRed italic">{t.sectionTitleRide}</span>
        </h2>

        {/* MOBILE */}
        <div className="md:hidden overflow-visible mb-12">
          <motion.div drag="x" dragConstraints={{ left: -950, right: 0 }} className="flex gap-6 px-2">
            {t.cards.map((item, i) => (
              <div key={i} className="min-w-[280px] bg-epicPink rounded-[40px] p-8 shadow-xl flex flex-col border border-epicPink">
                <div className="mb-6"><Waves size={40} className="text-epicRed" /></div>
                <div className="text-[10px] text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
                <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight text-epicDark">{item.title}</h3>
                <p className="text-epicDark/70 mb-8 text-sm flex-1">{item.desc}</p>
                <div className="text-2xl font-black mb-6 text-epicDark">{item.price}</div>
                <button onClick={() => setBookingUrl(i === 0 ? links.group : links.personal)} className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-xs">{t.btnBook}</button>
              </div>
            ))}
          </motion.div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {t.cards.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-epicPink rounded-[40px] p-8 shadow-lg flex flex-col border border-epicPink transition-all">
              <div className="mb-6 text-epicRed">
                {i === 1 ? <Award size={40} /> : i === 2 ? <Star size={40} /> : <Waves size={40} />}
              </div>
              <div className="text-[10px] text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight text-epicDark">{item.title}</h3>
              <p className="text-epicDark/70 mb-8 text-sm leading-relaxed flex-1">{item.desc}</p>
              <div className="text-2xl font-black mb-8 tracking-tighter text-epicDark">{item.price}</div>
              <button onClick={() => setBookingUrl(i === 0 ? links.group : links.personal)} className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-xs hover:bg-epicRed transition-all">{t.btnBook}</button>
            </motion.div>
          ))}
        </div>

        {/* RENTALS */}
        <div id="rentals" className="bg-epicDark text-white rounded-[40px] p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 mt-12">
          <div>
            <div className="text-epicCoral font-bold mb-4 uppercase tracking-widest text-xs">{t.rentalBadge}</div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">{t.rentalTitle} <span className="text-epicRed">{t.rentalTitleSurf}</span></h3>
            <p className="text-white/60 max-w-xl text-lg leading-relaxed">{t.rentalDesc}</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="text-3xl font-black mb-6 tracking-tighter text-center">{t.rentalPrice} <br/><span className="text-sm font-normal opacity-40 uppercase tracking-widest">/ 2 hours</span></div>
            <button onClick={() => setBookingUrl(links.rental)} className="w-full md:w-auto px-12 bg-epicRed text-white py-5 rounded-2xl font-black uppercase text-xs hover:bg-white hover:text-epicRed transition-all">{t.rentalBtn}</button>
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section className="py-24 bg-epicDark overflow-hidden flex flex-col gap-6">
        <div className="flex w-[200%] animate-marquee gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-[300px] h-[400px] md:w-[450px] md:h-[550px] flex-shrink-0 rounded-[32px] overflow-hidden">
              <img src={`/gallery/${(i % 20) + 1}.webp`} alt="Surf" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. REVIEWS */}
      <section className="py-32 bg-epicPink text-epicDark text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Star className="text-epicRed mx-auto mb-10 h-16 w-16 fill-current" />
          <h2 className="text-4xl md:text-6xl font-black mb-16 uppercase tracking-tighter italic">"{t.reviewsTitle}"</h2>
          <div className="bg-epicWhite p-10 md:p-16 rounded-[50px] shadow-2xl border border-white max-w-2xl mx-auto">
            <p className="text-xl md:text-3xl font-medium italic mb-12 leading-tight">"{t.reviewText}"</p>
            <div className="font-black text-xl uppercase tracking-widest">— Sarah T., Australia</div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER WITH INTEGRATED MAP (ИСПРАВЛЕННЫЙ) */}
      <footer id="location" className="bg-epicDark text-white pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-12 flex flex-col justify-between">
              <div className="space-y-6 text-center md:text-left">
                <div className="text-3xl font-black tracking-tighter uppercase italic">EPIC <span className="text-epicRed">SURF</span></div>
                <p className="text-white/50 text-lg leading-relaxed">{t.heroSub}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 text-center md:text-left font-bold text-sm">
                <nav className="flex flex-col gap-3">
                  <h4 className="text-[10px] uppercase text-epicRed tracking-widest mb-2">{t.footerNav}</h4>
                  <a href="#lessons" className="hover:text-epicRed transition-colors uppercase">{t.navLessons}</a>
                  <a href="#rentals" className="hover:text-epicRed transition-colors uppercase">{t.navRentals}</a>
                </nav>
                <div className="flex flex-col gap-3">
                   <h4 className="text-[10px] uppercase text-epicRed tracking-widest mb-2">Socials</h4>
                   <div className="flex gap-4 justify-center md:justify-start">
                      <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-epicRed transition-all"><MessageCircle size={20} /></a>
                      <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-epicRed transition-all"><Phone size={20} /></a>
                   </div>
                </div>
              </div>
              <div className="pt-8 border-t border-white/5 text-center md:text-left">
                <p className="text-white/80 font-bold mb-1">{t.locationAddress}</p>
                <p className="text-white/50 text-sm">{t.footerLocation}</p>
              </div>
            </div>

            {/* Map Column (БЕЗ ФИЛЬТРОВ И НАЛОЖЕНИЙ) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="h-[400px] lg:h-full min-h-[450px] rounded-[40px] overflow-hidden border border-white/10 relative shadow-2xl bg-black">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s" 
                  className="w-full h-full border-none"
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <a href={links.googleMaps} target="_blank" className="w-full py-5 bg-white text-epicDark text-center rounded-2xl font-black uppercase text-xs active:scale-95 transition-all">
                {t.btnOpenMaps}
              </a>
            </div>
          </div>
          <div className="text-center pt-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">© 2026 Epic Surf School</div>
        </div>
      </footer>

      {/* 7. MESSENGERS */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-end gap-4">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${isChatOpen ? 'bg-epicDark rotate-[135deg]' : 'bg-epicRed'}`}>
          {isChatOpen ? <X size={32} color="white" /> : <MessageCircle size={32} color="white" />}
          {!isChatOpen && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#25D366] border-4 border-epicWhite rounded-full animate-ping"></span>}
        </button>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} className="flex flex-col gap-4 mb-2">
              <a href={links.whatsapp} target="_blank" className="w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full"><MessageCircle size={28} /></a>
              <a href={links.telegram} target="_blank" className="w-14 h-14 flex items-center justify-center bg-[#0088cc] text-white rounded-full"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
              <a href={links.zalo} target="_blank" className="w-14 h-14 flex items-center justify-center bg-[#0068ff] text-white rounded-full text-lg font-black italic">Z</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 8. MODAL */}
      <AnimatePresence>
        {bookingUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingUrl(null)} className="absolute inset-0 bg-epicDark/90 backdrop-blur-md cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-5xl h-[85vh] bg-epicWhite rounded-[40px] overflow-hidden z-10 flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-epicPink bg-epicWhite text-epicDark">
                <span className="font-black uppercase text-[10px] tracking-widest">{t.modalTitle}</span>
                <button onClick={() => setBookingUrl(null)} className="p-2 bg-epicPink rounded-full text-epicDark"><X size={18} /></button>
              </div>
              <iframe src={bookingUrl} className="w-full flex-1 border-none bg-white" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
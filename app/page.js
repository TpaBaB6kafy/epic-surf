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
      heroSub: "Премиальная серф-школа на пляже Микхе. Профессиональное обучение, оборудование и комьюнити.",
      sectionTitle: "Выбери свой", sectionTitleRide: "Формат",
      rentalBadge: "Professional Gear", rentalTitle: "Аренда", rentalTitleSurf: "Досок",
      rentalDesc: "Премиальные софт-топы и шортборды. Поможем подобрать доску под текущий прогноз.",
      rentalPrice: "от 250,000 VND", rentalUnit: "Сессия / 2 часа", rentalBtn: "Арендовать",
      reviewsTitle: "Лучшие вайбы в Дананге",
      reviewText: "Потрясающий опыт! В первый раз встал на доску через 20 минут! Инструктор сделал всё очень просто.",
      locationTitle: "Где нас", locationTitleSpot: "Найти",
      locationSubtitle: "Мы находимся прямо на песке пляжа Микхе",
      locationAddress: "Пляж Микхе, Дананг",
      locationLandmark: "Ищите красный флаг EPIC SURF напротив отеля TMS",
      btnOpenMaps: "Открыть Google Maps",
      footerLocation: "Дананг, 06:00 — 18:00", footerNav: "Навигация", footerMaps: "Карты", modalTitle: "Запись",
      cards: [
        { title: "Групповой урок", badge: "Популярно", desc: "До 4-х человек на инструктора. Идеально для новичков.", price: "900,000 VND" },
        { title: "Сплит урок", badge: "Выгодно", desc: "Для 2-х человек. Больше внимания. Цена за двоих.", price: "2,500,000 VND" },
        { title: "Приватный урок", badge: "Премиум", desc: "Индивидуально для максимального прогресса.", price: "1,800,000 VND" },
        { title: "Line-up / Pro", badge: "Advanced", desc: "Выход на лайнап с гидом. Лучшие пики.", price: "2,400,000 VND" }
      ]
    },
    en: {
      navLessons: "Lessons", navRentals: "Rentals", btnBook: "Book Now",
      heroTitle: "Catch Your", heroTitleEpic: "Epic", heroTitleEnd: "Wave in Da Nang",
      heroSub: "Premium surf school on My Khe Beach. Expert coaching, top gear, and best community.",
      sectionTitle: "Choose Your", sectionTitleRide: "Ride",
      rentalBadge: "Professional Gear", rentalTitle: "Board", rentalTitleSurf: "Rentals",
      rentalDesc: "Premium soft-tops and shortboards. Expert advice on current conditions.",
      rentalPrice: "from 250,000 VND", rentalUnit: "2 hour / Session", rentalBtn: "Rent Now",
      reviewsTitle: "The best surf vibes",
      reviewText: "Amazing experience! Caught my first wave in 20 minutes! This school is pure fire.",
      locationTitle: "Find the", locationTitleSpot: "Spot",
      locationSubtitle: "Located right on the sands of My Khe Beach",
      locationAddress: "My Khe Beach, Da Nang",
      locationLandmark: "Look for the Red EPIC SURF flag opposite TMS Hotel",
      btnOpenMaps: "Open Google Maps",
      footerLocation: "Da Nang. 06:00 — 18:00", footerNav: "Navigation", footerMaps: "Open Maps", modalTitle: "Booking",
      cards: [
        { title: "Group Lesson", badge: "Most Popular", desc: "Max 4 surfers per coach. Perfect for beginners.", price: "900,000 VND" },
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
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-hidden transition-colors duration-500">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full bg-epicWhite/90 backdrop-blur-md z-50 border-b border-epicPink/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-black uppercase tracking-tighter">
            EPIC <span className="text-epicRed italic">SURF</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="bg-epicPink px-3 py-2 rounded-full font-bold text-[10px] uppercase transition-all">
              {lang === 'ru' ? 'EN' : 'RU'}
            </button>
            <button onClick={() => setBookingUrl(links.group)} className="bg-epicRed text-white px-5 py-2 rounded-full font-bold uppercase text-[10px] shadow-lg shadow-epicRed/20">
              {t.btnBook}
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden pt-20">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105">
          <source src="/hero-surf.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 key={lang} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight mb-6 leading-none drop-shadow-2xl">
            {t.heroTitle} <br/><span className="text-epicRed italic">{t.heroTitleEpic}</span> {t.heroTitleEnd}
          </motion.h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">{t.heroSub}</p>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-tighter">
          {t.sectionTitle} <span className="text-epicRed italic">{t.sectionTitleRide}</span>
        </h2>
        
        {/* MOBILE */}
        <div className="md:hidden flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory">
          {t.cards.map((item, i) => (
            <div key={i} className="min-w-[85vw] snap-center bg-epicPink rounded-[40px] p-8 shadow-xl flex flex-col border border-white/50">
              <Waves size={40} className="text-epicRed mb-6" />
              <div className="text-[10px] text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
              <h3 className="text-2xl font-bold mb-3 uppercase text-epicDark">{item.title}</h3>
              <p className="text-epicDark/70 mb-8 text-sm flex-1">{item.desc}</p>
              <div className="text-2xl font-black mb-6 text-epicDark">{item.price}</div>
              <button onClick={() => setBookingUrl(i === 0 ? links.group : links.personal)} className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-xs active:scale-95 transition-all">{t.btnBook}</button>
            </div>
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-16">
          {t.cards.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-epicPink rounded-[40px] p-8 shadow-lg flex flex-col border border-white/50">
              {i === 1 ? <Award size={40} className="text-epicRed mb-6" /> : i === 2 ? <Star size={40} className="text-epicRed mb-6" /> : <Waves size={40} className="text-epicRed mb-6" />}
              <div className="text-[10px] text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
              <h3 className="text-2xl font-bold mb-3 uppercase text-epicDark">{item.title}</h3>
              <p className="text-epicDark/70 mb-8 text-sm flex-1">{item.desc}</p>
              <div className="text-2xl font-black mb-8 text-epicDark">{item.price}</div>
              <button onClick={() => setBookingUrl(i === 0 ? links.group : links.personal)} className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-xs hover:bg-epicRed transition-colors">{t.btnBook}</button>
            </motion.div>
          ))}
        </div>

        {/* RENTALS */}
        <div id="rentals" className="bg-epicDark text-white rounded-[40px] p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 mt-12 overflow-hidden relative">
          <div className="relative z-10 text-center md:text-left">
            <div className="text-epicRed font-bold mb-4 uppercase tracking-widest text-xs">{t.rentalBadge}</div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">{t.rentalTitle} <span className="text-epicRed italic">{t.rentalTitleSurf}</span></h3>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">{t.rentalDesc}</p>
          </div>
          <div className="relative z-10 flex flex-col items-center md:items-end w-full md:w-auto">
            <div className="text-3xl font-black mb-6 tracking-tighter text-center">{t.rentalPrice} <br/><span className="text-sm font-normal opacity-40 uppercase tracking-widest">{t.rentalUnit}</span></div>
            <button onClick={() => setBookingUrl(links.rental)} className="w-full md:w-auto px-12 bg-epicRed text-white py-5 rounded-2xl font-black uppercase text-xs hover:bg-white hover:text-epicRed transition-all">{t.rentalBtn}</button>
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section className="py-12 bg-epicDark overflow-hidden flex flex-col gap-6">
        <div className="flex w-[200%] animate-marquee gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-[300px] h-[400px] md:w-[450px] md:h-[550px] flex-shrink-0 rounded-[32px] overflow-hidden shadow-2xl">
              <img src={`/gallery/${(i % 20) + 1}.webp`} alt="Surf" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. LOCATION (ПОЛНОСТЬЮ ИСПРАВЛЕННЫЙ) */}
      <section id="location" className="py-24 bg-epicDark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Текст */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                {t.locationTitle} <span className="text-epicRed italic">{t.locationTitleSpot}</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-epicRed rounded-2xl flex items-center justify-center flex-shrink-0"><MapPin size={24} /></div>
                  <div><div className="font-bold uppercase tracking-widest text-[10px] text-epicRed mb-1">Spot Location</div><p className="text-xl font-bold">{t.locationAddress}</p></div>
                </div>
                <div className="flex items-start gap-4 opacity-70">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0"><Star size={24} /></div>
                  <div><div className="font-bold uppercase tracking-widest text-[10px] mb-1">Landmark</div><p className="text-lg">{t.locationLandmark}</p></div>
                </div>
              </div>
            </div>
            {/* Контейнер: Карта + Кнопка СНАРУЖИ */}
            <div className="flex flex-col gap-6">
              <div className="h-[350px] md:h-[550px] w-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s" 
                  className="w-full h-full border-none opacity-100 lg:grayscale lg:invert lg:contrast-125 lg:opacity-70 lg:hover:grayscale-0 lg:hover:invert-0 lg:hover:opacity-100 transition-all duration-700"
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <a href={links.googleMaps} target="_blank" rel="noreferrer" className="w-full bg-white text-epicDark py-6 rounded-3xl font-black uppercase text-center text-sm shadow-2xl active:scale-95 transition-all">
                {t.btnOpenMaps}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REVIEWS */}
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

      {/* 7. FOOTER */}
      <footer className="bg-epicDark text-white py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20 text-center md:text-left border-b border-white/10 pb-20">
          <div>
            <div className="text-3xl font-black tracking-tighter uppercase mb-8 italic">EPIC <span className="text-epicRed">SURF</span></div>
            <p className="text-white/50 text-lg leading-relaxed">{t.footerLocation}</p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <h4 className="font-black text-xl uppercase tracking-widest text-white">Socials</h4>
            <div className="flex gap-8">
              <a href="#" className="hover:text-epicRed transition-all scale-125"><MessageCircle size={28} /></a>
              <a href="tel:+84383880164" className="hover:text-epicRed transition-all scale-125"><Phone size={28} /></a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center">
             <MapPin className="text-epicRed mb-6 h-12 w-12" />
             <a href={links.googleMaps} target="_blank" className="text-xs border-2 border-white/10 px-8 py-3 rounded-full hover:bg-white hover:text-epicDark font-bold uppercase transition-all">Open Maps</a>
          </div>
        </div>
        <div className="text-center pt-12 text-[10px] uppercase font-bold tracking-[0.3em] opacity-20">© 2026 Epic Surf School</div>
      </footer>

      {/* 8. MESSENGERS */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-end gap-4">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${isChatOpen ? 'bg-epicDark rotate-[135deg]' : 'bg-epicRed'}`}>
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

      {/* 9. MODAL */}
      <AnimatePresence>
        {bookingUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingUrl(null)} className="absolute inset-0 bg-epicDark/90 backdrop-blur-md cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-5xl h-[85vh] bg-epicWhite rounded-[40px] overflow-hidden z-10 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-epicPink bg-epicWhite text-epicDark font-black uppercase tracking-widest text-[10px]">
                <span>{t.modalTitle}</span>
                <button onClick={() => setBookingUrl(null)} className="p-2 bg-epicPink rounded-full text-epicDark"><X size={18} /></button>
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
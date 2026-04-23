"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, MapPin, Award, Star, Phone, MessageCircle, X } from "lucide-react";

export default function EpicSurfLanding() {
  // === ПАМЯТЬ ДЛЯ МОДАЛКИ (Хранит ссылку на нужный виджет Altegio) ===
  const [bookingUrl, setBookingUrl] = useState(null);

  // Ссылки Altegio
  const links = {
    group: "https://n1304231.alteg.io/company/1248257/activity/select?o=m-1act2026-04-23",
    personal: "https://n1304231.alteg.io/company/1248257/personal/select-time?o=m-1",
    rental: "https://n1304231.alteg.io/company/1248257/personal/select-services?o=m-1"
  };

  // Данные карточек с привязкой нужной ссылки
  const lessonCards =[
    {
      title: "Group Lesson",
      price: "900,000 VND",
      badge: "Most Popular",
      desc: "Perfect for beginners",
      icon: <Waves size={40} className="text-epicRed" />,
      link: links.group
    },
    {
      title: "Split Lesson",
      price: "2,500,000 VND",
      badge: "Best Value",
      desc: "2 people, more attention",
      icon: <Award size={40} className="text-epicRed" />,
      link: links.personal // Персональная ветка
    },
    {
      title: "Private Lesson",
      price: "1,800,000 VND",
      badge: "Premium",
      desc: "1-on-1 coaching",
      icon: <Star size={40} className="text-epicRed" />,
      link: links.personal // Персональная ветка
    },
    {
      title: "Advanced / Line-up",
      price: "2,400,000 VND",
      badge: "Pro Only",
      desc: "For experienced surfers",
      icon: <Waves size={40} className="text-epicRed" />,
      link: links.personal // Либо можно дать ссылку на WhatsApp
    }
  ];

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-hidden">
      
      {/* 1. HEADER (Sticky) */}
      <header className="fixed top-0 w-full bg-epicWhite/80 backdrop-blur-md z-50 border-b border-epicPink">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase">
            EPIC <span className="text-epicRed">SURF</span>
          </div>
          <nav className="hidden md:flex gap-8 font-semibold text-sm">
            <a href="#lessons" className="hover:text-epicCoral transition-colors">Lessons</a>
            <a href="#rentals" className="hover:text-epicCoral transition-colors">Rentals</a>
          </nav>
          <button 
            onClick={() => setBookingUrl(links.group)}
            className="bg-epicRed hover:bg-epicCoral text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-epicRed/30 hover:scale-105">
            Book Now
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden pt-20">
        
        {/* 🎬 ФОНОВОЕ ВИДЕО */}
        {/* Свойства autoPlay, loop, muted и playsInline ОБЯЗАТЕЛЬНЫ, чтобы видео само играло на телефонах! */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          {/* Пока тут стоит временное видео из интернета для теста. */}
          {/* Ниже я расскажу, как заменить его на твое собственное! */}
          <source src="/hero-surf.mp4" type="video/mp4" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6"
          >
            Catch Your <br/>
            <span className="text-epicRed">Epic Wave</span><br/>
            In Da Nang
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-epicPink/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Серф-школа для любого уровня. Уроки, аренда досок и лучшее комьюнити во Вьетнаме.
          </motion.p>
          
          {/* Кнопки отсюда удалены! */}
        </div>
      </section>

      {/* 3. УСЛУГИ */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 uppercase">
          Choose Your <span className="text-epicRed">Ride</span>
        </h2>

        {/* 📱 MOBILE CAROUSEL */}
        <div className="md:hidden overflow-visible mb-12">
          <motion.div
            drag="x"
            dragConstraints={{ left: -900, right: 0 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing px-2"
          >
            {lessonCards.map((item, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.95 }}
                // Добавили flex flex-col, убрали relative
                className="min-w-[85%] bg-epicPink rounded-[32px] p-8 flex-shrink-0 shadow-xl flex flex-col"
              >
                <div className="mb-4">{item.icon}</div>
                <div className="text-sm text-epicRed font-bold mb-2 uppercase tracking-wide">{item.badge}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                {/* Добавили flex-1 чтобы описание растягивалось */}
                <p className="text-epicDark/70 mb-6 flex-1">{item.desc}</p>
                <div className="text-2xl font-black mb-6">{item.price}</div>
                
                <button
                  onClick={() => setBookingUrl(item.link)}
                  // Убрали абсолютное позиционирование, добавили mt-auto
                  className="w-full bg-epicDark text-white py-4 rounded-xl font-bold hover:bg-epicCoral transition-colors mt-auto"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 💻 DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {lessonCards.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-epicPink rounded-[32px] p-8 shadow-xl flex flex-col"
            >
              <div className="mb-4">{item.icon}</div>
              <div className="text-sm text-epicRed font-bold mb-2 uppercase tracking-wide">{item.badge}</div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-epicDark/70 mb-6 flex-1">{item.desc}</p>
              <div className="text-2xl font-black mb-8">{item.price}</div>
              <button
                onClick={() => setBookingUrl(item.link)}
                className="w-full bg-epicDark text-white py-4 rounded-xl font-bold hover:bg-epicCoral transition-colors mt-auto"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* 🏄‍♂️ КАРТОЧКА АРЕНДЫ (Широкая на всю ширину) */}
        <div id="rentals" className="bg-epicDark text-white rounded-[32px] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-epicCoral font-bold mb-2 uppercase tracking-wide">Привезем на спот</div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Аренда досок</h3>
            <p className="text-white/70 max-w-xl">
              Огромный выбор досок в идеальном состоянии: от безопасных софтбордов для новичков до быстрых шортбордов. Поможем подобрать доску под текущие волны.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col items-center md:items-end">
            <div className="text-2xl font-black mb-4">от 250,000 VND <span className="text-sm font-normal text-white/50">/ час</span></div>
            <button
              onClick={() => setBookingUrl(links.rental)}
              className="w-full md:w-auto px-12 bg-epicRed text-white py-4 rounded-xl font-bold hover:bg-epicCoral transition-colors"
            >
              Арендовать доску
            </button>
          </div>
        </div>

      </section>

      {/* 4. GALLERY */}
      <section className="py-12 bg-epicDark overflow-hidden">
        <div className="flex w-[200%] animate-marquee gap-4">
          {[1,2,3,4,5,6].map((img, idx) => (
             <div key={idx} className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] bg-epicPink rounded-2xl flex-shrink-0 overflow-hidden relative">
               <img src={`https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=400&auto=format&fit=crop&sig=${idx}`} alt="Surf Vibe" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
             </div>
          ))}
        </div>
      </section>

      {/* 5. ОТЗЫВЫ */}
      <section className="py-24 bg-epicPink">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Star className="text-epicRed mx-auto mb-6 h-12 w-12 fill-current" />
          <h2 className="text-4xl font-black mb-12 uppercase">Hear From Our Surfers</h2>
          <div className="bg-epicWhite p-8 md:p-12 rounded-3xl shadow-lg relative">
            <p className="text-xl md:text-2xl font-medium italic mb-8">
              "Amazing experience! First time surfing and the instructor made it so easy and safe. Caught my first wave in 20 minutes! The vibe at Epic Surf is truly epic."
            </p>
            <div className="font-bold text-lg">— Sarah T., Australia (Google Reviews)</div>
          </div>
        </div>
      </section>

      {/* 6. ФУТЕР */}
      <footer className="bg-epicDark text-epicWhite py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
          <div>
            <div className="text-3xl font-black tracking-tighter uppercase mb-6">
              EPIC <span className="text-epicRed">SURF</span>
            </div>
            <p className="text-epicPink/70 mb-6">Дананг, пляж Микхе.<br/>Открыты с 06:00 до 18:00</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-epicCoral transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-epicCoral transition-colors"><Phone /></a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xl mb-2">Навигация</h4>
            <a href="#lessons" className="text-epicPink/70 hover:text-epicRed transition-colors">Уроки</a>
            <a href="#rentals" className="text-epicPink/70 hover:text-epicRed transition-colors">Аренда</a>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
             <MapPin className="text-epicRed mb-4 h-10 w-10" />
             <p className="font-bold mb-2">Найти нас на споте</p>
             <button className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-epicRed transition-colors">
               Открыть Google Maps
             </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 text-center text-white/30 text-sm">
          © 2026 Epic Surf School. All rights reserved.
        </div>
      </footer>

      {/* 7. ПЛАВАЮЩИЙ WHATSAPP */}
      <a href="https://wa.me/123456789" target="_blank" rel="noreferrer" 
         className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center group">
        <MessageCircle size={32} />
        <span className="absolute right-16 bg-epicDark text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat with us!
        </span>
      </a>

      {/* ========================================================= */}
      {/* 8. ALTEGIO BOOKING MODAL (ВСПЛЫВАЮЩЕЕ ОКНО ДЛЯ ЗАПИСИ) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {bookingUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6">
            
            {/* Темный фон (при клике закрывается) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingUrl(null)}
              className="absolute inset-0 bg-epicDark/80 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Само белое окно */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-epicWhite rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Шапка модалки */}
              <div className="flex justify-between items-center p-4 md:p-6 border-b border-epicPink bg-white">
                <h3 className="font-bold text-xl uppercase tracking-tight">
                  <span className="text-epicRed">Epic</span> Booking
                </h3>
                <button 
                  onClick={() => setBookingUrl(null)} 
                  className="p-2 bg-epicPink text-epicDark hover:bg-epicCoral hover:text-white rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Фрейм Altegio */}
              <div className="flex-1 w-full bg-white relative">
                {/* Анимация загрузки */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-epicPink border-t-epicRed rounded-full animate-spin"></div>
                </div>
                {/* Сам виджет */}
                <iframe 
                  src={bookingUrl} 
                  className="w-full h-full relative z-10 border-none rounded-b-2xl md:rounded-b-3xl" 
                  title="Online Booking"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
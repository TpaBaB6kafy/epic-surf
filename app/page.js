"use client";
import { motion } from "framer-motion";
import { Waves, MapPin, Award, Star, Phone, MessageCircle } from "lucide-react";

export default function EpicSurfLanding() {
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
          <button className="bg-epicRed hover:bg-epicCoral text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-epicRed/30 hover:scale-105">
            Book Now
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070')] bg-cover bg-center" />
        
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
            className="text-epicPink/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Серф-школа для любого уровня. Уроки, аренда досок и лучшее комьюнити во Вьетнаме.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button className="bg-epicRed hover:bg-epicCoral text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-epicRed/20">
              Book a Lesson
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-epicDark px-8 py-4 rounded-full font-bold text-lg transition-all">
              Rent a Board
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. УСЛУГИ */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 uppercase">Choose Your <span className="text-epicRed">Ride</span></h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-epicPink rounded-[32px] p-8 hover:-translate-y-2 transition-transform duration-300 group">
            <Waves size={48} className="text-epicRed mb-6" />
            <h3 className="text-3xl font-bold mb-4">Surf Lessons</h3>
            <p className="text-epicDark/80 mb-6 min-h-[60px]">Для новичков и продолжающих. Индивидуальный подход и разбор ошибок.</p>
            <ul className="space-y-3 mb-8 font-medium">
              <li className="flex items-center gap-2">✔️ Доска и рашгард включены</li>
              <li className="flex items-center gap-2">✔️ Сертифицированный инструктор</li>
              <li className="flex items-center gap-2">✔️ Фото и видео разбор</li>
            </ul>
            <div className="text-xl font-black mb-6">от 900,000 VND / урок</div>
            <button className="w-full bg-epicDark text-white group-hover:bg-epicCoral py-4 rounded-xl font-bold transition-colors">
              Записаться
            </button>
          </div>

          <div id="rentals" className="bg-epicPink rounded-[32px] p-8 hover:-translate-y-2 transition-transform duration-300 group">
            <Award size={48} className="text-epicRed mb-6" />
            <h3 className="text-3xl font-bold mb-4">Board Rentals</h3>
            <p className="text-epicDark/80 mb-6 min-h-[60px]">Огромный выбор досок: от безопасных софттопов до шортбордов.</p>
            <ul className="space-y-3 mb-8 font-medium">
              <li className="flex items-center gap-2">✔️ Идеальное состояние</li>
              <li className="flex items-center gap-2">✔️ Воск включен</li>
              <li className="flex items-center gap-2">✔️ Помощь в подборе под волну</li>
            </ul>
            <div className="text-xl font-black mb-6">2 часа — всего 250,000 VN</div>
            <button className="w-full bg-epicDark text-white group-hover:bg-epicCoral py-4 rounded-xl font-bold transition-colors">
              Выбрать доску
            </button>
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section className="py-12 bg-epicDark overflow-hidden">
        <div className="flex w-[200%] animate-marquee gap-4">
          {["/surf1.jpg","/surf2.jpg","/surf3.jpg","/surf4.jpg","/surf5.jpg","/surf6.jpg"].map((src, idx) => (
  <div key={idx} className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] bg-epicPink rounded-2xl flex-shrink-0 overflow-hidden relative">
    <img src={src} alt="Surf Vibe" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
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
                {/* SVG Иконка Instagram вместо удаленной из библиотеки */}
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

    </div>
  );
}
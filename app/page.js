"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, MapPin, Award, Star, Phone, MessageCircle, X } from "lucide-react";

export default function EpicSurfLanding() {
  const [bookingUrl, setBookingUrl] = useState(null);

  const links = {
    group: "https://n1304231.alteg.io/company/1248257/activity/select?o=m-1act2026-04-23",
    personal: "https://n1304231.alteg.io/company/1248257/personal/select-time?o=m-1",
    rental: "https://n1304231.alteg.io/company/1248257/personal/select-services?o=m-1"
  };

  const lessonCards = [
    {
      title: "Group Lesson",
      price: "900,000 VND",
      badge: "Most Popular",
      desc: "Perfect for beginners. Max 4 people per instructor.",
      icon: <Waves size={40} className="text-epicRed" />,
      link: links.group
    },
    {
      title: "Split Lesson",
      price: "2,500,000 VND",
      badge: "Best Value",
      desc: "2 people, more attention. Price for both.",
      icon: <Award size={40} className="text-epicRed" />,
      link: links.personal
    },
    {
      title: "Private Lesson",
      price: "1,800,000 VND",
      badge: "Premium",
      desc: "1-on-1 coaching for maximum progress.",
      icon: <Star size={40} className="text-epicRed" />,
      link: links.personal
    },
    {
      title: "Line-up / Advanced",
      price: "2,400,000 VND",
      badge: "Pro Only",
      desc: "For experienced surfers. Guiding to the best peaks.",
      icon: <Waves size={40} className="text-epicRed" />,
      link: links.personal
    }
  ];

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-hidden">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full bg-epicWhite/80 backdrop-blur-md z-50 border-b border-epicPink">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase">
            EPIC <span className="text-epicRed">SURF</span>
          </div>
          <nav className="hidden md:flex gap-8 font-semibold text-sm">
            <a href="#lessons" className="hover:text-epicRed transition-colors uppercase">Lessons</a>
            <a href="#rentals" className="hover:text-epicRed transition-colors uppercase">Rentals</a>
          </nav>
          <button 
            onClick={() => setBookingUrl(links.group)}
            className="bg-epicRed hover:bg-epicCoral text-white px-6 py-2 rounded-full font-bold transition-all uppercase text-xs tracking-widest shadow-lg shadow-epicRed/30"
          >
            Book Now
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/hero-surf.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight mb-6 leading-none"
          >
            Catch Your <br/>
            <span className="text-epicRed italic">Epic</span> Wave<br/>
            In Da Nang
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-epicPink/80 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Premium surf school on My Khe Beach. <br/>Expert coaching, top-tier gear, and the best surf community.
          </motion.p>
        </div>
      </section>

      {/* 3. УСЛУГИ */}
      <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-tighter">
          Choose Your <span className="text-epicRed italic">Ride</span>
        </h2>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden overflow-visible mb-12">
          <motion.div
            drag="x"
            dragConstraints={{ left: -950, right: 0 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing px-2"
          >
            {lessonCards.map((item, i) => (
              <div key={i} className="min-w-[280px] bg-epicPink rounded-[40px] p-8 shadow-xl flex flex-col border border-epicPink">
                <div className="mb-6">{item.icon}</div>
                <div className="text-xs text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
                <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-epicDark/70 mb-8 text-sm leading-relaxed flex-1">{item.desc}</p>
                <div className="text-2xl font-black mb-6">{item.price}</div>
                <button
                  onClick={() => setBookingUrl(item.link)}
                  className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-sm tracking-widest hover:bg-epicRed transition-colors"
                >
                  Book Now
                </button>
              </div>
            ))}
          </motion.div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {lessonCards.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-epicPink rounded-[40px] p-8 shadow-lg flex flex-col border border-epicPink transition-all"
            >
              <div className="mb-6">{item.icon}</div>
              <div className="text-xs text-epicRed font-bold mb-2 uppercase tracking-widest">{item.badge}</div>
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight">{item.title}</h3>
              <p className="text-epicDark/70 mb-8 text-sm leading-relaxed flex-1">{item.desc}</p>
              <div className="text-2xl font-black mb-8 tracking-tighter">{item.price}</div>
              <button
                onClick={() => setBookingUrl(item.link)}
                className="w-full bg-epicDark text-white py-4 rounded-2xl font-bold uppercase text-sm tracking-widest hover:bg-epicRed transition-all shadow-md"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* RENTALS */}
        <div id="rentals" className="bg-epicDark text-white rounded-[40px] p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-epicCoral font-bold mb-4 uppercase tracking-widest text-sm">Professional Gear</div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Surf Board <span className="text-epicRed">Rentals</span></h3>
            <p className="text-white/60 max-w-xl text-lg leading-relaxed">
              We provide premium soft-tops, longboards, and performance shortboards. All rentals include wax and expert advice on the current swell.
            </p>
          </div>
          <div className="relative z-10 flex flex-col items-center md:items-end w-full md:w-auto">
            <div className="text-3xl font-black mb-6 tracking-tighter text-center md:text-right">
              from 250,000 VND <br/>
              <span className="text-sm font-normal opacity-40 uppercase tracking-widest">per hour</span>
            </div>
            <button
              onClick={() => setBookingUrl(links.rental)}
              className="w-full md:w-auto px-12 bg-epicRed text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white hover:text-epicRed transition-all shadow-xl shadow-epicRed/20"
            >
              Rent Now
            </button>
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section className="py-24 bg-epicDark overflow-hidden">
        <div className="flex w-[200%] animate-marquee gap-6">
          {[1,2,3,4,5,6].map((img, idx) => (
             <div key={idx} className="w-[300px] h-[450px] md:w-[450px] md:h-[600px] bg-epicPink rounded-[40px] flex-shrink-0 overflow-hidden shadow-2xl">
               <img 
                 src={`https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600&auto=format&fit=crop&sig=${idx}`} 
                 alt="Epic Vibe" 
                 className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100" 
               />
             </div>
          ))}
        </div>
      </section>

      {/* 5. REVIEWS */}
      <section className="py-32 bg-epicPink">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Star className="text-epicRed mx-auto mb-10 h-16 w-16 fill-current" />
          <h2 className="text-4xl md:text-6xl font-black mb-16 uppercase tracking-tighter italic">"The best surf <br/>vibes in Da Nang"</h2>
          <div className="bg-epicWhite p-10 md:p-16 rounded-[50px] shadow-2xl border border-white relative">
            <p className="text-xl md:text-3xl font-medium italic mb-12 leading-tight tracking-tight">
              "Amazing experience! First time surfing and the instructor made it so easy and safe. Caught my first wave in 20 minutes! This school is pure fire."
            </p>
            <div className="font-black text-xl uppercase tracking-widest">— Sarah T., Australia</div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-epicDark text-epicWhite py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20 border-b border-white/10 pb-20">
          <div className="text-center md:text-left">
            <div className="text-4xl font-black tracking-tighter uppercase mb-8">EPIC <span className="text-epicRed italic">SURF</span></div>
            <p className="text-epicPink/50 text-lg leading-relaxed">My Khe Beach, Da Nang.<br/>Daily: 06:00 — 18:00</p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <h4 className="font-black text-xl uppercase tracking-widest text-white">Socials</h4>
            <div className="flex gap-8">
               <a href="#" className="hover:text-epicRed transition-all scale-125">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
               </a>
               <a href="#" className="hover:text-epicRed transition-all scale-125"><Phone size={28} /></a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center">
             <MapPin className="text-epicRed mb-6 h-12 w-12" />
             <button className="text-sm border-2 border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-epicDark font-bold uppercase tracking-widest transition-all">Open Maps</button>
          </div>
        </div>
        <div className="text-center mt-12 text-white/20 text-xs tracking-widest uppercase font-bold">
          © 2026 Epic Surf School. All rights reserved.
        </div>
      </footer>

      {/* 7. FLOAT WHATSAPP */}
      <a 
        href="https://wa.me/123456789" 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-8 right-8 bg-[#25D366] p-5 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform active:scale-90"
      >
        <MessageCircle size={36} color="white" />
      </a>

      {/* 8. MODAL */}
      <AnimatePresence>
        {bookingUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setBookingUrl(null)} 
              className="absolute inset-0 bg-epicDark/90 backdrop-blur-md cursor-pointer" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 40 }} 
              className="relative w-full max-w-5xl h-[85vh] bg-white rounded-[40px] overflow-hidden z-10 flex flex-col shadow-[0_0_100px_rgba(237,7,51,0.2)]"
            >
              <div className="flex justify-between items-center p-6 border-b border-epicPink bg-white">
                <span className="font-black uppercase tracking-widest text-sm text-epicDark">Epic <span className="text-epicRed">Booking</span></span>
                <button onClick={() => setBookingUrl(null)} className="p-3 bg-epicPink rounded-full text-epicDark hover:bg-epicRed hover:text-white transition-all"><X size={24} /></button>
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
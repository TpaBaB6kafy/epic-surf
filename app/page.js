"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Waves, MapPin, Award, Star, Phone, MessageCircle } from "lucide-react";

export default function EpicSurfLanding() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-epicWhite/80 backdrop-blur-md z-50 border-b border-epicPink">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black uppercase">
            EPIC <span className="text-epicRed">SURF</span>
          </div>
          <nav className="hidden md:flex gap-8 font-semibold text-sm">
            <a href="#lessons">Lessons</a>
            <a href="#rentals">Rentals</a>
          </nav>
          <button className="bg-epicRed text-white px-6 py-2 rounded-full font-bold">
            Book Now
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center bg-epicDark pt-20">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070')] bg-cover bg-center" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Catch Your <br />
            <span className="text-epicRed">Epic Wave</span>
          </h1>

          <p className="text-white mb-8">
            Серф-школа во Вьетнаме
          </p>

          <button className="bg-epicRed text-white px-8 py-4 rounded-full">
            Book a Lesson
          </button>
        </div>
      </section>

      {/* LESSONS CAROUSEL */}
      <section id="lessons" className="py-20 overflow-hidden">
        <h2 className="text-4xl text-center mb-10 font-black">
          Choose Your Ride
        </h2>

        <motion.div
          drag="x"
          dragConstraints={{ left: -900, right: 0 }}
          className="flex gap-6 px-6"
        >
          {[
            { title: "Group", price: "900k", badge: "Popular" },
            { title: "Split", price: "1200k", badge: "Best Value" },
            { title: "Private", price: "1800k", badge: "Premium" },
            { title: "Advanced", price: "Custom", badge: "Pro" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="min-w-[85%] bg-epicPink p-6 rounded-3xl"
            >
              <div className="text-red-500 mb-2">{item.badge}</div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <div className="text-xl font-black my-4">{item.price}</div>

              <button
                onClick={() => setShowForm(true)}
                className="bg-black text-white w-full py-3 rounded-xl"
              >
                Book
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RENTALS */}
      <section id="rentals" className="py-20 px-6">
        <div className="bg-epicPink p-8 rounded-3xl">
          <h3 className="text-3xl font-bold mb-4">Board Rentals</h3>
          <p className="mb-4">Большой выбор досок</p>
          <div className="text-xl font-black mb-4">
            2 часа — 250,000 VND
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-12 bg-epicDark">
        <div className="flex gap-4 overflow-x-auto px-4">
          {["/surf1.jpg","/surf2.jpg","/surf3.jpg","/surf4.jpg","/surf5.jpg","/surf6.jpg"].map((src, i) => (
            <img key={i} src={src} className="w-60 h-80 object-cover rounded-xl" />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10 text-center">
        EPIC SURF © 2026
      </footer>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/+79027613478"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full"
      >
        <MessageCircle />
      </a>

    </div>
  );
}
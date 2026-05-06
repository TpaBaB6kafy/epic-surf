"use client";

import { MapPin, Send } from "lucide-react";

export default function Footer({ t, links, InstagramIcon, FacebookIcon, YoutubeIcon, ThreadsIcon }) {
  return (
    <footer id="location" className="bg-epicDark text-white pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-20 text-center md:text-left">
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="text-4xl font-black uppercase tracking-normal mb-6">
                EPIC <span className="text-epicRed">SURF</span>
              </div>
              <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-sm mx-auto md:mx-0">{t.heroSub}</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all" aria-label="Epic Surf School Instagram">
                <InstagramIcon />
              </a>
              <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all" aria-label="Epic Surf School Facebook">
                <FacebookIcon />
              </a>
              <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all" aria-label="Epic Surf School YouTube">
                <YoutubeIcon />
              </a>
              <a href={links.threads} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all" aria-label="Epic Surf School Threads">
                <ThreadsIcon />
              </a>
              <a href={links.telegram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all" aria-label="Epic Surf School Telegram direct chat" title="Telegram direct chat">
                <Send size={20} />
              </a>
              <a href={links.telegramChannel} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-white/5 px-5 text-[11px] font-bold tracking-wide leading-snug text-white hover:bg-epicRed transition-all" aria-label="Epic Surf School official Telegram channel" title="Epic Surf School official Telegram channel">
                <Send size={16} /> TG Channel
              </a>
            </div>
            <div className="pt-8 border-t border-white/5 font-bold text-[11px] tracking-wide text-white/55 flex items-center justify-center md:justify-start gap-3 mb-2 leading-snug">
              <MapPin size={16} className="text-epicRed" /> {t.locationAddress}
            </div>
          </div>
          <div className="lg:col-span-7 h-[450px] rounded-[60px] overflow-hidden border border-white/10 shadow-2xl relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s"
              title="Epic Surf School Da Nang location map"
              className="w-full h-full border-none lg:grayscale lg:invert lg:contrast-125 lg:opacity-60 lg:hover:grayscale-0 lg:hover:invert-0 transition-all duration-1000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 text-[11px] font-bold tracking-wide text-white/25 text-center md:text-left">
          © 2026 Epic Surf School - Ride Every Day
        </div>
      </div>
    </footer>
  );
}

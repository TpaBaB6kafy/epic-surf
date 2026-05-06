"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Globe, Thermometer, Waves, Wind, X } from "lucide-react";

export default function Forecast({ t, lang }) {
  const [forecast, setForecast] = useState(null);
  const [mapActive, setMapActive] = useState(false);

  useEffect(() => {
    async function getForecast() {
      try {
        const marineRes = await fetch("https://marine-api.open-meteo.com/v1/marine?latitude=16.061&longitude=108.247&current=wave_height,wave_period");
        const weatherRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=16.061&longitude=108.247&current=wind_speed_10m,wind_direction_10m");
        const marine = await marineRes.json();
        const weather = await weatherRes.json();
        setForecast({
          height: marine.current.wave_height,
          period: marine.current.wave_period,
          windSpeed: weather.current.wind_speed_10m,
          windDir: weather.current.wind_direction_10m,
          water: 26
        });
      } catch (error) {
        console.error(error);
      }
    }

    getForecast();
  }, []);

  return (
    <>
      {/* 4. FORECAST (SWELL REPORT) — ВОЗВРАТ ГАБАРИТОВ + ФИКС КОНТЕНТА */}
      <section id="forecast" className="py-24 bg-epicWhite px-6 scroll-mt-24 border-t border-epicPink/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-epicDark rounded-[40px] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row min-h-[500px]">

            {/* ЛЕВАЯ ПАНЕЛЬ: ПОКАЗАТЕЛИ (Высота 100%, отступы как были) */}
            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 text-white">

              <div className="relative z-10 space-y-10">
                {/* 1. Главный показатель (Высота) — Крупно + Центровка */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]"></span>
                    <span className="text-[11px] font-bold tracking-wide opacity-35 leading-snug">{t.forecastTitle} {t.forecastTitleSpot}</span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-7xl lg:text-9xl font-black tracking-normal leading-[0.95]">{forecast?.height || "0.86"}</span>
                      <span className="text-3xl lg:text-5xl font-bold text-epicRed leading-[0.95]">m</span>
                    </div>
                    <div className="hidden md:block pl-6 border-l border-white/20">
                      <span className="text-sm font-bold tracking-wide opacity-35">{t.forecastWaveHeight}</span>
                    </div>
                  </div>

                  <div className="bg-epicRed text-white px-5 py-2 rounded-full font-bold text-[11px] lg:text-xs tracking-wide shadow-xl leading-snug">
                    {(forecast?.height || 0.8) < 1.2 ? t.forecastStatusGood : t.forecastStatusHigh}
                  </div>
                </div>

                {/* 2. Сетка параметров 2x2 — Крупно + Центровка */}
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 border-t border-white/10 pt-8">
                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[11px] lg:text-xs font-bold opacity-35 flex items-center gap-2 leading-snug"><Waves className="w-4 h-4" /> {t.forecastPeriod}</div>
                    <span className="font-black text-3xl lg:text-4xl">{forecast?.period || "4.95"}s</span>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[11px] lg:text-xs font-bold opacity-35 flex items-center gap-2 leading-snug"><Wind className="w-4 h-4" /> {t.forecastWind}</div>
                    <span className="font-black text-3xl lg:text-4xl">{Math.round(forecast?.windSpeed || 23)}<span className="text-xs lg:text-sm opacity-35 ml-1">km/h</span></span>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[11px] lg:text-xs font-bold opacity-35 flex items-center gap-2 leading-snug"><Globe className="w-4 h-4" /> {t.forecastDir}</div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-epicRed rounded-full flex items-center justify-center text-white" style={{ transform: `rotate(${forecast?.windDir || 225}deg)` }}><ArrowUp className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={4} /></div>
                      <span className="font-black text-2xl lg:text-3xl">SW</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <div className="text-[11px] lg:text-xs font-bold opacity-35 flex items-center gap-2 leading-snug"><Thermometer className="w-4 h-4" /> {t.forecastWater}</div>
                    <span className="font-black text-3xl lg:text-4xl">26°C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ПРАВАЯ ПАНЕЛЬ: КАРТА WINDY (Высота 400px как была) */}
            <div className="lg:w-3/5 h-[400px] lg:h-auto bg-white relative">
              <iframe
                src="https://embed.windy.com/embed2.html?lat=16.061&lon=108.247&zoom=11&overlay=waves&product=ecmwf&metricWind=km%2Fh"
                className={`w-full h-full border-none transition-opacity duration-500 ${mapActive ? 'opacity-100' : 'opacity-80'}`}
                title="Windy Forecast"
              ></iframe>

              {/* Защита от застревания пальца */}
              {!mapActive && (
                <div
                  onClick={() => setMapActive(true)}
                  className="absolute inset-0 z-20 bg-epicDark/20 backdrop-blur-[1px] flex items-center justify-center lg:hidden cursor-pointer"
                >
                  <div className="bg-white/95 text-epicDark px-6 py-3 rounded-2xl font-bold text-[11px] tracking-wide shadow-2xl flex items-center gap-2 leading-snug">
                    <Globe size={14} className="animate-spin" />
                    {lang === 'ru' ? 'Активировать карту' : 'Activate map'}
                  </div>
                </div>
              )}

              {/* Кнопка выхода */}
              {mapActive && (
                <button onClick={() => setMapActive(false)} className="absolute top-4 right-4 z-30 bg-epicRed text-white p-2 rounded-full lg:hidden shadow-xl"><X size={20} /></button>
              )}
            </div>

          </div>
        </div>
      </section>


    </>
  );
}

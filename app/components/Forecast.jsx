"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Globe, Thermometer, Waves, Wind, X } from "lucide-react";
import { trackEvent } from "../utils/tracking";

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
      <section id="forecast" className="bg-epicWhite px-4 py-16 scroll-mt-24 border-t border-epicDark/10 md:px-6 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex min-h-[500px] flex-col overflow-hidden rounded-[32px] border border-white/5 bg-epicDark shadow-2xl md:flex-row md:rounded-[40px]">

            {/* ЛЕВАЯ ПАНЕЛЬ: ПОКАЗАТЕЛИ (Высота 100%, отступы как были) */}
            <div data-forecast-panel className="relative flex flex-col justify-center overflow-hidden border-b border-white/10 p-5 text-white sm:p-6 md:w-[48%] md:border-b-0 md:border-r md:p-6 lg:w-2/5 lg:p-8 xl:p-12">

              <div className="relative z-10 space-y-7 md:space-y-8 lg:space-y-10">
                {/* 1. Главный показатель (Высота) — Крупно + Центровка */}
                <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left lg:gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-epicMint rounded-full animate-pulse shadow-[0_0_14px_rgba(170,255,199,0.9)]"></span>
                    <span className="text-[11px] font-bold tracking-wide text-epicWhite/55 leading-snug">{t.forecastTitle} {t.forecastTitleSpot}</span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-7xl lg:text-9xl font-black tracking-normal leading-[0.95]">{forecast?.height || "0.86"}</span>
                      <span className="text-3xl lg:text-5xl font-bold text-epicRed leading-[0.95]">m</span>
                    </div>
                    <div className="hidden md:block pl-6 border-l border-white/20">
                      <span className="text-sm font-bold tracking-wide text-epicWhite/55">{t.forecastWaveHeight}</span>
                    </div>
                  </div>

                  <div className="rounded-full border border-epicMint/20 bg-epicMint px-5 py-2.5 text-epicDark font-black text-[11px] lg:text-xs tracking-wide shadow-xl shadow-epicMint/10 leading-snug">
                    {(forecast?.height || 0.8) < 1.2 ? t.forecastStatusGood : t.forecastStatusHigh}
                  </div>
                </div>

                {/* 2. Сетка параметров 2x2 — Крупно + Центровка */}
                <div data-forecast-metrics className="grid grid-cols-2 gap-3 border-t border-white/10 pt-6 lg:gap-4 lg:pt-8">
                  <div data-forecast-metric className="flex min-h-[104px] items-center gap-2.5 rounded-[22px] border border-epicWhite/10 bg-epicWhite/5 px-3 py-3 xl:min-h-[116px] xl:gap-4 xl:rounded-[26px] xl:px-5 xl:py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-epicMint text-epicDark xl:h-14 xl:w-14">
                      <Waves className="h-5 w-5 xl:h-6 xl:w-6" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] lg:text-xs font-bold text-epicWhite/55 leading-snug">{t.forecastPeriod}</div>
                      <span className="mt-1 block whitespace-nowrap text-2xl font-black leading-none xl:text-4xl">{forecast?.period || "4.95"}s</span>
                    </div>
                  </div>

                  <div data-forecast-metric className="flex min-h-[104px] items-center gap-2.5 rounded-[22px] border border-epicWhite/10 bg-epicWhite/5 px-3 py-3 xl:min-h-[116px] xl:gap-4 xl:rounded-[26px] xl:px-5 xl:py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-epicMint text-epicDark xl:h-14 xl:w-14">
                      <Wind className="h-5 w-5 xl:h-6 xl:w-6" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] lg:text-xs font-bold text-epicWhite/55 leading-snug">{t.forecastWind}</div>
                      <span className="mt-1 block whitespace-nowrap text-2xl font-black leading-none xl:text-4xl">{Math.round(forecast?.windSpeed || 23)}<span className="ml-1 text-[10px] text-epicWhite/50 xl:text-sm">km/h</span></span>
                    </div>
                  </div>

                  <div data-forecast-metric className="flex min-h-[104px] items-center gap-2.5 rounded-[22px] border border-epicWhite/10 bg-epicWhite/5 px-3 py-3 xl:min-h-[116px] xl:gap-4 xl:rounded-[26px] xl:px-5 xl:py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-epicRed text-white xl:h-14 xl:w-14">
                      <Globe className="h-5 w-5 xl:h-6 xl:w-6" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] lg:text-xs font-bold text-epicWhite/55 leading-snug">{t.forecastDir}</div>
                      <div className="mt-1 flex items-center gap-2 xl:gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-epicWhite/10 text-epicRed xl:h-9 xl:w-9" style={{ transform: `rotate(${forecast?.windDir || 225}deg)` }}><ArrowUp className="h-4 w-4 xl:h-5 xl:w-5" strokeWidth={4} /></div>
                        <span className="text-xl font-black leading-none sm:text-2xl xl:text-3xl">SW</span>
                      </div>
                    </div>
                  </div>

                  <div data-forecast-metric className="flex min-h-[104px] items-center gap-2.5 rounded-[22px] border border-epicWhite/10 bg-epicWhite/5 px-3 py-3 xl:min-h-[116px] xl:gap-4 xl:rounded-[26px] xl:px-5 xl:py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-epicMint text-epicDark xl:h-14 xl:w-14">
                      <Thermometer className="h-5 w-5 xl:h-6 xl:w-6" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] lg:text-xs font-bold text-epicWhite/55 leading-snug">{t.forecastWater}</div>
                      <span className="mt-1 block whitespace-nowrap text-2xl font-black leading-none xl:text-4xl">26°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ПРАВАЯ ПАНЕЛЬ: КАРТА WINDY (Высота 400px как была) */}
            <div data-forecast-windy className="relative h-[400px] bg-white md:h-auto md:w-[52%] lg:w-3/5">
              <iframe
                src="https://embed.windy.com/embed2.html?lat=16.061&lon=108.247&zoom=11&overlay=waves&product=ecmwf&metricWind=km%2Fh"
                className={`w-full h-full border-none transition-opacity duration-500 ${mapActive ? 'opacity-100' : 'opacity-80'}`}
                title="Windy Forecast"
              ></iframe>

              {/* Защита от застревания пальца */}
              {!mapActive && (
                <div
                  onClick={() => {
                    trackEvent("map_activate", {
                      language: lang,
                      cta_location: "forecast_section",
                      cta_label: "activate_map",
                    });
                    setMapActive(true);
                  }}
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

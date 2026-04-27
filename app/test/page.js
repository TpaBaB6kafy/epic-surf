"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Globe, Star, Phone, Wind, Thermometer, ArrowUp } from "lucide-react";

export default function SwellHybridPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Координаты пляжа Микхе
  const LAT = 16.061;
  const LON = 108.247;

  useEffect(() => {
    async function getForecast() {
      try {
        // Запрос сразу к двум API: Морской (волны) и Обычный (ветер/вода)
        const marineRes = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}&current=wave_height,wave_period,wave_direction`);
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=wind_speed_10m,wind_direction_10m,temperature_2m`);
        
        const marine = await marineRes.json();
        const weather = await weatherRes.json();

        setData({
          waveHeight: marine.current.wave_height,
          period: marine.current.wave_period,
          windSpeed: weather.current.wind_speed_10m,
          windDir: weather.current.wind_direction_10m,
          waterTemp: 26, // Температура воды в Дананге стабильна, API часто её не дает точно, оставим среднюю
        });
        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch surf data", e);
      }
    }
    getForecast();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#FE746A] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* ЗАГОЛОВОК */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-black uppercase text-[#2E2E2E] tracking-tighter">
            Epic <span className="text-[#FE746A] italic">Swell Report</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Live data from My Khe Beach Spot</p>
        </div>

        {/* ГИБРИДНЫЙ КОНТЕЙНЕР */}
        <div className="bg-[#2E2E2E] rounded-[40px] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row min-h-[600px]">
          
          {/* ЛЕВАЯ ПАНЕЛЬ: ТВОИ ЦИФРЫ (40% ширины) */}
          <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
            {/* Декор волны */}
            <Waves size={300} className="absolute -right-20 -top-20 text-white/5 pointer-events-none" />

            <div className="relative z-10 space-y-12">
              {/* Статус */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_15px_#00FF41]"></span>
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Live Now</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-8xl font-black text-white tracking-tighter">{data.waveHeight}</span>
                  <span className="text-3xl font-bold text-[#FE746A] italic">m</span>
                </div>
                <div className="inline-block bg-[#FE746A] text-[#2E2E2E] px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest">
                  {data.waveHeight < 1.2 ? 'Perfect for Beginners' : 'Advanced Only'}
                </div>
              </div>

              {/* Сетка параметров */}
              <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    <Waves size={14} /> Period
                  </div>
                  <p className="text-3xl font-black text-white">{data.period}<span className="text-sm ml-1 opacity-30 italic">s</span></p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    <Wind size={14} /> Wind
                  </div>
                  <p className="text-3xl font-black text-white">{Math.round(data.windSpeed)}<span className="text-sm ml-1 opacity-30 italic">km/h</span></p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    <Globe size={14} /> Direction
                  </div>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-8 h-8 flex items-center justify-center bg-[#FE746A] rounded-full text-[#2E2E2E] shadow-lg shadow-[#FE746A]/20"
                      style={{ transform: `rotate(${data.windDir}deg)` }}
                    >
                      <ArrowUp size={18} strokeWidth={3} />
                    </div>
                    <span className="text-2xl font-black text-white uppercase">SW</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    <Thermometer size={14} /> Water
                  </div>
                  <p className="text-3xl font-black text-white">{data.waterTemp}<span className="text-sm ml-1 opacity-30 italic">°C</span></p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-12 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
              © Epic Data Engine • Updated 1m ago
            </div>
          </div>

          {/* ПРАВАЯ ПАНЕЛЬ: WINDY (60% ширины) */}
          <div className="lg:w-3/5 h-[400px] lg:h-auto bg-black relative">
            <iframe 
              src={`https://embed.windy.com/embed2.html?lat=${LAT}&lon=${LON}&detailLat=${LAT}&detailLon=${LON}&width=650&height=450&zoom=11&level=surface&overlay=waves&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
              className="w-full h-full border-none opacity-80 contrast-125 grayscale-[0.5] hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              title="Windy Forecast"
            ></iframe>
            
            {/* Оверлей-градиент, чтобы карта плавно уходила в темный фон на стыке */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#2E2E2E] to-transparent hidden lg:block pointer-events-none"></div>
          </div>

        </div>

      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ExternalLink, Globe, Heart, MessageCircle, Radio, Thermometer, Waves, Wind, X } from "lucide-react";
import { liveCam } from "../../../data/liveCam";
import { links } from "../../../data/links";
import { buildWhatsAppUrl, trackEvent } from "../../../utils/tracking";
import { WaveStripe } from "../PosterPrimitives";

const liveCamCopy = {
  en: {
    eyebrow: "Da Nang Surf Cam",
    title: "My Khe Beach Live Cam",
    mobileTitle: "My Khe Live Cam",
    titleLines: ["My Khe Beach", "Live Cam"],
    mobileTitleLines: ["My Khe Live Cam"],
    subtext: "Check My Khe before you book a lesson or rent a board.",
    detail: "The full stream is operated by Da Nang Surf Cam. Open it for the full beach view, or message Epic if you're not sure today fits your level.",
    iframeTitle: "My Khe Beach live camera preview",
    poweredBy: "Powered by Da Nang Surf Cam",
    attribution: "A free, community-supported live cam streaming My Khe Beach, Da Nang daily from 4AM to 4PM ICT.",
    fullStream: "Open full cam",
    support: "Support the cam",
    askEpic: "Ask Epic about today's conditions",
    mobileAskEpic: "Ask Epic about conditions",
    whatsappMessage: "Hi! I checked the My Khe live cam. Are the conditions good for my level today?",
  },
  ru: {
    eyebrow: "Da Nang Surf Cam",
    title: "Р›Р°Р№РІ-РєР°РјРµСЂР° РњРё РљС…Рµ",
    mobileTitle: "Р›Р°Р№РІ-РєР°РјРµСЂР° РњРё РљС…Рµ",
    titleLines: ["Р›Р°Р№РІ-РєР°РјРµСЂР°", "РњРё РљС…Рµ"],
    mobileTitleLines: ["Р›Р°Р№РІ-РєР°РјРµСЂР°", "РњРё РљС…Рµ"],
    subtext: "РџСЂРѕРІРµСЂСЊС‚Рµ РњРё РљС…Рµ РїРµСЂРµРґ СѓСЂРѕРєРѕРј РёР»Рё Р°СЂРµРЅРґРѕР№ РґРѕСЃРєРё.",
    detail: "РџРѕР»РЅС‹Р№ СЃС‚СЂРёРј РІРµРґС‘С‚ Da Nang Surf Cam. РћС‚РєСЂРѕР№С‚Рµ РєР°РјРµСЂСѓ РґР»СЏ РѕР±Р·РѕСЂР° РїР»СЏР¶Р° РёР»Рё РЅР°РїРёС€РёС‚Рµ Epic, РµСЃР»Рё РЅРµ СѓРІРµСЂРµРЅС‹, РїРѕРґС…РѕРґСЏС‚ Р»Рё СѓСЃР»РѕРІРёСЏ РІР°С€РµРјСѓ СѓСЂРѕРІРЅСЋ.",
    iframeTitle: "РџСЂРµРІСЊСЋ Р»Р°Р№РІ-РєР°РјРµСЂС‹ РїР»СЏР¶Р° РњРё РљС…Рµ",
    poweredBy: "Powered by Da Nang Surf Cam",
    attribution: "Р‘РµСЃРїР»Р°С‚РЅР°СЏ community-РєР°РјРµСЂР° СЃ РїР»СЏР¶Р° РњРё РљС…Рµ РІ Р”Р°РЅР°РЅРіРµ. Р Р°Р±РѕС‚Р°РµС‚ РµР¶РµРґРЅРµРІРЅРѕ СЃ 4:00 РґРѕ 16:00 ICT.",
    fullStream: "РћС‚РєСЂС‹С‚СЊ РєР°РјРµСЂСѓ",
    support: "РџРѕРґРґРµСЂР¶Р°С‚СЊ РєР°РјРµСЂСѓ",
    askEpic: "РЎРїСЂРѕСЃРёС‚СЊ Epic РїСЂРѕ СѓСЃР»РѕРІРёСЏ",
    mobileAskEpic: "РЎРїСЂРѕСЃРёС‚СЊ РїСЂРѕ СѓСЃР»РѕРІРёСЏ",
    whatsappMessage: "РџСЂРёРІРµС‚! РЇ РїРѕСЃРјРѕС‚СЂРµР» Р»Р°Р№РІ-РєР°РјРµСЂСѓ РњРё РљС…Рµ. РџРѕРґС…РѕРґСЏС‚ Р»Рё СЃРµРіРѕРґРЅСЏ СѓСЃР»РѕРІРёСЏ РґР»СЏ РјРѕРµРіРѕ СѓСЂРѕРІРЅСЏ?",
  },
};

export function HomeV2LiveCam({ locale = "en" }) {
  const language = locale === "ru" ? "ru" : "en";
  const copy = liveCamCopy[language];

  const trackOutbound = (target) => {
    trackEvent("live_cam_outbound_click", {
      language,
      provider: "danangsurfcam",
      location: "homepage_live_cam",
      target,
    });
  };

  const handleWhatsAppClick = (event) => {
    event.currentTarget.href = buildWhatsAppUrl(links.whatsapp, copy.whatsappMessage, {
      language,
    });
    trackEvent("live_cam_cta_click", {
      language,
      location: "homepage_live_cam",
      target: "whatsapp_conditions",
    });
    trackEvent("whatsapp_click", {
      language,
      service_type: "conditions_check",
      cta_location: "homepage_live_cam",
      cta_label: "whatsapp_conditions",
    });
  };

  return (
    <section id="live-cam" data-home-v2-live-cam className="relative isolate overflow-hidden bg-epicDark px-4 py-14 text-epicWhite scroll-mt-24 md:px-6 md:py-20">
      <WaveStripe className="absolute -right-28 top-16 h-28 w-[560px] rotate-[-8deg] text-epicMint opacity-75" />
      <div className="relative mx-auto grid max-w-[1448px] gap-8 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:items-center">
        <div className="relative z-10">
          <div data-live-cam-source-badge className="inline-flex -rotate-2 items-center gap-2 bg-epicMint px-4 py-2 text-[11px] font-black uppercase leading-none text-epicDark shadow-[5px_5px_0_#FE746A]">
            <Radio size={15} className="text-epicRed" />
            {copy.eyebrow}
          </div>
          <h2 aria-label={copy.mobileTitle} className="mt-6 max-w-3xl text-[44px] font-black uppercase leading-[0.88] tracking-normal sm:hidden">
            {copy.mobileTitleLines.map((line) => (
              <span key={line} data-live-cam-title-line className="block">{line}</span>
            ))}
          </h2>
          <h2 aria-label={copy.title} className="mt-6 hidden max-w-3xl text-[56px] font-black uppercase leading-[0.88] tracking-normal sm:block md:text-[82px] lg:text-[92px]">
            {copy.titleLines.map((line) => (
              <span key={line} data-live-cam-title-line className="block">{line}</span>
            ))}
          </h2>
          <p className="mt-6 max-w-xl text-lg font-black leading-8 text-epicWhite/82">{copy.subtext}</p>
          <p className="mt-4 max-w-xl text-sm font-bold leading-6 text-epicWhite/58 md:text-base md:leading-7">{copy.detail}</p>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="mt-7 inline-flex min-h-14 w-full max-w-[360px] items-center justify-center gap-3 bg-epicRed px-6 text-center text-sm font-black uppercase leading-tight text-epicDark transition hover:brightness-105 active:scale-95"
          >
            <span className="sm:hidden">{copy.mobileAskEpic}</span>
            <span className="hidden sm:inline">{copy.askEpic}</span>
            <MessageCircle size={18} />
          </a>
        </div>

        <div className="relative z-10 overflow-hidden bg-epicWhite p-4 text-epicDark shadow-[14px_14px_0_#AAFFC7] lg:-mr-8 lg:p-5">
          <div data-live-cam-preview className="relative aspect-video overflow-hidden bg-epicDark">
            <iframe
              src={liveCam.previewUrl}
              width="100%"
              height="100%"
              loading="lazy"
              className="block h-full w-full border-0 grayscale"
              allow="autoplay; encrypted-media"
              title={copy.iframeTitle}
              onLoad={() => trackEvent("live_cam_preview_load", {
                language,
                provider: "danangsurfcam",
                location: "homepage_live_cam",
              })}
            />
            <div className="pointer-events-none absolute left-0 top-0 bg-epicRed px-4 py-2 text-[11px] font-black uppercase text-epicDark">
              Live beach check
            </div>
          </div>

          <div data-live-cam-attribution-footer className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
            <div data-live-cam-provider-identity className="flex min-w-0 items-center gap-3">
              {/* The provider requires its remote logo; using img avoids changing Next image configuration. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={liveCam.logoUrl} alt={liveCam.cameraName} className="h-12 w-12 shrink-0 bg-epicWhite object-contain p-1.5 ring-2 ring-epicDark" />
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-epicDark">{copy.poweredBy}</p>
                <p className="mt-1 text-[11px] font-bold leading-5 text-epicGray">{copy.attribution}</p>
              </div>
            </div>
            <div data-live-cam-provider-links className="grid gap-2">
              <a data-live-cam-provider-action="primary" href={liveCam.fullStreamUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("full_stream")} className="inline-flex min-h-11 items-center justify-center gap-2 bg-epicMint px-4 text-[11px] font-black uppercase text-epicDark transition hover:brightness-105 active:scale-95">
                {copy.fullStream}
                <ExternalLink size={14} />
              </a>
              <a data-live-cam-provider-action="secondary" href={liveCam.donateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("donate")} className="inline-flex min-h-11 items-center justify-center gap-2 bg-epicDark px-4 text-[11px] font-black uppercase text-epicWhite transition hover:bg-epicGray active:scale-95">
                {copy.support}
                <Heart size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeV2Forecast({ t, lang }) {
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
          water: 26,
        });
      } catch (error) {
        console.error(error);
      }
    }

    getForecast();
  }, []);

  const stats = [
    { label: t.forecastPeriod, value: `${forecast?.period || "4.95"}s`, icon: Waves, tone: "mint" },
    { label: t.forecastWind, value: `${Math.round(forecast?.windSpeed || 23)} km/h`, icon: Wind, tone: "mint" },
    { label: t.forecastDir, value: "SW", icon: Globe, tone: "red", rotate: forecast?.windDir || 225 },
    { label: t.forecastWater, value: "26C", icon: Thermometer, tone: "mint" },
  ];

  return (
    <section id="forecast" data-home-v2-forecast className="relative isolate overflow-hidden bg-epicDark px-4 py-14 text-epicWhite scroll-mt-24 md:px-6 md:py-20">
      <div className="absolute -left-24 top-16 h-24 w-[48%] rotate-[-4deg] bg-epicMint" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1448px] gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-stretch">
        <div className="relative z-10 bg-epicWhite p-6 text-epicDark shadow-[12px_12px_0_#FE746A] md:p-8">
          <p className="text-[11px] font-black uppercase text-epicRed">{t.forecastTitle} {t.forecastTitleSpot}</p>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-[92px] font-black leading-[0.85] tracking-normal md:text-[132px]">{forecast?.height || "0.86"}</span>
            <span className="pb-2 text-5xl font-black leading-none text-epicRed">m</span>
          </div>
          <p className="mt-3 text-sm font-black uppercase text-epicGray">{t.forecastWaveHeight}</p>
          <div className="mt-6 inline-flex bg-epicMint px-5 py-3 text-[11px] font-black uppercase text-epicDark">
            {(forecast?.height || 0.8) < 1.2 ? t.forecastStatusGood : t.forecastStatusHigh}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="relative min-h-[116px] bg-epicDark p-4 text-epicWhite">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center ${stat.tone === "red" ? "bg-epicRed text-epicDark" : "bg-epicMint text-epicDark"}`}>
                    {stat.rotate ? (
                      <ArrowUp className="h-5 w-5" strokeWidth={4} style={{ transform: `rotate(${stat.rotate}deg)` }} />
                    ) : (
                      <Icon className="h-5 w-5" strokeWidth={2.5} />
                    )}
                  </div>
                  <p className="text-[11px] font-black uppercase text-epicWhite/58">{stat.label}</p>
                  <p className="mt-1 text-3xl font-black leading-none">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden bg-epicWhite p-4 shadow-[12px_12px_0_#AAFFC7] lg:min-h-0">
          <iframe
            src="https://embed.windy.com/embed2.html?lat=16.061&lon=108.247&zoom=11&overlay=waves&product=ecmwf&metricWind=km%2Fh"
            className={`h-full min-h-[390px] w-full border-0 grayscale transition-opacity duration-500 ${mapActive ? "opacity-100" : "opacity-80"}`}
            title="Windy Forecast"
          />
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
              className="absolute inset-4 z-20 flex cursor-pointer items-center justify-center bg-epicDark/35 backdrop-blur-[1px] lg:hidden"
            >
              <div className="flex items-center gap-2 bg-epicMint px-6 py-3 text-[11px] font-black uppercase leading-snug text-epicDark shadow-[6px_6px_0_#FE746A]">
                <Globe size={14} className="animate-spin" />
                {lang === "ru" ? "РђРєС‚РёРІРёСЂРѕРІР°С‚СЊ РєР°СЂС‚Сѓ" : "Activate map"}
              </div>
            </div>
          )}
          {mapActive && (
            <button onClick={() => setMapActive(false)} className="absolute right-6 top-6 z-30 bg-epicRed p-2 text-epicDark lg:hidden">
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

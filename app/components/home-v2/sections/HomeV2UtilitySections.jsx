"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ExternalLink, Globe, Heart, MessageCircle, Thermometer, Waves, Wind, X } from "lucide-react";
import { liveCam } from "../../../data/liveCam";
import { links } from "../../../data/links";
import { buildWhatsAppUrl, trackEvent } from "../../../utils/tracking";

const liveCamCopy = {
  en: {
    eyebrow: "Live conditions",
    title: "My Khe Beach Live Cam",
    mobileTitle: "My Khe Live Cam",
    titleLines: ["My Khe Beach", "Live Cam"],
    mobileTitleLines: ["My Khe Live Cam"],
    subtext: "Check the beach before you book.",
    detail: "Partner stream.",
    helperNote: "Local intel makes all the difference.",
    iframeTitle: "My Khe Beach live camera preview",
    poweredBy: "Live preview by Da Nang Surf Cam",
    attribution: "A free, community-supported live cam streaming My Khe Beach, Da Nang daily from 4AM to 4PM ICT.",
    fullStream: "Open full stream",
    support: "Support the cam",
    askEpic: "Ask Epic about conditions",
    mobileAskEpic: "Ask about conditions",
    whatsappMessage: "Hi! I checked the My Khe live cam. Are the conditions good for my level today?",
  },
  ru: {
    eyebrow: "Условия сейчас",
    title: "Лайв-камера Ми Кхе",
    mobileTitle: "Лайв-камера Ми Кхе",
    titleLines: ["Лайв-камера", "Ми Кхе"],
    mobileTitleLines: ["Лайв-камера", "Ми Кхе"],
    subtext: "Проверьте Ми Кхе перед уроком или арендой доски.",
    detail: "Полный стрим ведёт Da Nang Surf Cam. Откройте камеру для обзора пляжа или напишите Epic, если не уверены, подходят ли условия вашему уровню.",
    helperNote: "Местная информация помогает выбрать подходящее время.",
    iframeTitle: "Превью лайв-камеры пляжа Ми Кхе",
    poweredBy: "Трансляция от Da Nang Surf Cam",
    attribution: "Бесплатная общественная камера с пляжа Ми Кхе в Дананге. Работает ежедневно с 4:00 до 16:00 ICT.",
    fullStream: "Открыть камеру",
    support: "Поддержать камеру",
    askEpic: "Спросить Epic про условия",
    mobileAskEpic: "Спросить про условия",
    whatsappMessage: "Привет! Я посмотрел лайв-камеру Ми Кхе. Подходят ли сегодня условия для моего уровня?",
  },
  legacyRuMojibake: {
    eyebrow: "Live conditions",
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

function useDesktopSlot() {
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);

    updateViewport();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateViewport);
    } else {
      mediaQuery.addListener(updateViewport);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateViewport);
      } else {
        mediaQuery.removeListener(updateViewport);
      }
    };
  }, []);

  return isDesktop;
}

function LiveCamIframe({ copy, language }) {
  return (
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
  );
}

function WindyIframe({ mapActive }) {
  return (
    <iframe
      src="https://embed.windy.com/embed2.html?lat=16.061&lon=108.247&zoom=11&overlay=waves&product=ecmwf&metricWind=km%2Fh"
      loading="lazy"
      className={`h-full w-full border-0 transition-opacity duration-500 ${mapActive ? "opacity-100" : "opacity-90 md:opacity-100"}`}
      title="Windy Forecast"
    />
  );
}

export function HomeV2LiveCam({ locale = "en" }) {
  const language = locale === "ru" ? "ru" : "en";
  const copy = liveCamCopy[language];
  const isDesktop = useDesktopSlot();
  const liveCamIframe = <LiveCamIframe copy={copy} language={language} />;

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
    <section id="live-cam" data-home-v2-live-cam data-surf-stack-scene="livecam" className="relative isolate overflow-visible bg-transparent px-4 py-6 text-epicWhite scroll-mt-24 md:px-6 md:py-0">
      <div data-livecam-visual-composition className="relative mx-auto hidden w-full max-w-7xl overflow-hidden md:block">
      <div data-live-cam-artboard className="relative mx-auto min-h-[690px] w-full overflow-hidden px-6 pb-10 pt-4 lg:min-h-[760px] lg:px-10 lg:pb-14">
        <h2 aria-label={copy.title} className="relative z-20 grid grid-cols-[minmax(300px,0.4fr)_minmax(0,0.6fr)] items-start gap-12 pt-16 text-[clamp(38px,4.2vw,64px)] font-black uppercase leading-none tracking-normal text-epicDark lg:gap-28 lg:pt-20">
          <span data-live-cam-title-line className="inline-flex w-fit whitespace-nowrap bg-epicWhite px-5 py-3 shadow-[7px_7px_0_rgba(246,246,246,0.2)]">LIVE <span className="ml-3 text-epicRed">CAM</span></span>
          <span data-live-cam-title-line className="inline-flex w-fit max-w-full whitespace-nowrap bg-epicWhite px-5 py-3 text-[clamp(36px,4vw,61px)] shadow-[7px_7px_0_rgba(246,246,246,0.2)]">MY KHE BEACH</span>
        </h2>

        <div className="relative z-20 mt-24 grid grid-cols-[minmax(0,0.74fr)_minmax(230px,0.26fr)] items-start gap-8 lg:mt-28 lg:gap-16">
        <div className="relative bg-epicWhite p-4 shadow-none lg:ml-[4%]">
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 z-40 h-[96px] w-[58px] -translate-x-1/2 -translate-y-[58%] rotate-[-1deg] bg-epicRed shadow-[0_14px_16px_rgba(0,0,0,0.18)] lg:h-[112px] lg:w-[68px]" />
        <div data-live-cam-preview className="relative aspect-video w-full overflow-hidden bg-epicDark">
          {isDesktop === true ? liveCamIframe : null}
          <div className="pointer-events-none absolute left-[3%] top-[5%] z-30 bg-epicMint px-3 py-2 text-[clamp(8px,0.9vw,12px)] font-black uppercase leading-none text-epicDark">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-epicDark align-middle" />
            Live
          </div>
          <div className="pointer-events-none absolute right-[3%] top-[5%] z-30 hidden text-right text-[clamp(8px,0.9vw,12px)] font-black uppercase leading-5 tracking-normal text-epicWhite sm:block">
            My Khe Beach, Da Nang
          </div>
        </div>

        <div data-live-cam-attribution-footer className="flex items-center justify-between gap-3 bg-epicWhite px-3 pb-1 pt-3 text-epicDark lg:px-5 lg:pt-4">
          <div data-live-cam-provider-identity className="flex min-w-0 items-center gap-3">
            {/* The provider requires its remote logo; using img avoids changing Next image configuration. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={liveCam.logoUrl} alt={liveCam.cameraName} className="h-8 w-8 shrink-0 bg-epicWhite object-contain p-1 ring-2 ring-epicDark md:h-11 md:w-11" />
            <div className="min-w-0">
              <p className="text-[clamp(8px,1.05vw,14px)] font-black leading-tight text-epicDark">{copy.poweredBy}</p>
              <p className="mt-1 hidden text-[clamp(7px,0.78vw,11px)] font-bold leading-4 text-epicGray lg:block">{copy.attribution}</p>
            </div>
          </div>
          <div data-live-cam-provider-links className="hidden gap-2 sm:flex">
            <a data-live-cam-provider-action="primary" href={liveCam.fullStreamUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("full_stream")} className="inline-flex min-h-9 items-center justify-center gap-2 border-2 border-epicDark bg-epicWhite px-3 text-[clamp(7px,0.82vw,11px)] font-black uppercase text-epicDark transition hover:bg-epicMint active:scale-95">
              {copy.fullStream}
              <ExternalLink size={14} />
            </a>
            <a data-live-cam-provider-action="secondary" href={liveCam.donateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("donate")} className="inline-flex min-h-9 items-center justify-center gap-2 border-2 border-epicDark bg-epicDark px-3 text-[clamp(7px,0.82vw,11px)] font-black uppercase text-epicWhite transition hover:bg-epicGray active:scale-95">
              {copy.support}
              <Heart size={14} />
            </a>
          </div>
        </div>
        </div>

        <div data-live-cam-primary-actions className="relative z-30 flex min-h-[520px] flex-col items-start pt-28 text-epicWhite">
          <p className="max-w-[260px] text-[clamp(20px,1.75vw,27px)] font-black leading-[1.04] text-epicWhite">{copy.subtext}</p>
          <p className="mt-7 max-w-[240px] text-[clamp(13px,1.05vw,16px)] font-black leading-snug text-epicWhite">{copy.detail}</p>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="relative mt-24 flex aspect-[275/191] w-full max-w-[220px] rotate-[-5deg] items-center justify-center bg-epicWhite px-10 pt-5 text-center text-[clamp(17px,1.4vw,24px)] font-black uppercase leading-[1.55] text-epicDark shadow-[8px_8px_0_rgba(246,246,246,0.18)] transition active:scale-95 lg:ml-2 lg:max-w-[250px]"
          >
            <span className="relative z-10 max-w-[11ch]">{copy.askEpic}</span>
            <span data-live-cam-chat-icon className="absolute -top-8 left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-epicRed text-epicWhite">
              <MessageCircle className="h-8 w-8" />
            </span>
          </a>
        </div>
        </div>

        <div className="hidden">
          <a href={liveCam.fullStreamUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("full_stream")} className="inline-flex min-h-12 w-full items-center justify-between bg-epicRed px-5 text-sm font-black uppercase leading-tight text-epicDark shadow-[6px_6px_0_#2E2E2E] transition active:scale-95">
            {copy.fullStream}
            <ArrowUp className="h-5 w-5 rotate-90" strokeWidth={3} />
          </a>
        </div>
      </div>
      </div>
      <div data-live-cam-mobile-layout className="relative z-30 mx-auto max-w-md md:hidden">
        <h2 className="text-[40px] font-black uppercase leading-[0.92] text-epicWhite">
          LIVE <span className="text-epicRed">CAM</span><br />MY KHE BEACH
        </h2>
        <div className="relative mt-6 bg-epicWhite p-2 shadow-[8px_8px_0_#AAFFC7]">
          <div data-live-cam-mobile-preview className="aspect-video overflow-hidden bg-epicDark">
            {isDesktop === false ? liveCamIframe : null}
          </div>
          <div className="flex items-center gap-3 px-2 py-3 text-epicDark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={liveCam.logoUrl} alt="" className="h-9 w-9 shrink-0 object-contain" />
            <p className="text-xs font-black leading-tight">{copy.poweredBy}</p>
          </div>
        </div>
        <div data-live-cam-mobile-note className="relative mt-8 bg-epicWhite px-6 pb-6 pt-9 text-epicDark shadow-[7px_7px_0_#585858]">
          <span className="absolute -top-5 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-epicRed text-epicWhite">
            <MessageCircle className="h-5 w-5" />
          </span>
          <p className="text-base font-black leading-6">{copy.subtext}</p>
          <p className="mt-2 text-sm font-bold text-epicGray">{copy.detail}</p>
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="mt-5 inline-flex min-h-12 w-full items-center justify-center bg-epicRed px-5 text-center text-sm font-black uppercase text-epicDark active:scale-95">
            {copy.mobileAskEpic}
          </a>
        </div>
        <a href={liveCam.fullStreamUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("full_stream")} className="mt-5 inline-flex min-h-12 w-full items-center justify-between bg-epicMint px-5 text-sm font-black uppercase text-epicDark shadow-[6px_6px_0_#585858] active:scale-95">
          {copy.fullStream}
          <ArrowUp className="h-5 w-5 rotate-90" strokeWidth={3} />
        </a>
      </div>
    </section>
  );
}

export function HomeV2Forecast({ t, lang }) {
  const [forecast, setForecast] = useState(null);
  const [mapActive, setMapActive] = useState(false);
  const isDesktop = useDesktopSlot();
  const windyIframe = <WindyIframe mapActive={mapActive} />;

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
    <section id="forecast" data-home-v2-forecast data-surf-stack-scene="forecast" className="relative isolate overflow-visible bg-transparent px-4 pb-16 pt-12 text-epicWhite scroll-mt-24 md:px-6 md:py-0">
      <div data-forecast-visual-composition className="relative mx-auto hidden w-full max-w-7xl overflow-hidden md:block">
      <div data-forecast-artboard className="relative mx-auto w-full overflow-hidden px-0 pb-8 pt-4 lg:pb-12">
        <h2 data-forecast-heading className="relative z-20 mx-auto w-fit bg-epicWhite px-9 py-3 text-[clamp(48px,5.8vw,82px)] font-black uppercase leading-none tracking-normal text-epicDark">
          FORECAST
        </h2>

        <div className="relative z-20 mt-5 grid min-h-[560px] grid-cols-[minmax(0,0.37fr)_minmax(0,0.63fr)] items-stretch gap-3">
        <div data-forecast-stats-panel className="flex min-h-0 flex-col bg-epicDark p-10 text-epicWhite ring-1 ring-epicGray lg:p-12">
          <p className="flex items-center gap-4 text-[clamp(10px,1vw,14px)] font-black text-epicWhite/64">
            <span aria-hidden="true" className="h-8 w-8 shrink-0 rounded-full bg-epicMint shadow-[0_0_14px_rgba(170,255,199,0.7)]" />
            {t.forecastTitle} {t.forecastTitleSpot}
          </p>
          <div className="mt-8 flex items-end gap-3">
            <span className="text-[clamp(78px,9.4vw,132px)] font-black leading-[0.82] tracking-normal">{forecast?.height || "0.86"}</span>
            <span className="pb-1 text-[clamp(24px,3.8vw,48px)] font-black leading-none text-epicRed">m</span>
          </div>
          <div className="mt-7 inline-flex w-fit rotate-[-4deg] bg-epicMint px-5 py-3 text-[clamp(9px,0.9vw,12px)] font-black text-epicDark">
            {(forecast?.height || 0.8) < 1.2 ? t.forecastStatusGood : t.forecastStatusHigh}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-4 pt-10">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="relative flex min-h-[116px] items-center gap-4 bg-epicGray/35 p-4 text-epicWhite ring-1 ring-epicGray lg:p-5">
                  <div className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.tone === "red" ? "bg-epicRed text-epicWhite" : "bg-epicMint text-epicDark"}`}>
                    {stat.rotate ? (
                      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" strokeWidth={4} style={{ transform: `rotate(${stat.rotate}deg)` }} />
                    ) : (
                      <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[clamp(8px,0.75vw,11px)] font-black text-epicWhite/58">{stat.label}</p>
                    <p className="mt-2 whitespace-nowrap text-[clamp(19px,2vw,29px)] font-black leading-none">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div data-forecast-map className="relative min-h-full overflow-hidden bg-epicWhite ring-1 ring-epicWhite">
          {isDesktop === true ? windyIframe : null}
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
      </div>
      </div>
      <div data-forecast-mobile-layout className="relative z-20 mx-auto max-w-md md:hidden">
        <h2 className="inline bg-epicWhite px-3 text-[40px] font-black uppercase leading-none text-epicDark shadow-[6px_6px_0_#585858]">FORECAST</h2>
        <div className="mt-7 bg-epicDark p-5 ring-2 ring-epicWhite">
          <p className="text-[10px] font-black uppercase text-epicWhite/64">{t.forecastTitle}</p>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-7xl font-black leading-[0.85]">{forecast?.height || "0.86"}</span>
            <span className="text-3xl font-black text-epicRed">m</span>
          </div>
          <div className="mt-5 inline-flex bg-epicMint px-4 py-2 text-[10px] font-black uppercase text-epicDark">
            {(forecast?.height || 0.8) < 1.2 ? t.forecastStatusGood : t.forecastStatusHigh}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={`mobile-${stat.label}`} className="bg-epicGray/35 p-4 ring-1 ring-epicGray">
                  <div className={`flex h-10 w-10 items-center justify-center ${stat.tone === "red" ? "bg-epicRed" : "bg-epicMint"} text-epicDark`}>
                    {stat.rotate ? <ArrowUp className="h-5 w-5" strokeWidth={4} style={{ transform: `rotate(${stat.rotate}deg)` }} /> : <Icon className="h-5 w-5" />}
                  </div>
                  <p className="mt-3 text-[10px] font-black uppercase text-epicWhite/58">{stat.label}</p>
                  <p className="mt-1 text-xl font-black">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative mt-4 aspect-[4/3] overflow-hidden bg-epicWhite ring-2 ring-epicWhite">
          {isDesktop === false ? windyIframe : null}
          {!mapActive && (
            <button
              type="button"
              onClick={() => {
                trackEvent("map_activate", { language: lang, cta_location: "forecast_section", cta_label: "activate_map" });
                setMapActive(true);
              }}
              className="absolute inset-4 z-20 flex items-center justify-center bg-epicDark/35"
            >
              <span className="bg-epicMint px-5 py-3 text-[11px] font-black uppercase text-epicDark shadow-[5px_5px_0_#FE746A]">
                {lang === "ru" ? "Активировать карту" : "Activate map"}
              </span>
            </button>
          )}
          {mapActive && (
            <button type="button" aria-label="Close forecast map" onClick={() => setMapActive(false)} className="absolute right-3 top-3 z-30 bg-epicRed p-2 text-epicDark">
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

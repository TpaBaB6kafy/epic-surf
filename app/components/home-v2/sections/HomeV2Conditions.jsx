"use client";

import Image from "next/image";
import { ExternalLink, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { liveCam } from "../../../data/liveCam";
import { links } from "../../../data/links";
import { buildWhatsAppUrl, trackEvent } from "../../../utils/tracking";

const assetRoot = "/design/home-v2/live-cam-forecast";
const mobileAssetRoot = `${assetRoot}/mobile`;

const copyByLanguage = {
  en: {
    previewPlaceholder: "My Khe Beach preview",
    iframeTitle: "My Khe Beach live camera preview",
    poweredBy: "Live preview by Da Nang Surf Cam",
    attribution: "A free, community-supported live cam streaming My Khe Beach, Da Nang daily from 4AM to 4PM ICT.",
    fullStream: "Open full stream",
    support: "Support the cam",
    mobileTitle: "My Khe Live Cam",
    askEpic: "Ask Epic about conditions",
    whatsappMessage: "Hi! I checked the My Khe live cam. Are the conditions good for my level today?",
  },
  ru: {
    previewPlaceholder: "Превью пляжа Ми Кхе",
    iframeTitle: "Превью лайв-камеры пляжа Ми Кхе",
    poweredBy: "Трансляция от Da Nang Surf Cam",
    attribution: "Бесплатная общественная камера с пляжа Ми Кхе в Дананге. Работает ежедневно с 4:00 до 16:00 ICT.",
    fullStream: "Открыть камеру",
    support: "Поддержать камеру",
    mobileTitle: "Лайв-камера Ми Кхе",
    askEpic: "Спросить Epic про условия",
    whatsappMessage: "Привет! Я посмотрел лайв-камеру Ми Кхе. Подходят ли сегодня условия для моего уровня?",
  },
};

function useConditionsAdaptiveSlot() {
  const [usesAdaptiveLayout, setUsesAdaptiveLayout] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const updateViewport = () => setUsesAdaptiveLayout(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener?.("change", updateViewport);
    return () => mediaQuery.removeEventListener?.("change", updateViewport);
  }, []);

  return usesAdaptiveLayout;
}

function degreesToCardinal(degrees = 225) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round((((degrees % 360) + 360) % 360) / 45) % directions.length];
}

function LiveCamIframe({ copy }) {
  return (
    <iframe
      data-live-cam-iframe
      src={liveCam.previewUrl}
      width="100%"
      height="100%"
      loading="lazy"
      className="block h-full w-full border-0"
      allow="autoplay; encrypted-media"
      title={copy.iframeTitle}
    />
  );
}

function WindyIframe() {
  return (
    <iframe
      src="https://embed.windy.com/embed2.html?lat=16.061&lon=108.247&zoom=11&overlay=waves&product=ecmwf&metricWind=km%2Fh"
      loading="lazy"
      className="h-full w-full border-0"
      title="Windy Forecast"
    />
  );
}

function HandoffHeading({ children, kind }) {
  const isLiveCam = kind === "live-cam";
  return (
    <div data-conditions-heading={kind} className={`absolute top-[38px] z-20 h-[25.11px] w-[194.636px] ${isLiveCam ? "left-0" : "left-[1px]"}`}>
      <Image data-conditions-heading-underlay={kind} aria-hidden="true" src={`${assetRoot}/heading-eyebrow-underlay.svg`} alt="" width={195} height={13} className={`absolute left-0 h-[12.475px] w-[194.636px] ${isLiveCam ? "top-[6.5px]" : "top-[7px]"}`} />
      <h2 data-conditions-heading-text={kind} className={`absolute top-0 h-[25.11px] whitespace-nowrap font-black uppercase text-epicWhite ${isLiveCam ? "left-[14.5px] w-[166.474px] text-[31.59px] leading-[29.889px]" : "left-[10.5px] w-[165.655px] text-[28.431px] leading-[26.9px]"}`}>{children}</h2>
    </div>
  );
}

function ProviderFooter({ copy, trackOutbound }) {
  return (
    <div data-live-cam-attribution-footer className="grid h-[48.42px] w-[503.832px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 bg-epicWhite px-2 py-1 text-epicDark min-[1200px]:w-full">
      <div data-live-cam-provider-identity className="flex min-w-0 items-center gap-2">
        {/* The provider requires its remote logo; using img avoids changing Next image configuration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={liveCam.logoUrl} alt={liveCam.cameraName} className="h-8 w-8 shrink-0 bg-epicWhite object-contain p-1 ring-1 ring-epicDark" />
        <div className="min-w-0">
          <p className="truncate text-[9px] font-black leading-tight text-epicDark md:text-[10px]">{copy.poweredBy}</p>
          <p className="mt-0.5 line-clamp-2 text-[7px] font-semibold leading-[1.25] text-epicGray md:text-[8px]">{copy.attribution}</p>
        </div>
      </div>
      <div data-live-cam-provider-links className="flex gap-1.5">
        <a data-live-cam-provider-action="primary" href={liveCam.fullStreamUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("full_stream")} className="inline-flex min-h-8 w-[88px] items-center justify-center gap-1 border border-epicDark bg-epicWhite px-1 text-center text-[7px] font-black uppercase leading-tight text-epicDark transition hover:bg-epicRed active:scale-95">
          {copy.fullStream}<ExternalLink size={9} />
        </a>
        <a data-live-cam-provider-action="secondary" href={liveCam.donateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("donate")} className="inline-flex min-h-8 w-[90px] items-center justify-center gap-1 border border-epicDark bg-epicDark px-1 text-center text-[7px] font-black uppercase leading-tight text-epicWhite transition hover:bg-epicGray active:scale-95">
          {copy.support}<Heart size={9} />
        </a>
      </div>
    </div>
  );
}

function MobileHandoffProviderFooter({ copy, trackOutbound }) {
  return (
    <div data-live-cam-attribution-footer className="grid h-[33.636px] w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-[3px] bg-epicWhite px-[2px] py-[2px] text-epicDark">
      <div data-live-cam-provider-identity className="flex min-w-0 items-center gap-[4px]">
        {/* The provider requires its remote logo; using img avoids changing Next image configuration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={liveCam.logoUrl} alt={liveCam.cameraName} className="h-[25px] w-[25px] shrink-0 bg-epicWhite object-contain p-[2px] ring-1 ring-epicDark" />
        <div className="min-w-0">
          <p className="truncate text-[6px] font-black leading-[7px] text-epicDark">{copy.poweredBy}</p>
          <p className="mt-[1px] line-clamp-2 text-[4.6px] font-semibold leading-[5.6px] text-epicGray">{copy.attribution}</p>
        </div>
      </div>
      <div data-live-cam-provider-links className="flex gap-[3px]">
        <a data-live-cam-provider-action="primary" href={liveCam.fullStreamUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("full_stream")} className="inline-flex h-[26px] w-[62px] items-center justify-center gap-[2px] border border-epicDark bg-epicWhite px-[2px] text-center text-[5.2px] font-black uppercase leading-[6px] text-epicDark transition hover:bg-epicRed active:scale-95">
          {copy.fullStream}<ExternalLink size={6} />
        </a>
        <a data-live-cam-provider-action="secondary" href={liveCam.donateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound("donate")} className="inline-flex h-[26px] w-[62px] items-center justify-center gap-[2px] border border-epicDark bg-epicDark px-[2px] text-center text-[5.2px] font-black uppercase leading-[6px] text-epicWhite transition hover:bg-epicGray active:scale-95">
          {copy.support}<Heart size={6} />
        </a>
      </div>
    </div>
  );
}

function LiveCamPreview({ copy, hasEnteredViewport, trackOutbound }) {
  return (
    <div data-live-cam-preview-group className="w-[503.832px] bg-epicWhite min-[1200px]:w-full">
      <div data-live-cam-preview className="relative h-[327.722px] w-[503.277px] overflow-hidden bg-epicDark min-[1200px]:aspect-[503.277/327.722] min-[1200px]:h-auto min-[1200px]:w-full">
        {hasEnteredViewport ? <LiveCamIframe copy={copy} /> : (
          <div data-live-cam-placeholder className="absolute inset-0 flex items-center justify-center bg-epicWhite/10 px-6 text-center">
            <span className="bg-epicWhite px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-epicDark">{copy.previewPlaceholder}</span>
          </div>
        )}
      </div>
      <ProviderFooter copy={copy} trackOutbound={trackOutbound} />
    </div>
  );
}

function MobileHandoffLiveCam({ copy, hasEnteredViewport, trackOutbound }) {
  return (
    <div data-live-cam-preview-group className="relative h-[264px] w-full bg-epicDark">
      <div data-live-cam-preview data-live-cam-mobile-preview="true" className="absolute left-0 top-0 h-[227.912px] w-full overflow-hidden rounded-[1.701px] bg-epicDark">
        {hasEnteredViewport ? <LiveCamIframe copy={copy} /> : (
          <div data-live-cam-placeholder className="absolute inset-0 flex items-center justify-center bg-epicWhite/10 px-6 text-center">
            <span className="bg-epicWhite px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-epicDark">{copy.previewPlaceholder}</span>
          </div>
        )}
      </div>
      <div className="absolute left-0 top-[230.364px] w-full">
        <MobileHandoffProviderFooter copy={copy} trackOutbound={trackOutbound} />
      </div>
    </div>
  );
}

function MobileHandoffHeading({ kind, language }) {
  const isLiveCam = kind === "live-cam";
  const isRu = language === "ru";
  return (
    <div data-conditions-heading={kind} className={`pointer-events-none absolute z-20 ${isLiveCam ? "left-0 top-[26.651px] h-[17.611px] w-[135.209px]" : "left-[0.696px] top-[25px] h-[19px] w-[135.433px]"}`}>
      <Image
        data-conditions-heading-underlay={kind}
        aria-hidden="true"
        src={`${mobileAssetRoot}/${isLiveCam ? "heading-eyebrow-underlay.svg" : "heading-eyebrow-underlay-451-314.svg"}`}
        alt=""
        width={136}
        height={9}
        className={`absolute left-0 h-[8.75px] w-full ${isLiveCam ? "top-[4.559px]" : "top-[6.596px]"}`}
      />
      <h2 data-conditions-heading-text={kind} className={`absolute z-10 whitespace-nowrap font-['Montserrat',var(--font-heading)] font-black uppercase text-epicWhite ${isLiveCam ? `left-[10.073px] top-0 leading-[20.922px] ${isRu ? "text-[17px]" : "text-[22.113px]"}` : `left-[7.306px] top-0 leading-[18.83px] ${isRu ? "text-[18px]" : "text-[19.902px]"}`}`}>
        {isLiveCam ? (isRu ? <>Лайв-<span className="text-epicRed">камера</span></> : <>Live <span className="text-epicRed">Cam</span></>) : (isRu ? "Прогноз" : "Forecast")}
      </h2>
    </div>
  );
}

function MobileHandoffStat({ type, label, value, unit, direction }) {
  const geometry = {
    period: { surface: "stat-surface.svg", surfaceLeft: 13.5, surfaceTop: 15.3, labelLeft: 72, labelTop: 13.5, valueLeft: 72, valueTop: 30.6, labelSize: 10.8, valueSize: 25.2 },
    wind: { surface: "stat-surface-451-334.svg", surfaceLeft: 15.07, surfaceTop: 15.229, labelLeft: 66.738, labelTop: 15.049, valueLeft: 66.738, valueTop: 29.76, labelSize: 8.324, valueSize: 25.834 },
    direction: { surface: "stat-surface-451-351.svg", surfaceLeft: 15.071, surfaceTop: 15.229, labelLeft: 66.739, labelTop: 15.05, valueLeft: 93.575, valueTop: 31.913, labelSize: 8.611, valueSize: 21.528 },
    water: { surface: "stat-surface-451-345.svg", surfaceLeft: 15.07, surfaceTop: 15.229, labelLeft: 66.738, labelTop: 15.05, valueLeft: 66.738, valueTop: 29.761, labelSize: 8.324, valueSize: 25.834 },
  }[type];

  return (
    <div data-conditions-stat={type} className="relative h-[70.2px] min-w-0 rounded-[2.7px] border-[2.7px] border-white/10 text-epicWhite" style={{ fontFamily: "Segoe UI, sans-serif" }}>
      <Image data-stat-surface={type} src={`${mobileAssetRoot}/${geometry.surface}`} alt="" width={41} height={41} className="absolute h-[40.186px] w-[40.186px]" style={{ left: geometry.surfaceLeft, top: geometry.surfaceTop }} />
      <span className="absolute h-[11.841px] font-bold leading-[11.841px] text-epicWhite/55" style={{ left: geometry.labelLeft, top: geometry.labelTop, fontSize: geometry.labelSize }}>{label}</span>
      {type === "direction" ? (
        <>
          <Image data-direction-indicator src={`${mobileAssetRoot}/direction-arrow-icon.svg`} alt="" width={32} height={32} className="absolute left-[60.229px] top-[27.147px] h-[31.052px] w-[31.24px]" style={{ transform: `rotate(${direction - 225}deg)` }} />
          <span data-conditions-stat-value className="absolute h-[21.528px] whitespace-nowrap font-bold leading-[21.528px]" style={{ left: geometry.valueLeft, top: geometry.valueTop, fontSize: geometry.valueSize }}>{value}</span>
        </>
      ) : (
        <span className="absolute flex items-end whitespace-nowrap" style={{ left: geometry.valueLeft, top: geometry.valueTop }}>
          <span data-conditions-stat-value className="font-bold" style={{ fontSize: geometry.valueSize, lineHeight: `${type === "period" ? 25.834 : geometry.valueSize}px` }}>{value}</span>
          {unit ? <span data-conditions-stat-unit className="mb-[1px] ml-[3px] text-[9.401px] font-bold leading-[10.047px] text-epicWhite/50">{unit}</span> : null}
        </span>
      )}
    </div>
  );
}

function HandoffStat({ label, value, direction, unit, type, className = "", style }) {
  const resolvedType = type || "water";
  const resolvedStyle = style || (!type ? { position: "absolute", left: 360, top: 0, width: 142.2 } : undefined);
  const isPeriod = resolvedType === "period";
  const isDirection = resolvedType === "direction";
  const surfaceByType = {
    wind: "stat-surface-wind.svg",
    period: "stat-surface-period.svg",
    direction: "stat-surface-direction.svg",
    water: "stat-surface-water.svg",
  };

  return (
    <div data-conditions-stat={resolvedType} className={`relative h-[70.2px] rounded-[2.7px] border-[2.7px] border-white/10 text-epicWhite ${className}`} style={{ fontFamily: "Segoe UI, sans-serif", ...resolvedStyle }}>
      <Image data-stat-surface={resolvedType} src={`${assetRoot}/${surfaceByType[resolvedType]}`} alt="" width={41} height={41} className={`absolute h-[40.186px] w-[40.186px] ${isPeriod ? "left-[11.503px] top-[13.303px]" : "left-[13.081px] top-[13.242px]"}`} />
      <span className={`absolute h-[11.841px] font-bold text-epicWhite/55 ${isPeriod ? "left-[70.012px] top-[11.512px] text-[10.8px] leading-[11.841px]" : `left-[64.75px] top-[13.061px] leading-[11.841px] ${isDirection ? "text-[8.611px]" : "text-[8.324px]"}`}`}>{label}</span>
      {isDirection ? (
        <>
          <Image data-direction-indicator src={`${assetRoot}/direction-arrow-icon.svg`} alt="" width={32} height={32} className="absolute left-[58.241px] top-[25.159px] h-[31.052px] w-[31.24px]" style={{ transform: `rotate(${direction - 225}deg)` }} />
          <span className="absolute left-[91.587px] top-[29.925px] h-[21.528px] w-[34.373px] whitespace-nowrap text-[21.528px] font-bold leading-[21.528px]">{value}</span>
        </>
      ) : (
        <>
          {unit ? (
            <span className="absolute left-[64.75px] top-[27.772px] flex items-end gap-[3px] whitespace-nowrap">
              <span data-conditions-stat-value className="h-[25.834px] text-[25.834px] font-bold leading-[25.834px]">{value}</span>
              <span data-conditions-stat-unit className="mb-[1px] h-[10.047px] text-[9.401px] font-bold leading-[10.047px] text-epicWhite/50">{unit}</span>
            </span>
          ) : (
            <span data-conditions-stat-value className={`absolute whitespace-nowrap font-bold ${isPeriod ? "left-[70.012px] top-[28.612px] h-[26.1px] w-[63px] text-[25.2px] leading-[25.834px]" : "left-[64.75px] top-[27.772px] h-[25.834px] text-[25.834px] leading-[25.834px]"}`}>{value}</span>
          )}
        </>
      )}
    </div>
  );
}

function MobileConditions({ copy, language, hasEnteredViewport, trackOutbound, handleWhatsAppClick, t, waveHeight, wavePeriod, windSpeed, windDirection, windCardinal }) {
  return (
    <div data-home-v2-conditions-mobile data-conditions-mobile-en={language === "en" ? "true" : undefined} data-live-cam-artboard-mobile data-forecast-artboard-mobile className="relative mx-auto h-[1048px] w-full max-w-[390px] overflow-hidden min-[640px]:hidden">
      <div data-live-cam-panel-mobile className="absolute left-[20px] top-[60px] h-[264px] w-[calc(100%_-_40px)]">
        <MobileHandoffLiveCam copy={copy} hasEnteredViewport={hasEnteredViewport} trackOutbound={trackOutbound} />
        <MobileHandoffHeading kind="live-cam" language={language} />
      </div>

      <div data-forecast-stats-panel-mobile className="absolute left-[20px] top-[344px] h-[305px] w-[calc(100%_-_40px)]">
        <Image data-conditions-card-border src={`${mobileAssetRoot}/card-border.svg`} alt="" width={350} height={305} className="absolute inset-0 h-full w-full" />

        <div data-wave-height-callout className="absolute left-[74px] top-[16px] h-[61.236px] w-[202.612px]" style={{ fontFamily: "Segoe UI, sans-serif" }}>
          <div data-wave-height-surface className="absolute left-0 top-[13px] h-[43.062px] w-[202.612px] overflow-visible">
            <Image data-wave-layer="04" src={`${mobileAssetRoot}/wave-layer-04.svg`} alt="" width={192} height={37} className="absolute left-[10.875px] top-0 h-[36.713px] w-[191.737px] max-w-none" />
            <Image data-wave-layer="03" src={`${mobileAssetRoot}/wave-layer-03.svg`} alt="" width={192} height={37} className="absolute left-[3px] top-[2.749px] h-[36.713px] w-[191.737px] max-w-none" />
            <Image data-wave-layer="02" src={`${mobileAssetRoot}/wave-layer-02.svg`} alt="" width={192} height={37} className="absolute left-0 top-[6.349px] h-[36.713px] w-[191.737px] max-w-none" />
            <Image data-wave-layer="01" src={`${mobileAssetRoot}/wave-layer-01.svg`} alt="" width={183} height={24} className="absolute left-[3.6px] top-[19.549px] h-[23.374px] w-[182.782px] max-w-none" />
          </div>
          <span data-wave-height-value className="absolute left-[39px] top-0 z-10 h-[61.236px] whitespace-nowrap text-[46.8px] font-bold leading-[58.174px] text-white">{waveHeight}</span>
          <span data-wave-height-unit className="absolute left-[139.8px] top-[26.4px] z-10 h-[25.515px] text-[25.488px] font-bold leading-[24.239px] text-epicRed">m</span>
        </div>

        <div data-conditions-stat-grid className="absolute left-[26px] right-[18.8px] top-[112px] grid grid-cols-[minmax(0,143.1fr)_minmax(0,142.2fr)] gap-x-[19.9px] gap-y-[16.8px]">
          <MobileHandoffStat type="period" label={t.forecastPeriod} value={`${wavePeriod}s`} />
          <MobileHandoffStat type="wind" label={t.forecastWind} value={windSpeed} unit="km/h" />
          <MobileHandoffStat type="direction" label={t.forecastDir} value={windCardinal} direction={windDirection} />
          <MobileHandoffStat type="water" label={t.forecastWater} value="26°C" />
        </div>
      </div>

      <div data-forecast-mobile-layout data-forecast-map className="absolute left-[20px] top-[669px] h-[264px] w-[calc(100%_-_40px)] overflow-hidden bg-epicWhite">
        <WindyIframe mapActive />
        <MobileHandoffHeading kind="forecast" language={language} />
      </div>

      <div data-live-cam-primary-actions className="absolute left-[calc(50%_-_88px)] top-[953px] h-[70px] w-[175px]">
        <a data-conditions-cta href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="relative block h-full w-full rounded-[2.7px] border-[2.7px] border-white/10 text-epicWhite transition hover:border-epicRed active:scale-95" style={{ fontFamily: "Segoe UI, sans-serif" }}>
          <Image data-live-cam-chat-icon src={`${mobileAssetRoot}/cta-surface.svg`} alt="" width={41} height={41} className="absolute left-[13.071px] top-[12.529px] h-[40.186px] w-[40.186px]" />
          <span className={`absolute left-[55px] top-[17px] flex h-[36px] w-[112px] items-center justify-center text-center font-bold uppercase leading-[18px] ${language === "ru" ? "text-[9px]" : "text-[12px]"}`}>{copy.askEpic}</span>
        </a>
      </div>
    </div>
  );
}

export function HomeV2Conditions({ t, locale = "en" }) {
  const language = locale === "ru" ? "ru" : "en";
  const copy = copyByLanguage[language];
  const sectionRef = useRef(null);
  const previewMountTrackedRef = useRef(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [forecast, setForecast] = useState(null);
  const usesAdaptiveLayout = useConditionsAdaptiveSlot();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasEnteredViewport) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setHasEnteredViewport(true);
      observer.disconnect();
    }, { root: null, rootMargin: "400px 0px", threshold: 0.01 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [hasEnteredViewport]);

  useEffect(() => {
    if (!hasEnteredViewport || previewMountTrackedRef.current) return;
    previewMountTrackedRef.current = true;
    trackEvent("live_cam_preview_load", { language, provider: "danangsurfcam", location: "homepage_live_cam" });
  }, [hasEnteredViewport, language]);

  useEffect(() => {
    async function getForecast() {
      try {
        const marineRes = await fetch("https://marine-api.open-meteo.com/v1/marine?latitude=16.061&longitude=108.247&current=wave_height,wave_period");
        const weatherRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=16.061&longitude=108.247&current=wind_speed_10m,wind_direction_10m");
        const marine = await marineRes.json();
        const weather = await weatherRes.json();
        setForecast({ height: marine.current.wave_height, period: marine.current.wave_period, windSpeed: weather.current.wind_speed_10m, windDir: weather.current.wind_direction_10m });
      } catch (error) {
        console.error(error);
      }
    }
    getForecast();
  }, []);

  const trackOutbound = (target) => trackEvent("live_cam_outbound_click", { language, provider: "danangsurfcam", location: "homepage_live_cam", target });
  const handleWhatsAppClick = (event) => {
    event.currentTarget.href = buildWhatsAppUrl(links.whatsapp, copy.whatsappMessage, { language });
    trackEvent("live_cam_cta_click", { language, location: "homepage_live_cam", target: "whatsapp_conditions" });
    trackEvent("whatsapp_click", { language, service_type: "conditions_check", cta_location: "homepage_live_cam", cta_label: "whatsapp_conditions" });
  };
  const waveHeight = forecast?.height ?? 0.26;
  const wavePeriod = forecast?.period ?? 4.35;
  const windSpeed = Math.round(forecast?.windSpeed ?? 7);
  const windDirection = forecast?.windDir ?? 225;
  const windCardinal = degreesToCardinal(windDirection);
  const windyIframe = <WindyIframe />;

  return (
    <section ref={sectionRef} id="forecast" data-home-v2-live-cam data-home-v2-forecast data-live-cam-mounted={hasEnteredViewport ? "true" : "false"} data-surf-stack-scene="livecam-forecast" className="relative isolate overflow-visible bg-epicDark px-0 py-0 text-epicWhite scroll-mt-24">
      <span id="live-cam" className="absolute top-0 scroll-mt-24" aria-hidden="true" />

      <div data-home-v2-conditions-adaptive data-livecam-visual-composition data-forecast-visual-composition data-live-cam-artboard data-forecast-artboard className="relative mx-auto hidden min-h-[1220px] w-full min-[640px]:block min-[1200px]:min-h-[clamp(790px,44vw,850px)]">
        <div className="home-v2-fluid-frame">
          <div
            data-conditions-pair
            className="mx-auto flex w-full max-w-[1148px] flex-col items-center gap-10 pt-[72px] min-[1200px]:grid min-[1200px]:w-fit min-[1200px]:max-w-none min-[1200px]:items-start min-[1200px]:gap-0 min-[1200px]:pt-[100px]"
            style={{ gridTemplateColumns: "repeat(2, clamp(503px, 33vw, 650px))", columnGap: "clamp(125px, calc(6.25vw + 50px), 210px)" }}
          >
          <div data-forecast-panel className="order-2 h-[587.2px] w-[503px] min-w-0 max-w-full min-[1200px]:order-1 min-[1200px]:h-auto min-[1200px]:w-[clamp(503px,33vw,650px)]">
            <div data-forecast-map className="relative aspect-[503/376] w-full overflow-hidden bg-epicWhite">
              {usesAdaptiveLayout === true ? windyIframe : null}
              <HandoffHeading kind="forecast">Forecast</HandoffHeading>
            </div>
            <div data-wave-height-callout className="relative mt-4 h-[102.06px] w-[337.687px]" style={{ fontFamily: "Segoe UI, sans-serif" }}>
              <div data-wave-height-surface className="absolute left-0 top-[23.419px] h-[71.77px] w-[337.687px] overflow-visible">
                {[4, 3, 2, 1].map((layer) => (
                  <Image key={layer} data-wave-layer={String(layer).padStart(2, "0")} src={`${assetRoot}/wave-layer-${String(layer).padStart(2, "0")}.svg`} alt="" width={layer === 1 ? 302 : 317} height={layer === 1 ? 39 : 61} className={`absolute max-w-none ${layer === 4 ? "left-[18.125px] top-0 h-[61.189px] w-[319.562px]" : layer === 3 ? "left-[5px] top-[4.581px] h-[61.189px] w-[319.562px]" : layer === 2 ? "left-0 top-[10.581px] h-[61.189px] w-[319.562px]" : "left-[6px] top-[32.581px] h-[38.957px] w-[304.637px]"}`} />
                ))}
              </div>
              <span data-wave-height-value className="absolute left-[49.001px] top-0 z-10 h-[102.06px] w-[198.77px] text-[78px] font-bold leading-[96.957px] text-white">{waveHeight}</span>
              <span data-wave-height-unit className="absolute left-[217px] top-[44px] z-10 h-[42.525px] w-[37.998px] text-[42.48px] font-bold leading-[40.399px] text-epicRed">m</span>
            </div>
            <div className="mt-[22.94px] flex h-[70px] items-stretch gap-[30px]">
              <a data-conditions-cta data-live-cam-primary-actions href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="relative h-[70px] w-[175px] shrink-0 rounded-[2.7px] border-[2.7px] border-white/10 text-epicWhite transition hover:border-epicRed active:scale-95" style={{ fontFamily: "Segoe UI, sans-serif" }}>
                <Image data-live-cam-chat-icon src={`${assetRoot}/cta-surface.svg`} alt="" width={41} height={41} className="absolute left-[13.083px] top-[13.242px] h-[40.186px] w-[40.186px]" />
                <span className="absolute left-[66.3px] top-[14.3px] w-[101px] whitespace-normal text-[12px] font-bold uppercase leading-[22px]">{copy.askEpic}</span>
              </a>
              <HandoffStat type="period" label={t.forecastPeriod} value={`${wavePeriod}s`} className="w-[143.1px] shrink-0" />
            </div>
          </div>

          <div data-live-cam-panel-group className="order-1 h-[498.2px] w-[504.2px] min-w-0 max-w-full min-[1200px]:order-2 min-[1200px]:h-auto min-[1200px]:w-[clamp(503px,33vw,650px)]">
            <div data-live-cam-panel className="relative w-full">
              {usesAdaptiveLayout === true ? <LiveCamPreview copy={copy} hasEnteredViewport={hasEnteredViewport} trackOutbound={trackOutbound} /> : null}
              <HandoffHeading kind="live-cam">Live <span className="text-epicRed">Cam</span></HandoffHeading>
            </div>
            <div data-forecast-stats-panel className="relative ml-[2px] mt-[51.58px] h-[70.2px] w-[502.2px] min-[1200px]:mx-auto">
              <HandoffStat type="wind" label={t.forecastWind} value={windSpeed} unit="km/h" style={{ position: "absolute", left: 0, top: 0, width: 142.2 }} />
              <HandoffStat type="direction" label={t.forecastDir} value={windCardinal} direction={windDirection} style={{ position: "absolute", left: 182, top: 0, width: 143.1 }} />
              <HandoffStat label={t.forecastWater} value="26°C" icon="stat-icon-water.svg" />
            </div>
          </div>
          </div>
        </div>
      </div>

      {usesAdaptiveLayout === false ? (
        <MobileConditions copy={copy} language={language} hasEnteredViewport={hasEnteredViewport} trackOutbound={trackOutbound} handleWhatsAppClick={handleWhatsAppClick} t={t} waveHeight={waveHeight} wavePeriod={wavePeriod} windSpeed={windSpeed} windDirection={windDirection} windCardinal={windCardinal} />
      ) : null}

      <style jsx>{`
        [data-wave-layer="04"] { animation: home-v2-wave-drift-a 6.8s ease-in-out infinite alternate; }
        [data-wave-layer="03"] { animation: home-v2-wave-drift-b 7.6s ease-in-out -1.1s infinite alternate; }
        [data-wave-layer="02"] { animation: home-v2-wave-drift-a 8.4s ease-in-out -2.2s infinite alternate-reverse; }
        [data-wave-layer="01"] { animation: home-v2-wave-drift-b 6.2s ease-in-out -0.7s infinite alternate-reverse; }
        @keyframes home-v2-wave-drift-a { to { transform: translate3d(3px, -1px, 0); } }
        @keyframes home-v2-wave-drift-b { to { transform: translate3d(-3px, 1px, 0); } }
        @media (prefers-reduced-motion: reduce) { [data-wave-layer] { animation: none !important; } }
      `}</style>
    </section>
  );
}

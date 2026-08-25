"use client";

import { ExternalLink, Heart, MessageCircle, Radio } from "lucide-react";
import { liveCam } from "../data/liveCam";
import { links } from "../data/links";
import { buildWhatsAppUrl, trackEvent } from "../utils/tracking";

const liveCamCopy = {
  en: {
    eyebrow: "Da Nang Surf Cam",
    title: "My Khe Beach Live Cam",
    mobileTitle: "My Khe Live Cam",
    titleLines: ["My Khe Beach", "Live Cam"],
    mobileTitleLines: ["My Khe Live Cam"],
    subtext: "Check My Khe before you book a lesson or rent a board.",
    detail: "The full stream is operated by Da Nang Surf Cam. Open it for the full beach view, or message Epic if you’re not sure today fits your level.",
    iframeTitle: "My Khe Beach live camera preview",
    poweredBy: "Powered by Da Nang Surf Cam",
    attribution: "A free, community-supported live cam streaming My Khe Beach, Da Nang daily from 4AM to 4PM ICT.",
    fullStream: "Open full cam",
    support: "Support the cam",
    askEpic: "Ask Epic about today’s conditions",
    mobileAskEpic: "Ask Epic about conditions",
    whatsappMessage: "Hi! I checked the My Khe live cam. Are the conditions good for my level today?",
  },
  ru: {
    eyebrow: "Da Nang Surf Cam",
    title: "Лайв-камера Ми Кхе",
    mobileTitle: "Лайв-камера Ми Кхе",
    titleLines: ["Лайв-камера", "Ми Кхе"],
    mobileTitleLines: ["Лайв-камера", "Ми Кхе"],
    subtext: "Проверьте Ми Кхе перед уроком или арендой доски.",
    detail: "Полный стрим ведёт Da Nang Surf Cam. Откройте камеру для обзора пляжа или напишите Epic, если не уверены, подходят ли условия вашему уровню.",
    iframeTitle: "Превью лайв-камеры пляжа Ми Кхе",
    poweredBy: "Powered by Da Nang Surf Cam",
    attribution: "Бесплатная community-камера с пляжа Ми Кхе в Дананге. Работает ежедневно с 4:00 до 16:00 ICT.",
    fullStream: "Открыть камеру",
    support: "Поддержать камеру",
    askEpic: "Спросить Epic про условия",
    mobileAskEpic: "Спросить про условия",
    whatsappMessage: "Привет! Я посмотрел лайв-камеру Ми Кхе. Подходят ли сегодня условия для моего уровня?",
  },
};

export default function LiveCam({ locale = "en" }) {
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
    <section id="live-cam" className="overflow-hidden border-t border-epicDark/10 bg-epicWhite px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] bg-epicDark px-5 py-6 text-epicWhite shadow-2xl md:rounded-[40px] md:px-8 md:py-8 lg:px-14 lg:py-14">
          <svg
            data-live-cam-wave-decoration
            aria-hidden="true"
            viewBox="0 0 420 120"
            className="pointer-events-none absolute -right-32 top-8 h-32 w-[520px] opacity-50 md:-right-24 md:top-8 md:h-36"
          >
            <path d="M8 70 C78 18 142 18 212 70 S346 122 416 70 S548 18 618 70" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="3" />
            <path d="M-36 100 C42 48 112 48 190 100 S340 152 418 100 S568 48 646 100" fill="none" stroke="rgba(46,213,166,0.28)" strokeWidth="3" />
          </svg>
          <svg
            data-live-cam-wave-decoration
            aria-hidden="true"
            viewBox="0 0 520 140"
            className="pointer-events-none absolute -bottom-12 -left-28 h-36 w-[620px] opacity-55 md:-bottom-14 md:-left-20 md:h-40"
          >
            <path d="M4 60 C88 6 164 6 248 60 S408 114 492 60 S652 6 736 60" fill="none" stroke="rgba(255,91,75,0.24)" strokeWidth="3" />
            <path d="M-56 98 C34 44 116 44 206 98 S378 152 468 98 S640 44 730 98" fill="none" stroke="rgba(46,213,166,0.24)" strokeWidth="3" />
          </svg>

          <div className="relative grid items-center gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(300px,1.1fr)] md:gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,1.05fr)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_650px]">
            <div data-live-cam-copy className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
              <div data-live-cam-source-badge className="inline-flex items-center gap-2 self-center rounded-full bg-epicMint px-4 py-2 text-[11px] font-black uppercase tracking-wide text-epicDark lg:self-start">
                <Radio size={15} className="text-epicRed" />
                {copy.eyebrow}
              </div>
              <h2
                aria-label={copy.mobileTitle}
                className="mt-5 max-w-3xl text-3xl font-black leading-[0.98] tracking-normal sm:hidden"
              >
                {copy.mobileTitleLines.map((line) => (
                  <span key={line} data-live-cam-title-line className="block">{line}</span>
                ))}
              </h2>
              <h2
                aria-label={copy.title}
                className="mt-5 hidden max-w-3xl text-4xl font-black leading-[0.98] tracking-normal sm:block md:text-5xl lg:text-6xl lg:leading-[0.95]"
              >
                {copy.titleLines.map((line) => (
                  <span key={line} data-live-cam-title-line className="block">{line}</span>
                ))}
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-epicWhite/75 md:text-lg md:leading-8">
                {copy.subtext}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-epicWhite/55 md:text-base md:leading-7">
                {copy.detail}
              </p>

              <div data-live-cam-primary-actions className="mt-5 w-full max-w-[360px] sm:max-w-none lg:mt-7">
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-epicRed px-5 py-2.5 text-center text-[12px] font-black uppercase leading-tight text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-105 active:scale-95 md:min-h-13 md:px-6 md:text-sm"
                >
                  <span className="sm:hidden">{copy.mobileAskEpic}</span>
                  <span className="hidden sm:inline">{copy.askEpic}</span>
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[360px] flex-col justify-center rounded-[24px] border border-epicWhite/10 bg-epicWhite/5 p-3 shadow-xl md:max-w-[502px] md:rounded-[28px] md:p-4 lg:max-w-[650px] lg:self-stretch lg:p-6">
              <div
                data-live-cam-preview
                className="mx-auto aspect-video w-full max-w-[320px] overflow-hidden rounded-[18px] bg-black shadow-2xl md:max-w-[460px] md:rounded-[20px] lg:max-w-[600px]"
              >
                <iframe
                  src={liveCam.previewUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="block h-full w-full border-0"
                  allow="autoplay; encrypted-media"
                  title={copy.iframeTitle}
                  onLoad={() => trackEvent("live_cam_preview_load", {
                    language,
                    provider: "danangsurfcam",
                    location: "homepage_live_cam",
                  })}
                />
              </div>

              <div data-live-cam-attribution-footer className="mt-3 flex flex-col items-center gap-3 px-1 pb-1 text-center md:mt-4 md:px-0 md:pb-0 lg:flex-row lg:justify-between lg:gap-6 lg:text-left">
                <div data-live-cam-provider-identity className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:flex-row sm:items-center md:gap-3 lg:gap-4">
                  {/* The provider requires its remote logo; using img avoids changing Next image configuration. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={liveCam.logoUrl}
                    alt={liveCam.cameraName}
                    className="h-10 w-10 shrink-0 rounded-xl bg-white object-contain p-1.5 md:h-12 md:w-12 md:rounded-2xl"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-black text-epicWhite md:text-sm">{copy.poweredBy}</p>
                    <p className="mx-auto mt-1 max-w-[420px] text-[11px] leading-5 text-epicWhite/60 md:text-xs md:leading-5 lg:mx-0 lg:max-w-[390px] xl:max-w-[430px]">{copy.attribution}</p>
                  </div>
                </div>
                <div data-live-cam-provider-links className="flex w-full flex-col justify-center gap-2 sm:grid sm:max-w-[360px] sm:grid-cols-2 lg:flex lg:w-[180px] lg:shrink-0 lg:justify-center">
                  <a
                    data-live-cam-provider-action="primary"
                    href={liveCam.fullStreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutbound("full_stream")}
                    className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-[14px] border border-epicMint/45 bg-epicMint/10 px-4 py-2 text-center text-[10px] font-black uppercase leading-tight text-epicMint transition hover:border-epicMint hover:bg-epicMint/15 active:scale-95 lg:px-5 lg:text-[11px]"
                  >
                    {copy.fullStream}
                    <ExternalLink size={13} />
                  </a>
                  <a
                    data-live-cam-provider-action="secondary"
                    href={liveCam.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutbound("donate")}
                    className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-[14px] border border-epicWhite/15 bg-epicWhite/[0.04] px-4 py-2 text-center text-[10px] font-black uppercase leading-tight text-epicWhite/88 transition hover:border-epicWhite/35 hover:text-epicWhite active:scale-95 lg:px-5 lg:text-[11px]"
                  >
                    {copy.support}
                    <Heart size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

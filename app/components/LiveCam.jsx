"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Heart, MessageCircle, Radio } from "lucide-react";
import { liveCam } from "../data/liveCam";
import { links } from "../data/links";
import { buildWhatsAppUrl, trackEvent } from "../utils/tracking";

const liveCamCopy = {
  en: {
    eyebrow: "Da Nang Surf Cam",
    title: "My Khe Beach Live Cam",
    mobileTitle: "My Khe Live Cam",
    subtext: "Check a short live preview from My Khe Beach before you book a lesson or rent a board.",
    detail: "The full stream is operated by Da Nang Surf Cam. Open it to see current conditions, then message Epic if you are not sure whether today is good for your level.",
    iframeTitle: "My Khe Beach live camera preview",
    poweredBy: "Powered by Da Nang Surf Cam",
    attribution: "A free, community-supported live cam streaming My Khe Beach, Da Nang daily from 4AM to 4PM ICT.",
    fullStream: "Watch Full Stream",
    support: "Support the Project",
    askEpic: "Ask Epic about today’s conditions",
    whatsappMessage: "Hi! I checked the My Khe live cam. Are the conditions good for my level today?",
  },
  ru: {
    eyebrow: "Da Nang Surf Cam",
    title: "Лайв-камера пляжа Ми Кхе",
    mobileTitle: "Лайв-камера пляжа Ми Кхе",
    subtext: "Посмотрите короткое превью с пляжа Ми Кхе перед уроком или арендой доски.",
    detail: "Полный стрим ведёт Da Nang Surf Cam. Откройте его, чтобы посмотреть текущие условия, а если не уверены, подходит ли день для вашего уровня, напишите Epic.",
    iframeTitle: "Превью лайв-камеры пляжа Ми Кхе",
    poweredBy: "Powered by Da Nang Surf Cam",
    attribution: "Бесплатная community-камера с пляжа Ми Кхе в Дананге. Работает ежедневно с 4:00 до 16:00 ICT.",
    fullStream: "Открыть полный стрим",
    support: "Поддержать проект",
    askEpic: "Спросить Epic про условия сегодня",
    whatsappMessage: "Привет! Я посмотрел лайв-камеру Ми Кхе. Подходят ли сегодня условия для моего уровня?",
  },
};

const getPreviewSize = () => {
  if (typeof window === "undefined" || window.innerWidth < 768) {
    return { width: 320, height: 240 };
  }

  return window.innerWidth < 1024
    ? { width: 400, height: 300 }
    : { width: 480, height: 360 };
};

export default function LiveCam({ locale = "en" }) {
  const language = locale === "ru" ? "ru" : "en";
  const copy = liveCamCopy[language];
  const [previewSize, setPreviewSize] = useState({ width: 320, height: 240 });

  useEffect(() => {
    const updatePreviewSize = () => setPreviewSize(getPreviewSize());
    updatePreviewSize();
    window.addEventListener("resize", updatePreviewSize);
    return () => window.removeEventListener("resize", updatePreviewSize);
  }, []);

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
    <section id="live-cam" className="overflow-hidden border-t border-epicDark/10 bg-epicWhite px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] bg-epicDark px-5 py-8 text-epicWhite shadow-2xl md:rounded-[40px] md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[24px] border-epicRed/10 md:-right-16 md:-top-20 md:h-56 md:w-56 md:border-[34px] md:border-epicRed/15" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-52 w-52 rounded-full border-[30px] border-epicMint/10 md:h-60 md:w-60 md:border-[36px]" />

          <div className="relative grid items-center gap-9 md:gap-11 lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,1.05fr)] lg:gap-12">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-epicMint px-4 py-2 text-[11px] font-black uppercase tracking-wide text-epicDark">
                <Radio size={15} className="text-epicRed" />
                {copy.eyebrow}
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-[0.98] tracking-normal sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[0.95]">
                <span className="sm:hidden">{copy.mobileTitle}</span>
                <span className="hidden sm:inline">{copy.title}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-epicWhite/75 md:text-lg md:leading-8">
                {copy.subtext}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-epicWhite/55 md:text-base md:leading-7">
                {copy.detail}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={liveCam.fullStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound("full_stream")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] bg-epicRed px-5 py-2.5 text-center text-[12px] font-black uppercase leading-tight text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-105 active:scale-95 md:min-h-13 md:px-6 md:text-sm"
                >
                  {copy.fullStream}
                  <ExternalLink size={17} />
                </a>
                <a
                  href={liveCam.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound("donate")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] border border-epicWhite/15 bg-epicWhite/5 px-5 py-2.5 text-center text-[12px] font-black uppercase leading-tight text-epicWhite transition hover:border-epicMint hover:text-epicMint active:scale-95 md:min-h-13 md:px-6 md:text-sm"
                >
                  {copy.support}
                  <Heart size={17} />
                </a>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] bg-epicMint px-5 py-2.5 text-center text-[12px] font-black uppercase leading-tight text-epicDark transition hover:-translate-y-0.5 hover:bg-white active:scale-95 sm:col-span-2 md:min-h-13 md:px-6 md:text-sm"
                >
                  {copy.askEpic}
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[360px] flex-col justify-center rounded-[24px] border border-epicWhite/10 bg-epicWhite/5 p-3 shadow-xl md:max-w-[442px] md:rounded-[28px] md:p-5 lg:max-w-[540px] lg:self-stretch lg:p-6">
              <div
                data-live-cam-preview
                className="mx-auto aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-[18px] bg-black shadow-2xl md:max-w-[400px] md:rounded-[20px] lg:max-w-[480px]"
              >
                <iframe
                  src={liveCam.previewUrl}
                  width={previewSize.width}
                  height={previewSize.height}
                  loading="lazy"
                  className="block h-full w-full rounded-[18px] border-0 md:rounded-[20px]"
                  allow="autoplay; encrypted-media"
                  title={copy.iframeTitle}
                  onLoad={() => trackEvent("live_cam_preview_load", {
                    language,
                    provider: "danangsurfcam",
                    location: "homepage_live_cam",
                  })}
                />
              </div>

              <div className="mt-3 flex items-center gap-3 px-1 pb-1 md:mt-4 md:gap-4 md:px-0 md:pb-0">
                {/* The provider requires its remote logo; using img avoids changing Next image configuration. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={liveCam.logoUrl}
                  alt={liveCam.cameraName}
                  className="h-10 w-10 shrink-0 rounded-xl bg-white object-contain p-1.5 md:h-12 md:w-12 md:rounded-2xl"
                />
                <div className="min-w-0">
                  <p className="text-xs font-black text-epicWhite md:text-sm">{copy.poweredBy}</p>
                  <p className="mt-0.5 text-[11px] leading-4 text-epicWhite/55 md:mt-1 md:text-xs md:leading-5">{copy.attribution}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

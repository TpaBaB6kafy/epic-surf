"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Play, Radio } from "lucide-react";
import { liveCam } from "../../data/liveCam";
import { trackEvent } from "../../utils/tracking";

export default function RentalLiveCam({ lang }) {
  const ru = lang === "ru";
  const [shouldLoad, setShouldLoad] = useState(false), [loaded, setLoaded] = useState(false), [failed, setFailed] = useState(false);
  useEffect(() => { const timer = setTimeout(() => { if (shouldLoad && !loaded) setFailed(true); }, 15000); return () => clearTimeout(timer); }, [shouldLoad, loaded]);
  useEffect(() => {
    if (!shouldLoad || loaded) return;
    trackEvent("live_cam_preview_start", { language: lang, location: "rental_pickup" });
  }, [shouldLoad, loaded, lang]);
  return <div className="rv-livecam" data-role="rental-live-cam" data-live-cam-state={failed ? "fallback" : loaded ? "loaded" : shouldLoad ? "loading" : "idle"}>
    <div className="rv-livecam-media">
      {!shouldLoad && <button type="button" className="rv-livecam-start" onClick={() => setShouldLoad(true)}><Play size={26} aria-hidden="true" /><span>{ru ? "Посмотреть live-камеру" : "Watch the live camera"}<small>{ru ? "My Khe · превью 30 секунд" : "My Khe · 30-second preview"}</small></span></button>}
      {shouldLoad && !loaded && <p role="status">{failed ? (ru ? "Превью недоступно. Открой полную камеру ниже." : "Preview unavailable. Open the full camera below.") : (ru ? "Подключаем камеру…" : "Connecting to the camera…")}</p>}
      {shouldLoad && !failed && <iframe src={liveCam.previewUrl} title={ru ? "Live-камера My Khe" : "My Khe live camera"} allow="autoplay; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" onLoad={() => { setLoaded(true); trackEvent("live_cam_preview_load", { language: lang, provider: "danangsurfcam", location: "rental_pickup" }); }} onError={() => setFailed(true)} />}
    </div>
    <div className="rv-livecam-meta"><span><Radio size={16} aria-hidden="true" />My Khe</span><a href={liveCam.fullStreamUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("live_cam_outbound_click", { language: lang, provider: "danangsurfcam", location: "rental_pickup", target: "full_stream" })}>{ru ? "Открыть полную камеру" : "Open full camera"}<ArrowRight size={18} aria-hidden="true" /></a></div>
  </div>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./HomeV2Hero.module.css";
import { selectHeroVideo } from "../heroVideoSource.mjs";

const MEDIA_ROOT = "/video/hero";

export default function HomeV2Hero({ t, lang = "en" }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Choose once per visit: resizing must not download a second video.
    const variant = window.matchMedia("(max-width: 900px)").matches ? "mobile" : "desktop";
    let wantsPlayback = !motion.matches && !navigator.connection?.saveData;
    let inView = false;
    let disposed = false;
    let broken = false;
    let attempt = 0;
    let pending = false;
    let source = null;
    let triedFallback = false;

    const sync = () => {
      if (disposed || !source) return;
      if (!wantsPlayback || !inView || document.hidden || broken) {
        attempt += 1;
        pending = false;
        video.pause();
        return;
      }
      if (!video.hasAttribute("src")) {
        video.muted = true;
        video.src = source.src;
        section.dataset.videoVariant = variant;
        section.dataset.videoCodec = source.codec;
      }
      if (!video.paused || pending) return;
      pending = true;
      const thisAttempt = ++attempt;
      video.play().then(() => {
        if (thisAttempt === attempt) pending = false;
        if (disposed || !wantsPlayback || !inView || document.hidden) video.pause();
      }).catch(() => {
        if (disposed || thisAttempt !== attempt) return;
        pending = false;
        // Autoplay rejection leaves the static poster visible.
        wantsPlayback = false;
        setPlaying(false);
        setHasFrame(false);
      });
    };
    const onPlaying = () => {
      if (!wantsPlayback || !inView || document.hidden) { video.pause(); return; }
      setHasFrame(true);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onError = () => {
      if (disposed) return;
      if (source?.codec === "av1" && !triedFallback) {
        triedFallback = true;
        attempt += 1;
        pending = false;
        video.pause();
        video.removeAttribute("src");
        video.load();
        source = { ...source, src: source.fallbackSrc, codec: "h264" };
        setHasFrame(false);
        sync();
        return;
      }
      broken = true;
      wantsPlayback = false;
      setFailed(true);
      setPlaying(false);
      setHasFrame(false);
    };
    const onMotion = () => {
      if (motion.matches) {
        wantsPlayback = false;
        setHasFrame(false);
      }
      sync();
    };
    const onPageHide = () => video.pause();

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", sync);
    motion.addEventListener("change", onMotion);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.05;
      sync();
    }, { threshold: [0, 0.05] });
    observer.observe(section);
    selectHeroVideo(variant).then((selected) => {
      if (disposed) return;
      source = selected;
      sync();
    });
    return () => {
      disposed = true;
      attempt += 1;
      observer.disconnect();
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", sync);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <section ref={sectionRef} data-home-v2-hero data-home-v2-hero-locale={lang}
      data-hero-video-state={failed ? "error" : playing ? "playing" : "paused"}
      className={styles.hero} aria-labelledby="home-hero-title">
      <h1 id="home-hero-title" className="sr-only">{t.heroTitle} {t.heroTitleEpic} {t.heroTitleEnd}</h1>
      <picture className={styles.poster}>
        <source media="(max-width: 900px)" srcSet={`${MEDIA_ROOT}/mobile-v2-poster.webp`} />
        {/* Native picture avoids a desktop preload competing with the mobile poster. */}
        <img src={`${MEDIA_ROOT}/desktop-v2-poster.webp`} alt="" width="1920" height="1080" fetchPriority="high" loading="eager" />
      </picture>
      <video ref={videoRef} data-hero-video className={`${styles.video} ${hasFrame ? styles.revealed : ""}`}
        autoPlay muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.brand} aria-label="EPIC Surf School" role="img">
        <Image src="/design/home-v2/hero/epic-logo.svg" width={198} height={123}
          alt="" unoptimized loading="eager" className={styles.epic} />
        <Image src="/brand/surf-school-hero-logo.svg" width={1115} height={155}
          alt="" unoptimized loading="eager" className={styles.school} />
      </div>
    </section>
  );
}

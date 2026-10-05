"use client";

import { useEffect, useId, useRef } from "react";

// The existing rental/forecast boundary, lifted 20 units for the lettering.
// Extra path at both ends keeps the loop restart outside the visible canvas.
const route = "M -360 1482 C -235 1394 -115 1309 0 1212 C 0 1212 228.127 1021.5 643.127 871 C 1058.13 720.5 1440.25 742 1440.25 742 C 1560 749 1690 762 1810 790";

export default function HomeV5RentalMarquee() {
  const svgRef = useRef(null);
  const pathId = `rental-marquee-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const svg = svgRef.current;
    const media = window.matchMedia("(min-width: 1200px) and (prefers-reduced-motion: no-preference)");
    let visible = false;
    const update = () => {
      const running = media.matches && visible && !document.hidden;
      svg.setAttribute("data-running", String(running));
      if (running) svg.unpauseAnimations();
      else svg.pauseAnimations();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    // Stretch the existing boundary horizontally while keeping each logo undistorted.
    // Foreground sections use a capped canvas; their background spans the viewport.
    const fit = () => {
      const canvasWidth = svg.parentElement.getBoundingClientRect().width;
      if (!canvasWidth) return;
      const ratio = window.innerWidth / canvasWidth;
      let coordinate = 0;
      const fittedRoute = route.replace(/-?\d+(?:\.\d+)?/g, value =>
        String(Number(value) * (coordinate++ % 2 === 0 ? ratio : 1)));
      svg.setAttribute("viewBox", `0 694.072 ${1440 * ratio} 538`);
      svg.querySelector("path").setAttribute("d", fittedRoute);
    };
    const seed = () => {
      fit();
      if (!media.matches) svg.setCurrentTime(18);
      update();
    };
    const resize = new ResizeObserver(fit);
    resize.observe(svg);
    fit();
    if (document.readyState === "complete") seed();
    else window.addEventListener("load", seed, { once: true });
    update();
    observer.observe(svg);
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("load", seed);
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return <svg ref={svgRef} className="home-v5-rental-marquee" viewBox="0 694.072 1440 538" aria-hidden="true" focusable="false">
    <defs><path id={pathId} d={route} /></defs>
    {Array.from({ length: 8 }, (_, index) => <g key={index} data-rental-marquee-wordmark>
      <image href="/design/home-v5/rentals-conditions-reviews/svg/rental-marquee-wordmark.svg" x="-112" y="-40" width="224" height="34" />
      <animateMotion dur="72s" begin={`${-index * 9}s`} rotate="auto" repeatCount="indefinite">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </g>)}
  </svg>;
}

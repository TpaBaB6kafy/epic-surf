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
    update();
    observer.observe(svg);
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
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

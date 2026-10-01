"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./home-v5-sunset.css";

/** One continuous sky behind the rental curve, forecast and transparent wave. */
export default function HomeV5SunsetScene({ children }) {
  const sceneRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  // Keep every layer on the measured section progress. Native ViewTimeline
  // acceleration in Motion 12.38 can use page progress for these opacity maps.
  const progress = useTransform(() => scrollYProgress.get());
  const warmth = useTransform(progress, [0, 0.2, 0.65, 1], [0, 0.08, 0.65, 1]);
  const sunlight = useTransform(progress, [0, 0.4, 0.8, 1], [0, 0.05, 0.7, 1]);
  const glowScale = useTransform(progress, [0, 1], [0.85, 1.12]);

  return (
    <div ref={sceneRef} data-home-v5-sunset-scene>
      <div data-home-v5-sunset-sky aria-hidden="true">
        <motion.div
          data-home-v5-sunset-warmth
          style={{ opacity: reducedMotion ? 0.75 : warmth }}
        />
        <motion.div
          data-home-v5-sunset-glow
          style={{ opacity: reducedMotion ? 0.8 : sunlight, scale: reducedMotion ? 1 : glowScale }}
        />
      </div>
      {children}
    </div>
  );
}

import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { links } from "../../data/links";
import { trackEvent } from "../../utils/tracking";

export default function RentalLocationMap({ lang }) {
  const ru = lang === "ru";
  const trackMap = () => trackEvent("google_maps_click", { language: lang, cta_location: "rental_comparison" });
  return <figure className="rv-comparison-map" aria-label={ru ? "Точка школы EPIC на Микхе" : "EPIC school location at My Khe"}>
    <div className="rv-map-canvas" data-latitude="16.0464674" data-longitude="108.2504812">
      <Image src="/design/rental-redesign/map/rental-map-background.svg" alt="" width={1414} height={490} unoptimized />
      {/* Anchor is the school symbol in the supplied schematic (780,218 / 1414,490). */}
      <a className="rv-school-marker" href={links.googleMaps} target="_blank" rel="noopener noreferrer" title={ru ? "Открыть Google Maps" : "Open Google Maps"} aria-label={ru ? "EPIC Surf School — открыть точку в Google Maps" : "EPIC Surf School — open location in Google Maps"} onClick={trackMap}><MapPin size={28} aria-hidden="true" /><span>EPIC</span></a>
    </div>
    <figcaption><span>EPIC Surf School · My Khe</span><a className="rv-map-link" href={links.googleMaps} target="_blank" rel="noopener noreferrer" onClick={trackMap}>{ru ? "Открыть Google Maps" : "Open Google Maps"}<ArrowRight size={18} aria-hidden="true" /></a></figcaption>
  </figure>;
}

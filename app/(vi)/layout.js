import "../globals.css";
import RootLayoutShell from "../components/RootLayoutShell";
import { buildMetadata, viewport } from "../data/siteConfig";

// /vi contains only the partner page. Do not emit an English homepage graph here.
export const metadata = buildMetadata("en");
export { viewport };

export default function VietnameseLayout({ children }) {
  return <RootLayoutShell locale="vi" includeHomepageStructuredData={false}>{children}</RootLayoutShell>;
}

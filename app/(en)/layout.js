import "../globals.css";
import RootLayoutShell from "../components/RootLayoutShell";
import { buildMetadata, viewport } from "../data/siteConfig";

export const metadata = buildMetadata("en");
export { viewport };

export default function EnglishLayout({ children }) {
  return <RootLayoutShell locale="en">{children}</RootLayoutShell>;
}

import "../globals.css";
import RootLayoutShell from "../components/RootLayoutShell";
import { buildMetadata, viewport } from "../data/siteConfig";

export const metadata = buildMetadata("ru");
export { viewport };

export default function RussianLayout({ children }) {
  return <RootLayoutShell locale="ru">{children}</RootLayoutShell>;
}

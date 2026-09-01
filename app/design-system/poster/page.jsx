import { PosterSystem } from "./PosterSystem.stories";
import "./poster-system.css";

export const metadata = {
  title: "Epic Surf Poster System Preview",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PosterSystemPreviewPage() {
  return <PosterSystem />;
}

import HomeV2Page from "../../../components/home-v2/HomeV2Page";

export const metadata = {
  title: "Epic Surf School Home V2 Preview",
  description: "Hidden visual experiment for Epic Surf School homepage.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function Page() {
  return <HomeV2Page locale="ru" />;
}

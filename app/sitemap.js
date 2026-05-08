import { languageAlternates, localizedUrl } from "./data/siteConfig";

export default function sitemap() {
  const alternates = {
    languages: languageAlternates(),
  };

  return [
    {
      url: localizedUrl("en"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates,
    },
    {
      url: localizedUrl("ru"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates,
    },
  ];
}

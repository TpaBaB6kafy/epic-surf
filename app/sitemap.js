import { absoluteUrl, languageAlternates, localizedUrl } from "./data/siteConfig";

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
    {
      url: absoluteUrl("/partners"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: absoluteUrl("/partners"),
          ru: absoluteUrl("/ru/partners"),
          "x-default": absoluteUrl("/partners"),
        },
      },
    },
    {
      url: absoluteUrl("/ru/partners"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: absoluteUrl("/partners"),
          ru: absoluteUrl("/ru/partners"),
          "x-default": absoluteUrl("/partners"),
        },
      },
    },
  ];
}

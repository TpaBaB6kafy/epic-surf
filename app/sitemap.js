import { absoluteUrl, languageAlternates, localizedUrl } from "./data/siteConfig";
import { seoPageLinks } from "./data/seoPages";

export default function sitemap() {
  const alternates = {
    languages: languageAlternates(),
  };

  const pages = [
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
          vi: absoluteUrl("/vi/partners"),
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
          vi: absoluteUrl("/vi/partners"),
          "x-default": absoluteUrl("/partners"),
        },
      },
    },
  ];

  pages.push({
    url: absoluteUrl("/vi/partners"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: absoluteUrl("/partners"), ru: absoluteUrl("/ru/partners"),
        vi: absoluteUrl("/vi/partners"), "x-default": absoluteUrl("/partners"),
      },
    },
  });

  seoPageLinks.forEach((page) => {
    const languages = { en: absoluteUrl(page.href), ru: absoluteUrl(`/ru${page.href}`), "x-default": absoluteUrl(page.href) };
    for (const locale of ["en", "ru"]) {
      pages.push({
        url: languages[locale],
        lastModified: new Date(),
        changeFrequency: page.href === "/surf-guide" ? "monthly" : "weekly",
        priority: page.href === "/surf-guide" ? 0.75 : 0.8,
        alternates: { languages },
      });
    }
  });

  return pages;
}

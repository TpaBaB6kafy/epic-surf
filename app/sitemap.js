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

  seoPageLinks.forEach((page) => {
    const isRentalPage = page.href === "/surfboard-rental-danang";

    pages.push({
      url: absoluteUrl(page.href),
      lastModified: new Date(),
      changeFrequency: page.href === "/surf-guide" ? "monthly" : "weekly",
      priority: page.href === "/surf-guide" ? 0.75 : 0.8,
      ...(isRentalPage
        ? {
            alternates: {
              languages: {
                en: absoluteUrl("/surfboard-rental-danang"),
                ru: absoluteUrl("/ru/surfboard-rental-danang"),
                "x-default": absoluteUrl("/surfboard-rental-danang"),
              },
            },
          }
        : {}),
    });
  });

  pages.push({
    url: absoluteUrl("/ru/surfboard-rental-danang"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        en: absoluteUrl("/surfboard-rental-danang"),
        ru: absoluteUrl("/ru/surfboard-rental-danang"),
        "x-default": absoluteUrl("/surfboard-rental-danang"),
      },
    },
  });

  return pages;
}

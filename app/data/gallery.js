import importedPhotos from "./gallery-imports.json";
import photoDescriptions from "./gallery-descriptions.json";

export const danangOpenPhotos = Array.from(
  { length: 30 },
  (_, idx) => `/gallery/events/danang-open-2025/danang-open-2025-${idx + 1}.webp`
);

export const birthdayPhotos = [
  "/gallery/events/birthday/epic-birthday-4.webp",
  "/gallery/events/birthday/epic-birthday-6.webp",
  "/gallery/events/birthday/epic-birthday-7.webp",
  "/gallery/events/birthday/epic-birthday-11-alt.webp",
  "/gallery/events/birthday/epic-birthday-8.webp",
  "/gallery/events/birthday/epic-birthday-12.webp",
  "/gallery/events/birthday/epic-birthday-5.webp",
  "/gallery/events/birthday/epic-birthday-1.webp",
  "/gallery/events/birthday/epic-birthday-2.webp",
  "/gallery/events/birthday/epic-birthday-10.webp",
  "/gallery/events/birthday/epic-birthday-13.webp",
  "/gallery/events/birthday/epic-birthday-11.webp",
];

export const lessonPhotos = [13, 14, 15, 16, 17, 18];
const importedAlbum = album => importedPhotos.filter(p => p.album === album).map(p => p.variants[2].src);
const umkaCoverOrder = [11, 2, 16, 24, 25];
const umkaAllPhotos = importedAlbum("umka-party");
export const umkaPhotos = [...umkaCoverOrder.map(n => umkaAllPhotos[n - 1]), ...umkaAllPhotos.filter((_, i) => !umkaCoverOrder.includes(i + 1))];
export const communityPhotos = [...importedAlbum("surf-life"), 3, 4, 5, 6, 7, 8];
const importedBySrc = new Map(importedPhotos.map(p => [p.variants[2].src, p]));
export const galleryPhotoDetails = (photo, lang) => {
  const entry = importedBySrc.get(photo);
  return entry ? { ...entry, alt: photoDescriptions[entry.id]?.[lang] || photoDescriptions[entry.id]?.en } : null;
};

export const interleavePhotos = (...groups) => {
  const maxLength = Math.max(...groups.map((group) => group.length));
  return Array.from({ length: maxLength }).flatMap((_, idx) =>
    groups.map((group) => group[idx]).filter(Boolean)
  );
};

export const getEventGalleryGroups = (lang) => {
  const mixedEventPhotos = interleavePhotos(danangOpenPhotos, birthdayPhotos, umkaPhotos, communityPhotos, lessonPhotos);

  return [
    { key: "all", label: lang === "ru" ? "Все" : "All", photos: mixedEventPhotos },
    { key: "surf-fest", label: "Da Nang Surfing Open 2025", photos: danangOpenPhotos },
    { key: "birthday", label: lang === "ru" ? "ДР школы" : "Birthday", photos: birthdayPhotos },
    { key: "lessons", label: lang === "ru" ? "Уроки" : "Lessons", photos: lessonPhotos },
    { key: "umka", label: lang === "ru" ? "Праздник Умка" : "Umka kids party", photos: umkaPhotos },
    { key: "community", label: lang === "ru" ? "Сёрфинг и пляж" : "Surf & beach", photos: communityPhotos },
  ];
};

export const galleryPhotoSrc = (photo) => (typeof photo === "string" ? photo : `/gallery/${photo}.webp`);

export const galleryLayoutClasses = [
  "col-span-6 row-span-2",
  "col-span-3 row-span-1",
  "col-span-3 row-span-1",
  "col-span-3 row-span-1",
  "col-span-3 row-span-1",
  "col-span-6 row-span-1",
  "col-span-6 row-span-1",
];

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

export const sunsetPhotos = [13, 14, 15, 16, 17, 18];
export const communityPhotos = [3, 4, 5, 6, 7, 8];

export const interleavePhotos = (...groups) => {
  const maxLength = Math.max(...groups.map((group) => group.length));
  return Array.from({ length: maxLength }).flatMap((_, idx) =>
    groups.map((group) => group[idx]).filter(Boolean)
  );
};

export const getEventGalleryGroups = (lang) => {
  const mixedEventPhotos = interleavePhotos(danangOpenPhotos, birthdayPhotos, sunsetPhotos, communityPhotos);

  return [
    { key: "all", label: "All", photos: mixedEventPhotos },
    { key: "surf-fest", label: "Da Nang Surfing Open 2025", photos: danangOpenPhotos },
    { key: "birthday", label: lang === "ru" ? "ДР школы" : "Birthday", photos: birthdayPhotos },
    { key: "sunset", label: "Sunset", photos: sunsetPhotos },
    { key: "community", label: "Community", photos: communityPhotos },
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

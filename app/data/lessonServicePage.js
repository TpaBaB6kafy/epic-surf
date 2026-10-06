import { translations } from './translations';
import { getSeoPageLinks } from './seoPages';

const offerIds = ['group', 'private', 'split', 'surf_skate', 'lineup_pro'];
const images = {
  group: '/design/home-v2/lessons/group-lesson-photo.png',
  private: '/design/home-v2/lessons/lesson-private-camera.webp',
  split: '/design/home-v2/lessons/lesson-split-camera.webp',
  surf_skate: '/design/home-v2/lessons/lesson-surf-skate-desktop.webp',
  lineup_pro: '/design/home-v2/lessons/lesson-line-up-camera.webp',
};
const processPhotos = ['meet-photo.webp', 'theory-photo.webp', 'practice-photo.webp', 'review-tips-camera.webp'];
const durations = [10, 15, 60, 10];

// Route content and destinations remain the source; this adapter supplies the
// concise presentation selected in the first visual mockup.
export function buildLessonServiceModel(page, locale) {
  if (page.sections.length !== 7 || page.sections[1].cards.length !== 3 || page.sections[2].cards.length !== 4) {
    throw new Error('Update the lesson presentation adapter for the changed content.');
  }
  const ru = locale === 'ru';
  const titles = ru ? ['Групповой', 'Индивидуальный', 'Для двоих', 'Сёрф-скейт', 'Line-up Pro'] : ['Group lesson', 'Private lesson', 'For two', 'Surf-skate', 'Line-up Pro'];
  const descriptions = ru ? [
    'Учись в лёгкой, живой атмосфере единомышленников.',
    'Личное внимание инструктора и темп под твой уровень.',
    'Занимайтесь вместе — с другом, партнёром или семьёй.',
    'Отрабатывай повороты и движения для сёрфинга на суше.',
    'Зелёные волны и проезды по стенке для продолжающих.',
  ] : [
    'Learn in a relaxed, lively group of like-minded people.',
    'One-on-one attention and a pace built around your level.',
    'Learn together with a friend, partner or family member.',
    'Build your surf technique and practice turns on land.',
    'Green waves and riding down the line for intermediate surfers.',
  ];
  const stepCopy = ru ? [
    'Знакомимся, подбираем доску и говорим о безопасности.',
    'Тренируем стойку и подъём на доску, учимся читать океан.',
    'Ловим волны с инструктором, исправляем ошибки и обретаем уверенность.',
    'Разбираем проезды и получаем советы для следующего выхода на воду.',
  ] : [
    'Meet the team, choose a board and talk through safety.',
    'Practice your stance and take-off, and learn to read the ocean.',
    'Catch waves with your instructor, fix mistakes and build confidence.',
    'Review your rides and get tips for your next surf.',
  ];
  const steps = page.sections[2].cards.map((card, i) => ({
    id: `step-${i + 1}`, title: ru ? ['Знакомство', 'Теория', 'Практика', 'Разбор'][i] : ['Meet & gear up', 'Beach theory', 'Ocean practice', 'Review & tips'][i],
    description: stepCopy[i], duration: `${durations[i]} ${ru ? 'мин' : 'min'}`,
    src: i === 0 ? images.group : `/design/home-v5/how-it-works/${processPhotos[i]}`, slot: `how-${i + 1}`,
  }));
  const originalFaq = page.faq.map((item, i) => ({ id: `faq-${i}`, q: item.question, a: item.answer }));
  const featuredIds = [0, 5, 4];
  const additional = originalFaq.filter((_, i) => !featuredIds.includes(i));
  for (const i of [0, 4, 5, 6]) {
    const section = page.sections[i];
    additional.push({ id: `context-${i}`, q: section.title, a: [section.body, ...(section.items || [])].filter(Boolean).join(' ') });
  }
  return {
    hero: {
      title: page.title,
      lines: ru ? ['Уроки', 'сёрфинга', 'в Дананге'] : ['Surf lessons', 'in Da Nang'],
      eyebrow: ru ? 'Пляж Микхе' : 'My Khe Beach',
      image: '/design/home-v5/how-it-works/practice-photo.webp',
      imageAlt: ru ? 'Ученики EPIC с досками выходят в океан' : 'EPIC students carrying their boards into the ocean',
      primaryCta: page.primaryCta,
    },
    sections: [
      { id: 'lesson-formats', kind: 'offers', title: ru ? 'Выбери свой формат' : 'Choose your lesson', offers: offerIds.map((id, i) => ({ id, title: titles[i], description: descriptions[i], price: translations[locale].cards.find(item => item.id === id).price.replace(/\s*VND$/, ''), image: images[id], fit: id === 'surf_skate' ? 'portrait' : 'cover', slot: `lesson-${id}`, contact: i > 2, actionLabel: i > 2 ? (ru ? "Записаться в WhatsApp" : "Book via WhatsApp") : undefined })) },
      { id: 'lesson-included', kind: 'included', title: ru ? 'Всё уже включено' : 'Everything is included', body: ru ? 'Тебе не нужно ничего покупать или брать в аренду — мы готовим всё для твоего комфорта.' : 'No need to buy or rent equipment — we prepare everything for your lesson.', items: ru ? ['Доска, лайкра и защита от солнца', 'Инструктор и помощь на воде', 'Фото и видео твоего урока'] : ['Board, rashguard and sun protection', 'Instructor and support in the water', 'Photos and videos of your lesson'] },
      { id: 'lesson-process', kind: 'process', title: ru ? 'Как проходит урок' : 'How your lesson works', body: ru ? 'От берега до первых волн.' : 'From the beach to your first waves.', steps },
    ],
    faq: featuredIds.map(i => originalFaq[i]), additionalFaq: additional,
    related: { title: ru ? 'Полезное о сёрфинге в Дананге' : 'More about surfing in Da Nang', items: getSeoPageLinks(locale).filter(item => page.related?.includes(item.href)) },
    contact: { title: ru ? 'Твоя первая волна — здесь' : 'Your first wave starts here', body: ru ? 'Запишись на урок или напиши нам — поможем выбрать формат и ответим на вопросы.' : 'Book a lesson or send us a message — we will help you choose a format and answer your questions.' },
    labels: { book: translations[locale].btnBook, faq: ru ? 'Частые вопросы' : 'Common questions', more: ru ? 'Ещё об уроках' : 'More about lessons' },
  };
}

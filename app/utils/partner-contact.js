import { links } from '../data/links';
import { buildTelegramUrl, buildWhatsAppUrl, buildZaloUrl } from './tracking';

// Preferred partnership channel for each supported page language.
const channels = { ru: ['telegram', buildTelegramUrl], en: ['whatsapp', buildWhatsAppUrl], vi: ['zalo', buildZaloUrl] };
export function getPartnerContact(locale) {
  const language = channels[locale] ? locale : 'en';
  const [channel, builder] = channels[language];
  const message = language === 'ru' ? 'Привет! Хочу обсудить партнёрство с Epic Surf School.' : language === 'vi' ? 'Xin chào Epic Surf School! Tôi muốn trao đổi về việc hợp tác.' : 'Hi Epic Surf School! I want to discuss a partnership.';
  return { channel, href: links[channel], eventName: `${channel}_click`, buildHref: () => builder(links[channel], message, { language, includePartnerCode: true }) };
}

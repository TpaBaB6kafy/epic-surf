"use client";

const ATTRIBUTION_KEY = "epic_surf_attribution";
const ATTRIBUTION_PARAMS = [
  "partner",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
];
const PARTNER_LEAD_EVENTS = new Set([
  "booking_cta_click",
  "whatsapp_click",
  "telegram_click",
  "zalo_click",
  "rental_cta_click",
  "partner_cta_click",
]);

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const UMAMI_SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

function isBrowser() {
  return typeof window !== "undefined";
}

function readStorage() {
  if (!isBrowser()) return {};

  try {
    return JSON.parse(window.localStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStorage(value) {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value));
  } catch {
    // Tracking must never break booking or messenger links.
  }
}

export function storeAttributionFromUrl(options = {}) {
  if (!isBrowser()) return {};

  const { includePartner = false } = options;
  const allowedParams = includePartner
    ? ATTRIBUTION_PARAMS
    : ATTRIBUTION_PARAMS.filter((key) => key !== "partner");
  const params = new URLSearchParams(window.location.search);
  const current = readStorage();
  const next = { ...current };
  let changed = false;

  allowedParams.forEach((key) => {
    const value = params.get(key);
    if (value) {
      next[key] = value;
      changed = true;
    }
  });

  if (changed) {
    next.landing_page = window.location.pathname;
    next.stored_at = new Date().toISOString();
    writeStorage(next);
  }

  return next;
}

export function getStoredAttribution() {
  return readStorage();
}

export function getPartnerCode() {
  return getStoredAttribution().partner || "";
}

export function buildMessageWithPartnerCode(message, language = "en") {
  const partner = getPartnerCode();
  if (!partner) return message;

  const label = language === "ru" ? "\u041a\u043e\u0434 \u043f\u0430\u0440\u0442\u043d\u0451\u0440\u0430" : "Partner code";
  return `${message} ${label}: ${partner}`;
}

export function getTrackingContext(extra = {}, event = "") {
  const attribution = getStoredAttribution();
  const pagePath = isBrowser() ? window.location.pathname : "";
  const isPartnerContext = extra.service_type === "partnership" || pagePath.includes("/partners");
  const isPartnerLeadEvent = PARTNER_LEAD_EVENTS.has(event);
  const scopedAttribution = { ...attribution };

  if (!isPartnerContext && !isPartnerLeadEvent) {
    delete scopedAttribution.partner;
  }

  return {
    ...scopedAttribution,
    page_path: pagePath,
    ...extra,
  };
}

export function trackEvent(event, payload = {}) {
  if (!isBrowser() || !event) return;

  const eventPayload = getTrackingContext(payload, event);

  if (GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...eventPayload,
    });
  }

  if (UMAMI_SCRIPT_URL && UMAMI_WEBSITE_ID && typeof window.umami?.track === "function") {
    window.umami.track(event, eventPayload);
  }
}

export function buildWhatsAppUrl(baseUrl, message, options = {}) {
  const { language = "en", includePartnerCode = true } = options;
  const separator = baseUrl.includes("?") ? "&" : "?";
  const text = includePartnerCode ? buildMessageWithPartnerCode(message, language) : message;
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}

export function buildTelegramUrl(baseUrl, message, options = {}) {
  const { language = "en", includePartnerCode = true } = options;
  const text = includePartnerCode ? buildMessageWithPartnerCode(message, language) : message;
  const encodedMessage = encodeURIComponent(text);
  return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}text=${encodedMessage}`;
}

export function buildZaloUrl(baseUrl, message, options = {}) {
  const { language = "en", includePartnerCode = true } = options;
  const text = includePartnerCode ? buildMessageWithPartnerCode(message, language) : message;
  const encodedMessage = encodeURIComponent(text);
  return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}text=${encodedMessage}`;
}

export function getHrefWithCurrentQuery(path) {
  if (!isBrowser()) return path;

  const currentQuery = window.location.search;
  if (!currentQuery || path.includes("?") || path.startsWith("#")) return path;

  return `${path}${currentQuery}`;
}

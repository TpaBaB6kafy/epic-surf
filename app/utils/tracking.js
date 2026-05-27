"use client";

const ATTRIBUTION_KEY = "epic_surf_attribution";
const ATTRIBUTION_PARAMS = [
  "partner",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
];

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

  const label = language === "ru" ? "Код партнёра" : "Partner code";
  return `${message} ${label}: ${partner}`;
}

export function getTrackingContext(extra = {}) {
  const attribution = getStoredAttribution();
  const pagePath = isBrowser() ? window.location.pathname : "";
  const isPartnerContext = extra.service_type === "partnership" || pagePath.includes("/partners");
  const scopedAttribution = { ...attribution };

  if (!isPartnerContext) {
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

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...getTrackingContext(payload),
  });
}

export function buildWhatsAppUrl(baseUrl, message, options = {}) {
  const { language = "en", includePartnerCode = false } = options;
  const separator = baseUrl.includes("?") ? "&" : "?";
  const text = includePartnerCode ? buildMessageWithPartnerCode(message, language) : message;
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}

export function buildTelegramUrl(baseUrl, message, options = {}) {
  const { language = "en", includePartnerCode = false } = options;
  const text = includePartnerCode ? buildMessageWithPartnerCode(message, language) : message;
  const encodedMessage = encodeURIComponent(text);
  return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}text=${encodedMessage}`;
}

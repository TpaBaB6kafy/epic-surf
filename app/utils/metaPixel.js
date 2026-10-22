export const META_PIXEL_ID = "2326198411479887";

const PRODUCTION_HOSTS = new Set(["surfdanang.com", "www.surfdanang.com"]);
const SDK_URL = "https://connect.facebook.net/en_US/fbevents.js";

export function trackMetaPageView(pathname) {
  if (
    typeof window === "undefined" ||
    !PRODUCTION_HOSTS.has(window.location.hostname) ||
    !pathname ||
    /^\/design-system(?:\/|$)/.test(pathname)
  ) {
    return false;
  }

  try {
    const state = window.__epicMetaPixel || (window.__epicMetaPixel = {});

    if (!window.fbq) {
      const fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
    }

    // Next.js pathname changes are tracked below. Meta's own history listener
    // would otherwise count the same navigation again, including hash changes.
    // Set this before loading the SDK, while it can still skip that listener.
    window.fbq.disablePushState = true;

    // Keep the queue available before the asynchronous SDK finishes loading.
    if (!state.scriptRequested && !document.querySelector(`script[src="${SDK_URL}"]`)) {
      const script = document.createElement("script");
      script.id = "epic-meta-pixel-sdk";
      script.async = true;
      script.src = SDK_URL;
      document.head.appendChild(script);
    }
    state.scriptRequested = true;

    if (!state.initialized) {
      window.fbq("init", META_PIXEL_ID);
      state.initialized = true;
    }

    // React effect replays and re-renders must not create extra page views.
    // Returning to an earlier route after visiting another route is a new view.
    if (state.lastPathname === pathname) return false;

    window.fbq("trackSingle", META_PIXEL_ID, "PageView");
    state.lastPathname = pathname;
    return true;
  } catch {
    // Advertising scripts must never interrupt navigation or booking.
    return false;
  }
}

// One file is selected before any media request; unsupported/inefficient AV1 falls back to H.264.
export async function selectHeroVideo(variant, capabilities = globalThis.navigator?.mediaCapabilities) {
  const mobile = variant === "mobile";
  const base = `/video/hero/${mobile ? "mobile" : "desktop"}-v2`;
  const fallback = { src: `${base}.mp4`, fallbackSrc: `${base}.mp4`, codec: "h264" };
  if (!capabilities?.decodingInfo) return fallback;

  let timer;
  try {
    const result = await Promise.race([
      capabilities.decodingInfo({
        type: "file",
        video: {
          contentType: mobile ? 'video/mp4; codecs="av01.0.08M.08"' : 'video/mp4; codecs="av01.0.09M.08"',
          width: mobile ? 720 : 1920,
          height: mobile ? 1280 : 1080,
          bitrate: mobile ? 4500000 : 12000000,
          framerate: 60000 / 1001,
        },
      }),
      new Promise((resolve) => { timer = setTimeout(() => resolve(null), 400); }),
    ]);
    return result?.supported && result.smooth && result.powerEfficient
      ? { ...fallback, src: `${base}.av1.mp4`, codec: "av1" }
      : fallback;
  } catch {
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

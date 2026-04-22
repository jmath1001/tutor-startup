const DEFAULT_SITE_URL = "https://thetix.dev";

export function getSiteUrl(): string {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;
}

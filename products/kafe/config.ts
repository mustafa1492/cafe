// Kafeye özel ad ve ayarlar. core/ bu dosyayı import etmez.

export type CafeConfig = {
  /** Ekranda görünen kafe adı. */
  name: string;
  /** QR adresindeki kafe kısmı: /m/<slug>/<masa> */
  slug: string;
  /** Kısa ad (PWA ana ekran simgesi altında). */
  shortName: string;
  locale: string;
  timeZone: string;
  currency: string;
};

// KARAR BEKLİYOR: gerçek kafe adı ve slug
export const cafeConfig: CafeConfig = {
  name: "Demo Kafe",
  slug: "demo",
  shortName: "Demo Kafe",
  locale: "tr-TR",
  timeZone: "Europe/Istanbul",
  currency: "TRY",
};

/** Verilen slug bu kafeye ait mi? */
export function isKnownCafeSlug(slug: string): boolean {
  return slug === cafeConfig.slug;
}

/** Örnek masalar. Kod tahmin edilemez (numara değil), QR adresi /m/<slug>/<code>. */
// ÖRNEK: gerçek masalar veritabanından gelecek
export const sampleTables: { label: string; code: string }[] = [
  { label: "Masa 1", code: "vw9b6g3f" },
  { label: "Masa 2", code: "3v6zahva" },
  { label: "Masa 3", code: "rcbw9a3p" },
  { label: "Masa 4", code: "6z45yume" },
  { label: "Masa 5", code: "v8gkb2es" },
  { label: "Masa 6", code: "jnejvtr2" },
  { label: "Masa 7", code: "9636mqe3" },
  { label: "Masa 8", code: "xg8bhcv2" },
];

/** Sitenin kök adresi (sondaki / atılır). Ayarlı değilse localhost. */
export function siteUrl(): string {
  const v = process.env.NEXT_PUBLIC_SITE_URL;
  return v && v.trim() ? v.trim().replace(/\/+$/, "") : "http://localhost:3000";
}

/** Adres ortam değişkeninden mi geliyor? */
export function siteUrlIsSet(): boolean {
  return !!process.env.NEXT_PUBLIC_SITE_URL?.trim();
}

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

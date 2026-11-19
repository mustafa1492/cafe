# Kafe oturum notu

**Dal:** `gelistirme` (canlı: `main`, sadece Mustafa) · **Teslim:** 9 Aralık 2026

## Kaldığımız yer
Next.js iskeleti kuruldu (dört yer tutucu ekran, Türkçe 404, PWA, `core/ui` ve `core/supabase` kopyalandı); `core/auth` garson kararını bekliyor. Sıradaki adım: 2. madde, kafe bilgileri Konusunun cevabı gelince veritabanı ve yayın kararı.

**Bekleyen kararlar (Mustafa'nın kararı):** gerçek kafe adı ve slug (şimdilik "Demo Kafe", `demo`); masa adresinde numara mı gizli kod mu.
**Notlar:** `core/ui/ui.css`'te bazı öğeler 48 px, bir yazı ~12 px (kural 56/16); bu ekranlarda kullanılmıyor, kullanılmadan önce core'da düzeltilmeli. npm audit: Next içindeki postcss'te 2 açık (Next 16 gerekiyor).

## Yapılacaklar (sırayla)
1. [x] Muhammed'in devir dosyasını al (Konuda) → `docs/arkadas-oturumu.md`, ardından raporu güncelle.
2. Kafe bilgileri Konusu cevaplanınca veritabanı ve yayın kararını ver.
3. [~] Next.js iskeletini ve gerekli ortak parçaları (`core/ui`, `core/auth`, `core/supabase`) kur. İskelet, `core/ui` ve `core/supabase` bitti; `core/auth` garson kararını (rol yapısı) bekliyor.
4. 5 ekranın tasarımını, veri modelini, RLS'yi ve `siparis_ver` RPC'yi hazırla.
5. Geliştir: müşteri menüsü + mutfak → garson/kasa → yönetici. Simülasyon için `scripts/kafe-sim.cjs`.
6. Pilot 2–4 Aralık, site ve baskı 3–7 Aralık, yayın 8–9 Aralık. Plan: `rapor.md` §8.

## Günlük (en fazla 10 satır, satır başına tek cümle; başına hesabı yaz)
- 19 Kas [Mustafa]: repo ve kurallar kuruldu; Genelprojeler `modul/kafe` dalındaki hazır dosyalar, rapor, bütçe ve Muhammed'in devir dosyası taşındı.
- 19 Kas [Mustafa]: `/is` ile Next.js iskeleti kuruldu (2 tur: tur 1 DÜZELT — `.gitignore`'da tsbuildinfo yok, 404 İngilizce; tur 2 GEÇTİ; inceleme gerekmedi, veritabanı/para yok).

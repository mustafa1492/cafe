# Kafe oturum notu

**Dal:** `gelistirme` (canlı: `main`, sadece Mustafa) · **Teslim:** 9 Aralık 2026

## Kaldığımız yer
19 Kas akşamı oturum kapandı. Hazırlık bitti: kurallar, ajan ağı (`/is`), Next.js iskeleti, teknik plan (`teknik-plan.md`), Muhammed'in planının özeti (`arkadas-oturumu-ozet.md`). Muhammed'in başlangıç yolu kontrol edildi. **20 Kas sabahı ilk iş (Mustafa, kendi bilgisayarından):** (1) Muhammed'i collaborator olarak ekle ve GitHub adını oturuma yaz; ana oturum bu adı `ekip.md`, `nobet.md` ve `ilk-konular.md`'deki "atanan: -" yerlerine işler. (2) `bash scripts/kurulum-konular.sh` çalıştır. (3) Varsayılan dalı `main` yap. Sonra Muhammed kurulum, `/ogren` ve `/gorusme kafe sahibi` ile devam eder. Kafe sahibiyle görüşme 21 Kas.

**Bekleyen kararlar (Mustafa):**
- Kafede garson var mı? Cevaba göre rol yapısı ve `core/auth` belirlenir.
- Ücretsiz denemede masrafı kim öder?
- Atölye açıkları kafe takviminden çıkarılsın mı?
- Gerçek kafe adı ve slug.
- Ücretler.

**Notlar:** `core/ui/ui.css`'te bazı öğeler 48 px, bir yazı ~12 px (kural 56/16). Kullanılmadan önce core'da düzeltilmeli. npm audit: Next içindeki postcss'te 2 açık (Next 16 gerekiyor). Bulut oturumundan Konu açılamıyor, repo ayarı da değiştirilemiyor; bu işler Mustafa'nın bilgisayarından yapılır. Genelprojeler'deki `modul/kafe` dalının notu (`docs/moduller/kafe.md`) hâlâ "repo açılacak" diyor, oraya "kafe artık `mustafa1492/cafe` reposunda" diye bir satır eklenmeli (o projenin oturumunda).

## Yapılacaklar (sırayla)
1. [x] Muhammed'in devir dosyasını al → `docs/arkadas-oturumu.md`, özetle ve raporu güncelle.
2. [ ] Muhammed'i ekle, Konuları aç (20 Kas sabahı).
3. [ ] Kafe sahibiyle görüşme (21 Kas) → kararlar → veri modeli kesinleşir.
4. [~] Next.js iskeleti ve ortak parçalar: iskelet, `core/ui` ve `core/supabase` bitti; `core/auth` garson kararını bekliyor.
5. [ ] 5 ekran + 3 site yönü (Design), veri modeli, RLS, `siparis_ver`, `odeme_al` (kilitli, çok kişili ödeme).
6. [ ] 25 Kas: Supabase (Frankfurt) ve Vercel (geçici adres); 3 Ara: alan adı + Auth adresleri + Meta TXT; 8 Ara: Vercel Pro.
6b. [ ] Müşteri ekranı adresi `/m/[kafe]/[masa]` kalır; `[masa]` numara değil tahmin edilemez kod olur (iskelette zaten düz metin).
7. [ ] Geliştir: müşteri menüsü + mutfak → kasa/garson → yönetim. `scripts/kafe-sim.cjs` (3 kişinin aynı anda ödemesi dahil).
7b. [ ] Sosyal medya (`sosyal-medya-plan.md`): 22–28 Kas profil düzeni, 24–30 Kas çekim, 1–7 Ara yayın öncesi gönderiler, 8 Ara yayın, sonra haftalık döngü.
8. [ ] Pilot 2–4 Ara; site, Meta ve baskı 3–7 Ara; yayın 8–9 Ara. Plan: `rapor.md` §8, `teknik-plan.md` §7.

## Günlük (en fazla 10 satır, satır başına tek cümle; başına hesabı yaz)
- 19 Kas [Mustafa]: repo ve kurallar kuruldu; Genelprojeler `modul/kafe` dalındaki hazır dosyalar, rapor, bütçe ve Muhammed'in devir dosyası taşındı.
- 19 Kas [Mustafa]: ajan ağı kuruldu (kodcu, deneyici, inceleme, veritabanı, sekreter; `/is`), ajanlar sadece bu repoda çalışır.
- 19 Kas [Mustafa]: `/is` ile Next.js iskeleti kuruldu (2 tur: tur 1 DÜZELT, tur 2 GEÇTİ).
- 19 Kas [Mustafa]: Muhammed'in başlangıç yolunda 5 hata düzeltildi (`cd cafe`, `npm install`, Konu adı, ogren sütunu, sıra istisnası).
- 19 Kas [Mustafa]: teknik plan yazıldı, `ui-ux-pro-max` skill'i eklendi, Muhammed'in planı özetlendi.
- 19 Kas [Mustafa]: `/is` ile masa QR kartları sayfası (/kafe/yonetim/qr): kodcu + deneyici (haiku) 2 tur, QR OpenCV ile okundu.
- 19 Kas [Mustafa]: `/is` ile gerçek tarayıcı testi (`npm run ekran`): ilk çalıştırma core/ui renk değişkenlerinin tanımsız olduğunu yakaladı (düğmeler okunmuyordu), 2. turda GEÇTİ.
- 19 Kas [Mustafa]: ajanlar: tasarımcı eklendi, deneyici ve sekreter haiku, sabah raporu (Mustafa: 07.42 zamanlanmış görev; Muhammed: günün ilk oturumunda kanca).
- 19 Kas [Mustafa]: karar: hesabı kasa böler ve kapatır (kasa = yönetici), sipariş doğrudan mutfağa düşer; ilk onay Muhammed'le konuşulacak.
- 19 Kas [Mustafa]: kararlar: site özel tasarım bu projede, alan adı 3 Ara, Vercel Pro 8 Ara, her masaya 1 QR, siparişi müşteri onaylar, personel onayı yok.

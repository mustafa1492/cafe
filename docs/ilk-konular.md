# İlk Konular

Repo açılınca `scripts/kurulum-konular.sh` bu dosyadaki her bölümü bir GitHub Konusu olarak açar. Açıldıktan sonra bu dosya değişmez; konuşma Konularda devam eder. Atanan kişinin GitHub adı henüz bilinmiyorsa `-` yazılır, ad öğrenilince atanır.

## Muhammed'in ilk görevi: tasarım dosyalarını repoya ekle | atanan: - | etiket: iş
@Muhammed (GitHub adı gelince atanacak): kurulumu bitirdikten sonra ilk işin bu. Adımlar: `docs/egitim/ilk-is-tasarim.md`

- [ ] Tasarım sohbetinden 5 dosyayı indir (canvas.json, Main, Musteri2, Mutfak, Yonetici .dc.html)
- [ ] Claude'a `gelen/2026-11-tasarim/` klasörüne ekletip push ettir
- [ ] Bu Konuya "eklendi" yaz, Mustafa kontrol edip kapatır

## Kafe bilgileri: kafe sahibine sorulacaklar | atanan: - | etiket: soru
@Muhammed (GitHub adı gelince atanacak): görüşmeden önce `/gorusme kafe sahibi`, sonra `/aktar` yaz; Claude cevapları buraya işler. Hepsini bir seferde bilmen gerekmiyor.

- [ ] Kafenin adı ve adresi?
- [ ] Kaç masa var, bölüm var mı (iç salon, bahçe, teras), masa numaraları nasıl?
- [ ] Kaç garson çalışıyor, mutfak ve bar ayrı mı?
- [ ] Ödeme masada mı alınıyor, kasada mı? POS ve yazar kasa hangi marka/model?
- [ ] e-Fatura/e-Arşiv mükellefi mi, GİB'den e-Adisyon bildirimi geldi mi? (muhasebeciye)
- [ ] Ürün listesi ve fiyatlar kimde? Fotoğraflar var mı, çekilecek mi?
- [ ] Wi-Fi var mı? Mutfak/bar için tablet var mı, alınacak mı?
- [ ] Instagram ve Google İşletme hesabı var mı, girişi kimde?
- [ ] Aylık reklam bütçesi? Masa QR kartları için matbaa fiyatı alındı mı?
- [ ] Kafe sahibi haftada ne kadar zaman ayırabilir (menü girişi, onaylar)?
- [ ] Supabase ve yayın masrafları için kendi kartını kullanacak mı? (25 Kasım'a kadar)

## Muhammed: devir dosyası, tasarım, Firebase | atanan: - | etiket: soru
- [x] Devir dosyası geldi → `docs/arkadas-oturumu.md` (19 Kas)
- [ ] Planında Firebase vardı; Supabase'e geçmemize itirazın var mı?
- [ ] Senin sohbetindeki 2 açık soru: QR adresinde tahmin edilemez masa kodu olsun mu? Ödemeyi kasada kim "alındı" diye onaylayacak (yönetici / mutfak / ayrı kasa rolü)?

## Mustafa: bekleyen kararlar | atanan: mustafa1492 | etiket: karar
- [ ] Yayın yeri: Vercel Pro (öneri, 20 $/ay) mı Cloudflare (5 $/ay, +1–2 gün iş) mı?
- [ ] Veritabanı: ayrı Supabase kuruluşu + Pro (öneri, 25 $/ay, kafenin kartı) mı?
- [ ] Ücretler: kurulum, aylık bakım + sosyal medya
- [ ] 19 Kas kontrolünde bulunan 4 uyumsuzluk:
  - Garson onayı masa başına mı olacak, her yeni telefonun ilk siparişine mi? (Öneri: telefon başına. Masa başına olursa masa açıkken QR'ın fotoğrafını çeken biri evden sipariş atabilir.)
  - Hesabı kim bölecek, müşteri telefondan mı, garson/kasa mı? Muhammed'in tasarımında müşteri bölüyor, bizim raporda kasa.
  - Kafede garson yoksa ilk siparişi kim onaylayacak?
  - Deneme 2 ay ücretsizse ilk 2 ayın masrafını kim ödeyecek? (butce.md kafenin ödeyeceğini varsayıyor)
- [ ] Muhammed'in planıyla bizim planımızın farkları (ayrıntı: `docs/arkadas-oturumu.md` ve 19 Kas sohbeti): Firebase mi Supabase mi; çok restoranlı abonelik ürünü mü, önce tek kafe mi; müşterinin kendi hesabını bölmesi; logo/renk marka ayarı; garson/kasa ekranı; masa onayı mı gizli QR kodu mu

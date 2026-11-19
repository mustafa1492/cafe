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
- [ ] **Senin fikrin lazım: QR nasıl çalışsın?** (Ödemeyi kimin onaylayacağı karara bağlandı: kasa, 19 Kas.)
  - **a) Masaya özel QR:** Her masada o masanın kartı olur. Müşteri okutunca menü "Masa 5" diye açılır. Artısı: müşteri masa seçmekle uğraşmaz, yanlış masa riski yoktur. Eksisi: masa sayısı kadar kart basılır, masalar yer değiştirirse kartlar da taşınır.
  - **b) QR sonrası masa seçimi:** Kafede aynı QR her yerde olur (masada, kasada, vitrinde). Müşteri okutunca önce masasını seçer. Artısı: tek tasarım, ucuz baskı, masa düzeni değişse de kart değişmez. Eksisi: müşteri yanlış masa seçebilir, evden de bir masa seçip sipariş atabilir. Bu yüzden ilk sipariş onayı daha önemli hale gelir.
  - Mustafa (b)'ye yakın. Kafeyi sen biliyorsun: hangisi daha uygun, neden?
- [ ] Mustafa'yla konuşulacak: müşterinin siparişi doğrudan mutfağa düşecek. Evden sahte siparişe karşı her yeni telefonun ilk siparişini kasa ya da garson onaylasın mı, yoksa gizli masa kodu ve hız sınırı yeterli mi?

## Mustafa: bekleyen kararlar | atanan: mustafa1492 | etiket: karar
- [ ] Yayın yeri: Vercel Pro (öneri, 20 $/ay) mı Cloudflare (5 $/ay, +1–2 gün iş) mı?
- [ ] Veritabanı: ayrı Supabase kuruluşu + Pro (öneri, 25 $/ay, kafenin kartı) mı?
- [ ] Ücretler: kurulum, aylık bakım + sosyal medya
- [ ] 19 Kas kontrolünde bulunan 4 uyumsuzluk:
  - İlk sipariş onayı kalacak mı? Muhammed'le konuşulacak. Kalırsa telefon başına olmalı, çünkü masa başına olursa masa açıkken QR'ın fotoğrafını çeken biri evden sipariş atabilir.
  - Kafede garson yoksa ilk siparişi kim onaylayacak?
  - Deneme 2 ay ücretsizse ilk 2 ayın masrafını kim ödeyecek? (butce.md kafenin ödeyeceğini varsayıyor)
- [x] Teknik plan önerileri (19 Kas): site özel tasarım; alan adı 3 Ara; Vercel Pro 8 Ara; müşteri masasını kendisi seçer.
- [ ] Site atölyeden yayınlanmayacağına göre atölyedeki 3 açık kafe takviminden çıkarılsın mı?
- [ ] Muhammed'in planıyla bizim planımızın farkları (ayrıntı: `docs/arkadas-oturumu.md` ve 19 Kas sohbeti): Firebase mi Supabase mi; çok restoranlı abonelik ürünü mü, önce tek kafe mi; müşterinin kendi hesabını bölmesi; logo/renk marka ayarı; garson/kasa ekranı; masa onayı mı gizli QR kodu mu

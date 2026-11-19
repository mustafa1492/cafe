# Muhammed'in planı: düzenlenmiş özet

> Kaynak: `arkadas-oturumu.md` (Muhammed'in Claude sohbetinden çıkan devir dosyası, 17–19 Kasım). O dosya olduğu gibi saklanır. Bu dosya Mustafa'nın okuması için hazırlanmış özettir ve her maddenin bizim plandaki karşılığını gösterir.
> İşaretler: ✅ aynen alındı · 🔁 değişti · ❓ karar bekliyor · ⏭ sonraya kaldı

## 1. Muhammed ne istiyordu
Kafe ve restoranlara aylık abonelikle satılacak bir QR sipariş uygulaması. Müşteri QR'ı okutur ve uygulama kurmadan menüyü açar, sepete ekler, sipariş verir. Sipariş mutfağa anında düşer. Masadakiler hesabı kişi kişi bölüp kasada öder. Restoran sahibi menüyü, markasını (logo ve renk) ve masa QR'larını yönetir. İlk aşama tek bir kafede 2 ay deneme olacaktı, ama yapı baştan çok restoranlı kurulacaktı.

## 2. Ne yapılmıştı
- **Tıklanabilir prototip (Claude Design, 2 sürüm):** müşteri ekranı (logolu ve logosuz iki örnek), mutfak paneli, yönetici paneli. Ekranlar birbirine bağlı değil, veriler örnek, QR'lar sahte. Prototip hiç denenmedi ve Muhammed geri bildirim vermedi.
- **Veritabanı şeması önerisi (Firebase):** çizildi ama onaylanmadı. Güvenlik kuralları ve testler yazılmadı.
- **Gerçek kod yok.**

## 3. Kararları ve bizdeki karşılığı
| Muhammed'in planı | Bizde |
| --- | --- |
| Çok restoranlı, abonelikli ürün | 🔁 Önce tek kafe teslim edilecek (9 Ara). Her tabloda `business_id` olduğu için sonra çok restorana açılır |
| Web uygulaması (PWA), telefon öncelikli, Türkçe, TL | ✅ |
| Firebase (Firestore + Authentication + Hosting) | 🔁 Supabase (Postgres + RLS + Realtime) + Vercel. Muhammed'e itirazı var mı diye soruldu |
| İlk sürümde online ödeme yok, para kasada alınır | ✅ |
| Logo ve renk marka ayarı, kontrast kontrolü | ❓ İlk sürümde olacak mı, karar bekliyor. Kontrast hesabı (yazı rengini otomatik koyulaştırma) işe yarar, alınabilir |
| İki panel: mutfak ve yönetici, ayrı giriş | ✅ Biz buna garson/kasa ekranını ekledik |
| Mutfak hesabı yönetici paneline giremez, müşteri girişsiz | ✅ |
| Adresler `/r/<kafe>/masa/<no>` | 🔁 Bizde `/m/<kafe>/<masa>` ve `/kafe/mutfak`, `/kafe/garson`, `/kafe/yonetim` |
| Masanın açık hesabı ("adisyon"): siparişler ona yazılır, kasa kapatır | ✅ Fikir aynen alındı. Ekranda "masa hesabı" yazar, çünkü sistem resmi e-Adisyon değil |
| Her "ödeyeceğim" işareti ayrı ödeme kaydı | ✅ |
| Müşteriye görünmez anonim kimlik | ✅ Bizde cihaz kimliği. Ad ve telefon istenmez |
| Fiyatı müşteri yazamaz, tükenen ürün reddedilir | ✅ `siparis_ver` kapısı fiyatı veritabanından alır |
| QR'da tahmin edilemez masa kodu | ❓ Soruldu, cevap yok. Öneri: evet |
| Ödemeyi kasada kim "alındı" diye onaylar? | ❓ Cevap yok. Seçenekler: yönetici / mutfak / ayrı kasa rolü |
| Abonelik alanı ve "süper yönetici" | ⏭ Tek kafede gerek yok, ürünleşince |
| Ödeme kaydında isteğe bağlı müşteri adı (`kisiAdi`) | 🔁 Bizde yok, müşteriden ad istenmez |

## 4. Ekranlardan neler alınacak
- **Müşteri:** kategori hapları, ürün kartı (fotoğraf, açıklama, fiyat, +/− sayaç, "Tükendi"), sepet ve mutfağa not, "Siparişlerim" bölümünde 4 adımlı durum (Yeni → Hazırlanıyor → Hazır → Servis edildi), "Garson çağır", alt sekmeler (Menü / Siparişlerim / Hesap). ✅
- **Hesap bölme ekranı:** masa toplamı, ödenen, kalan, kalem seçimi, "Böl" (2–4 kişi). ❓ Bu ekran müşteride mi olacak, kasada mı? Karar bekliyor.
- **Mutfak:** 4 sütunlu pano, "YENİ GELDİ" rozeti, garson çağrısı şeridi, ürün durumu (Satışta/Tükendi). Fiyat ve ciro görünmez. ✅ Garson çağrısı bizde garson ekranına da düşer.
- **Yönetici:** günün özeti (ciro, sipariş sayısı, ortalama hesap, en çok satanlar), menü yönetimi, masa sayısı ve QR kartları. ✅ Marka ve renk sekmesi ❓
- **Görünüm:** Inter yazı tipi, "stone" renk paleti ve elle çizilmiş çizgi ikonlar, emoji yok. Bunlar başlangıç noktası, son görünüm tasarım onayında belirlenecek.

## 5. Muhammed'in sohbetinde açık kalanlar
1. Gizli masa kodu kullanılsın mı? ❓
2. Ödemeyi kim onaylar? ❓
3. Şemanın genel onayı. Bizde Supabase'e göre yeniden yazılacak.
4. Masa hesabını kim kapatır, masa nasıl boşalır? Bizde garson/kasa ekranı. ❓ Garson var mı?
5. Garson rolü olacak mı? ❓
6. Personel hesapları nasıl açılacak? Bizde yönetici WhatsApp davet bağlantısıyla ekler (öneri).
7. Kafenin adı, yeri, masa sayısı, personel durumu bilinmiyor. Kafe sahibiyle görüşmede sorulacak.
8. Alan adı bilinmiyor. Kafe adına alınacak (öneri: 25 Kas).
9. Abonelik ücreti ⏭
10. Siparişleri geçici kapatma düğmesi. Bizde `businesses` tablosunda var (öneri).
11. Prototipe geri bildirim verilmedi. Tasarım onayında (24 Kas) kafe sahibiyle birlikte verilecek.

## 6. Muhammed'in sohbetindeki çalışma kuralları
Türkçe konuşulacak, adım adım ilerlenecek ve her adım basit anlatılacak. Her adımın sonunda gözle görülebilir bir çıktı verilecek, kullanıcı "tamam" demeden sonraki adıma geçilmeyecek. Veritabanı için önce şema onaylanacak, kod sonra yazılacak. Bizdeki karşılığı: Muhammed'in hesabındaki Claude günlük dille konuşur, kod öğretmez, karar gerektiren her şey Mustafa'ya gider (CLAUDE.md §0, §3).

# Ekip ve iş bölümü

| Hesap | Kim | Alanı | GitHub | Claude planı |
| --- | --- | --- | --- | --- |
| Mustafa | Mustafa Özçoban | **teknik ve yapay zeka**: kod, sistem, kararlar, canlıya alma | mustafa1492 | Pro |
| Muhammed | kafede çalışan arkadaş | **gerçek hayat ve insanlar**: kafe sahibi, personel, matbaa, hesaplar, sahadan geri bildirim | (yazılacak) | Pro |
| (Gürkan) | arkadaş, henüz projede değil | sonra konuşulacak | — | — |

## İş bölümü
**Muhammed (sahada, insanlarla):**
- Kafe sahibiyle görüşmeler: soruları sormak, cevapları getirmek, onay almak
- Menü, fiyat, ürün fotoğrafları, masa düzeni ve masa numaralarını toplamak
- Hesapları kafe sahibinden almak (Instagram, Google İşletme); Supabase ve yayın ödemesi için kafe sahibinin kartıyla yapılacak işlerde onunla birlikte olmak
- Matbaa: QR masa kartları ve A4 menü için fiyat almak ve baskıyı takip etmek
- Pilot (2–4 Aralık): garson ve mutfağa sistemi göstermek, ilk günlerde yanlarında olmak, sorunları ve istekleri not etmek
- Sahadan gelen her bilgiyi, hatayı ve isteği bir Konuya yazmak (`/aktar`)
- Mustafa'nın hakkı bitince sırayı alıp Mustafa'nın verdiği işi yürütmek

**Mustafa (teknik ve yapay zeka):**
- Kapsam, iş sırası ve teknik kararlar; Claude'a kod yazdırmak ve ajanları yönetmek
- Supabase, Vercel, alan adı ve hesapların teknik kurulumu; canlıya alma
- Ücretler ve fiyatlandırma kararı
- Muhammed'in getirdiği bilgiyi sisteme işlemek; Muhammed'e görüşme ve iş listesi vermek

**Birlikte:** haftada bir 15 dk Konulara bakmak; tasarımı ve pilot öncesi son hali kafe sahibine göstermek (sunumu Muhammed yapar, demo hazırlığını Mustafa).

## Ayrı odak, ortak uyum
Her kişi kendi alanına odaklanır, diğerinin işini sadece onu bekliyorsa ya da etkiliyorsa görür. Kod nöbeti sadece kodu bağlar, saha işleri nöbet beklemez. `/sekreter` her oturumda kişiye tek bir "şimdi bunu yap" işi verir ve diğerini bekleten işleri öne alır. Acil olmayan soru ve haberler birikir, kişi kendi oturumunda hepsini topluca görür.

## Claude her hesapta farklı çalışır
- **Mustafa'nın hesabında: çalışan.** Teknik işi yapar, kod yazar, ajanları çalıştırır, karar seçeneklerini kısaca sunar. Mustafa'ya kod öğretmez.
- **Muhammed'in hesabında: asistan.** Odak gerçek hayattaki işlerdir: görüşme hazırlığı (`/gorusme`), kafe sahibine gönderilecek mesaj taslakları, yapılacaklar listesi, görüşmeden sonra duyulanları Konulara işlemek (`/aktar`), eğitim (`/ogren`). Teknik terim kullanmaz, kullanırsa açıklar. Kod işine sadece sıra Muhammed'deyken ve Mustafa'nın verdiği işle girilir.
- Her iki hesapta da ortak kurallar (`CLAUDE.md`) aynıdır.

## Yeni üye katılınca (Mustafa'nın oturumu)
1. GitHub adını al: `gh api -X PUT repos/mustafa1492/cafe/collaborators/<ad> -f permission=push`
2. Bu tabloya ekle, iş bölümüne bir bölüm yaz, `docs/nobet.md` → "Ekip" satırına ekle.
3. Kişiye atanmış bir `eğitim` Konusu aç: "Hoş geldin: `docs/egitim/00-kurulum.md`, sonra `/ogren <ad>`".

## Kim neye karar verir
- **Mustafa:** kapsam, sıra, teknik konular, fiyat ve para, iş kuralları, canlıya alma, harcama, ekip.
- **Muhammed:** saha işlerinin nasıl ve ne zaman yapılacağı (görüşme günü, matbaa seçimi için öneri), kafe tarafındaki iletişimin dili.
- **Kafe sahibi (Muhammed aracılığıyla):** menü, fiyatlar, masa düzeni, kafenin çalışma şekli.

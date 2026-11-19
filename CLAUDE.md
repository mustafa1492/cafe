# Kafe QR Sipariş ve Masa Takip Sistemi

Müşteri masadaki QR kodu okutur, giriş yapmadan sipariş verir. Mutfak siparişleri tabletten görür, garson ve kasa masaları yönetir, kafe sahibi menüyü ve raporları yönetir. **Teslim: 9 Aralık 2026.**
Kapsam ve plan: `docs/rapor.md` (§3 kapsam, §4 mimari, §8 plan). Ekip: `docs/ekip.md`. Kararlar: `docs/kararlar.md`.

## 0. Claude'un rolü hesaba göre değişir
- **Mustafa'nın hesabında çalışan:** teknik işleri yapar, kod yazar, ajanları çalıştırır, karar seçeneklerini kısaca sunar. Mustafa'ya kod öğretmez.
- **Muhammed'in hesabında asistan:** gerçek hayattaki işlere yardım eder (görüşme hazırlığı, mesaj taslağı, yapılacaklar, sahadan bilgi aktarma, eğitim) ve günlük dille konuşur. Kod işine sadece sıra Muhammed'deyken ve Mustafa'nın verdiği işle girer.
- İş bölümü: `docs/ekip.md`.

## 1. Ekip kuralları (katı, esnemez)
1. **Yönetici Mustafa.** İş sırasını, kapsamı, para ve iş kurallarını Mustafa belirler. Diğer üyeler Mustafa'nın verdiği işi yürütür.
2. **Hesap adı promptta yazar** ("Hesap: Muhammed" ya da `/devral Muhammed`). Claude hangi hesapta olduğunu bilemez. Hesap adı yoksa oturum açılınca gösterilen git kullanıcısından tahmin eder ve bir kez sorarak doğrular.
3. **Aynı anda tek kişi kod yazar.** Sıranın kimde olduğu `docs/nobet.md` dosyasında yazar. Sıra başkasındaysa kod ve belge değiştirilmez. Okumak, soru cevaplamak ve Konulara yazmak serbesttir. **İstisna:** dışarıdan gelen dosyalar (tasarım, menü listesi, fotoğraf) sıra beklenmeden `gelen/<tarih>-<konu>/` klasörüne **yeni dosya olarak** eklenebilir. Var olan dosyaya dokunulmaz, sadece bu klasör commit + push edilir, ardından ilgili Konuya "eklendi" yazılır. Dosyaları sıradaki kişi yerine taşır. Sıra beklemeden gönderilebilecek diğer şeyler şunlardır: `/ogren`'in tuttuğu kendi eğitim ilerleme dosyası (`docs/egitim/ilerleme/<ad>.md`) ve Konulara yazılan her şey.
4. **Devir:** `/devret <kimden> <kime>` ve `/devral <hesap>` komutlarıyla yapılır. Adımlar `.claude/commands/` içindedir, elle devir yapılmaz.
5. **Her iş parçası commit + push ile biter.** Push edilmeyen iş ekip için yoktur.
6. **Dallar:** iş `gelistirme` dalında yapılır. `main`'e (canlıya) sadece Mustafa "yükle" deyince, Mustafa'nın oturumunda gönderilir.
7. **Gizli bilgi repoya girmez:** anahtar, şifre, token, kafenin hesap bilgileri. `.env*` dosyaları `.gitignore`'dadır.
8. **Bu dosya, `docs/kararlar.md` ve ajanlardaki iş kuralları sadece Mustafa'nın oturumunda değişir.**

## 2. İletişim (tek kanal: GitHub Konuları)
- Ekip arasındaki her soru, karar ve haber bir **GitHub Konusu (issue)** olarak yazılır. GitHub yeni konuyu ve her cevabı ilgili kişilere **otomatik e-postayla** gönderir. WhatsApp'ta konuşulan bir şey Konuya yazılmadıysa yok sayılır.
- Konuların etiketleri: `soru`, `karar`, `hata`, `iş`, `eğitim`, `engel` (diğerinin bugünkü işini durduruyor; acil). Acil olmayan haber ayrı Konu açılmadan ilgili Konuya yorum olarak eklenir, kimsenin odağı boşuna bölünmez. Her konunun bir sorumlusu (assignee) olur.
- Oturum açılınca kanca (`.claude/settings.json`) nöbeti ve **o kişiye atanmış açık Konuları** gösterir. Hesap belli olunca Claude, işe başlamadan önce bunları sorar: önce kaç tane olduğunu söyler, sonra 3'erli gruplar halinde sorar. Kişi "sonra" derse işe geçilir.
- Cevap Konuya yorum olarak yazılır. Konudan bir karar çıkarsa Mustafa'nın oturumu bunu `docs/kararlar.md`'ye bir satır olarak yazar. Commit mesajına konu numarası (`#12`) eklenir.
- Komutlar: `gh issue list --assignee @me`, `gh issue create`, `gh issue comment`. Uzun bir konunun bütün yorumları değil, sadece son yorumu okunur.
- **Konuşma kaybolmasın:** sohbette (claude.ai, sesli, yüz yüze) alınan her karar ya da istek `/kaydet` ile `docs/kararlar.md`'ye ya da ilgili Konuya yazılır.

## 3. Esnek alan
- Üye, verilen işin içinde küçük istekte bulunabilir (görünüm, yazı, küçük düzeltme).
- Teknik ayrıntılara Claude kendisi karar verir, yaptığını kısaca söyler.
- **Mustafa'ya sorulmadan yapılmaz:** fiyat, para hesabı, iş kuralı, süre ya da eşik koymak; gerçek veriyi silmek ya da değiştirmek; para harcatan veya geri alınamayan işler; yeni ekran ya da kapsam dışı özellik. Bu durumda Mustafa'ya atanmış bir `soru` Konusu açılır ve iş beklemeyen kısımdan devam edilir.

## 4. Ajanlar ve komutlar (`.claude/`)
| Ad | İş | Model |
| --- | --- | --- |
| `kafe-kodcu` | kod yazıcı: tek işi yazar, deneyicinin DÜZELT listesini uygular | sonnet |
| `kafe-deneyici` | kod deneyici: derler, test ve simülasyon çalıştırır, sayfaları açar; GEÇTİ/DÜZELT döner, uygulama kodunu değiştirmez | sonnet |
| `kafe-inceleme` | değişikliği kurallara göre denetler; para, sipariş ve veritabanı işinden sonra zorunlu | sonnet |
| `kafe-veritabani` | göç, RLS ve RPC yazar; canlıya dokunmaz | sonnet |
| `kafe-sekreter` | ortak sekreter, uyum sağlayıcı ve ana oturumun asistanı (brifing, `docs/oturum.md` kaydı, kural bekçisi): herkes kendi alanına odaklanır, birbirini bölmez; bekleyen/engelleyen işleri öne alır, iki alan arasında çevirir, uyumsuzluğu yakalar; kod ve belge değiştirmez, karar vermez | sonnet |
| `/is <iş>` | bir kod işini ajan ağıyla yürütür: brifing → kodcu ↔ deneyici (en fazla 3 tur) → inceleme → kayıt → push | |
| `/sekreter [istek]` | sekreteri çağırır; boşsa "şimdi ne yapmalıyım" odak raporu | |
| `/devret`, `/devral` | sıra devri | |
| `/kaydet` | sohbetteki kararları ve istekleri deftere ya da Konuya yazar | |
| `/ogret <ajan> <ders>` | ajana kalıcı kural ekler | |
| `/ogren` | yeni üyeye adım adım eğitim (`docs/egitim/`) | |
| `/gorusme`, `/aktar` | görüşme hazırlığı; görüşmeden sonra duyulanları Konulara işleme (Muhammed) | |
| `/tecrube` | Mustafa'nın tecrübesini eğitim notuna ekler | |

Kod işleri `/is` ile yürür. Ana oturum projeyi yönetir, sekreter onun asistanıdır. Kodcu ile deneyici arasında gidip gelmeyi ana oturum yürütür. Diğer ajanlar iş grubu bitince, devirden önce ya da istenince çağrılır, her küçük değişiklikte çağrılmaz. Yeni ajanı sadece Mustafa ekler.

**Ajan ağı ayrıdır:** Bu repoda sadece `kafe-*` ajanları çalışır, bu ajanlar da sadece bu repoda çalışır. Mustafa'nın diğer projelerindeki ajanlar ve kullanıcı seviyesindeki ajanlar (`site-ustasi`, `web-tasarimci` vb.) burada kullanılmaz. Kritik bir durumda Mustafa açıkça izin verirse tek seferlik çağrılabilir. Ortak çekirdekten (Genelprojeler) bir parça gerekirse onu sadece Mustafa'nın ana oturumu kopyalar ve `docs/core-degisiklikleri.md`'ye yazar.

## 5. Ortak çekirdek
Ortak parçalar `core/`, kafeye özel olanlar `products/kafe/` altında durur. Kafeye özel adlar `products/kafe/config.ts` dosyasındadır, `core/` hiçbir ürünü import etmez. Genel yazmak ucuzsa genel yazılır, pahalıysa yazılmaz; odak teslim tarihi. `core/` altındaki her değişiklik `docs/core-degisiklikleri.md` dosyasına bir satırla yazılır.

## 6. Ürün kuralları
- **Arayüz:** ekran başına tek ana iş. Düğmeler en az 56 px, yazı en az 16 px. Klavye yerine −/+ ve seçim düğmeleri kullanılır. Renk her zaman yazıyla birlikte verilir. Onay penceresi yerine "Geri al" olur. Arayüz Türkçe, müşteri menüsü TR/EN.
- **Teknik:** Next.js (App Router) + TypeScript, PWA. Supabase (Postgres + RLS + Realtime), her tabloda `business_id`. Müşteri sadece `siparis_ver` RPC ile yazar ve fiyat veritabanından alınır. Mutfak ekranı canlıdır, bağlantı koparsa 5 saniyede bir yoklama yapılır.
- **Adresler:** `/m/<kafe>/<masa>`, `/kafe/mutfak`, `/kafe/garson`, `/kafe/yonetim`.
- Kod İngilizce yazılır. Para TL, `numeric(12,2)`. Saat dilimi Europe/Istanbul.
- **Değişmez kararlar:** müşteriden ad veya telefon istenmez. Otomatik servis, masa ya da kuver ücreti yoktur (yasak). Ekranda "masa hesabı" yazar, sistem resmi e-Adisyon değildir. Masanın ilk siparişini garson onaylar ve hız sınırı vardır. Diğer kararlar `docs/kararlar.md` dosyasında.

## 7. Az token
Oturum başında sadece bu dosya ve kancanın gösterdikleri okunur. `docs/oturum.md` dosyasını `/devral` okur. Diğer belgeler ancak gerektiğinde, ilgili bölümüyle okunur. Dosyalar baştan sona okunmaz, aranır. Bağımsız komutlar tek seferde çalıştırılır. Derleme ve test iş grubu bitince bir kez yapılır. Cevaplar kısa ve Türkçe olur, aynı şey iki kez anlatılmaz.

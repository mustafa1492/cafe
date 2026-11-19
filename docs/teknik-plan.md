# Teknik plan: kurulum, mimari, araçlar, site ve Meta reklamı

> 19 Kasım 2026 · Mustafa'nın oturumu. Kapsam ve takvim için ana kaynak `rapor.md`, bu dosya onun teknik karşılığı.
> **ÖNERİ** diye işaretli maddeler Mustafa onaylayana kadar karar değildir (`kararlar.md`'ye girmez).
> **KARAR BEKLİYOR** diye işaretli maddeler kafe sahibinin cevabını ya da Mustafa'nın kararını bekler.

## 0. Özet: bu planla değişen 5 şey
> **19 Kas kararları:** 1 kabul edildi (özel site). 2 ve 3 kabul edilmedi: alan adı 3 Ara'da, Vercel Pro 8 Ara'da alınacak, etkileri §2'de. Karar: her masaya 1 QR, siparişi müşteri onaylar, personel onayı yok. 4 hâlâ açık. 5 plan içinde.
1. **ÖNERİ, site:** Kafenin tanıtım sitesi atölye şablonuyla değil, bu projenin içinde özel tasarımla yapılır (§5). Böylece tek alan adı, tek yayın ve tek menü olur, fiyat da tek yerde durur. Atölyeden QR, çerez izni, kit ve metinler alınır.
2. **ÖNERİ, alan adı:** Alan adı 3 Aralık'ta değil **25 Kasım'da** alınmalı. QR kartları 5 Aralık'ta basılacak ve kartın üstünde son adres olmalı. Meta alan doğrulaması, Supabase giriş adresleri ve pilot da bu adrese bağlı.
3. **ÖNERİ, Vercel Pro:** Pilot (2 Aralık) gerçek ticari kullanım olduğu için Vercel Pro'ya **1 Aralık'ta**, Supabase Pro ile aynı gün geçilmeli. Ücretsiz Hobby planı ticari kullanıma kapalı.
4. **ÖNERİ, atölye açıkları:** Site atölyeden yayınlanmayacaksa atölyedeki 3 açık (giriş koruması, yedek, onay e-postası) kafe takviminden çıkar ve atölyenin kendi işi olarak kalır.
5. **Meta Pixel sadece tanıtım sitesinde çalışır.** Müşteri menüsü (`/m/...`) ve personel ekranlarında (`/kafe/...`) Pixel olmaz. Masadaki müşteriden hiçbir veri toplanmaz, KVKK açısından en sade yol bu.

## 1. Hazır olanlar ve nerede kullanılacakları

### Bu repoda (cafe)
| Ne | Nerede | Kullanım |
| --- | --- | --- |
| Next.js 15 iskeleti, güvenlik başlıkları, PWA, Türkçe 404 | `app/`, `next.config.ts` | Bütün ekranların temeli |
| `core/ui`: büyük düğme, −/+ sayaç, durum etiketi, başlık, kart, alt menü | `core/ui/` | Personel ekranları ve müşteri menüsü. 48 px olan öğeler kullanılmadan önce 56 px'e çıkarılır (`core-degisiklikleri.md`'ye yazılır) |
| Supabase tarayıcı istemcisi | `core/supabase/client.ts` | Tüm veri işleri |
| Muhammed'in tasarımı (5 dosya, `gelen/`'e gelecek) | Muhammed'in ilk işi | Ekran akışı ve metinlerin kaynağı. Hesap bölme ekranı ile kontrast hesabının mantığı (`onPrimary`, `accentInk`) buradan alınır |
| Rapor, bütçe, kararlar, ajan ağı | `docs/`, `.claude/` | Yönetim |

### Ortak çekirdekten (Genelprojeler, sadece ana oturum kopyalar)
| Parça | Ne zaman | Not |
| --- | --- | --- |
| `core/auth` (giriş, üyelik, roller) + davet göçü 0023 (WhatsApp ile personel daveti) | Garson kararı çıkınca | Roller kafeye göre: sahip, mutfak, garson (KARAR BEKLİYOR) |
| `core/activity` (geçmiş, geri al) | Geliştirme haftası | İptal edilen sipariş ve fiyat değişikliği izi |
| `core/offline` | Garson ekranında | Wi-Fi koparsa garson elle sipariş girmeye devam eder |
| `core/export` (Excel) | Yönetim ekranında | Gün sonu ve ay sonu raporu |
| `/api/uyanik`, `scripts/ciftci-sim.cjs` kalıbı | Geliştirme haftası | Sağlık kontrolü ve `kafe-sim.cjs` |

### Atölyeden (mustafa1492/web, okunur, kopyalanır)
| Parça | Dosya | Kafede |
| --- | --- | --- |
| QR üretici (bağımlılıksız, gerçek okuma testli) | `araclar/kaynak/qr.js` | Yönetimde masa QR kartları (1200×1600) ve toplu yazdırma |
| Meta Pixel izin penceresi (Reddet/Kabul eşit, izin yoksa betik hiç yüklenmez) | atölye `PX` ve `esnafOlcum`, test `araclar/pixel-test.js` | Tanıtım sitesinin çerez izni ve olayları (§6) |
| `randevu_al` RPC kalıbı (kilit, hata kodları, hız sınırı) | `docs/devir/mimari.md` §4.4c | `siparis_ver` |
| Zengin menü görünümü (kategori sekmeleri, etiket rozetleri, ürün fotoğrafı) | atölye `menuHTML` | Müşteri menüsü ve sitedeki menü bölümü için fikir kaynağı |
| Örnek metinler (300+) ve kafe satış/reklam kiti | `araclar/kaynak/ilham.js`, `satis.js` (kafe bölümü) | Slogan, duyuru ve reklam metinlerinin ilk hali (uyarlanır, aynen konmaz) |
| Kit: Instagram biyografisi, 5 hikâye kapağı, "yayındayız" gönderisi | atölye 5. adım `kitBox` | Kafe bilgileriyle atölyede bir kez üretilir |
| Test araçları: axe, kontrast, telefonda taşma, ekran görüntüsü | `araclar/axe.js`, `contrast.js`, `shots.js` | `kafe-deneyici`'nin site testleri (Playwright'a uyarlanır) |
| Sözleşme şablonu, sektör hazırlık rehberi | `docs/rehber/` | Kafe sahibiyle yazılı anlaşma |
| `ui-ux-pro-max` skill'i | `.claude/skills/ui-ux-pro-max/` | Bu repoya kopyalanır (§4) |

**Kullanılmayacaklar:** Atölyenin site üretici şablonu (9 stil, standart bölümler) kafenin sitesi için kullanılmaz, sadece fikir kaynağıdır. Atölyenin kendi ajanları (`site-ustasi`, `web-tasarimci`, `site-kontrolcu`) da kullanılmaz (CLAUDE.md §4, ajan ağı ayrı).

## 2. Kurulum: hesaplar ve ayarlar (sırayla)

| Tarih | İş | Kim | Teknik not |
| --- | --- | --- | --- |
| 20 Kas | Muhammed collaborator, `scripts/kurulum-konular.sh`, varsayılan dal `main` | Mustafa (bilgisayardan) | Konular açılmadan Muhammed'in işleri görünmez |
| 20 Kas | `ui-ux-pro-max` skill'ini bu repoya kopyala | Ana oturum | §4 |
| 21 Kas | Kafe sahibiyle görüşme (`/gorusme`) | Muhammed | Ad, masa sayısı, garson, ödeme, Instagram ve Google erişimi, fotoğraf izni |
| 3 Ara | **Alan adı** (kafe adına, karar 19 Kas). Önce .com.tr'ye bakılır, alınmışsa .com | Mustafa + kafe kartı | DNS'i Vercel'e yönlendir. Aynı gün Supabase Auth adresleri alan adına çevrilir, Meta TXT kaydı eklenir. **Etkisi:** pilot (2–4 Ara) Vercel'in geçici adresiyle yapılır, pilot QR'ları geçici kâğıda basılır, kalıcı kartlar 3 Ara'dan sonra basılır |
| 25 Kas | **Supabase**: kafeye ayrı kuruluş + proje, bölge **eu-central-1 (Frankfurt)** | Mustafa + kafe kartı | Türkiye'ye en yakın bölge. Ücretsiz planda proje 1 hafta boş kalırsa durur, geliştirme sırasında haftada bir istek atılır |
| 25 Kas | Supabase Auth: Site URL ve yönlendirme adresleri önce Vercel'in geçici adresine, **3 Ara'da alan adına** ayarlanır | Ana oturum (Supabase bağlayıcısı) | Atölyede bu adres localhost'ta kalmış ve onay e-postası hata sayfasına gitmişti. 3 Ara'daki değişiklik yayın listesine yazılır |
| 25 Kas | **Vercel**: takım + proje, GitHub `mustafa1492/cafe` bağlı. Canlı dal `main`, `gelistirme` önizleme | Mustafa | Ortam değişkenleri (aşağıda). Önizleme adresi pilot öncesi denemelerde kullanılır |
| 1 Ara | Supabase Pro | Mustafa + kafe kartı | Günlük yedek (7 gün). Vercel Pro 8 Ara'da (karar 19 Kas). Pilot ücretsiz Hobby planında yapılır, Vercel'in kuralları ticari kullanıma izin vermez, bunu bilerek |
| 30 Kas | Mutfak tableti (kafede yoksa) + stand | Kafe sahibi | Chrome + PWA olarak kurulur |
| 1–3 Ara | Meta İşletme hesabı, reklam hesabı, Pixel, alan doğrulama | Mustafa + kafe sahibi (§6) | Reklam hesabının para birimi TL, sonradan değişmez |

**Ortam değişkenleri:** Vercel'e girilir, repoya hiçbir zaman girmez.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: tarayıcıya açık, güvenlik RLS'den gelir.
- `SUPABASE_SECRET_KEY`: sadece sunucuda, sadece gerektiğinde (ör. gün sonu işi). İlk sürümde hiç kullanılmayabilir.
- `NEXT_PUBLIC_META_PIXEL_ID`: tanıtım sitesi için.
- `META_CAPI_TOKEN`: ileride (§6.4), şimdilik yok.

**E-posta:** Supabase'in hazır e-posta servisi saatte çok az ileti gönderir. Personel girişi e-postaya dayanmaz. Davet WhatsApp bağlantısıyla yapılır (çekirdekteki göç 0023), giriş şifreyle. Şifre sıfırlama gerekirse sonra ücretsiz bir SMTP servisi (ör. Resend) bağlanır. KARAR BEKLİYOR değil, teknik tercih.

## 3. Mimari ve veri modeli

### Tek uygulama, tek alan adı
```
kafeadi.com.tr/              → tanıtım sitesi (özel tasarım, statik, Pixel izinle)
kafeadi.com.tr/menu          → sitedeki menü (veritabanından, sipariş verilmez)
kafeadi.com.tr/m/<kafe>/<masa-kodu> → masadaki müşteri menüsü (her masaya 1 QR, girişsiz, Pixel yok)
kafeadi.com.tr/kafe/mutfak | garson | yonetim → personel (girişli)
```
Menü tek yerde (veritabanında) tutulur. Sitedeki menü, müşteri menüsü ve A4 basılı menü aynı fiyatları gösterir. Bu yasal olarak da gerekli, çünkü basılı liste QR'daki fiyatlarla aynı olmalı.

### Veri modeli taslağı (`kafe-veritabani` yazar, Mustafa onaylar)
Her tabloda `business_id` ve RLS var, para `numeric(12,2)`.
- `businesses`: ad, slug, saat dilimi, açık/kapalı, siparişi geçici kapatma.
- `tables`: etiket ("Masa 5", "Bahçe 2"), bölüm. Her masaya 1 QR (karar 19 Kas). Her masanın tahmin edilemez bir kodu olur, QR bu kodu açar. Kart kaybolursa ya da fotoğrafı yayılırsa yönetimden "kodu yenile" denir, eski QR çalışmaz olur. Yanlış masaya düşen siparişi kasa doğru masaya taşır.
- `menu_categories`, `menu_items`: ad (TR/EN), açıklama, fiyat, fotoğraf (Supabase Storage), alerjen ve etiket, `sold_out`, sıra.
- `members`: kişi ve rol. Kasa = yönetici (karar, 19 Kas). Mutfak rolü var. Garson rolü KARAR BEKLİYOR (kafede garson var mı?).
- `table_sessions`: masanın açık hesabı. Açılır, siparişler ona yazılır, kapanınca masa boşalır.
- `devices`: müşterinin telefonuna verilen rastgele kimlik. Tarayıcıda saklanır, ad ya da telefon tutulmaz. Hız sınırı ve "Siparişlerim" bu kimliğe göre çalışır. Personel onayı yok (karar 19 Kas).
- `orders`, `order_items`: kalem anında ürün adı ve birim fiyatı kopyalanır, sonradan fiyat değişse bile hesap bozulmaz. Durum: yeni → hazırlanıyor → hazır → servis edildi / iptal.
- `waiter_calls`: garson çağır, hesap iste.
- `payments`: masa hesabına ödeme (nakit/kart, tutar, hangi kalemler ya da kalemin kaçta kaçı). Hesabı **kasa böler** (karar, 19 Kas). Üç yolu var: kalem seçmek, eşit bölmek (÷N) ve ortak kalemi bölmek. Her ödeme ayrı kayıttır. `odeme_al` RPC'si masa hesabını kilitleyerek (`FOR UPDATE`) çalışır, kalanı aşan ödeme reddedilir, böylece aynı anda yapılan iki ödeme çift tahsilata yol açmaz. Kalan sıfıra inince masa "ödendi" olur. Her ödemeden sonra "Geri al" çıkar.
- `activity`: kim neyi ne zaman değiştirdi (geri al ve iz).

### Kapılar (RPC, hepsi `SECURITY DEFINER`, sabit `search_path`, sabit hata kodları)
- `siparis_ver(masa_kodu, cihaz, kalemler, not)`: Müşteri sepet ekranında masasını ve kalemleri görüp "Siparişi gönder"e basınca çağrılır. Sipariş doğrudan mutfağa "yeni" olarak düşer. Masa kodu geçerli mi, ürün tükenmiş mi, hız sınırı aşılmış mı kontrol eder. Fiyatı veritabanından alır. Hız sınırının sayısı KARAR BEKLİYOR.
- `garson_cagir(masa_kodu, cihaz, tur)`.
- `masa_durumu(masa_kodu, cihaz)`: Müşteri kendi siparişlerinin durumunu ve masa hesabının toplamını bununla okur. Bölme yapmaz, sadece "Hesap iste" der.
- `odeme_al(masa, tutar ya da kalemler, yöntem)`: sadece kasa (yönetici) çağırır, kilitli çalışır.

### Canlılık
- **Personel ekranları:** Supabase Realtime ile çalışır. Bağlantı koparsa 5 saniyede bir yoklama yapılır ve ekranda "bağlantı koptu" yazar.
- **Müşteri ekranı:** RLS'li tablolara girişsiz abone olunamaz. Müşteri ekranı bu yüzden `masa_durumu`'nu birkaç saniyede bir yoklar. Ekran arka plandaysa yoklama durur.
- **Mutfak tableti:** Ekranın kapanmaması için Wake Lock kullanılır. Tarayıcılar sesi ancak bir dokunuştan sonra çaldığından vardiya başında bir kez "Sesi aç" düğmesine basılır. Bu iki ayrıntı unutulursa mutfak siparişi duymaz.

### Testler
- `npm run build` + `typecheck`. Bunları her turda `kafe-deneyici` çalıştırır.
- `scripts/kafe-sim.cjs`: 10 masa, 50 sipariş. Hesaplar elle karşılaştırılır, "sorun: 0" görülmeden ilerlenmez.
- Veritabanı: göç dosyaları önce `pglite` ile yerelde denenir, sonra Supabase dal (branch) ya da SQL Editor'de.
- Ekranlar: `npm run ekran` (`scripts/ekran-test.cjs`, 19 Kas). Playwright ile 390 px telefon ve 1280 px tablet ekran görüntüleri alınır, axe 0 ihlal, taşma yok, konsol hatası yok, küçük düğme ve küçük yazı uyarısı verilir. Bilgisayarda ilk kullanımdan önce `npx playwright install chromium` gerekebilir.
- Pilot öncesi: `engineering:deploy-checklist` ile yayın listesi.

## 4. Skiller, ajanlar ve araçlar: nerede ne kullanılır

| İş | Kullanılan | Not |
| --- | --- | --- |
| Kod işleri | `/is` → `kafe-kodcu` ↔ `kafe-deneyici`, gerekirse `kafe-inceleme` | Ajan ağı yalnız bu repoda çalışır |
| Göç, RLS, RPC | `kafe-veritabani`, `data:sql-queries`; Supabase bağlayıcısı (bu oturumda bağlı) | Canlıya göçü sadece Mustafa'nın oturumu uygular, önce `get_advisors` ile güvenlik uyarılarına bakılır |
| Mimari karar kaydı | `engineering:architecture` | Veritabanı ve yayın kararı çıkınca 1 sayfalık ADR yazılır |
| Ekran ve site tasarımı | `frontend-design` (yön ve özgünlük), `ui-ux-pro-max` (renk, yazı tipi, UX kuralları; bu repoya kopyalanır) | Şablon görünümünden kaçmak için |
| Kafe sahibine onay için taslak | Claude Design (Design artifact): 3 site yönü + 5 ekran | Kafe sahibi görsel olarak seçer, sonra kodlanır |
| Test stratejisi, kod incelemesi, hata ayıklama | `engineering:testing-strategy`, `engineering:code-review`, `engineering:debug` | |
| Yayın | `engineering:deploy-checklist` | Pilot ve 8 Aralık öncesi |
| Personel kılavuzu (1 sayfa) | Docs | Pilotta dağıtılır |
| Sosyal medya görselleri ve kısa video | Canva bağlayıcısı (bağlı), `video-making` | "QR'ı okut, sipariş gelsin" Reels videosu |
| İçerik takvimi, reklam harcama takibi | Sheets | 4 haftalık takvim |
| Haftalık sonuç panosu | Data (Dashboard) | Sipariş sayısı, en çok satan, reklam sonuçları |
| Meta Business Suite ve Google İşletme kurulumu | Claude in Chrome (kafenin hesabıyla, Mustafa yanında) | §6 |
| Düzenli işler | Zamanlanmış görevler | Pazartesi içerik planı, pazar haftalık rapor |
| Gönderi dili | `setup-writing-style` | Kafenin sesiyle yazılır |
| Ekip düzeni | `kafe-sekreter`, `/sekreter`, `/gorusme`, `/aktar` | |

## 5. Site: standart değil, kafeye özel

**Hedef:** İlk 3 saniyede o kafenin havasını veren, telefonda çok hızlı açılan, menüsü canlı ve "yarın gideyim" dedirten bir site.

**Neden şablon değil:** Atölye stilleri hızlı ama her kafede aynı görünür. Bu site aynı zamanda Mustafa'nın sonraki kafelere göstereceği örnek iş olacak.

**Süreç:**
1. **Malzeme (21–28 Kas, Muhammed):** Siteyi en çok gerçek fotoğraf güzelleştirir. Gün ışığında ürün yakın çekimleri, mekân, bar ve insan eli çekilir, 8–10 saniyelik birkaç dikey video da alınır. Kafe sahibinden logo, renk, hikâye (2–3 cümle) ve imza ürünler istenir. Fotoğraf izni yazılı alınır.
2. **Yön (24 Kas, tasarım onayıyla birlikte):** Claude Design'da **3 farklı yön** hazırlanır. Her yön bambaşka olur, örnek: "sıcak ve el yapımı", "modern ve minimal", "cesur ve editoryal". Her biri telefon ve masaüstü kapağı ile menü bölümünü gösterir. Kafe sahibi birini seçer.
3. **Kodlama (3–7 Ara, `/is`):** Seçilen yön `frontend-design` ve `ui-ux-pro-max` ile koda dökülür.

**Bölümler (ÖNERİ, kafe sahibiyle kesinleşir):**
- **Kapak:** Gerçek fotoğraf ya da sessiz kısa video, tek cümle ve iki düğme: "Menüye bak", "Yol tarifi".
- **"Şu an açık / kapalı"** göstergesi ve bugünün saatleri.
- **İmza ürünler:** 3–4 ürün, büyük fotoğrafla.
- **Canlı menü:** Veritabanından okunur, kategori sekmeleri olur. Ürün tükendiyse sitede de "Bugün yok" yazar.
- **"Masadan sipariş"** anlatımı: 3 adım, kafeye özel bir fark olarak.
- **Hikâye ve mekân galerisi.**
- **Gerçek Google yorumları:** İzinle, uydurma yok. Altında yorum bırakma bağlantısı.
- **Konum, saatler, telefon, WhatsApp, Instagram.** Harita tıklanınca yüklenir.
- **Alt bilgi:** KVKK aydınlatma metni ve "Çerez tercihleri". Site TR/EN olur.

**Kalite çıtası (kafe-deneyici bunları ölçer):**
- Telefonda Largest Contentful Paint ≤ 2,5 sn. Görseller AVIF/WebP olur, ilk görüntü öncelikli yüklenir.
- axe 0 ihlal, kontrast ≥ 4,5, 375–390 px'te taşma yok.
- Hareketler ince olur (kaydırınca beliren bölümler, menüde yumuşak geçiş). "Hareketi azalt" ayarında kapanır.
- Arama motoru için schema.org `CafeOrCoffeeShop` (saatler, adres, menü bağlantısı), Open Graph görseli, sitemap ve robots.
- Yazı tipleri kendi sunucumuzdan yüklenir (`next/font`). Dışarıdan betik yalnız Meta, o da izinle.

## 6. Meta reklamı kurulumu

### 6.1 Hesaplar (1–3 Ara, Claude in Chrome ile, kafenin hesabında)
1. Kafenin Instagram hesabı **profesyonel (İşletme)** hesaba geçirilir ve kafenin Facebook Sayfası'na bağlanır.
2. **Meta İşletme Portföyü** (business.facebook.com) kafe adına açılır, sahibi kafe olur. Mustafa yönetici ya da iş ortağı olarak eklenir. Hesaplar kafede kalır, ayrılık olursa kimse kilitli kalmaz.
3. **Reklam hesabı:** Para birimi **TL**, saat dilimi **İstanbul**. İkisi de sonradan değişmez. Ödeme yöntemi kafenin kartı olur.
4. **Pixel (Events Manager → Veri kaynağı):** Pixel kimliği Vercel'e `NEXT_PUBLIC_META_PIXEL_ID` olarak girilir.
5. **Alan doğrulama:** Kafenin alan adına DNS TXT kaydı eklenir.

### 6.2 Sitedeki ölçüm (kod, `/is` ile)
- Atölyedeki izin penceresi kalıbı alınır: Reddet ve Kabul eşit görünür, izin yoksa Meta betiği **hiç yüklenmez**, Reddet `_fbp` çerezini siler, alt bilgide "Çerez tercihleri" bulunur.
- Olaylar: `PageView`, `ViewContent` (menü), `FindLocation` (yol tarifi), `Contact` (telefon, WhatsApp), Instagram tıklaması (özel olay).
- Bütün bağlantılarda UTM etiketi olur, reklamdan gelen ziyaretçi Data panosunda ayrı görünür.
- Pixel `/m/...` ve `/kafe/...` adreslerinde **yüklenmez**. Bunu `kafe-deneyici` her yayında kontrol eder.

### 6.3 İlk kampanya (8 Ara'dan, 7 günlük deneme)
- **Amaç:** Yakındaki insanı kafeye getirmek. Kampanya türü "Bilinirlik" ya da "Trafik" (siteye ya da Instagram profiline) olur.
- **Hedefleme:** Kafenin çevresinde dar bir yarıçap. Yarıçap sayısı kafe sahibiyle belirlenir. Yaş ve ilgi alanı geniş bırakılır, Meta'nın otomatik yerleşimleri açık olur.
- **Kreatif:** İki çeşit denenir: 1 kısa dikey video ("QR'ı okut, sipariş gelsin" + mekân) ve 1 fotoğraf karuseli (imza ürünler). 7 günün sonunda iyi gidene bütçe kaydırılır.
- **Metin:** Atölyedeki kafe reklam kitinden başlanır, kafenin sesine uyarlanır. Abartı ve uydurma vaat olmaz.
- **Bütçe:** Kafe sahibi ve Mustafa belirler. Faturaya Meta'nın Türkiye için eklediği **%5 konum ücreti** ve KDV de girer. Yurt dışı reklam hizmetinin KDV beyanı kafenin muhasebecisine sorulur.
- **Dikkat:** Kafe alkol satıyorsa reklam 18 yaş üstüne sınırlanır ve Meta'nın alkol kuralları geçerli olur.
- **Raporlama:** Haftalık Data panosu ile yapılır. Erişim, tıklama, yol tarifi ve arama sayıları, harcama Sheets'te tutulur.

### 6.4 Sonra (Aralık sonu ve sonrası, talebe göre)
- **Dönüşüm API'si (Conversions API):** Tarayıcı engellerinde kaybolan ölçümü sunucudan tamamlar. Aynı olay iki kez sayılmasın diye Pixel ve sunucu aynı `event_id` ile gönderir. İzin şartı aynen geçerlidir. Şimdilik gerek yok.
- Instagram'da yeniden hedefleme (siteyi ziyaret edenler), ancak izin vermiş kitleyle.

## 7. Takvim (rapor §8'in teknik karşılığı)
| Tarih | Teknik iş |
| --- | --- |
| 20 Kas | Muhammed ekibe katılır, Konular açılır, skill kopyalanır |
| 21–22 Kas | Görüşme; garson, hesap bölme ve masa onayı kararları; veri modeli kesinleşir |
| 22–24 Kas | 5 ekran ve 3 site yönü Design'da hazırlanır, kafe sahibi onaylar; `core/auth` alınır, roller yazılır |
| 25 Kas | Alan adı, Supabase, Vercel kurulur; göçler, RLS ve `siparis_ver` yazılır |
| 26–28 Kas | Müşteri menüsü ve mutfak (canlı); `kafe-sim` çalışır |
| 29–30 Kas | Garson ve kasa: masa planı, onay, hesap, ödeme |
| 1 Ara | Yönetim: menü, masalar ve QR, personel, gün sonu; Pro planlara geçilir |
| 2–4 Ara | Pilot, aynı gün düzeltme |
| 22–28 Kas | Sosyal medya: profil düzeni, Google İşletme; 24–30 Kas çekim günü (`sosyal-medya-plan.md`) |
| 1–7 Ara | Yayın öncesi 3 "çok yakında" gönderisi, QR sipariş videosu |
| 3–7 Ara | Site (özel tasarım), Meta hesapları ve Pixel, QR kartları ve basılı menü (A4'ü uygulama üretir) |
| 8–9 Ara | Yayın listesi, yayın, ilk kampanya, personel eğitimi |

## 8. Teknik riskler ve önlemleri
| Risk | Önlem |
| --- | --- |
| Alan adı 3 Ara'da alınıyor, kartlar 5 Ara'da basılacak | Kartlar ancak alan adı yayında ve telefonla okutulup denendiyse basılır; pilot geçici kâğıtla yapılır |
| Mutfak tableti sesi çalmaz ya da ekran kararır | "Sesi aç" düğmesi, Wake Lock, pilotta gerçek tablette denenir |
| Wi-Fi kopar | Personel ekranında "bağlantı koptu" uyarısı ve yoklama; garson elle sipariş girer (`core/offline`) |
| Aynı masada aynı anda birden çok ödeme | Her ödeme ayrı kayıt, `odeme_al` kilitli; simülasyonda 3 kişinin aynı anda ödemesi denenir |
| Kasa yavaşlar | Tek ekran: masa → tutar → nakit/kart; tutarlar hazır, klavye yok; pilotta bir ödemenin 2–3 saniyeyi geçmediği ölçülür |
| Fiyat hilesi / sahte sipariş | Fiyat sadece veritabanından alınır, hız sınırı vardır. Personel onayı olmadığı için QR'ın fotoğrafını çeken biri evden sipariş atabilir. Önlemler: tahmin edilemez masa kodu, cihaz ve masa başına hız sınırı, yönetimde "kodu yenile" ve mutfakta "iptal" düğmesi. Pilotta kötüye kullanım görülürse onay yeniden konuşulur |
| Supabase giriş adresi yanlış kalır | 25 Kas'ta ayarlanır, pilot listesinde tekrar kontrol edilir |
| Ücretsiz plan durur ya da ticari kullanıma kapalıdır | 1 Ara'da iki Pro plana geçilir |
| Site yavaş açılır | Görseller optimize edilir, LCP ölçülür, ağır efekt kullanılmaz |
| Pixel izinsiz yüklenir (KVKK) | İzin penceresi kalıbı ve deneyici kontrolü; müşteri ve personel ekranlarında Pixel olmaz |
| 20 gün yetmez | Sıra değişmez: sipariş ve mutfak > garson/kasa > yönetim > site süsleri. Site sadeleşebilir, sipariş akışı asla |

## Kaynaklar
- Supabase fiyatları ve Pro planı: https://supabase.com/pricing.md
- Vercel Hobby'nin ticari olmayan kullanım sınırı: https://vercel.com/docs/plans/hobby-plan · Pro fiyatı: https://vercel.com/pricing?gad=1
- Meta'nın Türkiye konum ücreti (%5): https://www.webtekno.com/meta-turkiye-reklamlar-konum-ucreti-alacak-h218926.html
- Yurt dışı reklam hizmetinde KDV: https://www.muhasebenews.com/?p=168719
- Pixel ve Conversions API'de çift sayımı önleme: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
- Atölye mimarisi: `mustafa1492/web` → `docs/devir/mimari.md`

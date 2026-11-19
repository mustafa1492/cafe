# Kafe QR Sipariş Sitesi — Proje Raporu

> 19 Kasım 2026 · Mustafa Özçoban. Canlı kopya (Claude Docs): https://claude.ai/artifact/LkkEoVok8nstdQq6HD6KgZ
> Bu dosya asıl kaynaktır; değişiklik önce buraya yazılır.

## 1. Özet

Teslim 9 Aralık 2026 (20 gün). Arkadaşın çalıştığı kafede çalışan bir QR sipariş ve masa takip sistemi, kafenin web sitesi ve sosyal medya düzeni teslim edilecek. Sıfırdan başlanmıyor: atölye (`mustafa1492/web`) menüyü, QR kodu, siteyi ve reklam kitini zaten üretiyor; Çiftçi Defteri çekirdeği (`dayibasi/core/`) giriş, roller, davet, stok, cari hesap ve Excel'i hazır veriyor.

20 günün sonunda:
1. **Müşteri ekranı:** masadaki QR → menü, sepet, sipariş, garson çağır, hesap iste.
2. **Mutfak ekranı:** tablette canlı sipariş listesi, sesli uyarı, durumlar (alındı → hazırlanıyor → hazır), "tükendi" düğmesi.
3. **Garson ve kasa:** masa planı, masada biriken hesap, hesap kapatma (nakit/kart), hesap bölme.
4. **Yönetici paneli:** menü, fiyat, masa, personel; gün sonu raporu ve Excel.
5. **Web sitesi:** atölyeden; menü, "Sipariş ver" bağlantısı, Google Haritalar.
6. **Basılı malzeme ve sosyal medya:** masa QR kartları, menü A4, Instagram/Google İşletme kurulumu, 4 haftalık içerik takvimi, ilk reklam.

**Ana karar:** personel ekranları Çiftçi Defteri'nin Next.js + Supabase çekirdeği üzerinde yeni ürün `products/kafe/`; kafenin tanıtım sitesi atölyeden. Yazılan genel parçalar (sipariş, masa, canlı pano) diğer projelere geçer.

**Yasal not:** Sistem resmi e-Adisyon değildir; kafe yazar kasa fişini/faturasını yine keser. Masada QR menü yeterli, müşteri isterse basılı menü verilmek zorunda.

## 2. Mevcut durum

Arkadaşın devir dosyası geldi (`arkadas-oturumu.md`, 19 Kas). Planlar arasındaki farklar "Mustafa: bekleyen kararlar" Konusunda; 4 uyumsuzluk (masa onayı telefon başına mı, hesabı kim böler, garson var mı, deneme süresinde masraf) karar bekliyor.

| Kaynak | Durum | Katkısı |
| --- | --- | --- |
| Arkadaşın tasarımı (Claude Design, Mustafa'da salt okunur) | Müşteri menüsü (Masa 3, kategoriler Dürüm / Pide & Lahmacun / İçecek, "Garson çağır", Menü / Siparişlerim / Hesap sekmeleri), mutfak giriş ekranı, yönetici paneli. Ekranlar bağlı değil; gerçek bağlantı "4. adımda Firebase ile" planlanmış. Adresler: `/r/<kafe>/masa/<no>`, `/r/<kafe>/mutfak`, `/r/<kafe>/yonetici`. Örnek kafe adları: "Lezzet Durağı", "Demo Kafe" | Ekran akışı ve rol ayrımı (mutfak fiyat ve ciroyu görmez) |
| Atölye (`mustafa1492/web`) | Tek dosya HTML; 17 sektör demosu (kafe, restoran dahil), 9 stil, Cloudflare yayını, Supabase `esnaf-atolye`, müşteri yönetim paneli, online randevu sistemi | Kafenin sitesi, menüsü, QR kartları, satış/reklam ve sosyal medya kiti |
| Çiftçi Defteri (`genelprojeler/dayibasi`) | Next.js 15 + Supabase, PWA, canlıda; `core/` 20+ ortak modül, göçler 0001–0023, gece yedeği | Personel ekranlarının iskeleti |

Atölyede kapanması gereken açıklar (kafeye canlı sistem kurmadan önce): giriş koruması (Cloudflare Access) yok, haftalık veritabanı yedeği kurulmadı, Supabase onay e-postası hâlâ localhost'a gidiyor.

## 3. Ürün kapsamı

| Ekran | Kim | İlk sürüm (20 gün) | Sonra |
| --- | --- | --- | --- |
| Müşteri menüsü `/m/<kafe>/<masa>` | Masadaki müşteri, girişsiz | Kategoriler, ürün fotoğrafı, açıklama ve alerjen notu; sepet (−/+), not; sipariş gönderme; durum; "Garson çağır", "Hesap iste"; TR/EN | Online ödeme, bahşiş, sadakat puanı |
| Mutfak | Aşçı, barista (tablet) | Sütunlu canlı sipariş listesi, sesli uyarı, durum düğmeleri, ürüne "tükendi"; fiyat ve ciro görünmez | Mutfak/bar ayrımı, hazırlama süresi |
| Garson ve kasa | Garson, kasiyer (telefon) | Masa planı (boş/dolu/hesap istiyor), çağrılar, garsonun elle sipariş eklemesi, masa hesabı, kapatma (nakit/kart), hesap bölme, masa taşıma | Fiş yazıcısı, paket servis |
| Yönetici | Kafe sahibi | Menü ve fiyat, masalar ve QR kartları, personel daveti (WhatsApp bağlantısı), gün sonu raporu, Excel, veresiye defteri | Stok/reçete, çok şube, Ticaret Bakanlığı fiyat bildirimi için dışa aktarma |

**Siparişin yaşamı:** müşteri gönderir → mutfak alır → hazırlanıyor → hazır → garson teslim eder → masa hesabına yazılır → hesap kapanır.

**Sahte siparişe karşı:** masanın ilk siparişini garson onaylar, masa "açık" olur; sonraki siparişler onaysız geçer; masa kapanınca bağlantı tekrar onay ister. Telefon ve masa başına hız sınırı (randevu sistemindeki saatte 30 talep sınırı gibi).

**Yapılmayacaklar:** otomatik servis/masa/kuver ücreti yok (Ocak 2026'dan beri yasak). Müşteriden ad/telefon istenmez (KVKK yükü yok).

## 4. Teknik mimari

```
[Müşteri: QR okut]  [Mutfak tableti]  [Garson/kasa]  [Yönetici]
          \               |                |             /
           v              v                v            v
   ┌───────────── Kafe uygulaması (Next.js, products/kafe/) ─────────────┐
   │  YENİ (genel): core/orders, core/tables, core/board                  │
   │  HAZIR: core/auth, davet, catalog, inventory, ledger, export,        │
   │         offline, messaging, ui, PWA                                  │
   └──────────────────────────────┬───────────────────────────────────────┘
                                  │ okur ve yazar
                                  v
             Supabase: Postgres + RLS + canlı güncelleme + siparis_ver RPC

   Sosyal medya / reklam ──ziyaretçi──> Atölye: kafenin web sitesi ──"Sipariş ver"──> müşteri menüsü
```

- **Supabase, Firebase değil:** iki proje de Supabase'de; RLS, SQL rapor ve hazır çekirdek oradan. Arkadaşın planındaki Firebase adımı bununla değişir (md gelince konuşulur).
- **Müşteri giriş yapmaz:** menüyü okur, siparişi tek kapıdan (`siparis_ver` RPC, SECURITY DEFINER, anon'a açık) gönderir. Kapı masayı, "tükendi"yi, hız sınırını denetler; fiyatı veritabanından alır, müşteriden almaz. Kalıp: atölyedeki `randevu_al` (advisory lock, hata kodları).
- **Mutfak canlı:** Supabase Realtime; bağlantı koparsa 5 sn'de bir yoklama.
- **Adresler:** müşteri `/m/<kafe>/<masa>`; personel `/kafe/mutfak`, `/kafe/garson`, `/kafe/yonetim` (girişli).
- **Kod yeri:** `mustafa1492/cafe`, dal `gelistirme` (canlı `main`). Ortak parçalar Genelprojeler'deki çekirdekten kopyalanıp `core/` altına konur. Kafeye özel adlar `products/kafe/config.ts` dosyasında durur. `core/` altındaki her değişiklik `docs/core-degisiklikleri.md`'ye yazılır, Mustafa bunları sonra ana çekirdeğe taşır.
- **Karar bekleyen 1 — veritabanı yeri:** Supabase ücretsiz planı kuruluş başına 2 etkin proje; Mustafa'da zaten 2 var. Öneri: kafeye **ayrı kuruluş + Pro (25 $)**, faturası kafenin kartına. Alternatif: Çiftçi Defteri veritabanına eklemek (çekirdek çok işletmeli ama canlı çiftçi verisiyle aynı yer).
- **Karar bekleyen 2 — yayın yeri:** Vercel ücretsiz planı ticari kullanım için değil. Öneri: **Vercel Pro (20 $)** (20 günlük süre için en az risk). Alternatif: Cloudflare Workers Paid (5 $), Next.js uyarlaması 1–2 gün ek iş.

> Teknik ayrıntı ve güncel dosya haritası: `teknik-plan.md` (19 Kas).

## 5. Atölye ve Çiftçi Defteri'nden alınacaklar

### Atölyeden (`mustafa1492/web`)
| Parça | Nerede | Kafede |
| --- | --- | --- |
| Kafe ve restoran demoları | `demolar/kafe.html`, `demolar/restoran.html` | Sitenin başlangıcı |
| Zengin menü (kategori sekmeleri, ürün fotoğrafı, etiketler, alerjen notu) | `menuHTML`, `state.menuImg` | Müşteri menüsünün görünümü ve veri biçimi |
| Bağımsız QR üretici + 1200×1600 masa kartı | `araclar/kaynak/qr.js`, 5. adım | Masa başına QR kartı |
| Randevu sisteminin güvenlik kalıbı | `randevu_al`, `site-randevu.js` | `siparis_ver` aynı kalıpla |
| Müşteri yönetim paneli ve alan izinleri | `site-canli.js`, `#yonetim` | Sitede "bugün kapalıyız", duyuru, kampanya |
| Meta Pixel ve izin penceresi | 4. adım, `esnafOlcum` | Yeni olay: Sipariş |
| Satış ve reklam kiti | `satis.js` | Satış konuşması, Meta reklam metinleri |
| Basılı ve sosyal medya kiti (menü A4, IG bio, 5 hikâye kapağı, "yayındayız" gönderisi) | 5. adım `kitBox` | İlk hafta içeriği |
| Örnek metin kütüphanesi (300+) | `ilham.js` | Slogan, duyuru, gönderi metni |
| İngilizce sürüm | `buildEN` | Turist müşteri |
| Cloudflare yayını, testler (axe, kontrast, taşma) | `araclar/` | Yayın ve kontrol |
| Sözleşme şablonu, sektör rehberi | `docs/rehber/` | Kafe sahibiyle yazılı anlaşma |

### Çiftçi Defteri çekirdeğinden (`dayibasi/core/`)
| Parça | Nerede | Kafede |
| --- | --- | --- |
| Giriş, üyelik, yetkiler | `core/auth/`, göç 0017 | Sahip/garson/mutfak; "çalışan parayı görmez" = mutfak ciroyu görmez |
| Davet bağlantısı (WhatsApp) | göç 0023 | Personeli tek bağlantıyla eklemek |
| Ürün kataloğu | `core/catalog/` | Menü ürünleri |
| Depo/stok | `core/inventory/` | "Tükendi"; sonra stok düşümü |
| Cari ve vadeler | `core/ledger/`, `core/dues/` | Veresiye defteri |
| Masraf | `core/expenses/` | Günlük gider, gün sonu kâr |
| Geçmiş ve geri al | `core/activity/` | İptal sipariş, fiyat değişikliği izi |
| İnternetsiz kayıt | `core/offline/` | Wi-Fi kopunca garson ekranı çalışır |
| Excel/CSV | `core/export/` | Gün sonu, ay sonu raporu |
| WhatsApp bağlantıları/şablonlar | `core/messaging/` | Hesabı/rezervasyonu WhatsApp'tan göndermek |
| UI (büyük düğme, −/+ sayaç, durum etiketi), büyük yazı, tutarları gizle | `core/ui/`, `core/prefs.tsx` | Sepet adedi, okunur mutfak ekranı |
| PWA, `/panel`, `/api/uyanik` | `public/`, `app/` | Tablete kurulum; veritabanı uyumaz |
| Simülasyon testleri | `scripts/ciftci-sim.cjs` | `kafe-sim`: 10 masa, 50 sipariş, rakamlar elle karşılaştırılır |

**Yeni yazılacaklar:** masa ve oturum, sipariş ve kalemleri, canlı mutfak panosu, garson çağrısı, hesap kapatma/bölme → `core/orders/`, `core/tables/`, `core/board/` (genel), kafeye özel adlar `products/kafe/config.ts`.

## 6. Skiller ve araçlar

| İş | Araç / skill | Nerede |
| --- | --- | --- |
| Görüşme notu, sözleşme, kılavuz | Docs | Bu rapor; 1 sayfalık personel kılavuzu |
| Akış panosu | Whiteboard | Sipariş akışını arkadaşla düzenlemek |
| Mimari karar | `engineering:architecture`, `engineering:system-design` | 1. gün ADR |
| Ekran tasarımı | Design (artifact), `frontend-design`, `ui-ux-pro-max` | 5 ekranın düzenlenebilir taslağı |
| Kodlama | Claude Code (VS Code); kafe ajan ağı: `kafe-kodcu` ↔ `kafe-deneyici`, `kafe-inceleme`, `kafe-veritabani`, `kafe-sekreter` (`/is`) | `products/kafe/`, `core/orders/` |
| Veritabanı | Supabase bağlayıcısı, `data:sql-queries` | Tablolar, RLS, `siparis_ver` |
| Test ve yayın | `engineering:testing-strategy`, `code-review`, `deploy-checklist`, `debug` | Simülasyon, yayın listesi, pilot hataları |
| Kafenin sitesi | Atölye | Site, QR kartları, menü A4 |
| Sosyal medya görselleri | Design, Canva bağlayıcısı | Haftada 3–4 gönderi, hikâye kapakları |
| Kısa video | `video-making`, Canva video | "QR'ı okut, sipariş gelsin" videosu |
| İçerik takvimi, menü verisi, reklam harcaması | Sheets | 4 haftalık takvim |
| Satış sunumu | Slides | Kafe sahibine ve sonraki kafelere |
| Sonuç panosu | Data (dashboard), `data:analyze`, `dataviz` | Günlük sipariş, en çok satan, reklam |
| Meta Business Suite, Google İşletme | Claude in Chrome | Zamanlama, profil kurulumu |
| E-posta ve dosyalar | Gmail, Google Drive, Microsoft 365 | Yazışma, fotoğraf arşivi |
| Düzenli işler | Zamanlanmış görevler | Pazartesi içerik planı, akşam sipariş özeti, haftalık rapor |
| Metin sesi | `setup-writing-style` | Gönderi ve WhatsApp mesajları |
| Araştırma | `deep-research`, `youtube-transcriber` | Rakip analizi |
| Kendi skillerimiz | `skill-creator` | `kafe-kurulum`, `haftalik-icerik` |

## 7. Sosyal medya ve reklam operasyonu

> Uygulama planı (takvim, ilk 4 hafta, haftalık döngü, çekim listesi): `sosyal-medya-plan.md` (19 Kas).

İki hesap: kafenin kendi hesabı (masaya müşteri getirir) ve Mustafa'nın ürün hesabı (bu kafeyi örnek gösterip başka kafelere satar).

| Kanal | Kafe | Mustafa'nın ürünü |
| --- | --- | --- |
| Google İşletme Profili | En önemlisi: arama, menü bağlantısı, foto, yorum QR'ı | — |
| Instagram (gönderi, Reels, hikâye) | Ana vitrin | Ana satış kanalı: önce/sonra, kurulum videosu |
| TikTok / YouTube Shorts | Aynı videolar | Aynı videolar |
| WhatsApp Business | Kampanya | Esnafla ilk temas |

**İçerik direkleri** (haftada 3–4 gönderi + her gün hikâye): ürün; QR deneyimi ("garson bekleme, okut, sipariş ver"); mekan ve insan; kampanya/duyuru; gerçek Google yorumları (izinle, uydurma yok).

**Haftalık döngü:** Pazartesi plan (zamanlanmış görev → Sheets) ve kafe fotoğrafları WhatsApp'tan; Salı görseller (Design/Canva) ve video; Çarşamba Mustafa onayı + Meta Business Suite'te zamanlama (Claude in Chrome); Pazar haftalık rapor (Data panosu).

**Reklam:** atölyenin reklam kiti (ilkeler, hedefleme, 3 metin) + Meta Pixel'e Sipariş olayı. Dar yarıçap; yayından sonra 7 günlük küçük deneme (video vs foto); bütçeyi kafe sahibi ve Mustafa belirler, harcama Sheets'te izlenir. QR kartın arkasında Instagram ve Google yorum QR'ı; sipariş sonrası "takip et / yorum bırak".

**Kimin işi:** fotoğraf ve onay kafe sahibinde, plan ve üretim bizde, yayınlama ve rapor zamanlanmış görevlerde.

## 8. 20 günlük plan

| Aşama | Tarih | Çıktı |
| --- | --- | --- |
| Keşif ve kararlar | 20–21 Kas | Arkadaşın md'si okundu, kafe sahibiyle görüşüldü, veritabanı/yayın kararı |
| Altyapı açıkları | 20–24 Kas | Atölye giriş koruması, haftalık yedek, Supabase onay adresi |
| Tasarım ve veri modeli | 22–24 Kas | 5 ekran Design'da onaylı, tablolar ve kurallar yazılı |
| Geliştirme | 25 Kas – 1 Ara | Önce müşteri + mutfak, sonra garson/kasa, en son yönetici; her gün `kafe-sim` "sorun: 0" |
| Sosyal medya hazırlığı | 24 Kas – 7 Ara | Hesaplar, ilk 2 haftanın içeriği |
| Kafede pilot | 2–4 Ara | Gerçek masa ve garsonla bir öğle, bir akşam servisi; aynı gün düzeltme |
| Web sitesi ve baskı | 3–7 Ara | Atölyeden site, QR kartları, menü A4 |
| Yayın ve ilk reklam | 8–9 Ara | Site + sistem yayında, reklam başlar, 15 dk personel eğitimi + 1 sayfalık kılavuz |
| **Teslim** | **9 Ara** | |

Kontrol noktaları:
- [ ] 21 Kas: kafe sahibiyle görüşme
- [ ] 24 Kas: tasarım onayı
- [ ] 1 Ara: tüm ekranlar simülasyondan geçti
- [ ] 4 Ara: pilot tamam
- [ ] 9 Ara: teslim

## 9. Bütçe

Ayrıntı ve hesaplayan tablo: `butce.md` ve https://claude.ai/artifact/QiKySrmSZPbiDyA5D5ksUH

Kafenin sabit gideri ayda ≈ 2.300 TL, ilk yıl ≈ 34.200 TL (1 $ = 50 TL; reklam ve Mustafa'nın ücreti hariç). Masrafları kafe öder; hesapları Mustafa yönetir, faturalar kafenin kartına.

## 10. Deadline sonrası

### Kafe sistemini ürüne çevirmek (Aralık–Ocak)
- Pilot verisi (4 hafta sipariş, süre, hata) → ikinci kafeye satışta örnek çalışma.
- Paketler: (a) Site + QR menü, (b) + QR sipariş ve mutfak, (c) + sosyal medya yönetimi. Fiyatı Mustafa belirler.
- Rakipler: MENU TIGER aylık 17 / 46 / 119 $ (https://www.menutiger.com/tr/faq); RestoMenum uygulama içi QR menü 3,99 $, adisyon 9,99 $ (App Store); Adisyo ve QAR gibi yerli firmalar POS ve pazaryeri entegrasyonuyla büyük işletmelere (https://kobitime.com/adisyo/, https://www.karekod.org/qr-menu-fiyat.html).
- Fark: yüz yüze kurulum, site + QR + sosyal medya tek elde, komisyonsuz, yerel destek.
- Sonraki özellikler (talebe göre): fiş yazıcısı, online ödeme (şirket hesabı ister), paket servis, stok/reçete, çok şube, e-Adisyon entegratörü, Ticaret Bakanlığı fiyat bildirimi dışa aktarma.

### Atölyeye
- Yeni modül "QR sipariş" (kafe, restoran, fırın; randevu modülü gibi 4. adımda). Site menüsü sipariş sisteminden canlı okunur.
- "WhatsApp sepeti": aynı sepet kodu masasız işletmeler için (çiçekçi, fırın, butik); atölyenin bekleyen "WhatsApp sepeti" ve "tükendi" işlerini kapatır.
- Sosyal medya hizmeti ve `haftalik-icerik` skill'i tüm atölye müşterilerine ek hizmet.
- İleride atölye müşteri paneli aynı çekirdek girişe taşınırsa esnaf tek hesapla site + sipariş yönetir.

### Diğer projelere
| Bu projede yazılan | Nereye | Nasıl |
| --- | --- | --- |
| Canlı iş panosu | Saha Operasyon Takip, dayıbaşı | Tarla/araç durumu aynı panoda: bekliyor → yolda → tarlada |
| Sipariş akışı ve onay | Çiftçi Defteri "Köy pazarı" | Ürün siparişi, üretici onayı |
| Yere bağlı QR | Çiftçi Defteri, randevu takip | Traktöre/tarlaya QR ile tek dokunuş kayıt; kapıda QR ile sıra |
| Rol ve davet | Hepsi | Çekirdekte; kafe yeni rol türleriyle sınar |
| Gün sonu raporu, Data panosu | Dayıbaşı, çiftçi | Aynı kalıp |
| `kafe-kurulum` skill'i | Yeni sektörler | "Yeni işletmeyi 1 günde açma" |

**Kural:** taşımalar kafe projesini geciktirmez. 20 gün boyunca yalnız "ucuzsa genel yaz"; gerçek taşıma ikinci proje ihtiyaç duyunca.

## 11. Riskler ve açık sorular

| Risk | Ne olur | Önlem |
| --- | --- | --- |
| e-Adisyon | GİB, masaya servis yapan ve bildirim gönderdiği işletmelere e-Adisyon zorunluluğu getirebilir, en az 3 ay süre verir | Ekranlarda "masa hesabı"; fiş/fatura kafenin kasasından; muhasebeciye bildirim sorulur |
| Fiyat listesi | 11 Ekim 2025'ten beri masada QR yeterli, müşteri isterse basılı liste zorunlu | Menü A4 kasada, QR ile aynı fiyatlardan üretilir |
| Ek ücret yasağı | Servis/masa/kuver ücreti zorunlu tutulamaz (Ocak 2026) | Otomatik ek ücret yok, bahşiş isteğe bağlı |
| Wi-Fi kopması | Mutfak siparişi görmez | İnternetsiz kayıt, sesli "bağlantı koptu", garsondan elle sipariş |
| Sahte sipariş | Masada olmayan sipariş atar | Garson onaylı masa, hız sınırı |
| Sahte QR | Müşteri sahte siteye gider | Kartta kafenin adresi yazılı, lamine ve sabit |
| Altyapı açıkları | Veri kaybı / yetkisiz erişim | 1. haftada giriş koruması, yedek, onay adresi |
| 20 gün yetmemesi | Gecikme | "Sonra" sütununa dokunulmaz; rapor sadeleşebilir, sipariş ve mutfak asla |
| İş ortaklığı | Kod/müşteri sahipliği tartışması | Arkadaşla yazılı anlaşma (atölye sözleşme şablonu) |

### Açık sorular (arkadaş ve kafe sahibi)
- [ ] Arkadaşın md dosyası: plan ve kararlar, Firebase'de ısrar var mı?
- [ ] Kafenin adı, adresi, masa sayısı, kat/bölüm düzeni
- [ ] Garson var mı, kaç kişi; mutfak ve bar ayrı mı?
- [ ] Ödeme masada mı kasada mı; kart POS'u ve yazar kasa hangisi?
- [ ] e-Fatura/e-Arşiv mükellefi mi, GİB'den e-Adisyon bildirimi aldı mı? (muhasebeci)
- [ ] Menü: ürün listesi, fiyatlar, fotoğraflar kimde?
- [ ] Kafede Wi-Fi ve mutfakta tablet var mı?
- [ ] Instagram ve Google İşletme hesabı var mı, girişi kimde?
- [ ] Reklam bütçesi, kafe sahibinin haftada ayıracağı zaman
- [ ] Arkadaşla iş bölümü ve gelir paylaşımı

## Kaynaklar
- e-Adisyon: https://multinet.com.tr/blog/vergi-muhasebe/e-adisyon-nedir-kimler-icin-zorunludur
- Fiyat Etiketi Yönetmeliği değişikliği (Resmî Gazete, 11 Ekim 2025): https://resmigazete.gov.tr/eskiler/2025/10/20251011-6.htm
- Fiyat etiketinde yeni dönem: https://www.alomaliye.com/2025/10/13/fiyat-etiketinde-yeni-donem/amp/
- Servis, kuver, masa ücreti yasağı: https://www.alomaliye.com/2026/01/30/restoranlarda-servis-kuver-ve-masa-ucreti-yasaklandi/amp/
- MENU TIGER: https://www.menutiger.com/tr/faq · RestoMenum: https://apps.apple.com/us/app/restomenum-adisyon-program%C4%B1/id1469639964 · Adisyo: https://kobitime.com/adisyo/ · QAR: https://www.karekod.org/qr-menu-fiyat.html
- Repolar: `mustafa1492/web` (CLAUDE.md, `docs/devir/`), `mustafa1492/genelprojeler` (`dayibasi/CLAUDE.md`, `docs/moduller/`)

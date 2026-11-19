# kafe-devir.md — Kafe/Restoran QR Sipariş ve Adisyon Sistemi: Devir Dokümanı

> Bu doküman, bir Claude sohbetinde yürütülen çalışmayı, o sohbete erişimi olmayan yeni bir ekibe/Claude oturumuna devretmek için yazıldı. Sohbetteki her şey burada açıkça yazılıdır; "konuşulmuştu" diye geçilen bir şey yoktur.
>
> - Sohbet tarihleri: 17 Kasım 2026 (Salı) 12:44 – 14:08 ve 19 Kasım 2026 (Perşembe) 18:16 (Türkiye saati, UTC+3).
> - Proje sahibi (kullanıcı) yazılımcı değil, Türkçe konuşuyor.
> - Bağlı claude.ai Projesi: **"Kafeler Ve Restoranlar İçin Qr Sipariş"**. Proje açıklaması: "Kafeler ve restoranlarda qr dan sipraiş verebilme imkanı sağlayacak bir uygulama geliştiricem". Projeye henüz doküman eklenmedi.

---

## 1. Amaç ve kafe bilgisi

### Sistemden beklenen asıl sonuç
Kafe ve restoranlar için QR kodla sipariş uygulaması:
- Müşteri masadaki QR kodu okutur ve uygulama kurmadan tarayıcıda menüyü açar. QR'ın içinde restoran ve masa bilgisi bulunur.
- Müşteri sepete ürün ekler ve sipariş verir.
- Siparişler mutfak paneline anlık düşer.
- Aynı masadakiler hesabı kişi bazında bölerek öder.
- Restoran sahibi menüyü ve markasını yönetir, her masa için QR kod üretir.
- Ürün birçok restorana **aylık abonelikle** satılacak (SaaS, çok restoranlı yapı).

### Kafe bilgisi
| Konu | Bilgi |
|---|---|
| Deneme yapılacak kafenin adı | **bilinmiyor**. Sohbette verilmedi. Prototiplerdeki "Demo Kafe" ve "Lezzet Durağı" uydurma örnek restoranlardır. |
| Kafenin yeri / adresi | **bilinmiyor** |
| Masa sayısı | **bilinmiyor**. Prototip yönetici panelinde örnek değer 8 masa; müşteri ekranı örneklerinde Masa 5 ve Masa 3 kullanıldı. |
| Personel (garson, mutfak, kasa) | **bilinmiyor**. Sistemde tanımlanan roller şimdilik yalnızca "yonetici" ve "mutfak". Garson ve kasa için ayrı rol yok (bkz. Bölüm 8). |
| Çalışma şekli | **bilinmiyor**. Bilinen tek şey: ilk sürümde online ödeme yok; müşteri "ödeyeceğim / ödedim" diye işaretler, para kasada alınır. |
| İş modeli | Aylık abonelik. İlk aşamada **tek bir kafede 2 ay deneme**; yapı baştan çok restoranlı olacak. |

---

## 2. Sohbetin kronolojik özeti

1. **17.11.2026 12:44 – İlk istek.** Kullanıcı, Claude'dan "deneyimli bir full-stack geliştirici" olarak Türkçe konuşmasını istedi. Adım adım ilerlenecek, her adım basit anlatılacak ve gözle doğrulanabilir bir çıktıyla bitecek; kullanıcı "tamam" demeden sonraki adıma geçilmeyecek. 4 özelliği (müşteri QR menü, mutfak/kasa paneli, hesap bölme, menü yönetimi + QR üretimi), teknik tercihleri ve 7 adımlık çalışma sırasını verdi. "Önce eksik gördüğün en önemli bir soruyu sor" dedi.
2. **Soru-cevap.** Claude şunu sordu: "Tek işletme mi, birçok restorana satılacak ürün mü?" Seçenekler: "Birçok restorana satılacak (Önerilen)", "Sadece tek işletme", "Önce tek, sonra çok". Kullanıcının cevabı: **"Birçok restorana satılacak (Önerilen)"**.
3. **Adım 1, prototip v1.** Claude Design'da (claude.ai artifact, Design canvas) "QR Sipariş – Tıklanabilir Prototip" adlı canvas oluşturuldu. İçinde iki ekran vardı: `Main.dc.html` (müşteri telefon ekranı; menü, sepet, sipariş durumu, hesap bölme) ve `Mutfak.dc.html` (mutfak/kasa paneli; giriş, 4 sütunlu sipariş panosu, ürün tükendi, garson çağrıları). Ekranlar birbirine bağlı değildi.
4. **17.11.2026 13:29 – Ek istekler.** Dört başlık geldi: (1) marka ayarı (logo veya baş harfler, ana ve vurgu rengi), (2) iki ayrı panel (/mutfak ve /yonetici; yöneticide logo, renk paleti ve canlı önizleme, menü yönetimi, masa ve QR, günlük ciro), (3) iki panele ayrı giriş, mutfak hesabının yöneticiye girememesi, müşterinin girişsiz kullanması, (4) çoklu restoran adresleri (/r/demo-kafe/masa/5 vb.). Kullanıcı önce 3-4 maddelik özet istedi, sonra uygulama.
5. **Adım 1, prototip v2.** Önce 4 maddelik özet verildi, sonra yapıldı:
   - `Main.dc.html` marka destekli olarak yeniden yazıldı.
   - `Musteri2.dc.html` eklendi (logosuz örnek restoran "Lezzet Durağı", baş harfler "LD").
   - `Mutfak.dc.html` güncellendi (adres çubuğu, "Mutfak Paneli" adı, mutfak hesabı açıklaması).
   - `Yonetici.dc.html` eklendi (giriş + Özet / Marka ve renkler / Menü / Masalar ve QR, canlı önizleme).
   - Giriş, logo yükleme ve kaydetme simülasyondur. QR görselleri sahte ve okutulamaz.
6. **17.11.2026 14:08 – Adım 2 isteği (veritabanı).** Kullanıcı bu kez "deneyimli bir Firebase geliştiricisi" rolü istedi. İş modelini anlattı (aylık abonelik, tek kafede 2 ay deneme, baştan çok restoranlı). İstekleri: Firestore şeması, güvenlik kuralları, test listesi, aboneliği elle yönetmek için "süper yönetici" yolu. Açık talimat: **"Önce şemayı çiz ve bana onaylat, kod yazmadan."**
7. **Adım 2, şema önerisi.** Claude sohbet içinde görsel bir şema çizdi (Bölüm 6.3). İstenenden farklı 4 tasarım kararını açıkladı: adisyon kavramı, ödemelerin ayrı kayıt olması, müşteri için anonim giriş, fiyat doğrulaması. Abonelik koruması ve süper yönetici önerisini anlattı. Onay için **2 soru** sordu (QR'da gizli kod; ödemeyi kim onaylayacak). Bu sorular **cevaplanmadı**. Güvenlik kuralları ve test listesi **henüz yazılmadı**.
8. **19.11.2026 18:16 – Devir isteği.** Kullanıcı projeyi başka bir ekibe/oturuma devretmek için bu dokümanı istedi.

---

## 3. Alınan kararlar

| # | Karar | Gerekçe | Kim istedi | Durum |
|---|---|---|---|---|
| 1 | Sistem çok restoranlı (SaaS) olacak | Uygulama birçok restorana satılacak | Kullanıcı (soruya cevap) | Kesin |
| 2 | Web uygulaması (PWA), mobil öncelikli, Türkçe arayüz, para birimi TL | Müşteri uygulama kurmadan QR ile açar | Kullanıcı | Kesin |
| 3 | Firebase: Firestore + Authentication + Hosting | Anlık veri | Kullanıcı | Kesin |
| 4 | İlk sürümde gerçek online ödeme yok; müşteri işaretler, para kasada alınır. iyzico/PayTR sonra eklenecek | Kullanıcının tercihi | Kullanıcı | Kesin |
| 5 | Çalışma sırası 7 adım (Bölüm 9) | — | Kullanıcı | Kesin |
| 6 | Önce tıklanabilir görsel prototip (Claude Design canvas) | Kullanıcı ilk adımı böyle istedi | Kullanıcı | Yapıldı |
| 7 | Her restoranın logosu müşteri ekranında sol üstte; logo yoksa ad baş harfleri | Marka ayarı | Kullanıcı | Kesin, prototipte var |
| 8 | Ana renk: butonlar, seçili kategori, sepet çubuğu. Vurgu rengi: fiyatlar ve tutarlar | Kullanıcı "butonlar, seçili kategori, fiyatlar" dedi; ayrımı Claude yaptı | Kullanıcı + Claude | Prototipte var |
| 9 | Seçilen renk düşük kontrastlıysa yazı otomatik koyulaşır ve yönetici panelinde uyarı çıkar | Okunabilirlik | Claude'un önerisi | Prototipte var; kullanıcı itiraz etmedi |
| 10 | İki ayrı panel: /mutfak ve /yonetici, ayrı giriş ekranları | Rol ayrımı | Kullanıcı | Kesin |
| 11 | Mutfak hesabı yönetici paneline giremez; müşteri menüsü girişsiz açılır | Güvenlik | Kullanıcı | Kesin |
| 12 | Adres yapısı: /r/{slug}/masa/{no}, /r/{slug}/mutfak, /r/{slug}/yonetici | Çoklu restoran | Kullanıcı | Kesin (masa adresi için bkz. #20) |
| 13 | Gerçek uygulamada Firebase Authentication kullanılacak; prototipte giriş ve renk değişimi simüle edilebilir | — | Kullanıcı | Kesin |
| 14 | Restoran belgesinin ID'si = slug (örn. `restoranlar/demo-kafe`) | Basitlik | Claude önerisi | **Kesin değil** (şema onay bekliyor) |
| 15 | "Adisyon" (masanın açık hesabı) kavramı: siparişler ve ödemeler adisyona yazılır, kasa hesabı kapatır, sonraki müşteri temiz başlar | Hesap bölme ve masa oturumu için gerekli | Claude önerisi | **Kesin değil** |
| 16 | Aynı masadakiler o masanın adisyonunu (tüm kalemleri) görür, başka masalarınkini kimse göremez | Hesap bölme bunu gerektiriyor. Kullanıcının "başkasının siparişlerini okuyamaz" isteği "başka masaların" diye yorumlandı | Claude önerisi | **Kesin değil** |
| 17 | Her "ödeyeceğim" işareti ayrı bir ödeme kaydı; kalan tutar bu kayıtlardan hesaplanır | Aynı anda ödeyenlerin birbirinin kaydını ezmemesi | Claude önerisi | **Kesin değil** |
| 18 | Müşteri için Firebase anonim giriş (görünmez) | "Bu sipariş senin" ayrımı; müşteri yalnızca kendi siparişlerini görür | Claude önerisi | **Kesin değil** |
| 19 | Sipariş kalemi fiyatını müşteri yazamaz; kural menüdeki fiyatla karşılaştırır, tükendi ürünü reddeder | Fiyat hilesini önlemek | Claude önerisi | **Kesin değil** |
| 20 | QR adresinde masa numarası yerine tahmin edilemez kod: `/r/demo-kafe/m/7Hk2xQ` (ekranda yine "Masa 5" yazar) | `/masa/5` olursa evdeki biri numarayı değiştirerek başka masanın hesabını görür veya sahte sipariş atar | Claude önerisi | **Kesin değil, kullanıcıya soruldu, cevap yok** |
| 21 | Abonelik bilgisi restoran belgesinde `abonelik` alanında durur; yönetici bile değiştiremez, yalnızca süper yönetici değiştirir | Kullanıcı "restoran içinde" istedi; yöneticinin kendi aboneliğini değiştirmesi engellenmeli | Kullanıcı + Claude | **Kesin değil** |
| 22 | Abonelik "süresi doldu" veya "askıda" ise yeni sipariş reddedilir, müşteri "Şu an sipariş alınamıyor" görür | — | Kullanıcı | Kesin (istek) |
| 23 | Süper yönetici: Firebase konsolunda `superAdminler/{uid}` belgesi elle eklenir. Abonelik ilk 2 ay konsoldan tek alan değiştirilerek yönetilir. Restoran sayısı artınca küçük bir süper yönetici sayfası yapılır | Deneme için kod yazmaya gerek yok | Claude önerisi | **Kesin değil** |
| 24 | Ödemeyi kasada "alındı" diye kim onaylayacak? Seçenekler: a) sadece yönetici, b) mutfak hesabı da, c) ayrı "kasa" rolü | — | Claude sordu | **Kesin değil, cevap yok** |

---

## 4. Özellik listesi

### 4.1 Müşteri ekranı (QR menü)
**Prototipte olanlar:**
- Uygulama kurmadan tarayıcıda açılır; girişsizdir.
- Üstte adres şeridi (örn. `ornek.com/r/demo-kafe/masa/5`).
- Başlıkta logo (yoksa baş harfler), restoran adı, "Masa N" ve "Garson çağır" düğmesi (bildirim gösterir: "Garson çağrıldı, masanıza geliyor").
- Yatay kaydırılan kategori hapları. Seçili kategori ana renkte.
- Ürün kartları: fotoğraf (yoksa "Fotoğraf" yer tutucu), ad, açıklama, fiyat (vurgu renginde), "+" ile sepete ekleme, eklenince − / adet / + sayacı. Tükenmiş ürün gri zeminde "Tükendi" etiketiyle gösterilir ve eklenemez.
- Alt "Sepeti gör" çubuğu: adet rozeti ve toplam tutar.
- Sepet: geri düğmesi, ürün satırları (birim fiyat, sayaç, satır toplamı), "Mutfağa not (isteğe bağlı)" alanı, toplam, "Siparişi gönder" düğmesi. Altında: "Ödeme şimdi alınmaz. Hesabı istediğinizde “Hesap” sekmesinden bölüp kasada ödersiniz."
- Siparişlerim: her sipariş kartında "Sipariş #101", toplam, kalemler ve 4 adımlı durum çizelgesi (Yeni → Hazırlanıyor → Hazır → Servis edildi) ile durum metni. Prototipte durum 5 saniyede bir kendiliğinden ilerler.
- Hesap (masa hesabı): masa toplamı, ödenen, ilerleme çubuğu, kalan tutar; "Kalanın tümünü seç"; her kalemde seçim kutusu, "Böl" düğmesi (1→2→3→4 kişi döngüsü), kişi başı pay, "₺650 ÷ 3 kişi" gibi açıklama, durum (Ödenmedi / Ortak ürün / Kalan ₺X / Ödendi). Altta "Sizin payınız" ve "Ödeyeceğim (kasada)" düğmesi.
- Alt sekme çubuğu: Menü, Siparişlerim, Hesap.

**İstenen ama prototipte henüz gerçek olmayanlar:** gerçek veriyle çalışma (adım 3), mutfakla anlık bağlantı (adım 4), abonelik bitince "Şu an sipariş alınamıyor" mesajı (prototipte yok; kural olarak istendi), PWA kurulumu.

### 4.2 Mutfak paneli (/r/{slug}/mutfak)
**Prototipte olanlar:**
- Ayrı giriş ekranı (e-posta + şifre). Prototipte boş bırakılıp girilebilir.
- Üstte sipariş sayısıyla birlikte "Siparişler (N)" ve "Ürün durumu" sekmeleri.
- Sipariş panosu 4 sütun: Yeni, Hazırlanıyor, Hazır, Servis edildi.
- Sipariş kartı: "Masa N", "#id · süre", "YENİ GELDİ" rozeti, kalemler, not ve durumu ilerleten düğme ("Hazırlamaya başla" → "Hazır" → "Servis edildi").
- Garson çağrıları üstte uyarı şeridi olarak çıkar ("Masa 3 garson çağırıyor · az önce") ve "Gidiyorum" ile kapanır.
- Ürün durumu: her ürün için "Satışta / Tükendi" düğmesi.
- Demo düğmeleri: "Demo: yeni sipariş", "Demo: garson çağrısı". Ayrıca "Çıkış".

**Kurallar (istenen):** Mutfak siparişleri okur ve durumlarını günceller, ürünü tükendi işaretler. Menüyü, fiyatları ve ayarları değiştiremez.

### 4.3 Garson / kasa
- Ayrı bir garson veya kasa ekranı **yok** ve istenmedi.
- "Garson çağır" müşteriden mutfak paneline düşen bir uyarı olarak tasarlandı. Prototipte iki ekran bağlı değil.
- İlk istekte panelin adı "Mutfak/kasa paneli" idi. İkinci istekte paneller /mutfak ve /yonetici olarak ayrıldı ve kasa işlevi açıkta kaldı.
- Ödemeyi kasada kimin onaylayacağı sorusu cevapsız (Bölüm 3 #24).

### 4.4 Yönetici paneli (/r/{slug}/yonetici)
**Prototipte olanlar:**
- **Giriş:** E-posta + şifre. E-postada "mutfak" geçerse hata verir: "Bu bir mutfak hesabı. Mutfak hesapları yönetici paneline giremez; lütfen ornek.com/r/demo-kafe/mutfak adresinden giriş yapın." Demo düğmeleri: "Yönetici hesabıyla gir", "Mutfak hesabıyla girmeyi dene".
- **Özet:** Bugünün tarihi ve "örnek veri" ibaresi; 4 kart (Bugünkü ciro, Sipariş sayısı, Ortalama hesap, Masada bekleyen); "En çok satanlar (ciroya göre)" çubuk listesi; "Tahsilat durumu" (Kasada alınan, Masada bekleyen, Açık masa).
- **Marka ve renkler:** Restoran adı alanı; restoran adresi bilgisi; logo (Logo yükle / Logoyu kaldır / Örnek logo); ana renk için 7 hazır renk ve özel renk seçici; vurgu rengi için 7 hazır renk ve özel renk seçici; kontrast uyarıları; "Değişiklikleri kaydet". Sağda canlı telefon önizlemesi (gerçek müşteri ekranı küçültülmüş hâlde).
- **Menü:** Yeni kategori ekleme. Her kategori kartında ürün satırları: fotoğraf yükleme, ad, açıklama, fiyat (₺), Satışta/Tükendi, sil. "+ Bu kategoriye ürün ekle". Boş kategori silinebilir. Değişiklikler canlı önizlemeye yansır.
- **Masalar ve QR:** Masa sayısı (1–60 arası, − / +); "Tümünü yazdır (PDF)" (simülasyon); her masa için QR kartı (sahte, okutulamaz QR görseli, "Masa N", adres, "İndir" simülasyonu).

**İstenen ama yapılmayanlar:** gerçek QR üretimi (adım 6), gerçek kayıt (Firebase), gerçek ciro hesabı.

### 4.5 Vazgeçilen özellikler
- Sohbette açıkça vazgeçilen bir özellik yok.
- Kapsamdaki tek değişiklik: ilk sürümdeki tek "Mutfak/kasa paneli", ikinci istekte /mutfak ve /yonetici olarak ikiye ayrıldı. Menü yönetimi, QR ve ayarlar yöneticiye taşındı.

### 4.6 Siparişten hesabın kapanmasına kadar akış (önerilen; adisyon kısmı kesin değil)
1. Müşteri masadaki QR'ı okutur. Restoranın ve masanın adresi açılır (örn. `/r/demo-kafe/masa/5`; önerilen alternatif `/r/demo-kafe/m/7Hk2xQ`).
2. Arka planda anonim giriş yapılır (öneri).
3. Masanın açık bir adisyonu yoksa açılır, varsa ona katılınır (öneri).
4. Müşteri menüden sepete ekler ve "Siparişi gönder"e basar.
5. Sistem şunları kontrol eder: abonelik deneme veya aktif mi, ürün tükenmiş mi, fiyat menüyle aynı mı. Uygunsa sipariş `siparisler`e, kalemler adisyonun `kalemler`ine yazılır.
6. Sipariş mutfak panelinde "Yeni" sütununa düşer. Mutfak durumu Hazırlanıyor → Hazır → Servis edildi olarak ilerletir; müşteri "Siparişlerim"de görür.
7. Hesap zamanı gelince masadakiler "Hesap" sekmesinde aynı adisyonu görür. Herkes kendi kalemlerini seçer, ortak ürünleri kişi sayısına böler ve "Ödeyeceğim (kasada)" der. Her seferinde bir ödeme kaydı oluşur (durum: bildirildi). Masada kalan tutar herkese görünür.
8. Para kasada alınır ve yetkili kişi ödemeyi "alındı" işaretler. **Kimin yapacağı kesin değil.**
9. Kalan sıfırlanınca adisyon kapatılır ve masa sonraki müşteri için boşalır. **Kimin kapatacağı kesin değil;** "kasa hesabı kapatıyor" denildi.

### 4.7 Roller ve görme/değiştirme yetkileri (istenen + önerilen)
| Rol | Görebilir | Değiştirebilir | Göremez / yapamaz |
|---|---|---|---|
| Müşteri (girişsiz, öneri: anonim kimlik) | Menü (kategori, ürün), kendi siparişleri, kendi masasının adisyonu | Sipariş oluşturma, kendi ödeme kaydı ("ödeyeceğim") | Başka masaların hesapları ve siparişleri, menü veya fiyat değişikliği; abonelik bitmişse yeni sipariş |
| Mutfak | Kendi restoranının siparişleri, ürünler | Sipariş durumu, ürünün tükendi durumu | Menü, fiyat ve ayar değişikliği; yönetici paneli; başka restoranlar |
| Yönetici (restoran sahibi) | Kendi restoranındaki her şey | Kendi restoranındaki her şey (menü, marka, masalar, kullanıcılar vb.) | Kendi aboneliğini değiştirmek (öneri), başka restoranlar |
| Süper yönetici (proje sahibi) | Tüm restoranlar | Abonelik durumu | — |

---

## 5. Tasarım

### 5.1 Claude Design canvas
- Ad: **"QR Sipariş – Tıklanabilir Prototip"**
- Link: https://claude.ai/artifact/5EYaRzwfj41PLw8nBMGVk8
- Artifact slug: `2248aeec-7b62-444e-8a95-f892e98f2e4d`. Son yayınlanan sürüm: `1794911803-1e60`.
- Sahibi kullanıcı ve canvas yalnızca ona özel. Paylaşılmadıysa başka hesaplar açamaz.
- Ekranlar Oynat (▶) düğmesiyle tıklanarak denenir.
- **Önemli:** Önceki Claude, kurallar gereği canvas'ı kendisi açıp test etmedi. Ekranların hatasız çalıştığı doğrulanmadı ve kullanıcı geri bildirim vermedi.

Canvas'taki artboard'lar (dosya yolu `project/` altında):
| Dosya | Canvas başlığı | Konum / boyut | Tür |
|---|---|---|---|
| `Main.dc.html` | "Müşteri · /r/demo-kafe/masa/5 (logolu)" | x0 y0, 390×844 | etkileşimli, telefon |
| `Musteri2.dc.html` | "Müşteri · /r/lezzet-duragi/masa/3 (logosuz → baş harfler)" | x470 y0, 390×844 | etkileşimli; Main'i `restaurant="lezzet-duragi"` ile içe aktarır |
| `Mutfak.dc.html` | "Mutfak · /r/demo-kafe/mutfak" | x940 y0, 1280×860, tam sayfa (fill) | etkileşimli |
| `Yonetici.dc.html` | "Yönetici · /r/demo-kafe/yonetici" | x0 y1400, 1440×1100, tam sayfa (fill) | etkileşimli |

Canvas notları:
- Başlık (y −300): "Müşteri ekranları ve mutfak paneli"
- Başlık (y 1100): "Restoran sahibi paneli"
- Turuncu yapışkan not (y 900): "Menü, fiyatlar, ciro ve masa hesabı örnek veridir. Ekranlar birbirine bağlı değil (gerçek bağlantı 4. adımda Firebase ile). Yönetici panelinde renk ve menü değişiklikleri yandaki canlı önizlemeye anında yansır."

### 5.2 Ekranların ayrıntıları (alanlar, düğmeler, metinler)

#### Müşteri – Main.dc.html (390×844)
- Adres şeridi: kilit simgesi + `ornek.com/r/{slug}/masa/{masaNo}`
- Başlık:
  - Logo kutusu 44×44, köşe 12px. Örnek logo: kahve fincanı çizimi, zemin #3F2A1D, çizgi #FDE68A. Yüklenen logo görsel olarak gösterilir. Logo yoksa baş harfler ana renk zeminde (örn. "DK", "LD").
  - Restoran adı, "Masa 5"
  - "Garson çağır" düğmesi (zil simgesi)
- Menü sekmesi: kategori hapları (44px yükseklik), ürün kartları (fotoğraf 88×88, ad, açıklama, fiyat, "+" / sayaç / "Tükendi")
- Sepet:
  - Başlık "Sepetiniz", boşken "Sepetiniz boş. Menüden ürün ekleyin."
  - Satır: ad, "₺X / adet", − adet +, satır toplamı
  - "Mutfağa not (isteğe bağlı)" (yer tutucu: "Örn: Az tuzlu olsun"), "Toplam", "Siparişi gönder"
  - Bilgi notu: "Ödeme şimdi alınmaz. Hesabı istediğinizde “Hesap” sekmesinden bölüp kasada ödersiniz."
- Siparişlerim:
  - Başlık "Siparişlerim", boşken "Henüz sipariş vermediniz."
  - Kart: "Sipariş #101", toplam, kalemler ("1× Menemen, 2× Çay"), 4 adım (Yeni, Hazırlanıyor, Hazır, Servis edildi)
  - Durum metinleri: "Siparişiniz alındı, mutfağa iletildi." / "Siparişiniz mutfakta hazırlanıyor." / "Siparişiniz hazır, masanıza geliyor." / "Servis edildi. Afiyet olsun!"
  - Alt not: "Prototipte durum birkaç saniyede bir kendiliğinden ilerler. Gerçekte mutfak panelinden güncellenir."
- Hesap:
  - Başlık "Masa hesabı"; koyu kart: "Masa toplamı", "Ödenen", ilerleme çubuğu (#22C55E), "Kalan tutar"
  - Açıklama: "Kendi yediklerinizi seçin. Ortak ürünlerde “Böl” ile kaç kişiye bölüneceğini seçin. Bu hesabı masadaki herkes görür."
  - "Kalanın tümünü seç"
  - Kalem satırı: seçim kutusu, ad, alt durum, pay, "₺650 ÷ 3 kişi" veya "tam tutar", "Böl" / "N kişi"
  - Alt çubuk: "Sizin payınız" ve "Ödeyeceğim (kasada)"
  - Ödeme sonrası bildirim: "₺X kasada ödenecek olarak işaretlendi"
- Bildirimler: "Siparişiniz mutfağa iletildi", "Garson çağrıldı, masanıza geliyor"
- Alt sekmeler: "Menü", "Siparişlerim", "Hesap"

#### Mutfak – Mutfak.dc.html
- Adres şeridi: `ornek.com/r/demo-kafe/mutfak`
- Giriş kartı:
  - "Demo Kafe", başlık "Mutfak Paneli", alt metin "Mutfak hesabınızla giriş yapın"
  - "E-posta" (yer tutucu `mutfak@demokafe.com`), "Şifre", "Giriş yap"
  - Not: "Mutfak hesabı yalnızca siparişleri ve ürün stok durumunu görür; menü, fiyat ve ciroya erişemez. Prototip: alanları boş bırakıp “Giriş yap”a basabilirsiniz."
- Başlık çubuğu (koyu): "Demo Kafe · mutfak hesabı", "Mutfak Paneli"; düğmeler: "Demo: yeni sipariş", "Demo: garson çağrısı", "Çıkış"
- Garson çağrısı şeridi: "Masa N garson çağırıyor · az önce" ve "Gidiyorum"
- Sekmeler: "Siparişler (N)", "Ürün durumu"
- Sipariş sütunları ve renkleri: Yeni (#C2410C), Hazırlanıyor (#B45309), Hazır (#15803D), Servis edildi (#57534E). Boş sütunda "Sipariş yok".
- Kart: "Masa N", "#id · süre", "YENİ GELDİ", kalemler ("2× Çay"), "Not: ...", aksiyon düğmesi
- Ürün durumu metni: "Tükendi olarak işaretlenen ürün müşteri menüsünde gri görünür ve sepete eklenemez." Düğmeler: "Satışta" (yeşil #15803D) ve "Tükendi" (kırmızı çerçeve #B91C1C).

#### Yönetici – Yonetici.dc.html
- Adres şeridi: `ornek.com/r/demo-kafe/yonetici`
- Giriş: "Demo Kafe", "Yönetici Paneli", "Restoran sahibi hesabınızla giriş yapın", "E-posta" (yer tutucu `sahip@demokafe.com`), "Şifre", "Giriş yap", "Prototipte deneyin:", "Yönetici hesabıyla gir", "Mutfak hesabıyla girmeyi dene", hata metni (Bölüm 4.4).
- Başlık: "{ad} · yönetici hesabı", "Yönetici Paneli", "Müşteri menüsü: ornek.com/r/demo-kafe", "Çıkış"
- Sol menü: "Özet", "Marka ve renkler", "Menü", "Masalar ve QR"
- Özet: "Bugünün özeti", "{tarih} · örnek veri"; kart değerleri Bölüm 5.5'te; "En çok satanlar (ciroya göre)"; "Tahsilat durumu". Not: "İlk sürümde ödemeler kasada alınır; müşterinin “ödeyeceğim” işaretlediği tutarlar burada toplanır."
- Marka ve renkler:
  - "Restoran adı"; "Restoran adresi: ornek.com/r/demo-kafe (restoran açılırken bir kez belirlenir)"
  - "Logo" bölümü: "Logo yükle", "Logoyu kaldır", "Örnek logo". Açıklama: "Logo yoksa müşteri ekranında adınızın baş harfleri ana renkte görünür. Kare, en az 256×256 piksel PNG veya JPG önerilir."
  - "Ana renk — Butonlar, seçili kategori, sepet çubuğu"; "Vurgu rengi — Fiyatlar ve tutarlar"; "Özel" renk seçici
  - Uyarılar:
    - Ana renk kontrastı < 3: "Bu ana renk açık olduğu için buton yazıları müşteri ekranında koyu renkte gösterilecek."
    - Ana renk kontrastı 3–4.5: "Bu renk ince yazılarda biraz zor okunur; menüdeki küçük vurgular koyu gösterilecek."
    - Vurgu rengi kontrastı < 4.5: "Bu vurgu rengi beyaz zeminde zor okunur; fiyatlar müşteri ekranında koyu renkte gösterilecek."
  - "Değişiklikleri kaydet" → "Kaydedildi (prototip). Gerçek uygulamada müşteri menüsü anında güncellenecek."
  - Sağda "Canlı önizleme · müşteri ekranı" ve "Önizlemede tıklayabilirsiniz. Değişiklikler anında yansır."
- Menü: "Menü yönetimi", "Yeni kategori" (yer tutucu "Örn: Salatalar"), "Kategori ekle"; kategori başlığı "{ad} · N ürün", "Kategoriyi sil" (yalnızca boşken); ürün satırı: "Fotoğraf", "Ürün adı", "Açıklama", "Fiyat (₺)", "Satışta/Tükendi", çöp kutusu; yeni ürün varsayılanı "Yeni ürün", fiyat 0; "+ Bu kategoriye ürün ekle".
- Masalar ve QR:
  - "Masa sayısı" (− N +, 1–60, varsayılan 8), "Tümünü yazdır (PDF)" → "Toplu yazdırma 6. adımda çalışacak"
  - Uyarı: "Bu görseller örnektir ve okutulamaz. Gerçek, okutulabilir QR kodları 6. adımda üretilecek. Her QR kendi masasının adresini açar: ornek.com/r/demo-kafe/masa/numara"
  - Kart: QR görseli (140px), "Masa N", `ornek.com/r/demo-kafe/masa/N`, "İndir" → "Masa N QR kodu indirme 6. adımda çalışacak"

### 5.3 Renkler (hex)
**Restoran marka renkleri (örnek):**
- Demo Kafe: ana `#C2410C` (turuncu), vurgu `#92400E`, logo türü "demo" (fincan, zemin `#3F2A1D`, çizgi `#FDE68A`)
- Lezzet Durağı: ana `#166534` (yeşil), vurgu `#B45309`, logo yok → "LD"

**Yönetici panelindeki hazır renkler:**
- Ana renk: Turuncu `#C2410C`, Kırmızı `#B91C1C`, Yeşil `#166534`, Mavi `#1D4ED8`, Mor `#6D28D9`, Siyah `#1C1917`, Sarı `#F59E0B`
- Vurgu rengi: Kahve `#92400E`, Amber `#B45309`, Turkuaz `#0F766E`, Lacivert `#1E40AF`, Bordo `#9D174D`, Antrasit `#44403C`, Açık sarı `#FBBF24`

**Arayüzün sabit renkleri (stone paleti):**
- Zemin `#FAFAF9` / `#F5F5F4`, beyaz `#FFFFFF`
- Ana metin `#1C1917`, ikincil metin `#57534E` ve `#44403C`
- Çizgiler `#E7E5E4` / `#D6D3D1` / `#A8A29E`
- Tamamlandı yeşili `#15803D`, ilerleme çubuğu `#22C55E`, tükendi kırmızısı `#B91C1C`, hata zemini `#FEF2F2`, hata metni `#991B1B`
- Uyarı zemini `#FEF3C7`, uyarı metni `#92400E`, link mavisi `#1D4ED8`
- Fotoğrafı olmayan ürünlerde kategoriye göre yer tutucu zemin sırası: `#FEF3C7`, `#FFE4E6`, `#E0F2FE`, `#EDE9FE`, `#DCFCE7`, `#FCE7F3`

**Türetilen renkler (müşteri ekranında, ana renkten hesaplanır):**
- `tint` = ana rengin %92 beyazla karışımı; `tintBorder` = %70 beyazla karışımı
- `onPrimary` (ana renk üzerindeki yazı) = beyaz kontrastı ≥ 3 ise `#FFFFFF`, değilse `#1C1917`
- `primaryInk` (ana renkte ince yazı) = beyaz zeminde kontrast ≥ 4.5 ise ana renk, değilse `#1C1917`
- `accentInk` (fiyatlar) = kontrast ≥ 4.5 ise vurgu rengi, değilse `#1C1917`

### 5.4 Yazı tipi ve logo
- Yazı tipi: **Inter** (Google Fonts, 400/500/600/700); yedek `system-ui, sans-serif`
- Logo: gerçek bir logo yok. Demo Kafe için çizilmiş fincan simgesi örnek logodur. Yönetici panelinden yüklenen logo yalnızca o oturumda geçicidir (tarayıcı blob adresi).
- Simgeler elle çizilmiş SVG çizgi ikonlardır (zil, kilit, saat, fiş, çöp kutusu vb.); emoji kullanılmadı.

### 5.5 Örnek veriler (TAMAMI ÖRNEK, gerçek değil)
**Demo Kafe menüsü** (kategori → ürün, açıklama, fiyat):
- Kahvaltı: Serpme Kahvaltı (2 kişilik) — Peynir çeşitleri, zeytin, bal-kaymak, yumurta, sınırsız çay — ₺650; Menemen — Domates, biber, yumurta — ₺180; Sucuklu Yumurta — Bakır sahanda — ₺210
- Ana Yemek: Izgara Köfte — Pilav ve közlenmiş biber ile — ₺340; Tavuk Şiş — Bulgur pilavı ve salata ile — ₺300; Mantı — Yoğurt ve tereyağlı sos — ₺260 (**tükendi**)
- İçecek: Türk Kahvesi — Lokum ile — ₺90; Çay — İnce belli bardakta — ₺30; Ev Yapımı Limonata — Taze nane ile — ₺110
- Tatlı: Künefe — Antep fıstıklı — ₺220; Fırın Sütlaç — Tarçın ile — ₺140

**Demo Kafe örnek masa hesabı (Masa 5):** Serpme Kahvaltı (2 kişilik) ₺650 (3 kişiye bölünmüş), Menemen ₺180, Türk Kahvesi ₺90 (ödenmiş), Çay ₺30, Çay ₺30, Künefe ₺220

**Lezzet Durağı menüsü:**
- Dürüm: Tavuk Dürüm — Lavaşta, közlenmiş biber ile — ₺160; Et Dürüm — Lavaşta, soğan ve sumak ile — ₺240
- Pide & Lahmacun: Lahmacun — Yeşillik ve limon ile — ₺120; Kıymalı Pide — Taş fırında — ₺220; Kaşarlı Pide — Taş fırında — ₺200 (**tükendi**)
- İçecek: Ayran — Köpüklü — ₺40; Şalgam — Acılı / acısız — ₺45

**Lezzet Durağı örnek masa hesabı (Masa 3):** Lahmacun ₺120, Lahmacun ₺120 (ödenmiş), Et Dürüm ₺240, Ayran ₺40

**Mutfak paneli örnek siparişleri:**
- #201 Masa 5, 2 dk önce: 1× Menemen, 2× Çay, not "Menemen az tuzlu olsun", Yeni (YENİ GELDİ)
- #202 Masa 2, 4 dk önce: 2× Izgara Köfte, 2× Ev Yapımı Limonata, Yeni
- #198 Masa 7, 9 dk önce: 1× Serpme Kahvaltı (2 kişilik), 2× Türk Kahvesi, Hazırlanıyor
- #195 Masa 1, 14 dk önce: 1× Künefe, Hazır
- #190 Masa 4, 22 dk önce: 1× Tavuk Şiş, Servis edildi
- Garson çağrısı: Masa 3, az önce
- "Demo: yeni sipariş" örnekleri: Masa 8 (1× Sucuklu Yumurta, 1× Çay); Masa 3 (1× Tavuk Şiş, 1× Fırın Sütlaç, not "Salata soslu olmasın"); Masa 6 (3× Türk Kahvesi, not "2 orta, 1 sade"); Masa 9 (1× Izgara Köfte)

**Yönetici özet örnekleri:**
- Bugünkü ciro ₺8.420 (Dün aynı saatte ₺7.150)
- Sipariş sayısı 46 (Ortalama hazırlık 12 dk)
- Ortalama hesap ₺183 (Masa başına)
- Masada bekleyen ₺1.150 (3 açık masa)
- En çok satanlar: Menemen 14 adet ₺2.520; Serpme Kahvaltı (2 kişilik) 3 adet ₺1.950; Çay 64 adet ₺1.920; Türk Kahvesi 15 adet ₺1.350; Künefe 3 adet ₺660
- Tahsilat: Kasada alınan ₺7.270; Masada bekleyen ₺1.150; Açık masa 3

### 5.6 Adres yapısı
- Müşteri: `/r/{slug}/masa/{no}` — örnekler `/r/demo-kafe/masa/5`, `/r/lezzet-duragi/masa/3` (ilk istekte örnek olarak `/r/demo-kafe/masa/3` de yazıldı)
- Mutfak: `/r/{slug}/mutfak` — `/r/demo-kafe/mutfak`
- Yönetici: `/r/{slug}/yonetici` — `/r/demo-kafe/yonetici`
- **Önerilen, kesin değil:** müşteri adresinde gizli masa kodu, `/r/demo-kafe/m/7Hk2xQ`
- `ornek.com` gerçek bir alan adı değil; prototipte yer tutucu olarak kullanıldı. Gerçek alan adı **bilinmiyor**.

### 5.7 "Örnek" olarak işaretli olanlar
Menüler, fiyatlar, masa hesapları, mutfak siparişleri, yönetici ciro rakamları, "Demo Kafe" ve "Lezzet Durağı" adları, fincan logosu, QR görselleri (okutulamaz), `ornek.com` alan adı. Giriş, kaydetme, indirme ve yazdırma simülasyondur.

---

## 6. Teknik plan

### 6.1 Teknolojiler
| Teknoloji | Neden | Hangi adımda |
|---|---|---|
| Web uygulaması / PWA, mobil öncelikli | Müşteri uygulama kurmadan QR ile açar | Adım 3'ten itibaren |
| Firebase Firestore | Anlık veri (siparişlerin mutfağa anında düşmesi) | Adım 2 (yapı), 3–6 |
| Firebase Authentication (e-posta + şifre) | Yönetici ve mutfak girişleri | Adım 2 (kurallar), 4, 6 |
| Firebase anonim giriş (öneri, kesin değil) | Müşteriye görünmez kimlik vermek, "kendi siparişini görme" ayrımı | Adım 3 |
| Firestore Security Rules | Restoran ve rol izolasyonu, abonelik kontrolü, fiyat doğrulama | Adım 2 (henüz yazılmadı) |
| Firebase Hosting | Yayına alma | Adım 7 |
| iyzico / PayTR | Online ödeme | İlk sürümde YOK, sonraki aşama |
| Claude Design canvas (`.dc.html`) | Tıklanabilir prototip | Adım 1 (bitti) |

### 6.2 Adımlar ve durumları
1. Tıklanabilir görsel prototip — **bitti** (v1 ve v2). Kullanıcı v2'ye ne "tamam" dedi ne değişiklik istedi; doğrudan adım 2'yi istedi.
2. Veritabanı yapısı — **devam ediyor**. Şema önerildi; kullanıcı onayı ve 2 sorunun cevabı bekleniyor. Güvenlik kuralları, test listesi ve süper yönetici kurulumu yazılmadı.
3. Müşteri tarafını gerçek veriyle çalıştırma — başlamadı
4. Mutfak paneli ve anlık sipariş akışı — başlamadı
5. Hesap bölme mantığı — başlamadı (prototipte arayüz ve hesap mantığı var)
6. Menü yönetim paneli ve QR üretimi — başlamadı (prototipte arayüz var, QR sahte)
7. Yayına alma (Firebase Hosting) — başlamadı

### 6.3 Önerilen Firestore veri yapısı (onay bekliyor)
```
restoranlar/{slug}                      ← belge ID'si = adres kısmı (örn. demo-kafe)
  ad, logoUrl, anaRenk, vurguRenk, masaSayisi, siparisAcik
  abonelik: { plan, durum (deneme / aktif / suresi_doldu / askida), denemeBitis, donemBitis }
                                          ← SADECE süper yönetici değiştirir

  kategoriler/{id}       ad, sira
  urunler/{id}           kategoriId, ad, aciklama, fiyat, fotoUrl, tukendi, sira
                          ← mutfak: sadece "tukendi" alanını değiştirebilir
  masalar/{gizliKod}     no (örn. 5), aktifAdisyonId
  siparisler/{id}        adisyonId, masaNo, kalemler (ad, adet), not, durum, olusturanId, zaman
                          ← mutfak: sadece "durum" alanını değiştirebilir
                          ← durum değerleri: yeni / hazirlaniyor / hazir / servis (prototipteki etiketler: Yeni, Hazırlanıyor, Hazır, Servis edildi)
  adisyonlar/{id}        masaNo, durum (acik / kapali), acilis, kapanis     ← "masanın açık hesabı"
    kalemler/{id}        siparisId, urunId, ad, birimFiyat, adet
    odemeler/{id}        kisiAdi, kisiId, parcalar (kalem + tutar + kaç kişiye bölündü), toplam,
                         durum (bildirildi / alındı)

kullanicilar/{uid}       restoranId, rol (yonetici / mutfak), ad, eposta, aktif
superAdminler/{uid}      ad   ← sadece Firebase konsolundan elle eklenir (proje sahibi)
```
İlişkiler ve mantık:
- Kullanıcı belgesi kişiyi tek bir restorana ve role bağlar. Kurallar her istekte bu belgeye bakar; kişi başka bir restoranın klasörüne giremez.
- Masa belgesinin ID'si gizli koddur (öneri). Müşteri koda sahipse masayı okur, oradan aktif adisyona ulaşır.
- Siparişler mutfak listesi için `siparisler`de, hesap için kalemler `adisyonlar/{id}/kalemler`de tutulur.
- Masada kalan tutar = adisyon kalemlerinin toplamı − ödeme kayıtlarının toplamı (istemcide hesaplanır, öneri).
- Abonelik durumu "suresi_doldu" veya "askida" ise sipariş oluşturma kuralla reddedilir.
- Fiyat kuralı: kalem `birimFiyat` = `urunler/{urunId}.fiyat` ve ürün tükenmemiş olmalı.

**Önceki Claude'un notu (sohbette kullanıcıya söylenmedi, kendi değerlendirmesiydi; doğrulanmalı):**
- Müşterinin tahmin edilemez ID'li belgeyi okuyabilmesi ama listeleyememesi, Firestore kurallarında `get` izni verip `list` iznini kapatarak sağlanabilir.
- Yöneticinin `abonelik` alanını değiştirememesi, güncelleme kuralında değişen alanları kontrol ederek (`request.resource.data.diff(resource.data).affectedKeys()`) sağlanabilir.
- Bunlar plan düzeyinde, kodu yazılmadı.

### 6.4 Yazılmış kod (prototip)
Kod yalnızca prototip için yazıldı (Claude Design `.dc.html` formatı). Gerçek uygulama kodu, Firebase kodu ve güvenlik kuralı **yok**.

Dosyalar (canvas içinde `project/`; bu dokümanla birlikte ayrı dosya olarak da verildi):
- `project/canvas.json` (canvas dizini)
- `project/Main.dc.html` (müşteri ekranı; restoran yapılandırmaları, marka ve kontrast mantığı, sepet, sipariş, hesap bölme)
- `project/Musteri2.dc.html` (Main'i `restaurant="lezzet-duragi"` ve `table=3` ile içe aktaran sarmalayıcı)
- `project/Mutfak.dc.html` (mutfak paneli)
- `project/Yonetici.dc.html` (yönetici paneli; Main'i canlı önizleme olarak içe aktarır)

Format notu: `.dc.html` dosyaları Claude Design'ın bileşen formatıdır. `<x-dc>` içinde şablon, `{{hole}}` yer tutucuları, `<sc-if>` / `<sc-for>` / `<dc-import>` etiketleri ve `class Component extends DCLogic` içinde `renderVals()` kullanılır. Gerçek uygulamaya (ör. React/Vue/düz JS) **taşınması** gerekir; doğrudan üretim kodu değildir.

Önemli parçalar (aynen):

**Main.dc.html – kabul edilen props (data-props):**
```
{"restaurant":{"editor":"enum","options":["demo-kafe","lezzet-duragi"],"default":"demo-kafe"},"table":{"editor":"int","min":1,"max":60,"default":5},"brandName":{"editor":null},"logoKind":{"editor":null},"logoUrl":{"editor":null},"primary":{"editor":null},"accent":{"editor":null},"menuData":{"editor":null},"$preview":{"width":390,"height":844}}
```

**Main.dc.html – yapılandırma ve marka mantığı:**
```js
  cfg() {
    var p = this.props || {};
    var all = this.restaurants();
    var slug = all[p.restaurant] ? p.restaurant : 'demo-kafe';
    var base = all[slug];
    var menu = p.menuData && p.menuData.items ? p.menuData : base.menu;
    return {
      slug: slug, base: base,
      name: p.brandName || base.name,
      logoKind: p.logoKind || base.logoKind,
      logoUrl: p.logoUrl || base.logoUrl,
      primary: p.primary || base.primary,
      accent: p.accent || base.accent,
      table: p.table || base.table,
      menu: menu
    };
  }

  fmt(v) {
    var r = Math.round(v * 100) / 100;
    return '₺' + r.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  rgb(hex) {
    var h = String(hex || '#000000').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) n = 0;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  mix(hex, amount) {
    var c = this.rgb(hex);
    var m = c.map(function (v) { return Math.round(v + (255 - v) * amount); });
    return 'rgb(' + m.join(',') + ')';
  }

  lum(hex) {
    var c = this.rgb(hex).map(function (v) { v = v / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  contrastWhite(hex) { return 1.05 / (this.lum(hex) + 0.05); }

  initials(name) {
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    var s = parts.slice(0, 2).map(function (w) { return w.charAt(0); }).join('');
    return (s || '?').toLocaleUpperCase('tr-TR');
  }

  brand() {
    var c = this.cfg();
    var okPrimary = this.contrastWhite(c.primary) >= 4.5;
    var okAccent = this.contrastWhite(c.accent) >= 4.5;
    return {
      slug: c.slug, name: c.name, table: c.table,
      logoImage: c.logoKind === 'image' && !!c.logoUrl,
      logoDemo: c.logoKind === 'demo',
      logoNone: c.logoKind === 'none' || (c.logoKind === 'image' && !c.logoUrl),
      logoUrl: c.logoUrl,
      initials: this.initials(c.name),
      primary: c.primary,
      onPrimary: this.contrastWhite(c.primary) >= 3 ? '#FFFFFF' : '#1C1917',
      primaryInk: okPrimary ? c.primary : '#1C1917',
      accentInk: okAccent ? c.accent : '#1C1917',
      tint: this.mix(c.primary, 0.92),
      tintBorder: this.mix(c.primary, 0.7)
    };
  }
```

**Main.dc.html – sipariş verme (prototip; durum 5 saniyede bir ilerler):**
```js
  placeOrder() {
    var self = this;
    var cart = this.state.cart;
    var items = this.items().filter(function (p) { return cart[p.id] > 0 && !p.soldOut; }).map(function (p) {
      return { name: p.name, qty: cart[p.id], price: p.price };
    });
    if (!items.length) return;
    var id = this.state.nextOrder;
    var n = this.state.nextLine;
    var lines = [];
    items.forEach(function (it) {
      for (var i = 0; i < it.qty; i++) { lines.push({ id: 'n' + n, name: it.name, price: it.price, paid: 0 }); n++; }
    });
    this.setState({
      orders: [{ id: id, items: items, status: 0 }].concat(this.state.orders),
      bill: this.state.bill.concat(lines),
      cart: {}, nextOrder: id + 1, nextLine: n, screen: 'status'
    });
    [1, 2, 3].forEach(function (s) {
      self.timers.push(setTimeout(function () {
        self.setState(function (st) {
          return { orders: st.orders.map(function (o) { return o.id === id ? Object.assign({}, o, { status: Math.max(o.status, s) }) : o; }) };
        });
      }, s * 5000));
    });
    this.showToast('Siparişiniz mutfağa iletildi');
  }
```
Not: Prototipte her sipariş kalemi adet sayısı kadar ayrı hesap satırına bölünür (2 çay → 2 satır). Kalem başına `price` (tutar) ve `paid` (ödenen tutar) tutulur.

**Main.dc.html – hesap bölme ve ödeme (prototip mantığı):**
```js
  remaining(l) { return l.price - l.paid; }

  pay() {
    var self = this;
    var st = this.state;
    var total = 0;
    var bill = st.bill.map(function (l) {
      if (!st.sel[l.id]) return l;
      var rem = self.remaining(l);
      if (rem <= 0.005) return l;
      var n = st.split[l.id] || 1;
      var share = Math.min(l.price / n, rem);
      total += share;
      return Object.assign({}, l, { paid: l.paid + share });
    });
    if (total <= 0) return;
    this.setState({ bill: bill, sel: {} });
    this.showToast(this.fmt(total) + ' kasada ödenecek olarak işaretlendi');
  }

  selectAll() {
    var self = this;
    var sel = {};
    this.state.bill.forEach(function (l) { if (self.remaining(l) > 0.005) sel[l.id] = true; });
    this.setState({ sel: sel });
  }
```
"Böl" döngüsü: `split[l.id] = ((split[l.id] || 1) % 4) + 1;` (1→2→3→4→1). Kişi payı = `min(fiyat / kişiSayısı, kalan)`. Kalan 0.005'in altına inince satır "Ödendi" sayılır.

**Yonetici.dc.html – giriş rol kontrolü (prototip simülasyonu):**
```js
  login(e) {
    if (e && e.preventDefault) e.preventDefault();
    var email = String(this.state.loginEmail || '').trim().toLowerCase();
    if (email.indexOf('mutfak') >= 0) {
      this.setState({ loginError: 'Bu bir mutfak hesabı. Mutfak hesapları yönetici paneline giremez; lütfen ornek.com/r/demo-kafe/mutfak adresinden giriş yapın.' });
      return;
    }
    this.setState({ logged: true, loginError: '' });
  }
```

**Yonetici.dc.html – canlı önizleme (Main'in içe aktarılması):**
```html
<div style="width: 332px; height: 718px; overflow: hidden; border-radius: 30px; border: 8px solid #1C1917; background: #FFFFFF">
<div style="width: 390px; height: 844px; transform: scale(0.8513); transform-origin: top left">
<dc-import name="Main" restaurant="demo-kafe" brand-name="{{name}}" logo-kind="{{logoKind}}" logo-url="{{logoUrl}}" primary="{{primary}}" accent="{{accent}}" menu-data="{{menuData}}" hint-size="390px,844px"></dc-import>
</div>
</div>
```
`menuData` yapısı: `{ cats: [{id, name}], items: [{id, cat, name, desc, price (sayı), soldOut, photo}] }`

**Yonetici.dc.html – SAHTE QR görseli (okutulamaz; gerçek QR 6. adımda yazılacak):**
```js
  qr(n) {
    if (this.qrCache[n]) return this.qrCache[n];
    var size = 25, q = 2, dim = size + q * 2;
    var seed = (n * 7919 + 104729) % 233280;
    var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var corners = [[0, 0], [size - 7, 0], [0, size - 7]];
    var path = '';
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var dark = null;
        for (var k = 0; k < 3; k++) {
          var lx = x - corners[k][0], ly = y - corners[k][1];
          if (lx >= -1 && lx <= 7 && ly >= -1 && ly <= 7) {
            if (lx >= 0 && lx <= 6 && ly >= 0 && ly <= 6) {
              dark = lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
            } else { dark = false; }
          }
        }
        if (dark === null) {
          if (y === 6) dark = x % 2 === 0;
          else if (x === 6) dark = y % 2 === 0;
          else dark = rnd() < 0.5;
        }
        if (dark) path += 'M' + (x + q) + ' ' + (y + q) + 'h1v1h-1z';
      }
    }
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + dim + ' ' + dim + '" shape-rendering="crispEdges"><rect width="' + dim + '" height="' + dim + '" fill="#ffffff"/><path d="' + path + '" fill="#000000"/></svg>';
    var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    this.qrCache[n] = url;
    return url;
  }
```

**Mutfak.dc.html – sipariş durumunu ilerletme:**
```js
  advance(id) {
    this.setState(function (st) {
      return { orders: st.orders.map(function (o) { return o.id === id ? Object.assign({}, o, { status: Math.min(3, o.status + 1), fresh: false }) : o; }) };
    });
  }
```
Durum kodları: 0 = Yeni, 1 = Hazırlanıyor, 2 = Hazır, 3 = Servis edildi. Aksiyon düğmesi etiketleri: `['Hazırlamaya başla', 'Hazır', 'Servis edildi']`.

**project/canvas.json (son hâli):**
```json
{"v":3,"createdOnFiles":{"v":1,"at":"2026-11-17T09:50:00Z"},"title":"QR Sipariş – Tıklanabilir Prototip","launch":{"view":"canvas"},"pages":[],"boards":{"Main.dc.html":{"x":0,"y":0,"w":390,"h":844,"title":"Müşteri · /r/demo-kafe/masa/5 (logolu)","is_interactive":true},"Musteri2.dc.html":{"x":470,"y":0,"w":390,"h":844,"title":"Müşteri · /r/lezzet-duragi/masa/3 (logosuz → baş harfler)","is_interactive":true},"Mutfak.dc.html":{"x":940,"y":0,"w":1280,"h":860,"title":"Mutfak · /r/demo-kafe/mutfak","expand":"fill","is_interactive":true},"Yonetici.dc.html":{"x":0,"y":1400,"w":1440,"h":1100,"title":"Yönetici · /r/demo-kafe/yonetici","expand":"fill","is_interactive":true}},"order":["Main.dc.html","Musteri2.dc.html","Mutfak.dc.html","Yonetici.dc.html"],"notes":{"baslik":{"x":0,"y":-300,"text":"Müşteri ekranları ve mutfak paneli","kind":"title1","maxW":2220},"notmenu":{"x":0,"y":900,"w":860,"text":"Menü, fiyatlar, ciro ve masa hesabı örnek veridir. Ekranlar birbirine bağlı değil (gerçek bağlantı 4. adımda Firebase ile). Yönetici panelinde renk ve menü değişiklikleri yandaki canlı önizlemeye anında yansır.","fill":"orange","size":"s"},"baslik2":{"x":0,"y":1100,"text":"Restoran sahibi paneli","kind":"title1","maxW":1440}},"designSystems":[]}
```

---

## 7. Yasal ve iş konuları

| Konu | Durum |
|---|---|
| e-Adisyon | Sohbette **konuşulmadı**. Türkiye'de restoranlar için e-Adisyon yükümlülüğü olabilir; sistemin bununla ilişkisi araştırılmalı (emin değilim). |
| Fiyat listesi (menüde fiyat gösterme zorunluluğu vb.) | **Konuşulmadı.** Menüde fiyatlar zaten gösteriliyor. |
| KVKK | **Konuşulmadı.** Müşteri ödeme kaydında `kisiAdi` (isteğe bağlı ad) ve anonim kimlik saklanması önerildi; aydınlatma metni vb. ele alınmadı. |
| Ödeme | İlk sürümde online ödeme yok; para kasada alınır. iyzico/PayTR sonraki aşamada. |
| Fiyatlandırma (abonelik ücreti) | Aylık abonelik olacak; **ücret bilinmiyor**, konuşulmadı. Plan alanı şemada var (`abonelik.plan`), plan çeşitleri belirlenmedi. |
| Deneme | Tek bir kafede **2 ay** deneme. Abonelik durumu "deneme", `denemeBitis` tarihiyle. |
| Abonelik yönetimi | Elle, proje sahibi tarafından: ödeme alınca deneme/aktif durumu değiştirilecek (süper yönetici yolu, Bölüm 3 #23). |
| İş bölümü | Konuşulmadı. Bilinen: kullanıcı ürünü satacak ve aboneliği yönetecek; geliştirme Claude ile yapılıyor. |

---

## 8. Açık sorular ve riskler

### Açık sorular (cevap bekleyen)
1. **QR adresinde gizli kod** (`/r/demo-kafe/m/7Hk2xQ`) kullanılsın mı? Kullanıcıya soruldu, cevap yok.
2. **Ödemeyi kasada kim "alındı" diye onaylayacak?** a) sadece yönetici, b) mutfak hesabı da, c) ayrı "kasa" rolü. Kullanıcıya soruldu, cevap yok.
3. Şemanın genel onayı (adisyon kavramı, ayrı ödeme kayıtları, anonim giriş, fiyat doğrulama) bekleniyor.
4. Adisyonu kim kapatacak, masa nasıl boşalacak? "Kasa hesabı kapatıyor" denildi; rol belirsiz.
5. Garson rolü olacak mı? Garson çağrısını kim görecek (mutfak paneli mi, ayrı bir ekran mı)?
6. Mutfak ve yönetici hesapları nasıl oluşturulacak? Yönetici kendi panelinden mi ekler, süper yönetici konsoldan mı? **Konuşulmadı.**
7. Deneme kafesinin adı, yeri, masa sayısı ve personel yapısı **bilinmiyor**.
8. Gerçek alan adı **bilinmiyor**.
9. Abonelik ücreti ve plan çeşitleri **bilinmiyor**.
10. Restoran "siparisAcik" alanıyla siparişleri geçici olarak kapatabilir mi? Alan önerildi, özellik olarak konuşulmadı.
11. Kullanıcı prototip v2 hakkında geri bildirim vermedi; değişiklik isteyip istemediği bilinmiyor.

### Riskler
- **Prototip test edilmedi:** Önceki Claude canvas'ı açıp çalıştığını doğrulamadı. Hatalı etkileşimler olabilir.
- **QR görselleri sahte:** Okutulamaz; gerçek QR üretimi yazılmalı.
- **Ekranlar bağlı değil:** Müşteri siparişi mutfağa düşmez; mutfakta tükendi işaretlemek müşteri menüsünü değiştirmez. Tek bağlantı, yönetici panelindeki canlı önizleme.
- **Prototip kalıcı değil:** Sayfa yenilenince tüm değişiklikler kaybolur; yüklenen logo ve fotoğraf geçici tarayıcı adresidir.
- **Sahte sipariş / spam:** Girişsiz (anonim) müşteri sipariş oluşturabildiği için kötüye kullanım mümkün. Gizli masa kodu bu riski azaltmak için önerildi.
- **Sahte "ödeyeceğim" işaretleri:** Müşteri işaretleri kasada onaylanmadıkça gerçek ödeme sayılmamalı. Onaylayacak rol belirsiz.
- **Fiyat hilesi:** Kuralda fiyat doğrulaması yapılmazsa müşteri düşük fiyatla sipariş yazabilir. Kalemleri ayrı belge yaparak kural içinde ürün fiyatıyla karşılaştırma önerildi.
- **Abonelik koruması:** Yöneticinin kendi `abonelik` alanını değiştirmesi kuralla engellenmezse ödeme yapmadan "aktif" olabilir.
- **Yasal:** e-Adisyon, KVKK ve fiyat listesi gereklilikleri incelenmedi.

---

## 9. Sıradaki işler

**Sohbet bittiğinde sıradaki iş:** Adım 2 (veritabanı) sürüyor. Kullanıcıdan şu cevaplar alınmalı:
- (a) QR'da gizli kod onayı
- (b) ödemeyi kimin onaylayacağı: yönetici / mutfak / ayrı kasa rolü
- (c) şemaya genel "tamam" veya değişiklik

**Devam sırası:**
1. Cevaplara göre şemayı kesinleştir; gerekirse yeniden çizip onaylat.
2. Firestore Security Rules'u yaz:
   - Restoran izolasyonu
   - Mutfak: yalnızca sipariş durumu ve ürün tükendi
   - Yönetici: kendi restoranında her şey, abonelik hariç
   - Müşteri: girişsiz menü okuma ve sipariş oluşturma, başkasının siparişini okuyamama
   - Abonelik bitince yeni sipariş reddi; fiyat ve tükendi doğrulaması
   - Süper yönetici yetkisi
3. Kullanıcının elle deneyebileceği basit test listesini çıkar. Örnek: "mutfak hesabıyla menü fiyatını değiştirmeyi dene, reddedilmeli". Diğer örnek senaryolar: başka restoranın siparişini okumayı dene; aboneliği "suresi_doldu" yapıp müşteri olarak sipariş vermeyi dene; yönetici hesabıyla abonelik alanını değiştirmeyi dene; müşteri olarak yanlış fiyatla kalem yazmayı dene; başka masanın adisyonunu okumayı dene.
4. Süper yönetici kurulumunu anlat: Firebase konsolunda `superAdminler/{uid}` belgesi ekleme, aboneliği konsoldan değiştirme.
5. Adım 3: müşteri tarafı gerçek veriyle.
6. Adım 4: mutfak paneli ve anlık sipariş akışı.
7. Adım 5: hesap bölme mantığı.
8. Adım 6: menü yönetim paneli ve gerçek QR üretimi.
9. Adım 7: Firebase Hosting ile yayına alma.
10. Sonraki aşama: iyzico/PayTR online ödeme; restoran sayısı artınca süper yönetici sayfası.

Her adımın sonunda kullanıcıya gözle doğrulanabilir bir çıktı verilmeli ve "tamam" beklenmeli.

---

## 10. Bu sohbette verilen kalıcı talimatlar ve tercihler

- Türkçe konuş.
- Kullanıcı yazılımcı değil: adım adım ilerle, her adımı basit anlat.
- Her adımın sonunda kullanıcının gözüyle görüp doğrulayabileceği bir çıktı ver (ekran, link, önizleme).
- **Kullanıcı "tamam" demeden sonraki adıma geçme.**
- Rol: önce "deneyimli bir full-stack geliştirici", veritabanı aşamasından itibaren "deneyimli bir Firebase geliştiricisi".
- Bir işe başlamadan önce eksik gördüğün en önemli soruyu sor (adım 1'de istendi).
- Değişikliklerde önce ne yapacağını 3–4 maddeyle özetle, sonra yap ve göster (prototip v2'de istendi).
- Veritabanı aşamasında: önce şemayı çiz ve onaylat, **kod yazmadan**.
- Prototipte giriş ve renk değişimi simüle edilebilir; gerçek uygulamada Firebase Authentication kullanılacak.
- İlk sürümde gerçek online ödeme yok.
- Çalışma sırası 7 adım (Bölüm 9 / 6.2) ve yapı baştan çok restoranlı.
- Devir dokümanı kuralları: uydurma bilgi ekleme, emin olunmayan yere "emin değilim" yaz, sohbette geçen rakamları, adları ve linkleri aynen koru.

---

## Sohbette geçen bütün linkler

- Claude Design prototip canvas'ı "QR Sipariş – Tıklanabilir Prototip": https://claude.ai/artifact/5EYaRzwfj41PLw8nBMGVk8
- Prototipte kullanılan yazı tipi kaynağı (Google Fonts, Inter): https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap

Not: `ornek.com/r/demo-kafe/...` adresleri gerçek link değildir; prototipte yer tutucu olarak geçer. Uygulama adresleri: `/r/demo-kafe/masa/5`, `/r/demo-kafe/masa/3`, `/r/lezzet-duragi/masa/3`, `/r/demo-kafe/mutfak`, `/r/demo-kafe/yonetici`, önerilen `/r/demo-kafe/m/7Hk2xQ`.

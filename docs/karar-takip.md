# Karar takibi

> Bekleyen kararların listesi. `kafe-sekreter` tutar. Kararı Mustafa verir. Karar verilince ana oturum `kararlar.md`'ye yazar, sekreter de satırı "Çözülenler"e taşır.
> "Son gün" kararın en geç ne zaman verilmesi gerektiğidir. O günden sonra karar bekleyen iş gecikir.

## Bekleyenler
| # | Karar | Kimden | Bekliyor (gün) | Neyi bekletiyor | Seçenekler / öneri | Son gün |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Kafede garson var mı, kaç kişi; mutfak ve bar ayrı mı? | Kafe sahibi (Muhammed sorar) | 19 Kas'tan beri | Roller (`core/auth`), garson ekranı, veri modeli | Varsa garson rolü olur, yoksa garson ekranı kasaya katılır | 22 Kas |
| 2 | Kafenin adı ve adresteki kısa adı (slug) | Kafe sahibi | 19 Kas'tan beri | config, alan adı, site, QR kartları | — | 22 Kas |
| 3 | Ücretler: kurulum ve aylık bakım + sosyal medya | Mustafa | 19 Kas'tan beri | 22 Kas peşin ödeme, yazılı anlaşma | Atölye modeli: yarısı peşin, yarısı teslimde | 21 Kas |
| 4 | Ücretsiz deneme olacak mı? Olacaksa ilk 2 ayın altyapı masrafını kim öder? | Mustafa + kafe sahibi | 19 Kas'tan beri | Bütçe, sözleşme | Muhammed'in planında 2 ay deneme vardı, `butce.md` ise masrafı kafenin ödeyeceğini varsayıyor | 21 Kas |
| 5 | Hız sınırının sayısı (cihaz ve masa başına) | Mustafa | 19 Kas'tan beri | `siparis_ver` göçü | Sayı Mustafa'nın kararı. Pilotta ölçülüp ayarlanabilir | 25 Kas |
| 6 | Logo ve renk marka ayarı ilk sürümde olacak mı? | Mustafa | 19 Kas'tan beri | Yönetim ekranının kapsamı | Muhammed'in prototipinde var. Tek kafe için şart değil, sonraya bırakılabilir | 24 Kas |
| 7 | Renk paleti ve site yönü | Kafe sahibi (tasarım onayında) | 19 Kas'tan beri | Bütün ekranlar (şu an geçici yeşil palet) | 3 yön Design'da sunulacak | 24 Kas |
| 8 | Atölyedeki 3 açık kafe takviminden çıkarılsın mı? | Mustafa | 19 Kas'tan beri | Hiçbir kafe işi beklemiyor | Öneri: çıkarılsın, site atölyeden yapılmıyor | — |
| 9 | Firebase yerine Supabase: Muhammed'in itirazı var mı? | Muhammed | 19 Kas'tan beri | Hiçbir iş beklemiyor (karar verildi, sadece bilgi) | — | 22 Kas |
| 10 | Kafe alkol satıyor mu? (reklamda 18+ ve Meta kuralları) | Kafe sahibi | 19 Kas'tan beri | Reklam hedeflemesi | — | 1 Ara |
| 11 | Reklam bütçesi ve hedefleme yarıçapı | Mustafa + kafe sahibi | 19 Kas'tan beri | İlk kampanya | — | 7 Ara |

## Çözülenler (son 10)
| Tarih | Karar | Nerede |
| --- | --- | --- |
| 19 Kas | Hesabı kasa böler ve kapatır (kasa = yönetici) | `kararlar.md` |
| 19 Kas | Her masaya 1 QR (tahmin edilemez kod); siparişi müşteri onaylar, personel onayı yok | `kararlar.md` |
| 19 Kas | Site özel tasarım, bu projede | `kararlar.md` |
| 19 Kas | Alan adı 3 Ara, Vercel Pro 8 Ara | `kararlar.md` |

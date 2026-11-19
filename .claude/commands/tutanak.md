---
description: Bir görüşmenin tutanağını çıkar (kim ne dedi, kararlar, yapılacaklar) ve takvim, karar takibi ve Konulara işle
argument-hint: <kiminle> [anlatım]
---
Girdi: **$ARGUMENTS**. Kiminle olduğu yoksa sor. Anlatım yoksa "Anlat, ne konuştunuz?" de ve bekle.

1. `kafe-sekreter`'i çağır. Ona hesap adını, kiminle görüşüldüğünü, bugünün tarihini ve anlatımı olduğu gibi ver. Sekreter `docs/tutanaklar/<YYYY-AA-GG>-<kiminle>.md` dosyasını şablona göre yazar.
2. Sekreterin önerdiği takvim değişikliklerini ve yeni karar sorularını kullanıcıya tek listede göster. Hesap Mustafa ise "işleyeyim mi?" diye sor. Hesap başkasıysa karar ve takvim önerilerini Mustafa'ya atanmış tek bir `karar` Konusu olarak aç.
3. Cevaplanan Konu maddelerini ve yeni işleri `/aktar` kuralıyla Konulara işle.
4. Tutanak dosyasını commit + push et. Tutanak yeni dosya olduğu için sıra beklenmez. Mesaj: "Tutanak: <kiminle> <tarih>". Kullanıcıya en fazla 4 satır özet ver.

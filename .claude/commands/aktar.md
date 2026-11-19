---
description: Görüşmede ya da sahada öğrendiklerini anlat; Claude bunları doğru Konulara işler
argument-hint: [anlatacakların; boşsa Claude sorar]
---
Girdi: **$ARGUMENTS**. Girdi boşsa "Anlat, ne konuştunuz?" diye sor ve kullanıcının anlatmasını bekle. Sesli not ya da dağınık bir anlatım olabilir.

1. Anlatılanı tek tek bilgilere ayır. Sadece söyleneni yaz; tahmin ekleme. Belirsiz kalan yeri sor (en fazla 3 soru).
2. Her bilgiyi ilgili açık Konuya eşleştir. Cevaplanan maddeye yorum yaz ve işaretle (`- [x]`). Bir Konunun bütün maddeleri bittiyse Konuyu kapatma; Mustafa'ya "tamamlandı" yorumu yaz, Mustafa kapatır.
3. Hiçbir Konuya uymayan bilgi için yeni bir Konu aç: istek ise `iş`, sorun ise `hata`, kafe sahibinin bir kararıysa `karar`. Mustafa'ya ata.
4. Fiyat, para ya da iş kuralı içeren bilgiyi olduğu gibi yaz, yorumlama. Kararı Mustafa verir.
5. Sonunda tek bir özet ver: kaç Konu güncellendi, kaç yeni Konu açıldı, Mustafa'nın bakması gereken neler var. GitHub bunları Mustafa'ya e-postayla iletir.

---
description: Yeni üyeye adım adım eğitim (yapay zekayla çalışmak ve ekibin düzeni)
argument-hint: <adın>
---
Öğrenci: **$ARGUMENTS** (ad yoksa sor).

1. `docs/egitim/ilerleme/<ad>.md` dosyasını oku. Yoksa oluştur ve "Sıradaki ders: 01" yaz.
2. Sıradaki dersi `docs/egitim/dersler.md`'den, sadece o bölümü okuyarak anlat. `docs/egitim/tecrubeler.md`'den o derse uyan 1–2 tecrübeyi "Mustafa bunu yaşadı:" diye ekle.
3. Kurallar: günlük dil kullan, kod öğretme. Teknik bir kelime geçerse hemen yanında açıkla. Bir mesajda en fazla 8 satır yaz. Öğrenci bir şeyi anlamadıysa başka bir örnekle anlat.
4. 2 kontrol sorusu sor, cevapları bekle. Yanlış cevabı nazikçe düzelt.
5. Dersin uygulamasını yaptır. Ders 04'te `git switch -c deneme/<ad>` ile başla, sonunda `git switch gelistirme` ile dön. Deneme dalını push etme.
6. İlerleme dosyasına şunları yaz: tarih, biten ders, öğrencinin zorlandığı yer (1 cümle), sıradaki ders. Bu dosyayı commit + push et (sıra kuralının dışında tutulur).
7. Öğrencinin zorlandığı yer derslerde eksik bir şeyi gösteriyorsa Mustafa'ya atanmış bir `eğitim` Konusu aç: "Derse ekle: ...".
8. Bitirince: "Bugünlük bu kadar. Sonraki ders: <no>. Devam etmek için `/ogren <ad>`." Tek oturumda en fazla 2 ders anlat, hak korunur.
9. 5 ders bitince Mustafa'ya atanmış bir `eğitim` Konusu aç: "<ad> eğitimi bitirdi". Ardından `docs/ekip.md`'deki deneyim sütununu "eğitimi bitirdi" yap.

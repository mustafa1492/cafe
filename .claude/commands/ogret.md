---
description: Bir ajana yeni bir ders öğret (ajan dosyasının "Öğrendiklerim" bölümüne eklenir)
argument-hint: <ajan adı> <ders>
---
Girdi: **$ARGUMENTS** (ilk kelime ajan adı, kalanı ders).

1. `.claude/agents/<ajan adı>.md` dosyası yoksa mevcut ajanları listele ve dur.
2. Dersi tek, açık bir kural cümlesine çevir. Örnek: "Sepet toplamı her zaman veritabanındaki fiyatla yeniden hesaplanır."
3. Ders bir iş kuralıysa (para, fiyat, süre, eşik) ve oturumun hesabı Mustafa değilse ekleme. Mustafa'ya atanmış bir `soru` Konusu aç.
4. Ajan dosyasının en altındaki "## Öğrendiklerim" listesine `- [tarih, hesap] kural` olarak ekle. Aynı kural zaten varsa ekleme. Çelişen kural varsa eskisini sil, yenisini yaz ve söyle.
5. Commit + push et ("Ajan dersi: <ajan>").

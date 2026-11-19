---
description: Tek bir kod işini ajan ağıyla yürüt (sekreter brifingi → kodcu ↔ deneyici → gerekirse inceleme → kayıt)
argument-hint: <iş tanımı>
---
Girdi: **$ARGUMENTS**. İş tanımı yoksa `docs/oturum.md` → "Yapılacaklar" listesindeki sıradaki maddeyi al ve tek cümleyle söyle.

1. **Sıra:** `docs/nobet.md`'de sıra bu hesapta değilse dur. Sıra bu hesaptaysa `git checkout gelistirme && git pull`.
2. **Brifing:** İş büyükse (birden çok ekran, veritabanı ya da para) `kafe-sekreter`'den brifing al. Küçük işlerde bu adımı atla.
3. **İş tanımı:** Kodcuya şunu ver: amaç, kabul listesi (en fazla 6 madde, her biri denenebilir), dokunulacak klasörler, bekleyen kararlar. Karar gerektiren bir yer varsa önce Mustafa'ya sor, ya da o kısmı `KARAR BEKLİYOR` diye bıraktır.
4. **Git-gel döngüsü:**
   - `kafe-kodcu` yazar.
   - `kafe-deneyici` dener. Ona iş tanımını ve kodcunun raporunu ver, kodcunun konuşmasını verme.
   - Sonuç DÜZELT ise kodcuya sadece DÜZELT listesini ver ve tekrar dene. **En fazla 3 tur.** 3 turda GEÇTİ çıkmazsa dur, ne kaldığını Mustafa'ya söyle (Mustafa yoksa `hata` Konusu aç).
5. **İnceleme:** Sipariş, para, yetki ya da veritabanına dokunulduysa `kafe-inceleme` çalıştır. Sonuç DÜZELT ise 4. adıma dön.
6. **Kayıt:** `kafe-sekreter`'e iş özetini ver: ne yapıldı, kaç tur sürdü, sonuç, bekleyen kararlar. Sekreter `docs/oturum.md`'yi günceller.
7. **Bitiş:** `git add -A && git commit` (mesaja varsa Konu numarası eklenir) `&& git push origin gelistirme`. Kullanıcıya en fazla 4 satır yaz: ne yapıldı, kaç tur sürdü, nasıl görülür, bekleyen karar.

Ajanlar birbirini doğrudan çağıramaz. Aralarındaki gidip gelmeyi bu oturum yürütür ve her ajana sadece ihtiyacı olanı verir.

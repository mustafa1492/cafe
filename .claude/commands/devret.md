---
description: Sırayı başka bir üyeye devret (iş kaydedilir, not yazılır, nöbet değişir)
argument-hint: <kimden> <kime>   örn. Mustafa Muhammed
---
Girdi: **$ARGUMENTS**. Kimden ya da kime eksikse, ya da kişi `docs/nobet.md`'deki ekip listesinde yoksa dur ve sor.

Adımlardan biri başarısız olursa dur ve söyle.
1. `docs/nobet.md`'de sıra "kimden"de değilse devretme.
2. Yarım iş varsa derlenebilir hale getir. Getiremiyorsan "Kaldığımız yer"e "YARIM: ..." yaz.
3. Değişen kısmın testini `kafe-deneyici` ile çalıştır. Para, sipariş ya da veritabanı koduna dokunulduysa `kafe-inceleme`'yi de çalıştır.
4. `docs/oturum.md` → "Kaldığımız yer": 2–4 cümle yaz (ne bitti, ne yarım, sıradaki adım). Günlük'e `[kimden]` ile bir satır ekle.
5. `docs/nobet.md`: SIRA'yı "kime" yap, tarihi yaz, Geçmiş'e bir satır ekle.
6. `git add -A && git commit -m "Devir: kimden → kime"`, sonra `git push origin gelistirme`. Push'u `git ls-remote` ile doğrula.
7. "kime"ye atanmış bir `iş` Konusu aç. Başlık: "Sıra sende: <sıradaki adım>". İçerik: "Kaldığımız yer" ve kopyalanacak prompt (`/devral <kime>`). GitHub bunu ona e-postayla iletir. Kişinin GitHub adı `docs/ekip.md`'de yoksa Konuyu atamadan aç ve söyle.
8. Son mesaj: "Devrettim, #<no> açıldı."

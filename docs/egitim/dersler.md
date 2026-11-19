# Dersler

Claude bu dersleri `/ogren` ile anlatır. Her ders şu sırayla gider: kısa anlatım → ilgili tecrübe (`tecrubeler.md`) → 2 kontrol sorusu → uygulama. Anlatım günlük dille olur, teknik kelime kullanılırsa hemen açıklanır.

## 01 Yapay zekayla çalışmak
- Claude, söylediğini yapan çok hızlı bir yardımcıdır: kod yazar, dosya okur, komut çalıştırır. Ama **ne istediğini bilmez**; ona sen söylersin.
- Claude kendinden emin bir şekilde yanlış da söyleyebilir. Bu yüzden önemli şeyler denenir ("çalışıyor" denmeden önce çalıştırılır).
- **Hak / token:** her mesaj ve okunan her dosya hesabın kullanım hakkından yer. Uzun sohbet, gereksiz dosya ve aynı şeyi tekrar istemek hakkı çabuk bitirir. Hak bitince birkaç saat beklenir. Ekipte sıra devri bu yüzden var.
- Claude bir oturumdan diğerine **hiçbir şey hatırlamaz**. Hatırlaması gereken her şey repodaki dosyalarda durur (CLAUDE.md, oturum notu, kararlar, Konular).
- Uygulama: Claude'a "Bu repo ne yapıyor, 3 cümleyle anlat" de ve cevabı `CLAUDE.md` ile karşılaştır.

## 02 Bu ekibin düzeni
- **Repo:** projenin bütün dosyaları ve geçmişi. **Dal:** projenin bir kopyası; biz `gelistirme` dalında çalışırız, `main` dalı canlı sitedir ve ona sadece Mustafa gönderir.
- **Commit + push:** yapılan işi kaydetmek ve ekibe göndermek. Push edilmeyen iş başkası için yoktur.
- **Nöbet:** aynı anda tek kişi kod yazdırır. Sıranın kimde olduğu `docs/nobet.md` dosyasında yazar. Devir için `/devret` ve `/devral` komutları kullanılır.
- **Konular (GitHub issue):** ekibin konuşma yeri. Soru, karar, hata buraya yazılır ve herkese e-postayla gider. WhatsApp'ta konuşulan şey de buraya yazılır.
- **Kim neye karar verir:** `docs/ekip.md`. Fiyat, para ve iş kuralına sadece Mustafa karar verir.
- **Komutlar:** `docs/egitim/komutlar.md` birlikte okunur (/devral, /devret, /kaydet, /clear).
- Uygulama: kendine atanmış Konulardan birine yorum yazdır: "Konuları okudum". Sonra `/` yazıp komut listesini aç.

## 03 İyi istek (prompt) yazmak
- İyi istek: **ne** yapılacağı + **nerede** + **bitince ne olacağı**. Kötü: "menüyü düzelt". İyi: "Müşteri menüsünde ürün fiyatı adın altında görünsün, telefonda dene, bitince commit et."
- Tek seferde tek iş istenir. Büyük işi parçalara böl.
- Claude soru sorarsa cevap ver; bilmiyorsan "bilmiyorum, Mustafa'ya Konu aç" de.
- Mustafa'nın gönderdiği hazır promptlar olduğu gibi yapıştırılır.
- Uygulama: Claude'a kötü bir istek ver ve iyileştirmesini iste ("bu isteği daha iyi nasıl yazardım?").

## 04 İlk uygulama (deneme dalında)
- Claude seni `deneme/<adın>` dalına alır. Burada ne yaparsan yap ekibe zarar gelmez.
- Küçük bir değişiklik iste (ör. bir yazının rengini değiştir), sonra `kafe-deneyici` ile test ettir ve commit et.
- Sonra Claude dalı silmeden `gelistirme` dalına geri döner. Deneme dalı push edilmez.
- Uygulama sonunda şunları bilmelisin: değişiklik iste, sonucu kontrol et, kaydet, geri dön.

## 05 Bir şey ters gidince
- Panik yok: git'te her şey geri alınabilir. Claude'a "son yaptığını geri al" demek yeter.
- Hata çıkarsa Claude'dan hatayı düz cümleyle açıklamasını iste. Çözülmezse `hata` Konusu aç (ekran görüntüsüyle).
- Hak biterse: işi yarım bırakma, `/devret` de. Hak bitmek üzereyken büyük iş başlatma.
- Asla yapılmayacaklar: şifre/anahtar yazıp göndermek, `main`'e göndermek, başkasının sırasında kod yazdırmak, Claude'un uydurduğu bir fiyatı ya da kuralı kabul etmek.

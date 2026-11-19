# Kararlar ve istekler defteri

Sohbette, Konularda ya da yüz yüze alınan her karar ve her istek buraya **tarih + kaynak** ile bir satır olarak yazılır. Bir karar değişirse eski satır silinmez; üstüne çizilir (`~~eski~~`) ve yenisi yazılır. Bu dosyaya sadece Mustafa'nın oturumu yazar. Diğer üyelerin oturumları bir karar adayını `karar` Konusu olarak açar.

## Kararlar
- 19 Kas [Mustafa, claude.ai]: Veritabanı Supabase (Firebase değil).
- 19 Kas [Mustafa, claude.ai]: Müşteriden ad ya da telefon istenmez. Otomatik servis, masa veya kuver ücreti yoktur. Ekranda "masa hesabı" yazar.
- 19 Kas [Mustafa, claude.ai]: Masanın ilk siparişini garson onaylar ve hız sınırı vardır (sayı henüz belirlenmedi).
- 19 Kas [Mustafa, claude.ai]: Masrafları kafe öder, hesapları Mustafa yönetir. Alan adı kafe adına alınır.
- 19 Kas [Mustafa, claude.ai]: Kafe ayrı repoda (`mustafa1492/cafe`) yürür. Muhammed sadece bu repoya eklenir, Genelprojeler'e eklenmez.
- 19 Kas [Mustafa, claude.ai]: Yönetici Mustafa. Mustafa'nın hakkı bitince Muhammed onun promptlarıyla devam eder. Aynı anda tek kişi kod yazar, devir nöbetle yapılır. Canlıya alma sadece Mustafa'da.
- 19 Kas [Mustafa, claude.ai]: Kontroller biraz esneyebilir, ama karışıklığı önleyen katı kurallar kalır.
- 19 Kas [Mustafa, claude.ai]: Ekip arasındaki iletişim tek kanaldan, GitHub Konularından yürür; bildirimler e-postayla gelir. Hiçbir konuşma kaybolmaz.
- 19 Kas [Mustafa, claude.ai]: Ekibe 3. kişi olarak Gürkan katılabilir. Yeni üyeler hem yapay zekayla çalışmayı hem bu düzeni öğrenir; Mustafa'nın tecrübeleri onlara aktarılır.
- 19 Kas [Mustafa, claude.ai]: Token tasarrufu her zaman gözetilir.
- 19 Kas [Mustafa, claude.ai]: Gelir paylaşımı şimdi konuşulmayacak, sonra yapılacak. Claude bu konuyu açmaz.
- 19 Kas [Mustafa, claude.ai]: Şimdilik ekip Mustafa ve Muhammed; Gürkan henüz projede değil, onun rolü sonra konuşulacak.
- 19 Kas [Mustafa, claude.ai]: İş bölümü: Muhammed gerçek hayattaki bağlantıları ve insanlarla ilgili işleri, Mustafa teknik ve yapay zeka işlerini yürütür. Ayrıntı: `docs/ekip.md`.
- 19 Kas [Mustafa, claude.ai]: Claude, Mustafa'nın hesabında onun çalışanı, Muhammed'in hesabında onun asistanıdır. İkisinin de Claude Pro planı var.
- 19 Kas [Mustafa, claude.ai]: Mustafa ile Muhammed'in ortak sekreteri olarak `kafe-sekreter` ajanı ve `/sekreter` komutu kuruldu. Amacı: herkes kendi işine ayrı odaklansın, işler birbirine uyumlu ilerlesin. Sekreter aynı zamanda ana oturumun asistanıdır.
- 19 Kas [Mustafa, claude.ai]: Kafe ajan ağı ayrı çalışır. Ajanlar sadece bu repoda çalışır, diğer projelerin ajanları burada sadece kritik durumda ve Mustafa'nın izniyle kullanılır. Kod işi kod yazıcı (`kafe-kodcu`) ile kod deneyici (`kafe-deneyici`) arasında gidip gelerek yürür (`/is`). Projeyi ana oturum sekreterle birlikte yönetir.
- 19 Kas [Mustafa, claude.ai]: Hesap bölmeye kasa karar verir, müşteri telefondan bölme yapmaz. Ödeme alma, hesabı bölme ve masayı kapatma kasada yapılır, kasa yönetimin elindedir (kasa = yönetici rolü). Bir masada birden çok kişi ayrı ayrı ödeyebilir: her ödeme ayrı kayıt olur, kalan tutar kayıtlardan hesaplanır, aynı kaleme çift ödeme alınamaz.
- 19 Kas [Mustafa, claude.ai]: Müşteri QR'dan sipariş verir, sipariş sisteme düşer ve mutfakta hazırlanmaya başlar. ~~İlk sipariş onayı Muhammed'le konuşulacak.~~ Personel onayı yok, müşteri onaylar (19 Kas, aşağıda).
- 19 Kas [Mustafa, claude.ai]: Kafenin tanıtım sitesi atölye şablonuyla değil, bu projenin içinde özel tasarımla yapılır (3 yön hazırlanır, kafe sahibi seçer). Atölyeden sadece QR, çerez izni, kit ve metinler alınır.
- 19 Kas [Mustafa, claude.ai]: Alan adı eski plandaki gibi 3 Aralık'ta alınır. Vercel Pro'ya eski plandaki gibi 8 Aralık'ta (yayında) geçilir.
- 19 Kas [Mustafa, claude.ai]: ~~Müşteri QR'ı okutunca masasını kendisi seçer.~~ ~~Muhammed'e sorulacak.~~ **Her masaya 1 QR** (masaya özel). Siparişi müşteri kendisi onaylar: gönderirken ekranda masası ve sepeti görünür, "Siparişi gönder" der, sipariş doğrudan mutfağa düşer. Kasa ya da garson onayı yoktur. QR adresinde masa numarası yerine tahmin edilemez kod olur (teknik tercih), ekranda yine "Masa 5" yazar.

## İstekler (henüz yapılmamış)
- 19 Kas [Mustafa]: Kafe sahibine sorulacaklar Muhammed'e sorulur (ilk Konu).

## Bekleyen kararlar
Yayın yeri, Supabase kuruluşu ve planı, ücretler. Bkz. "Mustafa: bekleyen kararlar" Konusu.

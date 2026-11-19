# Mustafa'nın tecrübeleri

Bu dosya, Mustafa'nın Çiftçi Defteri, dayıbaşı, kanlı okey ve esnaf sitesi projelerinde Claude ile çalışırken oturmuş kurallardan derlendi. Mustafa yeni bir tecrübe ekledikçe (`/tecrube`) büyür. Her madde: **ne oldu / ne öğrenildi → ne yapıyoruz**.

## Claude ile çalışmak
- Claude, bilmediği bir oyun kuralını ya da fiyatı kendinden emin bir şekilde uydurabiliyor. → Kural, fiyat, süre, eşik asla Claude'a bırakılmaz; önce insan cümlesi yazılır, sonra kod.
- Claude oturumdan oturuma bir şey hatırlamıyor; uzun sohbetlerde ne kararlaştırıldığı kayboluyor. → Her şey repoya yazılır: kısa oturum notu, kararlar defteri, Konular.
- Not dosyaları uzayınca her oturum onları okurken hakkın çoğu gidiyor. → Notlar kısa tutulur (Günlük en fazla 10 satır), ayrıntı commit mesajında kalır.
- Gereksiz dosya okutmak ve her küçük değişiklikte test ya da derleme yaptırmak hakkı bitiriyor. → Sadece gereken okunur, test iş grubu bitince yapılır.
- Derin araştırma ve yardımcı ajanlar çok hak yiyor. → Sadece gerektiğinde çalıştırılır.

## Ekip ve kod
- Aynı anda iki oturumun aynı dosyalara dokunması karışıklık çıkarıyor. → Aynı anda tek kişi kod yazar; ortak parçalara tek bir yerden dokunulur.
- Canlı siteye doğrudan gönderilen değişiklik kullanıcıyı etkileyebiliyor. → Önce önizleme dalında denenir, canlıya Mustafa "yükle" deyince gönderilir.
- Önizleme ve canlı aynı veritabanını kullanınca veritabanı değişikliği canlıyı da bozabiliyor. → Veritabanı değişiklikleri geriye uyumlu yapılır; silme yerine gizleme yapılır.
- Bazı onay isteyen veritabanı komutlarının onayı kullanıcıya ulaşmıyor. → Bu tür komutlar hazırlanır, Mustafa SQL Editor'de kendisi çalıştırır.
- Her projeyi sıfırdan yazmak zaman kaybettiriyor. → Ortak parçalar (`core/`) bir projeden diğerine taşınır. Ama bu yüzden odaktaki projeden geri kalınmaz.

## Kullanıcılar
- Teknolojiye alışık olmayan kullanıcı karışık ekranda hemen telefona sarılıyor. → Ekran başına tek iş, büyük düğme, teknik kelime yok, her işlemden sonra düz cümleyle onay.

## Mustafa'nın kendi anlatımı
(Mustafa `/tecrube` ile kendi yaşadıklarını buraya ekler: "şöyle bir şey yaşadım, şunu yapmayın".)

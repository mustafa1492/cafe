# Arkadaşın Claude oturumunu buraya aktarma promptu

Arkadaşın bu metni **kendi Claude sohbetinin içine** (kafe sistemini konuştuğu sohbete) yapıştırsın. Claude ona tek bir `.md` dosyası verecek; o dosya bize gönderilecek ve `arkadas-oturumu.md` olarak buraya konacak.

Ayrıca arkadaşından şunu iste: Claude Design'daki tasarımı (Müşteri ekranları, Mutfak paneli, Yönetici paneli) seninle **düzenleme yetkisiyle** paylaşsın ya da tasarımın paylaşım bağlantısını göndersin. Şu an sende salt okunur açılıyor, bizim oturum içeriğini okuyamıyor.

---

## Yapıştırılacak metin

```
Bu sohbette konuştuğumuz kafe QR sipariş / adisyon sistemini başka bir ekibe (başka bir Claude oturumuna) devrediyorum. Geliştirmeye orada devam edilecek, sen bu sohbete erişemeyecek birine anlatıyorsun. Bu yüzden hiçbir şeyi "konuşmuştuk" diye geçme; her şeyi açıkça yaz.

Bana bu sohbetin TAMAMINI kapsayan, tek parça bir Markdown dosyası hazırla. Dosya adı: kafe-devir.md. Dosyayı indirilebilir dosya olarak ver; veremiyorsan tamamını tek bir kod bloğu içinde yaz. Kısaltma, özetleyip atlama yapma; uzun olması sorun değil.

Şu başlıkları sırayla doldur:

1. Amaç ve kafe bilgisi
   - Kafenin adı, yeri, masa sayısı, personel (garson, mutfak, kasa), çalışma şekli. Bilinmeyenleri "bilinmiyor" diye yaz.
   - Sistemden beklenen asıl sonuç.

2. Sohbetin kronolojik özeti
   - Sohbet boyunca hangi sırayla ne istendi, ne yapıldı, ne değişti. Her adım için 1-3 satır.

3. Alınan kararlar
   - Her karar için: karar, gerekçesi, kim istedi (ben mi sen mi önerdin). Kesinleşmemiş olanları "kesin değil" diye işaretle.

4. Özellik listesi
   - Müşteri (QR menü), mutfak, garson/kasa, yönetici ekranlarının her biri için: olan özellikler, istenen ama yapılmayan özellikler, vazgeçilen özellikler.
   - Sipariş akışı: müşteri siparişi verdikten hesabın kapanmasına kadar adım adım.
   - Kullanıcı rolleri ve kim neyi görebilir / göremez.

5. Tasarım
   - Claude Design'daki her ekranın/artboard'un adı ve üzerinde ne olduğu (alanlar, düğmeler, metinler).
   - Renkler (hex kodlarıyla), yazı tipleri, logo, örnek menü verisi (ürün adları, fiyatlar, kategoriler).
   - Adres yapısı (ör. /r/demo-kafe/masa/3, /r/demo-kafe/mutfak, /r/demo-kafe/yonetici).
   - Tasarımda "örnek" olarak işaretlenmiş şeyler.

6. Teknik plan
   - Kullanılan/planlanan teknolojiler (Firebase dahil): neden seçildi, hangi adımda devreye girecekti.
   - Planlanan adımların listesi (1., 2., 3., 4. adım...) ve hangisinin bittiği.
   - Veri yapısı: koleksiyonlar/tablolar, alanları, aralarındaki ilişki.
   - Yazılmış kod varsa: dosya adları ve ne işe yaradıkları. Önemli kod parçalarını aynen ekle.

7. Yasal ve iş konuları
   - e-Adisyon, fiyat listesi, KVKK, ödeme gibi konuşulmuş konular.
   - Fiyatlandırma, ücret, iş bölümü konuşulduysa.

8. Açık sorular ve riskler
   - Cevaplanmamış sorular, belirsiz kalan noktalar, bilinen sorunlar.

9. Sıradaki işler
   - Sohbet bittiğinde sıradaki iş neydi, hangi sırayla devam edilmesi planlanıyordu.

10. Bu sohbette kullanılan kurallar
   - Sana verdiğim kalıcı talimatlar, tercihler, "şunu yapma" dediklerim.

Kurallar:
- Uydurma bilgi ekleme. Emin olmadığın yere "emin değilim" yaz.
- Sohbette geçen bütün rakamları, adları, linkleri aynen koru.
- En sona "Sohbette geçen bütün linkler" başlığıyla linklerin listesini ekle.
```

# "/" komutları: kısa rehber

Claude Code'da `/` ile başlayan yazı bir **komuttur**. Komut, uzun bir talimatın kısayoludur: `/devret` yazınca Claude, `.claude/commands/devret.md` dosyasındaki adımları sırayla uygular. Komutlar repoyla birlikte geldiği için iki hesapta da aynı çalışır.

**Nasıl yazılır:** `/` + komut adı + boşluk + bilgi. Örnek: `/devret Mustafa Muhammed`
Sadece `/` yazarsan Claude bütün komutları listeler. Ok tuşlarıyla seçip Enter'a basabilirsin.

## Bizim komutlarımız
| Komut | Ne zaman | Örnek |
| --- | --- | --- |
| `/devral <ben> [iş]` | Oturuma başlarken, sıra sana geçince | `/devral Muhammed Bugünkü iş: menü ekranı` |
| `/devret <ben> <sıradaki>` | Hakkın azalınca ya da iş bitince | `/devret Mustafa Muhammed` |
| `/kaydet <ne>` | Bir karar ya da istek çıkınca, kaybolmasın diye | `/kaydet Kafede 12 masa var, bahçede 4 tane` |
| `/ogret <ajan> <kural>` | Bir ajan hata yapınca ya da bir şey öğrenmesi gerekince | `/ogret kafe-inceleme Ürün adında emoji olmasın` |
| `/gorusme <kiminle>` | Muhammed: kafe sahibiyle görüşmeden önce (sorular, istenecekler, mesaj taslağı) | `/gorusme kafe sahibi` |
| `/aktar [anlatım]` | Muhammed: görüşmeden sonra, duyduklarını anlat, Claude Konulara işlesin | `/aktar Sahip 12 masa dedi, fotoğrafları cuma atacak` |
| `/is <iş>` | Mustafa (ya da sıra sendeyken Mustafa'nın verdiği iş): bir kod işini ajanlara yaptır | `/is müşteri menüsüne kategori sekmeleri` |
| `/sekreter [istek]` | Oturum başında: şimdi ne yapmalıyım (tek iş), kim kimi bekliyor; ayrıca gündem ve mesaj taslağı | `/sekreter kafe sahibine fotoğraflar için mesaj yaz` |
| `/ogren <ad>` | Yeni üyenin eğitimi (her oturumda en fazla 2 ders) | `/ogren Muhammed` |
| `/tecrube <ne oldu → ne yapıyoruz>` | Sadece Mustafa: tecrübe aktarmak için | `/tecrube Uzun sohbette karar kayboldu → her kararı /kaydet ile yaz` |

## Claude Code'un kendi işe yarayan komutları
| Komut | Ne yapar |
| --- | --- |
| `/help` | yardım |
| `/clear` | sohbeti temizler, yeni bir iş için baştan başlatır. **Hakkı korur**: uzun sohbet her mesajda daha çok hak yer |
| `/compact` | uzun sohbeti özetleyip küçültür. İşin ortasında sohbet çok uzadıysa kullanılır |
| `/usage` | hakkının ne kadarının kaldığını gösterir |
| `/agents` | ajanları listeler |

## Komut olmayan ama bilinmesi gerekenler
- **Ajanları** elle çağırman gerekmiyor, Claude gerektiğinde kendisi çağırır. İstersen "kafe-inceleme ile kontrol et" diyebilirsin.
- **Kanca:** `claude` yazdığında nöbet ve sana atanmış Konular kendiliğinden ekrana gelir. Bunun için bir şey yazmana gerek yok.
- **Canlıya alma** bir komut değil, sadece Mustafa'nın oturumunda `Hesap: Mustafa. yükle` yazılınca yapılır.

## Bir günün akışı
1. Terminal → `cd cafe` → `claude`. Nöbet ve Konular ekrana gelir.
2. `/devral <adın> Bugünkü iş: ...`
3. İşi sade cümlelerle iste. Bir iş bitince yeni işe geçmeden önce `/clear` yaz.
4. Karar çıkarsa `/kaydet ...`
5. Hak azalınca ya da gün bitince: `/devret <adın> <sıradaki>`

# Kurulum (bir kere, yaklaşık 20 dk)

Bir şey takılırsa ekran görüntüsünü al, "kurulum" başlığıyla bir Konu aç ya da Mustafa'ya gönder. Bu kurulum bir kez yapılır.

1. **Claude hesabı:** Claude Code için ücretli bir Claude planı (Pro ya da üstü) gerekir. Planı aldığın hesapla giriş yapacaksın.
2. **GitHub hesabı:** github.com'dan hesap aç ve kullanıcı adını Mustafa'ya gönder. Mustafa seni repoya ekleyecek, davet e-postası gelince **kabul et**.
   - Repo sayfasında sağ üstteki **Watch → All Activity**'yi seç. Böylece her Konu ve cevap e-postana düşer.
   - İstersen telefonuna **GitHub** uygulamasını kur. Konuları oradan okuyup cevaplayabilirsin.
3. **Programlar** (bilgisayarına): **Git**, **Node.js** (LTS sürümü) ve **GitHub CLI** (`gh`). Üçü de kendi sitelerinden indirilip "ileri, ileri" ile kurulur.
4. **Terminali aç** ve sırayla şunları yaz:
   ```bash
   gh auth login                      # GitHub'a giriş: "GitHub.com" → "HTTPS" → "Login with a web browser"
   git config --global user.name "Adın"
   git config --global user.email "github-epostan"
   npm install -g @anthropic-ai/claude-code
   gh repo clone mustafa1492/cafe
   cd kafe
   git checkout gelistirme
   claude
   ```
5. Claude ilk açılışta Claude hesabınla giriş yapmanı ister. Sonra "bu klasöre güveniyor musun" diye sorar: **evet** de. Evet demezsen ekip ayarları çalışmaz.
6. Açılınca ekranda nöbet ve sana atanmış Konular görünür. Şunu yaz: `/ogren <adın>`

Her seferinde açmak için: terminal → `cd kafe` → `claude`.

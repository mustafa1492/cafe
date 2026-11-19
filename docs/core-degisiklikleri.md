# core/ değişiklikleri

Kafe reposunda `core/` altında yapılan her değişiklik buraya bir satırla yazılır. Mustafa bunları sonra ana çekirdeğe (Genelprojeler) taşır ve taşınanı işaretler.

| Tarih | Dosya / klasör | Ne değişti | Taşındı mı |
| --- | --- | --- | --- |
| 19 Kas | core/ui (index.tsx, ui.css, Bilgi.tsx), core/supabase/client.ts | Genelprojeler main c2e642d'den olduğu gibi kopyalandı (değişiklik yok) | kaynak zaten orada |
| 19 Kas | .claude/skills/ui-ux-pro-max | web atölyesinden kopyalandı (tasarım skill'i, kod değil) | — |
| 19 Kas | core/qr/qrMatrix.ts | web atölyesi araclar/kaynak/qr.js kopyalandı, sadece export eklendi | atölyede zaten var |
| 19 Kas | core/qr/QrSvg.tsx | Yeni: qrMatrix üstüne tek <path> SVG QR bileşeni (text, size, title) | genel, ürün bağımsız |

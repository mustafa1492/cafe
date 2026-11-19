#!/usr/bin/env bash
# Oturum açılınca Claude Code bunu çalıştırır (.claude/settings.json → SessionStart).
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
git pull -q --ff-only 2>/dev/null
echo "git kullanıcısı: $(git config user.name)"
sed -n '1,4p' docs/nobet.md
# Günün ilk oturumu mu? (tarih bilgisayarda tutulur, repoya girmez)
d="${XDG_CACHE_HOME:-$HOME/.cache}/kafe-cafe"; mkdir -p "$d" 2>/dev/null
bugun=$(TZ=Europe/Istanbul date +%F)
if [ "$(cat "$d/son-rapor" 2>/dev/null)" != "$bugun" ]; then
  echo "$bugun" > "$d/son-rapor" 2>/dev/null
  echo; echo "GÜNÜN İLK OTURUMU: hesap belli olunca önce sekreterin odak raporunu ver (/sekreter)."
fi
if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
  echo; echo "## Sana atanmış açık Konular"
  gh issue list --assignee @me --state open --limit 15 --json number,title,labels \
    --template '{{range .}}#{{.number}} {{.title}}{{range .labels}} [{{.name}}]{{end}}{{"\n"}}{{end}}'
else
  echo; echo "UYARI: GitHub CLI (gh) kurulu ya da giriş yapılmış değil. Konular görünmüyor. Kurulum: docs/egitim/00-kurulum.md"
fi

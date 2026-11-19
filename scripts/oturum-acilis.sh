#!/usr/bin/env bash
# Oturum açılınca Claude Code bunu çalıştırır (.claude/settings.json → SessionStart).
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
git pull -q --ff-only 2>/dev/null
echo "git kullanıcısı: $(git config user.name)"
sed -n '1,4p' docs/nobet.md
if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
  echo; echo "## Sana atanmış açık Konular"
  gh issue list --assignee @me --state open --limit 15 --json number,title,labels \
    --template '{{range .}}#{{.number}} {{.title}}{{range .labels}} [{{.name}}]{{end}}{{"\n"}}{{end}}'
else
  echo; echo "UYARI: GitHub CLI (gh) kurulu ya da giriş yapılmış değil. Konular görünmüyor. Kurulum: docs/egitim/00-kurulum.md"
fi

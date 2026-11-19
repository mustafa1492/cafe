#!/usr/bin/env bash
# Repo ilk açıldığında bir kez, Mustafa'nın oturumunda çalışır: etiketleri ve ilk Konuları açar.
set -e
for l in "soru:d4c5f9" "karar:0e8a16" "hata:d73a4a" "iş:1d76db" "eğitim:fbca04" "engel:b60205"; do
  gh label create "${l%%:*}" --color "${l##*:}" --force >/dev/null
done
# İlk Konular docs/ilk-konular.md'den açılır (her "## " başlığı bir Konu).
python3 - <<'PY'
import re, subprocess
t = open('docs/ilk-konular.md').read()
for blk in re.split(r'\n## ', t)[1:]:
    head, body = blk.split('\n', 1)
    m = re.match(r'(.+?) \| atanan: (\S+) \| etiket: (\S+)', head)
    title, who, label = m.groups()
    cmd = ['gh','issue','create','--title',title,'--body',body.strip(),'--label',label]
    if who != '-': cmd += ['--assignee', who]
    print(subprocess.run(cmd, capture_output=True, text=True).stdout.strip())
PY

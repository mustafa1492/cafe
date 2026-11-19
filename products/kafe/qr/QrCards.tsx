"use client";
import { MainButton } from "@/core/ui";
import { QrSvg } from "@/core/qr/QrSvg";

type Table = { label: string; code: string };

function fileName(label: string) {
  return label.toLocaleLowerCase("tr-TR").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-qr.svg";
}

function download(card: HTMLElement | null, label: string) {
  const svg = card?.querySelector("svg");
  if (!svg) return;
  const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName(label);
  a.click();
  URL.revokeObjectURL(url);
}

export function QrCards({ cafeName, base, slug, tables, urlSet }: {
  cafeName: string; base: string; slug: string; tables: Table[]; urlSet: boolean;
}) {
  return (
    <>
      <style>{css}</style>
      <div className="qr-screen-only">
        {!urlSet && (
          <p className="qr-warn" role="alert">
            <strong>Uyarı:</strong> Adres henüz ayarlanmadı, kartlar localhost adresiyle üretiliyor. Alan adı alınınca kartları yeniden yazdırın.
          </p>
        )}
        <MainButton onClick={() => window.print()}>Hepsini yazdır</MainButton>
      </div>
      <div className="qr-grid">
        {tables.map((t) => {
          const url = `${base}/m/${slug}/${t.code}`;
          return (
            <section className="qr-card" key={t.code} data-table={t.label}>
              <div className="qr-name">{cafeName}</div>
              <div className="qr-code"><QrSvg text={url} size={400} title={`${t.label} QR kodu`} /></div>
              <div className="qr-label">{t.label}</div>
              <div className="qr-help">Okutun, menüden sipariş verin</div>
              <div className="qr-url">{url}</div>
              <MainButton secondary className="qr-dl" style={{ width: "auto", padding: "0 24px" }}
                onClick={(e) => download((e.currentTarget.closest(".qr-card") as HTMLElement), t.label)}>
                İndir
              </MainButton>
            </section>
          );
        })}
      </div>
    </>
  );
}

const css = `
.qr-screen-only { display: grid; gap: 16px; margin: 16px 0; }
.qr-warn { margin: 0; padding: 16px; font-size: 1rem; background: #fff3bf; color: #000; border: 2px solid #b08900; border-radius: 12px; }
.qr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.qr-card { background: #fff; color: #000; border: 2px solid #000; border-radius: 12px; padding: 16px; text-align: center; display: grid; justify-items: center; gap: 8px; }
.qr-name { font-size: 1.125rem; font-weight: 700; }
.qr-code svg { width: 100%; max-width: 240px; height: auto; display: block; }
.qr-label { font-size: 2rem; font-weight: 800; }
.qr-help { font-size: 1rem; }
.qr-url { font-size: 1rem; word-break: break-all; }
@media print {
  @page { size: A4; margin: 10mm; }
  html, body { background: #fff !important; }
  .qr-screen-only, .qr-dl, .ui-header, header { display: none !important; }
  main { padding: 0 !important; margin: 0 !important; max-width: none !important; }
  .qr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
  .qr-card { break-inside: avoid; page-break-inside: avoid; border: 1px solid #000; border-radius: 0; height: 130mm; padding: 6mm; align-content: center; }
  .qr-card:nth-child(4n) { break-after: page; page-break-after: always; }
  .qr-code svg { width: 7cm; max-width: none; }
  .qr-name { font-size: 16pt; }
  .qr-label { font-size: 28pt; }
  .qr-help { font-size: 13pt; }
  .qr-url { font-size: 8pt; }
}
`;

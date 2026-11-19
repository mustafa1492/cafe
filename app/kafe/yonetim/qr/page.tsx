import type { Metadata } from "next";
import { PageHeader } from "@/core/ui";
import { QrCards } from "@/products/kafe/qr/QrCards";
import { cafeConfig, sampleTables, siteUrl, siteUrlIsSet } from "@/products/kafe/config";

export const metadata: Metadata = { title: `Masalar ve QR · ${cafeConfig.name}` };
export const dynamic = "force-dynamic";

export default function QrPage() {
  return (
    <main>
      <PageHeader sub={cafeConfig.name} title="Masalar ve QR" />
      <p className="qr-intro qr-screen-only" style={{ fontSize: "1rem" }}>
        Her masanın QR kartı aşağıda. Hepsini A4 kâğıda yazdırabilir (yazdırırken &quot;PDF olarak kaydet&quot; de seçilebilir) ya da kartları tek tek indirebilirsiniz.
      </p>
      <QrCards cafeName={cafeConfig.name} base={siteUrl()} slug={cafeConfig.slug} tables={sampleTables} urlSet={siteUrlIsSet()} />
    </main>
  );
}

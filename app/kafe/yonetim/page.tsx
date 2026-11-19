import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/core/ui";
import { cafeConfig } from "@/products/kafe/config";

export const metadata: Metadata = { title: `Yönetim · ${cafeConfig.name}` };

export default function AdminPage() {
  return (
    <main>
      <PageHeader sub={cafeConfig.name} title="Yönetim" />
      <p>Bu ekran yapım aşamasında.</p>
      <Link href="/kafe/yonetim/qr" className="ui-main-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>Masalar ve QR</Link>
    </main>
  );
}

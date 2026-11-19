import type { Metadata } from "next";
import { PageHeader } from "@/core/ui";
import { cafeConfig } from "@/products/kafe/config";

export const metadata: Metadata = { title: `Yönetim · ${cafeConfig.name}` };

export default function AdminPage() {
  return (
    <main>
      <PageHeader sub={cafeConfig.name} title="Yönetim" />
      <p>Bu ekran yapım aşamasında.</p>
    </main>
  );
}

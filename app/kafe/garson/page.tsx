import type { Metadata } from "next";
import { PageHeader } from "@/core/ui";
import { cafeConfig } from "@/products/kafe/config";

export const metadata: Metadata = { title: `Garson ve kasa · ${cafeConfig.name}` };

export default function WaiterPage() {
  return (
    <main>
      <PageHeader sub={cafeConfig.name} title="Garson ve kasa" />
      <p>Bu ekran yapım aşamasında.</p>
    </main>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/core/ui";
import { cafeConfig } from "@/products/kafe/config";

export const metadata: Metadata = { title: `Mutfak · ${cafeConfig.name}` };

export default function KitchenPage() {
  return (
    <main>
      <PageHeader sub={cafeConfig.name} title="Mutfak" />
      <p>Bu ekran yapım aşamasında.</p>
    </main>
  );
}

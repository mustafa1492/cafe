import { notFound } from "next/navigation";
import { PageHeader } from "@/core/ui";
import { cafeConfig, isKnownCafeSlug } from "@/products/kafe/config";

type Params = { kafe: string; masa: string };

export default async function TablePage({ params }: { params: Promise<Params> }) {
  const { kafe, masa } = await params;
  if (!isKnownCafeSlug(kafe)) notFound();

  // KARAR BEKLİYOR: masa kısmı masa numarası mı, gizli kod mu? Şimdilik düz metin, sayıya çevrilmiyor.
  const table = masa;

  return (
    <main>
      <PageHeader sub={cafeConfig.name} title={`Masa ${table}`} />
      <p>Bu ekran yapım aşamasında.</p>
    </main>
  );
}

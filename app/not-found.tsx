import Link from "next/link";
import { PageHeader } from "@/core/ui";
import { cafeConfig } from "@/products/kafe/config";

export default function NotFound() {
  return (
    <main>
      <PageHeader sub={cafeConfig.name} title="Sayfa bulunamadı" />
      <p>Aradığınız sayfa yok ya da adresi yanlış yazılmış.</p>
      <ul className="home-links">
        <li><Link href="/">Ana sayfaya dön</Link></li>
      </ul>
    </main>
  );
}

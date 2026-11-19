import Link from "next/link";
import { PageHeader } from "@/core/ui";
import { cafeConfig } from "@/products/kafe/config";

const links = [
  { href: `/m/${cafeConfig.slug}/5`, label: "Müşteri menüsü (deneme masası 5)" },
  { href: "/kafe/mutfak", label: "Mutfak" },
  { href: "/kafe/garson", label: "Garson ve kasa" },
  { href: "/kafe/yonetim", label: "Yönetim" },
];

export default function HomePage() {
  return (
    <main>
      <PageHeader sub="QR sipariş ve masa takip" title={cafeConfig.name} />
      <p>Sistem yapım aşamasında. Ekranlara buradan geçebilirsiniz.</p>
      <ul className="home-links">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
        ))}
      </ul>
    </main>
  );
}

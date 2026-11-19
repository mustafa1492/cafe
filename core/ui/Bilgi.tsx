"use client";
import { useEffect, useId, useState } from "react";

/** Yuvarlak "i" düğmesi: basınca kısa açıklama ekranın altında (alt çubuğun üstünde) açılır; tekrar basınca, kutuya ya da başka yere dokununca kapanır. Metinler core/ui/ipuclari.ts'te. */
export function Bilgi({ metin, ad }: { metin: string; ad: string }) {
  const [acik, setAcik] = useState(false);
  const id = useId();
  useEffect(() => {
    if (!acik) return;
    const kapat = () => setAcik(false);
    const tus = (e: KeyboardEvent) => { if (e.key === "Escape") setAcik(false); };
    const t = setTimeout(() => document.addEventListener("click", kapat), 0);
    document.addEventListener("keydown", tus);
    return () => { clearTimeout(t); document.removeEventListener("click", kapat); document.removeEventListener("keydown", tus); };
  }, [acik]);
  return (
    <span className="ui-bilgi">
      <button type="button" className={acik ? "on" : ""} aria-expanded={acik} aria-controls={id} aria-label={`${ad}: açıklama`}
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setAcik(!acik); }}>i</button>
      {acik && (
        <div id={id} role="note" className="ui-bilgi-metin"><b>{ad}</b>{metin}<small>Kapatmak için dokun</small></div>
      )}
    </span>
  );
}

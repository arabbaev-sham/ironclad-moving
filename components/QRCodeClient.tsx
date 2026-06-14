"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SITE_URL = "https://ironcladmovingllc.com";

export default function QRCodeClient() {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    import("qrcode").then((QRCode) => {
      QRCode.toDataURL(SITE_URL, {
        width: 160,
        margin: 2,
        color: { dark: "#111827", light: "#ffffff" },
        errorCorrectionLevel: "M",
      }).then(setDataUrl);
    });
  }, []);

  if (!dataUrl) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-xl overflow-hidden border border-white/10 p-2 bg-white">
        <Image
          src={dataUrl}
          alt="QR code — ironcladmovingllc.com"
          width={120}
          height={120}
          unoptimized
        />
      </div>
      <p className="text-xs text-gray-400 text-center">Scan to visit our site</p>
    </div>
  );
}

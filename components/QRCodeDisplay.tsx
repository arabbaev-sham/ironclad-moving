import QRCode from "qrcode";
import Image from "next/image";

const SITE_URL = "https://ironcladmovingllc.com";

export default async function QRCodeDisplay() {
  const dataUrl = await QRCode.toDataURL(SITE_URL, {
    width: 160,
    margin: 2,
    color: { dark: "#ffffff", light: "#0a1628" },
    errorCorrectionLevel: "M",
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-xl overflow-hidden border border-gold-500/20 p-2 bg-[#0a1628]">
        <Image
          src={dataUrl}
          alt="QR code — ironcladmovingllc.com"
          width={120}
          height={120}
          unoptimized
        />
      </div>
      <p className="text-[10px] text-text-muted text-center tracking-wide">
        Scan to visit our site
      </p>
    </div>
  );
}

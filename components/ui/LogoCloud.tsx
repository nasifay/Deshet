import Image from "next/image";

const logos = [
  { src: "/vercel.svg", alt: "Vercel" },
  { src: "/next.svg", alt: "Next.js" },
  { src: "/globe.svg", alt: "Partner" },
  { src: "/window.svg", alt: "Partner" },
  { src: "/file.svg", alt: "Partner" },
];

export default function LogoCloud() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
      {logos.map((logo, i) => (
        <div key={i} className="h-12 flex items-center justify-center grayscale opacity-70 hover:opacity-100 transition">
          <Image src={logo.src} alt={logo.alt} width={120} height={40} />
        </div>
      ))}
    </div>
  );
}
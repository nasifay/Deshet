import Image from "next/image";

export default function ImageHeadlineCard({
  src,
  alt,
  headline,
}: {
  src: string;
  alt: string;
  headline: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1595px] px-4 md:px-6">
      <div className="relative rounded-[30px] md:rounded-[40px] lg:rounded-[46px] overflow-hidden">
        <Image src={src} alt={alt} width={1600} height={900} className="w-full h-[360px] md:h-[520px] object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 p-6 md:p-10 flex items-end">
          <h3 className="text-white font-extrabold uppercase leading-[1.07] text-[40px] md:text-[64px] lg:text-[80px]">
            {headline}
          </h3>
        </div>
      </div>
    </div>
  );
}
import Image from "next/image";

// --- Data for the galleries ---
// Using Unsplash images that are configured in next.config.ts
const clmImages = {
  main: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1260&h=750&q=80",
  topRight1:
    "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1260&h=750&q=80",
  topRight2:
    "https://images.unsplash.com/photo-1581091215367-59ab6c99d1a9?auto=format&fit=crop&w=1260&h=750&q=80",
  middleWide:
    "https://images.unsplash.com/photo-1590608897129-79da98d159ab?auto=format&fit=crop&w=1260&h=750&q=80",
  bottom1:
    "https://images.unsplash.com/photo-1551836022-4c4c79ecde16?auto=format&fit=crop&w=1260&h=750&q=80",
  bottom2:
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1260&h=750&q=80",
  bottom3:
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1260&h=750&q=80",
  bottom4:
    "https://images.unsplash.com/photo-1573497019563-e16a48a7e42f?auto=format&fit=crop&w=1260&h=750&q=80",
};

const crpvfImages = {
  left1:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1260&h=750&q=80",
  left2:
    "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?auto=format&fit=crop&w=1260&h=750&q=80",
  left3:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1260&h=750&q=80",
  left4:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1260&h=750&q=80",
  main: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1260&h=750&q=80",
};

// --- Reusable Image Card Component ---
const ImageCard = ({
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) => (
  <div
    className={`bg-white p-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
  >
    <div className={`relative w-full h-full ${imgClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-2xl"
      />
    </div>
  </div>
);

// --- Background SVG Pattern ---
const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0"
    >
      <defs>
        <pattern
          id="pattern-swoosh"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <path
            d="M 50 0 C 20 50, 20 150, 50 200"
            stroke="#E8F5E9"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 150 0 C 180 50, 180 150, 150 200"
            stroke="#E8F5E9"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-swoosh)" />
    </svg>
  </div>
);

export default function GalleryPage() {
  return (
    <div className="relative bg-[#FCFFFD] font-sans overflow-hidden">
      <BackgroundPattern />
      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-lg text-[#F57C00] mb-12">
          A visual journey of our people, projects, and the change we create.
        </p>

        {/* CLM Section */}
        <section id="clm">
          <h2 className="text-center text-4xl font-bold text-[#388E3C] mb-8">
            CLM
          </h2>
          <div className="flex flex-col gap-6">
            {/* Top part: Large image left, smaller images right */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2">
                <ImageCard
                  src={clmImages.main}
                  alt="CLM main presentation"
                  className="h-[30rem] md:h-[38rem]"
                />
              </div>
              <div className="lg:w-1/2 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <ImageCard
                    src={clmImages.topRight1}
                    alt="CLM meeting participants"
                    className="h-52"
                  />
                  <ImageCard
                    src={clmImages.topRight2}
                    alt="CLM collaborative session"
                    className="h-52"
                  />
                </div>
                <ImageCard
                  src={clmImages.middleWide}
                  alt="CLM group discussion"
                  className="h-52"
                />
              </div>
            </div>
            {/* Bottom part: Four images in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ImageCard
                src={clmImages.bottom1}
                alt="Presenter at CLM event"
                className="h-52"
              />
              <ImageCard
                src={clmImages.bottom2}
                alt="CLM attendees networking"
                className="h-52"
              />
              <ImageCard
                src={clmImages.bottom3}
                alt="Team working at CLM event"
                className="h-52"
              />
              <ImageCard
                src={clmImages.bottom4}
                alt="Speaker addressing audience at CLM"
                className="h-52"
              />
            </div>
          </div>
        </section>

        <hr className="my-16 border-t-2 border-transparent" />

        {/* CRPVF Section */}
        <section id="crpvf">
          <h2 className="text-center text-4xl font-bold text-[#388E3C] mb-8">
            CRPVF
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side: four smaller images */}
            <div className="lg:w-[60%] grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <ImageCard
                  src={crpvfImages.left1}
                  alt="CRPVF community gathering"
                  className="h-52"
                />
                <ImageCard
                  src={crpvfImages.left3}
                  alt="CRPVF children in a group"
                  className="h-52"
                />
              </div>
              <div className="flex flex-col gap-6">
                <ImageCard
                  src={crpvfImages.left2}
                  alt="CRPVF training session"
                  className="h-52"
                />
                <ImageCard
                  src={crpvfImages.left4}
                  alt="CRPVF parenting skill workshop"
                  className="h-52"
                />
              </div>
            </div>
            {/* Right side: large image */}
            <div className="lg:w-[40%]">
              <ImageCard
                src={crpvfImages.main}
                alt="CRPVF parenting skill training group photo"
                className="h-full min-h-[30rem]"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

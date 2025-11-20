"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface Thumbnail {
  id: number;
  src: string;
  alt?: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  featuredImage?: string;
  galleryThumbnails?: Thumbnail[];
  status?: string;
  partner?: string;
}

interface Program {
  _id?: string;
  title: string | { en: string; am: string };
  categoryId: string;
  description: string | { en: string; am: string };
  image: string;
  thumbnails: Thumbnail[];
  projects?: Project[];
}

export default function ProgramsListSection() {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState("traditional-consultation");
  const [programsList, setProgramsList] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const programCategories = [
    {
      id: "traditional-consultation",
      label: "Traditional Medical\nConsultation",
    },
    {
      id: "herbal-medicine",
      label: "Herbal Medicine\nPreparation",
    },
    {
      id: "detox-therapy",
      label: "Detox & Cleansing\nTherapy",
    },
    {
      id: "diagnostic-techniques",
      label: "Traditional Diagnostic\nTechniques",
    },
    {
      id: "healing-treatments",
      label: "Healing\nTreatments",
    },
  ];

  const handleTabClick = (id: string) => setActiveTab(id);

  // Fetch services from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Note: API endpoint will be updated in Phase 8, using /api/public/programs for now
        const response = await fetch("/api/public/programs");
        const data = await response.json();

        if (data.success) {
          setProgramsList(data.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fallback data in case API fails or returns empty
  const fallbackPrograms: Program[] = [
    {
      title: "Traditional Medical Consultation",
      categoryId: "traditional-consultation",
      description:
        "Experience personalized consultations with our experienced traditional medicine practitioners. Our consultations combine ancient Ethiopian healing wisdom with modern understanding to provide comprehensive health assessments and treatment plans tailored to your unique needs.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
    {
      title: "Herbal Medicine Preparation",
      categoryId: "herbal-medicine",
      description:
        "Our expert practitioners prepare custom herbal medicines using traditional Ethiopian recipes passed down through generations. Each preparation is carefully crafted using locally sourced, organic herbs and plants, following ancient methods that preserve the natural healing properties of each ingredient.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
    {
      title: "Detox & Cleansing Therapy",
      categoryId: "detox-therapy",
      description:
        "Experience our comprehensive detox and cleansing therapies designed to purify the body and restore natural balance. Our traditional methods help eliminate toxins, improve digestion, boost energy levels, and enhance overall wellness through natural herbal treatments and therapeutic practices.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-2.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
    {
      title: "Traditional Diagnostic Techniques",
      categoryId: "diagnostic-techniques",
      description:
        "Our practitioners use time-honored diagnostic methods including pulse reading, tongue examination, and comprehensive health assessment techniques. These traditional approaches allow us to understand the root causes of health issues and develop personalized treatment plans that address both symptoms and underlying imbalances.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-3.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
    {
      title: "Healing Treatments",
      categoryId: "healing-treatments",
      description:
        "Our comprehensive healing treatments combine traditional Ethiopian medicine practices with modern therapeutic approaches. From massage therapy and energy healing to specialized treatments for chronic conditions, we offer a range of services designed to promote physical, mental, and spiritual wellness.",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
  ];

  // Use fetched programs or fallback if empty
  const displayPrograms =
    programsList.length > 0 ? programsList : fallbackPrograms;

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center mt-8 mb-10">
        <ProgramTabs
          programCategories={programCategories}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <div className="mt-8 px-6 md:px-20 xl:px-24 2xl:px-40">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-green"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center mt-8 mb-10 ">
      {/* Outer container for rounded white bar */}
      <ProgramTabs
        programCategories={programCategories}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <div className="mt-8 px-6 md:px-20 xl:px-24 2xl:px-40">
        {displayPrograms.filter((program) => program.categoryId === activeTab)
          .length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="text-center max-w-2xl">
              <h3 className="font-roboto font-bold text-2xl md:text-3xl text-gray-800 mb-4">
                {t("pages.programs.noServices") || "No Services Available"}
              </h3>
              <p className="font-roboto font-light text-base md:text-lg text-gray-600 mb-8">
                {t("pages.programs.noServicesDescription") ||
                  "We're working on adding more services. Please check back soon or contact us for more information."}
              </p>
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {t("contact.title") || "Contact Us"}
              </a>
            </div>
          </div>
        ) : (
          displayPrograms
            .filter((program) => program.categoryId === activeTab)
            .map((program) => {
              const key = program._id || (typeof program.title === 'string' 
                ? program.title 
                : program.title.en || program.title.am || '');
              return <ProgramItem key={key} program={program} />;
            })
        )}
      </div>
    </div>
  );
}

const ProgramItem: React.FC<{ program: Program }> = ({ program }) => {
  const { t, locale } = useTranslation();
  // If program has projects, display program header first, then each project
  if (program.projects && program.projects.length > 0) {
    return (
      <>
        {/* Program Header Section */}
        <section
          className="relative flex flex-col items-center justify-center w-full  overflow-hidden py-10 md:py-16 px-4 md:px-8 lg:px-16"
          role="region"
          aria-labelledby={`${program.categoryId}-program-title`}
        >
          {/* Content container */}
          <div className="relative z-10 flex flex-col items-center text-center w-full ">
            {/* Program Title */}
            <h2
              id={`${program.categoryId}-program-title`}
              className="font-roboto font-black text-primary-green text-lg md:text-2xl lg:text-5xl xl:text-6xl  leading-[101%] tracking-[0] uppercase w-full mb-4"
            >
              {(() => {
                const titleText = getBilingualText(program.title, locale, "");
                const titleParts = titleText.split("(");
                return (
                  <>
                    <span className="">{titleParts[0].trim()} </span>
                    {titleParts.length > 1 && (
                      <span className="text-primary-orange">
                        ({titleParts[1]?.replace(")", "")})
                      </span>
                    )}
                  </>
                );
              })()}
            </h2>

            {/* Program Description */}
            <p className="font-roboto font-light text-sm md:text-base lg:text-lg xl:text-[24px] leading-[1.26] tracking-[0.8px] text-justify capitalize text-[#333333] mb-16">
              {getBilingualText(program.description, locale, "")}
            </p>

            {/* Program Main Image */}
            <div className="relative w-full  h-auto overflow-hidden rounded-[32px] shadow-sm mb-10">
              <img
                src={program.image}
                alt={`${program.title} main image`}
                className="object-contain w-full h-auto"
              />
            </div>

            {/* Program Thumbnails Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full">
              {program.thumbnails.map((thumb) => (
                <div
                  key={thumb.id}
                  className="relative aspect-[285/314] rounded-[20px] overflow-hidden shadow-sm"
                >
                  <img
                    src={
                      thumb.src ||
                      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center"
                    }
                    alt={`Thumbnail ${thumb.id}`}
                    className="object-cover transition-transform duration-300 w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

            {/* Service Details Section */}
        <div className="px-6 md:px-20 xl:px-24 2xl:px-40">
          <h3 className="font-roboto font-black text-primary-green text-lg md:text-xl lg:text-2xl xl:text-3xl leading-[101%] tracking-[0] uppercase text-center mb-8">
            {t("pages.programs.serviceDetails")}
          </h3>
        </div>

        {program.projects.map((project) => (
          <section
            key={project.id}
            className="relative flex flex-col items-center justify-center w-full  overflow-hidden py-10 md:py-16 px-4 md:px-8 lg:px-16"
            role="region"
            aria-labelledby={`${program.categoryId}-${project.id}-title`}
          >
            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center text-center w-full ">
              {/* Project Title */}
              <h3
                id={`${program.categoryId}-${project.id}-title`}
                className="font-roboto font-black text-primary-green text-lg md:text-xl lg:text-3xl xl:text-4xl  leading-[101%] tracking-[0] uppercase w-full mb-4"
              >
                <span className="">{project.name.split("(")[0].trim()} </span>
                {project.name.split("(")[1] && (
                  <span className="text-primary-orange">
                    ({project.name.split("(")[1]?.replace(")", "")})
                  </span>
                )}
                {project.partner && (
                  <span className="text-primary-orange">
                    {" "}
                    ({project.partner})
                  </span>
                )}
              </h3>

              {/* Project Description */}
              {project.description && (
                <p className="font-roboto font-light text-sm md:text-base lg:text-lg xl:text-[20px] leading-[1.26] tracking-[0.8px] text-justify capitalize text-[#333333] mb-16">
                  {project.description}
                </p>
              )}

              {/* Project Main Image */}
              {project.featuredImage && (
                <div className="relative w-full  h-auto overflow-hidden rounded-[32px] shadow-sm mb-10">
                  <img
                    src={project.featuredImage}
                    alt={`${project.name} main image`}
                    className="object-contain w-full h-auto"
                  />
                </div>
              )}

              {/* Project Thumbnails Grid - Show project gallery thumbnails if available */}
              {project.galleryThumbnails &&
                project.galleryThumbnails.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full">
                    {project.galleryThumbnails.map((thumb) => (
                      <div
                        key={thumb.id}
                        className="relative aspect-[285/314] rounded-[20px] overflow-hidden shadow-sm"
                      >
                        <img
                          src={
                            thumb.src ||
                            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center"
                          }
                          alt={thumb.alt || `Thumbnail ${thumb.id}`}
                          className="object-cover transition-transform duration-300 w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </section>
        ))}
      </>
    );
  }

  // Fallback: display program as before if no projects
  return (
    <section
      className="relative flex flex-col items-center justify-center w-full  overflow-hidden py-10 md:py-16 px-4 md:px-8 lg:px-16"
      role="region"
      aria-labelledby={`${program.categoryId}-title`}
    >
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center text-center w-full ">
        {/* Title */}
        <h2
          id={`${program.categoryId}-title`}
          className="font-roboto font-black text-primary-green text-lg md:text-2xl lg:text-5xl xl:text-6xl  leading-[101%] tracking-[0] uppercase w-full mb-4"
        >
          {(() => {
            const titleText = getBilingualText(program.title, locale, "");
            const titleParts = titleText.split("(");
            return (
              <>
                <span className="">{titleParts[0].trim()} </span>
                {titleParts.length > 1 && (
                  <span className="text-primary-orange">
                    ({titleParts[1]?.replace(")", "")})
                  </span>
                )}
              </>
            );
          })()}
        </h2>

        {/* Description */}
        <p className="font-roboto font-light text-sm md:text-base lg:text-lg xl:text-[24px] leading-[1.26] tracking-[0.8px] text-justify capitalize text-[#333333] mb-16">
          {getBilingualText(program.description, locale, "")}
        </p>

        {/* Main Image */}
        <div className="relative w-full  h-auto overflow-hidden rounded-[32px] shadow-sm mb-10">
          <img
            src={program.image}
            alt={`${program.title} main image`}
            className="object-contain w-full h-auto"
          />
        </div>

        {/* Thumbnails Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full">
          {program.thumbnails.map((thumb) => (
            <div
              key={thumb.id}
              className="relative aspect-[285/314] rounded-[20px] overflow-hidden shadow-sm"
            >
              <img
                src={
                  thumb.src ||
                  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center"
                }
                alt={`Thumbnail ${thumb.id}`}
                className="object-cover transition-transform duration-300 w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProgramTabs = ({
  programCategories,
  handleTabClick,
  activeTab,
}: {
  programCategories: {
    id: string;
    label: string;
  }[];
  handleTabClick: (id: string) => void;
  activeTab: string;
}) => {
  return (
    <div className="w-full bg-white  shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden rounded-4xl border border-[#F5F5F5]">
      <div className="flex divide-x divide-[#E0E0E0] ">
        <div className="flex-1 text-center py-4 md:py-5 px-2 md:px-4 font-sans text-[14px] font-normal leading-[1.2] whitespace-pre-line"></div>
        {programCategories.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex-1 text-center py-4 md:py-5 px-2 md:px-4 transition-colors duration-200 whitespace-pre-line font-sans text-sm md:text-xl 2xl:text-2xl font-normal leading-[1.2] ${
              activeTab === item.id ? "text-[#F7931E]" : "text-[#4A4A4A]"
            }`}
          >
            {item.label}
          </button>
        ))}
        <div className="flex-1 text-center py-4 md:py-5 px-2 md:px-4 font-sans text-[14px] font-normal leading-[1.2] whitespace-pre-line"></div>
      </div>
    </div>
  );
};

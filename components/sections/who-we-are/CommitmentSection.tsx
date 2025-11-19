"use client";

import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";
import { Card, CardContent } from "~/components/ui/Card";

interface CommitmentSectionProps {
  title?: string | { en: string; am: string };
  commitments?: Array<string | { en: string; am: string }>;
}

export function CommitmentSection({
  title,
  commitments = [],
}: CommitmentSectionProps) {
  const { locale } = useTranslation();

  const titleText = getBilingualText(
    title,
    locale,
    locale === "am" ? "ቁርጠኛ ቃላችን" : "Our Commitment"
  );

  return (
    <section className="relative w-full flex justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16">
      <Card className="w-full bg-white rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[46px] shadow-[0px_2px_13px_#0000000d] sm:shadow-[0px_4px_26.5px_#0000000d] border-0">
        <CardContent className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
          <h2
            className={`w-full primary-title text-primary-green text-center ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {titleText}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
            {commitments.map((commitment, index) => {
              const commitmentText = getBilingualText(
                commitment,
                locale,
                ""
              );

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-cover bg-center rounded-2xl min-h-[20vh] sm:min-h-[25vh] cursor-pointer transition-all duration-300 hover:border-4 hover:border-[#FF9700] hover:border-opacity-50 ${
                    index % 2 === 0 ? "bg-[#B1EFCA]" : "bg-white border-2 border-primary-green/20"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center flex-1 w-full">
                    <p
                      className={`[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-xs sm:text-sm md:text-base lg:text-lg text-center tracking-[0] leading-relaxed ${
                        locale === "am" ? "font-amharic" : ""
                      }`}
                    >
                      {commitmentText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}


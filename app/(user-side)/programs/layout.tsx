import { Metadata } from "next";
import { generatePageMetadata } from "~/lib/seo/metadata-config";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";
import { BASE_URL } from "~/lib/seo/metadata-config";
import { getLocale } from "~/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generatePageMetadata("/programs", locale);
}

export default function ProgramsLayout({
  children,
  hero,
  programsList,
}: {
  children: React.ReactNode;
  hero: React.ReactNode;
  programsList: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "Our Services | Traditional Medical Services | Deshet Medical Center",
    description:
      "Explore Deshet Indigenous Medical Center's comprehensive traditional medical services: Traditional Medical Consultation, Herbal Medicine Preparation, Detox & Cleansing Therapy, Traditional Diagnostic Techniques, and Healing Treatments.",
    url: `${BASE_URL}/programs`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Services", url: `${BASE_URL}/programs` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {hero}
      {programsList}
      {children}
    </>
  );
}

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
  return generatePageMetadata("/who-we-are", locale);
}

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "About Us | Who We Are",
    description:
      "Learn about Tamra's mission, vision, core values, leadership team, and our commitment to empowering communities across Ethiopia through inclusive development programs.",
    url: `${BASE_URL}/who-we-are`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Who We Are", url: `${BASE_URL}/who-we-are` },
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
      {children}
    </>
  );
}

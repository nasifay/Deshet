import { Metadata } from "next";
import { PAGE_METADATA, BASE_URL } from "~/lib/seo/metadata-config";
import { generateWebPageSchema, generateBreadcrumbSchema } from "~/lib/seo/json-ld";

export const metadata: Metadata = PAGE_METADATA["who-we-are"];

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "About Us | Who We Are",
    description: "Learn about Tamra's mission, vision, core values, leadership team, and our commitment to empowering communities across Ethiopia.",
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


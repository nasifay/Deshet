import { Metadata } from "next";
import { PAGE_METADATA, BASE_URL } from "~/lib/seo/metadata-config";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";

export const metadata: Metadata = PAGE_METADATA.gallery;

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "Gallery",
    description:
      "Explore our photo gallery showcasing programs, projects, events, and the communities we serve.",
    url: `${BASE_URL}/gallery`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Gallery", url: `${BASE_URL}/gallery` },
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

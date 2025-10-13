import { Metadata } from "next";
import { PAGE_METADATA, BASE_URL } from "~/lib/seo/metadata-config";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";

export const metadata: Metadata = PAGE_METADATA.news;

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "News & Events",
    description:
      "Stay informed with the latest news, stories, milestones, and community events from Tamra for Social Development.",
    url: `${BASE_URL}/news`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "News & Events", url: `${BASE_URL}/news` },
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

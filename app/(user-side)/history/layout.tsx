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
  return generatePageMetadata("/history", locale);
}

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "Our History | Journey of Impact",
    description:
      "Trace Tamra's journey from establishment to today. Explore our milestones, growth, and unwavering commitment to communities across Ethiopia since inception.",
    url: `${BASE_URL}/history`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "History", url: `${BASE_URL}/history` },
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

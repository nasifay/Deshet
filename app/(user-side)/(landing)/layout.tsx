import { Metadata } from "next";
import { generatePageMetadata } from "~/lib/seo/metadata-config";
import {
  generateOrganizationSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";
import { BASE_URL } from "~/lib/seo/metadata-config";
import { getLocale } from "~/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generatePageMetadata("/", locale);
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const webPageSchema = generateWebPageSchema({
    name: "Home - Tamra for Social Development",
    description:
      "Leading NGO in Ethiopia empowering youth through holistic programs in health, education, livelihoods, peacebuilding, and civic engagement.",
    url: BASE_URL,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      {children}
    </>
  );
}

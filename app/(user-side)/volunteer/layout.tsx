import { Metadata } from "next";
import { PAGE_METADATA, BASE_URL } from "~/lib/seo/metadata-config";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";

export const metadata: Metadata = PAGE_METADATA.volunteer;

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "Join as a Volunteer",
    description:
      "Join Tamra's volunteer network and become part of the change. Contribute to equality, empowerment, and sustainable development.",
    url: `${BASE_URL}/volunteer`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Volunteer", url: `${BASE_URL}/volunteer` },
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

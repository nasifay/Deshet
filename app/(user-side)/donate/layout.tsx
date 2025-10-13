import { Metadata } from "next";
import { PAGE_METADATA, BASE_URL } from "~/lib/seo/metadata-config";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";

export const metadata: Metadata = PAGE_METADATA.donate;

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "Donate",
    description:
      "Your donation creates lasting change. Support youth empowerment, women's rights, and vulnerable populations in Ethiopia.",
    url: `${BASE_URL}/donate`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Donate", url: `${BASE_URL}/donate` },
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

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
  return generatePageMetadata("/booking", locale);
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "Book Appointment | Deshet Medical Center",
    description:
      "Schedule your appointment with Deshet Indigenous Medical Center. Experience traditional Ethiopian medicine with our experienced practitioners. Book your consultation today.",
    url: `${BASE_URL}/booking`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Book Appointment", url: `${BASE_URL}/booking` },
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

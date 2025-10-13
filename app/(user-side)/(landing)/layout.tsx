import { Metadata } from "next";
import { PAGE_METADATA } from "~/lib/seo/metadata-config";
import { generateWebPageSchema } from "~/lib/seo/json-ld";

export const metadata: Metadata = PAGE_METADATA.home;

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "Tamra for Social Development - Home",
    description: "Leading NGO in Ethiopia empowering youth through holistic programs in health, education, livelihoods, peacebuilding, and civic engagement.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://tamra-sdt.org",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <div className="">{children}</div>
    </>
  );
}

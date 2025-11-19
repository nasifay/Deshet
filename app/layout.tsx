import type { Metadata } from "next";
import { Inter, Poppins, Cormorant_Garamond, Noto_Serif_Ethiopic } from "next/font/google";
import "./globals.css";
import { generateRootMetadata } from "~/lib/seo/metadata-config";
import { generateOrganizationSchema } from "~/lib/seo/json-ld";
import { getLocale } from "~/lib/i18n/server";
import { TranslationProviderWrapper } from "~/components/providers/TranslationProviderWrapper";
import { localeFonts } from "~/lib/i18n/config";

// Body text font - Inter (modern, clean)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Alternative body font - Poppins (friendly, readable)
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Heading font - Cormorant Garamond (elegant, traditional)
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Amharic font - Noto Serif Ethiopic (for Amharic text)
const notoSerifEthiopic = Noto_Serif_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-amharic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Metadata is generated dynamically based on locale via generateMetadata function below

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const locale = await getLocale();

  return (
    <html 
      lang={locale}
      className={`${inter.variable} ${poppins.variable} ${cormorantGaramond.variable} ${notoSerifEthiopic.variable}`}
      style={{
        fontFamily: localeFonts[locale],
      } as React.CSSProperties}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased bg-white font-sans">
        <TranslationProviderWrapper locale={locale}>
          <main className=" bg-white">{children}</main>
        </TranslationProviderWrapper>
      </body>
    </html>
  );
}

// Generate metadata dynamically based on locale
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generateRootMetadata(locale);
}

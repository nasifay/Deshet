import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { BASE_URL, ORGANIZATION } from "~/lib/seo/metadata-config";
import { generateOrganizationSchema } from "~/lib/seo/json-ld";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: ORGANIZATION.name,
    template: `%s | ${ORGANIZATION.shortName}`,
  },
  description: ORGANIZATION.description,
  keywords: [
    "NGO Ethiopia",
    "youth empowerment",
    "peacebuilding",
    "gender development",
    "SRHR",
    "community development",
    "Tamra",
  ],
  authors: [{ name: ORGANIZATION.name }],
  creator: ORGANIZATION.name,
  publisher: ORGANIZATION.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased bg-white">
        <main className=" bg-white">{children}</main>
      </body>
    </html>
  );
}

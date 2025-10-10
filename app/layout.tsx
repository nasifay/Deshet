import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import { WhatsAppButton } from "~/components/sections/who-we-are/WhatsAppButton";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Tamra for Social Development",
    template: "%s • TSD",
  },
  description:
    "Empowering young people through holistic development in health, education, livelihoods, and civic engagement.",
  metadataBase: new URL("https://example.org"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="antialiased bg-white">
        <Header />
        <main className="pt-4 md:pt-10 lg:pt-14 bg-white">{children}</main>
        <Footer />
        <WhatsAppButton phoneNumber="251911234567" />
      </body>
    </html>
  );
}

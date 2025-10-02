import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Tamra for Social Development",
    template: "%s • TSD",
  },
  description:
    "Empowering young people through holistic development in health, education, livelihoods, and civic engagement.",
  metadataBase: new URL("https://example.org"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-background text-foreground">
        <Header />
        <main className="min-h-dvh">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

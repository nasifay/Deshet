import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

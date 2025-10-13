import Footer from "~/components/layout/Footer";
import Header from "~/components/layout/Header";
import { WhatsAppButton } from "~/components/sections/who-we-are/WhatsAppButton";

export default function UserSideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white pt-[87px]">
      <Header />

      {children}
      <Footer />
      <WhatsAppButton phoneNumber="251911234567" />
    </div>
  );
}

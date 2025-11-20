import Footer from "~/components/layout/Footer";
import Header from "~/components/layout/Header";

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
    </div>
  );
}

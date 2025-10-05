export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-10 md:space-y-16 lg:space-y-[72px]">
      {children}
    </div>
  );
}
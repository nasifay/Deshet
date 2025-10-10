export default function UserSideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white pt-[87px]">
      {children}
    </div>
  );
}
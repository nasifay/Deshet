import React from "react";

interface UserSideLayoutProps {
  children: React.ReactNode;
}

export default function UserSideLayout({ children }: UserSideLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
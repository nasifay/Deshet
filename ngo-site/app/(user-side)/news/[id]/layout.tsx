import React from "react";

interface NewsDetailsLayoutProps {
  children: React.ReactNode;
}

export default function NewsDetailsLayout({
  children,
}: NewsDetailsLayoutProps) {
  return <div className="min-h-screen bg-white">{children}</div>;
}

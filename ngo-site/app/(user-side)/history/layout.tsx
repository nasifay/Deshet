import React from "react";

export default function HistoryLayout({
  children,
}: {
  milestones: React.ReactNode;
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

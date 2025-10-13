import type { Metadata } from 'next';
import AdminLayoutClient from './components/AdminLayoutClient';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | TSD Admin',
  },
  description: 'Tamra for Social Development - Admin Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}









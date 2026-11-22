import DashboardShell from '@/components/DashboardShell';

export const metadata = { title: 'Dashboard' };
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}

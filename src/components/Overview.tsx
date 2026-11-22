'use client';
import { CalendarCheck, CheckCircle2, ClipboardList, DollarSign, Hourglass, ShieldCheck, Users, Wallet, Wrench } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { useUser } from '@/hooks/useUser';
import { ErrorBox, PageHeader, Skeleton, StatsCard } from './ui';
import { DonutChart, SimpleBar } from './Charts';
import { money } from '@/lib/utils';

export default function Overview({ role }: { role: 'customer' | 'technician' | 'admin' }) {
  const { user } = useUser();
  const { data, loading, error, reload } = useFetch<any>('/api/stats/overview');

  if (error) return <ErrorBox message={error} onRetry={reload} />;
  const c = data?.cards || {};
  const ch = data?.charts || {};

  const cards =
    role === 'customer' ? [
      { label: 'Total Requests', value: c.total, icon: CalendarCheck, tone: 'brand' },
      { label: 'Active Jobs', value: c.active, icon: Hourglass, tone: 'orange' },
      { label: 'Completed Jobs', value: c.completed, icon: CheckCircle2, tone: 'green' },
      { label: 'Total Spent', value: money(c.spent), icon: Wallet, tone: 'purple' },
    ] : role === 'technician' ? [
      { label: 'Total Services', value: c.totalServices, icon: Wrench, tone: 'brand' },
      { label: 'Approved Services', value: c.approved, icon: ShieldCheck, tone: 'green' },
      { label: 'Pending Requests', value: c.pending, icon: ClipboardList, tone: 'orange' },
      { label: 'Total Earnings', value: money(c.earnings), icon: DollarSign, tone: 'purple' },
    ] : [
      { label: 'Total Users', value: c.users, icon: Users, tone: 'brand' },
      { label: 'Total Technicians', value: c.technicians, icon: Wrench, tone: 'blue' },
      { label: 'Pending Services', value: c.pending, icon: Hourglass, tone: 'orange' },
      { label: 'Total Revenue', value: money(c.revenue), icon: DollarSign, tone: 'green' },
    ];

  return (
    <>
      <PageHeader title={`Hello, ${user?.name?.split(' ')[0] || 'there'} 👋`} subtitle="Here’s what’s happening with your account." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />) : cards.map((x) => <StatsCard key={x.label} {...(x as any)} value={x.value ?? 0} />)}
      </div>
      {!loading && (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <DonutChart title="Bookings by status" data={ch.byStatus || []} />
          {role === 'customer' && <SimpleBar title="Spending by month" data={ch.spending || []} money />}
          {role === 'technician' && <SimpleBar title="Earnings by month" data={ch.earnings || []} money color="#f97316" />}
          {role === 'admin' && <SimpleBar title="Revenue by month" data={ch.revenue || []} money color="#f97316" />}
          {role === 'admin' && <SimpleBar title="Services by category" data={ch.byCategory || []} />}
          {role === 'admin' && <DonutChart title="Users by role" data={ch.usersByRole || []} />}
        </div>
      )}
    </>
  );
}

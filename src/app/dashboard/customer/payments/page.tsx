'use client';
import { Receipt } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { EmptyState, ErrorBox, PageHeader, TableSkeleton, TableWrap } from '@/components/ui';
import { fmtDate, money } from '@/lib/utils';

export default function Payments() {
  const { data, loading, error, reload } = useFetch<{ items: any[] }>('/api/payments/mine');
  return (
    <>
      <PageHeader title="Payment History" subtitle="All your completed payments." />
      {loading ? <TableSkeleton /> : error ? <ErrorBox message={error} onRetry={reload} /> : !data?.items.length ? (
        <EmptyState icon={Receipt} title="No payments yet" text="Payments appear here once you pay for a completed repair." href="/dashboard/customer/bookings" cta="View bookings" />
      ) : (
        <TableWrap>
          <thead><tr>{['Service', 'Technician', 'Amount', 'Transaction ID', 'Date'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {data.items.map((p) => (
              <tr key={p._id}><td className="td font-semibold text-ink-900">{p.serviceTitle}</td><td className="td">{p.technicianName}</td><td className="td font-bold text-green-700">{money(p.amount)}</td><td className="td font-mono text-xs">{p.transactionId}</td><td className="td whitespace-nowrap">{fmtDate(p.paidAt)}</td></tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}

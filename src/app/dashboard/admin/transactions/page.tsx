'use client';
import { DollarSign, Receipt } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { EmptyState, ErrorBox, PageHeader, StatsCard, TableSkeleton, TableWrap } from '@/components/ui';
import { fmtDate, money } from '@/lib/utils';

export default function Transactions() {
  const { data, loading, error, reload } = useFetch<{ items: any[]; totalRevenue: number }>('/api/admin/transactions');
  return (
    <>
      <PageHeader title="Transactions" subtitle="Every Stripe payment recorded on FixMate." />
      {!loading && data && <div className="mb-6 max-w-sm"><StatsCard label="Total Revenue" value={money(data.totalRevenue)} icon={DollarSign} tone="green" /></div>}
      {loading ? <TableSkeleton /> : error ? <ErrorBox message={error} onRetry={reload} /> : !data?.items.length ? <EmptyState icon={Receipt} title="No transactions yet" /> : (
        <TableWrap>
          <thead><tr>{['Customer', 'Technician', 'Service', 'Amount', 'Transaction ID', 'Date'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {data.items.map((p) => (
              <tr key={p._id} className="hover:bg-slate-50/60"><td className="td"><p className="font-medium">{p.customerName}</p><p className="text-xs text-slate-500">{p.customerEmail}</p></td><td className="td">{p.technicianName}</td><td className="td">{p.serviceTitle}</td><td className="td font-bold text-green-700">{money(p.amount)}</td><td className="td font-mono text-xs">{p.transactionId}</td><td className="td whitespace-nowrap">{fmtDate(p.paidAt)}</td></tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}

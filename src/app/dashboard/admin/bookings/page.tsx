'use client';
import { useState } from 'react';
import { CalendarX2 } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { PaymentBadge, StatusBadge } from '@/components/Badges';
import { EmptyState, ErrorBox, PageHeader, TableSkeleton, TableWrap } from '@/components/ui';
import { BOOKING_STATUS } from '@/lib/constants';
import { fmtDate, money } from '@/lib/utils';

export default function AdminBookings() {
  const [status, setStatus] = useState('');
  const { data, loading, error, reload } = useFetch<{ items: any[] }>(`/api/admin/bookings${status ? `?status=${status}` : ''}`);
  return (
    <>
      <PageHeader title="All Bookings" subtitle="Read-only view of every repair job on the platform."
        action={<select className="input w-auto" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status"><option value="">All statuses</option>{Object.entries(BOOKING_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>} />
      {loading ? <TableSkeleton /> : error ? <ErrorBox message={error} onRetry={reload} /> : !data?.items.length ? <EmptyState icon={CalendarX2} title="No bookings found" /> : (
        <TableWrap>
          <thead><tr>{['Service', 'Customer', 'Technician', 'Date', 'Status', 'Payment', 'Amount'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {data.items.map((b) => (
              <tr key={b._id} className="hover:bg-slate-50/60">
                <td className="td max-w-[220px] font-semibold text-ink-900">{b.serviceTitle}</td><td className="td"><p>{b.customerName}</p><p className="text-xs text-slate-500">{b.customerEmail}</p></td>
                <td className="td">{b.technicianName}</td><td className="td whitespace-nowrap">{fmtDate(b.preferredDate)}</td><td className="td"><StatusBadge status={b.status} /></td>
                <td className="td"><PaymentBadge status={b.paymentStatus} /></td><td className="td font-semibold">{money(b.status === 'completed' ? b.finalAmount : b.basePrice)}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}

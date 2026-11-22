'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { CalendarX2, CreditCard } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/lib/api';
import { PaymentBadge, StatusBadge } from '@/components/Badges';
import { ConfirmModal } from '@/components/Modal';
import { EmptyState, ErrorBox, PageHeader, TableSkeleton, TableWrap } from '@/components/ui';
import { fmtDate, money } from '@/lib/utils';

export default function MyBookings() {
  const { data, loading, error, reload } = useFetch<{ items: any[] }>('/api/bookings/mine');
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [paying, setPaying] = useState<string | null>(null);

  const cancel = async () => {
    setBusy(true);
    try { await api(`/api/bookings/${cancelId}/status`, { method: 'PATCH', body: { status: 'cancelled' } }); toast.success('Booking cancelled'); setCancelId(null); reload(); }
    catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  };
  const pay = async (id: string) => {
    setPaying(id);
    try { const { url } = await api<{ url: string }>('/api/payments/create-checkout-session', { method: 'POST', body: { bookingId: id } }); window.location.href = url; }
    catch (e: any) { toast.error(e.message); setPaying(null); }
  };

  const Actions = ({ b }: { b: any }) => (
    <div className="flex flex-wrap items-center gap-2">
      {b.status === 'requested' && <button className="btn-outline btn-sm text-red-600" onClick={() => setCancelId(b._id)}>Cancel</button>}
      {b.status === 'completed' && b.paymentStatus === 'unpaid' && <button className="btn-accent btn-sm" onClick={() => pay(b._id)} disabled={paying === b._id}><CreditCard className="h-4 w-4" />{paying === b._id ? 'Redirecting…' : 'Pay Now'}</button>}
      {b.paymentStatus === 'paid' && <PaymentBadge status="paid" />}
    </div>
  );
  const amount = (b: any) => (b.status === 'completed' ? money(b.finalAmount) : money(b.basePrice));

  return (
    <>
      <PageHeader title="My Bookings" subtitle="Track every repair request from start to finish." />
      {loading ? <TableSkeleton /> : error ? <ErrorBox message={error} onRetry={reload} /> : !data?.items.length ? (
        <EmptyState icon={CalendarX2} title="No bookings yet" text="Find a trusted technician and send your first repair request." href="/services" cta="Browse services" />
      ) : (
        <>
          <div className="hidden lg:block">
            <TableWrap>
              <thead><tr>{['Service', 'Technician', 'Preferred date', 'Amount', 'Status', 'Payment', 'Actions'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/60">
                    <td className="td"><div className="flex items-center gap-3">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.serviceImage} alt="" className="h-12 w-16 rounded-lg object-cover" /><span className="max-w-[220px] font-semibold text-ink-900">{b.serviceTitle}</span></div></td>
                    <td className="td">{b.technicianName}</td><td className="td whitespace-nowrap">{fmtDate(b.preferredDate)}</td>
                    <td className="td font-semibold">{amount(b)}</td><td className="td"><StatusBadge status={b.status} /></td>
                    <td className="td"><PaymentBadge status={b.paymentStatus} /></td><td className="td"><Actions b={b} /></td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {data.items.map((b) => (
              <div key={b._id} className="card p-4">
                <div className="flex gap-3">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.serviceImage} alt="" className="h-16 w-20 rounded-lg object-cover" /><div className="min-w-0"><p className="font-bold text-ink-900">{b.serviceTitle}</p><p className="text-sm text-slate-500">{b.technicianName}</p></div></div>
                <div className="mt-3 flex flex-wrap items-center gap-2"><StatusBadge status={b.status} /><PaymentBadge status={b.paymentStatus} /></div>
                <div className="mt-3 flex items-center justify-between text-sm"><span className="text-slate-500">{fmtDate(b.preferredDate)}</span><span className="font-bold">{amount(b)}</span></div>
                <div className="mt-3"><Actions b={b} /></div>
              </div>
            ))}
          </div>
        </>
      )}
      <ConfirmModal open={!!cancelId} title="Cancel this request?" message="The technician will no longer see this request. This cannot be undone." confirmLabel="Yes, cancel" busy={busy} onConfirm={cancel} onClose={() => setCancelId(null)} />
    </>
  );
}

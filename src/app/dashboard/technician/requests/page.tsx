'use client';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ClipboardList } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/lib/api';
import { PaymentBadge, StatusBadge } from '@/components/Badges';
import Modal, { ConfirmModal } from '@/components/Modal';
import { EmptyState, ErrorBox, PageHeader, TableSkeleton, TableWrap } from '@/components/ui';
import { fmtDate, money } from '@/lib/utils';

const FILTERS = [['all', 'All'], ['requested', 'Requested'], ['accepted', 'Accepted'], ['in-progress', 'In Progress'], ['completed', 'Completed']];

export default function Requests() {
  const { data, loading, error, reload } = useFetch<{ items: any[] }>('/api/bookings/technician');
  const [filter, setFilter] = useState('all');
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [complete, setComplete] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  const items = useMemo(() => (data?.items || []).filter((b) => filter === 'all' || b.status === filter), [data, filter]);

  const update = async (id: string, status: string, extra: object = {}, msg = 'Status updated') => {
    setBusy(id);
    try { await api(`/api/bookings/${id}/status`, { method: 'PATCH', body: { status, ...extra } }); toast.success(msg); reload(); return true; }
    catch (e: any) { toast.error(e.message); return false; } finally { setBusy(null); }
  };

  return (
    <>
      <PageHeader title="Manage Requests" subtitle="Move each job through the repair pipeline."
        action={<select className="input w-auto" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">{FILTERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>} />
      {loading ? <TableSkeleton /> : error ? <ErrorBox message={error} onRetry={reload} /> : !items.length ? (
        <EmptyState icon={ClipboardList} title="No requests found" text={filter === 'all' ? 'Customer repair requests for your services will appear here.' : 'No requests with this status.'} />
      ) : (
        <TableWrap>
          <thead><tr>{['Customer', 'Contact', 'Service', 'Date', 'Problem', 'Status', 'Actions'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((b) => (
              <tr key={b._id} className="align-top hover:bg-slate-50/60">
                <td className="td font-semibold text-ink-900">{b.customerName}</td>
                <td className="td text-xs"><p>{b.customerPhone}</p><p className="max-w-[180px] text-slate-500">{b.address}</p></td>
                <td className="td max-w-[180px] font-medium">{b.serviceTitle}</td><td className="td whitespace-nowrap">{fmtDate(b.preferredDate)}</td>
                <td className="td max-w-[240px] text-xs text-slate-600">{b.problemDescription}</td>
                <td className="td"><div className="flex flex-col items-start gap-1.5"><StatusBadge status={b.status} />{b.status === 'completed' && <><PaymentBadge status={b.paymentStatus} /><span className="text-xs font-semibold">{money(b.finalAmount)}</span></>}</div></td>
                <td className="td">
                  <div className="flex flex-wrap gap-2">
                    {b.status === 'requested' && <><button className="btn-primary btn-sm" disabled={busy === b._id} onClick={() => update(b._id, 'accepted', {}, 'Request accepted')}>Accept</button><button className="btn-outline btn-sm text-red-600" onClick={() => setRejectId(b._id)}>Reject</button></>}
                    {b.status === 'accepted' && <button className="btn-primary btn-sm" disabled={busy === b._id} onClick={() => update(b._id, 'in-progress', {}, 'Work started')}>Start Work</button>}
                    {b.status === 'in-progress' && <button className="btn-accent btn-sm" onClick={() => { setComplete(b); setAmount(String(b.finalAmount ?? b.basePrice)); }}>Mark Completed</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
      <ConfirmModal open={!!rejectId} title="Reject this request?" message="The customer will see the request as rejected. This cannot be undone." confirmLabel="Reject" busy={!!busy} onClose={() => setRejectId(null)}
        onConfirm={async () => { if (await update(rejectId!, 'rejected', {}, 'Request rejected')) setRejectId(null); }} />
      <Modal open={!!complete} onClose={() => setComplete(null)} title="Complete job">
        <p className="mb-4 text-sm text-slate-500">Confirm the final amount the customer should pay for “{complete?.serviceTitle}”.</p>
        <label className="label" htmlFor="final">Final amount (USD)</label>
        <input id="final" type="number" min="0.01" step="0.01" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn-outline" onClick={() => setComplete(null)}>Cancel</button>
          <button className="btn-primary" disabled={!(Number(amount) > 0) || !!busy} onClick={async () => { if (await update(complete._id, 'completed', { finalAmount: Number(amount) }, 'Job marked as completed')) setComplete(null); }}>Mark Completed</button>
        </div>
      </Modal>
    </>
  );
}

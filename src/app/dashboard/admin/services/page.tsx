'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Check, ShieldCheck, X } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/lib/api';
import { ApprovalBadge } from '@/components/Badges';
import { ConfirmModal } from '@/components/Modal';
import { EmptyState, ErrorBox, PageHeader, TableSkeleton, TableWrap } from '@/components/ui';
import { money } from '@/lib/utils';

export default function AdminServices() {
  const [status, setStatus] = useState('pending');
  const { data, loading, error, reload } = useFetch<{ items: any[] }>(`/api/admin/services${status ? `?status=${status}` : ''}`);
  const [reject, setReject] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const set = async (id: string, approvalStatus: 'approved' | 'rejected') => {
    setBusy(true);
    try { await api(`/api/admin/services/${id}/status`, { method: 'PATCH', body: { approvalStatus } }); toast.success(approvalStatus === 'approved' ? 'Service approved' : 'Service rejected'); setReject(null); reload(); }
    catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <>
      <PageHeader title="Service Approval" subtitle="Review services submitted by technicians."
        action={<select className="input w-auto" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by approval status"><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="">All</option></select>} />
      {loading ? <TableSkeleton /> : error ? <ErrorBox message={error} onRetry={reload} /> : !data?.items.length ? (
        <EmptyState icon={ShieldCheck} title="Nothing to review" text="No services match this filter." />
      ) : (
        <TableWrap>
          <thead><tr>{['Service', 'Technician', 'Category', 'Price', 'Status', 'Actions'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {data.items.map((s) => (
              <tr key={s._id} className="hover:bg-slate-50/60">
                <td className="td"><div className="flex items-center gap-3">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.image} alt="" className="h-12 w-16 rounded-lg object-cover" /><span className="max-w-[220px] font-semibold text-ink-900">{s.title}</span></div></td>
                <td className="td"><p className="font-medium">{s.technicianName}</p><p className="text-xs text-slate-500">{s.technicianEmail}</p></td>
                <td className="td">{s.category}</td><td className="td font-semibold">{money(s.basePrice)}</td><td className="td"><ApprovalBadge status={s.approvalStatus} /></td>
                <td className="td"><div className="flex gap-2">
                  {s.approvalStatus !== 'approved' && <button className="btn-primary btn-sm" onClick={() => set(s._id, 'approved')}><Check className="h-3.5 w-3.5" /> Approve</button>}
                  {s.approvalStatus !== 'rejected' && <button className="btn-outline btn-sm text-red-600" onClick={() => setReject(s)}><X className="h-3.5 w-3.5" /> Reject</button>}
                </div></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
      <ConfirmModal open={!!reject} title="Reject this service?" message={`“${reject?.title}” will not be visible to customers.`} confirmLabel="Reject" busy={busy} onConfirm={() => set(reject._id, 'rejected')} onClose={() => setReject(null)} />
    </>
  );
}

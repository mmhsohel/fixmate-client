'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil, PlusCircle, Trash2, Wrench } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { useUser } from '@/hooks/useUser';
import { api } from '@/lib/api';
import { ApprovalBadge } from '@/components/Badges';
import Modal, { ConfirmModal } from '@/components/Modal';
import ServiceForm from '@/components/ServiceForm';
import { EmptyState, ErrorBox, PageHeader, TableSkeleton, TableWrap } from '@/components/ui';
import Link from 'next/link';
import { money } from '@/lib/utils';

export default function MyServices() {
  const { user } = useUser();
  const { data, loading, error, reload, setData } = useFetch<{ items: any[] }>('/api/services/mine');
  const [editing, setEditing] = useState<any>(null);
  const [deleting, setDeleting] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const toggle = async (s: any) => {
    const next = !s.isAvailable;
    setData((d) => d && { items: d.items.map((x) => (x._id === s._id ? { ...x, isAvailable: next } : x)) });
    try { await api(`/api/services/${s._id}/availability`, { method: 'PATCH', body: { isAvailable: next } }); toast.success(next ? 'Service is now available' : 'Service hidden from public pages'); }
    catch (e: any) { toast.error(e.message); reload(); }
  };
  const remove = async () => {
    setBusy(true);
    try { await api(`/api/services/${deleting._id}`, { method: 'DELETE' }); toast.success('Service deleted'); setDeleting(null); reload(); }
    catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <>
      <PageHeader title="My Services" subtitle="Create, edit and control the availability of your services." action={<Link href="/dashboard/technician/add-service" className="btn-primary"><PlusCircle className="h-4 w-4" /> Add Service</Link>} />
      {loading ? <TableSkeleton /> : error ? <ErrorBox message={error} onRetry={reload} /> : !data?.items.length ? (
        <EmptyState icon={Wrench} title="You haven’t added any service" text="List your first repair service and start receiving requests." href="/dashboard/technician/add-service" cta="Add a service" />
      ) : (
        <TableWrap>
          <thead><tr>{['Service', 'Category', 'Price', 'Approval', 'Available', 'Actions'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {data.items.map((s) => (
              <tr key={s._id} className="hover:bg-slate-50/60">
                <td className="td"><div className="flex items-center gap-3">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.image} alt="" className="h-12 w-16 rounded-lg object-cover" /><span className="max-w-[240px] font-semibold text-ink-900">{s.title}</span></div></td>
                <td className="td">{s.category}</td><td className="td font-semibold">{money(s.basePrice)}</td><td className="td"><ApprovalBadge status={s.approvalStatus} /></td>
                <td className="td"><button role="switch" aria-checked={s.isAvailable} aria-label="Toggle availability" onClick={() => toggle(s)} className={`relative h-6 w-11 rounded-full transition ${s.isAvailable ? 'bg-brand-600' : 'bg-slate-300'}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${s.isAvailable ? 'left-[22px]' : 'left-0.5'}`} /></button></td>
                <td className="td"><div className="flex gap-2"><button className="btn-outline btn-sm" onClick={() => setEditing(s)}><Pencil className="h-3.5 w-3.5" /> Edit</button><button className="btn-outline btn-sm text-red-600" onClick={() => setDeleting(s)}><Trash2 className="h-3.5 w-3.5" /> Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit service" wide>
        {editing && user && (
          <>
            <p className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">Saving changes sends the service back to admin for re-approval.</p>
            <ServiceForm initial={editing} technician={user} submitLabel="Save changes" busy={busy} onCancel={() => setEditing(null)} onSubmit={async (v) => {
              setBusy(true);
              try { await api(`/api/services/${editing._id}`, { method: 'PUT', body: v }); toast.success('Service updated — pending re-approval'); setEditing(null); reload(); }
              catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
            }} />
          </>
        )}
      </Modal>
      <ConfirmModal open={!!deleting} title="Delete this service?" message={`“${deleting?.title}” will be permanently removed.`} confirmLabel="Delete" busy={busy} onConfirm={remove} onClose={() => setDeleting(null)} />
    </>
  );
}

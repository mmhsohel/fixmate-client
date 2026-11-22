'use client';
import { toast } from 'sonner';
import { useFetch } from '@/hooks/useFetch';
import { useUser } from '@/hooks/useUser';
import { api } from '@/lib/api';
import Avatar from '@/components/Avatar';
import { RoleBadge } from '@/components/Badges';
import { ErrorBox, PageHeader, TableSkeleton, TableWrap } from '@/components/ui';
import { fmtDate } from '@/lib/utils';

export default function Users() {
  const { user: me } = useUser();
  const { data, loading, error, reload } = useFetch<{ items: any[] }>('/api/admin/users');
  const change = async (id: string, role: string) => {
    try { await api(`/api/admin/users/${id}/role`, { method: 'PATCH', body: { role } }); toast.success('Role updated'); reload(); }
    catch (e: any) { toast.error(e.message); }
  };
  return (
    <>
      <PageHeader title="Manage Users" subtitle="View all accounts and change roles." />
      {loading ? <TableSkeleton /> : error ? <ErrorBox message={error} onRetry={reload} /> : (
        <TableWrap>
          <thead><tr>{['User', 'Email', 'Role', 'Joined', 'Change role'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {data?.items.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/60">
                <td className="td"><div className="flex items-center gap-3"><Avatar name={u.name} image={u.image} /><span className="font-semibold text-ink-900">{u.name}</span></div></td>
                <td className="td">{u.email}</td><td className="td"><RoleBadge role={u.role || 'customer'} /></td><td className="td whitespace-nowrap">{fmtDate(u.createdAt)}</td>
                <td className="td">
                  <select className="input w-auto py-1.5" aria-label={`Role for ${u.name}`} value={u.role || 'customer'} disabled={u.email === me?.email} title={u.email === me?.email ? 'You cannot change your own role' : ''} onChange={(e) => change(u._id, e.target.value)}>
                    <option value="customer">Customer</option><option value="technician">Technician</option><option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}

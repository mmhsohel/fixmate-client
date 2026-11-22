import { APPROVAL_STATUS, BOOKING_STATUS, ROLE_STYLE } from '@/lib/constants';

export const StatusBadge = ({ status }: { status: string }) => {
  const s = BOOKING_STATUS[status] || { label: status, cls: 'bg-slate-100 text-slate-600 ring-slate-500/20' };
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
};
export const ApprovalBadge = ({ status }: { status: string }) => {
  const s = APPROVAL_STATUS[status] || APPROVAL_STATUS.pending;
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
};
export const PaymentBadge = ({ status }: { status: string }) => (
  <span className={`badge ${status === 'paid' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-orange-50 text-orange-700 ring-orange-600/20'}`}>
    {status === 'paid' ? 'Paid' : 'Unpaid'}
  </span>
);
export const RoleBadge = ({ role }: { role: string }) => (
  <span className={`badge capitalize ${ROLE_STYLE[role] || ROLE_STYLE.customer}`}>{role}</span>
);

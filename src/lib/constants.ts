export const CATEGORIES = ['Smartphone', 'Laptop & PC', 'AC', 'Refrigerator', 'TV', 'Washing Machine', 'Electrical'] as const;
export const SERVICE_MODES = ['Home Visit', 'Shop Drop-off'] as const;

export const CATEGORY_EMOJI: Record<string, string> = {
  Smartphone: '📱', 'Laptop & PC': '💻', AC: '❄️', Refrigerator: '🧊', TV: '📺', 'Washing Machine': '🧺', Electrical: '⚡',
};

export const BOOKING_STATUS: Record<string, { label: string; cls: string }> = {
  requested: { label: 'Requested', cls: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
  accepted: { label: 'Accepted', cls: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20' },
  'in-progress': { label: 'In Progress', cls: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  completed: { label: 'Completed', cls: 'bg-green-50 text-green-700 ring-green-600/20' },
  rejected: { label: 'Rejected', cls: 'bg-red-50 text-red-700 ring-red-600/20' },
  cancelled: { label: 'Cancelled', cls: 'bg-slate-100 text-slate-600 ring-slate-500/20' },
};
export const APPROVAL_STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: 'Pending', cls: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  approved: { label: 'Approved', cls: 'bg-green-50 text-green-700 ring-green-600/20' },
  rejected: { label: 'Rejected', cls: 'bg-red-50 text-red-700 ring-red-600/20' },
};
export const ROLE_STYLE: Record<string, string> = {
  customer: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  technician: 'bg-brand-50 text-brand-800 ring-brand-600/20',
  admin: 'bg-purple-50 text-purple-700 ring-purple-600/20',
};
export const CHART_COLORS = ['#0f766e', '#f97316', '#3b82f6', '#8b5cf6', '#eab308', '#ef4444', '#64748b'];

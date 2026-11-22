export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');
export const money = (n: number | undefined | null) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n || 0));
export const fmtDate = (d?: string | Date) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
export const initials = (name?: string) =>
  (name || '?').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
export const todayISO = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
export const safeRedirect = (p?: string | null) => (p && p.startsWith('/') && !p.startsWith('//') ? p : null);
export const dashboardPath = (role?: string) =>
  role === 'admin' ? '/dashboard/admin' : role === 'technician' ? '/dashboard/technician' : '/dashboard/customer';

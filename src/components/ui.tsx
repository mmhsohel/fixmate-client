import Link from 'next/link';
import { ReactNode } from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

export function EmptyState({ title, text, href, cta, icon: Icon = Inbox }: { title: string; text?: string; href?: string; cta?: string; icon?: LucideIcon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Icon className="h-7 w-7" /></span>
      <h3 className="mt-4 text-lg font-bold text-ink-900">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>}
      {href && cta && <Link href={href} className="btn-primary mt-5">{cta}</Link>}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatsCard({ label, value, icon: Icon, tone = 'brand' }: { label: string; value: string | number; icon: LucideIcon; tone?: 'brand' | 'orange' | 'blue' | 'green' | 'purple' }) {
  const tones = { brand: 'bg-brand-50 text-brand-700', orange: 'bg-orange-50 text-orange-600', blue: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600', purple: 'bg-purple-50 text-purple-600' };
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tones[tone]}`}><Icon className="h-6 w-6" /></span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="truncate text-2xl font-extrabold text-ink-900">{value}</p>
      </div>
    </div>
  );
}

export const Skeleton = ({ className = '' }: { className?: string }) => <div className={`skeleton ${className}`} />;

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card space-y-3 p-5">
      {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card overflow-hidden"><Skeleton className="h-44 rounded-none" /><div className="space-y-3 p-5"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-9 w-full" /></div></div>
      ))}
    </div>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
      <p className="font-semibold">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-outline btn-sm mt-3">Try again</button>}
    </div>
  );
}

export const TableWrap = ({ children }: { children: ReactNode }) => (
  <div className="card overflow-hidden"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-100">{children}</table></div></div>
);

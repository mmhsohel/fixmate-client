'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BarChart3, CalendarCheck, ClipboardList, CreditCard, Home, LayoutDashboard, LogOut, Menu, PanelLeftClose, PanelLeftOpen, PlusCircle, Receipt, ShieldCheck, UserCog, Users, Wrench, X } from 'lucide-react';
import Logo from './Logo';
import Avatar from './Avatar';
import { RoleBadge } from './Badges';
import { Skeleton } from './ui';
import { useUser } from '@/hooks/useUser';
import { authClient } from '@/lib/auth-client';
import { clearTokenCache } from '@/lib/api';
import { dashboardPath } from '@/lib/utils';

const NAV: Record<string, { href: string; label: string; icon: any }[]> = {
  customer: [
    { href: '/dashboard/customer', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/customer/bookings', label: 'My Bookings', icon: CalendarCheck },
    { href: '/dashboard/customer/payments', label: 'Payment History', icon: CreditCard },
  ],
  technician: [
    { href: '/dashboard/technician', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/technician/add-service', label: 'Add Service', icon: PlusCircle },
    { href: '/dashboard/technician/my-services', label: 'My Services', icon: Wrench },
    { href: '/dashboard/technician/requests', label: 'Manage Requests', icon: ClipboardList },
  ],
  admin: [
    { href: '/dashboard/admin', label: 'Overview', icon: BarChart3 },
    { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
    { href: '/dashboard/admin/services', label: 'Service Approval', icon: ShieldCheck },
    { href: '/dashboard/admin/bookings', label: 'All Bookings', icon: CalendarCheck },
    { href: '/dashboard/admin/transactions', label: 'Transactions', icon: Receipt },
  ],
};

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => setDrawer(false), [pathname]);

  const roleSegment = pathname.split('/')[2]; // customer | technician | admin | profile | undefined
  const isRoleRoute = ['customer', 'technician', 'admin'].includes(roleSegment);
  const forbidden = !!user && isRoleRoute && roleSegment !== user.role;

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
    else if (!roleSegment || forbidden) {
      if (forbidden) toast.error('You do not have access to that page');
      router.replace(dashboardPath(user.role));
    }
  }, [loading, user, forbidden, roleSegment, pathname, router]);

  const signOut = async () => {
    await (authClient as any).signOut();
    clearTokenCache();
    toast.success('Signed out successfully');
    router.push('/');
    router.refresh();
  };

  if (loading || !user || forbidden || !roleSegment) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden w-64 border-r border-slate-200 bg-white p-5 lg:block"><Skeleton className="h-9 w-32" /><div className="mt-8 space-y-3">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-10" />)}</div></div>
        <div className="flex-1 p-6"><Skeleton className="h-14 w-full" /><div className="mt-6 grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-24" />)}</div></div>
      </div>
    );
  }

  const items = NAV[user.role];
  const isActive = (href: string) => (href === dashboardPath(user.role) ? pathname === href : pathname.startsWith(href));

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col">
      <div className={`flex h-16 items-center border-b border-slate-100 px-5 ${collapsed && !mobile ? 'justify-center px-0' : 'justify-between'}`}>
        {collapsed && !mobile ? <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-700 text-white"><Wrench className="h-5 w-5" /></span> : <Logo />}
        {mobile && <button onClick={() => setDrawer(false)} aria-label="Close menu" className="rounded-lg p-1.5 hover:bg-slate-100"><X className="h-5 w-5" /></button>}
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Dashboard">
        {[...items, { href: '/dashboard/profile', label: 'Update Profile', icon: UserCog }].map((it) => (
          <Link key={it.href} href={it.href} title={it.label} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${isActive(it.href) ? 'bg-brand-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'} ${collapsed && !mobile ? 'justify-center' : ''}`}>
            <it.icon className="h-5 w-5 shrink-0" />{(!collapsed || mobile) && it.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-3">
        <button onClick={signOut} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 ${collapsed && !mobile ? 'justify-center' : ''}`}><LogOut className="h-5 w-5" />{(!collapsed || mobile) && 'Sign Out'}</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className={`fixed inset-y-0 left-0 z-40 hidden border-r border-slate-200 bg-white transition-all lg:block ${collapsed ? 'w-[76px]' : 'w-64'}`}><Sidebar /></aside>
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-ink-900/50" onClick={() => setDrawer(false)} /><aside className="relative h-full w-72 animate-pop bg-white shadow-2xl"><Sidebar mobile /></aside></div>
      )}
      <div className={`transition-all ${collapsed ? 'lg:pl-[76px]' : 'lg:pl-64'}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setDrawer(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <button className="hidden rounded-lg p-2 hover:bg-slate-100 lg:block" onClick={() => setCollapsed((v) => !v)} aria-label="Toggle sidebar">{collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}</button>
            <Link href="/" className="btn-ghost btn-sm"><Home className="h-4 w-4" /> <span className="hidden sm:inline">Back to Home</span></Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block"><p className="text-sm font-bold leading-tight text-ink-900">{user.name}</p><RoleBadge role={user.role} /></div>
            <Avatar name={user.name} image={user.image} size={40} />
          </div>
        </header>
        <main className="w-full p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

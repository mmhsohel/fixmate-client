'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ChevronDown, LayoutDashboard, LogOut, Menu, UserCog, X } from 'lucide-react';
import Logo from './Logo';
import Avatar from './Avatar';
import { RoleBadge } from './Badges';
import { useUser } from '@/hooks/useUser';
import { authClient } from '@/lib/auth-client';
import { clearTokenCache } from '@/lib/api';
import { dashboardPath } from '@/lib/utils';

const LINKS = [{ href: '/', label: 'Home' }, { href: '/services', label: 'Services' }, { href: '/about', label: 'How It Works' }];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); setMenu(false); }, [pathname]);
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const active = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const signOut = async () => {
    await (authClient as any).signOut();
    clearTokenCache();
    toast.success('Signed out successfully');
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${active(l.href) ? 'bg-brand-50 text-brand-800' : 'text-slate-600 hover:bg-slate-100'}`}>{l.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {loading ? <div className="skeleton h-9 w-9 rounded-full" /> : user ? (
            <div className="relative" ref={ref}>
              <button onClick={() => setMenu((v) => !v)} className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-slate-100" aria-haspopup="menu" aria-expanded={menu}>
                <Avatar name={user.name} image={user.image} /><ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-64 animate-pop rounded-xl border border-slate-200 bg-white p-2 shadow-xl" role="menu">
                  <div className="border-b border-slate-100 px-3 pb-3 pt-2">
                    <p className="truncate font-bold text-ink-900">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                    <div className="mt-2"><RoleBadge role={user.role} /></div>
                  </div>
                  <Link href={dashboardPath(user.role)} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
                  <Link href="/dashboard/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50"><UserCog className="h-4 w-4" /> Update Profile</Link>
                  <button onClick={signOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" /> Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="btn-outline">Sign In</Link>
              <Link href="/sign-up" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        <button className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="animate-pop border-t border-slate-100 bg-white px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${active(l.href) ? 'bg-brand-50 text-brand-800' : 'text-slate-700'}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-slate-100 pt-4">
            {user ? (
              <div className="space-y-1">
                <div className="mb-2 flex items-center gap-3 px-2"><Avatar name={user.name} image={user.image} size={40} /><div className="min-w-0"><p className="truncate font-bold text-ink-900">{user.name}</p><RoleBadge role={user.role} /></div></div>
                <Link href={dashboardPath(user.role)} className="block rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-slate-50">Dashboard</Link>
                <Link href="/dashboard/profile" className="block rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-slate-50">Update Profile</Link>
                <button onClick={signOut} className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50">Sign Out</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3"><Link href="/sign-in" className="btn-outline">Sign In</Link><Link href="/sign-up" className="btn-primary">Sign Up</Link></div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

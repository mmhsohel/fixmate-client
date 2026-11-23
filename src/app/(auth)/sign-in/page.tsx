'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { clearTokenCache } from '@/lib/api';
import { useUser } from '@/hooks/useUser';
import { dashboardPath, safeRedirect } from '@/lib/utils';
import SocialLogin from '@/components/SocialLogin';

const target = (role?: string) =>
  safeRedirect(new URLSearchParams(window.location.search).get('redirect')) || dashboardPath(role);

export default function SignIn() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { if (!loading && user) router.replace(target(user.role)); }, [loading, user, router]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email')).trim();
    const password = String(f.get('password'));
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email address';
    if (!password) errs.password = 'Password is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const { error } = await authClient.signIn.email({ email, password });
    if (error) { setBusy(false); toast.error(error.message || 'Invalid email or password'); return; }
    clearTokenCache();
    const s = await (authClient as any).getSession();
    toast.success('Welcome back!');
    router.replace(target((s.data?.user as any)?.role));
    router.refresh();
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold">Welcome back</h1>
      <p className="mt-2 text-slate-500">Sign in to manage your repairs and bookings.</p>
      <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
        <div><label htmlFor="email" className="label">Email</label><input id="email" name="email" type="email" autoComplete="email" className="input" placeholder="you@example.com" />{errors.email && <p className="field-error">{errors.email}</p>}</div>
        <div>
          <label htmlFor="password" className="label">Password</label>
          <div className="relative"><input id="password" name="password" type={show ? 'text' : 'password'} autoComplete="current-password" className="input pr-11" placeholder="Your password" />
            <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700" aria-label="Toggle password visibility">{show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
          {errors.password && <p className="field-error">{errors.password}</p>}
        </div>
        <button className="btn-primary w-full py-3" disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign In</button>
      </form>
      <SocialLogin />
      <p className="mt-6 text-center text-sm text-slate-500">New to FixMate? <Link href="/sign-up" className="font-semibold text-brand-700 hover:underline">Create an account</Link></p>
      <div className="mt-6 rounded-xl bg-slate-100 p-4 text-xs text-slate-500">
        <p className="mb-1 font-semibold text-slate-700">Demo accounts</p>
        <p>Admin: admin@gmail.com / Ab1234</p><p>Technician: technician@gmail.com / Ab1234</p><p>Customer: customer@gmail.com / Ab1234</p>
      </div>
    </>
  );
}

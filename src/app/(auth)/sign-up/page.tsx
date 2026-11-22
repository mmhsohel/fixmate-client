'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, User, Wrench } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { clearTokenCache } from '@/lib/api';
import { useUser } from '@/hooks/useUser';
import { dashboardPath } from '@/lib/utils';
import SocialLogin from '@/components/SocialLogin';

function passwordError(p: string) {
  if (!p) return 'Password is required';
  if (p.length < 6) return 'Password must be at least 6 characters';
  if (!/[A-Z]/.test(p)) return 'Password must contain an uppercase letter';
  if (!/[a-z]/.test(p)) return 'Password must contain a lowercase letter';
  return '';
}

export default function SignUp() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [role, setRole] = useState<'customer' | 'technician'>('customer');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { if (!loading && user) router.replace(dashboardPath(user.role)); }, [loading, user, router]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name')).trim();
    const email = String(f.get('email')).trim();
    const password = String(f.get('password'));
    const errs: Record<string, string> = {};
    if (!name) errs.name = 'Full name is required';
    if (!email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email address';
    const pe = passwordError(password);
    if (pe) errs.password = pe;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const { error } = await authClient.signUp.email({ name, email, password, role } as any);
    if (error) { setBusy(false); toast.error(error.message || 'Could not create your account'); return; }
    clearTokenCache();
    toast.success('Account created successfully!');
    router.replace(dashboardPath(role));
    router.refresh();
  };

  const roles = [
    { v: 'customer' as const, icon: User, t: 'Customer', d: 'I need something repaired' },
    { v: 'technician' as const, icon: Wrench, t: 'Technician', d: 'I offer repair services' },
  ];

  return (
    <>
      <h1 className="text-3xl font-extrabold">Create your account</h1>
      <p className="mt-2 text-slate-500">Join FixMate in less than a minute.</p>
      <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
        <fieldset>
          <legend className="label">I am a</legend>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => (
              <label key={r.v} className={`cursor-pointer rounded-xl border-2 p-4 transition ${role === r.v ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="role" value={r.v} checked={role === r.v} onChange={() => setRole(r.v)} className="sr-only" />
                <r.icon className={`h-6 w-6 ${role === r.v ? 'text-brand-700' : 'text-slate-400'}`} />
                <p className="mt-2 font-bold text-ink-900">{r.t}</p><p className="text-xs text-slate-500">{r.d}</p>
              </label>
            ))}
          </div>
        </fieldset>
        <div><label htmlFor="name" className="label">Full name</label><input id="name" name="name" autoComplete="name" className="input" placeholder="Your full name" />{errors.name && <p className="field-error">{errors.name}</p>}</div>
        <div><label htmlFor="email" className="label">Email</label><input id="email" name="email" type="email" autoComplete="email" className="input" placeholder="you@example.com" />{errors.email && <p className="field-error">{errors.email}</p>}</div>
        <div>
          <label htmlFor="password" className="label">Password</label>
          <div className="relative"><input id="password" name="password" type={show ? 'text' : 'password'} autoComplete="new-password" className="input pr-11" placeholder="Min 6 chars, upper & lower case" />
            <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700" aria-label="Toggle password visibility">{show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
          {errors.password && <p className="field-error">{errors.password}</p>}
        </div>
        <button className="btn-primary w-full py-3" disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Create Account</button>
      </form>
      <SocialLogin />
      <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link href="/sign-in" className="font-semibold text-brand-700 hover:underline">Sign in</Link></p>
    </>
  );
}

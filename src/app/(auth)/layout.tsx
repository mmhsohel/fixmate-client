import Link from 'next/link';
import Logo from '@/components/Logo';
import { CheckCircle2 } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-ink-900 via-ink-800 to-brand-900 p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <Logo light />
        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight text-white">Repairs you can <span className="text-accent-400">trust</span>,<br />payments you control.</h2>
          <ul className="mt-8 space-y-4 text-slate-300">
            {['Admin-approved technicians & services', 'Track every repair step by step', 'Pay only after the job is completed'].map((t) => (
              <li key={t} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-brand-300" />{t}</li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-slate-400">© {new Date().getFullYear()} FixMate</p>
      </aside>
      <main className="flex flex-col justify-center px-4 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>
          {children}
          <p className="mt-8 text-center text-sm"><Link href="/" className="text-slate-500 hover:text-brand-700">← Back to home</Link></p>
        </div>
      </main>
    </div>
  );
}

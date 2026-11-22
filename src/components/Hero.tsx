import Link from 'next/link';
import { BadgeCheck, Search, ShieldCheck, Wallet } from 'lucide-react';

function Illustration() {
  return (
    <svg viewBox="0 0 480 440" className="mx-auto w-full max-w-md drop-shadow-2xl" role="img" aria-label="Phone being repaired with a wrench">
      <circle cx="240" cy="220" r="190" fill="#14b8a6" opacity=".14" />
      <circle cx="240" cy="220" r="140" fill="#14b8a6" opacity=".14" />
      <g transform="rotate(-8 240 220)">
        <rect x="150" y="60" width="180" height="330" rx="30" fill="#0b1b2b" stroke="#5eead4" strokeWidth="4" />
        <rect x="162" y="78" width="156" height="294" rx="20" fill="#0f766e" />
        <path d="M162 150 L230 210 L205 250 L290 372" stroke="#ccfbf1" strokeWidth="3" fill="none" opacity=".7" />
        <rect x="190" y="98" width="100" height="14" rx="7" fill="#0b1b2b" opacity=".6" />
        <rect x="185" y="300" width="110" height="12" rx="6" fill="#ccfbf1" opacity=".6" />
        <rect x="205" y="324" width="70" height="12" rx="6" fill="#ccfbf1" opacity=".35" />
        <circle cx="240" cy="190" r="34" fill="#fff" opacity=".95" />
        <path d="M226 192l9 9 19-20" stroke="#0f766e" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(300 250) rotate(40)">
        <rect x="-10" y="-20" width="20" height="170" rx="10" fill="#f97316" />
        <path d="M-34 -70a38 38 0 1 1 68 0l-12 18a12 12 0 0 1-44 0z" fill="#fb923c" />
        <circle cx="0" cy="-86" r="10" fill="#0b1b2b" opacity=".25" />
      </g>
      <g fill="#5eead4"><circle cx="92" cy="110" r="9" /><circle cx="400" cy="90" r="6" /><circle cx="410" cy="330" r="11" opacity=".6" /></g>
      <g transform="translate(70 290)"><circle r="30" fill="#0b1b2b" stroke="#5eead4" strokeWidth="3" /><circle r="11" fill="#5eead4" /><g stroke="#5eead4" strokeWidth="6" strokeLinecap="round"><path d="M0-40v10M0 30v10M-40 0h10M30 0h10M-28-28l7 7M21 21l7 7M28-28l-7 7M-21 21l-7 7" /></g></g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-800 to-brand-900 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-200 ring-1 ring-white/20">
            <BadgeCheck className="h-4 w-4" /> Verified technicians · Pay after service
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Broken Device? Get It Fixed by <span className="text-accent-400">Verified Technicians</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Book trusted repair experts for phones, laptops and home appliances. Track every step of your job and pay only when the work is done.
          </p>
          <form action="/services" className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search repair services</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input name="search" placeholder="Try “iPhone screen” or “AC servicing”" className="h-12 w-full rounded-xl bg-transparent pl-12 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none" />
            </label>
            <button className="btn-accent h-12 px-6 text-base">Find a Technician</button>
          </form>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
            <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand-300" /> Admin-approved services</span>
            <span className="flex items-center gap-2"><Wallet className="h-5 w-5 text-brand-300" /> Secure Stripe payments</span>
          </div>
          <Link href="/sign-up" className="mt-6 inline-block text-sm font-semibold text-brand-300 underline-offset-4 hover:underline">Are you a technician? Join FixMate →</Link>
        </div>
        <Illustration />
      </div>
    </section>
  );
}

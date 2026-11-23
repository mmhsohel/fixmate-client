import Link from 'next/link';
import Image from 'next/image';
import { BadgeCheck, Search, ShieldCheck, Wallet } from 'lucide-react';

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
              <input
                name="search"
                placeholder="Try “iPhone screen” or “AC servicing”"
                className="h-12 w-full rounded-xl bg-transparent pl-12 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </label>
            <button className="btn-accent h-12 px-6 text-base">Find a Technician</button>
          </form>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-300" /> Admin-approved services
            </span>
            <span className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-brand-300" /> Secure Stripe payments
            </span>
          </div>
          <Link href="/sign-up" className="mt-6 inline-block text-sm font-semibold text-brand-300 underline-offset-4 hover:underline">
            Are you a technician? Join FixMate →
          </Link>
        </div>

        <div className="mx-auto w-full max-w-lg">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-ink-800/70 p-2 shadow-2xl ring-1 ring-brand-400/20">
            <Image
              src="/images/hero.png"
              alt="Technician repairing electronic devices with precision tools"
              width={640}
              height={480}
              priority
              className="h-80 w-full rounded-2xl object-cover sm:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
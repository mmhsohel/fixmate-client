import Link from 'next/link';
import { ArrowRight, BadgeCheck, CreditCard, Search, Send, ShieldCheck, Star, Users, Wrench, CheckCircle2 } from 'lucide-react';
import Hero from '@/components/Hero';
import ServiceCard, { Service } from '@/components/ServiceCard';
import { EmptyState } from '@/components/ui';
import { serverApi } from '@/lib/api';
import { CATEGORIES, CATEGORY_EMOJI } from '@/lib/constants';

export const dynamic = 'force-dynamic';

const STEPS = [
  { icon: Search, title: 'Find a Service', text: 'Browse approved repair services and compare prices, areas and technicians.' },
  { icon: Send, title: 'Send a Request', text: 'Describe the problem, pick a date and send your repair request in a minute.' },
  { icon: Wrench, title: 'Technician Fixes It', text: 'Follow every status update live: accepted, in progress, completed.' },
  { icon: CreditCard, title: 'Pay After Completion', text: 'Pay securely with Stripe only after the job is finished and delivered.' },
];

const TESTIMONIALS = [
  { name: 'Sadia Islam', text: 'My laptop was fixed in one day and I paid only after I checked it. Tracking the job made me feel in control.', role: 'Customer, Dhanmondi' },
  { name: 'Mahmud Karim', text: 'The AC technician arrived on time and the final price matched the quote. Highly recommended!', role: 'Customer, Uttara' },
  { name: 'Rafiq Ahmed', text: 'FixMate gives my repair shop a proper place to list services and manage incoming jobs.', role: 'Technician, Mirpur' },
];

export default async function HomePage() {
  const [latest, stats] = await Promise.all([
    serverApi<{ items: Service[] }>('/api/services/latest'),
    serverApi<{ technicians: number; jobs: number; services: number; customers: number }>('/api/stats/public'),
  ]);
  const items = latest?.items ?? [];
  const numbers = [
    { v: `${stats?.technicians ?? 0}+`, l: 'Verified technicians', icon: BadgeCheck },
    { v: `${stats?.jobs ?? 0}+`, l: 'Jobs completed', icon: CheckCircle2 },
    { v: `${stats?.services ?? 0}+`, l: 'Live services', icon: Wrench },
    { v: '100%', l: 'Pay after service', icon: ShieldCheck },
  ];

  return (
    <>
      <Hero />

      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h2 className="section-title">Featured Repair Services</h2><p className="section-sub">The latest services from our verified technicians.</p></div>
            <Link href="/services" className="btn-outline">View all services <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10">
            {items.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((s) => <ServiceCard key={s._id} s={s} />)}</div>
            ) : (
              <EmptyState title="No services yet" text="Approved services will appear here as soon as technicians publish them." href="/services" cta="Browse services" />
            )}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="text-center"><h2 className="section-title">How FixMate Works</h2><p className="section-sub mx-auto">Four simple steps from a broken device to a working one.</p></div>
          <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <span className="absolute -top-3 left-1/2 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full bg-accent-500 text-xs font-bold text-white">{i + 1}</span>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-700 text-white"><s.icon className="h-7 w-7" /></span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="text-center"><h2 className="section-title">Popular Repair Categories</h2><p className="section-sub mx-auto">Choose a category to see matching services.</p></div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {CATEGORIES.map((c) => (
              <Link key={c} href={`/services?category=${encodeURIComponent(c)}`} className="card group flex flex-col items-center gap-3 p-5 text-center transition hover:-translate-y-1 hover:border-brand-500">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl transition group-hover:bg-brand-100">{CATEGORY_EMOJI[c]}</span>
                <span className="text-sm font-bold text-ink-900">{c}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink-900 text-white">
        <div className="container-x">
          <div className="text-center"><h2 className="section-title !text-white">Why Choose FixMate</h2><p className="section-sub mx-auto !text-slate-400">Trust, transparency and fair payment on every job.</p></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map((n) => (
              <div key={n.l} className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10">
                <n.icon className="mx-auto h-8 w-8 text-accent-400" />
                <p className="mt-3 text-4xl font-extrabold text-white">{n.v}</p>
                <p className="mt-1 text-sm text-slate-400">{n.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-white p-6 text-slate-700">
                <div className="flex gap-0.5 text-accent-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-3 text-sm leading-relaxed">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm"><span className="font-bold text-ink-900">{t.name}</span><br /><span className="text-slate-500">{t.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-brand-700 to-brand-900 p-10 text-center text-white sm:flex-row sm:text-left">
            <div><h2 className="text-2xl font-extrabold text-white sm:text-3xl">Are you a skilled technician?</h2><p className="mt-2 text-brand-100">List your services, get repair requests and grow your business with FixMate.</p></div>
            <Link href="/sign-up" className="btn-accent shrink-0 px-6 py-3 text-base"><Users className="h-5 w-5" /> Join as Technician</Link>
          </div>
        </div>
      </section>
    </>
  );
}

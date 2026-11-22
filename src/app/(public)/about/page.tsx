import Link from 'next/link';
import type { Metadata } from 'next';
import { CreditCard, Eye, Search, Send, ShieldCheck, Wrench } from 'lucide-react';

export const metadata: Metadata = { title: 'How It Works' };

const STEPS = [
  { icon: Search, t: 'Find a service', d: 'Search approved services by category, price or area. Every listing is moderated by our admin team.' },
  { icon: Send, t: 'Send a repair request', d: 'Share your phone, address, preferred date and a description of the problem.' },
  { icon: Wrench, t: 'Technician works on it', d: 'The technician accepts, starts work and marks it completed with the final amount.' },
  { icon: CreditCard, t: 'Pay after completion', d: 'A Pay Now button appears only when the job is completed. Secure Stripe checkout.' },
];
const FAQ = [
  ['Do I pay upfront?', 'No. You only pay after the technician marks your job as completed.'],
  ['Can I cancel a request?', 'Yes, as long as the job is still in the “Requested” stage.'],
  ['How are technicians verified?', 'Every service a technician lists is reviewed and approved by a FixMate admin before it goes live.'],
  ['Which payment methods work?', 'Cards via Stripe. In test mode use 4242 4242 4242 4242 with any future date and CVC.'],
];

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-r from-ink-900 to-brand-900 py-16 text-white">
        <div className="container-x"><h1 className="text-4xl font-extrabold text-white">How FixMate Works</h1><p className="mt-3 max-w-2xl text-lg text-slate-300">Finding a trustworthy repair technician should not be a gamble. FixMate makes every job trackable and every payment fair.</p></div>
      </section>
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {STEPS.map((s, i) => (
            <div key={s.t} className="card flex gap-5 p-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-700 text-white"><s.icon className="h-7 w-7" /></span>
              <div><p className="text-xs font-bold uppercase tracking-wider text-accent-600">Step {i + 1}</p><h3 className="text-xl font-bold">{s.t}</h3><p className="mt-1 text-slate-500">{s.d}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Built on transparency</h2>
            <p className="section-sub">Why FixMate exists: people hand over devices with no idea what happens next and often pay before any work is done. Technicians, meanwhile, lack a structured place to show services and manage jobs.</p>
            <ul className="mt-6 space-y-4">
              {[[Eye, 'Every job has a clear, trackable status'], [ShieldCheck, 'Admin-approved services only'], [CreditCard, 'Payment happens after delivery']].map(([I, t]: any) => (
                <li key={t} className="flex items-center gap-3 font-medium text-ink-900"><span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700"><I className="h-5 w-5" /></span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold">Frequently asked questions</h3>
            {FAQ.map(([q, a]) => (
              <details key={q} className="card group p-4"><summary className="cursor-pointer list-none font-semibold text-ink-900 marker:hidden">{q}</summary><p className="mt-2 text-sm text-slate-500">{a}</p></details>
            ))}
          </div>
        </div>
      </section>
      <section className="section"><div className="container-x text-center"><h2 className="section-title">Ready to get it fixed?</h2><Link href="/services" className="btn-primary mt-6 px-8 py-3 text-base">Browse Services</Link></div></section>
    </>
  );
}

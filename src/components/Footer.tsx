import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from './Icons';
import { CATEGORIES } from '@/lib/constants';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-ink-700 text-slate-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/images/logo.png" alt="Illustration" width={160} height={160} className="mt-5" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">Verified technicians, transparent job tracking and pay-after-service. Repairs made simple.</p>
          <div className="mt-5 flex gap-3">
            {[{ I: XIcon, l: 'X' }, { I: FacebookIcon, l: 'Facebook' }, { I: InstagramIcon, l: 'Instagram' }, { I: LinkedinIcon, l: 'LinkedIn' }].map(({ I, l }) => (
              <a key={l} href="#" aria-label={l} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-accent-500"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {[['/', 'Home'], ['/services', 'Services'], ['/about', 'How It Works'], ['/sign-up', 'Become a Technician']].map(([h, l]) => (
              <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Popular Categories</h4>
          <ul className="space-y-2.5 text-sm">
            {CATEGORIES.slice(0, 6).map((c) => <li key={c}><Link href={`/services?category=${encodeURIComponent(c)}`} className="hover:text-white">{c} Repair</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-accent-400" /> support@fixmate.com</li>
            <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-accent-400" /> +880 1700 000 000</li>
            <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-accent-400" /> Level 5, Gulshan Avenue, Dhaka 1212</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">© {new Date().getFullYear()} FixMate. All rights reserved.</div>
    </footer>
  );
}

import Link from 'next/link';
import { Clock, MapPin, User } from 'lucide-react';
import { money } from '@/lib/utils';

export type Service = {
  _id: string; title: string; category: string; description: string; image: string; basePrice: number; estimatedDuration: string;
  serviceMode: string; serviceArea: string; technicianName: string; technicianEmail: string; approvalStatus: string; isAvailable: boolean; createdAt: string;
};

export default function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-800 shadow">{s.category}</span>
        <span className="absolute right-3 top-3 rounded-full bg-ink-900/85 px-3 py-1 text-xs font-semibold text-white">{s.serviceMode}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-ink-900">{s.title}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
          <li className="flex items-center gap-2"><User className="h-4 w-4 text-brand-600" /> <span className="truncate">{s.technicianName}</span></li>
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-600" /> <span className="truncate">{s.serviceArea}</span></li>
          <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand-600" /> {s.estimatedDuration}</li>
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div><p className="text-xs text-slate-400">Starting from</p><p className="text-xl font-extrabold text-brand-700">{money(s.basePrice)}</p></div>
          <Link href={`/services/${s._id}`} className="btn-primary">View Details</Link>
        </div>
      </div>
    </article>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Clock, MapPin, Tag, Wrench } from 'lucide-react';
import { serverApi } from '@/lib/api';
import type { Service } from '@/components/ServiceCard';
import RequestRepair from '@/components/RequestRepair';
import Avatar from '@/components/Avatar';
import { money } from '@/lib/utils';

export const dynamic = 'force-dynamic';
type Detail = Service & { technician: { name: string; image: string | null; area: string; bio: string } | null };

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const s = await serverApi<Detail>(`/api/services/${params.id}`);
  return { title: s?.title || 'Service not found' };
}

export default async function ServiceDetails({ params }: { params: { id: string } }) {
  const s = await serverApi<Detail>(`/api/services/${params.id}`);
  if (!s) notFound();
  const t = s.technician;
  const facts = [
    { icon: Tag, l: 'Category', v: s.category },
    { icon: Clock, l: 'Estimated duration', v: s.estimatedDuration },
    { icon: Wrench, l: 'Service mode', v: s.serviceMode },
    { icon: MapPin, l: 'Service area', v: s.serviceArea },
  ];
  return (
    <div className="container-x py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/services" className="hover:text-brand-700">Services</Link><ChevronRight className="h-4 w-4" /><span className="truncate text-slate-800">{s.title}</span>
      </nav>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="card overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={s.title} className="aspect-[16/9] w-full object-cover" />
            <div className="p-6 sm:p-8">
              <span className="badge bg-brand-50 text-brand-800 ring-brand-600/20">{s.category}</span>
              <h1 className="mt-3 text-3xl font-extrabold">{s.title}</h1>
              <h2 className="mt-8 text-lg font-bold">About this service</h2>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-600">{s.description}</p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.l} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-brand-700 shadow-sm"><f.icon className="h-5 w-5" /></span>
                    <div><dt className="text-xs text-slate-500">{f.l}</dt><dd className="font-semibold text-ink-900">{f.v}</dd></div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-lg font-bold">Your technician</h2>
            <div className="mt-4 flex items-start gap-4">
              <Avatar name={t?.name || s.technicianName} image={t?.image} size={64} />
              <div>
                <p className="text-lg font-bold text-ink-900">{t?.name || s.technicianName}</p>
                {t?.area && <p className="flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-4 w-4" /> {t.area}</p>}
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t?.bio || 'Verified FixMate technician.'}</p>
              </div>
            </div>
          </div>
        </div>
        <aside>
          <div className="card sticky top-24 p-6">
            <p className="text-sm text-slate-500">Starting price</p>
            <p className="text-4xl font-extrabold text-brand-700">{money(s.basePrice)}</p>
            <p className="mt-1 text-xs text-slate-400">Final amount is confirmed by the technician. You pay only after completion.</p>
            <div className="my-5 border-t border-slate-100" />
            <RequestRepair serviceId={s._id} serviceTitle={s.title} technicianEmail={s.technicianEmail} />
          </div>
        </aside>
      </div>
    </div>
  );
}

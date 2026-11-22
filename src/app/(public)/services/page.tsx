import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ServiceCard, { Service } from '@/components/ServiceCard';
import ServiceFilters from '@/components/ServiceFilters';
import { EmptyState } from '@/components/ui';
import { serverApi } from '@/lib/api';
import { SearchX } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Browse Repair Services' };

type SP = Record<string, string | undefined>;

export default async function ServicesPage({ searchParams }: { searchParams: SP }) {
  const qs = new URLSearchParams();
  ['search', 'category', 'mode', 'sort', 'minPrice', 'maxPrice', 'page'].forEach((k) => searchParams[k] && qs.set(k, searchParams[k] as string));
  qs.set('limit', '12');
  const data = await serverApi<{ items: Service[]; total: number; page: number; pages: number }>(`/api/services?${qs}`);
  const items = data?.items ?? [];
  const page = data?.page ?? 1;
  const pages = data?.pages ?? 1;

  const pageHref = (p: number) => {
    const q = new URLSearchParams(qs); q.delete('limit'); q.set('page', String(p));
    return `/services?${q}`;
  };

  return (
    <>
      <section className="bg-gradient-to-r from-ink-900 to-brand-900 py-14 text-white">
        <div className="container-x"><h1 className="text-3xl font-extrabold text-white sm:text-4xl">Browse Repair Services</h1><p className="mt-2 text-slate-300">Compare approved services from verified technicians near you.</p></div>
      </section>
      <div className="container-x py-10">
        <Suspense fallback={<div className="skeleton h-40" />}><ServiceFilters /></Suspense>
        <p className="mb-5 mt-8 text-sm text-slate-500">{data ? `${data.total} service${data.total === 1 ? '' : 's'} found` : ''}</p>
        {!data ? (
          <EmptyState title="Couldn’t load services" text="The service API is not reachable right now. Please try again shortly." href="/services" cta="Reload" />
        ) : items.length ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((s) => <ServiceCard key={s._id} s={s} />)}</div>
            {pages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
                {page > 1 && <Link href={pageHref(page - 1)} className="btn-outline">← Previous</Link>}
                <span className="text-sm text-slate-500">Page {page} of {pages}</span>
                {page < pages && <Link href={pageHref(page + 1)} className="btn-outline">Next →</Link>}
              </nav>
            )}
          </>
        ) : (
          <EmptyState icon={SearchX} title="No services match your search" text="Try different keywords or clear some filters." href="/services" cta="Reset filters" />
        )}
      </div>
    </>
  );
}

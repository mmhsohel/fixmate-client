'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, SERVICE_MODES } from '@/lib/constants';

export default function ServiceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [search, setSearch] = useState(sp.get('search') || '');

  const set = (patch: Record<string, string>) => {
    const p = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    p.delete('page');
    router.push(`${pathname}?${p.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const t = setTimeout(() => { if ((sp.get('search') || '') !== search) set({ search }); }, 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasFilters = ['search', 'category', 'mode', 'minPrice', 'maxPrice'].some((k) => sp.get(k)) || (sp.get('sort') && sp.get('sort') !== 'newest');

  return (
    <div className="card p-4 sm:p-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by service, technician or area…" className="input pl-11" aria-label="Search services" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <select className="input" aria-label="Category" value={sp.get('category') || ''} onChange={(e) => set({ category: e.target.value })}>
          <option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="input" aria-label="Service mode" value={sp.get('mode') || ''} onChange={(e) => set({ mode: e.target.value })}>
          <option value="">Any service mode</option>{SERVICE_MODES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="input" aria-label="Sort" value={sp.get('sort') || 'newest'} onChange={(e) => set({ sort: e.target.value })}>
          <option value="newest">Newest first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="title">Title A–Z</option>
        </select>
        <input type="number" min={0} className="input" placeholder="Min $" aria-label="Minimum price" defaultValue={sp.get('minPrice') || ''} onBlur={(e) => set({ minPrice: e.target.value })} />
        <input type="number" min={0} className="input" placeholder="Max $" aria-label="Maximum price" defaultValue={sp.get('maxPrice') || ''} onBlur={(e) => set({ maxPrice: e.target.value })} />
      </div>
      {hasFilters && (
        <button onClick={() => { setSearch(''); router.push(pathname); }} className="btn-ghost btn-sm mt-3"><X className="h-4 w-4" /> Clear all filters</button>
      )}
      <p className="sr-only"><SlidersHorizontal /> Filters</p>
    </div>
  );
}

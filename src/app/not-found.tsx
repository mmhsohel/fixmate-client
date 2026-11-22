import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-brand-50 to-white px-4 text-center">
      <div>
        <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full bg-brand-100">
          <Wrench className="h-16 w-16 -rotate-45 text-brand-700" />
          <span className="absolute -right-2 -top-2 grid h-12 w-12 place-items-center rounded-full bg-accent-500 text-lg font-extrabold text-white shadow-lg">404</span>
        </div>
        <h1 className="mt-8 text-3xl font-extrabold">This page needs repairing</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500">We looked everywhere but couldn&apos;t find the page you wanted. It may have been moved, removed or never existed.</p>
        <Link href="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
    </main>
  );
}

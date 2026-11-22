'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-50 text-red-600"><AlertTriangle className="h-8 w-8" /></span>
        <h1 className="mt-6 text-2xl font-extrabold">Something went wrong</h1>
        <p className="mx-auto mt-2 max-w-md text-slate-500">An unexpected error occurred. You can try again or head back to the home page.</p>
        <div className="mt-6 flex justify-center gap-3"><button onClick={reset} className="btn-primary">Try again</button><Link href="/" className="btn-outline">Home</Link></div>
      </div>
    </main>
  );
}

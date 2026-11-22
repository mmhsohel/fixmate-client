import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="FixMate home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-sm">
        <Wrench className="h-5 w-5" />
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
        Fix<span className="text-accent-500">Mate</span>
      </span>
    </Link>
  );
}

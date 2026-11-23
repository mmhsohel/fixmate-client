import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="FixMate home">
      <span
        className={`inline-flex items-center rounded-xl transition ${
          light
            ? 'bg-white px-2.5 py-1.5 shadow-sm'
            : 'dark:bg-white/95 dark:px-2.5 dark:py-1.5'
        }`}
      >
        <Image
          src="/images/logo.png"
          alt="FixMate"
          width={128}
          height={128}
          className="h-9 w-auto object-contain"
          priority
        />
      </span>
    </Link>
  );
}
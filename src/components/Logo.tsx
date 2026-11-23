import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="FixMate home">
    <Image src="/images/logo.png" alt="FixMate" width={128} height={128} />
  
    </Link>
  );
}

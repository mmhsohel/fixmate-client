import { initials } from '@/lib/utils';

export default function Avatar({ name, image, size = 36 }: { name?: string; image?: string | null; size?: number }) {
  return image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt={name || 'avatar'} width={size} height={size} className="rounded-full object-cover ring-2 ring-white" style={{ width: size, height: size }} />
  ) : (
    <span className="grid place-items-center rounded-full bg-brand-100 font-bold text-brand-800 ring-2 ring-white" style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {initials(name)}
    </span>
  );
}

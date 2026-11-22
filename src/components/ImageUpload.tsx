'use client';
import { useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { uploadImage } from '@/lib/api';

export default function ImageUpload({ value, onChange, label = 'Image', round = false }: { value: string; onChange: (url: string) => void; label?: string; round?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = async (file?: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error('Image must be smaller than 5MB');
    setBusy(true);
    try {
      onChange(await uploadImage(file));
      toast.success('Image uploaded');
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = '';
    }
  };

  return (
    <div>
      <span className="label">{label}</span>
      <div className="flex items-center gap-4">
        <div className={`grid h-24 w-24 shrink-0 place-items-center overflow-hidden border border-dashed border-slate-300 bg-slate-50 text-slate-400 ${round ? 'rounded-full' : 'rounded-xl'}`}>
          {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="h-full w-full object-cover" />
          ) : <ImagePlus className="h-7 w-7" />}
        </div>
        <div>
          <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
          <button type="button" className="btn-outline btn-sm" onClick={() => ref.current?.click()} disabled={busy}>{value ? 'Change image' : 'Choose image'}</button>
          <p className="mt-1.5 text-xs text-slate-400">PNG, JPG, WEBP up to 5MB. Uploaded via ImgBB.</p>
        </div>
      </div>
    </div>
  );
}

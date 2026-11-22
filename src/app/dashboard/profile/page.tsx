'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { api } from '@/lib/api';
import ImageUpload from '@/components/ImageUpload';
import { RoleBadge } from '@/components/Badges';
import { PageHeader } from '@/components/ui';

export default function Profile() {
  const { user, refetch } = useUser();
  const [f, setF] = useState({ name: '', phone: '', area: '', bio: '', image: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => { if (user) setF({ name: user.name || '', phone: user.phone || '', area: user.area || '', bio: user.bio || '', image: user.image || '' }); }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!user) return null;
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Name must be at least 2 characters');
    setErr(''); setBusy(true);
    try {
      await api('/api/me', { method: 'PATCH', body: { ...f, image: f.image || undefined } });
      await refetch();
      toast.success('Profile updated');
    } catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <>
      <PageHeader title="Update Profile" subtitle="Keep your details up to date." />
      <form onSubmit={save} className="card grid max-w-3xl gap-5 p-6 sm:grid-cols-2 sm:p-8" noValidate>
        <div className="sm:col-span-2"><ImageUpload label="Profile photo" round value={f.image} onChange={(u) => set('image', u)} /></div>
        <div><label className="label" htmlFor="name">Full name</label><input id="name" className="input" value={f.name} onChange={(e) => set('name', e.target.value)} />{err && <p className="field-error">{err}</p>}</div>
        <div><label className="label" htmlFor="phone">Phone</label><input id="phone" className="input" value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+8801XXXXXXXXX" /></div>
        <div><label className="label">Email</label><input className="input" value={user.email} disabled readOnly /></div>
        <div><label className="label">Role</label><div className="pt-2"><RoleBadge role={user.role} /></div></div>
        <div className="sm:col-span-2"><label className="label" htmlFor="area">Area</label><input id="area" className="input" value={f.area} onChange={(e) => set('area', e.target.value)} placeholder="Mirpur, Dhaka" /></div>
        <div className="sm:col-span-2"><label className="label" htmlFor="bio">Bio</label><textarea id="bio" rows={4} className="input" value={f.bio} onChange={(e) => set('bio', e.target.value)} placeholder={user.role === 'technician' ? 'Your skills and experience…' : 'A short bio'} /></div>
        <div className="flex justify-end sm:col-span-2"><button className="btn-primary" disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Save changes</button></div>
      </form>
    </>
  );
}

'use client';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, Info, Wrench } from 'lucide-react';
import Modal from './Modal';
import { useUser } from '@/hooks/useUser';
import { api } from '@/lib/api';
import { todayISO } from '@/lib/utils';

export default function RequestRepair({ serviceId, serviceTitle, technicianEmail }: { serviceId: string; serviceTitle: string; technicianEmail: string }) {
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (loading) return <div className="skeleton h-12 w-full" />;
  if (!user) return <Link href={`/sign-in?redirect=${encodeURIComponent(`/services/${serviceId}`)}`} className="btn-accent w-full py-3 text-base"><Wrench className="h-5 w-5" /> Request Repair</Link>;
  if (user.role !== 'customer' || user.email === technicianEmail) {
    return (
      <div>
        <button className="btn-accent w-full py-3 text-base" disabled><Wrench className="h-5 w-5" /> Request Repair</button>
        <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800"><Info className="h-4 w-4 shrink-0 translate-y-0.5" /> Only customers can request a repair.</p>
      </div>
    );
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = Object.fromEntries(f.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!/^[+\d][\d\s-]{6,18}$/.test(v.customerPhone.trim())) errs.customerPhone = 'Enter a valid phone number';
    if (v.address.trim().length < 5) errs.address = 'Enter your full address';
    if (!v.preferredDate || v.preferredDate < todayISO()) errs.preferredDate = 'Choose today or a future date';
    if (v.problemDescription.trim().length < 20) errs.problemDescription = `Describe the problem in at least 20 characters (${v.problemDescription.trim().length}/20)`;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      await api('/api/bookings', { method: 'POST', body: { serviceId, ...v } });
      toast.success('Repair request sent!');
      setDone(true);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button className="btn-accent w-full py-3 text-base" onClick={() => { setDone(false); setOpen(true); }}><Wrench className="h-5 w-5" /> Request Repair</button>
      <Modal open={open} onClose={() => setOpen(false)} title={done ? 'Request sent' : `Request: ${serviceTitle}`} wide={!done}>
        {done ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
            <p className="mt-4 font-semibold text-ink-900">The technician has been notified.</p>
            <p className="mt-1 text-sm text-slate-500">You can follow every step of the job from your dashboard.</p>
            <Link href="/dashboard/customer/bookings" className="btn-primary mt-6">Go to My Bookings</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
            <div><label className="label">Name</label><input className="input" value={user.name} readOnly disabled /></div>
            <div><label className="label">Email</label><input className="input" value={user.email} readOnly disabled /></div>
            <div><label className="label" htmlFor="customerPhone">Phone</label><input id="customerPhone" name="customerPhone" className="input" defaultValue={user.phone || ''} placeholder="+8801XXXXXXXXX" />{errors.customerPhone && <p className="field-error">{errors.customerPhone}</p>}</div>
            <div><label className="label" htmlFor="preferredDate">Preferred date</label><input id="preferredDate" name="preferredDate" type="date" min={todayISO()} defaultValue={todayISO()} className="input" />{errors.preferredDate && <p className="field-error">{errors.preferredDate}</p>}</div>
            <div className="sm:col-span-2"><label className="label" htmlFor="address">Address</label><input id="address" name="address" className="input" defaultValue={user.area || ''} placeholder="House, road, area, city" />{errors.address && <p className="field-error">{errors.address}</p>}</div>
            <div className="sm:col-span-2"><label className="label" htmlFor="problemDescription">Problem description</label><textarea id="problemDescription" name="problemDescription" rows={4} className="input" placeholder="What is wrong with the device? When did it start?" />{errors.problemDescription && <p className="field-error">{errors.problemDescription}</p>}</div>
            <div className="flex justify-end gap-3 sm:col-span-2"><button type="button" className="btn-outline" onClick={() => setOpen(false)}>Cancel</button><button className="btn-primary" disabled={busy}>{busy ? 'Sending…' : 'Send Request'}</button></div>
          </form>
        )}
      </Modal>
    </>
  );
}

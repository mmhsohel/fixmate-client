'use client';
import { useState } from 'react';
import { CATEGORIES, SERVICE_MODES } from '@/lib/constants';
import ImageUpload from './ImageUpload';

export type ServiceValues = { title: string; category: string; description: string; image: string; basePrice: string | number; estimatedDuration: string; serviceMode: string; serviceArea: string };
export const EMPTY_SERVICE: ServiceValues = { title: '', category: CATEGORIES[0], description: '', image: '', basePrice: '', estimatedDuration: '', serviceMode: SERVICE_MODES[0], serviceArea: '' };

export default function ServiceForm({ initial = EMPTY_SERVICE, technician, submitLabel, busy, onSubmit, onCancel }: {
  initial?: ServiceValues; technician: { name: string; email: string }; submitLabel: string; busy: boolean;
  onSubmit: (v: ServiceValues) => void; onCancel?: () => void;
}) {
  const [v, setV] = useState<ServiceValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof ServiceValues, val: string) => setV((p) => ({ ...p, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (v.title.trim().length < 3) er.title = 'Title must be at least 3 characters';
    if (v.description.trim().length < 20) er.description = 'Description must be at least 20 characters';
    if (!(Number(v.basePrice) > 0)) er.basePrice = 'Enter a positive price';
    if (!v.estimatedDuration.trim()) er.estimatedDuration = 'Estimated duration is required';
    if (v.serviceArea.trim().length < 2) er.serviceArea = 'Service area is required';
    if (!v.image) er.image = 'Please upload a service image';
    setErrors(er);
    if (!Object.keys(er).length) onSubmit({ ...v, basePrice: Number(v.basePrice) });
  };

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="field-error">{errors[k]}</p> : null);
  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate>
      <div><label className="label">Technician name</label><input className="input" value={technician.name} readOnly disabled /></div>
      <div><label className="label">Technician email</label><input className="input" value={technician.email} readOnly disabled /></div>
      <div className="sm:col-span-2"><label className="label" htmlFor="title">Title</label><input id="title" className="input" value={v.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. iPhone Screen Replacement" /><Err k="title" /></div>
      <div><label className="label" htmlFor="category">Category</label><select id="category" className="input" value={v.category} onChange={(e) => set('category', e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div><label className="label" htmlFor="serviceMode">Service mode</label><select id="serviceMode" className="input" value={v.serviceMode} onChange={(e) => set('serviceMode', e.target.value)}>{SERVICE_MODES.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div><label className="label" htmlFor="basePrice">Base price (USD)</label><input id="basePrice" type="number" min="0" step="0.01" className="input" value={v.basePrice} onChange={(e) => set('basePrice', e.target.value)} placeholder="49" /><Err k="basePrice" /></div>
      <div><label className="label" htmlFor="dur">Estimated duration</label><input id="dur" className="input" value={v.estimatedDuration} onChange={(e) => set('estimatedDuration', e.target.value)} placeholder="2-3 hours" /><Err k="estimatedDuration" /></div>
      <div className="sm:col-span-2"><label className="label" htmlFor="area">Service area</label><input id="area" className="input" value={v.serviceArea} onChange={(e) => set('serviceArea', e.target.value)} placeholder="Dhanmondi, Dhaka" /><Err k="serviceArea" /></div>
      <div className="sm:col-span-2"><label className="label" htmlFor="desc">Description</label><textarea id="desc" rows={4} className="input" value={v.description} onChange={(e) => set('description', e.target.value)} placeholder="What does this service include?" /><Err k="description" /></div>
      <div className="sm:col-span-2"><ImageUpload label="Service image" value={v.image} onChange={(u) => set('image', u)} /><Err k="image" /></div>
      <div className="flex justify-end gap-3 sm:col-span-2">
        {onCancel && <button type="button" className="btn-outline" onClick={onCancel}>Cancel</button>}
        <button className="btn-primary" disabled={busy}>{busy ? 'Saving…' : submitLabel}</button>
      </div>
    </form>
  );
}

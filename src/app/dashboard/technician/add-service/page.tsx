'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ServiceForm from '@/components/ServiceForm';
import { PageHeader } from '@/components/ui';
import { useUser } from '@/hooks/useUser';
import { api } from '@/lib/api';

export default function AddService() {
  const { user } = useUser();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  if (!user) return null;
  return (
    <>
      <PageHeader title="Add a Service" subtitle="New services are reviewed by an admin before going live." />
      <div className="card max-w-4xl p-6 sm:p-8">
        <ServiceForm technician={user} submitLabel="Submit for approval" busy={busy} onSubmit={async (v) => {
          setBusy(true);
          try { await api('/api/services', { method: 'POST', body: v }); toast.success('Service added — waiting for admin approval'); router.push('/dashboard/technician/my-services'); }
          catch (e: any) { toast.error(e.message); setBusy(false); }
        }} />
      </div>
    </>
  );
}

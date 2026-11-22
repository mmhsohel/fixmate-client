import Link from 'next/link';
import { Undo2 } from 'lucide-react';

export const metadata = { title: 'Payment Cancelled' };
export default function Cancel() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-16">
      <div className="card w-full max-w-md p-8 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-50 text-amber-600"><Undo2 className="h-8 w-8" /></span>
        <h1 className="mt-4 text-2xl font-extrabold">Payment cancelled</h1>
        <p className="mt-2 text-sm text-slate-500">No worries — you haven’t been charged and nothing was changed. You can pay whenever you’re ready.</p>
        <Link href="/dashboard/customer/bookings" className="btn-primary mt-6">Try Again</Link>
      </div>
    </div>
  );
}

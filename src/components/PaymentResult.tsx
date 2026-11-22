'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { fmtDate, money } from '@/lib/utils';

export default function PaymentResult({ sessionId }: { sessionId?: string }) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [payment, setPayment] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!sessionId) { setState('error'); setMessage('No payment session found.'); return; }
    api(`/api/payments/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((p) => { setPayment(p); setState('ok'); })
      .catch((e) => { setMessage(e.message); setState('error'); });
  }, [sessionId]);

  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-16">
      <div className="card w-full max-w-md p-8 text-center">
        {state === 'loading' && <><Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-700" /><p className="mt-4 font-semibold">Confirming your payment…</p></>}
        {state === 'error' && <><XCircle className="mx-auto h-14 w-14 text-red-500" /><h1 className="mt-4 text-xl font-bold">We couldn’t confirm the payment</h1><p className="mt-2 text-sm text-slate-500">{message}</p><Link href="/dashboard/customer/bookings" className="btn-primary mt-6">Back to My Bookings</Link></>}
        {state === 'ok' && payment && (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
            <h1 className="mt-4 text-2xl font-extrabold">Payment successful</h1>
            <p className="mt-1 text-sm text-slate-500">Thank you! {payment.technicianName} has been paid for “{payment.serviceTitle}”.</p>
            <dl className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4 text-left text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Amount</dt><dd className="font-bold text-ink-900">{money(payment.amount)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Transaction ID</dt><dd className="break-all text-right font-mono text-xs">{payment.transactionId}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Date</dt><dd>{fmtDate(payment.paidAt)}</dd></div>
            </dl>
            <Link href="/dashboard/customer/bookings" className="btn-primary mt-6 w-full">Back to My Bookings</Link>
          </>
        )}
      </div>
    </div>
  );
}

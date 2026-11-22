import PaymentResult from '@/components/PaymentResult';

export const metadata = { title: 'Payment Successful' };
export default function Success({ searchParams }: { searchParams: { session_id?: string } }) {
  return <PaymentResult sessionId={searchParams.session_id} />;
}

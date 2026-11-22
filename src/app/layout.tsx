import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'FixMate – Trusted Device & Home Appliance Repair', template: '%s | FixMate' },
  description: 'Book verified technicians for smartphone, laptop, AC, refrigerator, TV, washing machine and electrical repairs. Track every job and pay only after the work is done.',
};
export const viewport: Viewport = { themeColor: '#0f766e' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}

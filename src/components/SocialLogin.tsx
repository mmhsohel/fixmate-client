'use client';
import { authClient } from '@/lib/auth-client';
import { GoogleIcon } from './Icons';

/** Rendered only when NEXT_PUBLIC_GOOGLE_ENABLED=true and Google keys are configured. */
export default function SocialLogin() {
  if (process.env.NEXT_PUBLIC_GOOGLE_ENABLED !== 'true') return null;
  return (
    <>
      <div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />OR<span className="h-px flex-1 bg-slate-200" /></div>
      <button type="button" className="btn-outline w-full" onClick={() => authClient.signIn.social({ provider: 'google', callbackURL: '/dashboard' })}>
        <GoogleIcon className="h-5 w-5" /> Continue with Google
      </button>
    </>
  );
}

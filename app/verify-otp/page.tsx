'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

function VerifyOTPContent() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      setError('Phone number not found. Please sign up again.');
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0f' }}>
      <form onSubmit={verify} style={{ width: '400px', background: '#1a1a2e', padding: '2rem', borderRadius: '16px' }}>
        <h2 style={{ textAlign: 'center', color: '#00d4ff' }}>Enter OTP</h2>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#aaa' }}>
          Sent to {phone || 'your phone'}
        </p>
        <input
          placeholder="123456"
          value={token}
          onChange={e => setToken(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', margin: '1rem 0', background: '#2a2a38', border: 'none', borderRadius: '8px', color: '#fff' }}
        />
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '0.9rem', background: '#00d4ff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 700 }}>
          Verify
        </button>
      </form>
    </div>
  );
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}

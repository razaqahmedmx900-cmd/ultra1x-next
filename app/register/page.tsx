'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function Register() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isEmail) {
      const { error } = await supabase.auth.signUp({
        email: identifier,
        password,
        options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard` }
      });
      if (error) setError(error.message);
      else alert('Check your email for confirmation!');
    } else {
      const { error } = await supabase.auth.signInWithOtp({
        phone: identifier,
        options: { channel: 'sms' }
      });

      if (error) {
        setError(error.message);
      } else {
        // Redirect with phone in URL
        router.push(`/verify-otp?phone=${encodeURIComponent(identifier)}`);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleRegister} style={{ width: '500px', background: '#1a1a2e', padding: '2.5rem', borderRadius: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#00d4ff' }}>Register</h1>

        <input type="text" placeholder="Email or Phone" value={identifier} onChange={e => setIdentifier(e.target.value)}
          style={{ width: '100%', padding: '0.85rem', background: '#2a2a38', border: 'none', borderRadius: '12px', color: '#fff', marginBottom: '1rem' }} />

        {!isEmail && (
          <input type="password" placeholder="Password (optional for phone)" value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.85rem', background: '#2a2a38', border: 'none', borderRadius: '12px', color: '#fff', marginBottom: '1rem' }} />
        )}

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <label><input type="radio" checked={isEmail} onChange={() => setIsEmail(true)} /> Email</label>
          <label style={{ marginLeft: '1rem' }}><input type="radio" checked={!isEmail} onChange={() => setIsEmail(false)} /> Phone</label>
        </div>

        <button type="submit"
          style={{ width: '100%', padding: '0.9rem', background: '#00d4ff', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 700 }}>
          {isEmail ? 'Sign Up with Email' : 'Send OTP'}
        </button>

        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#aaa' }}>
          Have account? <a href="/login" style={{ color: '#00d4ff' }}>Login</a>
        </div>
      </form>
    </div>
  );
}

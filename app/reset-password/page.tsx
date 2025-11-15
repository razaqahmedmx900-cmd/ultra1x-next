'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) return setError('Passwords do not match');

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password updated! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div
        style={{
          background: 'rgba(25,25,35,0.98)',
          borderRadius: '20px',
          width: '500px',
          height: '500px',
          padding: '2.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontWeight: 900, fontSize: '1.6rem', color: '#00d4ff' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              background: '#00d4ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            1X
          </div>
          <span>1X BROKER</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', textAlign: 'center' }}>Reset Password</h1>

        <div style={{ position: 'relative' }}>
          <input
            type={show ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem',
              background: '#2a2a38',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              paddingRight: '40px',
            }}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            {show ? 'Hide' : 'Show'}
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type={show ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem',
              background: '#2a2a38',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              paddingRight: '40px',
            }}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            {show ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '0.9rem',
            background: '#00d4ff',
            color: '#000',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Update Password
        </button>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
      </div>
    </div>
  );
}

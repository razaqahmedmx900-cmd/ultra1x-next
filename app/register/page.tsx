'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const options = { data: { full_name: fullName } };
    const { error } = isEmail
      ? await supabase.auth.signUp({ email: identifier, password, options })
      : await supabase.auth.signUp({ phone: identifier, password, options });

    if (error) {
      setError(error.message);
    } else {
      alert(`${isEmail ? 'Confirmation email' : 'OTP'} sent! Check your ${isEmail ? 'inbox' : 'phone'}.`);
      router.push('/dashboard');
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

        <h1 style={{ fontSize: '1.6rem', textAlign: 'center' }}>Register</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            width: '100%',
            padding: '0.85rem',
            background: '#2a2a38',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '1rem',
          }}
        />

        <input
          type="text"
          placeholder="Email or Phone"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          style={{
            width: '100%',
            padding: '0.85rem',
            background: '#2a2a38',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '1rem',
          }}
        />

        <div style={{ position: 'relative' }}>
          <input
            type={show ? 'text' : 'password'}
            placeholder="Create Password"
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

        <div style={{ textAlign: 'center' }}>
          <label style={{ marginRight: '1rem' }}>
            <input type="radio" checked={isEmail} onChange={() => setIsEmail(true)} /> Email
          </label>
          <label>
            <input type="radio" checked={!isEmail} onChange={() => setIsEmail(false)} /> Phone
          </label>
        </div>

        <button
          onClick={handleRegister}
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
          Register
        </button>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div style={{ position: 'relative', textAlign: 'center', margin: '1rem 0', color: '#666', fontSize: '0.85rem' }}>
          or
        </div>

        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          style={{
            width: '100%',
            padding: '0.8rem',
            background: '#2a2a38',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
        >
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#aaa' }}>
          Have account? <a href="/login" style={{ color: '#00d4ff', textDecoration: 'none' }}>Login</a>
        </div>
      </div>
    </div>
  );
}

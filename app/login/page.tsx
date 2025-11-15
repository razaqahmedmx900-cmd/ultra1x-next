nano app/login/page.tsx <<'EOF'
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function Login() {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error } = isEmail
      ? await supabase.auth.signInWithPassword({ email: identifier, password })
      : await supabase.auth.signInWithPassword({ phone: identifier, password });

    if (error) setError(error.message);
    else router.push('/dashboard');
  };

  const handleForgot = async () => {
    if (!identifier || !isEmail) return setError('Enter email first');
    const { error } = await supabase.auth.resetPasswordForEmail(identifier, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });
    if (error) setError(error.message);
    else alert('Reset link sent!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{
        background: 'rgba(25,25,35,0.98)', borderRadius: '20px', width: '500px', padding: '2.5rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', gap: '1.2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontWeight: 900, fontSize: '1.6rem', color: '#00d4ff' }}>
          <div style={{ width: '32px', height: '32px', background: '#00d4ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>1X</div>
          <span>1X BROKER</span>
        </div>
        <h1 style={{ textAlign: 'center' }}>Login</h1>

        <input type="text" placeholder="Email or Phone" value={identifier} onChange={e => setIdentifier(e.target.value)}
          style={{ width: '100%', padding: '0.85rem', background: '#2a2a38', border: 'none', borderRadius: '12px', color: '#fff' }} />

        <div style={{ position: 'relative' }}>
          <input type={show ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.85rem', background: '#2a2a38', border: 'none', borderRadius: '12px', color: '#fff', paddingRight: '40px' }} />
          <button type="button" onClick={() => setShow(!show)}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#aaa' }}>
            {show ? 'Hide' : 'Show'}
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <label><input type="radio" checked={isEmail} onChange={() => setIsEmail(true)} /> Email</label>
          <label style={{ marginLeft: '1rem' }}><input type="radio" checked={!isEmail} onChange={() => setIsEmail(false)} /> Phone</label>
        </div>

        <a href="#" onClick={e => { e.preventDefault(); handleForgot(); }} style={{ color: '#00d4ff', fontSize: '0.82rem' }}>Forgot password?</a>

        <button onClick={handleLogin}
          style={{ width: '100%', padding: '0.9rem', background: '#00d4ff', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 700 }}>
          Login
        </button>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          style={{ width: '100%', padding: '0.8rem', background: '#2a2a38', color: '#fff', border: 'none', borderRadius: '12px' }}>
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', color: '#aaa' }}>
          No account? <a href="/register" style={{ color: '#00d4ff' }}>Register</a>
        </div>
      </div>
    </div>
  );
}
EOF

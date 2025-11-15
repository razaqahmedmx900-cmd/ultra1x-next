'use client';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function Home() {
  const [prices, setPrices] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchPrices = async () => {
    setLoading(true);
    const coins = ['bitcoin', 'ethereum', 'binancecoin', 'ripple', 'astar'];
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_24hr_change=true`
    );
    const data = await res.json();
    setPrices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.8rem 2rem', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)'
      }}>
        <div style={{ fontWeight: 900, fontSize: '1.4rem', color: '#00d4ff' }}>1X BROKER</div>
        <nav style={{ display: 'flex', gap: '1.8rem' }}>
          <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Markets</a>
          <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Trade</a>
          <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Earn</a>
        </nav>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button onClick={() => location.href = '/login'}
            style={{ padding: '0.45rem 1.2rem', background: 'transparent', color: '#ccc', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px' }}>
            Log In
          </button>
          <button onClick={() => location.href = '/register'}
            style={{ padding: '0.45rem 1.2rem', background: '#00d4ff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 600 }}>
            Sign Up
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        <section style={{
          position: 'relative', height: '500px', backgroundImage: 'url("https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(80,0,120,0.7), rgba(0,0,50,0.9))' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 800, margin: '0 0 1rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
              Look first <span style={{ color: '#ff6bff' }}>/</span> Then leap.
            </h1>
            <p style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>The best trades require research, then commitment.</p>
            <button onClick={() => location.href = '/register'}
              style={{ background: '#fff', color: '#000', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 600, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
              Get started for free
            </button>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <h3>Popular</h3>
            <a href="#" style={{ color: '#00d4ff', fontSize: '0.85rem' }}>View All 350+ Coins &gt;</a>
          </div>
          {loading ? <p>Loading prices...</p> : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['bitcoin', 'ethereum', 'binancecoin', 'ripple', 'astar'].map(id => {
                const p = prices[id];
                const name = id.charAt(0).toUpperCase() + id.slice(1);
                return (
                  <li key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span>
                      <img src={`https://cryptologos.cc/logos/${id === 'binancecoin' ? 'binance-coin-bnb' : id}-logo.png?v=024`} style={{ width: '22px', marginRight: '0.6rem', verticalAlign: 'middle' }} />
                      {id.toUpperCase().slice(0, 3)} {name}
                    </span>
                    <span>
                      <span style={{ fontWeight: 600 }}>${p?.usd?.toLocaleString() || '—'}</span>
                      <span style={{ color: p?.usd_24h_change >= 0 ? '#16c784' : '#ea3943', marginLeft: '0.5rem' }}>
                        {p?.usd_24h_change?.toFixed(2)}%
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

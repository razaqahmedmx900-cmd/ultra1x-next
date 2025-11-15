import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', color: '#00d4ff' }}>Welcome, {user.email || user.phone}</h1>
      <p>Your dashboard is ready!</p>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}

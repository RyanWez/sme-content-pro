'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundCatchAll() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/error/404');
  }, [router]);

  return null;
}

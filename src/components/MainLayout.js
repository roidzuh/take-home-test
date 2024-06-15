import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { isAuthenticated } from '@/utils/auth';
import { useRouter } from 'next/router';

export default function MainLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  });
  return (
    <main className="w-full h-full grid grid-cols-[300px,1fr] gap-3">
      <Sidebar />
      {children}
    </main>
  );
}

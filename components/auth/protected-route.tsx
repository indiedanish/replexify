'use client';

import LoadingSpinner from '../ui/loading-spinner';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback = <div className="flex items-center justify-center min-h-screen">Loading...</div>
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else {
        setIsChecking(false);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || isChecking) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
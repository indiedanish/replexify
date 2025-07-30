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

  console.log("ProtectedRoute: user =", user);
  console.log("ProtectedRoute: isLoading =", isLoading);
  console.log("ProtectedRoute: isChecking =", isChecking);

  useEffect(() => {
    console.log("ProtectedRoute useEffect: user =", user, "isLoading =", isLoading);

    if (!isLoading) {
      if (!user) {
        console.log("ProtectedRoute: No user, redirecting to login");
        router.push('/login');
      } else {
        console.log("ProtectedRoute: User found, setting isChecking to false");
        setIsChecking(false);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || isChecking) {
    console.log("ProtectedRoute: Showing loading spinner");
    return <LoadingSpinner />;
  }

  if (!user) {
    console.log("ProtectedRoute: No user, returning null");
    return null; // Will redirect to login
  }

  console.log("ProtectedRoute: Rendering children");
  return <>{children}</>;
}
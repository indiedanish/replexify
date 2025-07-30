'use client';

import LoadingSpinner from '../ui/loading-spinner';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/auth-context';

interface PublicRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function PublicRoute({
    children,
    fallback = <div className="flex items-center justify-center min-h-screen">Loading...</div>
}: PublicRouteProps) {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    console.log("PublicRoute: user =", user);
    console.log("PublicRoute: isLoading =", isLoading);
    console.log("PublicRoute: isChecking =", isChecking);

    useEffect(() => {
        console.log("PublicRoute useEffect: user =", user, "isLoading =", isLoading);

        if (!isLoading) {
            if (user) {
                console.log("PublicRoute: User is logged in, redirecting to dashboard");
                router.push('/dashboard');
            } else {
                console.log("PublicRoute: No user, allowing access to public page");
                setIsChecking(false);
            }
        }
    }, [user, isLoading, router]);

    if (isLoading || isChecking) {
        console.log("PublicRoute: Showing loading spinner");
        return <LoadingSpinner />;
    }

    if (user) {
        console.log("PublicRoute: User is logged in, returning null");
        return null; // Will redirect to dashboard
    }

    console.log("PublicRoute: Rendering children");
    return <>{children}</>;
}
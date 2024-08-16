"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const Page = () => {
    const router = useRouter();
    const [error, setError] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const response = await fetch('/api/authCallback');
                const data = await response.json();

                if (data.success) {
                    router.push(origin ? `/${origin}` : "/dashboard");
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            }
        };

        authenticateUser();
    }, [origin, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50">
            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-lg max-w-lg w-full">
                {error ? (
                    <ArrowRight className="h-8 w-8 text-red-600" />
                ) : (
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                )}
                <h3 className="text-2xl font-bold text-blue-900 text-center">
                    {error ? "Session Expired" : "Setting up your Account..."}
                </h3>
                <p className="text-gray-700 text-center">
                    {error ? "Your session has ended. Please sign in again." : "You will be redirected automatically."}
                </p>
                {error && (
                    <Link href="/sign-in" className={buttonVariants({ size: "lg" })}>
                        Sign in <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Page;

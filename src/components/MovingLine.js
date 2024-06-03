"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MovingLine = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsNavigating(true);
    const handleComplete = () => setIsNavigating(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className={`fixed top-0 left-0 w-full h-1 ${isNavigating ? 'bg-blue-500 transition-all duration-500 ease-in-out' : 'bg-transparent'}`}>
      {isNavigating && <div className="w-full h-full bg-blue-500 animate-line"></div>}
    </div>
  );
};

export default MovingLine;

// components/withAuth.tsx
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC<{ children?: any }> = ({ children }) => {
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (isLoaded && !isSignedIn) {
        router.push('/sign-in');
      }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded || !isSignedIn) return <div>Loading...</div>; // Optional: Show loading state

    return <WrappedComponent {...children} />;
  };

  return Wrapper;
};

export default withAuth;

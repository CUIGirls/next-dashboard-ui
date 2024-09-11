"use client";
// components/withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


interface WithAuthOptions {
  roles?: string[]; // Roles allowed to access the page
}

export default function withAuth(WrappedComponent: React.FC, options: WithAuthOptions = {}) {
  return function AuthenticatedComponent(props: any) {
    const { roles = [] } = options;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        router.push('/sign-in'); // Redirect if not authenticated
        return;
      }

      try {
        // Decode the JWT to get the user's role
        const decodedToken: any = jwtDecode(token);
        const { exp, role } = decodedToken;
        console.log('Decoded token:', decodedToken);

        // Check if the token has expired
        if (exp * 1000 < Date.now()) {
          localStorage.removeItem('jwtToken');
          router.push('/sign-in');
          return;
        }

        // Check if the user's role matches any allowed roles
        if (roles.length && !roles.includes(role)) {
          router.push('/403'); // Redirect to "Forbidden" page
          return;
        }

        // User is authorized
        setIsAuthorized(true);
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('jwtToken');
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    }, [router, roles]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthorized) {
      return null; // Prevent unauthorized content from being shown
    }

    // Render the protected component
    return <WrappedComponent {...props} />;
  };
}

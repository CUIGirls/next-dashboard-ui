"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Import the loading component

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const jwtToken = localStorage.getItem('jwtToken');

      if (!jwtToken) {
        router.push('/sign-in'); // Redirect to login page if not authenticated
      } else {
        setIsLoading(false); // Set loading to false if authenticated
      }
    }, [router]);


    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
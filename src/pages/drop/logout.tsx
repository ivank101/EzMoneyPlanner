// pages/logout.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';

const Logout: React.FC = () => {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth);
        router.push('/login'); // Redirect to login page after logout
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logoutUser();
  }, [auth, router]);

  return <div>Logging out...</div>;
};

export default Logout;

// pages/index.tsx
import React, { useEffect, useState } from 'react';
import UserHome from '@/components/appHome';
import JobCalendar from '@/components/calendar';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import router from 'next/router';

const pageTitle = 'シフト表';

const Home: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // User verification
    const userId = getUserSession();
    if (userId) {
      setUserId(userId);
    } else {
      // Handle case where user is not logged in, e.g., redirect to login
      router.push('/');
    }
  }, []);

  return (
    <Navigation title={pageTitle}>
      <Head>
        <title>Calendar App</title>
        <meta
          name={pageTitle}
          content="あなたのジョブシフト"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main>
        {userId ?
          <>
            <JobCalendar />
            {/* <UserHome /> */}
          </>
        : <p>Loading...</p>}
      </main>
    </Navigation>
  );
};

export default Home;

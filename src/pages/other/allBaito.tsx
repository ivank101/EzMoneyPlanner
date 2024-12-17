// pages/other/allBaito.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import router from 'next/router';
import styles from '@/styles/other/allBaito.module.css';

const pageTitle = 'バイト先一覧';

const handleAddJob = () => {
  router.push('/touroku/jobRegister');
};

const AllBaito: React.FC = () => {
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
      <div className={styles.container}>
        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>バイト先</h2>
            <div className={styles.item}>
              <span className={styles.itemTitle}>ファミリーマート表参道店</span>
              <span className={styles.itemArrow}>▶</span>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>セブンイレブン銀座中店</span>
              <span className={styles.itemArrow}>▶</span>
            </div>
          </section>
          <div className={styles.addButtonContainer}>
            <button
              className={styles.addButton}
              onClick={handleAddJob}
            >
              バイト先追加
            </button>
          </div>
        </main>
      </div>
    </Navigation>
  );
};

export default AllBaito;

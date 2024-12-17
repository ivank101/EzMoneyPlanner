// pages/other/announce.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import router from 'next/router';
import styles from '@/styles/other/announce.module.css';

const pageTitle = 'お知らせ';

const Announce: React.FC = () => {
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
            <h2 className={styles.sectionTitle}>お知らせ</h2>
            <div className={styles.item}>
              <span className={styles.itemTitle}>キャンペーンのお知らせ</span>
              <span className={styles.itemArrow}>▶</span>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>キャンペーンのお知らせ</span>
              <span className={styles.itemArrow}>▶</span>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>シフト関連</h2>
            <div className={styles.item}>
              <span className={styles.itemTitle}>2024年5月のシフト記録</span>
              <span className={styles.itemArrow}>▶</span>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>2024年4月のシフト記録</span>
              <span className={styles.itemArrow}>▶</span>
            </div>
          </section>
        </main>
      </div>
    </Navigation>
  );
};

export default Announce;

// pages/other/setting.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import router from 'next/router';
import styles from '@/styles/other/setting.module.css';

const pageTitle = '設定';

const Setting: React.FC = () => {
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
            <h2 className={styles.sectionTitle}>通知設定</h2>
            <div className={styles.item}>
              <span className={styles.itemTitle}>シフト開始の通知</span>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>シフト短縮の通知</span>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
              </label>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>カレンダー設定</h2>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Googleカレンダーと同期</span>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>終日稼働の表示</span>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
              </label>
            </div>
          </section>
        </main>
      </div>
    </Navigation>
  );
};

export default Setting;

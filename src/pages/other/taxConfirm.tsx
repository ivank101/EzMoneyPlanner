// pages/other/taxConfirm.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import router from 'next/router';
import styles from '@/styles/other/taxConfirm.module.css';

const pageTitle = '税確認';

const TaxConfirm: React.FC = () => {
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
        <title>Tax Confirmation</title>
        <meta
          name={pageTitle}
          content="税確認"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>個人情報</h2>
            <div className={styles.item}>
              <label
                className={styles.label}
                htmlFor="name"
              >
                名前
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
              />
            </div>
            <div className={styles.item}>
              <label
                className={styles.label}
                htmlFor="address"
              >
                住所
              </label>
              <input
                type="text"
                id="address"
                className={styles.input}
              />
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>税情報</h2>
            <div className={styles.item}>
              <label
                className={styles.label}
                htmlFor="taxId"
              >
                税ID
              </label>
              <input
                type="text"
                id="taxId"
                className={styles.input}
              />
            </div>
            <div className={styles.item}>
              <label
                className={styles.label}
                htmlFor="income"
              >
                収入
              </label>
              <input
                type="text"
                id="income"
                className={styles.input}
              />
            </div>
          </section>
          <div className={styles.confirmButtonContainer}>
            <button className={styles.confirmButton}>確認</button>
          </div>
        </main>
      </div>
    </Navigation>
  );
};

export default TaxConfirm;

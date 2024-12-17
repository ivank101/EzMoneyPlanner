// pages/other/taxDeclare.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import router from 'next/router';
import styles from '@/styles/other/taxDeclare.module.css';

const pageTitle = '税申告';

const TaxDeclare: React.FC = () => {
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
        <title>Tax Declaration</title>
        <meta
          name={pageTitle}
          content="あなたの税申告"
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
            <h2 className={styles.sectionTitle}>収入詳細</h2>
            <div className={styles.item}>
              <label
                className={styles.label}
                htmlFor="salaryIncome"
              >
                給与収入
              </label>
              <input
                type="text"
                id="salaryIncome"
                className={styles.input}
              />
            </div>
            <div className={styles.item}>
              <label
                className={styles.label}
                htmlFor="businessIncome"
              >
                事業収入
              </label>
              <input
                type="text"
                id="businessIncome"
                className={styles.input}
              />
            </div>
            <div className={styles.item}>
              <label
                className={styles.label}
                htmlFor="otherIncome"
              >
                その他の収入
              </label>
              <input
                type="text"
                id="otherIncome"
                className={styles.input}
              />
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>控除</h2>
            <div className={styles.item}>
              <label
                className={styles.label}
                htmlFor="deductions"
              >
                総控除額
              </label>
              <input
                type="text"
                id="deductions"
                className={styles.input}
              />
            </div>
          </section>
          <div className={styles.confirmButtonContainer}>
            <button className={styles.confirmButton}>申告する</button>
          </div>
        </main>
      </div>
    </Navigation>
  );
};

export default TaxDeclare;

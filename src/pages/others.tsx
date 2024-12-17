// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import styles from '@/styles/others.module.css';
import Image from 'next/image';
import router from 'next/router';

const pageTitle = 'その他';

const handleProfileEdit = () => {
  router.push('/profile');
};
const handleAddJob = () => {
  router.push('/touroku/jobRegister');
};
const handleAllBaito = () => {
  router.push('/other/allBaito');
};
const handleAnalysis = () => {
  router.push('/other/analysis');
};
const handleAnnounce = () => {
  router.push('/other/announce');
};
const handleSetting = () => {
  router.push('/other/setting');
};
const handleTaxConfirm = () => {
  router.push('/other/taxConfirm');
};
const handleTaxDeclare = () => {
  router.push('/other/taxDeclare');
};

const Others: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // User verification
    const userId = getUserSession();
    if (userId) {
      setUserId(userId);
    } else {
      // Handle case where user is not logged in, e.g., redirect to login
      router.push('/index');
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
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.profileSection}>
              <Image
                src="/images/profile.jpg" // Ensure you have this image or replace it with a correct path
                //src="/user.svg" // Ensure you have this image or replace it with a correct path
                alt="Profile"
                width={80}
                height={80}
                className={styles.profileImage}
              />
              <div className={styles.profileDetails}>
                <h2 className={styles.name}>ペンギン</h2>
                <p className={styles.id}>ID: test_account</p>
                <button
                  className={styles.editButton}
                  onClick={handleProfileEdit}
                >
                  編集
                </button>
              </div>
            </div>
            <div className={styles.sections}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>お知らせ</h3>
                <div className={styles.sectionItem}>
                  <span className={styles.sectionIcon}>🔔</span>
                  <span
                    className={styles.sectionText}
                    onClick={handleAnnounce}
                  >
                    お知らせ
                  </span>
                </div>
              </div>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>機能</h3>
                <div className={styles.sectionItem}>
                  <span
                    className={styles.sectionText}
                    onClick={handleAddJob}
                  >
                    バイト情報追加
                  </span>
                </div>
                <div className={styles.sectionItem}>
                  <span
                    className={styles.sectionText}
                    onClick={handleAnalysis}
                  >
                    収支分析
                  </span>
                </div>
                <div className={styles.sectionItem}>
                  <span
                    className={styles.sectionText}
                    onClick={handleTaxDeclare}
                  >
                    確定申告
                  </span>
                </div>
              </div>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>バイト先</h3>
                <div className={styles.sectionItem}>
                  <span
                    className={styles.sectionText}
                    onClick={handleAllBaito}
                  >
                    バイト先一覧
                  </span>
                </div>
                <div className={styles.sectionItem}>
                  <span
                    className={styles.sectionText}
                    onClick={handleTaxConfirm}
                  >
                    保険料・税金確認
                  </span>
                </div>
              </div>
              <div className={styles.section}>
                <h3
                  className={styles.sectionTitle}
                  onClick={handleSetting}
                >
                  設定
                </h3>
                <div className={styles.sectionItem}>
                  <span
                    className={styles.sectionText}
                    onClick={handleSetting}
                  >
                    設定変更
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Navigation>
  );
};

export default Others;

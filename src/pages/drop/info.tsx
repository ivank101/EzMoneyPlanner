// pages/drop/info.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import router from 'next/router';
import styles from '@/styles/drop/info.module.css';

const pageTitle = 'サイト情報';

const Info: React.FC = () => {
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
        <title>{pageTitle}</title>
        <meta
          name={pageTitle}
          content="あなたのジョブシフト"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Shift Synk</h1>
          <h2 className={styles.subtitle}>by katarinabluu</h2>
          <p className={styles.description}>
            ShiftSynkは、シフト制で働く方のために開発されたスマートフォンアプリです。
            「Shift（シフト）」と「Sync（同期）」という言葉から成り、勤務スケジュールと財務状況をリアルタイムで同期・管理することを目指しています。
            直感的な操作性と高速処理で、忙しい日常においても効率的に情報を把握し、より良い意思決定をサポートします。
          </p>
        </section>
        <section className={styles.objectives}>
          <h2 className={styles.sectionTitle}>目的</h2>
          <ul className={styles.list}>
            <li>
              労働者がシフトと財務を効率的に管理し、生活の質を向上させることです。
            </li>
            <li>
              操作の簡素化:
              効率的な操作を可能にし、シフト入力から給与計算、支出記録までを簡単に行えるようにする。
            </li>
            <li>
              ユーザー体験の向上:
              直感的で使いやすいデザインと機能を提供し、ユーザーのストレスを軽減する。
            </li>
            <li>
              財務計画のサポート:
              AIによる支出分析や節約提案、貯蓄目標達成のアシスタント機能で、労働者の財務状況を改善する。
            </li>
            <li>
              一元化された管理の実現:
              シフト管理と財務管理を統合し、労働者が一つのアプリで全ての情報を管理できるようにする。
            </li>
          </ul>
        </section>
      </main>
    </Navigation>
  );
};

export default Info;

import React from 'react';
import router, { useRouter } from 'next/router';
import styles from '@/styles/appHome.module.css';
import Image from 'next/image';

const UserHome: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>勤怠管理アプリ</h1>
        <p>業務時間をかんたんに管理しましょう！</p>
      </header>
      <main className={styles.main}>
        <section className={styles.scheduleSection}>
          <h2>今週の予定</h2>
          {/* Replace with actual calendar component */}
          <div className={styles.calendarPlaceholder}>Calendar Placeholder</div>
        </section>
        <section className={styles.clockSection}>
          <h2>時刻</h2>
          <div className={styles.clockPlaceholder}>
            {/* Replace with actual clock component or logic to display time */}
            <span>--:--</span>
          </div>
          <div className={styles.buttons}>
            <button className={styles.startButton}>勤務開始</button>
            <button className={styles.endButton}>休憩開始</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserHome;

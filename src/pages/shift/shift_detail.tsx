import React from 'react';
import Head from 'next/head';
import styles from '@/styles/calendar_shift/shiftdetail.module.css';
import Navigation from '@/components/navigation';

const ShiftDetails = ({ shift }) => {
  console.log(shift);

  return (
    <Navigation title={'シフトの詳細'}>
      <div className={styles.container}>
        <Head>
          <title>Shift Information Page</title>
          <meta
            name="description"
            content="Information about shifts"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>
        <div className={styles.header}>
          <button
            className={styles.closeButton}
            onClick={() => console.log('Close button clicked')}
          >
            ×
          </button>
          <h2 className={styles.title}>シフトの詳細</h2>
        </div>
        <div className={styles.details}>
          <div className={styles.row}>
            <div className={styles.label}>バイト先</div>
            <div className={styles.value}>{shift?.title || 'N/A'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>タイトル</div>
            <div className={styles.value}>{shift?.title || 'N/A'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>開始日時</div>
            <div className={styles.value}>{shift?.start_time || 'N/A'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>終了日時</div>
            <div className={styles.value}>{shift?.end_time || 'N/A'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>休憩時間</div>
            <div className={styles.value}>{shift?.break_time || 'N/A'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>給料</div>
            <div className={styles.value}>{shift?.salary || 'N/A'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>給料の個別設定</div>
            <div className={styles.value}>{shift?.salarySettings || 'N/A'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>メモ</div>
            <div className={styles.value}>{shift?.notes || 'N/A'}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.completeButton}
            onClick={() => console.log('Complete button clicked')}
          >
            完了する
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => console.log('Delete button clicked')}
          >
            削除する
          </button>
        </div>
      </div>
    </Navigation>
  );
};

export default ShiftDetails;

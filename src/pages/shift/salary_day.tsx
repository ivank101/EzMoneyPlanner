import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/calendar_shift/salary_day.module.css';
import Navigation from '@/components/navigation';

const Salary: React.FC = () => {
  const router = useRouter();
  const { date } = router.query;
  const monthlyOptions = ['当月', '翌月', '翌々月'];
  const dayOptions: string[] = Array.from(
    { length: 30 },
    (_, i) => `${i + 1}日`,
  );
  const [selectedMonthly, setSelectedMonthly] = useState('当月');
  const [selectedDay, setSelectedDay] = useState('1日');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: string, type: string) => void;
    options: { monthly: string[]; days: string[] };
  }> = ({ isOpen, onClose, onSelect, options }) => {
    if (!isOpen) return null;

    return (
      <div
        className={styles.modalOverlay}
        onClick={onClose}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2>締切を選択</h2>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.modalColumn}>
              {options.monthly.map((option) => (
                <div
                  key={option}
                  className={styles.modalOption}
                  onClick={() => onSelect(option, 'monthly')}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className={styles.modalColumn}>
              {options.days.map((option) => (
                <div
                  key={option}
                  className={styles.modalOption}
                  onClick={() => onSelect(option, 'day')}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              onClick={onClose}
              className={styles.closeButton}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleSelect = (value: string, type: string) => {
    if (type === 'monthly') {
      setSelectedMonthly(value);
    } else if (type === 'day') {
      setSelectedDay(value);
      setIsModalOpen(false);
    }
  };

  return (
    <Navigation title={''}>
      <div className={styles.container}>
        <Head>
          <title>Salary Page</title>
          <meta
            name="description"
            content="Information about shifts"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>
        <h1
          onClick={() => router.back()}
          style={{ cursor: 'pointer' }}
        >
          ＜
        </h1>
        <main className={styles.main}>
          <h1>給料日</h1>
          <div className={styles.formGroup}>
            <label
              htmlFor="deadline"
              className={styles.label}
            >
              締切
            </label>
            <div
              className={styles.deadlineInput}
              onClick={() => setIsModalOpen(true)}
            >
              {selectedMonthly} {selectedDay}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.switchLabel}>
              給料日が土日祝日の場合の変更
            </label>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isSwitchOn}
                onChange={() => setIsSwitchOn(!isSwitchOn)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {isSwitchOn && (
            <div className={styles.formGroup}>
              <label>
                <input
                  type="radio"
                  name="salaryType"
                  value="before"
                />
                土日祝日の前日
              </label>
              <label>
                <input
                  type="radio"
                  name="salaryType"
                  value="after"
                />
                土日祝日の翌日
              </label>
            </div>
          )}

          <p className={styles.note}>
            ※給料日が土日祝日の場合カレンダー上の表示と給料日の通知を前後の平日に変更することができます。
          </p>
        </main>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelect}
          options={{ monthly: monthlyOptions, days: dayOptions }}
        />
      </div>
    </Navigation>
  );
};

export default Salary;

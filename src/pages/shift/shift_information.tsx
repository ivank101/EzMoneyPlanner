import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/calendar_shift/shift_information.module.css';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import addData from '@/lib/addData';

const Information: React.FC = () => {
  const router = useRouter();
  const { date } = router.query;
  const part_time: string[] = [
    'family mart',
    'seven eleven',
    'KFC',
    'MC Donald',
  ];

  const add_part_time = () => {
    router.push('/shift/add_parttime');
  };

  //userID get
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    // User verification
    const userId = getUserSession();
    if (userId) {
      setUserId(userId);
      console.log(userId);
    } else {
      // Handle case where user is not logged in, e.g., redirect to login
      router.push('/');
    }
  }, []);

  // State variables for form data
  const [formData, setFormData] = useState({
    part_time: part_time[2],
    start: date ? `${date}T09:00` : '',
    end: date ? `${date}T17:00` : '',
    break_time: '00:30',
    salary: '',
    memo: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('User is not authenticated');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { result, error } = await addData(
        `users/${userId}/shifts`,
        `${formData.part_time}-${new Date().toISOString()}`,
        formData,
      );

      if (error) {
        console.error('Error adding document:', error);
      } else {
        console.log('Document successfully written!', result);
        router.push('/home'); // Adjust the redirection as needed
      }
    } catch (e) {
      console.error('Error during addData operation:', e);
    }

    setLoading(false);
  };

  return (
    <Navigation title={'新規シフト追加 '}>
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
        <main className={styles.main}>
          <h1
            onClick={() => router.back()}
            style={{ cursor: 'pointer' }}
          >
            back
          </h1>

          <p className={styles.sectionTitle}>基本情報</p>
          <p>title: </p>
          <p>バイト先 : {formData.part_time}</p>
          <button
            className={styles.partTimeButton}
            onClick={add_part_time}
          >
            +バイト先を追加
          </button>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="start">勤務時間</label>
              <input
                type="datetime-local"
                id="start"
                name="start"
                value={formData.start}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="end">終了時間</label>
              <input
                type="datetime-local"
                id="end"
                name="end"
                value={formData.end}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="break_time">休憩時間</label>
              <input
                type="time"
                id="break_time"
                value={formData.break_time}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="salary">給料：10000円</label>
              <label htmlFor="salary">給料の個別設定：</label>
              <input
                type="text"
                id="salary"
                pattern="[0-9]*" //数字だけ入力するように
                title="数字を入力してください"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
            <p className={styles.sectionTitle}>その他</p>
            <div className={styles.formGroup}>
              <label htmlFor="memo">メモ</label>
              <input
                type="text"
                id="memo"
                placeholder="メモを入力"
                value={formData.memo}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className={styles.btn}
              disabled={loading}
            >
              {loading ? 'Loading...' : '完了する'}
            </button>
          </form>
          {error && <p>Error: {error}</p>}
        </main>
      </div>
    </Navigation>
  );
};

export default Information;

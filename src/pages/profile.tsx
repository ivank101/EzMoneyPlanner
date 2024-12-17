import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import { getDocument, setDocument } from '@/lib/getData';
import router from 'next/router';
import styles from '@/styles/profile.module.css';

const pageTitle = 'プロファイル';

const ProfileDetail: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      const userId = await getUserSession();
      if (userId) {
        setUserId(userId);
        fetchProfileData(userId);
      } else {
        router.push('/');
      }
    };

    fetchUserSession();
  }, []);

  const fetchProfileData = async (userId: string) => {
    const { result, error } = await getDocument('users', userId);
    if (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch profile data');
    } else if (result) {
      setUsername(result.username || '');
      setEmail(result.email || '');
    } else {
      setError('No profile data found');
    }
  };

  const handleDiscardChanges = () => {
    router.push('/statistics');
  };

  const handleSubmitChanges = async () => {
    if (userId) {
      const profileData = { username, email, password };
      const { error } = await setDocument('users', userId, profileData);
      if (error) {
        console.error('Error updating profile:', error);
        setError('Failed to update profile');
      } else {
        router.push('/statistics');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name={pageTitle}
          content="あなたのプロファイル"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Navigation title={pageTitle}>
        <main className={styles.main}>
          <div className={styles.header}>
            <button
              className={styles.backButton}
              onClick={handleDiscardChanges}
            >
              ←
            </button>
            <h1>{pageTitle}</h1>
            <button
              className={styles.submitButton}
              onClick={handleSubmitChanges}
            >
              変更終了
            </button>
          </div>
          <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
          >
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.inputGroup}>
              <label htmlFor="username">ユーザー名</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">パスワード</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </main>
      </Navigation>
    </div>
  );
};

export default ProfileDetail;

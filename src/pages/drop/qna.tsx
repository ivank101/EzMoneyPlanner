// pages/drop/qna.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import router from 'next/router';
import styles from '@/styles/drop/qna.module.css';

const pageTitle = 'お問い合わせ';

const Qna: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Inquiry submitted:', { name, email, message });
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

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
      <main className={styles.main}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.formGroup}>
            <label
              className={styles.label}
              htmlFor="name"
            >
              名前:
            </label>
            <input
              className={styles.textInput}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label
              className={styles.label}
              htmlFor="email"
            >
              メールアドレス:
            </label>
            <input
              className={styles.textInput}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label
              className={styles.label}
              htmlFor="message"
            >
              メッセージ:
            </label>
            <textarea
              className={styles.textArea}
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
          >
            送信
          </button>
        </form>
      </main>
    </Navigation>
  );
};

export default Qna;

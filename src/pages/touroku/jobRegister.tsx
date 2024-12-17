import React, { useState, useEffect } from 'react';
import styles from '@/styles/jobRegister.module.css';
import { useRouter } from 'next/router';
import addData from '@/lib/addData'; // Import the addData function
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const JobRegister: React.FC = () => {
  // State variables for form fields
  const [companyName, setCompanyName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [payrollDate, setPayrollDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [hourlyWage, setHourlyWage] = useState(0); // Initialize as 0

  const [userId, setUserId] = useState<string | null>(null); // State variable for user ID
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.error('No user is signed in');
        router.push('/login'); // Redirect to login page if no user is signed in
      }
    });
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      console.error('No user is signed in');
      return;
    }

    const jobData = {
      companyName,
      storeName,
      workplace,
      payrollDate,
      closingDate,
      hourlyWage,
    };

    try {
      // Save job data to Firestore under the user's document
      const { result, error } = await addData(
        `users/${userId}/jobs`,
        companyName,
        jobData,
      );
      if (error) {
        console.error('Error adding job data:', error);
      } else {
        console.log('Job data added:', result);
      }

      // Redirect to home or another page after successful registration
      router.push('/home');
    } catch (error) {
      console.error('Error saving job data:', error);
    }
  };

  const handleSkip = () => {
    router.push('/home');
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.labels}>
          <h1 className={styles.title}>職場情報を登録</h1>
          <label
            htmlFor="companyName"
            className={styles.label}
          >
            会社名・店舗名
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="例: 株式会社〇〇、〇〇店"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className={styles.input}
            />
          </label>
          <label
            htmlFor="storeName"
            className={styles.label}
          >
            店舗名
            <input
              type="text"
              id="storeName"
              name="storeName"
              placeholder="例: 本社、支店、工場、店舗"
              value={storeName}
              onChange={(event) => setStoreName(event.target.value)}
              className={styles.input}
            />
          </label>
          <label
            htmlFor="workplace"
            className={styles.label}
          >
            配属先
            <input
              type="text"
              id="workplace"
              name="workplace"
              placeholder="例: 本社、支店、工場、店舗"
              value={workplace}
              onChange={(event) => setWorkplace(event.target.value)}
              className={styles.input}
            />
          </label>
          <label
            htmlFor="payrollDate"
            className={styles.label}
          >
            給料日
            <input
              type="date"
              id="payrollDate"
              name="payrollDate"
              value={payrollDate}
              onChange={(event) => setPayrollDate(event.target.value)}
              className={styles.input}
            />
          </label>
          <label
            htmlFor="closingDate"
            className={styles.label}
          >
            締日
            <input
              type="date"
              id="closingDate"
              name="closingDate"
              value={closingDate}
              onChange={(event) => setClosingDate(event.target.value)}
              className={styles.input}
            />
          </label>
          <label
            htmlFor="hourlyWage"
            className={styles.label}
          >
            時給
            <input
              type="number"
              id="hourlyWage"
              name="hourlyWage"
              value={hourlyWage}
              onChange={(event) => setHourlyWage(parseInt(event.target.value))}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.skipButton}
            onClick={handleSkip}
          >
            今は登録しない
          </button>
          <button
            type="submit"
            className={styles.submitButton}
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobRegister;

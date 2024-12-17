import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/registerPage.module.css';
import { FaChevronLeft } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Regular expression to check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the email submission logic here
    console.log({ email });
  };

  const handleSubmitClick = () => {
    if (isEmailValid) {
      router.push('/touroku/2auth');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => router.back()}
        >
          <FaChevronLeft />
        </button>
        <div className={styles.text}>
          <h1 className={styles.title}>アプリをはじめよう</h1>
          <p className={styles.description}>
            有効なメールアドレスを入力してください。
          </p>
        </div>
      </div>
      <form
        className={styles.form}
        onSubmit={handleRegister}
      >
        <input
          type="email"
          id="email"
          value={email}
          placeholder="sample@mail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.emailInput}
        />
        <button
          type="submit"
          className={`${!isEmailValid ? styles.disabled : styles.submitButton} }`}
          onClick={handleSubmitClick}
          disabled={!isEmailValid}
        >
          認証コードを受け取る
        </button>
      </form>
    </div>
  );
};
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
export default RegisterPage;

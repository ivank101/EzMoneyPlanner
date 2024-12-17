import React from 'react';
import router from 'next/router';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase'; // Ensure your Firebase config and initialization are in this file
import { doc, getDoc } from 'firebase/firestore';
import styles from '../styles/loginPage.module.css';
import Image from 'next/image';
import { setUserSession } from '@/lib/session'; // Ensure correct import path

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleForgotPass = () => {
    router.push('/touroku/forgotPass');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      setUserSession(user.uid); // Store user ID in session
      console.log('Email login successful:', user);
      router.push('/home');
    } catch (error) {
      console.error('Email login error:', error);
    }
  };

  const handleRegisterButton = () => {
    router.push('/touroku/register');
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserSession(user.uid); // Store user ID in session
      console.log('Google login successful:', result);

      // Check if user already completed registration
      const userDoc = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDoc);

      if (userDocSnapshot.exists()) {
        // User has already completed registration, redirect to home
        router.push('/home');
      } else {
        // User has not completed registration, redirect to accRegister
        router.push('/touroku/accRegister?provider=google');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleAppleLogin = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserSession(user.uid); // Store user ID in session
      console.log('Apple login successful:', result);

      // Check if user already completed registration
      const userDoc = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDoc);

      if (userDocSnapshot.exists()) {
        // User has already completed registration, redirect to home
        router.push('/home');
      } else {
        // User has not completed registration, redirect to accRegister
        router.push('/accRegister?provider=apple');
      }
    } catch (error) {
      console.error('Apple login error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <h1 className={styles.title}>ログイン</h1>
        <div className={styles.inputs}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="パスワード"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.input}
          />
          <a
            href="#"
            className={styles.forgot}
            onClick={handleForgotPass}
          >
            パスワードを忘れた方はこちら
          </a>
        </div>
        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.submitButton}
          >
            ログイン
          </button>
          <div className={styles.or}>
            <span>または</span>
          </div>
          <div className={styles.providers}>
            <button
              type="button"
              className={styles.providerButton}
              onClick={handleGoogleLogin}
            >
              <Image
                src="/providers/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
            </button>
            <button
              type="button"
              className={styles.providerButton}
              onClick={handleAppleLogin}
            >
              <Image
                src="/providers/apple.svg"
                alt="Apple"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </form>
      <a
        href="#"
        onClick={handleRegisterButton}
        className={styles.register}
      >
        アカウントを持っていない方はこちら
      </a>
    </div>
  );
};

export default LoginPage;

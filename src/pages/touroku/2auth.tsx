// pages/2auth.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/2authPage.module.css';
import { FaChevronLeft } from 'react-icons/fa';

const TwoAuthPage: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      // When all code inputs are filled, navigate to the next page
      router.push('/touroku/accRegister');
    }
  }, [code, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    // Move focus to the next input field
    if (e.target.value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1]?.focus();
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
        <h1 className={styles.title}>認証コードを入力</h1>
        <p className={styles.description}>
          <span className={styles.email}>sample@mail.com</span>
          にSMSで送信された4桁の認証コードを入力して下さい。
        </p>
      </div>
      <form className={styles.form}>
        <div className={styles.codeInput}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              autoFocus={index === 0} // Set focus on the first input field
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.resendButton}
          onClick={() => console.log('Resend code')}
        >
          認証コードを再送信する
        </button>
      </form>
    </div>
  );
};

export default TwoAuthPage;

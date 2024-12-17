import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '@/styles/accRegister.module.css'; // Import CSS Module
import router, { useRouter } from 'next/router';
import addData from '@/lib/addData'; // Import the addData function
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const AccRegister: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const router = useRouter();
  const { provider } = router.query;

  useEffect(() => {
    if (provider === 'google' || provider === 'apple') {
      setIsGoogleLogin(true);
    }
  }, [provider]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = getAuth();
    try {
      let user;
      if (isGoogleLogin) {
        // User is already authenticated with Google, no need to create a new account
        user = auth.currentUser;
        if (!user) {
          throw new Error('User is not authenticated');
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        user = userCredential.user;
      }
      console.log('User created:', user);

      // Prepare additional user data
      const additionalData = {
        userName,
        gender,
        birthday,
      };

      // Save additional user data to Firestore
      const { result, error } = await addData(
        'users',
        user.uid,
        additionalData,
      );
      if (error) {
        console.error('Error adding additional data:', error);
      } else {
        console.log('Additional data added:', result);
      }

      // Redirect to jobRegister after successful sign-up
      router.push('/touroku/jobRegister');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.labels}>
        <h1 className={styles.title}>ユーザー情報を登録</h1>

        <label
          htmlFor="userName"
          className={styles.label}
        >
          <div className={styles.text}>
            ユーザーネーム
            <span className={styles.required}>任意</span>
          </div>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            className={styles.input}
          />
        </label>

        <div className={styles.ageGender}>
          <label
            htmlFor="gender"
            className={styles.label}
          >
            性別
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className={styles.select}
            >
              <option value="">未選択</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </label>

          <label
            htmlFor="birthday"
            className={styles.label}
          >
            生年月日:
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={birthday}
              onChange={(event) => setBirthday(event.target.value)}
              className={styles.input}
            />
          </label>
        </div>

        <label
          htmlFor="email"
          className={styles.label}
        >
          メールアドレス
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
        </label>

        {!isGoogleLogin && (
          <label
            htmlFor="password"
            className={styles.label}
          >
            パスワード
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={styles.input}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ?
                  <FaEye />
                : <FaEyeSlash />}
              </span>
            </div>
          </label>
        )}
      </div>
      <button
        type="submit"
        className={styles.submitButton}
      >
        次へ
      </button>
    </form>
  );
};

export default AccRegister;

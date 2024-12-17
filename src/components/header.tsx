import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/navigation.module.css';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}日${today.getMonth() + 1}月${today.getFullYear()}年`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.profile}>
        <Image
          src="/images/profile.jpg" // Ensure you have this image or replace it with a correct path
          alt="Profile"
          width={40}
          height={40}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.date}>{currentDate}</div>
    </header>
  );
};

export default Header;

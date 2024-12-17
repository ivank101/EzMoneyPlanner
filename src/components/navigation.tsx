// components/navigation.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@chakra-ui/react';
import { motion, cubicBezier } from 'framer-motion';
import router, { useRouter } from 'next/router';
import {
  FaSignOutAlt,
  FaBell,
  FaQuestionCircle,
  FaInfoCircle,
  FaBars,
} from 'react-icons/fa';
import styles from '@/styles/navigation.module.css';
import { footerArray } from '@/types/footerTypes'; // Ensure this is correctly defined and imported

interface FooterProps {
  children: React.ReactNode;
  title: string; // Add the title prop
}

const Navigation = ({ children, title }: FooterProps) => {
  const [pathStat, setPathStat] = useState('/');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const handleProfileEdit = () => {
    router.push('/profile');
  };

  useEffect(() => {
    setPathStat(location.pathname);
  }, []);

  const variant = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.4, 0, 0.2, 1),
      },
    },
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setDropdownVisible(false); // Hide dropdown after navigation
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="あなたのジョブシフト"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <header className={styles.header}>
        <div
          className={styles.profile}
          onClick={handleProfileEdit}
        >
          <Image
            src="/user.svg" // Ensure you have this image or replace it with a correct path
            alt="Profile"
            width={40}
            height={40}
            className={styles.profileImage}
            priority
          />
        </div>
        <div className={styles.title}>{title}</div>
        <div
          className={styles.dropdown}
          onClick={toggleDropdown}
        >
          <Icon as={FaBars} />
        </div>
        {dropdownVisible && (
          <div className={styles.dropdownMenu}>
            <div
              className={styles.dropdownItem}
              onClick={() => handleNavigation('/drop/logout')}
            >
              <Icon
                as={FaSignOutAlt}
                className={styles.dropdownIcon}
              />
              ログアウト
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() => handleNavigation('/other/announce')}
            >
              <Icon
                as={FaBell}
                className={styles.dropdownIcon}
              />
              お知らせ
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() => handleNavigation('/drop/qna')}
            >
              <Icon
                as={FaQuestionCircle}
                className={styles.dropdownIcon}
              />
              問い合わせ
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() => handleNavigation('/drop/info')}
            >
              <Icon
                as={FaInfoCircle}
                className={styles.dropdownIcon}
              />
              サイト情報
            </div>
          </div>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <nav className={styles.nav}>
          {footerArray.map((e, idx) => (
            <motion.div
              className={`${styles.navItem} ${pathStat === e.path ? styles.active : ''}`}
              key={idx}
              variants={variant}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={e.path}
                className={styles.button}
              >
                <Icon
                  as={e.icon}
                  className={styles.icon}
                />
                <span>{e.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default Navigation;

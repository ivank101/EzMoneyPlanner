import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import styles from '@/styles/transactions.module.css';
import router from 'next/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserSession } from '@/lib/session';
import { getDocument } from '@/lib/getData';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const pageTitle = '入出金';

const firebaseConfig = {
  apiKey: 'AIzaSyC17gWndexNK6-oqEC_yAwmjDmpx-f5Tl0',
  authDomain: 'katarinabluu.firebaseapp.com',
  projectId: 'katarinabluu',
  storageBucket: 'katarinabluu.appspot.com',
  messagingSenderId: '626019077247',
  appId: '1:626019077247:web:0b27fabf8e56267456834a',
  measurementId: 'G-DM4PBSEKZJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const handleAddButton = () => {
  router.push('/addTransactions');
};

interface Transaction {
  amount: number;
  bgColor: string;
  category: string;
  comment: string;
  date: string;
  isIncome: boolean; // Added isIncome property
}

interface UserData {
  userName: string;
  transactions?: Transaction[];
}

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Unknown User');
  const [activeTab, setActiveTab] = useState<'yearly' | 'monthly'>('monthly');

  useEffect(() => {
    const fetchUserSession = async () => {
      const userId = await getUserSession();
      if (userId) {
        setUserId(userId);
        fetchUserData(userId);
      } else {
        router.push('/login'); // Redirect to login if not authenticated
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserSession();
      } else {
        router.push('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserData = async (userId: string) => {
    const { result, error } = await getDocument('users', userId);
    if (error) {
      console.error('Error fetching user data:', error);
    } else if (result) {
      const userData = result as UserData;
      console.log('Fetched user data:', userData); // Debugging: print fetched data
      setUserName(userData.userName);
      if (userData.transactions) {
        setTransactions(userData.transactions);
      } else {
        fetchTransactions(userId);
      }
    } else {
      console.error('No such document!');
    }
  };

  const fetchTransactions = async (uid: string) => {
    try {
      // Fetch transactions from a sub-collection within the user document
      const userDocRef = doc(db, 'users', uid);
      const transactionsColRef = collection(userDocRef, 'transactions');
      const querySnapshot = await getDocs(transactionsColRef);
      const documents = querySnapshot.docs.map(
        (doc) => doc.data() as Transaction,
      );
      console.log('Fetched transactions:', documents);
      setTransactions(documents);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const hasCategory = transaction.category !== undefined;
    const hasComment = transaction.comment !== undefined;

    if (!hasCategory || !hasComment) {
      console.log('Transaction missing category or comment:', transaction);
    }

    return (
      (hasCategory && transaction.category.includes(searchTerm)) ||
      (hasComment && transaction.comment.includes(searchTerm))
    );
  });

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(
    (transaction) =>
      new Date(transaction.date).getMonth() === currentMonth &&
      new Date(transaction.date).getFullYear() === currentYear,
  );

  const income = monthlyTransactions
    .filter((transaction) => transaction.isIncome)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expense = monthlyTransactions
    .filter((transaction) => !transaction.isIncome)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const monthlyChartData = {
    labels: ['収入', '支出'],
    datasets: [
      {
        label: '円',
        data: [income, expense],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const yearlyIncome = new Array(12).fill(0);
  const yearlyExpense = new Array(12).fill(0);

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    if (date.getFullYear() === currentYear) {
      const month = date.getMonth();
      if (transaction.isIncome) {
        yearlyIncome[month] += transaction.amount;
      } else {
        yearlyExpense[month] += transaction.amount;
      }
    }
  });

  const barChartData = {
    labels: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    datasets: [
      {
        label: '収入',
        data: yearlyIncome,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: '支出',
        data: yearlyExpense,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const groupedTransactions = filteredTransactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {} as { [key: string]: Transaction[] },
  );

  return (
    <div className={styles.container}>
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
        <main>
          <div className={styles.chartSection}>
            <div className={styles.tabContainer}>
              <div
                className={`${styles.tab} ${
                  activeTab === 'yearly' ? styles.active : ''
                }`}
                onClick={() => setActiveTab('yearly')}
              >
                年間表示
              </div>
              <div
                className={`${styles.tab} ${
                  activeTab === 'monthly' ? styles.active : ''
                }`}
                onClick={() => setActiveTab('monthly')}
              >
                月間表示
              </div>
            </div>
            <div className={styles.chartContainer}>
              {activeTab === 'monthly' ?
                <Pie data={monthlyChartData} />
              : <Bar data={barChartData} />}
            </div>
            <div className={styles.chartDetails}>
              <p>
                収入{' '}
                <span className={styles.income}>
                  ¥{income.toLocaleString()}
                </span>
              </p>
              <p>
                支出{' '}
                <span className={styles.expense}>
                  ¥{expense.toLocaleString()}
                </span>
              </p>
              <p>
                収支{' '}
                <span className={styles.balance}>
                  ¥{(income - expense).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="検索"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className={styles.clearButton}
              onClick={() => setSearchTerm('')}
            >
              クリア
            </button>
          </div>
          <div className={styles.transactionList}>
            {filteredTransactions.map((transaction, index) => (
              <div
                key={index}
                className={styles.transaction}
              >
                <div className={styles.header}>
                  <div className={styles.date}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                  <div className={styles.total}>
                    <span
                      className={
                        transaction.isIncome ? styles.income : styles.expense
                      }
                    >
                      {transaction.isIncome ? '+' : '-'}¥
                      {Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className={styles.entries}>
                  <div className={styles.entry}>
                    <span
                      className={styles.entryDot}
                      style={{ backgroundColor: transaction.bgColor }}
                    />
                    <span className={styles.entryLabel}>
                      {transaction.category}
                    </span>
                    <span className={styles.entryAmount}>
                      {transaction.comment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={styles.addButton}
            onClick={handleAddButton}
          >
            <span className={styles.addButtonIcon}>+</span>
          </div>
        </main>
      </Navigation>
    </div>
  );
};

export default Transactions;

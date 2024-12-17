import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import { getDocument, setDocument } from '@/lib/getData';
import router from 'next/router';
import styles from '@/styles/addMonthExp.module.css';

const pageTitle = '固定費入力・変更';

interface Transaction {
  name: string;
  amount: number;
  color: string;
}

interface UserData {
  fixedTransactions: Transaction[];
}

const AddMonthExp: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [fixedTransactions, setFixedTransactions] = useState<Transaction[]>([]);
  const [originalTransactions, setOriginalTransactions] = useState<
    Transaction[]
  >([]);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    name: '',
    amount: 0,
    color: '#000000',
  });

  useEffect(() => {
    const fetchUserSession = async () => {
      const userId = await getUserSession();
      if (userId) {
        setUserId(userId);
        fetchData(userId);
      } else {
        router.push('/');
      }
    };

    fetchUserSession();
  }, []);

  const fetchData = async (userId: string) => {
    const { result, error } = await getDocument('users', userId);
    if (error) {
      console.error('Error fetching data:', error);
    } else if (result) {
      const userData = result as UserData;
      setFixedTransactions(userData.fixedTransactions || []);
      setOriginalTransactions(userData.fixedTransactions || []);
    } else {
      console.error('No such document!');
    }
  };

  const handleAddTransaction = async () => {
    if (newTransaction.name && newTransaction.amount > 0) {
      const updatedTransactions = [...fixedTransactions, newTransaction];
      setFixedTransactions(updatedTransactions);
      setNewTransaction({ name: '', amount: 0, color: '#000000' });
    }
  };

  const handleDeleteTransaction = (index: number) => {
    const updatedTransactions = fixedTransactions.filter((_, i) => i !== index);
    setFixedTransactions(updatedTransactions);
  };

  const handleEditTransaction = (
    index: number,
    updatedTransaction: Transaction,
  ) => {
    const updatedTransactions = [...fixedTransactions];
    updatedTransactions[index] = updatedTransaction;
    setFixedTransactions(updatedTransactions);
  };

  const handleDiscardChanges = () => {
    setFixedTransactions(originalTransactions);
    router.push('/statistics');
  };

  const handleSubmitChanges = async () => {
    if (userId) {
      await setDocument('users', userId, { fixedTransactions });
      router.push('/statistics');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name={pageTitle}
          content="あなたの固定費入力・変更"
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
          <div className={styles.transactionList}>
            {fixedTransactions.map((transaction, index) => (
              <div
                key={index}
                className={styles.transactionItem}
              >
                <input
                  type="text"
                  value={transaction.name}
                  onChange={(e) =>
                    handleEditTransaction(index, {
                      ...transaction,
                      name: e.target.value,
                    })
                  }
                  className={styles.transactionInput}
                />
                <input
                  type="number"
                  value={transaction.amount}
                  onChange={(e) =>
                    handleEditTransaction(index, {
                      ...transaction,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className={styles.transactionInput}
                />
                <input
                  type="color"
                  value={transaction.color}
                  onChange={(e) =>
                    handleEditTransaction(index, {
                      ...transaction,
                      color: e.target.value,
                    })
                  }
                  className={styles.transactionColor}
                />
                <button
                  onClick={() => handleDeleteTransaction(index)}
                  className={styles.deleteButton}
                >
                  削除
                </button>
              </div>
            ))}
          </div>
          <div className={styles.addTransaction}>
            <input
              type="text"
              placeholder="名前"
              value={newTransaction.name}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, name: e.target.value })
              }
              className={styles.transactionInput}
            />
            <input
              type="number"
              placeholder="金額"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: parseFloat(e.target.value),
                })
              }
              className={styles.transactionInput}
            />
            <input
              type="color"
              value={newTransaction.color}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, color: e.target.value })
              }
              className={styles.transactionColor}
            />
            <button
              onClick={handleAddTransaction}
              className={styles.addButton}
            >
              追加
            </button>
          </div>
        </main>
      </Navigation>
    </div>
  );
};

export default AddMonthExp;

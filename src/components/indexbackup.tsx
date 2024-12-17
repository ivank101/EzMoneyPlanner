import { useAuth } from '@/context/auth';
import { login, logout } from '@/lib/auth';
import { useState, useEffect } from 'react';
import styles from '@/styles/Main.module.css';

export default function Main() {
  const user = useAuth();
  const [waiting, setWaiting] = useState(false);
  const [jobName, setJobName] = useState('');
  const [userId, setUserId] = useState('KGe2xkocAQNNCkOhyC6AUiKVK0Y2'); // Set this to the actual user ID

  const signIn = () => {
    setWaiting(true);

    login()
      .catch((error) => {
        console.error(error?.code);
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  const updateJobName = async () => {
    try {
      const res = await fetch('/api/updateJob', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, jobName }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Job name updated successfully:', data);
      } else {
        console.error('Failed to update job name:', data);
      }
    } catch (error) {
      console.error('Error updating job name:', error);
    }
  };

  // CRUD testing
  type Item = {
    id: string;
    name: string;
  };

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/read');
        const data = await res.json();

        // Check if the data is an array
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Items</h1>
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.id}
            className={styles.listItem}
          >
            {item.name}
          </li>
        ))}
      </ul>

      {user === null && !waiting && (
        <button
          onClick={signIn}
          className={styles.button}
        >
          ログイン
        </button>
      )}
      {user && (
        <button
          onClick={logout}
          className={styles.button}
        >
          ログアウト
        </button>
      )}

      <div>
        <h2>Update Job Name</h2>
        <input
          type="text"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          placeholder="Enter new job name"
        />
        <button
          onClick={updateJobName}
          className={styles.button}
        >
          Update Job Name
        </button>
      </div>
    </div>
  );
}

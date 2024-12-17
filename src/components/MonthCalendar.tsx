import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ja';
import styles from '../styles/calendar_shift/MonthCalendar.module.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration object
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

const VerticalMonthCalendar: React.FC = () => {
  const [events, setEvents] = useState<
    {
      job: string;
      start_time: string;
      end_time: string;
      days: string;
      colors: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsData = querySnapshot.docs.map(
          (doc) =>
            doc.data() as {
              job: string;
              start_time: string;
              end_time: string;
              days: string;
              colors: string;
            },
        );
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const renderDayEvents = (day: string) => {
    return events
      .filter((event) => event.days === day)
      .map((event, index) => (
        <div
          key={index}
          className={styles.event}
          style={{ borderColor: event.colors }}
        >
          <p style={{ color: event.colors }}>{event.job}</p>
          <p>
            {event.start_time} - {event.end_time}
          </p>
        </div>
      ));
  };

  const renderDaysInMonth = () => {
    const daysInMonth = moment().daysInMonth();
    const firstDayOfMonth = moment().startOf('month');
    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      const currentDay = firstDayOfMonth
        .clone()
        .add(i, 'days')
        .format('YYYY-MM-DD');
      days.push(
        <div
          key={currentDay}
          className={styles.day}
        >
          <p className={styles.date}>
            {firstDayOfMonth.clone().add(i, 'days').format('D (ddd)')}
          </p>
          {renderDayEvents(currentDay)}
        </div>,
      );
    }
    return days;
  };

  const monthYear = moment().format('MMMM YYYY');
  return (
    <div className={styles.verticalCalendarContainer}>
      <h1 style={{ textAlign: 'center', marginBottom: '5px' }}>{monthYear}</h1>
      {renderDaysInMonth()}
    </div>
  );
};

export default VerticalMonthCalendar;

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/router';
import styles from '../styles/calendar_shift/calendar.module.css';
import VerticalMonthCalendar from './MonthCalendar';
import { FaPlus } from 'react-icons/fa';
import { getUserSession } from '@/lib/session';
import { getDocuments } from '@/lib/getData';

const localizer = momentLocalizer(moment);

const JobCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>('month');
  const [showVerticalCalendar, setShowVerticalCalendar] =
    useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserShifts = async () => {
      const userId = await getUserSession();
      if (!userId) {
        router.push('/'); // Redirect to login if not logged in
        return;
      }

      const { result, error } = await getDocuments(`users/${userId}/shifts`);
      if (error) {
        console.error('Error fetching shifts:', error);
      } else if (result) {
        const shifts = result as any[];
        const calendarEvents = shifts.map((shift) => ({
          start: new Date(shift.start),
          end: new Date(shift.end),
          title: shift.part_time,
          resource: { color: shift.color },
        }));
        setEvents(calendarEvents);
      } else {
        console.error('No shifts found!');
      }
    };

    fetchUserShifts();
  }, [router]);

  const handleSelectSlot = (slotInfo: { start: Date }) =>
    setSelectedDate(slotInfo.start);

  const shift_resign = () => {
    router.push(
      `/shift/shift_information?date=${moment(selectedDate).format('YYYY-MM-DD')}`,
    );
  };

  const shift_detail = () => {
    router.push(`/shift/shift_detail`);
  };

  const todayFormatted = moment(selectedDate).format('YYYY年MM月DD日(dd)');
  const dayPropGetter = (date: Date) => {
    if (selectedDate && moment(date).isSame(selectedDate, 'day'))
      return { className: styles.selectedDate };
    if (moment(date).isSame(new Date(), 'day'))
      return { className: styles.today };
    return {};
  };

  return (
    <div style={{ height: 'auto' }}>
      <div style={{ textAlign: 'end' }}>
        <button onClick={() => setShowVerticalCalendar(!showVerticalCalendar)}>
          {showVerticalCalendar ? 'Horizontal View' : 'Vertical View'}
        </button>
      </div>
      {showVerticalCalendar ?
        <VerticalMonthCalendar />
      : <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSelectSlot}
          dayPropGetter={dayPropGetter}
          eventPropGetter={(event) => ({
            style: { backgroundColor: event.resource?.color || '#3174ad' },
          })}
          view={view}
          onView={(view: View) => setView(view)}
          views={['month']}
        />
      }
      <div className={styles.shift}>
        <div style={{ fontSize: '15px' }}>{todayFormatted}</div>
        {events
          .filter((event) => moment(event.start).isSame(selectedDate, 'day'))
          .map((event, index) => (
            <div
              key={index}
              className={styles['shift-job']}
              onClick={shift_detail}
            >
              <div className={styles['shift-time']}>
                <span>{moment(event.start).format('HH:mm')}</span>
                <span>{moment(event.end).format('HH:mm')}</span>
              </div>
              <div
                className={styles['shift-bar']}
                style={{
                  backgroundColor: event.resource?.color,
                  color: event.resource?.color,
                  fontSize: 'Large',
                }}
              >
                .
              </div>
              <div className={styles['shift-title']}>{event.title}</div>
            </div>
          ))}
        <div style={{ alignItems: 'center' }}>
          <button
            className={styles['add-shift-button']}
            onClick={shift_resign}
          >
            ✙新規シフトを追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCalendar;

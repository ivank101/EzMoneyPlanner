import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Modal from 'react-modal';
import styles from '@/styles/calendar_shift/add_parttime.module.css';
import Navigation from '@/components/navigation';
import { getUserSession } from '@/lib/session';
import addData from '@/lib/addData';

const Part_Time: React.FC = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState('#FF4500');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isNightShiftPay, setIsNightShiftPay] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [overtime, setOvertime] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    // User verification
    const userId = getUserSession();
    if (userId) {
      setUserId(userId);
    } else {
      // Handle case where user is not logged in, e.g., redirect to login
      router.push('/');
    }
  }, []);
  const salaryDeadlines: string[] = Array.from(
    { length: 30 },
    (_, i) => `${i + 1}日`,
  ).concat('月末');
  const [selectedDeadline, setSelectedDeadline] = useState('月末');
  const colors = [
    '#FF4500',
    '#FFA500',
    '#FFFF00',
    '#008000',
    '#00FFFF',
    '#0000FF',
    '#800080',
    '#FFC0CB',
  ];
  const [inputMode, setInputMode] = useState<'yen' | 'percent'>('yen');
  const [input_over_time_Mode, setOvertimeMode] = useState<'yen' | 'percent'>(
    'yen',
  );
  // value data
  const [companyName, setCompanyName] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };
  const handleDeadlineClick = () => setModalIsOpen(true);
  const handleDeadlineSelect = (value: string) => {
    setSelectedDeadline(value);
    setModalIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const salaryDay = () => router.push('/shift/salary_day');

  const toggleInputMode = (mode: 'yen' | 'percent') => {
    setInputMode(mode);
  };
  const overtimeInputMode = (mode: 'yen' | 'percent') => {
    setOvertimeMode(mode);
  };
  const handleSubmit = async () => {
    try {
      if (companyName.trim() === '') {
        console.error('error です');
        //文字がない場合エラー
        return;
      }
      const dataToAdd = {
        companyName: companyName,
        color: selectedColor,
        deadline: selectedDeadline,
      };

      // Call function to add data to Firestore or handle data submission
      const { result, error } = await addData('users', userId, dataToAdd);

      if (error) {
        console.error('データの追加中にエラーが発生しました:', error);
      } else {
        console.log('データが正常に追加されました:', result);
        // Redirect or show success message as needed
        router.push('/shift/shift_information'); // Example redirect after successful submission
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };
  return (
    <Navigation title="新規バイトの追加">
      <div className={styles.container}>
        <Head>
          <title>Add Part Time Page</title>
          <meta
            name="description"
            content="Information about shifts"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>
        <h1
          onClick={() => router.back()}
          style={{ cursor: 'pointer' }}
        >
          ＜
        </h1>
        <main className={styles.main}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>基本情報</h2>
            <div>
              <label
                className={styles.label}
                htmlFor="partTime"
              >
                {' '}
                勤務先
                <input
                  type="text"
                  id="partTime"
                  value={companyName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>表示色</label>
              <div className={styles.colorPickerWrapper}>
                <div
                  className={styles.selectedColor}
                  style={{ backgroundColor: selectedColor }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                {showColorPicker && (
                  <div className={styles.colorPicker}>
                    {colors.map((color) => (
                      <div
                        key={color}
                        defaultValue={color}
                        className={styles.colorOption}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorClick(color)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>給料情報</h2>
            <div
              className={styles.formGroup}
              onClick={handleDeadlineClick}
            >
              <label
                className={styles.label}
                htmlFor="deadline"
              >
                締切
              </label>
              <input
                type="text"
                id="deadline"
                className={styles.input}
                value={selectedDeadline}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label
                className={styles.label}
                htmlFor="payday"
              >
                給料日
              </label>
              <input
                type="text"
                id="payday"
                className={styles.input}
                placeholder="当月25日 (祝日除く)"
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                className={styles.addButton}
                onClick={salaryDay}
              >
                + 給料日の追加設定
              </button>
            </div>
            <div className={styles.salaryGroup}>
              <label
                className={styles.label}
                htmlFor="salary"
              >
                給料
              </label>
              <div className={styles.salaryType}>
                <label>
                  {' '}
                  <input
                    type="radio"
                    name="salaryType"
                    value="hourly"
                    defaultChecked
                  />{' '}
                  時給
                </label>
                <label>
                  <input
                    type="radio"
                    name="salaryType"
                    value="daily"
                  />{' '}
                  日給
                </label>
              </div>
              <input
                type="text"
                id="salary"
                className={styles.input}
                placeholder="1000円"
                style={{ width: '80%' }}
              />
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label
                className={styles.label}
                htmlFor="transportation"
              >
                交通費
              </label>
              <input
                type="text"
                id="transportation"
                className={styles.input}
                placeholder="420円"
              />
              <label>
                <input type="checkbox" />
                上限
              </label>
              <label>
                <input
                  type="radio"
                  name="transportationLimit"
                  value="daily"
                  defaultChecked
                />{' '}
                一日
              </label>
              <label>
                <input
                  type="radio"
                  name="transportationLimit"
                  value="monthly"
                />{' '}
                一ヶ月
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label
                className={styles.label}
                htmlFor="holidayPay"
              >
                休日給料
              </label>
              <input
                type="text"
                id="holidayPay"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label
                className={styles.label}
                htmlFor="nightShiftPay"
              >
                深夜給料
              </label>
              <label>
                <input
                  type="radio"
                  name="nightShiftPay"
                  value="yes"
                  checked={isNightShiftPay}
                  onChange={() => setIsNightShiftPay(true)} //ありチェックされた時、下ののmodal表示される
                />{' '}
                あり
              </label>
              <label>
                <input
                  type="radio"
                  name="nightShiftPay"
                  value="no"
                  checked={!isNightShiftPay}
                  onChange={() => setIsNightShiftPay(false)}
                />{' '}
                なし
              </label>
            </div>

            {isNightShiftPay && ( //modal
              <div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>深夜給料</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    onChange={handleInputChange}
                    placeholder={inputMode === 'yen' ? '円' : '%'}
                  />
                  <button
                    className={inputMode === 'yen' ? styles.button : ''}
                    onClick={() => toggleInputMode('yen')}
                  >
                    円
                  </button>
                  <button
                    className={inputMode === 'percent' ? styles.button : ''}
                    onClick={() => toggleInputMode('percent')}
                  >
                    %
                  </button>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>開始時間</label>
                  <input
                    type="time"
                    id="start"
                    name="start"
                    defaultValue="22:00"
                  />
                  <label className={styles.label}>終了時間</label>
                  <input
                    type="time"
                    id="end"
                    name="end"
                    defaultValue="05:00"
                  />
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <label
                className={styles.label}
                htmlFor="overtimePay"
              >
                残業手当
              </label>
              <label>
                <input
                  type="radio"
                  name="overtime"
                  value="yes"
                  checked={overtime} ////ありチェックされた時、下ののmodal表示される
                  onChange={() => setOvertime(true)}
                />{' '}
                あり
              </label>
              <label>
                <input
                  type="radio"
                  name="overtime"
                  value="no"
                  checked={!overtime}
                  onChange={() => setOvertime(false)}
                />{' '}
                なし
              </label>
            </div>

            {overtime && ( // over time modal
              <div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>適用時間</label>
                  <input
                    type="text"
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>残業手当</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    onChange={handleInputChange}
                    placeholder={input_over_time_Mode === 'yen' ? '円' : '%'}
                  />
                  <button
                    className={
                      input_over_time_Mode === 'yen' ? styles.button : ''
                    }
                    onClick={() => overtimeInputMode('yen')}
                  >
                    円
                  </button>
                  <button
                    className={
                      input_over_time_Mode === 'percent' ? styles.button : ''
                    }
                    onClick={() => overtimeInputMode('percent')}
                  >
                    %
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            バイト先を追加する
          </button>
        </main>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalHeader}>
          <h2>締切を選択</h2>
          <button
            onClick={() => setModalIsOpen(false)}
            className={styles.modalCloseBtn}
          >
            閉じる
          </button>
        </div>
        <div className={styles.modalContent}>
          {salaryDeadlines.map((value, index) => (
            <div
              key={index}
              onClick={() => handleDeadlineSelect(value)}
              className={styles.modalItem}
            >
              {value}
            </div>
          ))}
        </div>
      </Modal>
    </Navigation>
  );
};

export default Part_Time;

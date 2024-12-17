{
  /* <div className={styles.section}>
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
              <label className={styles.label} htmlFor="nightShiftPay">深夜給料</label>
              <label className={styles.switch}>
                <input type="checkbox" name="salaryType" value="hourly" defaultChecked />{' '}
                <span className={styles.slider}>あり</span>
              </label>
              <label>
                <input type="radio" name="salaryType" value="daily" />{' '}日給
              </label>
            </div>
            <div className={styles.formGroup}>
              <label
                className={styles.label}
                htmlFor="overtimePay"
              >
                残業手当
              </label>
              <input
                type="text"
                id="overtimePay"
                className={styles.input}
              />
            </div>
          </div>

          <button className={styles.submitButton}>バイト先を追加する</button>
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
          {salary_deadlines.map((value, index) => (
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
}; */
}

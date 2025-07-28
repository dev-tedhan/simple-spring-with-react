import styles from "./Welcome.module.css";

function Welcome({ userName, message, currentTime, currentDate }) {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeText}>
          <div className={styles.userGreeting}>
            <span className={styles.emoji}>👋</span>
            <span className={styles.name}>{userName}</span>님
          </div>
          <div className={styles.message}>{message}</div>
        </div>
        <div className={styles.timeContainer}>
          <div
            className={styles.currentTime}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {currentTime}
          </div>
          <div className={styles.currentDate}>{currentDate}</div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
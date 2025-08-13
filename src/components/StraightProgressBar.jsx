import styles from "./StraightProgressBar.module.css";

function StraightProgressBar({ current, target }) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className={styles.info}>
        <span>{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default StraightProgressBar;

import { useEffect, useState } from "react";
import styles from "./CircularProgressBar.module.css";

function CircularProgressBar({ currentAmount, targetAmount }) {
  const percentage = Math.min(
    (currentAmount / targetAmount) * 100,
    100
  ).toFixed(1);

  const [progress, setProgress] = useState(0);

  useEffect(
    function () {
      const timer = setTimeout(() => {
        setProgress(percentage);
      }, 100);
      return () => clearTimeout(timer);
    },
    [percentage]
  );

  return (
    <div className={styles.progressCircle}>
      <svg viewBox="0 0 36 36" className={styles.circularChart}>
        <path
          className={styles.circleBg}
          d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={styles.circle}
          strokeDasharray={`${progress}, 100`}
          d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className={styles.percentage}>
          {percentage}%
        </text>
      </svg>
    </div>
  );
}

export default CircularProgressBar;

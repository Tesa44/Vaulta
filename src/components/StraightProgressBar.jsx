import { useEffect, useState } from "react";
import styles from "./StraightProgressBar.module.css";

function StraightProgressBar({ current, target, className }) {
  const percentage = Math.min((current / target) * 100, 100);

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
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          className={`${styles.fill} ${className || ""}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={styles.info}>
        <span>{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default StraightProgressBar;

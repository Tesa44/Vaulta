import styles from "./GoalAccountsItem.module.css";
import StraightProgressBar from "./StraightProgressBar";

function GoalAccountsItem({ goal }) {
  return (
    <li key={goal.id} className={styles.card}>
      <div className={styles.name}>{goal.name}</div>
      {/* <div className={styles.status}>
        {goal.balance} / {goal.targetAmount} {goal.currency}
      </div> */}
      <StraightProgressBar
        current={goal.balance}
        target={goal.targetAmount}
      ></StraightProgressBar>
    </li>
  );
}

export default GoalAccountsItem;

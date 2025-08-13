import styles from "./GoalAccounts.module.css";
import BackButton from "./BackButton";
import GoalAccountsList from "./GoalAccountsList";

function GoalAccounts() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>My goals</h3>
        <BackButton></BackButton>
      </div>
      <GoalAccountsList></GoalAccountsList>
    </div>
  );
}

export default GoalAccounts;

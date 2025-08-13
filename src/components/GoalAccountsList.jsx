import styles from "./GoalAccountsList.module.css";
import GoalAccountsItem from "./GoalAccountsItem";

function GoalAccountsList({ goalAccounts }) {
  return (
    <ul className={styles.goalList}>
      {goalAccounts.map((goal) => (
        <GoalAccountsItem goal={goal}></GoalAccountsItem>
      ))}
    </ul>
  );
}

export default GoalAccountsList;

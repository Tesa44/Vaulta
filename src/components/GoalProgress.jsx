import { useUserAccounts } from "../contexts/UserAccountsContext";
import CircularProgressBar from "./CircularProgressBar";
import styles from "./GoalProgress.module.css";
import Button from "./Button";

function GoalProgress() {
  const { currentAccount } = useUserAccounts();

  if (currentAccount.type !== "goal") {
    return <p>This account is not a goal account!</p>;
  }

  const { balance: currentAmount, targetAmount } = currentAccount;

  return (
    <div className={styles.container}>
      <CircularProgressBar
        currentAmount={currentAccount}
        targetAmount={targetAmount}
      ></CircularProgressBar>
      <div className={styles.amounts}>
        <span className={styles.amount}>{currentAmount.toFixed(2)} PLN</span>
        <span className={styles.separator}>/</span>
        <span className={styles.amount}>{targetAmount.toFixed(2)} PLN</span>
      </div>

      <div className={styles.actions}>
        <Button type="primary" to="/app/new-transfer">
          Deposit now
        </Button>
        <Button type="light" to="/app/history">
          View history
        </Button>
      </div>
    </div>
  );
}

export default GoalProgress;

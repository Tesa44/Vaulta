import { useUserAccounts } from "../contexts/UserAccountsContext";
import CircularProgressBar from "./CircularProgressBar";
import styles from "./GoalAccountDetails.module.css";
import Button from "./Button";
import GoalAccountDepositForm from "./GoalAccountDepositForm";
import { useEffect, useState } from "react";

function GoalAccountDetails() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);

  const { currentAccount } = useUserAccounts();

  useEffect(
    function () {
      const { balance, targetAmount } = currentAccount;
      setCurrentAmount(balance);
      setTargetAmount(targetAmount);
    },
    [currentAccount]
  );

  if (currentAccount.type !== "goal") {
    return <p>This account is not a goal account!</p>;
  }

  return (
    <div className={styles.container}>
      <h3>{currentAccount.name}</h3>
      <div className={styles.grid}>
        <div className={styles.progressBarBox}>
          <CircularProgressBar
            currentAmount={currentAmount}
            targetAmount={targetAmount}
          ></CircularProgressBar>
          <div className={styles.amounts}>
            <span className={styles.amount}>{currentAmount} PLN</span>
            <span className={styles.separator}>/</span>
            <span className={styles.amount}>{targetAmount} PLN</span>
          </div>
        </div>
        <GoalAccountDepositForm
          onDeposit={setCurrentAmount}
        ></GoalAccountDepositForm>
      </div>
    </div>
  );
}

export default GoalAccountDetails;

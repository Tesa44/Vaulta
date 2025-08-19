import { useUserAccounts } from "../../contexts/UserAccountsContext";
import CircularProgressBar from "../../ui/CircularProgressBar";
import styles from "./GoalAccountDetails.module.css";
import Button from "../../ui/Button";
import GoalAccountDepositForm from "./GoalAccountDepositForm";
import { useEffect, useState } from "react";

function GoalAccountDetails() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);

  const { currentAccount, getMainAccount, goalTransferMoney, loading } =
    useUserAccounts();

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

  async function handleWithdraw() {
    const mainAccount = getMainAccount();
    const success = await goalTransferMoney(
      currentAccount,
      mainAccount,
      currentAmount
    );
    if (success) {
      setCurrentAmount(0);
    }
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
          {currentAmount >= targetAmount && (
            <Button
              type="primaryGreen"
              disabled={loading}
              onClick={handleWithdraw}
            >
              {loading ? "Withdrawing..." : "Withdraw"}
            </Button>
          )}
        </div>
        <GoalAccountDepositForm
          onDeposit={setCurrentAmount}
        ></GoalAccountDepositForm>
      </div>
    </div>
  );
}

export default GoalAccountDetails;

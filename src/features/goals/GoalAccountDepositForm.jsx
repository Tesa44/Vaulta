import { useState, useEffect } from "react";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import styles from "./GoalAccountDepositForm.module.css";
import Button from "../../ui/Button";

function GoalAccountDepositForm({ onDeposit }) {
  const [amount, setAmount] = useState("");

  const {
    currentAccount,
    getMainAccount,
    error,
    clearError,
    loading,
    goalTransferMoney,
  } = useUserAccounts();
  const mainAccount = getMainAccount();

  async function handleSubmit(e) {
    e.preventDefault();

    const success = await goalTransferMoney(
      mainAccount,
      currentAccount,
      amount
    );
    if (success) {
      const newAmount = currentAccount.balance + Number(amount);
      onDeposit(newAmount);
      setAmount("");
    }
  }

  useEffect(
    function () {
      return () => clearError();
    },
    [clearError]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Deposit money to your goal</h2>
      <div className={styles.row}>
        <label htmlFor="iban">From account</label>
        <input
          type="text"
          value={`${mainAccount.name}  - ${mainAccount.balance} ${mainAccount.currency}`}
          disabled
        />
      </div>
      <div className={styles.row}>
        <label>{`You will deposit (${mainAccount.currency})`}</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <Button type="primary" disabled={loading}>
        {loading ? "Depositing..." : "Deposit Now"}
      </Button>
    </form>
  );
}

export default GoalAccountDepositForm;

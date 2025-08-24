import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GoalAccountForm.module.css";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import { useCurrencyRates } from "../../contexts/CurrencyRatesContext";
import Button from "../../ui/Button";

function GoalAccountForm() {
  const [name, setName] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const navigate = useNavigate();
  const { addAccount, loading, error } = useUserAccounts();

  const { baseCurrency } = useCurrencyRates();

  async function handleSubmit(e) {
    e.preventDefault();

    const accountData = {
      name,
      currency: baseCurrency,
      balance: deposit,
      targetAmount,
      type: "goal",
    };
    await addAccount(accountData);

    navigate("/app");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>New Goal Account</h2>

      <div className={styles.row}>
        <label htmlFor="name">Goal Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
      </div>
      <div className={styles.row}>
        <label htmlFor="targetAmount">Target amount ({baseCurrency})</label>
        <input
          type="number"
          id="targetAmount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value))}
        ></input>
      </div>
      <div className={styles.row}>
        <label htmlFor="deposit">Deposit ({baseCurrency})</label>
        <input
          type="number"
          id="deposit"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
        ></input>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <Button type="primary" disabled={loading}>
        {loading ? "Setting..." : "Set Goal"}
      </Button>
    </form>
  );
}

export default GoalAccountForm;

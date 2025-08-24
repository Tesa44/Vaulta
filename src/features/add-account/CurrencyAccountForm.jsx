import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CurrencyAccountForm.module.css";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import Button from "../../ui/Button";
import { topCurrencies } from "../../data/currencies";

function CurrencyAccountForm() {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("PLN");
  const [deposit, setDeposit] = useState(0);
  const navigate = useNavigate();
  const { addAccount, loading, error } = useUserAccounts();

  async function handleSubmit(e) {
    e.preventDefault();

    const accountData = {
      name,
      currency,
      balance: deposit,
      type: "currency",
    };
    await addAccount(accountData);

    navigate("/app");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>New Currency Account</h2>

      <div className={styles.row}>
        <label htmlFor="name">Account Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
      </div>
      <div className={styles.row}>
        <label htmlFor="currency">Currency</label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {topCurrencies.map((currency) => (
            <option value={currency.code}>
              {currency.name} - {currency.code}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label htmlFor="deposit">Deposit</label>
        <input
          type="number"
          id="deposit"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
        ></input>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      <Button type="primary" disabled={loading}>
        {loading ? "Opening account..." : "Open account"}
      </Button>
    </form>
  );
}

export default CurrencyAccountForm;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import styles from "./NewTransferForm.module.css";
import Button from "../../ui/Button";

function NewTransferForm({ toAccount, receiverFullname }) {
  const [fromAccount, setFromAccount] = useState({});
  const [title, setTitle] = useState("Fast Transfer via Vaulta");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const {
    transferMoney,
    loading,
    error,
    clearError,
    setCurrentAccount,
    accounts,
  } = useUserAccounts();

  async function handleSubmit(e) {
    e.preventDefault();

    const success = await transferMoney(
      toAccount?.iban,
      amount,
      title,
      receiverFullname
    );

    if (success) {
      navigate("/app/history");
    }
  }

  useEffect(
    function () {
      return () => clearError();
    },
    [clearError]
  );

  function handleSelectChange(e) {
    const selected = accounts.find((acc) => acc.id === e.target.value);
    if (!selected) return;
    setFromAccount(selected);
    setCurrentAccount(selected);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>New Transfer</h2>
      <div className={styles.row}>
        <label>From account ({fromAccount?.currency})</label>
        <select value={fromAccount.id} onChange={handleSelectChange}>
          <option value="">-- Choose account --</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({acc.currency})
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label htmlFor="iban">To account ({toAccount?.currency})</label>
        <input
          type="text"
          id="iban"
          name="iban"
          value={toAccount?.iban || ""}
          required
          disabled
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="title">Transfer Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="amount">Amount ({fromAccount?.currency})</label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <Button type="primaryGreen" disabled={loading}>
        {loading ? "Sending..." : "Send Transfer"}
      </Button>
    </form>
  );
}

export default NewTransferForm;

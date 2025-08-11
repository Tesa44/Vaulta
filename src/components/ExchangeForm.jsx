import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ExchangeForm.module.css";
import { useUserAccounts } from "../contexts/UserAccountsContext";
import Button from "./Button";

export default function ExchangeForm() {
  const [amount, setAmount] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const exchangeData = useLocation().state;
  const { type, currency, rate } = exchangeData;

  const {
    accounts,
    getMainAccount,
    getAccountsByCurrency,
    setCurrentAccount,
    currentAccount,
    transferMoney,
    error,
  } = useUserAccounts();

  const navigate = useNavigate();

  const mainAccount = getMainAccount();

  const selectableAccounts = getAccountsByCurrency(currency);

  function handleSelectChange(e) {
    const selectedId = e.target.value;
    setSelectedAccountId(selectedId);

    if (type === "sell") {
      const account = accounts.find((acc) => acc.id === selectedId);
      if (account) {
        setCurrentAccount(account);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fromAccount = type === "buy" ? mainAccount : currentAccount;
    const toAccount =
      type === "buy"
        ? accounts.find((acc) => acc.id === selectedAccountId)
        : mainAccount;

    if (!fromAccount || !toAccount) return;

    const success = await transferMoney(
      toAccount.iban,
      amount,
      type === "buy" ? "Currency purchase" : "Currency sale",
      `${fromAccount.name} to ${toAccount.name}`,
      { allowDifferentCurrencies: true, convertedAmount }
    );

    if (success) navigate("/app/history");
  }

  function handleAmount(e) {
    const newAmount = e.target.value;
    setAmount(newAmount);
    setConvertedAmount(
      (type === "buy"
        ? parseFloat(newAmount) / rate
        : parseFloat(newAmount) * rate
      ).toFixed(2)
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{type === "buy" ? "Buy Currency" : "Sell Currency"}</h2>

      {type === "buy" && (
        <div className={styles.row}>
          <label>Main account (source)</label>
          <input
            type="text"
            value={`${mainAccount.name}  - ${mainAccount.balance} ${mainAccount.currency}`}
            disabled
          />
        </div>
      )}

      {type === "sell" && (
        <div className={styles.row}>
          <label>Select account to sell from</label>
          <select value={selectedAccountId} onChange={handleSelectChange}>
            <option value="">-- Choose account --</option>
            {selectableAccounts.map((acc) => (
              <option key={acc.id} value={acc.iban}>
                {acc.name} ({acc.currency})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.row}>
        <label>{`Amount (${mainAccount.currency})`}</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => handleAmount(e)}
          required
        />
      </div>

      {type === "buy" && (
        <div className={styles.row}>
          <label>Choose target account</label>
          <select value={selectedAccountId} onChange={handleSelectChange}>
            <option value="">-- Choose account --</option>
            {selectableAccounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({acc.currency})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.row}>
        <label>You will receive ({currency || "..."})</label>
        <input type="number" value={convertedAmount} disabled />
      </div>

      {rate && (
        <p className={styles.rate}>
          Exchange rate: 1 {currency} = {rate} {currency}
        </p>
      )}
      <p className={styles.error}>{error}</p>
      <Button type="primary">Exchange</Button>
    </form>
  );
}

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ExchangeForm.module.css";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import Button from "../../ui/Button";

export default function ExchangeForm() {
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [fromAccount, setFromAccount] = useState({});
  const [toAccount, setToAccount] = useState({});

  const navigate = useNavigate();
  const exchangeData = useLocation().state;
  const { type, currency, rate } = exchangeData;

  const {
    getMainAccount,
    getAccountsByCurrency,
    exchangeMoney,
    error,
    loading,
    getBaseCurrency,
    clearError,
  } = useUserAccounts();

  const mainAccount = getMainAccount();
  const selectableAccounts = getAccountsByCurrency(currency);
  const baseCurrency = getBaseCurrency();

  useEffect(
    function () {
      if (type === "buy") {
        setFromAccount(mainAccount);
      }

      if (type === "sell") {
        setToAccount(mainAccount);
      }
    },
    [mainAccount, type]
  );

  useEffect(
    function () {
      return () => clearError();
    },
    [clearError]
  );

  function handleAmountFromChange(e) {
    const value = e.target.value;
    setAmountFrom(value);
    if (value === "") {
      setAmountTo("");
      return;
    }
    const exchanged =
      type === "buy"
        ? (parseFloat(value) / rate).toFixed(2)
        : (parseFloat(value) * rate).toFixed(2);
    setAmountTo(exchanged);
  }

  function handleAmountToChange(e) {
    const value = e.target.value;
    setAmountTo(value);
    if (value === "") {
      setAmountFrom("");
      return;
    }
    const exchanged =
      type === "buy"
        ? (parseFloat(value) * rate).toFixed(2)
        : (parseFloat(value) / rate).toFixed(2);
    setAmountFrom(exchanged);
  }

  function handleSelectChange(e) {
    const account = selectableAccounts.find((acc) => acc.id === e.target.value);
    if (type === "buy") {
      setToAccount(account);
    }
    if (type === "sell") {
      setFromAccount(account);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // if (!fromAccount || !toAccount) return;

    const success = await exchangeMoney(
      fromAccount,
      toAccount,
      amountFrom,
      amountTo
    );

    if (success) navigate("/app/history");
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
          <select value={fromAccount.id} onChange={handleSelectChange}>
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
        <label>{`You will pay (${fromAccount.currency})`}</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amountFrom}
          onChange={handleAmountFromChange}
          required
        />
      </div>

      {type === "buy" && (
        <div className={styles.row}>
          <label>Select account to sell from</label>
          <select value={toAccount.id} onChange={handleSelectChange}>
            <option value="">-- Choose account --</option>
            {selectableAccounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({acc.currency})
              </option>
            ))}
          </select>
        </div>
      )}
      {type === "sell" && (
        <div className={styles.row}>
          <label>Main account (source)</label>
          <input
            type="text"
            value={`${mainAccount.name}  - ${mainAccount.balance} ${mainAccount.currency}`}
            disabled
          />
        </div>
      )}

      <div className={styles.row}>
        <label>You will receive ({currency})</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amountTo}
          onChange={handleAmountToChange}
          required
        />
      </div>

      {rate && (
        <p className={styles.rate}>
          Exchange rate: 1 {currency} = {rate} {baseCurrency}
        </p>
      )}
      <p className={styles.error}>{error}</p>
      <Button type="primary" disabled={loading}>
        {loading ? "Exchanging..." : "Exchange"}
      </Button>
    </form>
  );
}

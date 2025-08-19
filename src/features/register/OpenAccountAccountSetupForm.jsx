import { useLocation, useNavigate } from "react-router-dom";
import styles from "./OpenAccountAccountSetupForm.module.css";
import Button from "../../ui/Button";
import { topCurrencies } from "../../data/currencies";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";

function OpenAccountAccountSetupForm() {
  const [currency, setCurrency] = useState("PLN");
  const [deposit, setDeposit] = useState(0);
  const navigate = useNavigate();

  const { register, isAuthenticated, loading, error, clearError } = useAuth();
  const user = useLocation().state;

  async function handleSubmit(e) {
    e.preventDefault();

    await register(user);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app");
      }
    },
    [isAuthenticated, navigate]
  );

  useEffect(
    function () {
      clearError();
    },
    [clearError]
  );

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            onChange={(e) => setDeposit(e.target.value)}
          ></input>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <Button type="primary" disabled={loading}>
          {loading ? "Opening account..." : "Open account"}
        </Button>
      </form>
    </div>
  );
}

export default OpenAccountAccountSetupForm;

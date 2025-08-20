import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TopBar.module.css";
import Button from "../../ui/Button";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import { useCurrencyRates } from "../../contexts/CurrencyRatesContext";
import { formatCurrency } from "../../utils/formatCurrency";

function TopBar() {
  const [totalBalance, setTotalBalance] = useState(0);

  const { accounts } = useUserAccounts();
  const { baseCurrency, rates } = useCurrencyRates();

  console.log(accounts);
  console.log(baseCurrency);
  console.log(rates);

  useEffect(
    function () {
      const newBalance = accounts.reduce((balance, acc) => {
        return balance + acc.balance * parseFloat(rates[acc.currency]);
      }, 0);
      setTotalBalance(newBalance);
    },
    [accounts, rates]
  );

  return (
    <div className={styles.topBar}>
      <div className={styles.box}>
        <h3>Total balance</h3>
        <p className={styles.totalAmount}>
          {formatCurrency(totalBalance, baseCurrency)}
        </p>
      </div>
      <div className={styles.box}>
        <h3>Fast transfer</h3>
        <p className={styles.transferSubheading}>
          Send money instantly with just a few clicks — anytime, anywhere.
        </p>
        <Link to="users">
          <Button type="primaryGreen">New transfer</Button>
        </Link>
      </div>

      {/* <div className={styles.warningBox}>
        <p>Account transactions to be assigned</p>
        <span className={styles.warningText}>
          Bring your accounting up to date.
        </span>
      </div> */}
    </div>
  );
}

export default TopBar;

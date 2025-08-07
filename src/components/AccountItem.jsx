import { useNavigate } from "react-router-dom";
import { useUserAccounts } from "../contexts/UserAccountsContext";
import styles from "./AccountItem.module.css";

function AccountItem({ account, isActive }) {
  const { setCurrentAccount } = useUserAccounts();
  const navigate = useNavigate();
  function handleSelectAccount() {
    setCurrentAccount(account);

    if (account.type === "goal") {
      navigate("/app/goal-progress");
    } else {
      navigate("/app/history");
    }
  }

  return (
    <li
      key={account.id}
      className={`${styles.accountCard} ${isActive ? styles.active : ""}`}
      onClick={handleSelectAccount}
    >
      <div className={styles.accountLabel}>{account.name}</div>
      <div className={styles.iban}>{account.iban}</div>
      <div className={styles.amountContainer}>
        <p> Available funds</p>
        <span className={styles.amount}>
          {account.balance} {account.currency}
        </span>
      </div>
    </li>
  );
}

export default AccountItem;

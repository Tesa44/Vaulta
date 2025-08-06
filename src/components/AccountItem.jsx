import { useUserAccounts } from "../contexts/UserAccountsContext";
import styles from "./AccountItem.module.css";

function AccountItem({ account, isActive }) {
  const { setCurrentAccount } = useUserAccounts();

  function handleSelectAccount() {
    setCurrentAccount(account);
  }

  return (
    <li
      key={account.id}
      className={`${styles.accountCard} ${isActive ? styles.active : ""}`}
      onClick={handleSelectAccount}
    >
      <div className={styles.accountLabel}>{account.name}</div>
      <div className={styles.iban}>DE61 1001 1001 2624 6231 64</div>
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

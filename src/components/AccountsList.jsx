import { useUserAccounts } from "../contexts/UserAccountsContext";
import styles from "./AccountsList.module.css";

function AccountsList() {
  const { accounts, currentAccount } = useUserAccounts();

  return (
    <ul className={styles.accountList}>
      {accounts.map((account) => (
        <li
          key={account.id}
          className={`${styles.accountCard} ${
            account.id === currentAccount.id ? styles.active : ""
          }`}
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
      ))}
    </ul>
  );
}

export default AccountsList;

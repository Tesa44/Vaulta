import styles from "./TransactionItem.module.css";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { useUserAccounts } from "../../contexts/UserAccountsContext";

function TransactionItem({ transaction }) {
  const { currentAccount } = useUserAccounts();

  return (
    <li
      className={`${styles.transactionItem} ${
        transaction.amount >= 0 ? styles["green"] : styles["red"]
      }`}
    >
      <div className={styles.transactionInfo}>
        <h4 className={styles.transactionTitle}>{transaction.title}</h4>
        <p className={styles.transactionTitle}>{transaction.name}</p>
        <span className={styles.transactionDate}>
          {formatDate(transaction.date)}
        </span>
      </div>
      <div className={styles.transactionAmount}>
        {formatCurrency(transaction.amount, currentAccount.currency)}
      </div>
      <div className={styles.balanceAfter}>
        <p>Balance after transaction</p>{" "}
        <span>
          {formatCurrency(transaction.balanceAfter, currentAccount.currency)}
        </span>
      </div>
    </li>
  );
}

export default TransactionItem;

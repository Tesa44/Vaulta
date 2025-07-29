import styles from "./TransactionItem.module.css";

const formatDate = (isoString) => {
  const options = {
    year: "numeric",
    month: "short", // np. Jul
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(isoString).toLocaleString("en-US", options);
};

function TransactionItem({ transaction }) {
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
      <div
        // className={`${styles.transactionAmount} ${
        //   transaction.amount >= 0 ? styles["green"] : styles["red"]
        // }`}
        className={styles.transactionAmount}
      >
        {transaction.amount}
      </div>
      <div className={styles.balanceAfter}>
        <p>Balance after transaction</p> <span>{transaction.balanceAfter}</span>
      </div>
    </li>
  );
}

export default TransactionItem;

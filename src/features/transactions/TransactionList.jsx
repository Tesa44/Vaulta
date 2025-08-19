import TransactionItem from "./TransactionItem";
import styles from "./TransactionList.module.css";

function TransactionList({ transactions }) {
  return (
    <div className={styles.box}>
      <ul className={styles.transactionList}>
        {transactions ? (
          transactions.map((transaction) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
            ></TransactionItem>
          ))
        ) : (
          <p>No transactions yet</p>
        )}
      </ul>
    </div>
  );
}

export default TransactionList;

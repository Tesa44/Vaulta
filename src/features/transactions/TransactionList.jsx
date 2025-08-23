import TransactionItem from "./TransactionItem";
import styles from "./TransactionList.module.css";

function TransactionList({ transactions }) {
  return (
    <ul className={styles.list}>
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
  );
}

export default TransactionList;

import TransactionItem from "./TransactionItem";
import styles from "./TransactionList.module.css";

const transactions = [
  {
    id: "txn001",
    title: "Dinner at La Piazza",
    name: "Anna Kowalska",
    amount: -54.3,
    balanceAfter: 3945.7,
    date: "2025-07-28T20:15:00Z",
  },
  {
    id: "txn002",
    title: "Salary – July",
    name: "Tech Solutions Ltd.",
    amount: 4500.0,
    balanceAfter: 4000.0,
    date: "2025-07-27T09:00:00Z",
  },
  {
    id: "txn003",
    title: "Rent Payment",
    name: "Marcin Nowak",
    amount: -2200.0,
    balanceAfter: 1500.0,
    date: "2025-07-25T13:30:00Z",
  },
  {
    id: "txn004",
    title: "Refund – Zalando",
    name: "Zalando SE",
    amount: 129.99,
    balanceAfter: 1629.99,
    date: "2025-07-23T16:45:00Z",
  },
  {
    id: "txn005",
    title: "Transfer to Savings",
    name: "Vaulta Savings Goal",
    amount: -300.0,
    balanceAfter: 1329.99,
    date: "2025-07-22T11:10:00Z",
  },
  {
    id: "txn006",
    title: "Transfer to Savings",
    name: "Vaulta Savings Goal",
    amount: -300.0,
    balanceAfter: 1329.99,
    date: "2025-07-22T11:10:00Z",
  },
  {
    id: "txn0057",
    title: "Transfer to Savings",
    name: "Vaulta Savings Goal",
    amount: -300.0,
    balanceAfter: 1329.99,
    date: "2025-07-22T11:10:00Z",
  },
  {
    id: "txn0058",
    title: "Transfer to Savings",
    name: "Vaulta Savings Goal",
    amount: -300.0,
    balanceAfter: 1329.99,
    date: "2025-07-22T11:10:00Z",
  },
];

function TransactionList() {
  return (
    <div className={styles.box}>
      <ul className={styles.transactionList}>
        {transactions.map((transaction) => (
          <TransactionItem
            transaction={transaction}
            key={transaction.id}
          ></TransactionItem>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;

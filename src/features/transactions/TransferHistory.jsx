import { useState, useEffect } from "react";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import styles from "./TransferHistory.module.css";
import TransactionList from "./TransactionList";
import TransactionSearchForm from "./TransactionSearchForm";

function TransferHistory() {
  const [filters, setFilters] = useState({
    query: "",
    sortBy: "date-desc",
    type: "all",
  });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const { currentAccount } = useUserAccounts();
  const transactions = currentAccount.transactions;

  useEffect(
    function () {
      if (!transactions) return;

      const filteredTransactions = transactions
        .filter((t) =>
          t.title.toLowerCase().includes(filters.query.toLowerCase())
        )
        .filter((t) => {
          if (filters.type === "all") return true;
          if (filters.type === "send") return t.amount < 0;
          if (filters.type === "received") return t.amount > 0;
          return true;
        })
        .sort((a, b) => {
          switch (filters.sortBy) {
            case "date-desc":
              return new Date(b.date) - new Date(a.date);
            case "date-asc":
              return new Date(a.date) - new Date(b.date);
            case "amount-desc":
              return b.amount - a.amount;
            case "amount-asc":
              return a.amount - b.amount;
            default:
              return 0;
          }
        });
      setFilteredTransactions(filteredTransactions);
    },
    [transactions, filters]
  );

  return (
    <div className={styles.historyBox}>
      <h3>History</h3>
      <TransactionSearchForm onChange={setFilters}></TransactionSearchForm>
      <div className={styles.list}>
        <TransactionList transactions={filteredTransactions}></TransactionList>
      </div>
    </div>
  );
}

export default TransferHistory;

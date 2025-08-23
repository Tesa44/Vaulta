import { useState, useEffect } from "react";
import styles from "./TransactionHistory.module.css";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import TransactionList from "./TransactionList";
import TransactionSearchForm from "./TransactionSearchForm";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";

function TransactionHistory() {
  const [filters, setFilters] = useState({
    query: "",
    sortBy: "date-desc",
    type: "all",
  });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const { currentAccount, loading, error } = useUserAccounts();
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
    <div className={styles.container}>
      <h3>History</h3>
      <TransactionSearchForm onChange={setFilters}></TransactionSearchForm>
      {loading && <Loader></Loader>}
      {error && <ErrorMessage message={error}></ErrorMessage>}
      <TransactionList transactions={filteredTransactions}></TransactionList>
    </div>
  );
}

export default TransactionHistory;

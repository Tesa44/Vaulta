import { useState, useEffect } from "react";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import TransactionList from "./TransactionList";
import TransactionSearchForm from "./TransactionSearchForm";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import SectionHeader from "../../ui/SectionHeader";

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
    <>
      <SectionHeader title="History" showBack={false} />
      <TransactionSearchForm onChange={setFilters} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <TransactionList transactions={filteredTransactions} />
    </>
  );
}

export default TransactionHistory;

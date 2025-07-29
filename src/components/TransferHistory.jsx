import { useState } from "react";

import styles from "./TransferHistory.module.css";
import Button from "./Button";
import TransactionList from "./TransactionList";

function TransferHistory({ onSearch }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [type, setType] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, sortBy, type });
  };
  return (
    <div className={styles.historyBox}>
      <h3>History</h3>

      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.select}
        >
          <option value="date-desc">Date ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="amount-desc">Amount ↓</option>
          <option value="amount-asc">Amount ↑</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.select}
        >
          <option value="all">All</option>
          <option value="send">Sent</option>
          <option value="received">Received</option>
        </select>

        <Button type="search">Search</Button>
      </form>
      <TransactionList></TransactionList>
    </div>
  );
}

export default TransferHistory;

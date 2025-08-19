import { useEffect, useState } from "react";
import styles from "./GoalAccountsSearchForm.module.css";

function GoalAccountsSearchForm({ onChange }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("percentage-asc");

  useEffect(
    function () {
      onChange({ query, sortBy });
    },
    [query, sortBy, onChange]
  );

  return (
    <form className={styles.searchForm}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search goals by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="percentage-asc">Percentage &uarr;</option>
        <option value="percentage-desc">Percentage &darr;</option>
      </select>
    </form>
  );
}

export default GoalAccountsSearchForm;

import { useEffect, useState } from "react";
import styles from "./UserSearchForm.module.css";

function UserSearchForm({ onChange }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("alphabet-asc");

  function handleSubmit(e) {
    e.preventDefault();
    onChange({ query, sortBy });
  }

  useEffect(
    function () {
      onChange({ query, sortBy });
    },
    [query, sortBy, onChange]
  );

  return (
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
        <option value="alphabet-asc">A-Z ↑</option>
        <option value="alphabet-desc">Z-A ↓</option>
      </select>
    </form>
  );
}

export default UserSearchForm;

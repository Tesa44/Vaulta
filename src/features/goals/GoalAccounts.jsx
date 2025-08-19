import styles from "./GoalAccounts.module.css";
import BackButton from "../../ui/BackButton";
import GoalAccountsList from "./GoalAccountsList";
import GoalAccountsSearchForm from "./GoalAccountsSearchForm";
import { useEffect, useState } from "react";
import { useUserAccounts } from "../../contexts/UserAccountsContext";

function GoalAccounts() {
  const [filters, setFilters] = useState({
    query: "",
    sortBy: "percentage-desc",
  });
  const [goalAccounts, setGoalAccounts] = useState([]);
  const [filteredGoalAccounts, setFilteredGoalAccounts] = useState([]);
  const { accounts } = useUserAccounts();

  useEffect(
    function () {
      const goalAccs = accounts.filter((acc) => acc.type === "goal");
      setGoalAccounts(goalAccs);
    },
    [accounts]
  );

  useEffect(
    function () {
      if (!goalAccounts) return;

      const filtered = goalAccounts
        .filter((g) =>
          g.name.toLowerCase().includes(filters.query.toLowerCase())
        )
        .sort((a, b) => {
          switch (filters.sortBy) {
            case "percentage-desc":
              return a.balance / a.targetAmount - b.balance / b.targetAmount;
            case "percentage-asc":
              return b.balance / b.targetAmount - a.balance / a.targetAmount;

            default:
              return 0;
          }
        });
      setFilteredGoalAccounts(filtered);
    },
    [filters, goalAccounts]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>My goals</h3>
        <BackButton></BackButton>
      </div>
      <GoalAccountsSearchForm onChange={setFilters}></GoalAccountsSearchForm>
      <GoalAccountsList goalAccounts={filteredGoalAccounts}></GoalAccountsList>
    </div>
  );
}

export default GoalAccounts;

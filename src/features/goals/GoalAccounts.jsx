import { useEffect, useState } from "react";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import GoalAccountsList from "./GoalAccountsList";
import GoalAccountsSearchForm from "./GoalAccountsSearchForm";
import SectionHeader from "../../ui/SectionHeader";

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
    <>
      <SectionHeader title="My goals" />
      <GoalAccountsSearchForm onChange={setFilters} />
      <GoalAccountsList goalAccounts={filteredGoalAccounts} />
    </>
  );
}

export default GoalAccounts;

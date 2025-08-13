import { useEffect, useState } from "react";
import { useUserAccounts } from "../contexts/UserAccountsContext";
import styles from "./GoalAccountsList.module.css";
import GoalAccountsItem from "./GoalAccountsItem";

function GoalAccountsList() {
  const [goalAccounts, setGoalAccounts] = useState([]);

  const { accounts } = useUserAccounts();

  useEffect(
    function () {
      const goalAccs = accounts.filter((acc) => acc.type === "goal");
      setGoalAccounts(goalAccs);
    },
    [accounts]
  );

  return (
    <ul className={styles.goalList}>
      {goalAccounts.map((goal) => (
        <GoalAccountsItem goal={goal}></GoalAccountsItem>
      ))}
    </ul>
  );
}

export default GoalAccountsList;

import { useNavigate } from "react-router-dom";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import styles from "./GoalAccountsItem.module.css";
import StraightProgressBar from "../../ui/StraightProgressBar";

function GoalAccountsItem({ goal }) {
  const { setCurrentAccount } = useUserAccounts();
  const navigate = useNavigate();

  function handleClick() {
    setCurrentAccount(goal);
    navigate("/app/goal-progress");
  }

  return (
    <li key={goal.id} className={styles.card} onClick={handleClick}>
      <div className={styles.name}>{goal.name}</div>
      <StraightProgressBar
        current={goal.balance}
        target={goal.targetAmount}
        className={`${styles.progressHover}`}
      ></StraightProgressBar>
    </li>
  );
}

export default GoalAccountsItem;

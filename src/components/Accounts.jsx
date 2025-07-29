import styles from "./Accounts.module.css";
import AccountsList from "./AccountsList";
import Button from "./Button";

function Accounts() {
  return (
    <div className={styles.accounts}>
      <div className={styles.header}>
        <h3>My active accounts</h3>
      </div>

      <AccountsList></AccountsList>
      <Button type="light">+ Add New</Button>
    </div>
  );
}

export default Accounts;

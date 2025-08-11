import styles from "./Accounts.module.css";
import AccountsList from "./AccountsList";
import Button from "./Button";

function Accounts() {
  return (
    <div className={styles.accounts}>
      <div className={styles.header}>
        <h3>My active accounts</h3>
        <Button type="light" to="new-account">
          + Add New
        </Button>
      </div>
      <div className={styles.list}>
        <AccountsList></AccountsList>
      </div>
    </div>
  );
}

export default Accounts;

import styles from "./Accounts.module.css";
import AccountsList from "./AccountsList";
import Button from "../../ui/Button";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";

function Accounts() {
  const { loading, error } = useUserAccounts();

  return (
    <div className={styles.accounts}>
      <div className={styles.header}>
        <h3>My active accounts</h3>
        <Button type="light" to="add-account">
          + Add New
        </Button>
      </div>
      <div className={styles.list}>
        {loading && <Loader></Loader>}
        {error && <ErrorMessage message={error}></ErrorMessage>}
        <AccountsList></AccountsList>
      </div>
    </div>
  );
}

export default Accounts;

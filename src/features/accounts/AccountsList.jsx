import { useUserAccounts } from "../../contexts/UserAccountsContext";
import AccountItem from "./AccountItem";
import styles from "./AccountsList.module.css";

function AccountsList() {
  const { accounts, currentAccount } = useUserAccounts();

  return (
    <ul className={styles.accountList}>
      {accounts.map((account) => (
        <AccountItem
          account={account}
          isActive={account.id === currentAccount.id}
        ></AccountItem>
      ))}
    </ul>
  );
}

export default AccountsList;

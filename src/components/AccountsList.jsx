import styles from "./AccountsList.module.css";

function AccountsList() {
  return (
    <ul className={styles.accountList}>
      {[1, 2, 3, 4].map((_, i) => (
        <li key={i} className={styles.accountCard}>
          <div className={styles.accountLabel}>Apple pay firma</div>
          <div className={styles.iban}>DE61 1001 1001 2624 6231 64</div>
          <div className={styles.amountContainer}>
            <p> Available funds</p>
            <span className={styles.amount}>5.756,27 €</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AccountsList;

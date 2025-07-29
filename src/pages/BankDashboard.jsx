import styles from "./BankDashboard.module.css";

export default function BankDashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.logo}>OSneo</div>
        <nav className={styles.nav}>
          <a>Dashboard</a>
          <a>Kasse</a>
          <a>Receipts</a>
          <a>Contacts</a>
        </nav>
        <div className={styles.user}>
          <div className={styles.notification}></div>
          <div className={styles.avatar}>Minhas</div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h2>Bank overview</h2>
          <div className={styles.tabs}>
            <button className={styles.activeTab}>Overview</button>
            <button>Assignment suggestions</button>
            <button>Not assigned</button>
            <button>Transfers</button>
          </div>
          <button className={styles.newTransferBtn}>New transfer</button>
        </div>

        <div className={styles.contentGrid}>
          {/* Left: Accounts */}
          <section className={styles.accounts}>
            <div className={styles.sectionHeader}>
              <h3>My active accounts</h3>
              <button className={styles.addNewBtn}>+ Add new</button>
            </div>

            <ul className={styles.accountList}>
              {[1, 2, 3, 4].map((_, i) => (
                <li key={i} className={styles.accountCard}>
                  <div className={styles.amount}>5.756,27 €</div>
                  <div className={styles.accountLabel}>Apple pay firma</div>
                  <div className={styles.iban}>DE61 1001 1001 2624 6231 64</div>
                </li>
              ))}
            </ul>
          </section>

          {/* Right: Summary and transactions */}
          <section className={styles.summary}>
            <div className={styles.balanceBox}>
              <h3>Total balance</h3>
              <p className={styles.totalAmount}>13.756,27 €</p>
            </div>

            <div className={styles.warningBox}>
              <p>Account transactions to be assigned</p>
              <span className={styles.warningText}>
                Bring your accounting up to date.
              </span>
            </div>

            <div className={styles.transactionSearch}>
              <input type="text" placeholder="Search for transactions..." />
              <input type="date" />
            </div>

            <ul className={styles.transactionList}>
              <li className={styles.transactionItem}>
                <div className={styles.transactionInfo}>
                  <p className={styles.transactionTitle}>Test</p>
                  <span className={styles.statusGreen}>ASSIGNED</span>
                  <span className={styles.transactionDate}>Nov 22 2024</span>
                </div>
                <div className={styles.transactionAmount}>5.756,27 €</div>
                <div className={styles.assignments}>4 ASSIGNMENTS</div>
              </li>

              <li className={styles.transactionItem}>
                <div className={styles.transactionInfo}>
                  <p>Example</p>
                  <span className={styles.transactionDate}>Dec 15 2025</span>
                </div>
                <div className={styles.transactionAmount}>10.99,45 €</div>
                <a className={styles.link}>ASSIGN DOCUMENT</a>
              </li>

              {/* Add more transaction items as needed */}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

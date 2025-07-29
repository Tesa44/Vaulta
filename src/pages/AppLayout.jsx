import Accounts from "../components/Accounts";
import AppNav from "../components/AppNav";
import TopBar from "../components/TopBar";
import TransferHistory from "../components/TransferHistory";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.dashboard}>
      <AppNav></AppNav>

      <main className={styles.main}>
        {/* <div className={styles.topBar}>
          <h2>Bank overview</h2>
          <div className={styles.tabs}>
            <button className={styles.activeTab}>Overview</button>
            <button>Assignment suggestions</button>
            <button>Not assigned</button>
            <button>Transfers</button>
          </div>
          <button className={styles.newTransferBtn}>New transfer</button>
        </div> */}

        <div className={styles.contentGrid}>
          {/* Left: Accounts */}
          <Accounts></Accounts>

          {/* Right: Summary and transactions */}
          <section className={styles.summary}>
            <TopBar></TopBar>
            <TransferHistory></TransferHistory>
            {/* <div className={styles.transactionSearch}>
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

            
            </ul> */}
          </section>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;

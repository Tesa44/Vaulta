import { Outlet } from "react-router-dom";
import Accounts from "../components/Accounts";
import AppNav from "../components/AppNav";
import TopBar from "../components/TopBar";
import TransferForm from "../components/TransferForm";
import TransferHistory from "../components/TransferHistory";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.dashboard}>
      <AppNav></AppNav>
      <main className={styles.main}>
        <div className={styles.contentGrid}>
          <Accounts></Accounts>
          <section className={styles.details}>
            <TopBar></TopBar>
            {/* <TransferHistory></TransferHistory> */}
            {/* <TransferForm></TransferForm> */}
            <Outlet></Outlet>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;

import { Outlet } from "react-router-dom";
import Accounts from "../components/Accounts";
import AppNav from "../components/AppNav";
import TopBar from "../components/TopBar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.dashboard}>
      <AppNav></AppNav>
      <main className={styles.main}>
        <Accounts></Accounts>
        <section className={styles.details}>
          <TopBar></TopBar>
          <Outlet></Outlet>
        </section>
      </main>
    </div>
  );
}

export default AppLayout;

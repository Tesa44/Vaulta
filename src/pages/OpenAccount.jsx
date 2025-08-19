import { Outlet } from "react-router-dom";
import styles from "./OpenAccount.module.css";
import BackButton from "../ui/BackButton";
import PageNav from "../layout/PageNav";

function OpenAccount() {
  return (
    <>
      <PageNav></PageNav>
      <main className={styles.openAccount}>
        <section>
          <div className={styles.backButton}>
            <BackButton></BackButton>
          </div>
          <h2>Open your Vaulta account</h2>
          <p>Fast. Simple. Yours. Let's get you started.</p>
          <Outlet></Outlet>
        </section>
        <div className={styles.containerImage}>
          <img src="/open-account.png" alt="register bank account"></img>
        </div>
      </main>
    </>
  );
}

export default OpenAccount;

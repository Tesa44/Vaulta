import styles from "./OpenAccount.module.css";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import PageNav from "../components/PageNav";

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
          <form className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="name">Name</label>
              <input type="name" id="name"></input>
            </div>
            <div className={styles.row}>
              <label htmlFor="surname">Surname</label>
              <input type="surname" id="surname"></input>
            </div>
            <div className={styles.row}>
              <label htmlFor="email">Email address</label>
              <input type="email" id="email"></input>
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password"></input>
            </div>
            <div className={styles.row}>
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input type="password" id="repeatPassword"></input>
            </div>
            <Button type="primary">Open account</Button>
          </form>
        </section>
        <div className={styles.containerImage}>
          <img src="/open-account.png" alt="register bank account"></img>
        </div>
      </main>
    </>
  );
}

export default OpenAccount;

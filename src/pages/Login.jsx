import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <PageNav></PageNav>
      <main className={styles.login}>
        <section>
          <h2>It's good to see you again!</h2>
          <p className={styles.subheading}>
            Welcome back to your secure Vaulta space. We’ve kept everything safe
            while you were away.
          </p>
          <form className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="email">Email address</label>
              <input type="email" id="email"></input>
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password"></input>
            </div>
            <Button type="primary">Login</Button>
          </form>
          <div class={styles.loginFooter}>
            <p>
              Forgot your password?
              <Link href="/reset-password"> Click here to reset it</Link>
            </p>
            <p>
              Don’t have an account yet?
              <Link to="open-account"> Open one now!</Link>
            </p>
            <p class={styles.disclaimer}>
              Your data is protected with bank-level encryption and
              industry-leading security standards.
            </p>
          </div>
        </section>
        <div className={styles.containerImage}>
          <img src="login.png" alt="login to bank account"></img>
        </div>
      </main>
    </>
  );
}

export default Login;

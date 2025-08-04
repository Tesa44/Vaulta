import { useEffect, useState } from "react";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated, clearError } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app");
      }
    },
    [isAuthenticated, navigate]
  );

  useEffect(function () {
    clearError();
  }, []);

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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <Button type="primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className={styles.loginFooter}>
            <p>
              Forgot your password?
              <Link href="/reset-password"> Click here to reset it</Link>
            </p>
            <p>
              Don’t have an account yet?
              <Link to="open-account"> Open one now!</Link>
            </p>
            <p className={styles.disclaimer}>
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

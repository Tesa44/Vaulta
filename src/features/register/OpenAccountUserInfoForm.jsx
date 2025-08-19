import styles from "./OpenAccountUserInfoForm.module.css";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function OpenAccountUserInfoForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      //   setPassword("");
      //   setConfirmPassword("");
      console.log("password do not match");
      return;
    }

    navigate("/open-account/2", {
      state: { name, surname, email, password },
    });
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handlesubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className={styles.row}>
          <label htmlFor="surname">Surname</label>
          <input
            type="surname"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          ></input>
        </div>
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
        <div className={styles.row}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
        </div>
        {error && <p>{error}</p>}
        <Button type="primary">Next</Button>
      </form>
    </div>
  );
}

export default OpenAccountUserInfoForm;

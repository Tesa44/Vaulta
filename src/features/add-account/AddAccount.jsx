import { Outlet } from "react-router-dom";
import styles from "./AddAccount.module.css";
import BackButton from "../../ui/BackButton";

function AddAccount() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Add new account</h3>
        <BackButton></BackButton>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default AddAccount;

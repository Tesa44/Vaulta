import { Outlet } from "react-router-dom";
import styles from "./NewAccountLayout.module.css";
import BackButton from "../ui/BackButton";

function NewAccountLayout() {
  return (
    <div>
      <div className={styles.header}>
        <h3>Add new account in two steps</h3>
        <BackButton></BackButton>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default NewAccountLayout;

import { Outlet } from "react-router-dom";
import styles from "./Cantor.module.css";
import BackButton from "../../ui/BackButton";

export default function CurrencyExchange() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Currency Exchange</h3>
        <BackButton></BackButton>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import BackButton from "../../ui/BackButton";
import styles from "./CurrencyExchange.module.css";

export default function CurrencyExchange() {
  return (
    <div className={styles.exchangeContainer}>
      <div className={styles.header}>
        <h3>Currency Exchange</h3>
        <BackButton></BackButton>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

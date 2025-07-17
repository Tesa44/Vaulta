import styles from "./Logo.module.css";

function Logo() {
  return (
    <div>
      <img
        src="/vaulta-logo.png"
        alt="vaulta logo"
        className={styles.logo}
      ></img>
    </div>
  );
}

export default Logo;

import styles from "./SectionHeader.module.css";
import BackButton from "./BackButton";

function SectionHeader({ title, showBack = true, className }) {
  return (
    <div className={`${styles.header} ${className || ""}`}>
      <h3>{title}</h3>
      {showBack && <BackButton></BackButton>}
    </div>
  );
}

export default SectionHeader;

import PageNav from "../layout/PageNav";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <header>
        <PageNav></PageNav>
      </header>
      <main>
        <section className={styles.sectionHomepage}>
          <h1>Your money. Your fortress.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam aperiam
            amet quidem eum nobis dolorum eveniet? Debitis voluptatibus
            praesentium fugit, consequatur, alias ut ea soluta tenetur quia
            obcaecati provident saepe!
          </p>
          <ul>
            <li>
              <span>⚡</span>Instant transactions
            </li>
            <li>
              <span>🌍</span>Payments worlwide
            </li>
            <li>
              <span>💸</span>Saving accounts
            </li>
            <li>
              <span>💱</span>multi-currency
            </li>
          </ul>
          <div className={styles.containerButtons}>
            <Link to="/open-account" className="cta">
              Open account
            </Link>
            <Link to="features" className={styles.btnCompare}>
              Compare Cards &rarr;
            </Link>
          </div>
        </section>
        <div className={styles.containerImage}>
          <img src="/cards.png" alt="bank cards and coins"></img>
        </div>
      </main>
    </div>
  );
}

export default Homepage;

import { Link } from "react-router-dom";
import wallpaper from "../../assets/wallpaper_landing.jpg";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <img src={wallpaper} alt="wallpaper" />

      <div className={styles.goToHomeButton}>
        <div className={styles.buttonDiv}>
          <Link to={"/home"}>
            <button>GO TO HOME</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

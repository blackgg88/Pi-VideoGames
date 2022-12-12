import { Link } from "react-router-dom";
import gameover from "../../assets/gameover.jpg";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>
        ERROR <span>404</span>
      </h1>
      <img src={gameover} alt="wallpaper" />

      <div className={styles.goToHomeButton}>
        <div className={styles.buttonDiv}>
          <Link to={"/home"}>
            <button>BACK TO HOME</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

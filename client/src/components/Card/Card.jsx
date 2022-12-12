import styles from "./Card.module.css";
import tags from "../../assets/tag-svgrepo-com.svg";

export default function Card({ id, image, name, genres }) {
  const genresShow = genres.length && genres.join(", ");
  return (
    <div id={id} className={styles.card}>
      <div className={styles.info}>
        <img className={styles.image} src={image} alt={name} />

        <div className={styles.content}>
          <h3>{name}</h3>

          <div className={styles.genres}>
            {genres.length && (
              <div>
                <img src={tags} alt="icon" />
                <h5>{genresShow}</h5>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.name__grid}>{name}</div>
    </div>
  );
}

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDeatails, clearDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";
import tag from "../../assets/tag-svgrepo-com.svg";
import clock from "../../assets/clock-svgrepo-com.svg";
import computer from "../../assets/computer-svgrepo-com.svg";
import rating from "../../assets/rating-svgrepo-com.svg";
import logo from "../../assets/logo2.png";
import loader from "../../assets/loader_1308.gif";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDeatails(id));
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  return (
    <>
      {!detail.name ? (
        <div className={styles.loader}>
          <img src={loader} alt="loader" />
        </div>
      ) : (
        <div>
          <div className={styles.image}>
            <img src={detail.image} alt={detail.name} />
            <div className={styles.logo}>
              <Link to={"/home"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className={styles.backButton}>
              <Link to={-1}>
                <button>BACK</button>
              </Link>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.description}>
              <div>
                <h1>
                  ABOUT <span>{detail.name}</span>
                </h1>
              </div>
              <div>
                {detail.description?.split(/<\/?[^>]+>/gi).map((e) => (
                  <p key={e}>{e.replace(/&#39;/g, "'")}</p>
                ))}
              </div>
            </div>

            <div className={styles.details}>
              <h1>
                GAME <span>DETAILS</span>
              </h1>
              <div className={styles.genres}>
                <img src={tag} alt="tag" />
                <h4>GENRES: </h4>
                <i>
                  {detail.genres?.length
                    ? detail.genres && detail.genres.join(", ")
                    : "No Genres assigned to game"}
                </i>
              </div>

              <div className={styles.platforms}>
                <img src={computer} alt="computer" />
                <h4>PLATFORMS: </h4>
                <i>
                  {detail.platforms?.length
                    ? detail.platforms && detail.platforms.join(", ")
                    : "No Platforms registered"}
                </i>
              </div>
              <div className={styles.realsed}>
                <img src={clock} alt="clock" />
                <h4>RELEASE DATE: </h4>
                <i>{detail.release_date}</i>
              </div>
              <div className={styles.rating}>
                <img src={rating} alt="rating" />
                <h4>RATING:</h4>
                <i>{detail.rating}</i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

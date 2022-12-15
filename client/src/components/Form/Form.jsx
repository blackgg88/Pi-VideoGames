import { useState } from "react";
import {
  postVideogame,
  getPlatforms,
  getGenres,
  clearVideoGames,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Form.module.css";
import frontImage from "../../assets/pexels-photo-3165335.jpeg";
import logo from "../../assets/logo2.png";
import { Link } from "react-router-dom";
import { validateInput } from "./validation";
import { useEffect } from "react";

export default function Form() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  let platforms = useSelector((state) => state.platforms);

  platforms = [...new Set(platforms.map((pl) => pl.name))];

  useEffect(() => {
    !platforms.length && dispatch(getPlatforms());
    !genres.length && dispatch(getGenres());
  }, []);

  const [game, setGame] = useState({
    name: "",
    description: "",
    image: "",
    release_date: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    release_date: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  const handleInputChange = (e) => {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    });

    setErrors(validateInput({ ...game, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postVideogame(game));
    dispatch(clearVideoGames());

    setGame({
      name: "",
      description: "",
      image: "",
      release_date: "",
      rating: "",
      genres: [],
      platforms: [],
    });
  };

  const handleSelect = (e) => {
    setGame({
      ...game,
      [e.target.name]: [...new Set([...game[e.target.name], e.target.value])],
    });
    setErrors(
      validateInput({
        ...game,
        [e.target.name]: [...new Set([...game[e.target.name], e.target.value])],
      })
    );
  };

  const handleDeleteGenre = (e) => {
    setGame({
      ...game,
      genres: game.genres.filter((gen) => gen !== e.target.value),
    });
  };

  const handleDeletePlatform = (e) => {
    setGame({
      ...game,
      platforms: game.platforms.filter((pl) => pl !== e.target.value),
    });
  };

  return (
    <>
      <div className={styles.front}>
        <img src={frontImage} alt="frontImage" />
      </div>
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
      <div className={styles.wrapper}>
        <h1>
          CREATE <span>VIDEOGAME</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputNameReleased}>
            <div className={styles.name}>
              <input
                placeholder="Name"
                type="text"
                name="name"
                value={game.name}
                onChange={handleInputChange}
              />
              <div className={styles.error}>{errors.name && errors.name}</div>
            </div>

            <div className={styles.released}>
              <input
                placeholder="Release Date: AAAA-MM-DD"
                type="text"
                name="release_date"
                value={game.release_date}
                onChange={handleInputChange}
              />
              <div className={styles.error}>
                {errors.released && errors.released}
              </div>
            </div>
          </div>

          <div className={styles.inputImageRating}>
            <div className={styles.image}>
              <input
                placeholder="Image"
                type="text"
                name="image"
                value={game.image}
                onChange={handleInputChange}
              />
              <div className={styles.error}>{errors.image && errors.image}</div>
            </div>

            <div className={styles.rating}>
              <input
                placeholder="Rating"
                type="text"
                name="rating"
                value={game.rating}
                onChange={handleInputChange}
              />
              <div className={styles.error}>
                {errors.rating && errors.rating}
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <textarea
              placeholder="Description..."
              name="description"
              value={game.description}
              onChange={handleInputChange}
            />
            <div className={styles.error}>
              {errors.description && errors.description}
            </div>
          </div>

          <div className={styles.selectBox}>
            <div className={styles.selectGenre}>
              <select onChange={handleSelect} name="genres">
                <option selected hidden>
                  CHOOSE GENRE
                </option>
                {genres?.map((gen) => (
                  <option key={gen.name} value={gen.name}>
                    {gen.name}
                  </option>
                ))}
              </select>

              <div className={styles.genresSelected}>
                {game.genres?.map((gen) => (
                  <li key={gen}>
                    {gen}
                    <button value={gen} onClick={handleDeleteGenre}>
                      X
                    </button>
                  </li>
                ))}
                <div className={styles.error}>
                  {errors.genres && errors.genres}
                </div>
              </div>
            </div>

            <div className={styles.selectPlatform}>
              <select onChange={handleSelect} name="platforms">
                <option selected hidden>
                  CHOOSE PLATFORM
                </option>
                {platforms?.map((pl) => (
                  <option key={pl} value={pl}>
                    {pl}
                  </option>
                ))}
              </select>
              <div className={styles.platformsSelected}>
                {game.platforms?.map((pl) => (
                  <li key={pl}>
                    {pl}
                    <button value={pl} onClick={handleDeletePlatform}>
                      x
                    </button>
                  </li>
                ))}
                <div className={styles.error}>
                  {errors.platforms && errors.platforms}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.addButton}>
            <button
              type="submit"
              disabled={
                errors.name ||
                errors.description ||
                errors.rating ||
                errors.released ||
                errors.image ||
                errors.genres ||
                errors.platforms
              }
            >
              ADD VIDEOGAME
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

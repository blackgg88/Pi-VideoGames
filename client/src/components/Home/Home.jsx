import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import frontImage from "../../assets/pexels-photo-3165335.jpeg";
import logo from "../../assets/logo2.png";
import loader from "../../assets/loader_1308.gif";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenres,
  getPlatforms,
  orderByName,
  genresFilter,
  platformsFilter,
  filterByCreated,
  clearVideoGames,
  setFilter,
  clearFilters,
  setPage,
  getCopyGames,
} from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.allVideogames);
  const page = useSelector((state) => state.page);
  const filters = useSelector((state) => state.filters);
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  let platforms = useSelector((state) => state.platforms);

  platforms = [...new Set(platforms.map((pl) => pl.name))];

  const howManyGames = 12;
  const lastIndex = page * howManyGames;
  const firstIndex = lastIndex - howManyGames;

  const showGames = videogames.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(videogames?.length / howManyGames);

  function handleFilters() {
    dispatch(orderByName(filters.order));
    dispatch(genresFilter(filters.genres));
    dispatch(platformsFilter(filters.platforms));
    dispatch(filterByCreated(filters.origin));
  }

  useEffect(() => {
    !allVideogames.length && dispatch(getVideogames());
    !platforms.length && dispatch(getPlatforms());
    !genres.length && dispatch(getGenres());
    handleFilters();
  }, [filters]);

  function handleOrder(e) {
    dispatch(setPage(1));
    dispatch(setFilter({ order: e.target.value }));
  }

  function handleFilterGenre(e) {
    dispatch(setPage(1));
    dispatch(setFilter({ genres: e.target.value }));
  }

  function handleFilterPlatform(e) {
    dispatch(setPage(1));
    dispatch(setFilter({ platforms: e.target.value }));
  }

  function handleFilterCreated(e) {
    dispatch(setPage(1));
    dispatch(setFilter({ origin: e.target.value }));
  }

  function handleAllGames() {
    dispatch(clearVideoGames());
    dispatch(clearFilters());
    dispatch(getCopyGames());
    dispatch(setPage(1));
  }

  function handleCreatedGame() {
    dispatch(clearFilters());
    dispatch(setPage(1));
  }

  return (
    <div>
      <div className={styles.front}>
        <img src={frontImage} alt="frontImage" />
      </div>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles.createButton}>
        <Link to={"/videogame"}>
          <button onClick={handleCreatedGame}>Create VideoGame</button>
        </Link>
      </div>

      <div className={styles.allVideoGames}>
        <button onClick={handleAllGames}>All VideoGames</button>
      </div>

      <div className={styles.wrapper_filter}>
        <div className={styles.filter_container}>
          <select onChange={handleOrder}>
            <option selected hidden>
              Choose Order
            </option>
            <option value="asc" selected={filters.order === "asc"}>
              A-Z
            </option>

            <option value="desc" selected={filters.order === "desc"}>
              Z-A
            </option>

            <option value="rating" selected={filters.order === "rating"}>
              Rating
            </option>
          </select>

          <select onChange={handleFilterGenre}>
            <option value="All" selected={filters.genres === "All"}>
              All Genres
            </option>
            {genres?.map((gen) => (
              <option
                key={gen.name}
                value={gen.name}
                selected={filters.genres === gen.name}
              >
                {gen.name}
              </option>
            ))}
          </select>

          <select onChange={handleFilterPlatform}>
            <option value="All" selected={filters.platforms === "All"}>
              All Platforms
            </option>
            {platforms?.map((pl) => (
              <option key={pl} value={pl} selected={filters.platforms === pl}>
                {pl}
              </option>
            ))}
          </select>

          <select onChange={handleFilterCreated}>
            <option value="All" selected={filters.origin === "All"}>
              All Origins
            </option>

            <option value="DB" selected={filters.origin === "DB"}>
              DB Origin
            </option>

            <option value="API" selected={filters.origin === "API"}>
              API Origin
            </option>
          </select>
        </div>
        <div className={styles.search_container}>
          <SearchBar />
        </div>
      </div>
      {!allVideogames.length ? (
        <div className={styles.loader}>
          <img src={loader} alt="loader" />
        </div>
      ) : (
        <div>
          <div className={styles.cards}>
            {showGames?.map((videogame) => (
              <Link
                to={`/videogame/${videogame.id}`}
                style={{ textDecoration: "none" }}
                key={videogame.name}
              >
                <Card
                  key={videogame.name}
                  id={videogame.id}
                  name={videogame.name}
                  image={videogame.image}
                  genres={videogame.genres}
                  platforms={videogame.platforms}
                />
              </Link>
            ))}
          </div>
          {!showGames?.length && (
            <div className={styles.gamesNotFound}>No games found!</div>
          )}
          {totalPages >= 2 && Array.isArray(showGames) && (
            <Pagination totalPages={totalPages} />
          )}
        </div>
      )}
    </div>
  );
}
